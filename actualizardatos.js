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
    var nombreesta = document.getElementById("nombreesta").value;
    var direccion = document.getElementById("direccion").value;
    var celular = document.getElementById("celular").value;
    var descripcion = document.getElementById("descripcion").value;
    var idestacionamiento = document.getElementById("idestacionamiento").value;
  
  
    firebase.database().ref('datos').push({
      nombreesta: nombreesta,
      direccion: direccion,
      celular: celular,
      descripcion: descripcion,
      idestacionamiento: idestacionamiento
    });
    alert("Datos guardado correctamente");
  }
  
  function limpiarDato() {
    const nombre = document.getElementById("nombreesta");
    const direccion = document.getElementById("direccion");
    const codigo = document.getElementById("idestacionamiento");
    const celular = document.getElementById("celular");
    const descripcion = document.getElementById("descripcion");
  
  
    nombre.value = "";
    direccion.value = "";
    codigo.value = "";
    celular.value = "";
    descripcion.value = "";
  }
  
  function buscarDato() {
    var id = document.getElementById("idestaciona").value;
  
    firebase.database().ref('datos').orderByChild("idestacionamiento").equalTo(id).once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var data = childSnapshot.val();
        alert('El estacionamiento con ID que busca se encontro con Exito.');
        document.getElementById("nombreesta").value = data.nombreesta;
        document.getElementById("direccion").value = data.direccion;
        document.getElementById("celular").value = data.celular;
        document.getElementById("descripcion").value = data.descripcion;
        document.getElementById("idestacionamiento").value = data.idestacionamiento;
      });
    });
  }
  
  
  function actualizarDato() {
    var nombreesta = document.getElementById("nombreesta").value;
    var direccion = document.getElementById("direccion").value;
    var celular = document.getElementById("celular").value;
    var descripcion = document.getElementById("descripcion").value;
    var idestacionamiento = document.getElementById("idestacionamiento").value;
  
    
    var datosId = '-NTBt1BKMsjJyTxhosoR'; // ID del estudiante a editar
    var datosRef = firebase.database().ref('datos/' + datosId);
    datosRef.update({
      nombreesta: nombreesta,
      direccion: direccion,
      celular: celular,
      descripcion: descripcion,
      idestacionamiento: idestacionamiento
    });
  
    alert("Dato actualizado correctamente");
  }
  
  /*
  
  function eliminarDato(){
      var nombre = document.getElementById("nombre").value;
      var Apellido_Paterno = document.getElementById("apellidoPaterno").value;
      var Apellido_Materno = document.getElementById("apellidoMaterno").value;
      var celular = document.getElementById("celular").value;
      var email = document.getElementById("email").value;
      var dni = document.getElementById("dni").value;
      var edad = document.getElementById("edad").value;
      var direccion = document.getElementById("direccion").value;
  
      var datosId = '-NTBt1BKMsjJyTxhosoR'; // ID del estudiante a editar
      var datosRef = firebase.database().ref('datos/' + datosId);
      datosRef.delete({
          nombre: nombre, 
          apellidoPaterno: Apellido_Paterno,
          apellidoMaterno: Apellido_Materno,
          celular: celular,
          email: email,
          direccion: direccion,
          edad: edad,
          dni: dni
      });
  
      alert("Dato eliminado correctamente");
  }
  */
  