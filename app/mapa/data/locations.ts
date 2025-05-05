import type { Location } from "../types"

export const locationsData: Location[] = [
  {
    id: "1",
    name: "Aguasprofundas",
    lat: 10,
    lng: 15,
    type: "capital",
    category: "ciudad",
    description:
      "La Ciudad de los Esplendores, la joya de la Costa de la Espada. Una metrópolis bulliciosa y centro de comercio en todo Faerûn.",
    image: "/placeholder.svg?height=300&width=600",
    history:
      "Fundada hace más de 500 años por aventureros que derrotaron a un dragón que habitaba la zona. Desde entonces ha crecido hasta convertirse en una de las ciudades más importantes del continente.",
    faction: "Los Señores de Aguasprofundas",
    points_of_interest: [
      {
        name: "La Posada del Portal Abierto",
        description: "Una famosa taberna frecuentada por aventureros de todo el mundo.",
      },
      {
        name: "Castillo de Aguasprofundas",
        description: "Fortaleza que alberga a los Señores de la ciudad y sus fuerzas militares.",
      },
      {
        name: "El Paseo",
        description: "Distrito comercial con las tiendas más exclusivas de la ciudad.",
      },
    ],
    npcs: [
      {
        name: "Lord Neverember",
        role: "Señor Protector de Aguasprofundas",
        description: "Un hombre ambicioso y carismático que gobierna la ciudad con mano firme pero justa.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Durnan",
        role: "Propietario de la Posada del Portal Abierto",
        description: "Antiguo aventurero que ahora regenta la posada más famosa de la ciudad.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
    quests: [
      {
        title: "Problemas en las alcantarillas",
        description:
          "Extrañas criaturas han sido avistadas en las alcantarillas de la ciudad. El gremio de fontaneros ofrece una recompensa por investigar.",
        level: 3,
        reward: "300 piezas de oro y un favor del gremio",
      },
      {
        title: "El misterio del mercader desaparecido",
        description:
          "Un prominente mercader ha desaparecido sin dejar rastro. Su familia busca aventureros para encontrarlo.",
        level: 5,
        reward: "500 piezas de oro y un objeto mágico",
      },
    ],
    notes:
      "Los jugadores pueden encontrar aquí todo tipo de servicios y contactos. Es un buen lugar para comenzar una campaña o como base de operaciones.",
  },
  {
    id: "2",
    name: "Neverwinter",
    lat: -5,
    lng: 20,
    type: "ciudad",
    category: "ciudad",
    description:
      "La Ciudad de las Habilidades Diestras, famosa por sus artesanos y su clima templado gracias a la magia.",
    image: "/placeholder.svg?height=300&width=600",
    history:
      "A pesar de sufrir una erupción volcánica devastadora hace décadas, Neverwinter se ha reconstruido y prospera nuevamente.",
    faction: "Lord Protector Neverember",
    points_of_interest: [
      {
        name: "Castillo Never",
        description: "Fortaleza que domina la ciudad desde lo alto de una colina.",
      },
      {
        name: "El Bosque de Neverwinter",
        description: "Un extenso bosque mágico que rodea la ciudad por el este.",
      },
    ],
    npcs: [
      {
        name: "Seldra Tylmarande",
        role: "Maestra de la Cofradía de Magos",
        description: "Una hechicera elfa de gran poder y sabiduría.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
    quests: [
      {
        title: "La amenaza de los trolls",
        description: "Trolls del bosque cercano están atacando las caravanas comerciales.",
        level: 6,
        reward: "800 piezas de oro",
      },
    ],
  },
  {
    id: "3",
    name: "Baldur's Gate",
    lat: 25,
    lng: -10,
    type: "ciudad",
    category: "ciudad",
    description: "Una ciudad amurallada en la Costa de la Espada, conocida por su comercio fluvial y marítimo.",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "4",
    name: "Phandalin",
    lat: 5,
    lng: 5,
    type: "pueblo",
    category: "pueblo",
    description: "Un pequeño asentamiento minero que ha renacido tras años de abandono.",
    image: "/placeholder.svg?height=300&width=600",
    npcs: [
      {
        name: "Sildar Hallwinter",
        role: "Representante de la Alianza de los Señores",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Harbin Wester",
        role: "Alcalde",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
    quests: [
      {
        title: "Problemas con los Redbrands",
        description: "Una banda de rufianes aterroriza el pueblo.",
        level: 2,
        reward: "200 piezas de oro",
      },
    ],
  },
  {
    id: "5",
    name: "La Mina Perdida de Phandelver",
    lat: 8,
    lng: 3,
    type: "mina",
    category: "mazmorra",
    description: "Una antigua mina enana abandonada, ahora ocupada por criaturas peligrosas.",
    image: "/placeholder.svg?height=300&width=600",
    quests: [
      {
        title: "El Secreto de la Forja de Hechizos",
        description: "Descubrir el antiguo secreto de la forja mágica de los enanos.",
        level: 4,
        reward: "Acceso a la Forja de Hechizos",
      },
    ],
  },
  {
    id: "6",
    name: "Bosque Alto",
    lat: -15,
    lng: -15,
    type: "bosque",
    category: "punto_interes",
    description: "Un antiguo bosque élfico lleno de magia y misterios.",
    image: "/placeholder.svg?height=300&width=600",
    faction: "Elfos del Bosque Alto",
  },
  {
    id: "7",
    name: "Montañas de la Espina Dorsal del Mundo",
    lat: -25,
    lng: 25,
    type: "montaña",
    category: "punto_interes",
    description: "Una imponente cordillera que marca el límite norte de la civilización.",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "8",
    name: "Ruinas de Thundertree",
    lat: 15,
    lng: -20,
    type: "ruina",
    category: "ruina",
    description: "Los restos de un pueblo destruido por la erupción del Monte Hotenow.",
    image: "/placeholder.svg?height=300&width=600",
    npcs: [
      {
        name: "Reidoth",
        role: "Druida ermitaño",
        description: "Un druida solitario que vigila las ruinas.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
    quests: [
      {
        title: "El dragón verde",
        description: "Un joven dragón verde ha hecho su guarida en las ruinas.",
        level: 7,
        reward: "Tesoro del dragón",
      },
    ],
  },
  {
    id: "9",
    name: "Templo del Amanecer",
    lat: 20,
    lng: 20,
    type: "templo",
    category: "punto_interes",
    description: "Un templo dedicado a Lathander, dios del amanecer y el renacimiento.",
    image: "/placeholder.svg?height=300&width=600",
    faction: "Clérigos de Lathander",
  },
  {
    id: "10",
    name: "Fortaleza Enana de Gauntlgrym",
    lat: -20,
    lng: 10,
    type: "fortaleza",
    category: "ruina",
    description: "Una legendaria fortaleza enana perdida durante siglos y recientemente redescubierta.",
    image: "/placeholder.svg?height=300&width=600",
    history: "Antigua capital del reino enano de Delzoun, perdida hace siglos tras una catástrofe.",
    faction: "Clan Battlehammer",
  },
  {
    id: "11",
    name: "Campamento Orco de Colmillo Rojo",
    lat: 30,
    lng: -25,
    type: "campamento",
    category: "punto_interes",
    description: "Un gran campamento de la tribu orca Colmillo Rojo, conocidos por su ferocidad.",
    image: "/placeholder.svg?height=300&width=600",
    faction: "Tribu Colmillo Rojo",
  },
  {
    id: "12",
    name: "Puerto Llast",
    lat: -10,
    lng: 30,
    type: "puerto",
    category: "pueblo",
    description: "Un pequeño puerto comercial que ha visto mejores días.",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "13",
    name: "Mazmorra de la Montaña Hueca",
    lat: 35,
    lng: 5,
    type: "mazmorra",
    category: "mazmorra",
    description: "Un complejo de cuevas y túneles que alberga criaturas peligrosas y tesoros olvidados.",
    image: "/placeholder.svg?height=300&width=600",
    quests: [
      {
        title: "El Cetro de Tremor",
        description: "Recuperar un antiguo artefacto mágico de las profundidades de la mazmorra.",
        level: 8,
        reward: "El Cetro de Tremor y 1000 piezas de oro",
      },
    ],
  },
]
