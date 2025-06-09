"use client"

import { useState, useEffect } from 'react'
import { BasicTable } from '@/db/schema'
interface UseStaticDataResult<T> {
    data: T[]
    loading: boolean
    error: string | null
    refetch: () => void
}

// Hook genérico para datos estáticos
export function useStaticData<T extends BasicTable>(
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