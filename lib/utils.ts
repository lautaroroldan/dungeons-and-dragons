import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getClasses() {
  return [
    { id: EClass.BARBARIAN, name: "Bárbaro" },
    { id: EClass.BARD, name: "Bardo" },
    { id: EClass.WIZARD, name: "Brujo" },
    { id: EClass.CLERIC, name: "Clérigo" },
    { id: EClass.DRUID, name: "Druida" },
    { id: EClass.EXPLORER, name: "Explorador" },
    { id: EClass.WARRIOR, name: "Guerrero" },
    { id: EClass.SORCERER, name: "Hechicero" },
    { id: EClass.MAGE, name: "Mago" },
    { id: EClass.MONK, name: "Monje" },
    { id: EClass.PALADIN, name: "Paladín" },
    { id: EClass.ROUGH, name: "Pícaro" },
  ]
}

export enum EClass {
  BARBARIAN = 1,
  BARD = 2,
  WIZARD = 3,
  CLERIC = 4,
  DRUID = 5,
  EXPLORER = 6,
  WARRIOR = 7,
  SORCERER = 8,
  MAGE = 9,
  MONK = 10,
  PALADIN = 11,
  ROUGH = 12,
}

export function getClassById(id: number) {
  return getClasses().find((c) => c.id === id)
}

export function getClassByName(name: string) {
  return getClasses().find((c) => c.name == name)
}

export enum ERaces {
  HUMAN = 1,
  ELF = 2,
  DWARF = 3,
  GNOME = 4,
  HALFELF = 5,
  HALFLING = 6,
  HALFORK = 7,
  TIEFLING = 8,
  DRAGON = 9,
  AASIMAR = 10,
}

export function getRaces() {
  return [
    { id: ERaces.HUMAN, name: "Humano" },
    { id: ERaces.ELF, name: "Elfo" },
    { id: ERaces.DWARF, name: "Enano" },
    { id: ERaces.GNOME, name: "Gnomo" },
    { id: ERaces.HALFELF, name: "Semielfo" },
    { id: ERaces.HALFLING, name: "Halfling" },
    { id: ERaces.HALFORK, name: "Halfork" },
    { id: ERaces.TIEFLING, name: "Tiefling" },
    { id: ERaces.DRAGON, name: "Dracónido" },
    { id: ERaces.AASIMAR, name: "Aasimar" },
  ]
}

export function getRacesById(id: number) {
  return getRaces().find((r) => r.id === id)
}

export enum EBackgrounds {
  ACOLITE = 1,
  ARTISAN = 2,
  ARTIST = 3,
  CHARLATAN = 4,
  CRIMINAL = 5,
  ERMITANO = 6,
  HERO = 7,
  ORPHAN = 8,
  MARINER = 9,
  NOBLE = 10,
  SAGE = 11,
  SOLDIER = 12,
}

export function getBackgrounds() {
  return [
    { id: EBackgrounds.ACOLITE, name: "Acólito" },
    { id: EBackgrounds.ARTISAN, name: "Artesano Gremial" },
    { id: EBackgrounds.ARTIST, name: "Artista" },
    { id: EBackgrounds.CHARLATAN, name: "Charlatán" },
    { id: EBackgrounds.CRIMINAL, name: "Criminal" },
    { id: EBackgrounds.ERMITANO, name: "Ermitaño" },
    { id: EBackgrounds.HERO, name: "Héroe del Pueblo" },
    { id: EBackgrounds.ORPHAN, name: "Huérfano" },
    { id: EBackgrounds.MARINER, name: "Marinero" },
    { id: EBackgrounds.NOBLE, name: "Noble" },
    { id: EBackgrounds.SAGE, name: "Sabio" },
    { id: EBackgrounds.SOLDIER, name: "Soldado" },
  ]
}

export function getBackgroundById(id: number) {
  return getBackgrounds().find((b) => b.id === id)
}

export enum EAlignments {
  LEGAL_GOOD = 1,
  NEUTRAL_GOOD = 2,
  CHAOTIC_GOOD = 3,
  LEGAL_NEUTRAL = 4,
  NEUTRAL = 5,
  CHAOTIC_NEUTRAL = 6,
  LEGAL_EVIL = 7,
  NEUTRAL_EVIL = 8,
  CHAOTIC_EVIL = 9,
}

export function getAlignments() {
  return [
    { id: EAlignments.LEGAL_GOOD, name: "Legal Bueno" },
    { id: EAlignments.NEUTRAL_GOOD, name: "Neutral Bueno" },
    { id: EAlignments.CHAOTIC_GOOD, name: "Caótico Bueno" },
    { id: EAlignments.LEGAL_NEUTRAL, name: "Legal Neutral" },
    { id: EAlignments.NEUTRAL, name: "Neutral" },
    { id: EAlignments.CHAOTIC_NEUTRAL, name: "Caótico Neutral" },
    { id: EAlignments.LEGAL_EVIL, name: "Legal Maligno" },
    { id: EAlignments.NEUTRAL_EVIL, name: "Neutral Maligno" },
    { id: EAlignments.CHAOTIC_EVIL, name: "Caótico Maligno" },
  ]
}

export function getAlignmentsById(id: number) {
  return getAlignments().find((a) => a.id === id)
}

export async function getApiRaces() {
  const response = await fetch("/api/races")
  const data = await response.json()
  return data
}

export async function getApiClasses() {
  const response = await fetch("/api/classes")
  const data = await response.json()
  return data
}

export async function getApiBackgrounds() {
  const response = await fetch("/api/backgrounds")
  const data = await response.json()
  return data
}

export async function getApiAlignments() {
  const response = await fetch("/api/alignments")
  const data = await response.json()
  return data
}

export const calculateAttributeModifier = (value: number): number => Math.floor((value - 10) / 2)

export const showAttributeModifier = (value: number): string => {
  const mod = calculateAttributeModifier(value)
  return mod >= 0 ? `+${mod}` : mod.toString()
}