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

const SALES_COLORS = {
  menores: '#1a3a5c',
  iguales: '#4472C4',
  mayores: '#ED7D31',
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

  const noGrowthReasonsExtended = safeNoGrowthReasons.slice(0, 4).map((r, idx) => ({
    ...r,
    reason: r.reason || '',
    fill: BLUE_COLORS[idx % BLUE_COLORS.length],
  }))

  const digitalToolsExtended = safeDigitalToolsData.slice(0, 7).map((t, idx) => ({
    ...t,
    tool: t.tool || '',
    fill: BLUE_COLORS[idx % BLUE_COLORS.length],
  }))

  const digitalLevelChartData = safeDigitalLevelData.map(d => ({
    level: d.level,
    count: d.count,
    percentage: d.percentage,
  }))

  const salesChartData = safeSalesByTechLevel.map(d => ({
    level: d.level,
    'Menores (%)': d.menores,
    'Iguales (%)': d.iguales,
    'Mayores (%)': d.mayores,
  }))

  const salaryBoxData = safeSalaryByTechLevel
    .filter(d => d.salaries.length > 0)
    .map(d => ({
      level: d.level,
      min: d.min,
      q1: d.q1,
      median: d.median,
      q3: d.q3,
      max: d.max,
      mean: d.mean,
      n: d.salaries.length,
    }))

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
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={safeWantsGrowthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {safeWantsGrowthData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={BLUE_COLORS[index % BLUE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  formatter={(value: number, name: string, props: any) => [
                    `${value} (${props.payload.percentage || 0}%)`,
                    name
                  ]}
                />
                <Legend
                  formatter={(value) => <span style={{ color: '#374151', fontSize: 13 }}>{value}</span>}
                />
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
            {noGrowthReasonsExtended.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={noGrowthReasonsExtended}
                  layout="vertical"
                  margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} domain={[0, 60]} />
                  <YAxis
                    dataKey="reason"
                    type="category"
                    tick={{ fontSize: 9, fill: '#ffffff' }}
                    width={100}
                    tickFormatter={(value) => value.length > 18 ? value.substring(0, 18) + '...' : value}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string, props: any) => [
                      `${props.payload.percentage || 0}%`,
                      'Porcentaje'
                    ]}
                  />
                  <Bar dataKey="percentage" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#374151', fontSize: 10 }} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
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
            {digitalLevelChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={digitalLevelChartData}
                  margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="level"
                    tick={{ fontSize: 10, fill: '#374151' }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string, props: any) => [
                      `${props.payload.count} (${props.payload.percentage || 0}%)`,
                      'Cantidad'
                    ]}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#374151', fontSize: 11 }}>
                    {digitalLevelChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={BLUE_COLORS[index % BLUE_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
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
            {digitalToolsExtended.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={digitalToolsExtended}
                  layout="vertical"
                  margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} domain={[0, 80]} />
                  <YAxis
                    dataKey="tool"
                    type="category"
                    tick={{ fontSize: 9, fill: '#374151' }}
                    width={80}
                    tickFormatter={(value) => value.length > 12 ? value.substring(0, 12) + '...' : value}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string, props: any) => [
                      `${props.payload.percentage || 0}%`,
                      'Porcentaje'
                    ]}
                  />
                  <Bar dataKey="percentage" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#374151', fontSize: 10 }} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                No hay datos disponibles
              </div>
            )}
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
            {salaryBoxData.length > 0 ? (
              <BoxPlotChart data={salaryBoxData} />
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No hay datos disponibles
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {safeSalaryByTechLevel.filter(d => d.salaries.length > 0).map(d => (
                <div key={d.level} className="p-2 rounded bg-muted/50">
                  <span className="font-semibold">{d.level}:</span> n={d.salaries.length}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h4 className="text-sm font-bold text-card-foreground mb-4">
              Desempeño de Ventas vs Mes Pasado
            </h4>
            {safeSalesByTechLevel.length > 0 && safeSalesByTechLevel.some(d => d.total > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={salesChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="level"
                    tick={{ fontSize: 11, fill: '#374151' }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string) => [`${value}%`, name.replace('(%)', '')]}
                  />
                  <Legend />
                  <Bar dataKey="Menores (%)" fill={SALES_COLORS.menores} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Iguales (%)" fill={SALES_COLORS.iguales} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Mayores (%)" fill={SALES_COLORS.mayores} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No hay datos disponibles
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {safeSalesByTechLevel.filter(d => d.total > 0).map(d => (
                <div key={d.level} className="p-2 rounded bg-muted/50">
                  <span className="font-semibold">{d.level}:</span> n={d.total}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <SlideFooter page={6} />
    </section>
  )
}

function BoxPlotChart({ data }: { data: Array<{ level: string; min: number; q1: number; median: number; q3: number; max: number; mean: number; n: number }> }) {
  const maxValue = Math.max(...data.map(d => d.max)) * 1.1
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="level"
          tick={{ fontSize: 11, fill: '#374151' }}
        />
        <YAxis
          tick={{ fontSize: 10, fill: '#6b7280' }}
          domain={[0, maxValue]}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
          formatter={(value: number, name: string) => {
            if (name === 'min' || name === 'max') return [`$${value.toLocaleString()}`, name === 'min' ? 'Mín' : 'Máx']
            if (name === 'median') return [`$${value.toLocaleString()}`, 'Mediana']
            if (name === 'mean') return [`$${value.toLocaleString()}`, 'Media']
            if (name === 'q1') return [`$${value.toLocaleString()}`, 'Q1']
            if (name === 'q3') return [`$${value.toLocaleString()}`, 'Q3']
            return [value, name]
          }}
          labelFormatter={(label) => `Nivel: ${label}`}
        />
        <Bar dataKey="max" fill="#1a3a5c" name="Máx" />
        <Bar dataKey="q3" fill="#4472C4" name="Q3" />
        <Bar dataKey="median" fill="#ED7D31" name="Mediana" />
        <Bar dataKey="q1" fill="#4472C4" name="Q1" />
        <Bar dataKey="min" fill="#1a3a5c" name="Mín" />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
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
