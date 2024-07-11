import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { v4 as uuidv4 } from 'uuid';

const provider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();

// Function to handle sign-in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
   } catch (error) {
    console.error('Error during sign-in:', error);
  }
};


export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, gitProvider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};


export const signOutAction = async () => {
  await signOut(auth)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log("There is a error in logout", error);
    });

}


export const Menus = [
  {id: uuidv4(), name: "Projects", uri: "/home/projects" },
  {id: uuidv4(), name: "Collections", uri: "/home/collection" },
  {id: uuidv4(), name: "Profile", uri: "/home/profile" },
]