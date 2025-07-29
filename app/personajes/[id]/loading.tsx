import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from "@/components/ui/skeleton"
import React from 'react'

function LoadingCharacter() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <Skeleton className="text-2xl w-full h-10" />
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                                <Skeleton className="w-full h-full" />
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <Skeleton className="w-full h-5" />
                                <Skeleton className="w-full h-5" />
                                <Skeleton className="w-full h-5" />
                                <Skeleton className="w-full h-5" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="w-[80px] h-5" />
                                    <Skeleton className="w-[30px] h-5" />
                                </div>
                                <Skeleton className="w-full h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <Skeleton className="w-full h-10" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="w-full h-24" />
                                <Skeleton className="w-full h-24" />
                                <Skeleton className="w-full h-24" />
                                <Skeleton className="w-full h-24" />
                                <Skeleton className="w-full h-24" />
                                <Skeleton className="w-full h-24" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <Skeleton className="w-full h-10" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="w-full h-10" />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Skeleton className="grid grid-cols-3 mb-4 w-full h-10" />
                    <div className="space-y-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <Skeleton className="w-full h-10" />
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <Skeleton className="w-full h-60" />
                                <div className='flex flex-col gap-2'>
                                    <Skeleton className="w-[50px] h-4" />
                                    <Skeleton className="w-[100px] h-4" />
                                    <Skeleton className="w-full h-5" />
                                </div>
                                <div className='flex gap-4'>
                                    <Skeleton className="w-full h-14" />
                                    <Skeleton className="w-full h-14" />
                                    <Skeleton className="w-full h-14" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingCharacter