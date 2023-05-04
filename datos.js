const ubicaciones = [
  {
    image:
      "https://a0.muscache.com/im/pictures/miso/Hosting-14979866/original/75595cfc-37d6-42d8-95dd-0ea3c966ef88.jpeg?im_w=720",
    lat: -12.055100815738998,
    lng: -77.03328246544623,
    nombre: "Cochera 1",
    direccion: "Jr. Libertad 284, Huancayo 12001",
    descripcion:
      "Mansión convertida en museo que alberga una colección de objetos precolombinos, como cerámicas eróticas.",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "973 633 341",
    precio: "S/5.00",
    tipo: "Techado",
    disponibilidad: false,
  },
  {
    image: "local",
    lat: -12.04629243980777,
    lng: -77.03326100763258,
    nombre: "Cochera 2",
    direccion: "Jirón Guido 310, Huancayo 12001",
    descripcion:
      "Mansión convertida en museo que alberga una colección de objetos precolombinos, como cerámicas eróticas.",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "952 344 222",
    precio: "S/9.00",
    tipo: "Techado",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.044597882894625,
    lng: -77.02305788489,
    nombre: "Cochera Loreto 24 horas",
    direccion: "Jr Ayacucho 265, Huancayo 12000",
    descripcion:
      "Mansión convertida en museo que alberga una colección de objetos precolombinos, como cerámicas eróticas.",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "923 456 444",
    precio: "S/7.00",
    tipo: "Descubierto",
    disponibilidad: true,
  },
  {
    lat: -12.040316849379344,
    lng: -77.02232832406297,
    nombre: "Cochera 4",
    direccion: "Amazonas 550, Huancayo 12001",
    descripcion:
      "Mansión convertida en museo que alberga una colección de objetos precolombinos, como cerámicas eróticas.",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "945 234 555",
    precio: "S/5.50",
    tipo: "Descubierto",
    disponibilidad: false,
  },
  {
    image: "local",
    lat: -12.039897136538453,
    lng: -77.03073973124508,
    nombre: "Cochera 5",
    direccion: "Jr. Loreto 738, Huancayo 12001",
    descripcion: "Ciudad en la costa oeste de EE.UU.",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "995 675 645",
    precio: "S/6.00",
    tipo: "Subterraneo",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.058400572825198,
    lng: -77.01435682295359,
    nombre: "Cochera 6",
    direccion: "Jr. Loreto 738, Huancayo 12001",
    descripcion: "Ciudad en la costa oeste de EE.UU.",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "995 675 645",
    precio: "S/10.00",
    tipo: "Abierto",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.048118111862058,
    lng: -77.04291698418781,
    nombre: "Cochera 7",
    direccion: "Jr. Loreto 738, Huancayo 12001",
    descripcion: "Ciudad en la costa oeste de EE.UU.",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "995 675 645",
    precio: "S/10.00",
    tipo: "Abierto",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.050867134858937,
    lng: -76.96627018083595,
    nombre: "Cochera 8",
    direccion: "Jr. Loreto 738, Huancayo 12001",
    descripcion: "Ciudad en la costa oeste de EE.UU.",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "995 675 645",
    precio: "S/5.50",
    tipo: "Abierto",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.053217422303234,
    lng: -77.05673572436105,
    nombre: "Cochera 9",
    direccion: "Jr. Loreto 738, Huancayo 12001",
    descripcion: "Ciudad en la costa oeste de EE.UU.",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "995 675 645",
    precio: "S/6.00",
    tipo: "Techado",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.002094031199933,
    lng: -77.01330539693427,
    nombre: "Cochera 10",
    direccion: "Jr. Loreto 738, Huancayo 12001",
    descripcion: "Ciudad en la costa oeste de EE.UU.",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "995 675 645",
    precio: "S/8.00",
    tipo: "Techado",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.047463095424371,
    lng: -75.19789451820749,
    nombre: "Cochera 11",
    direccion: "Av San Carlos 1980, Huancayo 12000",
    descripcion: "Ciudad en Huancayo",
    horario:
      "De lunes a viernes de 07:30 a 20:00 horas Sábados de 08:00 a 13:00 horas",
    numcontact: "995 675 645",
    precio: "S/2.00",
    tipo: "Abierto",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.048896999905438,
    lng: -75.19732681324486,
    nombre: "Estacionamienmto Identidad",
    direccion: "San Marcos 568, Huancayo 12001",
    descripcion: "Costado del parque de la Identidad Wanka",
    horario: "De lunes a viernes de 08:30 a 19:00 horas",
    numcontact: "942003634",
    precio: "S/3.00",
    tipo: "Techado",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.069602238218614,
    lng: -75.20550077254892,
    nombre: "Plaza House",
    direccion: "Ica 125, Huancayo 12001",
    descripcion: "A espaldas de la Iglesia La Inmaculada",
    horario: "De lunes a viernes de 09:00 a 18:30 horas",
    numcontact: "988228819",
    precio: "S/5.00",
    tipo: "Descubierto",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.065175296071988,
    lng: -75.21001693932689,
    nombre: "Fitness Center",
    direccion: "Jr. Ayacucho 254, Huancayo",
    descripcion: "Costado de la Empresa Turismo Internacional",
    horario: "De lunes a viernes de 06:00 a 22:30 horas",
    numcontact: "064224235",
    precio: "S/6.00",
    tipo: "Techado",
    disponibilidad: false,
  },
  {
    image: "local",
    lat: -12.065744438948672,
    lng: -75.21024149337714,
    nombre: "Cochera Ayacucho",
    direccion: "Jr Ayacucho 265, Huancayo 12000",
    descripcion: "Al frente de la I.E. Sebastian Lorente",
    horario: "24 horas",
    numcontact: "995080054",
    precio: "S/5.00 (dia), S/7.00 noche",
    tipo: "Abierto",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.0668101418588,
    lng: -75.20938372375649,
    nombre: "Estacionamienmto La estacion",
    direccion: "Jirón Puno 268, Huancayo 12001",
    descripcion: "a 20 metros de la catedral de Huancayo",
    horario: "De lunes a viernes de 09:00 a 19:00 horas",
    numcontact: "942003634",
    precio: "S/6.00",
    tipo: "Abierto",
    disponibilidad: false,
  },
  {
    image: "local",
    lat: -12.047679,
    lng: -75.198022,
    nombre: "Cochera 1",
    direccion: "Calle San Felipe",
    descripcion:
      "Cochera amplia ubicada a espaldas de la Universidad Continental ",
    horario: "De lunes a viernes de 09:00 a 19:00 horas",
    numcontact: "942003634",
    precio: "S/6.00",
    tipo: "Descubierto",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.049705,
    lng: -75.195731,
    nombre: "Cochera Santivanez",
    direccion: "Av. Coronel Santivañez",
    descripcion:
      "Cochera ubicada en cruce de avenidas Carmel del Solar con Coronel Santivañez en Huancayo con amplio espacio y tambien contamos con servicios adicionales como lavado de interior y exterior del auto.",
    horario: "De lunes a viernes de 09:00 a 19:00 horas",
    numcontact: "942003634",
    precio: "S/6.00",
    tipo: "Abierto",
    disponibilidad: false,
  },
  {
    image: "local",
    lat: -12.06876,
    lng: -75.211379,
    nombre: "Estacionamiento Central",
    direccion: "Calle Arequipa 455",
    descripcion:
      "Cochera ubicada de forma céntrica en la ciudad a unos pasos de la plaza Constitución",
    horario: "De lunes a viernes de 09:00 a 19:00 horas",
    numcontact: "942003634",
    precio: "S/6.00",
    tipo: "Subterraneo",
    disponibilidad: true,
  },
  {
    image: "local",
    lat: -12.049705,
    lng: -75.195731,
    nombre: "Cochera Los Sauces",
    direccion: "Jr. Lima 450",
    descripcion:
      "Cochera ubicada de forma céntrica con amplio espacio con acceso y salida por 2 lugares Jr. Lima y Calle Arequipa",
    horario: "De lunes a viernes de 09:00 a 19:00 horas",
    numcontact: "942003634",
    precio: "S/6.00",
    tipo: "Abierto",
    disponibilidad: false,
  },
  {
    image: "local",
    lat: -12.070465,
    lng: -75.210257,
    Nombre: "Cochera Arequipa",
    direccion: "Calle Arequipa 679",
    descripcion:
      "Cochera ubicada de forma céntrica con espacios para autos camionetas cerca al centro de la ciudad",
    horario: "De lunes a viernes de 09:00 a 19:00 horas",
    numcontact: "942003634",
    precio: "S/6.00",
    tipo: "Techado",
    disponibilidad: false,
  },
];
