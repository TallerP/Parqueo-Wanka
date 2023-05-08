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
  var disponibilidad = document.getElementById("disponibilidad").value;


  firebase.database().ref('datos').push({
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
    disponibilidad: disponibilidad

  });
  alert("Datos guardado correctamente");
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
  const disponibilidad = document.getElementById("disponibilidad");


  Latitud.value = "";
  Longitud.value= "";
  nombre.value = "";
  direccion.value = "";
  tipo.value = "";
  precio.value = "";
  horario.value= "";
  descripcion.value = "";
  celular.value = "";
  disponibilidad.value = "";
  cantespacios.value= "";
}

function buscarDato() {
  var id = document.getElementById("idnombre").value;

  firebase.database().ref('datos').orderByChild("nombre").equalTo(id).once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var data = childSnapshot.val();
      alert('El estacionamiento con ID que busca se encontro con Exito.');
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
      document.getElementById("disponibilidad").value = data.disponibilidad;
    });
  });
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
  var disponibilidad = document.getElementById("disponibilidad").value;
  
  var datosRef = firebase.database().ref('datos/');
  datosRef.orderByChild("nombre").equalTo(nombre).once("value", function(snapshot) {
    snapshot.forEach(function(child) {
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
        disponibilidad: disponibilidad
      });
    });
  });

  alert("Dato actualizado correctamente");
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