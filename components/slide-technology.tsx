'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type {
  WantsGrowthData,
  NoGrowthReasonData,
  DigitalLevelData,
  DigitalToolsData,
} from '@/lib/csv-parser'

interface SlideTechnologyProps {
  wantsGrowthData: WantsGrowthData[]
  noGrowthReasons: NoGrowthReasonData[]
  digitalLevelData: DigitalLevelData[]
  digitalToolsData: DigitalToolsData[]
  yesPct: number
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const COLORS = ['#1a3a5c', '#ED7D31', '#4472C4', '#A5A5A5', '#FFC000', '#5B9BD5', '#70AD47', '#9E480E']

export function SlideTechnology({
  wantsGrowthData,
  noGrowthReasons,
  digitalLevelData,
  digitalToolsData,
  yesPct,
  onBack,
}: SlideTechnologyProps) {
  const topDigitalLevel = digitalLevelData.length > 0 ? digitalLevelData[0] : null
  const topTool = digitalToolsData.length > 0 ? digitalToolsData[0] : null
  const topNoGrowthReason = noGrowthReasons.length > 0 ? noGrowthReasons[0] : null

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
            Growth willingness, barriers, and technology adoption in nanostores
          </p>
        </motion.div>

        <motion.div
          className="mb-10 flex flex-col gap-4 sm:flex-row"
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
          {topDigitalLevel && (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 bg-card p-6 shadow-sm">
              <span className="text-4xl font-black tracking-tight text-accent sm:text-5xl">
                {topDigitalLevel.percentage}%
              </span>
              <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
                {topDigitalLevel.level}
              </span>
            </div>
          )}
          {topTool && (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-6 shadow-sm">
              <span className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
                {topTool.percentage}%
              </span>
              <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
                {topTool.tool}
              </span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              ¿Quiere que su negocio crezca?
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={wantsGrowthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  labelLine={false}
                >
                  {wantsGrowthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  formatter={(value: number, name: string) => [value, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Razones para no querer crecer
            </h3>
            {noGrowthReasons.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={noGrowthReasons.slice(0, 6)}
                  layout="vertical"
                  margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <YAxis
                    dataKey="reason"
                    type="category"
                    tick={{ fontSize: 9, fill: '#6b7280' }}
                    width={150}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} (${props.payload.percentage}%)`,
                      'Cantidad'
                    ]}
                  />
                  <Bar dataKey="count" fill="#1a3a5c" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[280px] text-muted-foreground">
                No hay datos disponibles
              </div>
            )}
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Nivel de Tecnología
            </h3>
            {digitalLevelData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={digitalLevelData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="level"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} (${props.payload.percentage}%)`,
                      'Cantidad'
                    ]}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {digitalLevelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[280px] text-muted-foreground">
                No hay datos disponibles
              </div>
            )}
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Tecnologías más utilizadas
            </h3>
            {digitalToolsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={digitalToolsData.slice(0, 8)}
                  layout="vertical"
                  margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <YAxis
                    dataKey="tool"
                    type="category"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} (${props.payload.percentage}%)`,
                      'Cantidad'
                    ]}
                  />
                  <Bar dataKey="count" fill="#ED7D31" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[280px] text-muted-foreground">
                No hay datos disponibles
              </div>
            )}
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
      <span className="opacity-70">liftlab.mit.edu</span>
      <span className="opacity-70">Page {page}</span>
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
