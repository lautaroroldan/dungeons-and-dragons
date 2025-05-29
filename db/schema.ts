import { integer, pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';


export const racesTable = pgTable('races', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
})

export const classesTable = pgTable('classes', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
})

export const backgroundsTable = pgTable('backgrounds', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
})

export const alignmentsTable = pgTable('alignments', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
})

export const attributesTable = pgTable('attributes', {
    id: serial('id').primaryKey(),
    strength: integer('strength').notNull(),
    dexterity: integer('dexterity').notNull(),
    constitution: integer('constitution').notNull(),
    intelligence: integer('intelligence').notNull(),
    wisdom: integer('wisdom').notNull(),
    charisma: integer('charisma').notNull(),
})

export const skillsTable = pgTable('skills', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    attribute: text('attribute').notNull(),
})

export const characterSkillsTable = pgTable('character_skills', {
    id: serial('id').primaryKey(),
    characterId: integer('character_id')
        .notNull()
        .references(() => charactersTable.id, { onDelete: 'cascade' }),
    skillId: integer('skill_id')
        .notNull()
        .references(() => skillsTable.id, { onDelete: 'cascade' }),
    value: integer('value').notNull(),
    proficient: boolean('proficient').notNull().default(false),
})

export const equipmentTable = pgTable('equipment', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    type: text('type').notNull(),
    image: text('image'),
})


export const charactersTable = pgTable('characters', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    race: integer('race_id')
        .notNull()
        .references(() => racesTable.id),
    class: integer('class_id')
        .notNull()
        .references(() => classesTable.id),
    level: integer('level').notNull(),
    experience: integer('experience').notNull(),
    background: integer('background_id')
        .notNull()
        .references(() => backgroundsTable.id),
    alignment: integer('alignment_id')
        .notNull()
        .references(() => alignmentsTable.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    image: text('image').notNull(),
    attributes: integer('attributes_id')
        .notNull()
        .references(() => attributesTable.id),
});

// Tabla intermedia para la relación muchos a muchos entre personajes y equipamiento
export const characterEquipmentTable = pgTable('character_equipment', {
    id: serial('id').primaryKey(),
    characterId: integer('character_id')
        .notNull()
        .references(() => charactersTable.id, { onDelete: 'cascade' }),
    equipmentId: integer('equipment_id')
        .notNull()
        .references(() => equipmentTable.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull().default(1),
    isEquipped: integer('is_equipped').notNull().default(0), // 0 = false, 1 = true
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const historyTable = pgTable('history', {
    id: serial('id').primaryKey(),
    characterId: integer('character_id')
        .notNull()
        .references(() => charactersTable.id, { onDelete: 'cascade' }),
    history: text('history'), // Historia personal
    traits: text('traits'), // Rasgos de personalidad
    ideals: text('ideals'), // Ideales
    bonds: text('bonds'), // Vínculos
    flaws: text('flaws'), // Defectos
})

export const characterSpecialAbilitiesTable = pgTable('character_special_abilities', {
    id: serial('id').primaryKey(),
    characterId: integer('character_id')
        .notNull()
        .references(() => charactersTable.id, { onDelete: 'cascade' }),
    name: text('name').notNull(), // Nombre de la habilidad
    description: text('description'), // Descripción de la habilidad
    type: text('type').notNull(), // "racial", "class", "feat", "magic", etc.
    level: integer('level').default(1), // A qué nivel se obtuvo
    source: text('source'), // De dónde viene (clase, raza, etc.)
    createdAt: timestamp('created_at').notNull().defaultNow(),
})

export interface BasicTable {
    id: number;
    name: string;
}

export interface RaceTable extends BasicTable { }
export interface ClassTable extends BasicTable { }
export interface BackgroundTable extends BasicTable { }
export interface AlignmentTable extends BasicTable { }

export interface AttributesTable {
    id: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface EquipmentTable extends BasicTable {
    type: string;
    description?: string;
    image?: string;
}

export interface CharacterEquipmentTable {
    id: number;
    characterId: number;
    equipmentId: number;
    quantity: number;
    isEquipped: boolean;
    createdAt: Date;
}

export interface HistoryTable {
    id: number;
    characterId: number;
    history?: string;
    traits?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
}

export interface CharacterSpecialAbilityTable extends BasicTable {
    characterId: number;
    description?: string;
    type: string;
    level?: number;
    source?: string;
    createdAt: Date;
}

export type InsertCharacter = typeof charactersTable.$inferInsert;
export type SelectCharacter = typeof charactersTable.$inferSelect;
export type InsertEquipment = typeof equipmentTable.$inferInsert;
export type SelectEquipment = typeof equipmentTable.$inferSelect;
export type InsertSkills = typeof skillsTable.$inferInsert;
export type SelectSkills = typeof skillsTable.$inferSelect;
export type InsertCharacterSkills = typeof characterSkillsTable.$inferInsert;
export type SelectCharacterSkills = typeof characterSkillsTable.$inferSelect;
export type InsertCharacterEquipment = typeof characterEquipmentTable.$inferInsert;
export type SelectCharacterEquipment = typeof characterEquipmentTable.$inferSelect;
export type InsertHistory = typeof historyTable.$inferInsert;
export type SelectHistory = typeof historyTable.$inferSelect;
export type InsertCharacterSpecialAbility = typeof characterSpecialAbilitiesTable.$inferInsert;
export type SelectCharacterSpecialAbility = typeof characterSpecialAbilitiesTable.$inferSelect;
