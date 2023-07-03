import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebase.js";

const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const provider = new GoogleAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, provider);
    const uidID = credentials.user.uid;
    const uidEmail = credentials.user.email;
    localStorage.setItem("uidID", uidID);
    localStorage.setItem("userEmail", uidEmail);

    // Redireccionar a la página de destino
    window.location.href = "./actualizardatos.html";
  } catch (error) {
    console.log(error);
  }
});
