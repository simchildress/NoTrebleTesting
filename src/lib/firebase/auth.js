import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore(app)
const auth = getAuth(app);

// Sign up 
const signUp = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save user  
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date(),
      });
  
      console.log("User registered and added to Firestore:", user);
      return user;
    } catch (error) {
      console.error("Sign Up Error:", error.message);
      throw error;
    }
  };
  

// Login 
const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const profile = await getUserProfile(user.uid);
  
      return { user, profile };
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };
  

// Logout 
const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };  

const getUserProfile = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data();
      } else {

        const newUserProfile = {
          uid: uid,
          email: "unknown",
          username: "New User",
          createdAt: new Date(),
        };

        await setDoc(userDocRef, newUserProfile);
        return newUserProfile;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      throw error;
    }
};

  

  export { signUp, login, logout, getUserProfile };

