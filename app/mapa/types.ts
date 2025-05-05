export interface PointOfInterest {
  name: string
  description: string
}

export interface NPC {
  name: string
  role: string
  description?: string
  avatar?: string
}

export interface Quest {
  title: string
  description: string
  level: number
  reward?: string
}

export interface Location {
  id: string
  name: string
  lat: number
  lng: number
  type: string
  category: string
  description: string
  image?: string
  history?: string
  faction?: string
  points_of_interest?: PointOfInterest[]
  npcs?: NPC[]
  quests?: Quest[]
  notes?: string
}
