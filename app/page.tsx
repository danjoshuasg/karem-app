"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Diamond, ArrowRight, Star, Award, Shield, Gift } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

// Componente de animación para texto
import { ReactNode } from "react";

const AnimatedText = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay }}>
    {children}
  </motion.div>
)

// Componente de animación para imágenes
const AnimatedImage = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay }}
  >
    {children}
  </motion.div>
)

// Componente de característica
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="glass-card border-secondary/20 h-full">
    <CardContent className="p-6 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-medium font-playfair mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </CardContent>
  </Card>
)

// Componente de colección destacada
interface FeaturedCollectionProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const FeaturedCollection = ({ image, title, description, link }: FeaturedCollectionProps) => (
  <motion.div
    className="relative overflow-hidden rounded-lg group"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <div className="aspect-[4/5] relative">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="text-xl font-playfair font-medium mb-2 text-white">{title}</h3>
      <p className="text-white/80 text-sm mb-4">{description}</p>
      <Button asChild variant="outline" className="border-white text-white hover:bg-white/20">
        <Link href={link}>
          Descubrir <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  </motion.div>
)

// Componente de testimonio
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

const Testimonial = ({ quote, author, role }: TestimonialProps) => (
  <Card className="glass-card border-secondary/20">
    <CardContent className="p-6 text-center">
      <div className="flex justify-center mb-4">
        <Star className="h-5 w-5 text-secondary" fill="currentColor" />
        <Star className="h-5 w-5 text-secondary" fill="currentColor" />
        <Star className="h-5 w-5 text-secondary" fill="currentColor" />
        <Star className="h-5 w-5 text-secondary" fill="currentColor" />
        <Star className="h-5 w-5 text-secondary" fill="currentColor" />
      </div>
      <p className="italic text-foreground/80 mb-4">"{quote}"</p>
      <p className="font-medium font-playfair">{author}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </CardContent>
  </Card>
)

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/1564612/pexels-photo-1564612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Joyería de lujo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <AnimatedText>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-12 bg-secondary" />
                <span className="text-secondary uppercase tracking-wider text-sm font-medium">Joyería Exclusiva</span>
              </div>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair leading-tight">
                Elegancia que <span className="text-secondary">perdura</span> en el tiempo
              </h1>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-xl mb-8 text-foreground/80 max-w-xl">
                Descubre nuestra colección de joyas exclusivas diseñadas para realzar tu belleza natural y expresar tu
                estilo único.
              </p>
            </AnimatedText>

            <AnimatedText delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6"
                >
                  <Link href="/catalogo">
                    Explorar colección <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="text-lg px-8 py-6">
                  <Link href="#about">Nuestra historia</Link>
                </Button>
              </div>
            </AnimatedText>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ArrowRight className="h-6 w-6 transform rotate-90 text-foreground/60" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedText>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-secondary" />
                <span className="text-secondary uppercase tracking-wider text-sm font-medium">Por qué elegirnos</span>
                <div className="h-px w-8 bg-secondary" />
              </div>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Compromiso con la excelencia</h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-muted-foreground">
                En La Vitrine, cada pieza es una obra maestra creada con pasión, precisión y los materiales más finos.
              </p>
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedText delay={0.3}>
              <FeatureCard
                icon={<Diamond className="h-6 w-6 text-secondary" />}
                title="Materiales Premium"
                description="Utilizamos solo los materiales más finos y piedras preciosas certificadas para crear piezas que perduran."
              />
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <FeatureCard
                icon={<Award className="h-6 w-6 text-secondary" />}
                title="Artesanía Excepcional"
                description="Cada joya es elaborada a mano por maestros artesanos con décadas de experiencia."
              />
            </AnimatedText>

            <AnimatedText delay={0.5}>
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-secondary" />}
                title="Garantía de por Vida"
                description="Respaldamos la calidad de nuestras joyas con una garantía que te brinda tranquilidad."
              />
            </AnimatedText>

            <AnimatedText delay={0.6}>
              <FeatureCard
                icon={<Gift className="h-6 w-6 text-secondary" />}
                title="Experiencia Personalizada"
                description="Ofrecemos un servicio de diseño personalizado para crear la joya de tus sueños."
              />
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedText>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-secondary" />
                <span className="text-secondary uppercase tracking-wider text-sm font-medium">
                  Colecciones Destacadas
                </span>
                <div className="h-px w-8 bg-secondary" />
              </div>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Descubre nuestras colecciones</h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-muted-foreground">
                Explora nuestras colecciones exclusivas, cada una con su propia historia y carácter distintivo.
              </p>
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedText delay={0.3}>
              <FeaturedCollection
                image="https://images.pexels.com/photos/167684/pexels-photo-167684.jpeg?auto=compress&cs=tinysrgb&w=600"
                title="Colección Etérea"
                description="Diseños delicados inspirados en la naturaleza."
                link="/catalogo"
              />
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <FeaturedCollection
                image="https://images.pexels.com/photos/18278202/pexels-photo-18278202/free-photo-of-sun-flares-on-sea-surface.jpeg?auto=compress&cs=tinysrgb&w=600"
                title="Colección Lumière"
                description="Piezas que capturan y reflejan la luz de manera única."
                link="/catalogo"
              />
            </AnimatedText>

            <AnimatedText delay={0.5}>
              <FeaturedCollection
                image="https://images.pexels.com/photos/1809347/pexels-photo-1809347.jpeg?auto=compress&cs=tinysrgb&w=600"
                title="Colección Heirloom"
                description="Joyas atemporales destinadas a convertirse en herencia familiar."
                link="/catalogo"
              />
            </AnimatedText>
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link href="/catalogo">
                Ver todas las colecciones <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Virtual Try-On Banner */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=600&width=1600" alt="Virtual Try-On" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <AnimatedText>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-12 bg-secondary" />
                <span className="text-secondary uppercase tracking-wider text-sm font-medium">Innovación</span>
              </div>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Prueba nuestras joyas virtualmente</h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-xl mb-8 text-foreground/80 max-w-xl">
                Nuestra tecnología de probador virtual te permite visualizar cómo lucirían nuestras joyas en ti antes de
                comprarlas.
              </p>
            </AnimatedText>

            <AnimatedText delay={0.3}>
              <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/catalogo">
                  Probar ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedText>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-secondary" />
                <span className="text-secondary uppercase tracking-wider text-sm font-medium">Testimonios</span>
                <div className="h-px w-8 bg-secondary" />
              </div>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Lo que dicen nuestros clientes</h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-muted-foreground">
                Descubre por qué nuestros clientes confían en La Vitrine para sus momentos más especiales.
              </p>
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <AnimatedText delay={0.3}>
              <Testimonial
                quote="El anillo que compré para mi compromiso superó todas mis expectativas. El servicio personalizado fue excepcional."
                author="María Rodríguez"
                role="Cliente desde 2021"
              />
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <Testimonial
                quote="La calidad de las joyas de La Vitrine es incomparable. Cada pieza que he adquirido se ha convertido en un tesoro familiar."
                author="Carlos Méndez"
                role="Cliente desde 2019"
              />
            </AnimatedText>

            <AnimatedText delay={0.5}>
              <Testimonial
                quote="El probador virtual me ayudó a encontrar exactamente lo que buscaba. La joya luce exactamente como se veía en la prueba."
                author="Laura Sánchez"
                role="Cliente desde 2022"
              />
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="glass-card border-secondary/20 p-12 text-center max-w-4xl mx-auto rounded-2xl">
            <AnimatedText>
              <Diamond className="h-12 w-12 text-secondary mx-auto mb-6" />
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                Encuentra la joya perfecta para cada ocasión
              </h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-xl mb-8 text-foreground/80 max-w-2xl mx-auto">
                Desde piezas cotidianas hasta joyas para los momentos más especiales de tu vida.
              </p>
            </AnimatedText>

            <AnimatedText delay={0.3}>
              <Button
                asChild
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6"
              >
                <Link href="/catalogo">
                  Explorar catálogo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedText>
          </div>
        </div>
      </section>
    </div>
  )
}

