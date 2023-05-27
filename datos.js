//ACTUALIZAR DATOS

//ID FIREBASE
var firebaseConfig = {
  apiKey: "AIzaSyDtpOfIff-7_ZKPcKzojiW8Q4lldvV8iwc",
  authDomain: "tallerproyectos2023-d32b7.firebaseapp.com",
  databaseURL: "https://tallerproyectos2023-d32b7-default-rtdb.firebaseio.com",
  projectId: "tallerproyectos2023-d32b7",
  storageBucket: "tallerproyectos2023-d32b7.appspot.com",
  messagingSenderId: "52196951713",
  appId: "1:52196951713:web:806d3df12faa67f673d2e0",
};
firebase.initializeApp(firebaseConfig);

// Obtener el ID de usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get("userID");

const firebaseRef = firebase.database().ref("datos");

document.addEventListener("DOMContentLoaded", () => {
  // Realiza una consulta en la base de datos para obtener los parqueos del usuario
  firebaseRef
    .orderByChild("IDUsuario")
    .equalTo(userID)
    .on("value", (snapshot) => {
      // Limpiar la lista de parqueos antes de volver a cargarla
      parqueosDiv.innerHTML = "";

      // Itera sobre los parqueos y muestra la lista en la página
      snapshot.forEach((childSnapshot) => {
        const parqueo = childSnapshot.val();
        const parqueoID = childSnapshot.key; // Obtén el ID del parqueo

        // Crear elemento de parqueo
        var parqueoElement = document.createElement("div");
        parqueoElement.classList.add("parqueo");

        // Crear elemento de título
        var tituloElement = document.createElement("h1");
        tituloElement.textContent = parqueo.nombre;

        // Crear botón de eliminar
        var eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.classList.add("btn-menu");
        eliminarBtn.addEventListener("click", () => {
          eliminarParqueo(parqueoID); // Llama a la función eliminarParqueo pasando el ID del parqueo
        });

        // Agregar elementos al div de parqueo
        parqueoElement.appendChild(tituloElement);
        parqueoElement.appendChild(eliminarBtn);
        parqueosDiv.appendChild(parqueoElement);
      });
    });
});

// Función para eliminar un parqueo
function eliminarParqueo(parqueoID) {
  // Lógica para eliminar el parqueo de la base de datos
  firebase
    .database()
    .ref("datos/" + parqueoID)
    .remove()
    .then(() => {
      // El parqueo se eliminó exitosamente
      console.log("Parqueo eliminado correctamente");
    })
    .catch((error) => {
      // Ocurrió un error al eliminar el parqueo
      console.error("Error al eliminar el parqueo:", error);
    });
}


document.addEventListener("DOMContentLoaded", () => {
  // Obtén referencias a los elementos del DOM
  var openModalBtn = document.getElementById("openModalBtn");
  var modal = document.getElementById("myModal");
  var closeModalBtn = document.getElementsByClassName("close")[0];
  var updateBtn = document.getElementById("updateBtn");

  // Abre el modal al hacer clic en el botón correspondiente
  openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  // Cierra el modal al hacer clic en la "x" de cierre
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Cierra el modal al hacer clic fuera de él
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});

function guardarDato(userID) {
  // Obtén los valores de los campos de entrada
  var Latitud = document.getElementById("Latitud").value;
  var Longitud = document.getElementById("Longitud").value;
  var nombre = document.getElementById("nombre").value;
  var direccion = document.getElementById("direccion").value;
  var celular = document.getElementById("celular").value;
  var tipo = document.getElementById("tipo").value;
  var precio = document.getElementById("precio").value;
  var horario = document.getElementById("horario").value;
  var descripcion = document.getElementById("descripcion").value;
  var cantespacios = document.getElementById("cantespacios").value;
  var disponibilidad = false;

  // Actualiza la disponibilidad basado en la cantidad de espacios disponibles
  if (cantespacios > 0) {
    disponibilidad = true; // Asigna true si hay espacios disponibles
  }

  // Obtén el archivo de imagen seleccionado
  var imageFile = document.getElementById("subirimagen").files[0];

  // Crea una referencia al almacenamiento de Firebase y la ruta donde se guardará la imagen
  var storageRef = firebase.storage().ref(imageFile.name);

  // Sube el archivo de imagen al almacenamiento de Firebase
  var uploadTask = storageRef.put(imageFile);

  // Controla los eventos de éxito y error de la carga
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      // Maneja los cambios en el progreso de carga si es necesario
    },
    function (error) {
      // Maneja los errores de carga
      console.log(error);
    },
    function () {
      // Carga completada exitosamente

      // Obtén la URL de descarga de la imagen
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        // Guarda los datos junto con la URL de la imagen y el ID de usuario en la base de datos de Firebase
        firebase.database().ref("datos").push({
          Latitud: Latitud,
          Longitud: Longitud,
          nombre: nombre,
          direccion: direccion,
          celular: celular,
          tipo: tipo,
          precio: precio,
          horario: horario,
          descripcion: descripcion,
          cantespacios: cantespacios,
          disponibilidad: disponibilidad,
          imagenURL: downloadURL, // Guarda la URL de la imagen
          IDUsuario: userID, // Guarda el ID de usuario
        });

        alert("Datos guardados correctamente");
      });
    }
  );
}

function limpiarDato() {
  const Latitud = document.getElementById("Latitud");
  const Longitud = document.getElementById("Longitud");
  const nombre = document.getElementById("nombre");
  const direccion = document.getElementById("direccion");
  const tipo = document.getElementById("tipo");
  const precio = document.getElementById("precio");
  const horario = document.getElementById("horario");
  const descripcion = document.getElementById("descripcion");
  const celular = document.getElementById("celular");
  const cantespacios = document.getElementById("cantespacios");
  const disponibilidadDiv = document.getElementById("disponibilidad");

  Latitud.value = "";
  Longitud.value = "";
  nombre.value = "";
  direccion.value = "";
  tipo.value = "";
  precio.value = "";
  horario.value = "";
  descripcion.value = "";
  celular.value = "";
  cantespacios.value = "";
  disponibilidadDiv.textContent = "";
}

function actualizarDato(id) {
  var Latitud = document.getElementById("Latitud").value;
  var Longitud = document.getElementById("Longitud").value;
  var nombre = document.getElementById("nombre").value;
  var direccion = document.getElementById("direccion").value;
  var celular = document.getElementById("celular").value;
  var tipo = document.getElementById("tipo").value;
  var precio = document.getElementById("precio").value;
  var horario = document.getElementById("horario").value;
  var cantespacios = document.getElementById("cantespacios").value;
  var descripcion = document.getElementById("descripcion").value;

  // Actualiza la disponibilidad basado en la cantidad de espacios disponibles
  var disponibilidad;
  if (cantespacios > 0) {
    disponibilidad = true;
  } else {
    disponibilidad = false;
  }

  firebase
    .database()
    .ref("datos/" + id)
    .update({
      Latitud: Latitud,
      Longitud: Longitud,
      nombre: nombre,
      direccion: direccion,
      celular: celular,
      tipo: tipo,
      precio: precio,
      cantespacios: cantespacios,
      horario: horario,
      descripcion: descripcion,
      disponibilidad: disponibilidad,
    })
    .then(() => {
      alert("Dato actualizado correctamente");
    })
    .catch((error) => {
      console.log("Error al actualizar el dato:", error);
    });
}