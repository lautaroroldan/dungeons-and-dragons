import { cn } from '@/lib/utils'
import React from 'react'

interface TitleProps {
    title: string
    icon?: React.ReactNode
    className?: string
}

function Title({ title, icon, className }: TitleProps) {
    return (
        <h1 className={cn(
            "text-3xl font-extrabold tracking-tight lg:text-4xl",
            icon && "flex gap-2 items-center",
            className)}>
            {icon}
            {title}
        </h1>
    )
}

export default Title