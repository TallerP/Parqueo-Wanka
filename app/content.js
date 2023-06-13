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
  disponibilidad,
) => {
  if (markers[nombre]) {
    // Si el marcador ya existe, no se crea nuevamente
    return;
  }

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

  const firebaseRef = firebase.database().ref("datos");
  firebaseRef.on("child_changed", (snapshot) => {
    const ubicacion = snapshot.val();
    const updatedPrecio = ubicacion.precio;
    const updatedDisponibilidad = ubicacion.disponibilidad;

    if (updatedPrecio !== precio) {
      precio = updatedPrecio;
      document.getElementById("ubicacion-precio").textContent = precio;
    }

    if (updatedDisponibilidad !== disponibilidad) {
      disponibilidad = updatedDisponibilidad;
      const updatedMarkerIcon = {
        url: disponibilidad ? "imgs/libre.svg" : "imgs/ocupado.svg",
        scaledSize: new google.maps.Size(43, 95),
      };
      marker.setIcon(updatedMarkerIcon);
    }

    // Actualiza el contenido restante del contenedor info-container
    document.getElementById("ubicacion-nombre").textContent = ubicacion.nombre;
    document.getElementById("ubicacion-precio").textContent = ubicacion.precio;
    document.getElementById("ubicacion-direccion").textContent = ubicacion.direccion;
    document.getElementById("ubicacion-horario").textContent = ubicacion.ubicacionHorario;
    document.getElementById("ubicacion-numcontact").textContent = ubicacion.numcontact;
    document.getElementById("ubicacion-descripcion").textContent = ubicacion.descripcion;
    document.getElementById("ubicacion-tipo").textContent = ubicacion.tipo;
    document.getElementById("ubicacion-espacio").textContent = ubicacion.espacio;
    var imagenURL = ubicacion.imagen;
    var imagenModal = document.getElementById("ubicacion-Image");
    imagenModal.src = imagenURL;
  });

  markers[nombre] = marker;
};

// Función para eliminar un

function loadFirebaseImage(imagenURL, callback) {
  var storageRef = firebase.storage().ref(imagenURL); //Ruta de la imagen
  var imageRef = storageRef.child(imagenURL);

  imageRef
    .getDownloadURL()
    .then(function (url) {
      callback(url);
    })
    .catch(function (error) {});
}

/*//////////////////////////////////////////////////////////////////
[ CREAR RUTA ]*/

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
    // document.getElementById("info-container").classList.remove("show");
  } else {
    document.getElementById("info-container").classList.remove("show");
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

  // map.setCenter(ubicacionActual);
  // map.setZoom(14);

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

