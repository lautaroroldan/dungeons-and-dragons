import { Card, CardHeader, CardTitle, CardContent } from "@shared/components/ui/card"
import { getRacesById, getClassById, getBackgroundById, getAlignmentsById } from "@shared/utils/utils"
import { Badge } from "@shared/components/ui/badge"
import Image from "next/image"
import { UseFormReturn, useWatch } from "react-hook-form"
import { CompleteCharacterFormType } from "@/lib/validations/character"

interface BasicInfoCardProps {
    form: UseFormReturn<CompleteCharacterFormType>
}

export function BasicInfoCard({ form }: BasicInfoCardProps) {

    const { name, image, race, class: characterClass, background, alignment } = useWatch({
        control: form.control,
    })

    const raceData = getRacesById(Number(race))
    const classData = getClassById(Number(characterClass))
    const backgroundData = getBackgroundById(Number(background))
    const alignmentData = getAlignmentsById(Number(alignment))

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">{name || "Sin nombre"}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={name || "Personaje"}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Badge className="justify-center">{raceData?.name || "Sin raza"}</Badge>
                    <Badge className="justify-center">{classData?.name || "Sin clase"}</Badge>
                    <Badge variant="outline" className="justify-center">
                        {backgroundData?.name || "Sin trasfondo"}
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                        {alignmentData?.name || "Sin alineamiento"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}