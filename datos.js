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

const userID = localStorage.getItem("userID");

if (!userID) {
  window.location.replace("index.html");
} else {
  
}
const database = firebase.database();
const firebaseRef = firebase.database().ref("datos");

function iniciarMapa() {
  var latitud = -12.069342;
  var longitud = -75.211912;

  coordenadas = {
    lng: longitud,
    lat: latitud,
  };

  generarMapa(coordenadas);

  function generarMapa(coordenadas) {
    var mapa = new google.maps.Map(document.getElementById("mapa"), {
      zoom: 16,
      center: new google.maps.LatLng(coordenadas.lat, coordenadas.lng),
    });

    marcador = new google.maps.Marker({
      map: mapa,
      draggable: true,
      position: new google.maps.LatLng(coordenadas.lat, coordenadas.lng),
    });

    // Mostrar las coordenadas iniciales
    mostrarCoordenadas(coordenadas.lat, coordenadas.lng);

    marcador.addListener("dragend", function (event) {
      var lat = this.getPosition().lat();
      var lng = this.getPosition().lng();

      // Mostrar las nuevas coordenadas
      mostrarCoordenadas(lat, lng);
    });
  }

  function mostrarCoordenadas(lat, lng) {
    document.getElementById("Latitud").textContent = lat;
    document.getElementById("Longitud").textContent = lng;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const decrementButton = document.querySelector('.decrement');
  const incrementButton = document.querySelector('.increment');
  const quantityInput = document.querySelector('.quantity');

  decrementButton.addEventListener('click', decrement);
  incrementButton.addEventListener('click', increment);

  function decrement() {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 0) {
      currentQuantity--;
      quantityInput.value = currentQuantity;
    }
  }

  function increment() {
    let currentQuantity = parseInt(quantityInput.value);
    currentQuantity++;
    quantityInput.value = currentQuantity;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const decrementButtonM = document.getElementById("modalDecreme");
  const incrementButtonM = document.getElementById("modalIncreme");
  const quantityInputM = document.getElementById("modalEspacios");

  decrementButtonM.addEventListener('click', decrement);
  incrementButtonM.addEventListener('click', increment);

  function decrement() {
    let currentQuantityM = parseInt(quantityInputM.value);
    if (currentQuantityM > 0) {
      currentQuantityM--;
      quantityInputM.value = currentQuantityM;
    }
  }

  function increment() {
    let currentQuantityM = parseInt(quantityInputM.value);
    currentQuantityM++;
    quantityInputM.value = currentQuantityM;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const inputFile = document.querySelector("#subirimagen");
  const pictureImage = document.querySelector(".subIMG-content");
  const originalContent = pictureImage.innerHTML;

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("picture__img");

        pictureImage.innerHTML = ""; // Limpiar cualquier contenido anterior
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      pictureImage.innerHTML = originalContent; // Restaurar el contenido original
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const inputFile = document.querySelector("#subirimagen");
  const pictureImage = document.querySelector("#subIMG-Local");
  const originalContent = pictureImage.innerHTML;

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("picture__img");

        pictureImage.innerHTML = ""; // Limpiar cualquier contenido anterior
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      pictureImage.innerHTML = originalContent; // Restaurar el contenido original
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const inputFile = document.querySelector("#subirimg-seguri");
  const pictureImage = document.querySelector("#subIMG-Seguri");
  const originalContent = pictureImage.innerHTML;

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("picture__img");

        pictureImage.innerHTML = ""; // Limpiar cualquier contenido anterior
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      pictureImage.innerHTML = originalContent; // Restaurar el contenido original
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const inputFile = document.querySelector("#subirimg-estruc");
  const pictureImage = document.querySelector("#subIMG-estruc");
  const originalContent = pictureImage.innerHTML;

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("picture__estruc");

        pictureImage.innerHTML = ""; // Limpiar cualquier contenido anterior
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      pictureImage.innerHTML = originalContent; // Restaurar el contenido original
    }
  });
});

// Abre el modal de crear parqueo
document.addEventListener("DOMContentLoaded", () => {
  var openModalBtn = document.getElementById("openModalBtn");
  var modal = document.getElementById("myModal");
  var closeModalBtn = document.getElementsByClassName("close")[0];

  openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("myModal");
  var closeModalBtn = document.getElementsByClassName("close")[0];

  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  document.getElementById("CrearBtn").addEventListener("click", () => {
    var Latitud = document.getElementById("Latitud").textContent;
    var Longitud = document.getElementById("Longitud").textContent;
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

          limpiarDato();
          modal.style.display = "none";
        });
      }
    );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("myModal");
  document.getElementById("CancelarBtn").addEventListener("click", () => {
    modal.style.display = "none";
  });
});

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
  const imagen = document.getElementById("subirimagen");

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
  imagen.value = "";
}

let parqueoIDToUpdate = "";
let parqueoDate = "";

document.addEventListener("DOMContentLoaded", () => {
  firebaseRef
    .orderByChild("IDUsuario")
    .equalTo(userID)
    .on("value", (snapshot) => {
      parqueosDiv.innerHTML = "";

      snapshot.forEach((childSnapshot) => {
        const parqueo = childSnapshot.val();
        const parqueoID = childSnapshot.key;

        const parqueoElement = document.createElement("div");
        parqueoElement.classList.add("parqueo");

        const disponibilidadText = parqueo.disponibilidad ? "ACTIVO" : "INACTIVO";
        const disponibilidadClass = parqueo.disponibilidad ? "verde" : "rojo";

        parqueoElement.innerHTML = `
          <div class="parqueo-Content">
            <div class="parqC-img">
              <img id="" src="${parqueo.imagenURL}" loading="lazy" />
              <span class="parqC-Prec">${parqueo.precio} x h</span> 
            </div>
            <div class="parqC-title">
              <span><img src="https://icongr.am/jam/map-marker-f.svg?size=18&color=14bbf0" alt=""> ${parqueo.direccion}</span>
              <h2>${parqueo.nombre}</h2>
              <div class="parqC-act">
                <div class="parqC-act-Esp">
                  <img src="https://icongr.am/jam/car-f.svg?size=20&amp;color=fb3447" alt=""> 
                  <span>${parqueo.cantespacios} espacio(s)</span> 
                </div class="parqC-act-Esp">
                <div class="${disponibilidadClass}"> <span>${disponibilidadText}</span> </div>
              </div>
            </div>
            
          </div>
          <div class="parqueo-Btns">
            <button class="btn-cancel" data-parqueo-id="${parqueoID}">Eliminar</button>
            <button class="btn-success" id="openModalEdit" data-parqueo-id="${parqueoID}">Actualizar</button>
          </div>
        `;

        // Obtener los botones de eliminar y actualizar dentro del parqueoElement
        const eliminarBtn = parqueoElement.querySelector(".btn-cancel");
        const actualizarBtn = parqueoElement.querySelector(".btn-success");

        eliminarBtn.addEventListener("click", () => {
          parqueoIDToUpdate = parqueoID;
          mostrarModalConfirmacion(parqueoIDToUpdate);
        });

        actualizarBtn.addEventListener("click", () => {
          parqueoIDToUpdate = parqueoID;
          parqueoDate = parqueo;
          mostrarModalActualizar(parqueoIDToUpdate, parqueo);
        });

        parqueosDiv.appendChild(parqueoElement);
      });
    });
});


document.addEventListener("DOMContentLoaded", () => {
  var modalEdit = document.getElementById("myModalEdit");

  // Agrega el controlador de evento del botón "Guardar" fuera de la función mostrarModalActualizar
  document.getElementById("modalGuardarBtn").addEventListener("click", () => {
    if (parqueoIDToUpdate !== "") {
      var nombre = document.getElementById("modalNombre").value;
      var direccion = document.getElementById("modalDireccion").value;
      var celular = document.getElementById("modalCelular").value;
      var descripcion = document.getElementById("modalDescrip").value;
      var horario = document.getElementById("modalHorario").value;
      var precio = document.getElementById("modalPrecio").value;
      var cantespacios = document.getElementById("modalEspacios").value;
      var tipo = document.getElementById("modalTipo").value;
      var Latitud = document.getElementById("modalLat").textContent;
      var Longitud = document.getElementById("modalLong").textContent;
      var disponibilidad = false;

      // Actualiza la disponibilidad basado en la cantidad de espacios disponibles
      if (cantespacios > 0) {
        disponibilidad = true; // Asigna true si hay espacios disponibles
      }

      var cambiosRealizados = false; // Variable para controlar si hubo cambios

      // Verifica si hubo cambios en los campos
      if (
        nombre !== parqueoDate.nombre ||
        direccion !== parqueoDate.direccion ||
        celular !== parqueoDate.celular ||
        descripcion !== parqueoDate.descripcion ||
        horario !== parqueoDate.horario ||
        precio !== parqueoDate.precio ||
        cantespacios !== parqueoDate.cantespacios ||
        tipo !== parqueoDate.tipo ||
        Latitud !== parqueoDate.Latitud ||
        Longitud !== parqueoDate.Longitud ||
        disponibilidad !== parqueoDate.disponibilidad
      ) {
        cambiosRealizados = true; // Se encontraron cambios
      }

      if (cambiosRealizados) {
        actualizarDato(parqueoIDToUpdate, {
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
        });

        parqueoIDToUpdate = "";
        modalEdit.style.display = "none";
      } else {
        alert("No se realizaron cambios en la actualización.");
      }
    }
  });
});

function mostrarModalActualizar(parqueoIDToUpdate, parqueo) {
  var modalEdit = document.getElementById("myModalEdit");
  var closeModalBtn = document.getElementsByClassName("close")[0];

  // Rellenar los campos del modal con los datos del parqueo
  document.getElementById("modalNombre").value = parqueo.nombre;
  document.getElementById("modalDireccion").value = parqueo.direccion;
  document.getElementById("modalCelular").value = parqueo.celular;
  document.getElementById("modalDescrip").value = parqueo.descripcion;
  document.getElementById("modalHorario").value = parqueo.horario;
  document.getElementById("modalPrecio").value = parqueo.precio;
  document.getElementById("modalEspacios").value = parqueo.cantespacios;
  document.getElementById("modalTipo").value = parqueo.tipo;
  document.getElementById("modalLat").textContent = parqueo.Latitud;
  document.getElementById("modalLong").textContent = parqueo.Longitud;
  document.getElementById("modalDispo").textContent = parqueo.disponibilidad
    ? "Disponible"
    : "No disponible";

  var imagenURL = parqueo.imagenURL;
  var imagenModal = document.getElementById("modalImagen");
  imagenModal.src = imagenURL;

  modalEdit.style.display = "block";

  closeModalBtn.addEventListener("click", function () {
    modalEdit.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modalEdit) {
      modalEdit.style.display = "none";
    }
  });
}

function actualizarDato(id, nuevosValores) {
  var cantespacios = parseInt(nuevosValores.cantespacios);
  var disponibilidad;
  if (cantespacios > 0) {
    disponibilidad = true;
  } else {
    disponibilidad = false;
  }

  firebase
    .database()
    .ref("datos")
    .child(id)
    .update({
      Latitud: nuevosValores.Latitud,
      Longitud: nuevosValores.Longitud,
      nombre: nuevosValores.nombre,
      direccion: nuevosValores.direccion,
      celular: nuevosValores.celular,
      tipo: nuevosValores.tipo,
      precio: nuevosValores.precio,
      cantespacios: nuevosValores.cantespacios,
      horario: nuevosValores.horario,
      descripcion: nuevosValores.descripcion,
      disponibilidad: disponibilidad,
    })
    .then(() => {
      alert("Dato actualizado correctamente");
    })
    .catch((error) => {
      console.log("Error al actualizar el dato:", error);
    });
}

// Función para mostrar el modal de confirmación de eliminación
function mostrarModalConfirmacion(parqueoIDToUpdate) {
  var modalConfirm = document.getElementById("modalConfirm");

  // Agrega una referencia a los botones Aceptar y Cancelar del modal
  var btnAceptar = document.getElementById("btnAceptar");
  var btnCancelar = document.getElementById("btnCancelar");

  modalConfirm.style.display = "block";

  // Agregar la lógica al botón Aceptar del modal
  btnAceptar.addEventListener("click", () => {
    // Ejecutar la función de eliminación real del parqueo
    eliminarParqueo(parqueoIDToUpdate);
    // Ocultar el modal de confirmación
    modalConfirm.style.display = "none";
  });

  // Agregar la lógica al botón Cancelar del modal
  btnCancelar.addEventListener("click", () => {
    // Ocultar el modal de confirmación
    modalConfirm.style.display = "none";
  });
}

// Función para eliminar un parqueo
function eliminarParqueo(parqueoIDToUpdate) {
  firebase
    .database()
    .ref("datos/" + parqueoIDToUpdate)
    .remove()
    .then(() => {
      console.log("Parqueo eliminado correctamente");
    })
    .catch((error) => {
      console.error("Error al eliminar el parqueo:", error);
    });
}

var cantespaciosInput = document.getElementById('cantespacios');
var disponibilidadDiv = document.getElementById('disponibilidad');

cantespaciosInput.addEventListener('input', function () {
  var espaciosDisponibles = parseInt(cantespaciosInput.value);
  if (espaciosDisponibles > 0) {
    disponibilidadDiv.textContent = 'ACTIVO';
    disponibilidadDiv.classList.remove('inactivo');
    disponibilidadDiv.classList.add('activo');
  } else {
    disponibilidadDiv.textContent = 'INACTIVO';
    disponibilidadDiv.classList.remove('activo');
    disponibilidadDiv.classList.add('inactivo');
  }
});

