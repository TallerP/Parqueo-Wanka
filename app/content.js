// Configuración de Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDtpOfIff-7_ZKPcKzojiW8Q4lldvV8iwc",
  authDomain: "tallerproyectos2023-d32b7.firebaseapp.com",
  databaseURL: "https://tallerproyectos2023-d32b7-default-rtdb.firebaseio.com",
  projectId: "tallerproyectos2023-d32b7",
  storageBucket: "tallerproyectos2023-d32b7.appspot.com",
  messagingSenderId: "52196951713",
  appId: "1:52196951713:web:806d3df12faa67f673d2e0",
};

// Inicializar la aplicación de Firebase
firebase.initializeApp(firebaseConfig);
const firebaseRef = firebase.database().ref("datos");

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


/*//////////////////////////////////////////////////////////////////
[ INICIALIZACIÓN DEL MAPA]*/

let ubicacionActual = null;
let map;
let marker;
let destinoMarker = null;
let directionsDisplay;
let directionsService;
let markers = [];

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
    gestureHandling: "greedy"
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

  filterMarkers();
  createLocationMarkers();
}

/*//////////////////////////////////////////////////////////////////
[ CREAR MARKER ]*/
const { Subject, Observable } = rxjs;
const { map: rxjsMap } = rxjs.operators;

const marcad = new Map(); // Mapa para almacenar los marcadores existentes y sus datos

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
  let markerData = marcad.get(nombre);

  if (markerData) {
    // El marcador ya existe, actualizar los datos
    markerData.precio = precio;
    // Actualizar otros datos según sea necesario

    // Actualizar el icono del marcador según la disponibilidad
    const markerIcon = {
      url: disponibilidad ? "imgs/libre.svg" : "imgs/ocupado.svg",
      scaledSize: new google.maps.Size(43, 95),
    };
    markerData.marker.setIcon(markerIcon);

    // Actualizar la información del marcador en el infoWindow
    const contentString =
      '<div class="info-window">' +
      '<span class="info-price">' +
      precio +
      "</span>" +
      "</div>";
    markerData.infoWindow.setContent(contentString);
  } else {
    const markerIcon = {
      url: disponibilidad ? "imgs/libre.svg" : "imgs/ocupado.svg",
      scaledSize: new google.maps.Size(43, 95),
    };

    const marker = new google.maps.Marker({
      position: coord,
      map: map,
      icon: markerIcon,
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

    infoWindow.open(map, marker);

    marker.addListener("click", function () {
      crearRuta(coord);

      dataSubject.next({
        nombre,
        precio,
        direccion,
        ubicacionHorario,
        numcontact,
        descripcion,
        tipo,
        espacio,
        imagen,
      });

      document.getElementById("info-container").classList.add("show");
    });

    markerData = {
      marker,
      precio,
      direccion,
      numcontact,
      ubicacionHorario,
      descripcion,
      tipo,
      espacio,
      imagen,
      infoWindow,
    };

    marcad.set(nombre, markerData);
  }

  // Notificar los cambios al subscriber
  dataSubject.next({
    nombre,
    precio,
    direccion,
    ubicacionHorario,
    numcontact,
    descripcion,
    tipo,
    espacio,
    imagen,
  });
};

// Resto del código...



function crearRuta(destino) {
  if (destinoMarker && destinoMarker.getPosition().equals(destino)) {
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
    destination: destino,
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

const dataSubject = new Subject();

const dataObservable = dataSubject.asObservable();

dataObservable
  .pipe(
    rxjsMap((data) => {
      // Actualizar solo los marcadores modificados
      const modifiedMarkers = [];
      for (const [nombre, markerData] of marcad.entries()) {
        if (data && data.nombre === nombre) {
          // Encontrar marcador existente con datos modificados
          markerData.precio = data.precio;
          // Actualizar otros datos según sea necesario
          modifiedMarkers.push(markerData.marker);
        }
      }
      return modifiedMarkers;
    })
  )
  .subscribe((modifiedMarkers) => {
    // Actualizar los marcadores modificados en el mapa
    for (const marker of modifiedMarkers) {
      // Actualizar la información del marcador en la interfaz según sea necesario
    }
  });

// Suscribirse al Observable
dataObservable.subscribe((data) => {
  if (data) {
    document.getElementById("ubicacion-nombre").textContent = data.nombre;
    document.getElementById("ubicacion-precio").textContent = data.precio;
    document.getElementById("ubicacion-direccion").textContent =
      data.direccion;
    document.getElementById("ubicacion-horario").textContent =
      data.ubicacionHorario;
    document.getElementById("ubicacion-numcontact").textContent =
      data.numcontact;
    document.getElementById("ubicacion-descripcion").textContent =
      data.descripcion;
    document.getElementById("ubicacion-tipo").textContent = data.tipo;
    document.getElementById("ubicacion-espacio").textContent = data.espacio;
    var imagenURL = data.imagen;
    var imagenModal = document.getElementById("ubicacion-Image");
    imagenModal.src = imagenURL;

    document.getElementById("info-container").classList.add("show");
  } else {
    // Manejar el valor inicial (null) aquí
  }
});



/*//////////////////////////////////////////////////////////////////
[ CREAR RUTA ]*/


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

/*//////////////////////////////////////////////////////////////////
[ FILTER  ]*/
let rangeCircle = null;

function filterMarkers() {
  const rangoSeleccionado = Number(rangoSelector.value);

  if (lastTipoSeleccionado) {
    
  } else {
    
  }

  markers.forEach((marker) => marker.setMap(null));
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
        
        if (distancia <= rangoSeleccionado && !markers.includes(coord)) {
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
    });
  });

  rangoSelector.addEventListener("change", function () {
    const rangoSeleccionado = Number(rangoSelector.value);
    const radioEnMetros = rangoSeleccionado * 1000;

    updateRangeCircle(ubicacionActual, radioEnMetros);
  });
}

const createLocationMarkers = () => {
  // Obtiene los filtros seleccionados
  const tipoEstacionamiento = document.getElementById("tipo").value;

  // Obtén los datos de ubicaciones desde Firebase Realtime Database
  const firebaseRef = firebase.database().ref("datos");
  firebaseRef.on("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const ubicacion = childSnapshot.val();
      const coord = new google.maps.LatLng(
        ubicacion.Latitud,
        ubicacion.Longitud
      );
      const disponibilidad = ubicacion.disponibilidad;

      // Configura las opciones de filtrado para la ubicación actual
      const options = {
        tipoEstacionamiento: ubicacion.tipo,
      };

      // Comprueba si la ubicación coincide con los filtros seleccionados
      if (filterMarkers(options, tipoEstacionamiento)) {
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
          disponibilidad
        );
      }
    });
  });
};
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
  recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    resultDiv.textContent += transcript;

    // Llama a la función crearRuta() con el destino capturado por voz
    crearRuta(transcript);
  };

  // Evento que se dispara cuando se hace clic en el botón de inicio
  startButton.addEventListener('click', function() {
    if (isCapturing) {
      recognition.stop();
      resultDiv.textContent = ''; // Limpiar el contenido capturado
      clearTimeout(timeout); // Limpiar el temporizador
      startButton.innerHTML = '<img src="https://icongr.am/jam/mic-alt.svg?size=20&color=222222" alt="" class="icon-micro" />';
    } else {
      recognition.start();
      startButton.innerHTML = '<img src="https://icongr.am/jam/mic-alt-off.svg?size=20&color=222222" alt="" class="icon-micro" />';
      timeout = setTimeout(function() {
        recognition.stop();
        resultDiv.textContent = ''; // Limpiar el contenido capturado
        startButton.innerHTML = '<img src="https://icongr.am/jam/mic-alt.svg?size=20&color=222222" alt="" class="icon-micro" />';
      }, 7000); // 7 segundos (7000 milisegundos)
    }
    isCapturing = !isCapturing;
  });

  // Evento que se dispara cuando la captura de voz se detiene
  recognition.onend = function() {
    clearTimeout(timeout); // Limpiar el temporizador
    startButton.innerHTML = '<img src="https://icongr.am/jam/mic-alt.svg?size=20&color=222222" alt="" class="icon-micro" />';
  };

  function crearRuta(destino) {
    // ...

    if (destinoMarker && destinoMarker.getPosition().equals(destino)) {
      // El usuario hizo clic en el mismo marcador de destino
      return;
    }

    directionsDisplay.setDirections({ routes: [] });

    if (destinoMarker) {
      // Elimina el marcador de destino anterior si existe
      destinoMarker.setMap(null);
    }

    // Consulta los nombres en la base de datos de Firebase
    const nombresRef = firebase.database().ref('nombre');
    nombresRef.once('value', function(snapshot) {
      const nombres = snapshot.val();

      // Busca coincidencias con el destino capturado por voz
      const coincidencia = Object.keys(nombres).find(function(nombre) {
        return destino.toLowerCase().includes(nombre.toLowerCase());
      });

      if (coincidencia) {
        const estacionamiento = nombres[coincidencia];
        const estacionamientoLocation = new google.maps.LatLng(estacionamiento.lat, estacionamiento.lng);

        // Crea la solicitud para la ruta
        const solicitud = {
          origin: marker.getPosition(),
          destination: estacionamientoLocation,
          travelMode: "DRIVING",
        };

        // Llama al servicio de direcciones para obtener la ruta
        directionsService.route(solicitud, function(resultado, estado) {
          if (estado === "OK") {
            // Muestra la ruta en el mapa
            directionsDisplay.setDirections(resultado);
          }
        });
      } else {
        console.log('No se encontró ninguna coincidencia con el destino capturado por voz');
      }
    });

    // Resto del código...
  }
} else {
  // El navegador no soporta la API de reconocimiento de voz
  resultDiv.textContent = 'El reconocimiento de voz no es compatible con tu navegador.';
  startButton.disabled = true;
}

