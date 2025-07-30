import { EquipmentType } from "@/db/schema"
import { Sword, Shield, Package, LucideIcon } from "lucide-react"

interface EquipmentCategory {
    id: EquipmentType
    name: string
    icon: LucideIcon
    items: string[]
}


export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
    {
        id: "weapon",
        name: "Armas",
        icon: Sword,
        items: [
            "Espada corta",
            "Espada larga",
            "Espada a dos manos",
            "Hacha de mano",
            "Hacha de batalla",
            "Maza",
            "Martillo de guerra",
            "Arco corto",
            "Arco largo",
            "Ballesta ligera",
            "Ballesta pesada",
            "Daga",
            "Lanza",
            "Bastón",
        ]
    },
    {
        id: "armor",
        name: "Armaduras",
        icon: Shield,
        items: [
            "Acolchada",
            "Cuero",
            "Cuero tachonado",
            "Camisote de malla",
            "Cota de escamas",
            "Coraza",
            "Cota de malla",
            "Cota de placas",
            "Placas",
        ]
    },
    {
        id: "object",
        name: "Objetos de Aventura",
        icon: Package,
        items: [
            "Mochila",
            "Saco de dormir",
            "Raciones (1 día)",
            "Cuerda (50 pies)",
            "Antorcha",
            "Cantimplora",
            "Kit de herramientas",
            "Kit de escalada",
            "Kit de curación",
            "Símbolo sagrado",
            "Foco arcano",
            "Componentes de hechizos",
            "Libro de hechizos",
            "Tinta y pluma",
            "Pergamino",
        ]
    }
]