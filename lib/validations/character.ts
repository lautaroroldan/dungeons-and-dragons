import { z } from "zod"

const MAX_ATTRIBUTE_VALUE = 30
const DEFAULT_ATTRIBUTE_VALUE = 10
const MIN_ATTRIBUTE_VALUE = 8
export const attributesSchema = z.object({
    strength: z.number().int().min(MIN_ATTRIBUTE_VALUE).max(MAX_ATTRIBUTE_VALUE).default(DEFAULT_ATTRIBUTE_VALUE),
    dexterity: z.number().int().min(MIN_ATTRIBUTE_VALUE).max(MAX_ATTRIBUTE_VALUE).default(DEFAULT_ATTRIBUTE_VALUE),
    constitution: z.number().int().min(MIN_ATTRIBUTE_VALUE).max(MAX_ATTRIBUTE_VALUE).default(DEFAULT_ATTRIBUTE_VALUE),
    intelligence: z.number().int().min(MIN_ATTRIBUTE_VALUE).max(MAX_ATTRIBUTE_VALUE).default(DEFAULT_ATTRIBUTE_VALUE),
    wisdom: z.number().int().min(MIN_ATTRIBUTE_VALUE).max(MAX_ATTRIBUTE_VALUE).default(DEFAULT_ATTRIBUTE_VALUE),
    charisma: z.number().int().min(MIN_ATTRIBUTE_VALUE).max(MAX_ATTRIBUTE_VALUE).default(DEFAULT_ATTRIBUTE_VALUE),
})

export const specialAbilitySchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().default(""),
    type: z.string().min(1, "El tipo es requerido"),
    level: z.number().int(),
    source: z.string().optional(),
})

export const historySchema = z.object({
    history: z.string().optional(),
    traits: z.string().optional(),
    ideals: z.string().optional(),
    bonds: z.string().optional(),
    flaws: z.string().optional(),
    specialAbilities: z.array(specialAbilitySchema).default([]),
})

export const skillSchema = z.object({
    name: z.string(),
    value: z.number().int().min(0),
    proficient: z.boolean(),
    attribute: z.string().min(1),
})

export const equipmentSchema = z.object({
    name: z.string().min(1, "El nombre del objeto es requerido"),
    type: z.string().min(1, "El tipo es requerido"),
    image: z.string().optional(),
})

export const characterSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre debe ser una cadena de texto",
    })
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no puede exceder 50 caracteres"),

    class: z.string({
        required_error: "Debes seleccionar una clase",
    }),

    race: z.string({
        required_error: "Debes seleccionar una raza",
    }),

    background: z.string({
        required_error: "Debes seleccionar un trasfondo",
    }),

    alignment: z.string({
        required_error: "Debes seleccionar un alineamiento",
    }),

    // level: z.number()
    //     .int("Debe ser un número entero")
    //     .min(1, "El nivel mínimo es 1")
    //     .max(20, "El nivel máximo es 20")
    //     .default(1),

    // experience: z.number()
    //     .int("Debe ser un número entero")
    //     .min(0, "La experiencia no puede ser negativa")
    //     .default(0),

    image: z.string().default(""),

    attributes: attributesSchema,
    skills: z.array(skillSchema).min(1, "Debes seleccionar al menos una habilidad"),
    equipment: z.array(equipmentSchema).default([]),
    history: historySchema.optional(),
})

export type CharacterFormData = z.infer<typeof characterSchema>
export type AttributesFormData = z.infer<typeof attributesSchema>
export type HistoryFormData = z.infer<typeof historySchema>
export type SkillFormData = z.infer<typeof skillSchema>
export type EquipmentFormData = z.infer<typeof equipmentSchema>
export type SpecialAbilityFormData = z.infer<typeof specialAbilitySchema>

export const basicCharacterSchema = characterSchema.pick({
    name: true,
    race: true,
    class: true,
    background: true,
    alignment: true,
    image: true,
})

export type BasicCharacterFormData = z.infer<typeof basicCharacterSchema>

export const attributesCharacterSchema = characterSchema.pick({
    attributes: true,
})

export const skillsCharacterSchema = characterSchema.pick({
    skills: true,
})

export const equipmentCharacterSchema = characterSchema.pick({
    equipment: true,
})

export const historyCharacterSchema = characterSchema.pick({
    history: true,
})

export const completeCharacterSchema = characterSchema
export type CompleteCharacterFormType = z.infer<typeof completeCharacterSchema>