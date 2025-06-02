import Link from "next/link"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Swords, BookOpen, Backpack } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFullCharacterById } from "@/db/queries/select"
import { EquipmentSection } from "@/components/character/EquipmentSection"
import { HistorySection } from "@/components/character/HistorySection"
import { SkillsSection } from "@/components/character/SkillsSection"
import { AttributesSection } from "@/components/character/AttributesSection"
import { SpecialAbilitiesSection } from "@/components/character/SpecialAbilitiesSection"
import { CharacterBasicInfo } from "@/components/character/CharacterBasicInfo"
import { Metadata } from "next"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { id } = await params
  const character = await getFullCharacterById(Number(id))

  return {
    title: character?.name ?? "Personaje no encontrado",
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  const character = await getFullCharacterById(Number(id))

  if (!character) {
    notFound()
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/personajes">
              <ArrowLeft className="h-4 w-4" />
              Volver a todos los personajes
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <CharacterBasicInfo
              id={character.id}
              name={character.name}
              image={character.image}
              level={character.level}
              experience={character.experience}
              race={character.race}
              class={character.class}
              background={character.background}
              alignment={character.alignment}
            />

            <AttributesSection attributes={character.attributes} />

            <SpecialAbilitiesSection specialAbilities={character.specialAbilities} />
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="habilidades">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="habilidades" className="flex items-center gap-2">
                  <Swords className="h-4 w-4" />
                  <span className="hidden sm:inline">Habilidades</span>
                </TabsTrigger>
                <TabsTrigger value="equipamiento" className="flex items-center gap-2">
                  <Backpack className="h-4 w-4" />
                  <span className="hidden sm:inline">Equipamiento</span>
                </TabsTrigger>
                <TabsTrigger value="historia" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Historia</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="habilidades" className="mt-0">
                <SkillsSection
                  skills={character.skills}
                  attributes={character.attributes}
                />
              </TabsContent>

              <TabsContent value="equipamiento" className="mt-0">
                <EquipmentSection equipment={character.equipment} />
              </TabsContent>

              <TabsContent value="historia" className="mt-0">
                <HistorySection history={character.history} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
