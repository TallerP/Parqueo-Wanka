import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)

    // cerrar el login modal
    const modal = bootstrap.Modal.getInstance(signInForm.closest('.modal'));
    modal.hide();

    // resetear el form
    signInForm.reset();

    // mostrar mensaje de Bienbenida
    showMessage("Welcome: " + userCredentials.user.email);
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      showMessage("Contraseña Incorrecta", "error")
    } else if (error.code === 'auth/user-not-found') {
      showMessage("Usuario no Encontrado", "error")
    } else {
      showMessage("Algo salio mal", "error")
    }
  }
});