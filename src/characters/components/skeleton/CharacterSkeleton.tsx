import { Badge } from '@shared/components/ui/badge'
import { Card, CardContent, CardFooter } from '@shared/components/ui/card'
import React from 'react'
import Image from 'next/image'

function CharacterSkeleton() {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="aspect-square relative">
                <Image
                    src={"/placeholder.svg?height=200&width=200"}
                    alt={"placeholder"}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
            <CardContent className="p-4">
                <h2 className="text-xl font-bold">Loading...</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">Loading...</Badge>
                    <Badge variant="secondary">Loading...</Badge>
                    <Badge>Loading...</Badge>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
                <span className="text-sm text-muted-foreground">Loading...</span>
            </CardFooter>
        </Card>
    )
}

export default CharacterSkeleton