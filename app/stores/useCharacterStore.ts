import { create } from 'zustand';


export type Character = {
    name: string;
    class: number;
    race: number;
    level: number;
    background: number;
    alignment: number;
    experience: number;
    image: string;
    attributes: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };
    skills: Skill[];
    equipment: Equipment[];
    history: History;
};


export type History = {
    history: string;
    traits: string;
    ideals: string;
    bonds: string;
    flaws: string;
    specialAbilities: SpecialAbility[];
}

export type SpecialAbility = {
    name: string;
    description: string;
    type: string;
    level: number;
    source: string;
}

export type Equipment = {
    name: string;
    type: string;
    image: string | null;
}

export type Skill = {
    name: string;
    value: number;
    proficient: boolean;
    attribute: string;
}

type CharacterStore = {
    character: Character;
    setCharacter: (newData: Partial<Character>) => void;
    resetCharacter: () => void;
};

export const useCharacterStore = create<CharacterStore>((set) => ({
    character: {
        name: '',
        class: 0,
        race: 0,
        level: 0,
        background: 0,
        alignment: 0,
        experience: 0,
        image: '',
        attributes: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
        },
        skills: [
            { name: "Arcanos", value: 0, proficient: false, attribute: "intelligence" },
            { name: "Atletismo", value: 0, proficient: false, attribute: "strength" },
            { name: "Engaño", value: 0, proficient: false, attribute: "charisma" },
            { name: "Historia", value: 0, proficient: false, attribute: "intelligence" },
            { name: "Interpretación", value: 0, proficient: false, attribute: "intelligence" },
            { name: "Intimidación", value: 0, proficient: false, attribute: "charisma" },
            { name: "Investigación", value: 0, proficient: false, attribute: "intelligence" },
            { name: "Juego de Manos", value: 0, proficient: false, attribute: "dexterity" },
            { name: "Medicina", value: 0, proficient: false, attribute: "wisdom" },
            { name: "Naturaleza", value: 0, proficient: false, attribute: "intelligence" },
            { name: "Percepción", value: 0, proficient: false, attribute: "wisdom" },
            { name: "Perspicacia", value: 0, proficient: false, attribute: "wisdom" },
            { name: "Persuasión", value: 0, proficient: false, attribute: "charisma" },
            { name: "Religión", value: 0, proficient: false, attribute: "intelligence" },
            { name: "Sigilo", value: 0, proficient: false, attribute: "dexterity" },
            { name: "Supervivencia", value: 0, proficient: false, attribute: "wisdom" },
            { name: "Trato con Animales", value: 0, proficient: false, attribute: "charisma" },
        ],
        equipment: [],
        history: {
            history: '',
            traits: '',
            ideals: '',
            bonds: '',
            flaws: '',
            specialAbilities: [],
        },
    },
    setCharacter: (newData) =>
        set((state) => ({
            character: {
                ...state.character,
                ...newData,
            },
        })),
    resetCharacter: () =>
        set(() => ({
            character: {
                name: '',
                class: 0,
                race: 0,
                level: 0,
                background: 0,
                alignment: 0,
                experience: 0,
                image: '',
                attributes: {
                    strength: 10,
                    dexterity: 10,
                    constitution: 10,
                    intelligence: 10,
                    wisdom: 10,
                    charisma: 10,
                },
                skills: [
                    { name: "Arcanos", value: 0, proficient: false, attribute: "intelligence" },
                    { name: "Atletismo", value: 0, proficient: false, attribute: "strength" },
                    { name: "Engaño", value: 0, proficient: false, attribute: "charisma" },
                    { name: "Historia", value: 0, proficient: false, attribute: "intelligence" },
                    { name: "Interpretación", value: 0, proficient: false, attribute: "intelligence" },
                    { name: "Intimidación", value: 0, proficient: false, attribute: "charisma" },
                    { name: "Investigación", value: 0, proficient: false, attribute: "intelligence" },
                    { name: "Juego de Manos", value: 0, proficient: false, attribute: "dexterity" },
                    { name: "Medicina", value: 0, proficient: false, attribute: "wisdom" },
                    { name: "Naturaleza", value: 0, proficient: false, attribute: "intelligence" },
                    { name: "Percepción", value: 0, proficient: false, attribute: "wisdom" },
                    { name: "Perspicacia", value: 0, proficient: false, attribute: "wisdom" },
                    { name: "Persuasión", value: 0, proficient: false, attribute: "charisma" },
                    { name: "Religión", value: 0, proficient: false, attribute: "intelligence" },
                    { name: "Sigilo", value: 0, proficient: false, attribute: "dexterity" },
                    { name: "Supervivencia", value: 0, proficient: false, attribute: "wisdom" },
                    { name: "Trato con Animales", value: 0, proficient: false, attribute: "charisma" },
                ],
                equipment: [],
                history: {
                    history: '',
                    traits: '',
                    ideals: '',
                    bonds: '',
                    flaws: '',
                    specialAbilities: [],
                },
            },
        })),
}));
