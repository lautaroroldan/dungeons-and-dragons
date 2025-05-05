import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, Swords, BookOpen, Backpack, Heart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

// Datos de ejemplo para los personajes
const personajes = [
  {
    id: 1,
    nombre: "Thorian Martillo de Piedra",
    raza: "Enano",
    clase: "Guerrero",
    nivel: 8,
    trasfondo: "Herrero de Gremio",
    alineamiento: "Legal Bueno",
    experiencia: 34000,
    imagen: "/placeholder.svg?height=400&width=400",
    atributos: {
      fuerza: 18,
      destreza: 12,
      constitucion: 16,
      inteligencia: 10,
      sabiduria: 13,
      carisma: 8,
    },
    habilidades: [
      { nombre: "Atletismo", valor: 7, competente: true },
      { nombre: "Intimidación", valor: 2, competente: true },
      { nombre: "Percepción", valor: 3, competente: false },
      { nombre: "Supervivencia", valor: 4, competente: true },
    ],
    equipamiento: [
      "Hacha de batalla mágica +1",
      "Cota de malla",
      "Escudo de metal",
      "Mochila de aventurero",
      "Raciones (10 días)",
      "Odre de agua",
      "Símbolo sagrado de Moradin",
      "50 piezas de oro",
    ],
    historia:
      "Thorian proviene de las montañas de Piedra Férrea, donde su clan ha forjado armas legendarias durante generaciones. Tras la invasión de su hogar por una horda de orcos, juró venganza y partió en busca de gloria y poder para recuperar las tierras de su pueblo. Su habilidad con el martillo y el yunque solo es superada por su destreza en el campo de batalla.",
    rasgos: [
      "Visión en la oscuridad",
      "Resistencia enana",
      "Entrenamiento en combate",
      "Estilo de lucha: Defensa",
      "Segunda acometida",
      "Crítico mejorado",
    ],
  },
]

export default function PerfilPersonajePage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const personaje = personajes.find((p) => p.id === id)

  if (!personaje) {
    notFound()
  }

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
                      <Progress value={85} className="h-4 bg-red-100" indicatorClassName="bg-red-500" />
                      <span className="font-medium">68/80</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Clase de Armadura</div>
                      <div className="text-xl font-bold">18</div>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Iniciativa</div>
                      <div className="text-xl font-bold">+1</div>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Velocidad</div>
                      <div className="text-xl font-bold">25 ft</div>
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
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-medium">Hacha de batalla mágica +1</span>
                          <span>1d8+5 cortante</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Ataque: +8 | Crítico: 19-20/x2 | Versátil (1d10)
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Armadura</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="font-medium">Cota de malla</div>
                          <div className="text-sm text-muted-foreground">CA +16 | Desventaja en sigilo</div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="font-medium">Escudo de metal</div>
                          <div className="text-sm text-muted-foreground">CA +2</div>
                        </div>
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
                    <p>
                      Thorian es testarudo y directo, como la mayoría de los enanos. Valora la honestidad por encima de
                      todo y no tiene paciencia para las sutilezas diplomáticas. Su lealtad hacia sus amigos es
                      inquebrantable, pero nunca olvida una ofensa.
                    </p>

                    <h3 className="mt-6">Vínculos</h3>
                    <p>
                      Su clan y su hogar son lo más importante para Thorian. Cada moneda que gana, cada hazaña que
                      realiza, todo es para recuperar el esplendor de Piedra Férrea. Lleva consigo un martillo de
                      herrero que perteneció a su padre, como recordatorio constante de su misión.
                    </p>

                    <h3 className="mt-6">Ideales</h3>
                    <ul>
                      <li>Tradición: Los métodos probados por el tiempo son los mejores.</li>
                      <li>Honor: Un trato es un trato, y la palabra dada es sagrada.</li>
                      <li>Comunidad: El clan está por encima del individuo.</li>
                    </ul>

                    <h3 className="mt-6">Defectos</h3>
                    <p>
                      Su orgullo a veces nubla su juicio, y su desconfianza hacia los elfos le ha causado más de un
                      problema. Además, tiene una debilidad por la cerveza fuerte que en ocasiones le ha metido en
                      situaciones comprometidas.
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
