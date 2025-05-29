"use client"

import { useState, useEffect } from 'react'
import { getCachedRaces, getCachedClasses, getCachedBackgrounds, getCachedAlignments } from '@/lib/server-actions'
import { BasicTable } from '@/db/schema'

interface UseStaticDataResult<T> {
    data: T[]
    loading: boolean
    error: string | null
    refetch: () => void
}

// Hook genérico para datos estáticos
function useStaticData<T extends BasicTable>(
    fetcher: () => Promise<T[]>,
    key: string
): UseStaticDataResult<T> {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await fetcher()
            setData(result)
        } catch (err) {
            console.error(`Error fetching ${key}:`, err)
            setError(`Error al cargar ${key}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        data,
        loading,
        error,
        refetch: fetchData
    }
}

// Hooks específicos para cada tipo de dato
export function useRaces() {
    return useStaticData(getCachedRaces, 'races')
}

export function useClasses() {
    return useStaticData(getCachedClasses, 'classes')
}

export function useBackgrounds() {
    return useStaticData(getCachedBackgrounds, 'backgrounds')
}

export function useAlignments() {
    return useStaticData(getCachedAlignments, 'alignments')
} 