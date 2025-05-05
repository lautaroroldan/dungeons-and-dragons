// Función para obtener la etiqueta de la categoría
export function getCategoryLabel(category: string): string {
  switch (category) {
    case "ciudad":
      return "Ciudades"
    case "pueblo":
      return "Pueblos"
    case "mazmorra":
      return "Mazmorras"
    case "punto_interes":
      return "Puntos de Interés"
    case "ruina":
      return "Ruinas"
    default:
      return category
  }
}

// Función para obtener la etiqueta del tipo
export function getTypeLabel(type: string): string {
  switch (type) {
    case "capital":
      return "Capital"
    case "ciudad":
      return "Ciudad"
    case "pueblo":
      return "Pueblo"
    case "mazmorra":
      return "Mazmorra"
    case "templo":
      return "Templo"
    case "montaña":
      return "Montaña"
    case "bosque":
      return "Bosque"
    case "campamento":
      return "Campamento"
    case "ruina":
      return "Ruina"
    case "mina":
      return "Mina"
    case "puerto":
      return "Puerto"
    case "fortaleza":
      return "Fortaleza"
    default:
      return type
  }
}
