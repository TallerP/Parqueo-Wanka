document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDtpOfIff-7_ZKPcKzojiW8Q4lldvV8iwc",
    authDomain: "tallerproyectos2023-d32b7.firebaseapp.com",
    databaseURL:
      "https://tallerproyectos2023-d32b7-default-rtdb.firebaseio.com",
    projectId: "tallerproyectos2023-d32b7",
    storageBucket: "tallerproyectos2023-d32b7.appspot.com",
    messagingSenderId: "52196951713",
    appId: "1:52196951713:web:806d3df12faa67f673d2e0",
  };

  firebase.initializeApp(firebaseConfig);
  updateMarkers();
  createLocationMarkers();
});

/*//////////////////////////////////////////////////////////////////
[ INICIALIZACIÓN DEL MAPA]*/

let ubicacionActual = new google.maps.LatLng(0, 0); // Asigna las coordenadas iniciales deseadas
var map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: -12.047584535894167, lng: -75.19913860560352 },
  zoom: 8,
});

var marker;
var destinoMarker = null;
var directionsDisplay;
var directionsService;
var markers = [];
var markerData = [];

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
/*//////////////////////////////////////////////////////////////////
[ MARKER ]*/

const firebaseURL =
  "https://tallerproyectos2023-d32b7-default-rtdb.firebaseio.com/datos.json";
const markerClickSubject = new rxjs.Subject();
var selectedMarker = null;

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

  const content = buildContent({
    precio: precio,
    nombre: nombre,
    direccion: direccion,
    numcontact: numcontact,
    ubicacionHorario: ubicacionHorario,
    descripcion: descripcion,
    tipo: tipo,
    espacio: espacio,
    imagen: imagen,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: content,
  });

  infoWindow.open(map, marker);

  marker.addListener("click", function () {
    if (selectedMarker === marker) {
      selectedMarker = null;
      clearAdditionalInfo();
    } else {
      selectedMarker = marker;
      crearRuta(coord);
      showAdditionalInfo(
        nombre,
        precio,
        direccion,
        numcontact,
        ubicacionHorario,
        descripcion,
        tipo,
        espacio,
        imagen
      );
      infoWindow.open(map, marker);
    }
  });

  markers.push(marker); // Agregar el marcador a la variable "markers"
};

function buildContent(property) {
  const content = document.createElement("div");

  content.classList.add("property");
  content.innerHTML = `<div class="icon"> <span class="fa-sr-only">S/. ${property.precio}</span></div>`;
  return content;
}



function showAdditionalInfo(
  nombre,
  precio,
  direccion,
  numcontact,
  ubicacionHorario,
  descripcion,
  tipo,
  espacio,
  imagenURL
) {
  const additionalInfoDiv = document.getElementById("additional-info");
  additionalInfoDiv.innerHTML =`
        <div >
          <div class="spli">
          <img
          id="ubicacion-Image"
          src="${imagenURL}"
          alt=""
          class="list-item-img"
          loading="lazy"
        />
          </div>
          <div class="c-explorar-list-title">
            <h1 >${nombre}</h1>
            <span>
              4,7 -
              <img
                src="https://icongr.am/entypo/star.svg?size=15&color=ffc107"
                alt=""
              />
              <img
                src="https://icongr.am/entypo/star.svg?size=15&color=ffc107"
                alt=""
              />
              <img
                src="https://icongr.am/entypo/star.svg?size=15&color=ffc107"
                alt=""
              />
              <img
                src="https://icongr.am/entypo/star.svg?size=15&color=ffc107"
                alt=""
              />
              <img
                src="https://icongr.am/entypo/star.svg?size=15&color=ffc107"
                alt=""
              />
              (11.116)</span
            >
            <span>Playa de estacionamiento</span>
          </div>
          <div class="c-explorar-list-import">
            <div class="content-precio">
              <span class="content-precio-title">Tarifa</span>
              <div class="content-precio-det">
                <img
                  src="https://icongr.am/jam/pin-alt-f.svg?size=20&color=fb3447"
                  alt=""
                />
                <h2>
                  S/.
                  ${precio}
                  x hora
                </h2>
              </div>
            </div>
            <div class="content-precio">
              <span class="content-precio-title">Disponibles</span>
              <div class="content-precio-det">
                <img
                  src="https://icongr.am/jam/car-f.svg?size=20&color=fb3447"
                  alt=""
                />
                <h2>
                  <span
                    id="ubicacion-espacio"
                    class="content-precio-det-text"
                  >${espacio}</span>
                  espacio(s)
                </h2>
              </div>
            </div>
            <div class="content-precio">
              <span class="content-precio-title">Tipo de estacionamiento</span>
              <div class="content-precio-det">
                <img
                  src="https://icongr.am/jam/home-f.svg?size=18&color=fb3447"
                  alt=""
                />
                <h2>
                ${tipo}
                </h2>
              </div>
            </div>
          </div>
          <div class="c-explorar-list-detall">
            <div class="c-explorar-list-detall-item">
              <img
                src="https://icongr.am/jam/map-marker-f.svg?size=22&color=14bbf0"
                alt=""
              />
              <h3 id="ubicacion-direccion"> ${direccion}</h3>
            </div>
            <div class="c-explorar-list-detall-item">
              <img
                src="https://icongr.am/jam/chronometer-f.svg?size=25&color=14bbf0"
                alt=""
              />
              <h3 id="ubicacion-horario">${ubicacionHorario}</h3>
            </div>
            <div class="c-explorar-list-detall-item">
              <img
                src="https://icongr.am/jam/viber.svg?size=22&color=14bbf0"
                alt=""
              />
              <h3 id="ubicacion-numcontact">${numcontact}</h3>
            </div>
            <div class="c-explorar-list-detall-item">
              <img
                src="https://icongr.am/jam/clipboard-f.svg?size=22&color=14bbf0"
                alt=""
              />
              <h3 id="ubicacion-descripcion">${descripcion}</h3>
            </div>
          </div>
          <div class="c-explorar-list-btn">
            <button class="btn-rese">
              <img
                src="https://icongr.am/jam/write-f.svg?size=15&color=14bbf0"
                alt=""
              />
              Escribir una reseña
            </button>
          </div>
        </div>
  
        `;
        const additionalInfoCont = document.getElementById("additional-container");
        additionalInfoCont.style.display = "block";
}

function clearAdditionalInfo() {
  const additionalInfoDiv = document.getElementById("additional-info");
  additionalInfoDiv.innerHTML = "";

  const additionalInfoCont = document.getElementById("additional-container");
  additionalInfoCont.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  const closeButton = document.getElementById("list-clo");
  closeButton.addEventListener("click", function() {
    clearAdditionalInfo();
  });
});



const updateMarkers = () => {
  fetch(firebaseURL)
    .then((response) => response.json())
    .then((data) => {
      const dataArray = Object.values(data);

      // Limpiar los marcadores existentes
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // Iterar sobre los datos actualizados y crear nuevos marcadores
      dataArray.forEach((item) => {
        const coord = new google.maps.LatLng(item.Latitud, item.Longitud);
        const precio = item.precio;
        const nombre = item.nombre;
        const direccion = item.direccion;
        const numcontact = item.celular;
        const ubicacionHorario = item.horario;
        const descripcion = item.descripcion;
        const tipo = item.tipo;
        const espacio = item.cantespacios;
        const imagen = item.imagenURL;
        const disponibilidad = item.disponibilidad;

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

      // Filtrar los marcadores según sea necesario
      filterMarkers();
    })
    .catch((error) => {
      console.log("Error al obtener los datos:", error);
    });
};

/*//////////////////////////////////////////////////////////////////
[ CREAR RUTA ]*/

function crearRuta(destino) {
  console.log(destino);
  if (ubicacionActual && destino) {
    const request = {
      origin: ubicacionActual,
      destination: destino,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
        directionsDisplay.setOptions({ preserveViewport: true });
      }
    });
  }
}

/*//////////////////////////////////////////////////////////////////
[ OPTION TIPO ]*/

var lastTipoSeleccionado = "todos";
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

const createLocationMarkers = () => {
  markers.forEach((marker) => {
    const coord = new google.maps.LatLng(marker.Latitud, marker.Longitud);
    const precio = marker.precio;
    const nombre = marker.nombre;
    const direccion = marker.direccion;
    const numcontact = marker.celular;
    const ubicacionHorario = marker.horario;
    const descripcion = marker.descripcion;
    const tipo = marker.tipo;
    const espacio = marker.cantespacios;
    const imagen = marker.imagenURL;
    const disponibilidad = marker.disponibilidad;

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
};

/*//////////////////////////////////////////////////////////////////
[ FILTER  ]*/
var rangeCircle = null;

function filterMarkers() {
  if (ubicacionActual === null) {
    // Ubicacion actual no válida, haz algo en consecuencia
    return;
  }

  const rangoSeleccionado = Number(rangoSelector.value);

  const nuevosMarkers = [];

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

      nuevosMarkers.push(markerInfo);
    } else {
      if (marker instanceof google.maps.Marker) {
        marker.setMap(null);
      }
    }
  });

  markers = nuevosMarkers;

  if (directionsDisplay && directionsDisplay.setDirections) {
    directionsDisplay.setDirections({ routes: [] });
  }

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

        if (distancia <= rangoSeleccionado) {
          if (
            coord !== null &&
            coord !== undefined &&
            !markers.some(
              (marker) => marker.coord && marker.coord.equals(coord)
            )
          ) {
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

            markers.push({
              latitud: coord.lat(),
              longitud: coord.lng(),
              nombre: ubicacion.nombre,
              precio: ubicacion.precio,
              direccion: ubicacion.direccion,
              numcontact: ubicacion.celular,
              ubicacionHorario: ubicacion.horario,
              descripcion: ubicacion.descripcion,
              tipo: ubicacion.tipo,
              espacio: ubicacion.cantespacios,
              imagen: ubicacion.imagenURL,
              disponibilidad: ubicacion.disponibilidad,
            });
            markerData = markers.filter(
              (marker) =>
                marker.latitud &&
                marker.longitud &&
                marker.nombre &&
                marker.precio
            );
          }
        }
      }
    });
    console.log(markerData);
  });

  rangoSelector.addEventListener("change", function () {
    const rangoSeleccionado = Number(rangoSelector.value);
    const radioEnMetros = rangoSeleccionado * 1000;

    updateRangeCircle(ubicacionActual, radioEnMetros);
  });
}

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
document.addEventListener("DOMContentLoaded", function () {
  const open = document.getElementById("startButton");
  const modal_container = document.getElementById("modal_container3");
  const resultDiv = document.getElementById("result");

  if ("webkitSpeechRecognition" in window) {
    // Crear una instancia de reconocimiento de voz
    const recognition = new webkitSpeechRecognition();

    // Configurar el idioma (opcional)
    recognition.lang = "es";

    // No detener la grabación automáticamente después de que se detecte un final de voz
    recognition.continuous = true;

    // Variable de estado para verificar si la captura de voz está en curso
    let isCapturing = false;
    let timeout;

    // Evento que se dispara cuando se recibe una transcripción
    recognition.onresult = function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      const cleanedTranscript = removePunctuation(transcript); // Eliminar signos de puntuación
      resultDiv.textContent = cleanedTranscript;

      // Llama a la función realizarAcciones() con el texto capturado por voz
      realizarAcciones(cleanedTranscript);
      realizarAcciones2(cleanedTranscript);
      realizarAcciones3(cleanedTranscript);
      verificarPalabrasClave(cleanedTranscript);
    };

    // Evento que se dispara cuando se hace clic en el botón de inicio
    function toggleCapture() {
      if (isCapturing) {
        recognition.stop();
        clearTimeout(timeout);
        modal_container.classList.remove("show");
        isCapturing = false;
      } else {
        resultDiv.textContent = "Escuchando...";
        recognition.start();
        timeout = setTimeout(function () {
          recognition.stop();
          modal_container.classList.remove("show");
          isCapturing = false;
        }, 4000);
        modal_container.classList.add("show");
        isCapturing = true;

        // Iniciar el temporizador cuando se abre el modal
        let tiempoTotal = 4; // Tiempo en segundos
        const timerDiv = document.getElementById("timer");

        // Actualizar el temporizador cada segundo
        const timerInterval = setInterval(function () {
          timerDiv.textContent = tiempoTotal;
          tiempoTotal--;

          if (tiempoTotal < 0) {
            clearInterval(timerInterval);
          }
        }, 1000);
      }
    }

    resultDiv.textContent = "Escuchando..."; // Establecer el texto inicial

    open.addEventListener("click", toggleCapture);

    // Obtener referencias a los elementos del DOM
    const close = document.getElementById("close3");

    close.addEventListener("click", () => {
      modal_container.classList.remove("show");
      recognition.stop();
      clearTimeout(timeout);
      isCapturing = false;
    });

    // Evento que se dispara cuando la captura de voz se detiene
    recognition.onend = function () {
      clearTimeout(timeout);
    };
  } else {
    // El navegador no soporta la API de reconocimiento de voz
    alert("Este navegador no soporta la API de reconocimiento de voz.");
  }
});

function removePunctuation(text) {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

function realizarAcciones(texto) {
  // Convertir el texto a minúsculas para facilitar la comparación
  const textoLowerCase = texto.toLowerCase();

  // Verificar si el texto capturado coincide con alguna acción específica
  if (
    textoLowerCase.includes("cancelar") ||
    textoLowerCase.includes("cerrar")
  ) {
    recognition.stop();
    resultDiv.textContent = ""; // Limpiar el contenido capturado
    clearTimeout(timeout); // Limpiar el temporizador
    modal_container.classList.remove("show"); // Cerrar el modal
    return; // Detener la ejecución del resto del código en esta función
  }

  // Verificar si el texto contiene la palabra clave "estacionamiento" y el nombre de un estacionamiento específico
  if (textoLowerCase.includes("estacionamiento")) {
    const palabras = textoLowerCase.split(" ");
    const indexEstacionamiento = palabras.indexOf("estacionamiento");
    if (
      indexEstacionamiento !== -1 &&
      indexEstacionamiento < palabras.length - 1
    ) {
      // Obtener el nombre del estacionamiento como todo el texto después de la palabra "estacionamiento"
      const nombreEstacionamiento = palabras
        .slice(indexEstacionamiento + 1)
        .join(" ")
        .toLowerCase();
      

      // Filtrar los estacionamientos en markerData por el nombre
      const estacionamientosFiltrados = markerData.filter(
        (dato) => dato.nombre.toLowerCase() === nombreEstacionamiento
      );

      if (estacionamientosFiltrados.length > 0) {
        // Obtener la latitud y longitud del primer estacionamiento encontrado
        const estacionamiento = estacionamientosFiltrados[0];
        const nombre = estacionamiento.nombre;
        const latitud = estacionamiento.latitud;
        const longitud = estacionamiento.longitud;
        const precio = estacionamiento.precio;
        const direccion = estacionamiento.direccion;
        const numcontact = estacionamiento.numcontact;
        const ubicacionHorario = estacionamiento.ubicacionHorario;
        const descripcion = estacionamiento.descripcion;
        const tipo = estacionamiento.tipo;
        const espacio = estacionamiento.espacio;
        const imagen = estacionamiento.imagen;
        const disponibilidad = estacionamiento.disponibilidad;

        if (disponibilidad === false) {
          console.log(
            "Estacionamiento encontrado, pero no hay espacios disponibles Por favor, selecciona otro."
          );
          decirEnVozAlta(
            "Estacionamiento encontrado, pero no hay espacios disponibles Por favor, selecciona otro."
          );
        } else {
          decirEnVozAlta(
            `Encontré el Estacionamiento ${nombreEstacionamiento}, cuenta con ${espacio} espacio disponibles La tarifa es ${precio} `
          );
          // Generar la ruta hacia el estacionamiento utilizando la latitud y longitud
          crearR(latitud, longitud);
          showAdditionalInfo(
            nombre,
            precio,
            direccion,
            numcontact,
            ubicacionHorario,
            descripcion,
            tipo,
            espacio,
            imagen
          );
          // Calcular la distancia entre la ubicación actual y el estacionamiento
          const distancia = calcularDistancia(
            marker.getPosition().lat(),
            marker.getPosition().lng(),
            latitud,
            longitud
          );

          // Leer en voz alta la distancia al estacionamiento
          decirEnVozAlta(
            `La distancia al estacionamiento es de ${distancia.toFixed(
              2
            )} kilómetros.`
          );
        }
      } else {
        console.log("No se encontraron estacionamientos con ese nombre");
        decirEnVozAlta(
          `No encontré el estacionamiento ${nombreEstacionamiento}, no existe o no está en el rango de kilómetros seleccionado`
        );
      }

      return; // Detener la ejecución del resto del código en esta función
    }
  }

  // Si no se encontró una coincidencia específica, puedes realizar otras acciones o respuestas genéricas aquí
  console.log("No se encontró una acción específica para el texto capturado");
}

function realizarAcciones2(texto) {
  // Convertir el texto a minúsculas para facilitar la comparación
  const textoLowerCase = texto.toLowerCase();

  // Verificar si el texto contiene la palabra clave "muestra la lista"
  if (textoLowerCase.includes("lista de parqueos")) {
    for (const elemento in markerData) {
      const nombreDato = markerData[elemento].nombre; // Suponiendo que cada dato en markerData tiene una propiedad "nombre"
      decirEnVozAlta(nombreDato); // Llamar a la función de síntesis de voz con el nombre actual
    }

    return; // Detener la ejecución del resto del código en esta función
  }

  // Si no se encontró una coincidencia específica, puedes realizar otras acciones o respuestas genéricas aquí
  console.log("No se encontró una acción específica para el texto capturado");
}

function realizarAcciones3(texto) {
  // Convertir el texto a minúsculas para facilitar la comparación
  const textoLowerCase = texto.toLowerCase();

  // Verificar si el texto contiene la palabra clave "muestra la lista"
  if (textoLowerCase.includes("ayuda")) {
    decirEnVozAlta("Para interactuar con el sistema, puedes utilizar dos comandos principales. Si quieres seleccionar un parqueo específico, simplemente di 'estacionamiento' seguido del nombre del parqueo que deseas. Por ejemplo, puedes decir 'estacionamiento San Carlos' o 'estacionamiento Rosales y Si deseas ver la lista de parqueos, antes puedes seleccionar un filtro específico, como tipo de estacionamiento y rango. Por ejemplo, puedes seleccionar 'filtrar por tipo de estacionamiento' o 'filtrar por rango'. y por ultimo Luego, cuando digas 'lista de parqueos', el sistema te proporcionará la lista de parqueos disponibles según el filtro seleccionado previamente");

    return; // Detener la ejecución del resto del código en esta función
  }

  // Si no se encontró una coincidencia específica, puedes realizar otras acciones o respuestas genéricas aquí
  console.log("No se encontró una acción específica para el texto capturado");
}

function verificarPalabrasClave(texto) {
  const palabrasClave = ["estacionamiento", "lista de parqueos", "ayuda"];

  const textoLowerCase = texto.toLowerCase();

  for (const palabra of palabrasClave) {
    if (textoLowerCase.includes(palabra)) {
      return;
    }
  }

  decirEnVozAlta("Para interactuar con el sistema debe decir los comandos, estacionamiento, lista de parqueos y ayuda");
}

function crearR(latitud, longitud) {
  // Aquí tienes el código de la función crearRuta() que se proporcionó anteriormente
  if (destinoMarker && destinoMarker.getPosition().equals(latitud, longitud)) {
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
    destination: new google.maps.LatLng(latitud, longitud),
    travelMode: "DRIVING",
  };

  // Llama al servicio de direcciones para obtener la ruta
  directionsService.route(solicitud, function (resultado, estado) {
    if (estado === "OK") {
      // Muestra la ruta en el mapa
      directionsDisplay.setDirections(resultado);
    }
  });

  const distancia = calcularDistancia(
    marker.getPosition().lat(),
    marker.getPosition().lng(),
    latitud,
    longitud
  );

  // Muestra la distancia en la consola o en otro lugar de tu elección
  console.log(
    `La distancia al estacionamiento es de ${distancia.toFixed(2)} kilómetros.`
  );
}

function calcularDistancia(latitud1, longitud1, latitud2, longitud2) {
  const radioTierra = 6371; // Radio medio de la Tierra en kilómetros
  const dLat = toRadian(latitud2 - latitud1);
  const dLon = toRadian(longitud2 - longitud1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(latitud1)) *
    Math.cos(toRadian(latitud2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
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
