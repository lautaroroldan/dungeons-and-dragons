export const SKILL_ATTRIBUTE_MAP: Record<string, string> = {
    Acrobacias: "dexterity",
    Arcanos: "intelligence",
    Atletismo: "strength",
    Engaño: "charisma",
    Historia: "intelligence",
    Interpretación: "charisma",
    Intimidación: "charisma",
    Investigación: "intelligence",
    "Juego de Manos": "dexterity",
    Medicina: "wisdom",
    Naturaleza: "intelligence",
    Percepción: "wisdom",
    Perspicacia: "wisdom",
    Persuasión: "charisma",
    Religión: "intelligence",
    Sigilo: "dexterity",
    Supervivencia: "wisdom",
    "Trato con Animales": "wisdom",
}

export const ATTRIBUTE_DISPLAY_NAMES = {
    strength: "Fuerza",
    dexterity: "Destreza",
    constitution: "Constitución",
    intelligence: "Inteligencia",
    wisdom: "Sabiduría",
    charisma: "Carisma"
} as const