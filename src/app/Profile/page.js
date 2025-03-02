/* export default function Profile(){
    return ( // TODO turn into an Icon later
        <main>
        <h1>Profile</h1>
        </main>
    );
}
*/
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/firebaseConfig";
import { getUserProfile } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        router.push("/Login"); 
        return;
      }

      try {
        const profileData = await getUserProfile(currentUser.uid);
        setUser(profileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/Login"); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Profile;
