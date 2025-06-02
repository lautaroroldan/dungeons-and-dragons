"use client"
import React from 'react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Separator } from '@/components/ui/separator'

function Header() {
    const pathname = usePathname()

    const pathParts = pathname.split('/').filter(part => part !== '')
    const breadcrumbItems = [
        {
            name: 'Inicio',
            href: '/'
        }
    ]

    let currentPath = ''
    pathParts.forEach((part, index) => {
        currentPath += `/${part}`
        breadcrumbItems.push({
            name: part.charAt(0).toUpperCase() + part.slice(1),
            href: currentPath
        })
    })

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
            <div className="flex justify-between items-center w-full">
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href}>{item.name}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index !== breadcrumbItems.length - 1 && (
                                    <BreadcrumbSeparator />
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
                <ThemeToggle />
            </div>
            <Separator />
        </div>
    )
}

export default Header