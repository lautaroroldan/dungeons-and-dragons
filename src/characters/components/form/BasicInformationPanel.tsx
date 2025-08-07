import { CharacterNameInput } from "@characters/components/form/CharacterNameInput"
import { CharacterSelectsGrid } from "@characters/components/form/CharacterSelectsGrid"
import { CharacterAvatarUpload } from "@characters/components/form/CharacterAvatarUpload"
import { LevelExperienceInputs } from "./LevelExperienceInputs"
import { CompleteCharacterFormType } from "@characters/types/character"
import { UseFormReturn } from "react-hook-form"

export function BasicInformationPanel({ form }: { form: UseFormReturn<CompleteCharacterFormType> }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CharacterNameInput control={form.control} />

          <CharacterSelectsGrid form={form} />

          {/* <LevelExperienceInputs form={form} /> */}
        </div>

        <CharacterAvatarUpload form={form} />
      </div>
    </div>
  )
}
