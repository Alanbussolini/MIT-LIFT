'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import type {
  BusinessImpactData,
  CreditSourceData,
  FormalInformalData,
  BarrierData,
} from '@/lib/csv-parser'

interface SlideCreditProps {
  creditImpactPct: number
  formalPct: number
  informalPct: number
  mainBarrier: string
  businessImpactData: BusinessImpactData[]
  creditSources: CreditSourceData[]
  formalInformalChartData: FormalInformalData[]
  barriers: BarrierData[]
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const IMPACT_COLORS: Record<string, string> = {
  nada: '#d1d5db',
  poco: '#93c5fd',
  algo: '#60a5fa',
  moderado: '#2563eb',
  mucho: '#1e3a5f',
}

const DONUT_COLORS = ['#1a3a5c', '#4ECDC4']

export function SlideCredit({
  creditImpactPct,
  formalPct,
  informalPct,
  mainBarrier,
  businessImpactData,
  creditSources,
  formalInformalChartData,
  barriers,
  onBack,
}: SlideCreditProps) {
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
            05 - Crédito
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'Acceso al '}
            <span className="text-primary">Crédito</span>
          </h2>
        </motion.div>

        <motion.div
          className="mb-10 flex flex-col gap-4 sm:flex-row"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/20 bg-card p-6 shadow-sm">
            <span className="text-4xl font-black tracking-tight text-primary sm:text-5xl">
              {creditImpactPct}%
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Impacto del Crédito
            </span>
            <span className="text-center text-[10px] text-muted-foreground/70">
              Respondieron "Mucho" o "Moderado"
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 bg-card p-6 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-accent sm:text-4xl">
                {formalPct.toFixed(0)}%
              </span>
              <span className="text-lg text-muted-foreground">/</span>
              <span className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                {informalPct.toFixed(0)}%
              </span>
            </div>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Institucional / No Institucional
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-6 shadow-sm">
            <span className="text-balance text-center text-lg font-black leading-snug tracking-tight text-foreground sm:text-xl">
              {mainBarrier.length > 45 ? mainBarrier.slice(0, 45) + '...' : mainBarrier}
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Principal barrera
            </span>
            <span className="text-center text-[10px] text-muted-foreground/70">
              Razón más frecuente
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-1 text-sm font-bold text-card-foreground">
              Comparación de Impacto en el Negocio
            </h3>
            <p className="mb-4 text-[11px] text-muted-foreground">
              Distribución de la escala de impacto across variables clave
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={businessImpactData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="variable"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{
                    value: 'Respuestas',
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
                <Bar dataKey="nada" fill={IMPACT_COLORS.nada} name="Nada" stackId="impact" />
                <Bar dataKey="poco" fill={IMPACT_COLORS.poco} name="Poco" stackId="impact" />
                <Bar dataKey="algo" fill={IMPACT_COLORS.algo} name="Algo" stackId="impact" />
                <Bar dataKey="moderado" fill={IMPACT_COLORS.moderado} name="Moderado" stackId="impact" />
                <Bar dataKey="mucho" fill={IMPACT_COLORS.mucho} name="Mucho" stackId="impact" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-1 text-sm font-bold text-card-foreground">
              Fuentes de Crédito
            </h3>
            <p className="mb-4 text-[11px] text-muted-foreground">
              Número de owners usando cada fuente de crédito
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={creditSources}
                margin={{ top: 5, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="source"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  label={{
                    value: 'Fuente',
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
                <Bar
                  dataKey="count"
                  fill="#1a3a5c"
                  radius={[3, 3, 0, 0]}
                  name="Dueños"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-1 text-sm font-bold text-card-foreground">
              Crédito Institucional vs No Institucional
            </h3>
            <p className="mb-2 text-[11px] text-muted-foreground">
              Distribución de fuentes de crédito por tipo
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={formalInformalChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {formalInformalChartData.map((_, index) => (
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
            <div className="mt-2 p-2 rounded bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground">
                <strong>Institucional:</strong> Bancos, Crédito Privado, Gobierno
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>No Institucional:</strong> Proveedores, Familia
              </p>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="mb-1 text-sm font-bold text-card-foreground">
              Barreras para obtener Crédito Bancario
            </h3>
            <p className="mb-4 text-[11px] text-muted-foreground">
              Razones principales para no tener crédito bancario
            </p>
            <ResponsiveContainer
              width="100%"
              height={Math.max(280, barriers.length * 36)}
            >
              <BarChart
                data={barriers}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{
                    value: 'Respuestas',
                    position: 'insideBottom',
                    offset: -2,
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <YAxis
                  dataKey="reason"
                  type="category"
                  tick={{ fontSize: 9, fill: '#6b7280' }}
                  width={160}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: '1px solid #e5e7eb',
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#1a3a5c"
                  radius={[0, 3, 3, 0]}
                  name="Respuestas"
                />
              </BarChart>
            </ResponsiveContainer>
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
