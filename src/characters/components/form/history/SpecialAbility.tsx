import { Card, CardHeader, CardTitle, CardContent } from "@shared/components/ui/card";
import { Input } from "@shared/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@shared/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@shared/components/ui/button";
import { Label } from "@shared/components/ui/label";
import { TextAreaForm } from "../TextAreaForm";
import { SpecialAbility as SpecialAbilityType } from "@/stores/useCharacterStore";
import { CompleteCharacterFormType } from "@/lib/validations/character";
import { UseFormReturn } from "react-hook-form";
import { ABILITY_TYPES } from "@characters/utils/SpecialAbility";
import { FormControl, FormField, FormItem, FormLabel } from "@shared/components/ui/form";

interface SpecialAbilityProps {
    form: UseFormReturn<CompleteCharacterFormType>
    append: (ability: SpecialAbilityType) => void
    fields: SpecialAbilityType[]
    remove: (index: number) => void
}

export function SpecialAbility({ form, fields, remove, append }: SpecialAbilityProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Habilidades Especiales</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                        Agrega habilidades especiales de tu personaje, como visión en la oscuridad, resistencia a elementos,
                        habilidades de clase, dotes, etc.
                    </p>

                    {fields.map((_, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm">Habilidad {index + 1}</h4>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name={`history.specialAbilities.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre de la Habilidad</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ej: Visión en la Oscuridad"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`history.specialAbilities.${index}.type`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona el tipo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {ABILITY_TYPES.map((type) => (
                                                            <SelectItem key={type.value} value={type.value}>
                                                                {type.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name={`history.specialAbilities.${index}.level`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nivel</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max="20"
                                                    placeholder="1"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`history.specialAbilities.${index}.source`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fuente</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ej: Raza Elfo, Clase Explorador"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <TextAreaForm
                                form={form}
                                name={`history.specialAbilities.${index}.description`}
                                label="Descripción"
                                placeholder="Describe cómo funciona esta habilidad..."
                                TextAreaClassName="min-h-[80px]"
                            />

                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => append({
                            name: "",
                            description: "",
                            type: "other",
                            level: 1,
                            source: ""
                        })}
                        className="w-full"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Agregar Habilidad Especial
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}