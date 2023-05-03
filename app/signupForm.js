import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential)

    // Cerrar el signup modal
    const signupModal = document.querySelector('#signupModal');
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    // resetear el form
    signUpForm.reset();

    // mostrar mensaje de bienvenida
    showMessage("Welcome: " + userCredentials.user.email);

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Email ya está en uso", "error")
    } else if (error.code === 'auth/invalid-email') {
      showMessage("Email inválido, ingresar Email existente", "error")
    } else if (error.code === 'auth/weak-password') {
      showMessage("contraseña debil", "error")
    } else if (error.code) {
      showMessage("Algo salio mal", "error")
    }
  }

});