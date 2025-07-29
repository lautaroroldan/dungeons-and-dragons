import { History, Skill, SpecialAbility, Equipment } from '@/stores/useCharacterStore';
import { db } from '@/db';
import { InsertCharacter, charactersTable, attributesTable, AttributesTable, equipmentTable, characterEquipmentTable, InsertEquipment, InsertCharacterEquipment, skillsTable, characterSkillsTable, InsertSkills, historyTable, characterSpecialAbilitiesTable } from '@/db/schema';

export async function createCharacter(data: InsertCharacter) {
    const [character] = await db.insert(charactersTable)
        .values(data)
        .returning();
    return character;
}

export type CreateCharacterWithAttributesInput = Omit<InsertCharacter, 'attributes'> & {
    attributes: Omit<AttributesTable, 'id'>;
};

export async function createCharacterWithAttributes(data: CreateCharacterWithAttributesInput) {
    const { attributes, ...characterData } = data;

    const [newAttributes] = await db.insert(attributesTable)
        .values(attributes)
        .returning();

    const [character] = await db.insert(charactersTable)
        .values({
            ...characterData,
            attributes: newAttributes.id
        })
        .returning();

    return character;
}

export async function createAttributes(data: Omit<AttributesTable, 'id'>) {
    const [attributes] = await db.insert(attributesTable)
        .values(data)
        .returning();
    return attributes;
}

// Funciones para equipamiento
export async function createEquipment(data: InsertEquipment) {
    const [equipment] = await db.insert(equipmentTable)
        .values(data)
        .returning();
    return equipment;
}

export async function addEquipmentToCharacter(data: InsertCharacterEquipment) {
    const [characterEquipment] = await db.insert(characterEquipmentTable)
        .values(data)
        .returning();
    return characterEquipment;
}

export async function addMultipleEquipmentToCharacter(
    characterId: number,
    equipmentItems: Array<{
        equipmentId: number;
        quantity?: number;
        isEquipped?: boolean;
    }>
) {
    const equipmentData = equipmentItems.map(item => ({
        characterId,
        equipmentId: item.equipmentId,
        quantity: item.quantity || 1,
        isEquipped: item.isEquipped ? 1 : 0
    }));

    const results = await db.insert(characterEquipmentTable)
        .values(equipmentData)
        .returning();

    return results;
}

// Funciones para skills
export async function createSkill(data: InsertSkills) {
    const [skill] = await db.insert(skillsTable)
        .values(data)
        .returning();
    return skill;
}

export async function createSkillsFromObjects(skillObjects: Array<{ name: string; attribute: string; value: number; proficient: boolean }>) {
    if (skillObjects.length === 0) return [];

    const skillsData = skillObjects.map(skill => ({
        name: skill.name,
        attribute: skill.attribute,
        value: skill.value,
        proficient: skill.proficient
    }));

    const createdSkills = await db.insert(skillsTable)
        .values(skillsData)
        .returning();

    return createdSkills;
}

export async function associateSkillsToCharacter(characterId: number, skillIds: number[]) {
    const characterSkillsData = skillIds.map(skillId => ({
        characterId,
        skillId,
        value: 0,
        proficient: false
    }));

    const results = await db.insert(characterSkillsTable)
        .values(characterSkillsData)
        .returning();

    return results;
}

// Función para crear equipamiento desde objetos simples
export async function createEquipmentFromObjects(equipmentObjects: Array<{ name: string; type: string; image?: string }>) {
    if (equipmentObjects.length === 0) return [];

    const equipmentData = equipmentObjects.map(item => ({
        name: item.name,
        type: item.type,
        image: item.image || ''
    }));

    const createdEquipment = await db.insert(equipmentTable)
        .values(equipmentData)
        .returning();

    return createdEquipment;
}

// Función completa para crear personaje con atributos, skills y equipamiento
export async function createCompleteCharacter(
    characterData: CreateCharacterWithAttributesInput,
    equipmentObjects?: Equipment[],
    skillObjects?: Skill[],
    historyData?: Omit<History, 'specialAbilities'>,
    specialAbilities?: SpecialAbility[]
) {
    console.log("createCompleteCharacter", { characterData, equipmentObjects, skillObjects, historyData, specialAbilities })
    return await db.transaction(async (tx) => {
        // 1. Crear atributos
        const [attributes] = await tx.insert(attributesTable)
            .values(characterData.attributes)
            .returning();

        console.log("attributes", attributes)

        // 2. Crear personaje
        const [character] = await tx.insert(charactersTable)
            .values({
                ...characterData,
                attributes: attributes.id
            })
            .returning();

        // 3. Crear skills si se proporcionan
        if (skillObjects && skillObjects.length > 0) {
            const skillsData = skillObjects.map(skill => ({
                name: skill.name,
                attribute: skill.attribute,
                value: skill.value,
                proficient: skill.proficient
            }));

            const createdSkills = await tx.insert(skillsTable)
                .values(skillsData)
                .returning();

            // Asociar skills al personaje
            const characterSkillsData = createdSkills.map(skill => ({
                characterId: character.id,
                skillId: skill.id,
                value: 0,
                proficient: false
            }));

            await tx.insert(characterSkillsTable)
                .values(characterSkillsData);
        }

        // 4. Crear equipamiento si se proporciona
        if (equipmentObjects && equipmentObjects.length > 0) {
            // Crear los objetos de equipamiento
            const equipmentData = equipmentObjects.map(item => ({
                name: item.name,
                type: item.type,
                image: item.image || ''
            }));

            const createdEquipment = await tx.insert(equipmentTable)
                .values(equipmentData)
                .returning();

            // Asociar equipamiento al personaje
            const characterEquipmentData = createdEquipment.map(equipment => ({
                characterId: character.id,
                equipmentId: equipment.id,
                quantity: 1,
                isEquipped: 0
            }));

            await tx.insert(characterEquipmentTable)
                .values(characterEquipmentData);
        }

        // 5. Crear historia si se proporciona
        if (historyData) {
            await tx.insert(historyTable)
                .values({
                    ...historyData,
                    characterId: character.id
                });
        }

        // 6. Crear rasgos especiales si se proporciona
        if (specialAbilities && specialAbilities.length > 0) {
            await tx.insert(characterSpecialAbilitiesTable)
                .values(specialAbilities.map(ability => ({
                    ...ability,
                    characterId: character.id
                })));
        }

        return character;
    });
}
