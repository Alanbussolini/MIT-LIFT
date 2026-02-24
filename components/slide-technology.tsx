'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type {
  WantsGrowthData,
  NoGrowthReasonData,
  DigitalLevelData,
  DigitalToolsData,
  SalaryByTechLevel,
  SalesByTechLevel,
} from '@/lib/csv-parser'

interface SlideTechnologyProps {
  wantsGrowthData: WantsGrowthData[]
  noGrowthReasons: NoGrowthReasonData[]
  digitalLevelData: DigitalLevelData[]
  digitalToolsData: DigitalToolsData[]
  yesPct: number
  salaryByTechLevel: SalaryByTechLevel[]
  salesByTechLevel: SalesByTechLevel[]
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const BLUE_COLORS = ['#1a3a5c', '#2F5496', '#4472C4', '#5B8DD9', '#7FAEDE', '#A3C4E6', '#C7DCF0']

const TABLEAU_IMAGES = {
  razonesNoCrecer: 'https://public.tableau.com/static/images/Li/Libro3_17719395393810/Raznparanocrecer/1.png',
  nivelTecnologia: 'https://public.tableau.com/static/images/Li/Libro3_17719395393810/Niveldetecnologa/1.png',
  tecnologiasUtilizadas: 'https://public.tableau.com/static/images/Li/Libro3_17719395393810/Tecnologasmasutilizadas/1.png',
  sueldoVsTecnologia: 'https://public.tableau.com/static/images/Li/Libro3_17719395393810/Sueldopretendidovs_Niveldetecnologa/1.png',
  ventasVsLM: 'https://public.tableau.com/static/images/Li/Libro3_17719395393810/Ventasvs_LMyNiveldetecnologa/1.png',
}

export function SlideTechnology({
  wantsGrowthData,
  noGrowthReasons,
  digitalLevelData,
  digitalToolsData,
  yesPct,
  salaryByTechLevel,
  salesByTechLevel,
  onBack,
}: SlideTechnologyProps) {
  const safeWantsGrowthData = wantsGrowthData || []
  const safeNoGrowthReasons = noGrowthReasons || []
  const safeDigitalLevelData = digitalLevelData || []
  const safeDigitalToolsData = digitalToolsData || []
  const safeSalaryByTechLevel = salaryByTechLevel || []
  const safeSalesByTechLevel = salesByTechLevel || []
  
  const topTool = safeDigitalToolsData.length > 0 ? safeDigitalToolsData[0] : null

  return (
    <section className="relative min-h-screen w-full bg-background dot-grid-bg">
      <div className="fixed left-4 top-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="gap-2 border-border bg-card/95 shadow-md backdrop-blur-sm text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Roadmap
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pt-20 pb-8">
        <motion.div className="mb-8 text-center" {...fadeUp} transition={{ duration: 0.5 }}>
          <span className="mb-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            06 - Technology Adoption
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'Nivel de Adopción de '}
            <span className="text-primary">Tecnología</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            Growth willingness, barriers, technology adoption, salary and sales analysis
          </p>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-col gap-4 sm:flex-row"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/20 bg-card p-6 shadow-sm">
            <span className="text-4xl font-black tracking-tight text-primary sm:text-5xl">
              {yesPct}%
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Quiere que su negocio crezca
            </span>
          </div>
          {topTool && (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-6 shadow-sm">
              <span className="text-xl font-black tracking-tight text-foreground sm:text-2xl text-center">
                {topTool.tool}
              </span>
              <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
                {topTool.percentage}% lo utiliza
              </span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              ¿Quiere que su negocio crezca?
            </h3>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                {safeWantsGrowthData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: BLUE_COLORS[idx % BLUE_COLORS.length] }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-semibold text-foreground">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Razones para no querer crecer
            </h3>
            <img 
              src={TABLEAU_IMAGES.razonesNoCrecer}
              alt="Razones para no querer crecer"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Nivel de Tecnología
            </h3>
            <img 
              src={TABLEAU_IMAGES.nivelTecnologia}
              alt="Nivel de Tecnología"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Tecnologías más utilizadas
            </h3>
            <img 
              src={TABLEAU_IMAGES.tecnologiasUtilizadas}
              alt="Tecnologías más utilizadas"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        <motion.div
          className="mb-8"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <h3 className="mb-6 text-lg font-bold text-foreground">Análisis por Nivel de Tecnología</h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h4 className="text-sm font-bold text-card-foreground mb-4">
              Sueldo Pretendido vs Nivel de Tecnología
            </h4>
            <img 
              src={TABLEAU_IMAGES.sueldoVsTecnologia}
              alt="Sueldo Pretendido vs Nivel de Tecnología"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h4 className="text-sm font-bold text-card-foreground mb-4">
              Desempeño de Ventas vs Mes Pasado
            </h4>
            <img 
              src={TABLEAU_IMAGES.ventasVsLM}
              alt="Desempeño de Ventas vs Mes Pasado"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

      <SlideFooter page={6} />
    </section>
  )
}

function SlideFooter({ page }: { page: number }) {
  return (
    <div className="flex items-center justify-between border-t border-border bg-foreground px-6 py-2.5 text-xs text-primary-foreground">
      <a href="https://liftlab.mit.edu" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
        liftlab.mit.edu
      </a>
      <span className="opacity-70">Card {page.toString().padStart(2, '0')}</span>
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
