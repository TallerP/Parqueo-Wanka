var firebaseConfig = {
  apiKey: "AIzaSyDtpOfIff-7_ZKPcKzojiW8Q4lldvV8iwc",
  authDomain: "tallerproyectos2023-d32b7.firebaseapp.com",
  databaseURL: "https://tallerproyectos2023-d32b7-default-rtdb.firebaseio.com",
  projectId: "tallerproyectos2023-d32b7",
  storageBucket: "tallerproyectos2023-d32b7.appspot.com",
  messagingSenderId: "52196951713",
  appId: "1:52196951713:web:806d3df12faa67f673d2e0"
};
firebase.initializeApp(firebaseConfig);

function guardarDato() {
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
        // Guarda los datos junto con la URL de la imagen en la base de datos de Firebase
        firebase
          .database()
          .ref("datos")
          .push({
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
            imagenURL: downloadURL // Guarda la URL de la imagen
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


function actualizarDato(nombre) {
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

  firebase.database().ref('datos/')
    .orderByChild("nombre").equalTo(nombre)
    .once("value", function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (child) {
          child.ref.update({
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
            disponibilidad: disponibilidad // aquí usamos la variable booleana directamente
          });
        });
      } else {
        alert("No se encontró ningún dato con ese nombre");
      }
    });
}

function buscarDato() {
  var id = document.getElementById("buscnom").value;

  firebase.database().ref('datos').orderByChild("nombre").equalTo(id).once("value", function (snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function (childSnapshot) {
        var data = childSnapshot.val();
        alert('El estacionamiento con ID que busca se encontró con éxito.');

        document.getElementById("Latitud").value = data.Latitud;
        document.getElementById("Longitud").value = data.Longitud;
        document.getElementById("nombre").value = data.nombre;
        document.getElementById("direccion").value = data.direccion;
        document.getElementById("celular").value = data.celular;
        document.getElementById("tipo").value = data.tipo;
        document.getElementById("precio").value = data.precio;
        document.getElementById("horario").value = data.horario;
        document.getElementById("cantespacios").value = data.cantespacios;
        document.getElementById("descripcion").value = data.descripcion;

        var disponibilidadDiv = document.getElementById('disponibilidad');
        if (data.disponibilidad) {
          disponibilidadDiv.textContent = 'Disponible';
          disponibilidadDiv.classList.remove('inactivo');
          disponibilidadDiv.classList.add('activo');
        } else {
          disponibilidadDiv.textContent = 'No disponible';
          disponibilidadDiv.classList.remove('activo');
          disponibilidadDiv.classList.add('inactivo');
        }
      });
    } else {
      alert('El estacionamiento con el ID especificado no se encontró.');
    }
  });
}

/*
var datosId = '-NUouJKzcOkxAjNnLT5u'; // ID del estudiante a editar
var datosRef = firebase.database().ref('datos/' + datosId);
datosRef.update({
  Latitud: Latitud,
  Longitud: Longitud,
  nombre: nombre,
  direccion: direccion,
  celular: celular,
  tipo: tipo,
  precio: precio,
  horario: horario,
  descripcion: descripcion,
  disponibilidad: disponibilidad
});

alert("Dato actualizado correctamente");


<div class="crud-header2">
    <input type="text" id="idnombre" name="nombre" placeholder="Ingrese ID del estacionamiento">
    <button class="boton" onclick="buscarDato()">Buscar</button>
</div>*/