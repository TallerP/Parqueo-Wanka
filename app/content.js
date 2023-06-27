/*//////////////////////////////////////////////////////////////////
[ INICIALIZACIÓN DEL MAPA]*/

let ubicacionActual = null;
let map;
let marker;
let destinoMarker = null;
let directionsDisplay;
let directionsService;
let markers = [];
let markerData = [];

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      ubicacionActual = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      initMap();
    },
    (error) => {
      console.log("Error en la geolocalización:", error);
      initMap();
    }
  );
} else {
  console.log("El navegador no admite la API de geolocalización");
  initMap();
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: ubicacionActual,
    zoom: 14.5,
    mapTypeControl: false,
    mapId: "ab9ec8e84265fcee",
    streetViewControl: false,
    zoomControl: false,
    fullscreenControl: false,
  });

  marker = new google.maps.Marker({
    position: ubicacionActual,
    map: map,
    icon: {
      url: "imgs/carro.png",
      scaledSize: new google.maps.Size(53, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(12, 12),
    },
    draggable: true,
  });

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true, // Elimina marcadores y las letras "A" y "B"
    polylineOptions: {
      strokeColor: "#0A67F9", // Cambiar el color de la ruta
      strokeWeight: 5, // Grosor de la ruta
    },
    map: map,
  });
  directionsDisplay.setMap(map);
}

const createMarker = (
  coord,
  precio,
  map,
  nombre,
  direccion,
  numcontact,
  ubicacionHorario,
  descripcion,
  tipo,
  espacio,
  imagen,
  disponibilidad
) => {
  const markerIcon = {
    url: disponibilidad ? "imgs/libre.svg" : "imgs/ocupado.svg",
    scaledSize: new google.maps.Size(43, 95),
  };

  const marker = new google.maps.Marker({
    position: coord,
    map: map,
    icon: markerIcon,
    clickable: true,
    visible: true,
  });

  markerData.push({
    latitud: coord.lat(),
    longitud: coord.lng(),
    nombre: nombre,
    precio: precio,
    espacio: espacio, 
    disponibilidad: disponibilidad, 
  });


  const contentString =
    '<div class="info-window">' +
    '<span class="info-price">' +
    precio +
    "</span>" +
    "</div>";

  const infoWindow = new google.maps.InfoWindow({
    content: contentString,
    closeBoxURL: "",
  });

  // Abre el infoWindow cuando se carga el mapa
  infoWindow.open(map, marker);

  marker.addListener("click", function () {
    crearRuta(coord);

    document.getElementById("ubicacion-nombre").textContent = nombre;
    document.getElementById("ubicacion-precio").textContent = precio;
    document.getElementById("ubicacion-direccion").textContent = direccion;
    document.getElementById("ubicacion-horario").textContent = ubicacionHorario;
    document.getElementById("ubicacion-numcontact").textContent = numcontact;
    document.getElementById("ubicacion-descripcion").textContent = descripcion;
    document.getElementById("ubicacion-tipo").textContent = tipo;
    document.getElementById("ubicacion-espacio").textContent = espacio;

var imagenURL = imagen;
    var imagenModal = document.getElementById("ubicacion-Image");
    imagenModal.src = imagenURL;
    document.getElementById("info-container").classList.add("show");
  });

  markers.push(marker);
};

/*//////////////////////////////////////////////////////////////////
[ CREAR RUTA ]*/

function crearRuta(destino) {
  if (ubicacionActual && destino) {
    const request = {
      origin: ubicacionActual,
      destination: destino,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  }
}

/*//////////////////////////////////////////////////////////////////
[ OPTION TIPO ]*/

let lastTipoSeleccionado = "todos";
const tipoSelector = document.getElementById("tipo");

document.addEventListener("DOMContentLoaded", () => {
  const tipoSelector = document.getElementById("tipo");
  tipoSelector.addEventListener("change", (event) => {
    lastTipoSeleccionado = event.target.value;
    filterMarkers(lastTipoSeleccionado); 
  });
});

/*//////////////////////////////////////////////////////////////////
[ OPTION RANGO ]*/
const rangoSelector = document.getElementById("rango");
function getDistance(coord1, coord2) {
  const R = 6371; // radio de la Tierra en km
  const dLat = toRadians(coord2.lat() - coord1.lat());
  const dLon = toRadians(coord2.lng() - coord1.lng());
  const lat1 = toRadians(coord1.lat());
  const lat2 = toRadians(coord2.lat());

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

rangoSelector.addEventListener("change", () => {
  filterMarkers(lastTipoSeleccionado);
});


function createLocationMarkers() {
  markerData.forEach((data) => {
    const coord = new google.maps.LatLng(data.latitud, data.longitud);
    const nombre = data.nombre;
    const precio = data.precio;
    const direccion = data.direccion;
    const numcontact = data.numcontact;
    const ubicacionHorario = data.horario;
    const descripcion = data.descripcion;
    const tipo = data.tipo;
    const espacio = data.espacio;
    const imagenURL = data.imagenURL;
    const disponibilidad = data.disponibilidad;

    createMarker(
      coord,
      precio,
      map,
      nombre,
      direccion,
      numcontact,
      ubicacionHorario,
      descripcion,
      tipo,
      espacio,
      imagenURL,
      disponibilidad
    );
  });
}

function updateMarkers(snapshot) {
  markerData = [];
  markers.forEach((marker) => marker.setMap(null));
  markers = [];

  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    const coord = new google.maps.LatLng(data.latitud, data.longitud);
    const nombre = data.nombre;
    const precio = data.precio;
    const direccion = data.direccion;
    const numcontact = data.numcontact;
    const ubicacionHorario = data.horario;
    const descripcion = data.descripcion;
    const tipo = data.tipo;
    const espacio = data.espacio;
    const imagen = data.imagen;
    const disponibilidad = data.disponibilidad;

    markerData.push({
      latitud: coord.lat(),
      longitud: coord.lng(),
      nombre: nombre,
      precio: precio,
    });

    createMarker(
      coord,
      precio,
      map,
      nombre,
      direccion,
      numcontact,
      ubicacionHorario,
      descripcion,
      tipo,
      espacio,
      imagen,
      disponibilidad
    );
  });

  filterMarkers();
}

document.addEventListener("DOMContentLoaded", () => {
  // Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDtpOfIff-7_ZKPcKzojiW8Q4lldvV8iwc",
  authDomain: "tallerproyectos2023-d32b7.firebaseapp.com",
  databaseURL: "https://tallerproyectos2023-d32b7-default-rtdb.firebaseio.com",
  projectId: "tallerproyectos2023-d32b7",
  storageBucket: "tallerproyectos2023-d32b7.appspot.com",
  messagingSenderId: "52196951713",
  appId: "1:52196951713:web:806d3df12faa67f673d2e0",
};

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);

const firebaseRef = firebase.database().ref("datos");

  // Suscribirse al evento "value" de Firebase para actualizar los marcadores
  firebaseRef.on("value", updateMarkers);

  createLocationMarkers();
});


/*//////////////////////////////////////////////////////////////////
[ FILTER  ]*/
let rangeCircle = null;

function filterMarkers() {
  const rangoSeleccionado = Number(rangoSelector.value);

  if (lastTipoSeleccionado) {
    document.getElementById("info-container").classList.remove("show");
  } else {
    document.getElementById("info-container").classList.remove("show");
  }

  markerData = [];
  markers.forEach((marker) => {
    if (
      marker instanceof google.maps.Marker &&
      marker.get("tipo") === lastTipoSeleccionado
    ) {
      marker.setMap(map);

      const markerInfo = {
        coord: marker.getPosition(),
        nombre: marker.get("nombre"),
        precio: marker.get("precio"),
      };

      markerData.push(markerInfo);
    } else {
      marker.setMap(null);
    }
  });

  markers = [];

  directionsDisplay.setDirections({ routes: [] });

  if (rangeCircle) {
    rangeCircle.setMap(null);
    rangeCircle = null;
  }

  rangeCircle = new google.maps.Circle({
    strokeColor: "#ff0000",
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: "transparent",
    fillOpacity: 0.05,
    map: map,
    center: ubicacionActual,
    radius: rangoSeleccionado * 1000,
  });

  function updateRangeCircle(center, radius) {
    rangeCircle.setCenter(center);
    rangeCircle.setRadius(radius);
  }

  map.setCenter(ubicacionActual);
  map.setZoom(14);

  const firebaseRef = firebase.database().ref("datos");
  firebaseRef.on("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const ubicacion = childSnapshot.val();
      const coord = new google.maps.LatLng(
        ubicacion.Latitud,
        ubicacion.Longitud
      );

      if (
        lastTipoSeleccionado === "todos" ||
        ubicacion.tipo === lastTipoSeleccionado
      ) {
        const distancia = getDistance(coord, ubicacionActual);

        if (distancia <= rangoSeleccionado) {
          if (!markers.some((marker) => marker.getPosition().equals(coord))) {
            createMarker(
              coord,
              ubicacion.precio,
              map,
              ubicacion.nombre,
              ubicacion.direccion,
              ubicacion.celular,
              ubicacion.horario,
              ubicacion.descripcion,
              ubicacion.tipo,
              ubicacion.cantespacios,
              ubicacion.imagenURL,
              ubicacion.disponibilidad
            );
          }
        }
      }
    });
  });

  rangoSelector.addEventListener("change", function () {
    const rangoSeleccionado = Number(rangoSelector.value);
    const radioEnMetros = rangoSeleccionado * 1000;

    updateRangeCircle(ubicacionActual, radioEnMetros);
  });
  console.log(markerData);
}


/*//////////////////////////////////////////////////////////////////
[ SLIDERJS ]*/

document.addEventListener("DOMContentLoaded", function () {
  new Splide(".splide", {
    type: "slide",
    perPage: 1,
    focus: "center",
    pagination: true,
    arrows: true,
  }).mount();
});

document.addEventListener("DOMContentLoaded", function () {
  const showModalBtn = document.getElementById("showModalBtn");
  const hideModalBtn = document.getElementById("hideModalBtn");
  const hideModalBtn2 = document.getElementById("hideModalBtn2");
  const modal = document.querySelector(".modal");

  showModalBtn.addEventListener("click", function () {
    modal.classList.remove("hidden");
  });

  hideModalBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  hideModalBtn2.addEventListener("click", function () {
    modal.classList.add("hidden");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const createSpan = document.getElementById("create-span");
  const loginSpan = document.getElementById("login-span");
  const loginDiv = document.getElementById("H-login");
  const logoutDiv = document.getElementById("H-logout");

  createSpan.addEventListener("click", () => {
    loginDiv.style.display = "none";
    logoutDiv.style.display = "block";
  });

  loginSpan.addEventListener("click", () => {
    loginDiv.style.display = "block";
    logoutDiv.style.display = "none";
  });
});


//MICROFONO
// Obtener referencias a los elementos del DOM
const startButton = document.getElementById('startButton');
const resultDiv = document.getElementById('result');
const infoContainer = document.getElementById('info-container');

// Verificar si el navegador soporta la API de reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
  // Crear una instancia de reconocimiento de voz
  const recognition = new webkitSpeechRecognition();

  // Configurar el idioma (opcional)
  recognition.lang = 'es';

  // No detener la grabación automáticamente después de que se detecte un final de voz
  recognition.continuous = true;

  // Variable de estado para verificar si la captura de voz está en curso
  let isCapturing = false;

  // Referencia al temporizador
  let timeout;

  // Evento que se dispara cuando se recibe una transcripción
  recognition.onresult = function (event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    resultDiv.textContent += transcript;

    // Llama a la función realizarAcciones() con el texto capturado por voz
    realizarAcciones(transcript);
    realizarAcciones2(transcript);
  };

  // Evento que se dispara cuando se hace clic en el botón de inicio
  startButton.addEventListener('click', function () {
    if (isCapturing) {
      recognition.stop();
      resultDiv.textContent = ''; // Limpiar el contenido capturado
      clearTimeout(timeout); // Limpiar el temporizador
      startButton.innerHTML = '<img src="https://icongr.am/jam/mic-alt.svg?size=20&color=222222" alt="" class="icon-micro" />';
    } else {
      recognition.start();
      startButton.innerHTML = '<img src="https://icongr.am/jam/mic-alt-off.svg?size=20&color=222222" alt="" class="icon-micro" />';
      timeout = setTimeout(function () {
        recognition.stop();
        resultDiv.textContent = ''; // Limpiar el contenido capturado
        startButton.innerHTML = '<img src="https://icongr.am/jam/mic-alt.svg?size=20&color=222222" alt="" class="icon-micro" />';
      }, 7000); // 7 segundos (7000 milisegundos)
    }
    isCapturing = !isCapturing;
  });

  // Evento que se dispara cuando la captura de voz se detiene
  recognition.onend = function () {
    clearTimeout(timeout); // Limpiar el temporizador
    startButton.innerHTML = '<img src="https://icongr.am/jam/mic-alt.svg?size=20&color=222222" alt="" class="icon-micro" />';
  };

  function realizarAcciones(texto) {
    // Convertir el texto a minúsculas para facilitar la comparación
    const textoLowerCase = texto.toLowerCase();
  
    // Verificar si el texto contiene la palabra clave "estacionamiento" y el nombre de un estacionamiento específico
    if (textoLowerCase.includes('estacionamiento')) {
      const palabras = textoLowerCase.split(' ');
      const indexEstacionamiento = palabras.indexOf('estacionamiento');
  
      if (indexEstacionamiento !== -1 && indexEstacionamiento < palabras.length - 1) {
        const nombreEstacionamiento = palabras[indexEstacionamiento + 1];
  
        // Filtrar los estacionamientos en markerData por el nombre
        const estacionamientosFiltrados = markerData.filter(dato => dato.nombre === nombreEstacionamiento);
  
        if (estacionamientosFiltrados.length > 0) {
          console.log("Estacionamiento encontrado en la base de datos");
          // Obtener la latitud y longitud del primer estacionamiento encontrado
          const estacionamiento = estacionamientosFiltrados[0];
          const latitud = estacionamiento.latitud;
          const longitud = estacionamiento.longitud;
          const precio = estacionamiento.precio;
          const espacio = estacionamiento.espacio;
          const disponibilidad = estacionamiento.disponibilidad;
  
          if (disponibilidad === false) {
            console.log("Estacionamiento encontrado, pero no hay espacios disponibles Por favor, selecciona otro.");
            decirEnVozAlta("Estacionamiento encontrado, pero no hay espacios disponibles Por favor, selecciona otro.");
          } else {
            decirEnVozAlta(`Encontré el Estacionamiento ${nombreEstacionamiento}, cuenta con ${espacio} espacio disponibles La tarifa es ${precio} nuevos soles`);
            // Generar la ruta hacia el estacionamiento utilizando la latitud y longitud
            crearRuta(latitud, longitud);
          }
        } else {
          console.log('No se encontraron estacionamientos con ese nombre');
          decirEnVozAlta(`No encontré el estacionamiento ${nombreEstacionamiento}, no existe o no está en el rango de kilómetros seleccionado`);
        }
  
        return; // Detener la ejecución del resto del código en esta función
      }
    }
  
    // Si no se encontró una coincidencia específica, puedes realizar otras acciones o respuestas genéricas aquí
    console.log('No se encontró una acción específica para el texto capturado');
  }
  
  
  
  

  function realizarAcciones2(texto) {
    // Convertir el texto a minúsculas para facilitar la comparación
    const textoLowerCase = texto.toLowerCase();
  
    // Verificar si el texto contiene la palabra clave "muestra la lista"
    if (textoLowerCase.includes('muestra la lista')) {
      for (const elemento in markerData) {
        const nombreDato = markerData[elemento].nombre;
        const precioDato = markerData[elemento].precio; // Suponiendo que cada dato en markerData tiene una propiedad "precio"
        const cantidadEspacios = markerData[elemento].espacios; // Suponiendo que cada dato en markerData tiene una propiedad "espacios"
        const mensaje = `${nombreDato}, el precio es: ${precioDato}, y la cantidad de espacios: ${cantidadEspacios}`;
        decirEnVozAlta(mensaje);
      }
    
      return;
    }
  
    // Si no se encontró una coincidencia específica, puedes realizar otras acciones o respuestas genéricas aquí
    console.log('No se encontró una acción específica para el texto capturado');
  }
  



  function crearRuta(Latitud, Longitud) {
    // Aquí tienes el código de la función crearRuta() que se proporcionó anteriormente
    if (destinoMarker && destinoMarker.getPosition().equals(Latitud, Longitud)) {
      // el usuario hizo clic en el mismo marcador de destino
      return;
    }

    directionsDisplay.setDirections({ routes: [] });

    if (destinoMarker) {
      // elimina el marcador de destino anterior si existe
      destinoMarker.setMap(null);
    }

    // Crea la solicitud para la ruta
    var solicitud = {
      origin: marker.getPosition(),
      destination: new google.maps.LatLng(Latitud, Longitud),
      travelMode: "DRIVING",
    };

    // Llama al servicio de direcciones para obtener la ruta
    directionsService.route(solicitud, function (resultado, estado) {
      if (estado === "OK") {
        // Muestra la ruta en el mapa
        directionsDisplay.setDirections(resultado);
      }
    });
  }

  function calcularDistancia(latitud1, longitud1, latitud2, longitud2) {
    const radioTierra = 6371; // Radio medio de la Tierra en kilómetros
    const dLat = toRadian(latitud2 - latitud1);
    const dLon = toRadian(longitud2 - longitud1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(latitud1)) * Math.cos(toRadian(latitud2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c;
    return distancia;
  }
  
  function toRadian(grados) {
    return grados * (Math.PI / 180);
  }
  

  function decirEnVozAlta(texto) {
    const utterance = new SpeechSynthesisUtterance(texto);
    speechSynthesis.speak(utterance);
  }
} else {
  // El navegador no soporta la API de reconocimiento de voz
  resultDiv.textContent = 'El reconocimiento de voz no es compatible con tu navegador.';
  startButton.disabled = true;
}


document.addEventListener("DOMContentLoaded", function() {
  var listClose = document.getElementById("list-clo");
  if (listClose) {
    listClose.addEventListener("click", function() {
      var infoContainer = document.getElementById("info-container");
      if (infoContainer) {
        infoContainer.classList.remove("show");
        
      }
    });
  }
});