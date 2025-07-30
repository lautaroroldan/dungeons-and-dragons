import Link from "next/link"
import { Button } from "@shared/components/ui/button"
import { Dice1Icon as DiceD20 } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
      <DiceD20 className="h-24 w-24 mb-6 text-muted-foreground" />
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">¡Fallo crítico!</h1>
      <p className="max-w-[700px] text-lg text-muted-foreground mb-8">
        Parece que has rodado un 1 natural. La página que buscas no existe en este plano de existencia.
      </p>
      <Button asChild size="lg">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  )
}
