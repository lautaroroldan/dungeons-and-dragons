import { db } from "@/db";
import { charactersTable, racesTable, classesTable, alignmentsTable, backgroundsTable, equipmentTable, characterEquipmentTable, attributesTable, skillsTable, historyTable, characterSpecialAbilitiesTable, characterSkillsTable } from "@/db/schema";
import { eq, and } from 'drizzle-orm';

export async function getCharacters() {
    const characters = await db.select().from(charactersTable);
    return characters;
}

export async function getRaces() {
    const races = await db.select().from(racesTable);
    return races;
}

export async function getClasses() {
    const classes = await db.select().from(classesTable);
    return classes;
}

export async function getBackgrounds() {
    const backgrounds = await db.select().from(backgroundsTable);
    return backgrounds;
}

export async function getAlignments() {
    const alignments = await db.select().from(alignmentsTable);
    return alignments;
}

// Obtener todo el equipamiento de un personaje
export async function getCharacterEquipment(characterId: number) {
    const equipment = await db
        .select({
            id: characterEquipmentTable.id,
            quantity: characterEquipmentTable.quantity,
            isEquipped: characterEquipmentTable.isEquipped,
            equipment: {
                id: equipmentTable.id,
                name: equipmentTable.name,
                type: equipmentTable.type,
                image: equipmentTable.image,
            }
        })
        .from(characterEquipmentTable)
        .innerJoin(equipmentTable, eq(characterEquipmentTable.equipmentId, equipmentTable.id))
        .where(eq(characterEquipmentTable.characterId, characterId));

    return equipment;
}

// Obtener solo el equipamiento equipado de un personaje
export async function getCharacterEquippedItems(characterId: number) {
    const equippedItems = await db
        .select({
            id: characterEquipmentTable.id,
            quantity: characterEquipmentTable.quantity,
            equipment: {
                id: equipmentTable.id,
                name: equipmentTable.name,
                type: equipmentTable.type,
                image: equipmentTable.image,
            }
        })
        .from(characterEquipmentTable)
        .innerJoin(equipmentTable, eq(characterEquipmentTable.equipmentId, equipmentTable.id))
        .where(
            and(
                eq(characterEquipmentTable.characterId, characterId),
                eq(characterEquipmentTable.isEquipped, 1)
            )
        );

    return equippedItems;
}

// Obtener personaje completo con equipamiento
export async function getCharacterWithEquipment(characterId: number) {
    const character = await db
        .select()
        .from(charactersTable)
        .where(eq(charactersTable.id, characterId))
        .limit(1);

    if (character.length === 0) {
        return null;
    }

    const equipment = await getCharacterEquipment(characterId);

    return {
        ...character[0],
        equipment
    };
}

// Obtener todo el equipamiento disponible
export async function getAllEquipment() {
    return await db.select().from(equipmentTable);
}

export async function getCharacterById(id: number) {
    const character = await db.select().from(charactersTable).where(eq(charactersTable.id, id));
    return character;
}

// OBTENER TODA LA INFORMACION DE UN PERSONAJE, HACER INNER JOIN DE LAS TABLAS, ADEMAS TRAER INFO DE LAS TABLAS INTERMEDIAS CHARACTER_EQUIPMENT, CHARACTER_SKILLS, CHARACTER_SPECIAL_ABILITIES
export async function getFullCharacterById(id: number) {
    // Primero obtenemos la información base del personaje con sus relaciones directas
    const [character] = await db.select({
        id: charactersTable.id,
        name: charactersTable.name,
        race: racesTable,
        class: classesTable,
        level: charactersTable.level,
        experience: charactersTable.experience,
        background: backgroundsTable,
        alignment: alignmentsTable,
        createdAt: charactersTable.createdAt,
        image: charactersTable.image,
        attributes: attributesTable,
    })
        .from(charactersTable)
        .where(eq(charactersTable.id, id))
        .innerJoin(racesTable, eq(charactersTable.race, racesTable.id))
        .innerJoin(classesTable, eq(charactersTable.class, classesTable.id))
        .innerJoin(backgroundsTable, eq(charactersTable.background, backgroundsTable.id))
        .innerJoin(alignmentsTable, eq(charactersTable.alignment, alignmentsTable.id))
        .innerJoin(attributesTable, eq(charactersTable.attributes, attributesTable.id));

    if (!character) {
        return null;
    }

    // Obtenemos el equipamiento del personaje
    const equipment = await db
        .select({
            id: characterEquipmentTable.id,
            quantity: characterEquipmentTable.quantity,
            isEquipped: characterEquipmentTable.isEquipped,
            equipment: equipmentTable,
        })
        .from(characterEquipmentTable)
        .innerJoin(equipmentTable, eq(characterEquipmentTable.equipmentId, equipmentTable.id))
        .where(eq(characterEquipmentTable.characterId, id));

    // Obtenemos las habilidades del personaje
    const skills = await db
        .select({
            id: characterSkillsTable.id,
            value: characterSkillsTable.value,
            proficient: characterSkillsTable.proficient,
            skill: skillsTable,
        })
        .from(characterSkillsTable)
        .innerJoin(skillsTable, eq(characterSkillsTable.skillId, skillsTable.id))
        .where(and(eq(characterSkillsTable.characterId, id), eq(characterSkillsTable.proficient, true)));

    // Obtenemos la historia del personaje
    const [history] = await db
        .select()
        .from(historyTable)
        .where(eq(historyTable.characterId, id));

    // Obtenemos las habilidades especiales del personaje
    const specialAbilities = await db
        .select()
        .from(characterSpecialAbilitiesTable)
        .where(eq(characterSpecialAbilitiesTable.characterId, id));

    return {
        ...character,
        equipment,
        skills,
        history: history || null,
        specialAbilities,
    };
}

