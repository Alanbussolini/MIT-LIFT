'use client'

import { motion } from 'framer-motion'
import { Globe, Store, UserRound, DollarSign, Landmark, Cpu, ArrowRight } from 'lucide-react'

interface RoadmapCardsProps {
  onSelectCard: (card: 'economy' | 'nanostore' | 'owner' | 'valuation' | 'credit' | 'technology') => void
  disabled: boolean
}

const cards = [
  {
    id: 'economy' as const,
    number: '01',
    title: 'Nanostores en nuestra economía',
    subtitle: 'Impacto, características, desafíos y objetivos de investigación',
    icon: Globe,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderHover: 'hover:border-primary/40',
    tags: ['95% empresas AL', '60%+ fuerza laboral', 'Sector PYMES'],
  },
  {
    id: 'nanostore' as const,
    number: '02',
    title: 'Perfil Típico del Nanostore',
    subtitle: 'Tipo de negocio, empleados, propiedad, infraestructura de seguridad',
    icon: Store,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderHover: 'hover:border-primary/40',
    tags: ['79.73% Alquilado', '~5 Empleados', 'Edad del Negocio'],
  },
  {
    id: 'owner' as const,
    number: '03',
    title: 'Perfil Típico del Dueño',
    subtitle: 'Edad, género, nivel educativo y perfil demográfico',
    icon: UserRound,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderHover: 'hover:border-accent/40',
    tags: ['57.11% Secundaria', '41-50 Años', 'Distribución Género'],
  },
  {
    id: 'valuation' as const,
    number: '04',
    title: 'Valuación del Nanostore',
    subtitle: 'Disposición a vender, expectativas de salario y limpieza de datos con IA',
    icon: DollarSign,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderHover: 'hover:border-primary/40',
    tags: ['Estandarización de Datos', 'Análisis de Salida', 'Distribución de Salario'],
  },
  {
    id: 'credit' as const,
    number: '05',
    title: 'Acceso al Crédito',
    subtitle: 'Impacto del crédito, fuentes formales vs informales y barreras para financiamiento bancario',
    icon: Landmark,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderHover: 'hover:border-primary/40',
    tags: ['Análisis de Impacto', 'Formal vs Informal', 'Barreras Bancarias'],
  },
  {
    id: 'technology' as const,
    number: '06',
    title: 'Nivel de Adopción de Tecnología',
    subtitle: 'Disposición a crecer, niveles de adopción tecnológica, análisis de salario y ventas',
    icon: Cpu,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderHover: 'hover:border-accent/40',
    tags: ['Disposición a Crecer', 'Salario vs Tech', 'Ventas vs Tech'],
  },
]

export function RoadmapCards({ onSelectCard, disabled }: RoadmapCardsProps) {
  return (
    <div className="relative mx-auto flex w-full max-w-xl flex-col items-center">
      {/* Section label */}
      <motion.p
        className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Research Roadmap
      </motion.p>

      {/* Dashed vertical line behind cards */}
      <div className="absolute left-1/2 top-20 -z-10 h-[calc(100%-5rem)] w-px -translate-x-1/2 border-l-2 border-dashed border-border" />

      <div className="flex w-full flex-col gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon
          return (
            <motion.button
              key={card.id}
              onClick={() => onSelectCard(card.id)}
              disabled={card.id !== 'economy' && disabled}
              className={`group relative flex w-full cursor-pointer flex-col gap-4 rounded-xl border-2 border-border bg-card p-6 text-left shadow-sm transition-all duration-300 ${card.borderHover} hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-40`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + idx * 0.15 }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bgColor} transition-colors duration-300`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {card.number}
                    </span>
                    <h3 className="text-lg font-bold text-foreground leading-snug">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4 text-foreground" />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Disabled overlay hint */}
              {card.id !== 'economy' && disabled && (
                <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/60 text-xs font-medium text-muted-foreground">
                  {'Subir CSV para desbloquear'}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
