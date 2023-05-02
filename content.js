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
      url: "https://icongr.am/material/car.svg?size=32&color=ff0000",
      scaledSize: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(12, 12),
    },
    draggable: true,
  });

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true, // Elimina marcadores y las letras "A" y "B"
    polylineOptions: {
      strokeColor: "#ffc107", // Cambiar el color de la ruta
      strokeWeight: 8, // Grosor de la ruta
    },
    map: map,
  });
  directionsDisplay.setMap(map);

  createLocationMarkers();
}

const createMarker = (coord, precio, map, ubicacionNombre, ubicacionDireccion, ubicacionNumcontact, ubicacionHorario, ubicacionDescripcion, disponibilidad) => {
  
  const markerIcon = {
    url: disponibilidad
      ? "https://icongr.am/material/alert.svg?size=35&color=00ff08"
      : "https://icongr.am/material/alert.svg?size=35&color=ff0000",
    scaledSize: new google.maps.Size(35, 35),
  };

  const marker = new google.maps.Marker({
    position: coord,
    map: map,
    icon: markerIcon,
  });

  const contentString =
    '<div class="info-window">' + "<h3>" + precio + "</h3>" + "</div>";

  const infoWindow = new google.maps.InfoWindow({
    content: contentString,
    closeBoxURL: "",
  });

  // Abre el infoWindow cuando se carga el mapa
  infoWindow.open(map, marker);

  marker.addListener("click", function () { 
    crearRuta(coord);
    
    document.getElementById("ubicacion-nombre").textContent = ubicacionNombre;
    document.getElementById("ubicacion-precio").textContent = precio;
    document.getElementById("ubicacion-direccion").textContent = ubicacionDireccion;
    document.getElementById("ubicacion-horario").textContent = ubicacionHorario;
    document.getElementById("ubicacion-numcontact").textContent = ubicacionNumcontact;
    document.getElementById("ubicacion-descripcion").textContent = ubicacionDescripcion;

    // Muestra el div en la pantalla
    document.getElementById("info-container").classList.add("show");
    document.getElementById("info-box").style.display = "block";
  });
  return marker;
};

const createLocationMarkers = () => {
  ubicaciones.forEach((ubicacion) => {
    const coord = new google.maps.LatLng(ubicacion.lat, ubicacion.lng);
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
      disponibilidad
    );
  });
};

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

/** Toggle function */

const selectedOption = document.querySelector(".selected-option");
const selectValue = document.querySelector(".select-value");
const optionContainer = document.querySelector(".options");
const optionList = document.querySelectorAll(".option");

/** Toggle function */
const selectToggle = () => {
  if (optionContainer.dataset.toggle == "collapsed") {
    optionContainer.dataset.toggle = "";
  } else {
    optionContainer.dataset.toggle = "collapsed";
  }
};

/** When click on selected-option */
selectedOption.addEventListener("click", selectToggle);

/** This function update select value */
const updateSelectValue = (option) => {
  selectValue.innerText = option.innerText;
};

optionList.forEach((option) => {
  option.addEventListener("click", (e) => {
    updateSelectValue(option);
    selectToggle();
  });
});
