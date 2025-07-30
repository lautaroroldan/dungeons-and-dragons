"use client"
import { useRef, useState } from "react"
import { gsap } from "gsap"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@shared/components/ui/card"
import { Goal, MapPin, Users } from "lucide-react"
import { Separator } from "@shared/components/ui/separator"
import { Button } from "@shared/components/ui/button"
import { Badge } from "@shared/components/ui/badge"

type Quest = {
    id: number
    name: string
    description: string
    ubication: string
    characters: string[]
    status: string
    objectives: string[]
    givenBy: string
    rewardBy: string
    date: string
}

interface QuestItemProps {
    quest: Quest
}

export default function QuestItem({ quest }: QuestItemProps) {

    const moreContentRef = useRef<HTMLDivElement>(null)
    const [showMore, setShowMore] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const toggleMore = () => {
        if (!moreContentRef.current) return;

        if (!showMore) {
            gsap.fromTo(moreContentRef.current,
                { height: 0, autoAlpha: 0, overflow: "hidden" },
                { height: "auto", autoAlpha: 1, duration: 0.5, ease: "power2.out" }
            );
        } else {
            gsap.to(moreContentRef.current,
                { height: 0, autoAlpha: 0, duration: 0.4, ease: "power2.inOut" }
            );
        }

        setShowMore(!showMore);
    }

    return (
        <Card
            ref={cardRef}
            key={quest.id}
            className='border-l-4 border-l-blue-500 hover:shadow-lg'
        >
            <div className="flex">
                <div className="w-16 bg-linear-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-2 border-r">
                    <p className='text-sm px-1 py-0.5 rotate-90 whitespace-nowrap text-black font-semibold'>
                        {quest.status}
                    </p>
                </div>
                <div className='flex-1'>
                    <CardHeader className="pb-3">
                        <CardTitle>{quest.name}</CardTitle>
                        <CardDescription>{quest.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-2'>
                        <section className='flex gap-4 text-muted-foreground/70'>
                            <div className='flex gap-1 text-xs items-center'>
                                <MapPin className='w-4 h-4' />
                                <p>{quest.ubication}</p>
                            </div>
                            <div className='flex gap-1 text-xs items-center'>
                                <Users className='w-4 h-4' />
                                <p>3</p>
                            </div>
                        </section>
                        <div
                            ref={moreContentRef}
                            className='overflow-hidden h-0 opacity-0'
                        >
                            <div className='text-sm mt-1.5 flex flex-col gap-2 text-muted-foreground'>
                                <div className="flex gap-1 items-center">
                                    <Goal size={16} className="text-muted-foreground/70" />
                                    <p>
                                        <strong>
                                            Objetivos ({quest.objectives.length})
                                        </strong>
                                    </p>
                                </div>
                                <div className="border-[.5px] border-muted-foreground/20 rounded-lg p-3">
                                    <ul className="space-y-1">
                                        {quest.objectives.slice(0, 2).map((objective, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground/70">
                                                <span className="text-blue-500 font-bold">•</span>
                                                <span>{objective}</span>
                                            </li>
                                        ))}
                                        {quest.objectives.length > 2 && (
                                            <li className="text-xs text-gray-500 italic">
                                                +{quest.objectives.length - 2} objetivos más...
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <p><strong>Personajes asignados:</strong></p>
                                <div className='flex gap-2 text-xs'>
                                    {quest.characters.map((character) => (
                                        <Badge key={character} variant='secondary' className="text-muted-foreground">{character}</Badge>
                                    ))}
                                </div>

                            </div>
                        </div>
                        <Separator className='my-2' />
                        <section className='flex justify-between items-center'>
                            <div className='flex gap-2 text-xs text-muted-foreground/70'>
                                <p>Por: {quest.givenBy}</p>
                                <p>•</p>
                                <p>{quest.date}</p>
                            </div>
                            <Button variant='ghost' size='sm' className='text-blue-500 hover:text-blue-600 cursor-pointer' onClick={toggleMore}>
                                <p>{showMore ? "Ver menos" : "Ver más"}</p>
                            </Button>
                        </section>
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}