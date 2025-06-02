import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Suspense } from "react"
import CharacterList from "@/components/character/CharacterList"
import CharacterSkeletonList from "@/components/character/skeleton/CharacterSkeletonList"
export default async function CharactersPage() {


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
        <Suspense fallback={<CharacterSkeletonList />}>
          <CharacterList />
        </Suspense>
      </div>
    </div>
  )
}
