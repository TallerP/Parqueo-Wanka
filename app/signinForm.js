import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const userID = userCredentials.user.uid; // Obtener el ID de usuario
    localStorage.setItem("userID", userID); // Almacenar el ID de usuario en el almacenamiento local del navegador

    // Redireccionar a la página de destino
    window.location.href = "./actualizardatos.html";
    
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      showMessage("Wrong password", "error")
    } else if (error.code === 'auth/user-not-found') {
      showMessage("User not found", "error")
    } else {
      showMessage("Something went wrong", "error")
    }
  }
});