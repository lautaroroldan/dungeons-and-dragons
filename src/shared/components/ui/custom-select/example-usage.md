# Ejemplos de Uso - Custom Select Components

## 🎯 **SWRFormSelect - Integración completa con SWR + Form**

```typescript
import React from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { SWRFormSelect } from '@shared/components/ui/custom-select'

interface FormData {
    raceId: string
    classId: string
}

function CharacterCreationForm() {
    const { control, handleSubmit } = useForm<FormData>()
    
    // SWR queries
    const racesQuery = useSWR('/api/races')
    const classesQuery = useSWR('/api/classes')
    
    const onSubmit = (data: FormData) => {
        console.log('Form data:', data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Selección de Raza */}
            <SWRFormSelect
                name="raceId"
                control={control}
                query={racesQuery}
                valueKey="id"
                labelKey="name"
                placeholder="Selecciona una raza"
                errorMessage="Error al cargar las razas"
            />
            
            {/* Selección de Clase */}
            <SWRFormSelect
                name="classId"
                control={control}
                query={classesQuery}
                valueKey="id"
                labelKey="name" 
                placeholder="Selecciona una clase"
                errorMessage="Error al cargar las clases"
            />
            
            <button type="submit">Crear Personaje</button>
        </form>
    )
}
```

## 🔧 **Comparación de Componentes**

### **1. FormSelect - Solo react-hook-form**
```typescript
import { FormSelect } from '@shared/components/ui/custom-select'

// Datos estáticos o ya cargados
const raceOptions = [
    { value: '1', label: 'Humano' },
    { value: '2', label: 'Elfo' }
]

<FormSelect
    name="raceId"
    control={control}
    data={raceOptions}
    placeholder="Selecciona una raza"
/>
```

### **2. SWRSelect - Solo SWR**
```typescript
import { SWRSelect } from '@shared/components/ui/custom-select'

const [selectedRace, setSelectedRace] = useState('')

<SWRSelect
    query={racesQuery}
    valueKey="id"
    labelKey="name"
    value={selectedRace}
    onValueChange={setSelectedRace}
    placeholder="Selecciona una raza"
/>
```

### **3. SWRFormSelect - SWR + react-hook-form**
```typescript
import { SWRFormSelect } from '@shared/components/ui/custom-select'

// La integración más completa
<SWRFormSelect
    name="raceId"
    control={control}
    query={racesQuery}
    valueKey="id"
    labelKey="name"
    placeholder="Selecciona una raza"
/>
```

## 🏗️ **Arquitectura de Componentes**

```
CustomSelect (base)
├── FormSelect (+ react-hook-form)
├── SWRSelect (+ SWR)
└── SWRFormSelect (+ SWR + react-hook-form)
```

## ✅ **Cuándo usar cada uno**

- **CustomSelect**: Datos estáticos, control manual completo
- **FormSelect**: Formularios con datos ya cargados/estáticos  
- **SWRSelect**: Datos dinámicos de API, sin formulario
- **SWRFormSelect**: Formularios con datos dinámicos de API

## 🎭 **Estados Manejados Automáticamente**

Todos los componentes manejan:
- ⏳ **Loading**: Muestra spinner mientras carga
- ❌ **Error**: Muestra mensaje de error con icono
- 📭 **Empty**: Muestra "No hay opciones disponibles"
- ✅ **Success**: Renderiza las opciones normalmente