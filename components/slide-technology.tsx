'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type {
  WantsGrowthData,
} from '@/lib/csv-parser'

interface SlideTechnologyProps {
  wantsGrowthData: WantsGrowthData[]
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const BLUE_COLORS = ['#1a3a5c', '#4472C4']

export function SlideTechnology({
  wantsGrowthData,
  onBack,
}: SlideTechnologyProps) {
  const safeWantsGrowthData = wantsGrowthData || []

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
          Volver al Mapa
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

        <div className="space-y-6">
          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              ¿Quiere que su negocio crezca?
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={safeWantsGrowthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                  label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                  labelLine={true}
                >
                  {safeWantsGrowthData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={BLUE_COLORS[index % BLUE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: '1px solid #e5e7eb',
                  }}
                  formatter={(value: number, name: string, props: any) => [
                    `${value} (${(props.payload.percent * 100).toFixed(1)}%)`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Razonesparanocrecer?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Razones para no crecer"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Niveldetecnologa?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Nivel de Tecnología"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Tecnologasmasutilizadas?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Tecnologías más utilizadas"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Sueldopretendidovs_Niveldetecnologa?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Sueldo Pretendido vs Nivel de Tecnología"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Ventasvs_LMyNiveldetecnologa?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Ventas vs Mes Pasado"
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
