import { verificarAutenticacion } from "./firebase.js";

export const getCurrentUser = async () => {
  try {
    const user = await verificarAutenticacion();
    return user;
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error);
    return null;
  }
};


const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

// Ocultar elementos inicialmente
hideElements(loggedInLinks);
hideElements(loggedOutLinks);

// Mostrar elementos una vez que se obtenga el usuario actual
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const user = await getCurrentUser();
    loginCheck(user);
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error);
  }
});

export const loginCheck = (user) => {
  if (user) {
    showElements(loggedInLinks);
    hideElements(loggedOutLinks);
  } else {
    hideElements(loggedInLinks);
    showElements(loggedOutLinks);
  }
};

function showElements(elements) {
  elements.forEach((element) => {
    element.style.display = "block";
  });
}

function hideElements(elements) {
  elements.forEach((element) => {
    element.style.display = "none";
  });
}
