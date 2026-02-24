'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import type {
  WantsGrowthData,
  SalaryByTechLevel,
  SalesByTechLevel,
} from '@/lib/csv-parser'

interface SlideTechnologyProps {
  wantsGrowthData: WantsGrowthData[]
  yesPct: number
  salaryByTechLevel: SalaryByTechLevel[]
  salesByTechLevel: SalesByTechLevel[]
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const BLUE_COLORS = ['#1a3a5c', '#4472C4']

export function SlideTechnology({
  wantsGrowthData,
  yesPct,
  salaryByTechLevel,
  salesByTechLevel,
  onBack,
}: SlideTechnologyProps) {
  const safeWantsGrowthData = wantsGrowthData || []
  const safeSalaryByTechLevel = salaryByTechLevel || []
  const safeSalesByTechLevel = salesByTechLevel || []

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

      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-20 pb-8">
        <motion.div className="mb-8 text-center" {...fadeUp} transition={{ duration: 0.5 }}>
          <span className="mb-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            06 - Technology Adoption
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'Nivel de Adopción de '}
            <span className="text-primary">Tecnología</span>
          </h2>
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
        </motion.div>

        <div className="space-y-6">
          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              ¿Quiere que su negocio crezca?
            </h3>
            <div className="flex items-center justify-center gap-12">
              <div className="w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safeWantsGrowthData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      labelLine={true}
                    >
                      {safeWantsGrowthData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={BLUE_COLORS[index % BLUE_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3">
                {safeWantsGrowthData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: BLUE_COLORS[idx % BLUE_COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className="text-sm font-bold text-primary">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Razones para no querer crecer
            </h3>
            <img 
              src="/images/descargar.png"
              alt="Razones para no querer crecer"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Nivel de Tecnología
            </h3>
            <img 
              src="/images/descargar (1).png"
              alt="Nivel de Tecnología"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Tecnologías más utilizadas
            </h3>
            <img 
              src="/images/descargar (2).png"
              alt="Tecnologías más utilizadas"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Sueldo Pretendido vs Nivel de Tecnología
            </h3>
            <img 
              src="/images/descargar (3).png"
              alt="Sueldo Pretendido vs Nivel de Tecnología"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Desempeño de Ventas vs Mes Pasado
            </h3>
            <img 
              src="/images/descargar (4).png"
              alt="Desempeño de Ventas vs Mes Pasado"
              className="w-full h-auto rounded-lg"
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
