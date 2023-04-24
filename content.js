

var ubicacionActual;
var map;
var marker;
var autocomplete;
var directionsDisplay;
var directionsService;
var solicitud;
var markerDestino;

var markers=[];

// Verificar si el navegador admite la API de geolocalización
if (navigator.geolocation) {
  // Solicitar permiso al usuario para obtener su ubicación
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // Obtener la ubicación del usuario
      var latitud = position.coords.latitude;
      var longitud = position.coords.longitude;
      ubicacionActual = { lat: latitud, lng: longitud };
      // Imprimir la ubicación en la consola del navegador

      // Aquí puedes utilizar la variable "ubicacion" para mostrar la ubicación en la página web
      initMap();
    },
    function (error) {
      // Ha ocurrido un error al obtener la ubicación del usuario
      console.log("Ha ocurrido un error al obtener la ubicación del usuario");
      initMap();
    }
  );
} else {
  // El navegador no admite la API de geolocalización
  console.log("El navegador no admite la API de geolocalización");
  initMap();
}

const createMarker = (coord, name, map) => {
  const marker = new google.maps.Marker({
    position: coord,
    map: map,
    title: name
  });
  return marker;
}

const createLocationMarkers = ()=>{
  ubicaciones.forEach((ubicacion) => {
    const coord = new google.maps.LatLng(ubicacion.lat, ubicacion.lng);
    createMarker(coord, ubicacion.nombre, map);
  });
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: ubicacionActual,
    zoom: 15,
    mapId:"ab9ec8e84265fcee",
  });

  marker = new google.maps.Marker({
    position: ubicacionActual,
    map: map,
    icon: {
      url: "https://icongr.am/material/car.svg?size=128&color=ff0000",
      scaledSize: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(12, 12),
    },
    draggable: true,
  });

  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("input-lugar")
  );

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true, // Elimina marcadores y las letras "A" y "B"
    polylineOptions: {
      strokeColor: "#6cf000", // Cambiar el color de la ruta
      strokeWeight: 8, // Grosor de la ruta
    },
    map: map,
  });
  directionsDisplay.setMap(map);

  document.getElementById("btn-buscar").addEventListener("click", function () {
    buscarRuta();
  });

  document.getElementById("btn-limpiar").addEventListener("click", function () {
    limpiarRuta();
  });

  var markerDestino = localStorage.getItem("ruta");
  if (markerDestino) {
    var solicitud = JSON.parse(markerDestino);
    directionsService.route(solicitud, function (resultado, estado) {
      if (estado === "OK") {
        directionsDisplay.setDirections(resultado);
        // Cambiar el ícono del marker del destino
        var marker = new google.maps.Marker({
          position: solicitud.destination,
          map: map,
          icon: {
            url: "https://icongr.am/entypo/location-pin.svg?size=50&color=ff8800",
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(40, 40)
          }
        });
      } else {
        console.log("Ha ocurrido un error al obtener la ruta: " + estado);
      }
    });
  }
  createLocationMarkers()
}

function buscarRuta() {
  var lugar = autocomplete.getPlace();
  if (!lugar.geometry) {
    console.log("No se ha encontrado la ubicación: " + lugar.name);
    return;
  }

  // Obtener la ubicación del destino
  var destino = lugar.geometry.location;

  // Crear la solicitud de ruta
  solicitud = {
    origin: ubicacionActual, // Usar la ubicación actual como origen
    destination: destino,
    travelMode: "DRIVING",
  };
  
  localStorage.setItem("ruta", JSON.stringify(solicitud));
  var solicitudGuardada = localStorage.getItem("ruta");

  if (solicitudGuardada) {
    localStorage.getItem("ruta")
    directionsService.route(solicitud, function (resultado, estado) {
      if (estado === "OK") {
        directionsDisplay.setDirections(resultado);
        // Cambiar el ícono del marker del destino
        if (markerDestino) {
          markerDestino.setMap(null);
        }

        markerDestino = new google.maps.Marker({
          position: destino,
          map: map,
          icon: {
            url: "https://icongr.am/entypo/location-pin.svg?size=50&color=ff8800",
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(40, 40),
          },
        });
      } else {
        console.log("Ha ocurrido un error al obtener la ruta: " + estado);
      }
    });
    directionsDisplay.setDirections(solicitud);
  }
}

function limpiarRuta() {
  // Limpiar el campo de entrada del destino
  document.getElementById("input-lugar").value = "";

  // Eliminar la ruta y el marcador de destino del mapa
  directionsDisplay.setDirections({ routes: [] });
  if (markerDestino) {
    markerDestino.setMap(null);
    markerDestino = null;
  }
  localStorage.removeItem("ruta");
}

var btnLimpiar = document.getElementById("btn-limpiar");
btnLimpiar.addEventListener("click", limpiarRuta);


/** Toggle function */

const selectedOption = document.querySelector('.selected-option')
const selectValue = document.querySelector('.select-value')
const optionContainer = document.querySelector('.options')
const optionList = document.querySelectorAll('.option') 

/** Toggle function */
const selectToggle = ()=> {
    if(optionContainer.dataset.toggle == 'collapsed') {
        optionContainer.dataset.toggle = ''
    } else {
        optionContainer.dataset.toggle = 'collapsed'
    }
}


/** When click on selected-option */
selectedOption.addEventListener('click', selectToggle)


/** This function update select value */
const updateSelectValue = (option) => {
    selectValue.innerText = option.innerText;
}

optionList.forEach((option) => {
    option.addEventListener('click', (e)=> {
        updateSelectValue(option)
        selectToggle()
    })
})