"use client";
import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { getUserProfile } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import NavLink from "../component/NavLink";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const db = getFirestore();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/Login");
        return;
      }
      try {
        const profileData = await getUserProfile(currentUser.uid);
        setUser({
          ...profileData,
          profilePic: profileData.profilePic || "/defaultprofile.png",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  const handleUpload = async () => {
    if (!image) {
      console.log("No image selected");
      return;
    }
    setUploading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, { profilePic: image }, { merge: true });
      setUser((prevUser) => ({ ...prevUser, profilePic: image }));
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <span>
        {user ? (
          <div className="w-3/4 min-h-screen bg-gray-100 flex flex-wrap items-center justify-center mx-auto my-20 rounded-xl border-2 border-black-100 drop-shadow-md">
            <div className="w-full md:w-1/2 flex flex-col items-center my-auto">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-[200px] h-[200px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] max-w-[500px] max-h-[500px] rounded-full border-4 border-black object-cover"
                onError={(e) => (e.target.src = "/defaultprofile.png")}
              />
              <div className="flex flex-wrap items-center mt-10 gap-2">
                <label className="cursor-pointer text-body bg-white text-black px-4 py-2 rounded-md hover:bg-gray-500 border-2 border-dashed border-black">
                  Choose Image
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                <button
                  onClick={handleUpload}
                  disabled={uploading || !image}
                  className="ml-auto text-body px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-start my-auto">
              <p className="text-h3 text-black"><strong>Name:</strong></p>
              <p className="text-body text-gray-600 pb-10">{user.username}</p>
              <p className="text-h3 text-black"><strong>Email:</strong></p>
              <p className="text-body text-gray-600 pb-10">{user.email}</p>
              <div className="flex flex-wrap items-center justify-start gap-4 mt-8 w-full">
                <NavLink href="/Profile/Settings" className="text-body rounded-md bg-[#455090] px-6 py-2 font-semibold shadow-md text-white hover:bg-[#102437] w-full sm:w-auto text-center">
                  Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-body px-6 py-2 bg-red-500 text-white rounded-md font-semibold shadow-md hover:bg-red-600 w-full sm:w-auto text-center"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
      ) : (
        <p>No user data found.</p>
      )}
    

  </span>
  );
};

export default Profile;