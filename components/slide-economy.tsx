'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Users, MapPin, ShoppingBasket, ShieldAlert, Zap, Target, TrendingDown, ExternalLink, Database, CreditCard, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SlideEconomyProps {
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function SlideEconomy({ onBack }: SlideEconomyProps) {
  return (
    <section className="relative min-h-screen w-full bg-background dot-grid-bg">
      {/* Back button */}
      <div className="fixed left-4 top-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="gap-2 border-border bg-card/95 shadow-md backdrop-blur-sm text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al Mapa
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-20 pb-16">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          {...fadeUp}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            01 - Contexto
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nanostores en nuestra economía
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground leading-relaxed">
            {'Comprendiendo el rol, escala y desafíos de los nanostores en América Latina.'}
          </p>
        </motion.div>

        {/* Big Impact Numbers */}
        <div className="mb-12 flex w-full flex-col gap-6 sm:flex-row">
          <motion.div
            className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/20 bg-card p-8 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-5xl font-black tracking-tight text-primary sm:text-6xl">95%</span>
            <span className="mt-2 text-center text-sm font-medium text-muted-foreground">
              {'de las empresas en AL son PYMES'}
            </span>
          </motion.div>
          <motion.div
            className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 bg-card p-8 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-5xl font-black tracking-tight text-accent sm:text-6xl">60%+</span>
            <span className="mt-2 text-center text-sm font-medium text-muted-foreground">
              {'de la fuerza laboral empleada'}
            </span>
          </motion.div>
          <motion.div
            className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-8 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <span className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">Nanostores</span>
            <span className="mt-2 text-center text-sm font-medium text-muted-foreground">
              {'Una forma clave de PYMES'}
            </span>
          </motion.div>
        </div>

        {/* Argentina National Context */}
        <motion.div
          className="mb-12 w-full"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Argentina: National Context
          </h3>
          <div className="rounded-xl border border-border bg-muted/30 p-6 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              In Argentina, the SME landscape presents significant challenges: <span className="font-semibold text-foreground">80% of emprendimientos do not survive their first year</span>, while only <span className="font-semibold text-foreground">30% of businesses reach 8 years of operation</span>. Nearly <span className="font-semibold text-accent">28.8% of entrepreneurs operate in the retail sector</span>, specifically within the nanostore category, making this research particularly relevant for the country&apos;s economic development.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              According to <span className="font-semibold text-foreground">CEPAL projections</span>, private consumption growth for 2025 and 2026 is expected to remain weak, placing significant pressure on the profitability and survival of neighborhood stores.
            </p>
          </div>
        </motion.div>

        {/* Defining Characteristics */}
        <motion.div
          className="mb-12 w-full"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Características Definitorias
          </h3>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">1-10 Trabajadores</p>
                <p className="text-xs text-muted-foreground">{'Fuerza laboral a microescala'}</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">Áreas Residenciales / Informales</p>
                <p className="text-xs text-muted-foreground">{'Comercio barrial'}</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <ShoppingBasket className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">Alimentos y Perecederos</p>
                <p className="text-xs text-muted-foreground">{'Cantidades pequeñas, ventas diarias'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Challenges */}
        <motion.div
          className="mb-12 w-full"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Desafíos Clave
          </h3>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 items-center gap-4 rounded-xl border-2 border-destructive/20 bg-destructive/5 p-6">
              <ShieldAlert className="h-7 w-7 shrink-0 text-destructive" />
              <div>
                <p className="font-bold text-foreground">Presión de las grandes cadenas</p>
                <p className="text-xs text-muted-foreground">
                  {'Las cadenas grandes erosionan la participación de mercado'}
                </p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4 rounded-xl border-2 border-destructive/20 bg-destructive/5 p-6">
              <Zap className="h-7 w-7 shrink-0 text-destructive" />
              <div>
                <p className="font-bold text-foreground">Disrupciones Tecnológicas</p>
                <p className="text-xs text-muted-foreground">
                  {'El comercio digital está transformando el comportamiento del consumidor'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission / Objective */}
        <motion.div
          className="w-full rounded-xl border-2 border-primary/30 bg-primary/5 p-8"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Objetivo de Investigación</h3>
          </div>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed text-center mb-6">
            {'Identificar los factores clave que determinan la supervivencia y el crecimiento económico de los nanostores en América Latina a través de dos líneas de investigación principales:'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">Acceso al Crédito</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Analizar cómo el acceso al crédito formal e informal afecta las tasas de crecimiento y supervivencia de los nanostores
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-accent/20 bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <Cpu className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">Adopción de Tecnología</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Examinar cómo la adopción de tecnología digital impacta el crecimiento y la sostenibilidad a largo plazo de los nanostores
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Cleaning Criteria */}
        <motion.div
          className="w-full rounded-xl border border-border bg-muted/30 p-5"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Database className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Criterios de Limpieza de Datos</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Se eliminaron todas las respuestas incompletas utilizando el filtro de columna <span className="font-semibold text-foreground">"Finished" = true</span> para asegurar la calidad y consistencia de los datos.
          </p>
        </motion.div>

        {/* Source */}
        <motion.div
          className="w-full rounded-xl border border-border bg-muted/50 p-4"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Fuente
                </span>
                <p className="text-sm font-medium text-foreground">
                  IMPACTO ECONÓMICO y SOCIAL DE LAS MiPyMES EN ARGENTINA (Senate Report)
                </p>
              </div>
            </div>
            <a
              href="https://www.senado.gob.ar/upload/archivo/48498"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Ver Informe
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <SlideFooter page={2} />
    </section>
  )
}

function SlideFooter({ page }: { page: number }) {
  return (
    <div className="flex items-center justify-between border-t border-border bg-foreground px-6 py-2.5 text-xs text-primary-foreground">
      <a href="https://liftlab.mit.edu" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
        liftlab.mit.edu
      </a>
      <span className="opacity-70">Card 0{page - 1}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold tracking-tight">MIT</span>
        <div className="flex flex-col leading-none">
          <span className="text-[10px] font-semibold opacity-80">Low Income Firms</span>
          <span className="text-[10px] font-semibold opacity-80">Transformation Lab</span>
        </div>
      </div>
    </div>
  )
}
