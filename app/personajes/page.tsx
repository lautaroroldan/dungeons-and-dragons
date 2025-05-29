import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { db } from "@/db"
import { charactersTable, classesTable, racesTable, backgroundsTable } from "@/db/schema"
import CharacterCard from "@/components/character-card"
import { eq } from "drizzle-orm"

export const dynamic = 'force-dynamic'

export default async function CharactersPage() {
  const characters = await db.select({
    id: charactersTable.id,
    name: charactersTable.name,
    race: racesTable.name,
    class: classesTable.name,
    level: charactersTable.level,
    image: charactersTable.image,
  }).from(charactersTable)
    .leftJoin(classesTable, eq(charactersTable.class, classesTable.id))
    .leftJoin(racesTable, eq(charactersTable.race, racesTable.id))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Personajes de la Campaña</h1>
        <Button asChild>
          <Link href="/personajes/crear" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Crear Personaje
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            level={character.level}
            name={character.name}
            type={character.class || ""}
            race={character.race || ""}
            image={character.image || "/placeholder.svg?height=200&width=200"}
          />
        ))}
      </div>
    </div>
  )
}
