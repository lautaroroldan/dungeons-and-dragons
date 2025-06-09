import { CharacterNameInput } from "@/components/character/form/CharacterNameInput"
import { CharacterSelectsGrid } from "@/components/character/form/CharacterSelectsGrid"
import { CharacterAvatarUpload } from "@/components/character/form/CharacterAvatarUpload"
// import { LevelExperienceInputs } from "./LevelExperienceInputs"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { completeCharacterSchema } from "@/lib/validations/character"

export function BasicInformationPanel({ form }: { form: UseFormReturn<z.infer<typeof completeCharacterSchema>> }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CharacterNameInput form={form} />

          <CharacterSelectsGrid form={form} />

          {/* Nivel y Experiencia - Comentado hasta implementar */}
          {/* <LevelExperienceInputs 
            level={level}
            experience={experience}
            onLevelChange={setLevel}
            onExperienceChange={setExperience}
          /> */}
        </div>

        {/* Avatar del personaje */}
        <CharacterAvatarUpload />
      </div>
    </div>
  )
}
