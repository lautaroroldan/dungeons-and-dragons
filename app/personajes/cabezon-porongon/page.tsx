import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, Swords, BookOpen, Backpack, Heart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

// Datos del personaje "El Porongon"
const personaje = {
  id: 7,
  nombre: "Cabezon Porongon",
  raza: "Goblin",
  clase: "Pícaro",
  nivel: 5,
  trasfondo: "Criminal",
  alineamiento: "Caótico Neutral",
  experiencia: 6500,
  imagen: "/placeholder.svg?height=400&width=400",
  atributos: {
    fuerza: 10,
    destreza: 18,
    constitucion: 14,
    inteligencia: 12,
    sabiduria: 8,
    carisma: 13,
  },
  habilidades: [
    { nombre: "Acrobacias", valor: 7, competente: true },
    { nombre: "Sigilo", valor: 9, competente: true },
    { nombre: "Juego de Manos", valor: 7, competente: true },
    { nombre: "Percepción", valor: 1, competente: false },
    { nombre: "Engaño", valor: 5, competente: true },
    { nombre: "Intimidación", valor: 3, competente: false },
  ],
  equipamiento: [
    "Daga de la Sombra (+1)",
    "Daga del Veneno",
    "Armadura de cuero tachonado",
    "Herramientas de ladrón",
    "Capa de sigilo",
    "Ganzúas maestras",
    "Bolsa de caltrops",
    "Cuerda de seda (50 pies)",
    "Veneno básico (3 dosis)",
    "Amuleto de la suerte",
    "78 piezas de oro",
  ],
  historia:
    "Nacido en una tribu goblin en las afueras de Neverwinter, 'Cabezon Porongon' descubrió desde temprana edad que era más astuto que fuerte. Mientras sus congéneres se entrenaban para la guerra frontal, él perfeccionaba el arte del sigilo y el robo. Su nombre, que él mismo se puso, pretende intimidar a sus enemigos, aunque pocos lo toman en serio hasta que sienten sus dagas en la espalda. Tras ser expulsado de su tribu por robar al jefe, vagó por las ciudades humanas, perfeccionando sus habilidades como ladrón y asesino ocasional. Eventualmente, su reputación creció en los bajos fondos, donde se le conoce por su habilidad para colarse en lugares supuestamente impenetrables.",
  rasgos: [
    "Furia Pequeña (ventaja contra enemigos más grandes)",
    "Ágil Escape (puede usar acción bonus para Retirada)",
    "Ataque Furtivo (3d6)",
    "Pericia (Acrobacias, Sigilo)",
    "Evasión",
    "Visión en la oscuridad",
  ],
  personalidad:
    "Cabezon Porongon es fanfarrón y jactancioso, siempre presumiendo de hazañas que pueden o no ser ciertas. A pesar de su pequeño tamaño, actúa con la confianza de un gigante. Tiene un peculiar sentido del humor, a menudo inapropiado, y disfruta gastando bromas pesadas a sus compañeros. Sin embargo, bajo esta fachada, es sorprendentemente leal a quienes considera amigos.",
  ideales:
    "La libertad está por encima de todo. Las cadenas son para los débiles, y él nunca será encadenado, ni física ni metafóricamente. Cree que cada uno debe forjar su propio destino, sin importar las reglas de la sociedad.",
  vinculos:
    "Posee un pequeño medallón robado de un noble que, sin saberlo, es la clave para un tesoro familiar perdido. Aunque podría venderlo por una buena suma, lo mantiene como su amuleto de la suerte. También tiene una deuda de vida con un mercader humano que lo salvó de ser linchado en Waterdeep.",
  defectos:
    "Su arrogancia a menudo lo mete en problemas más grandes de lo que puede manejar. Tiene una tendencia a robar objetos brillantes de forma compulsiva, incluso cuando no tienen valor. Además, nunca puede resistirse a un desafío cuando alguien cuestiona sus habilidades.",
}

export default function PerfilPersonajePage() {
  // Función para calcular el modificador de atributo
  const calcularModificador = (valor: number) => {
    const mod = Math.floor((valor - 10) / 2)
    return mod >= 0 ? `+${mod}` : mod.toString()
  }

  // Función para calcular el próximo nivel de experiencia
  const calcularProximoNivel = () => {
    const nivelActual = personaje.nivel
    const expActual = personaje.experiencia

    // Tabla simplificada de experiencia D&D 5e
    const expNecesaria = {
      1: 0,
      2: 300,
      3: 900,
      4: 2700,
      5: 6500,
      6: 14000,
      7: 23000,
      8: 34000,
      9: 48000,
      10: 64000,
      11: 85000,
      12: 100000,
      13: 120000,
      14: 140000,
      15: 165000,
      16: 195000,
      17: 225000,
      18: 265000,
      19: 305000,
      20: 355000,
    }

    if (nivelActual >= 20) return { actual: expActual, siguiente: expActual, porcentaje: 100 }

    const expSiguienteNivel = expNecesaria[(nivelActual + 1) as keyof typeof expNecesaria]
    const expNivelActual = expNecesaria[nivelActual as keyof typeof expNecesaria]
    const diferencia = expSiguienteNivel - expNivelActual
    const progreso = expActual - expNivelActual
    const porcentaje = Math.round((progreso / diferencia) * 100)

    return {
      actual: expActual,
      siguiente: expSiguienteNivel,
      porcentaje,
    }
  }

  const experiencia = calcularProximoNivel()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/personajes">
            <ArrowLeft className="h-4 w-4" />
            Volver a todos los personajes
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información básica */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{personaje.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={personaje.imagen || "/placeholder.svg"}
                  alt={personaje.nombre}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <Badge className="justify-center">{personaje.raza}</Badge>
                <Badge className="justify-center">{personaje.clase}</Badge>
                <Badge variant="outline" className="justify-center">
                  {personaje.trasfondo}
                </Badge>
                <Badge variant="outline" className="justify-center">
                  {personaje.alineamiento}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Nivel {personaje.nivel}</span>
                  <span className="text-sm text-muted-foreground">
                    {experiencia.actual} / {experiencia.siguiente} XP
                  </span>
                </div>
                <Progress value={experiencia.porcentaje} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Atributos */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Atributos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(personaje.atributos).map(([atributo, valor]) => (
                  <div key={atributo} className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-xs uppercase text-muted-foreground mb-1">
                      {atributo === "fuerza" && "Fuerza"}
                      {atributo === "destreza" && "Destreza"}
                      {atributo === "constitucion" && "Constitución"}
                      {atributo === "inteligencia" && "Inteligencia"}
                      {atributo === "sabiduria" && "Sabiduría"}
                      {atributo === "carisma" && "Carisma"}
                    </div>
                    <div className="text-2xl font-bold">{valor}</div>
                    <div className="text-sm font-medium">{calcularModificador(valor)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rasgos */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Rasgos y Habilidades Especiales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {personaje.rasgos.map((rasgo, index) => (
                  <li key={index} className="text-sm py-1 border-b border-muted last:border-0">
                    {rasgo}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Columna central y derecha - Pestañas con información detallada */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="habilidades">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="habilidades" className="flex items-center gap-2">
                <Swords className="h-4 w-4" />
                <span className="hidden sm:inline">Habilidades</span>
              </TabsTrigger>
              <TabsTrigger value="equipamiento" className="flex items-center gap-2">
                <Backpack className="h-4 w-4" />
                <span className="hidden sm:inline">Equipamiento</span>
              </TabsTrigger>
              <TabsTrigger value="historia" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Historia</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="habilidades" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Habilidades y Competencias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {personaje.habilidades.map((habilidad) => (
                      <div key={habilidad.nombre} className="flex items-center justify-between p-2 rounded-lg border">
                        <div className="flex items-center gap-2">
                          {habilidad.competente && <div className="w-2 h-2 rounded-full bg-primary" />}
                          <span>{habilidad.nombre}</span>
                        </div>
                        <Badge variant={habilidad.competente ? "default" : "outline"}>+{habilidad.valor}</Badge>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Puntos de Vida</h3>
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <Progress value={90} className="h-4 bg-red-100" indicatorClassName="bg-red-500" />
                      <span className="font-medium">36/40</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Clase de Armadura</div>
                      <div className="text-xl font-bold">15</div>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Iniciativa</div>
                      <div className="text-xl font-bold">+4</div>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Velocidad</div>
                      <div className="text-xl font-bold">30 ft</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipamiento" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Equipamiento e Inventario</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Armas</h3>
                      <div className="space-y-3">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between">
                            <span className="font-medium">Daga de la Sombra (+1)</span>
                            <span>1d4+5 perforante</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Ataque: +8 | Crítico: 19-20/x2 | Propiedad: +1d4 daño necrótico en oscuridad
                          </div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between">
                            <span className="font-medium">Daga del Veneno</span>
                            <span>1d4+4 perforante</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Ataque: +7 | Crítico: 19-20/x2 | Propiedad: 1/día aplicar veneno (CD 13 Con, 2d6 daño)
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Armadura</h3>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="font-medium">Armadura de cuero tachonado</div>
                        <div className="text-sm text-muted-foreground">CA +12 | Sin penalización</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Inventario</h3>
                      <ul className="space-y-1 bg-muted p-3 rounded-lg">
                        {personaje.equipamiento.slice(3).map((item, index) => (
                          <li key={index} className="text-sm py-1 border-b border-background last:border-0">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historia" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Historia y Trasfondo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <h3>Orígenes</h3>
                    <p>{personaje.historia}</p>

                    <h3 className="mt-6">Personalidad</h3>
                    <p>{personaje.personalidad}</p>

                    <h3 className="mt-6">Vínculos</h3>
                    <p>{personaje.vinculos}</p>

                    <h3 className="mt-6">Ideales</h3>
                    <p>{personaje.ideales}</p>

                    <h3 className="mt-6">Defectos</h3>
                    <p>{personaje.defectos}</p>

                    <h3 className="mt-6">Técnicas de Combate</h3>
                    <p>
                      El Porongon ha perfeccionado un estilo de combate único que él llama "La Danza de las Dos Dagas".
                      Aprovechando su pequeño tamaño y agilidad, se desliza entre las piernas de sus enemigos más
                      grandes, atacando puntos vulnerables con precisión letal. Prefiere emboscar desde las sombras,
                      atacando primero con su Daga de la Sombra para infligir daño necrótico, y luego rematando con la
                      Daga del Veneno para debilitar a su oponente.
                    </p>
                    <p>
                      En combate grupal, El Porongon actúa como un francotirador, moviéndose rápidamente por el campo de
                      batalla para apoyar a sus aliados donde más se necesite. Su táctica favorita es trepar a lugares
                      elevados y saltar sobre enemigos desprevenidos, gritando su nombre en el proceso para sembrar el
                      caos y la confusión.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
