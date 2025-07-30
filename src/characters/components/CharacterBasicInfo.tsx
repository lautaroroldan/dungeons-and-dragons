import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Progress } from "@shared/components/ui/progress"
import { Badge } from "@shared/components/ui/badge"

interface Race {
    id: number
    name: string
}

interface Class {
    id: number
    name: string
}

interface Background {
    id: number
    name: string
}

interface Alignment {
    id: number
    name: string
}

interface CharacterBasicInfoProps {
    id: number
    name: string
    image: string
    level: number
    experience: number
    race: Race
    class: Class
    background: Background
    alignment: Alignment
}

export function CharacterBasicInfo({
    id,
    name,
    image,
    level,
    experience,
    race,
    class: characterClass,
    background,
    alignment
}: CharacterBasicInfoProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                    <Badge className="justify-center">{race.name}</Badge>
                    <Badge className="justify-center">{characterClass.name}</Badge>
                    <Badge variant="outline" className="justify-center">
                        {background.name}
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                        {alignment.name}
                    </Badge>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Nivel {level}</span>
                        <span className="text-sm text-muted-foreground">
                            {experience} XP
                        </span>
                    </div>
                    <Progress value={75} className="h-2" />
                </div>
            </CardContent>
        </Card>
    )
} 