import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/components/ui/tabs"
import { Swords, BookOpen, Backpack } from "lucide-react"
import { getFullCharacterById } from "@/db/queries/select"
import { EquipmentSection } from "@characters/components/EquipmentSection"
import { HistorySection } from "@characters/components/HistorySection"
import { SkillsSection } from "@characters/components/SkillsSection"
import { AttributesSection } from "@characters/components/AttributesSection"
import { SpecialAbilitiesSection } from "@characters/components/SpecialAbilitiesSection"
import { CharacterBasicInfo } from "@characters/components/CharacterBasicInfo"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const id = (await params).id
  const character = await getFullCharacterById(Number(id))

  if (!character) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">

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
  )
}
