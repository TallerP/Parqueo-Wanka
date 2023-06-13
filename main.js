import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { auth, db } from "./app/firebase.js";
import { loginCheck } from "./app/loginCheck.js";

import './app/signupForm.js'
import './app/signinForm.js'
import './app/googleLogin.js'
import './app/facebookLogin.js'
import './app/githubLogin.js'
import './app/logout.js'

// list for auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user);
    try {
      
    } catch (error) {
      console.log(error)
    }
  } else {
   
    loginCheck(user);
  }
});