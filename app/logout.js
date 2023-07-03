import { signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebase.js";

const logout = document.querySelector("#logout");

logout.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signOut(auth);
    // Eliminar el valor del userID del localStorage
    localStorage.removeItem("userID");
    localStorage.removeItem("uidID");
    localStorage.removeItem("userEmail");
  } catch (error) {
    console.log(error);
  }
});
