"use client"

import { CharacterNameInput } from "./CharacterNameInput"
import { CharacterSelectsGrid } from "./CharacterSelectsGrid"
import { CharacterAvatarUpload } from "./CharacterAvatarUpload"
// import { LevelExperienceInputs } from "./LevelExperienceInputs"

export function BasicInformationPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulario de información básica */}
        <div className="space-y-4">
          <CharacterNameInput />

          <CharacterSelectsGrid />

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
