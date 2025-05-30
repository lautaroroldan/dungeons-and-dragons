# Formulario de Creación de Personajes

## 📁 Estructura

```
components/character/form/
├── FormTabs.tsx              # Componente principal de tabs
├── FormNavigationButtons.tsx # Botones de navegación
├── index.ts                  # Exports centralizados
└── README.md                 # Esta documentación
```

## ➕ Cómo agregar un nuevo paso

Para agregar un nuevo paso al formulario, solo necesitas modificar **UN ARCHIVO**:

### 1. Edita `app/personajes/crear/constants/formSteps.ts`:

```typescript
// Importa tu nuevo componente
import { TuNuevoComponente } from "@/app/personajes/crear/components/tu-nuevo-componente"

export const FORM_STEPS: FormStep[] = [
    { id: 0, titulo: "Información Básica", component: BasicInformationPanel },
    { id: 1, titulo: "Atributos", component: Attributes },
    { id: 2, titulo: "Habilidades", component: Skills },
    { id: 3, titulo: "Equipamiento", component: AddCharacterEquipment },
    { id: 4, titulo: "Historia", component: History },
    { id: 5, titulo: "Resumen", component: Summary },
    // ✅ Agrega tu nuevo paso aquí
    { id: 6, titulo: "Tu Nuevo Paso", component: TuNuevoComponente },
]
```

¡Y eso es todo! 🎉

## 🔧 Componentes

### FormTabs
- Renderiza automáticamente todos los pasos definidos en `FORM_STEPS`
- Maneja la navegación entre tabs
- Se adapta automáticamente al número de pasos

### FormNavigationButtons
- Botones "Anterior" y "Siguiente"
- Botón "Guardar" en el último paso
- Manejo automático del estado de loading con `useFormStatus`

## 📦 Uso

```typescript
import { FormTabs, FormNavigationButtons } from "@/components/character/form"

// En tu componente
<FormTabs currentStep={step} onStepChange={setStep} />
<FormNavigationButtons 
    step={step}
    isFirstStep={isFirstStep}
    isLastStep={isLastStep}
    onNextStep={nextStep}
    onPreviousStep={previousStep}
/>
```

## 🎯 Ventajas de esta estructura

1. **Fácil mantenimiento**: Un solo archivo para agregar pasos
2. **Componentes reutilizables**: Organizados en `/components/character/`
3. **Tipado automático**: TypeScript infiere tipos automáticamente
4. **Escalable**: Fácil agregar validaciones, condiciones, etc. 