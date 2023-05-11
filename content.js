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

/*//////////////////////////////////////////////////////////////////
[ INICIALIZACIÓN DEL MAPA]*/

let ubicacionActual;
let map;
let marker;
let destinoMarker = null;
let directionsDisplay;
let directionsService;
let markers = [];

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var latitud = position.coords.latitude;
      var longitud = position.coords.longitude;
      ubicacionActual = { lat: latitud, lng: longitud };

      initMap();
    },
    function (error) {
      console.log("Ha ocurrido un error al obtener la ubicación del usuario");
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
    zoom: 15,
    mapTypeControl: false,
    mapId: "ab9ec8e84265fcee",
    streetViewControl: false,
    zoomControl: false,
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
  disponibilidad
) => {
  const markerIcon = {
    url: disponibilidad ? "imgs/libre.png" : "imgs/ocupado.png",
    scaledSize: new google.maps.Size(43, 65),
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
    // Muestra el div en la pantalla
    document.getElementById("info-container").classList.add("show");
  });

  markers.push(marker);
};

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

/*//////////////////////////////////////////////////////////////////
[ OPTION TIPO ]*/
const tipoSelector = document.getElementById("tipo");

document.addEventListener("DOMContentLoaded", () => {
  tipoSelector.addEventListener("change", (event) => {
    const tipoSeleccionado = event.target.value;
    filterMarkers(tipoSeleccionado);
  });
});

let lastTipoSeleccionado = "todos";
let ubicacionesFiltradas = []; // Variable para almacenar las ubicaciones filtradas

rangoSelector.addEventListener("change", () => {
  filterMarkers(lastTipoSeleccionado);
});

tipoSelector.addEventListener("change", (event) => {
  lastTipoSeleccionado = event.target.value;
  filterMarkers(lastTipoSeleccionado);
});

/*//////////////////////////////////////////////////////////////////
[ FILTRAR ]*/
// Definir la variable ubicaciones
let ubicaciones = [];

// Obtener los datos de ubicaciones desde Firebase Realtime Database
firebaseRef.once("value", (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const ubicacion = childSnapshot.val();
    ubicaciones.push(ubicacion);
  });

  // Una vez cargados los datos, puedes llamar a la función para crear los marcadores
  createLocationMarkers();
});

function filterMarkers(tipoSeleccionado = "todos") {
  const rangoSeleccionado = Number(rangoSelector.value);

  let ubicacionesFiltradas;

  if (tipoSeleccionado === "todos") {
    ubicacionesFiltradas = ubicaciones;
    document.getElementById("info-container").classList.remove("show");
  } else {
    ubicacionesFiltradas = ubicaciones.filter(
      (ubicacion) => ubicacion.tipo === tipoSeleccionado
    );
    document.getElementById("info-container").classList.remove("show");
  }

  // Borra todos los marcadores del mapa
  markers.forEach((marker) => marker.setMap(null));
  markers = [];

  // Al seleccionar otro filtro elimina la ruta que se estableció anteriormente
  directionsDisplay.setDirections({ routes: [] });

  // Crea marcadores para las ubicaciones filtradas
  ubicacionesFiltradas.forEach((ubicacion) => {
    const coord = new google.maps.LatLng(ubicacion.Latitud, ubicacion.Longitud);
    const ubicacionActual = map.getCenter(); // Obtén las coordenadas actuales del mapa
    const distancia = getDistance(coord, ubicacionActual);

    if (distancia <= rangoSeleccionado) {
      const disponibilidad = ubicacion.disponibilidad;

      createMarker(
        coord,
        ubicacion.precio,
        map,
        ubicacion.nombre,
        ubicacion.direccion,
        ubicacion.numcontact,
        ubicacion.horario,
        ubicacion.descripcion,
        ubicacion.tipo,
        ubicacion.cantespacios,
        disponibilidad
      );
    }
  });
}

const createLocationMarkers = () => {
  // Obtiene los filtros seleccionados
  const tipoEstacionamiento = document.getElementById("tipo").value;

  // Crea marcadores para todas las ubicaciones
  ubicaciones.forEach((ubicacion) => {
    const coord = new google.maps.LatLng(ubicacion.Latitud, ubicacion.Longitud);
    const ubicacionActual = map.getCenter(); // Obtén las coordenadas actuales del mapa
    const distancia = getDistance(coord, ubicacionActual);

    if (tipoEstacionamiento === "todos" || ubicacion.tipo === tipoEstacionamiento) {
      const disponibilidad = ubicacion.disponibilidad;

      createMarker(
        coord,
        ubicacion.precio,
        map,
        ubicacion.nombre,
        ubicacion.direccion,
        ubicacion.numcontact,
        ubicacion.horario,
        ubicacion.descripcion,
        ubicacion.tipo,
        ubicacion.cantespacios,
        disponibilidad
      );
    }
  });
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
