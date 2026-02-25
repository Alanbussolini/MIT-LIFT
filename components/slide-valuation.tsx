'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight as ArrowRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import type { WillingnessData, SalaryRangeData } from '@/lib/csv-parser'

interface SlideValuationProps {
  willingPct: number
  notWillingPct: number
  avgSalary: number
  willingnessChartData: WillingnessData[]
  salaryDistribution: SalaryRangeData[]
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const DONUT_COLORS = ['#1a3a5c', '#4ECDC4']

function formatCurrency(value: number): string {
  return value.toLocaleString('es-AR')
}

export function SlideValuation({
  willingPct,
  notWillingPct,
  avgSalary,
  willingnessChartData,
  salaryDistribution,
  onBack,
}: SlideValuationProps) {
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

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pt-20 pb-8">
        <motion.div className="mb-8 text-center" {...fadeUp} transition={{ duration: 0.5 }}>
          <span className="mb-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            04 - Valuación
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'Valuación del '}
            <span className="text-primary">Nanostore</span>
          </h2>
        </motion.div>

        <motion.div
          className="mb-10 flex flex-col gap-4 sm:flex-row"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/20 bg-card p-6 shadow-sm">
            <span className="text-4xl font-black tracking-tight text-primary sm:text-5xl">
              {willingPct}%
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Dispuesto a vender
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 bg-card p-6 shadow-sm">
            <span className="text-4xl font-black tracking-tight text-accent sm:text-5xl">
              {notWillingPct}%
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              No dispuesto a vender
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-6 shadow-sm">
            <span className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              ${avgSalary.toLocaleString('es-AR')}
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Salario mensual promedio (ARS)
            </span>
          </div>
        </motion.div>

        <motion.div
          className="mb-10 rounded-xl border border-border bg-card p-6 shadow-sm"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-5 text-sm font-bold text-card-foreground">
            Estandarización de Datos via Gemini AI
          </h3>

          <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <div className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Antes (Datos crudos)
              </span>
              <div className="overflow-hidden rounded-lg border border-border shadow-sm">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Antes-yXfZI8vbn8ly4YlCjIfI3Fmx6S9Qjy.png"
                  alt="Raw survey data"
                  className="h-auto w-full max-w-xs object-contain"
                />
              </div>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <ArrowRightIcon className="h-7 w-7 text-primary" />
            </div>

            <div className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Después (Datos formateados)
              </span>
              <div className="overflow-hidden rounded-lg border border-border shadow-sm">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Despues-DzXMnUZLzkvLF3eKzezSv2b4PJUhJR.png"
                  alt="Cleaned data"
                  className="h-auto w-full max-w-xs object-contain"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-secondary/50 p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dado que los datos crudos provenían de campos de texto libre, eran altamente inconsistentes, contenían palabras, formatos decimales variados y ceros. Usando Gemini AI, realizamos un proceso sistemático de limpieza:
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              <li>Categorizamos las respuestas en indicadores binarios (Dispuesto a vender: Sí/No).</li>
              <li>Extrajimos y normalizamos las expectativas de salario mensual en valores numéricos.</li>
            </ol>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Esto nos permite cuantificar la valuación económica de cada Nanostore. Finalmente, auditamos la información para asegurar que cada punto de datos permaneciera correctamente mapeado a su tienda específica.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-card-foreground">
                Disposición a vender por salario fijo
              </h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded" style={{ backgroundColor: '#1a3a5c' }} />
                  <span className="text-muted-foreground">Dispuesto</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded" style={{ backgroundColor: '#4ECDC4' }} />
                  <span className="text-muted-foreground">No dispuesto</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={willingnessChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                  label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                  labelLine={true}
                >
                  {willingnessChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
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
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Distribución de expectativas de salario mensual
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={salaryDistribution}
                margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  label={{
                    value: 'Rango de salario (ARS)',
                    position: 'insideBottom',
                    offset: -10,
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{
                    value: 'Dueños',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: '1px solid #e5e7eb',
                  }}
                />
                <ReferenceLine
                  y={salaryDistribution.length > 0 ? salaryDistribution.reduce((max, d) => d.count > max.count ? d : max, salaryDistribution[0]).count * 0.7 : 0}
                  stroke="#ED7D31"
                  strokeDasharray="5 5"
                  label={{
                    value: 'Prom',
                    position: 'right',
                    style: { fontSize: 10, fill: '#ED7D31' },
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#1a3a5c"
                  radius={[3, 3, 0, 0]}
                  name="Dueños"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      <SlideFooter page={5} />
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
