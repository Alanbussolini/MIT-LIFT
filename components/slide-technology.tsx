'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp } from 'lucide-react'
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
  ScatterChart,
  Scatter,
  Line,
  ComposedChart,
} from 'recharts'
import type {
  WantsGrowthData,
  NoGrowthReasonData,
  DigitalLevelData,
  DigitalToolsData,
  LinearRegressionResult,
} from '@/lib/csv-parser'

interface SlideTechnologyProps {
  wantsGrowthData: WantsGrowthData[]
  noGrowthReasons: NoGrowthReasonData[]
  digitalLevelData: DigitalLevelData[]
  digitalToolsData: DigitalToolsData[]
  yesPct: number
  techBusinessAgeRegression: LinearRegressionResult
  techSalaryRegression: LinearRegressionResult
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const COLORS = ['#1a3a5c', '#ED7D31', '#4472C4', '#A5A5A5', '#FFC000', '#5B9BD5', '#70AD47', '#9E480E']

function addJitter(value: number, intensity: number = 0.1): number {
  return value + (Math.random() - 0.5) * intensity * 2
}

export function SlideTechnology({
  wantsGrowthData,
  noGrowthReasons,
  digitalLevelData,
  digitalToolsData,
  yesPct,
  techBusinessAgeRegression,
  techSalaryRegression,
  onBack,
}: SlideTechnologyProps) {
  const safeWantsGrowthData = wantsGrowthData || []
  const safeNoGrowthReasons = noGrowthReasons || []
  const safeDigitalLevelData = digitalLevelData || []
  const safeDigitalToolsData = digitalToolsData || []
  
  const topDigitalLevel = safeDigitalLevelData.length > 0 ? safeDigitalLevelData[0] : null
  const topTool = safeDigitalToolsData.length > 0 ? safeDigitalToolsData[0] : null

  const noGrowthReasonsExtended = safeNoGrowthReasons.slice(0, 5).map(r => ({
    ...r,
    reason: r.reason || '',
  }))

  const digitalToolsExtended = safeDigitalToolsData.slice(0, 6).map(t => ({
    ...t,
    tool: t.tool || '',
  }))

  const businessAgeChartData = techBusinessAgeRegression.scatterData.map((point, idx) => ({
    x: addJitter(point.x, 0.15),
    y: point.y,
    originalX: point.x,
    id: idx,
  }))

  const businessAgeLineData = techBusinessAgeRegression.regressionLine.map(point => ({
    x: point.x,
    y: point.y,
  }))

  const salaryChartData = techSalaryRegression.scatterData.map((point, idx) => ({
    x: addJitter(point.x, 0.15),
    y: point.y,
    originalX: point.x,
    id: idx,
  }))

  const salaryLineData = techSalaryRegression.regressionLine.map(point => ({
    x: point.x,
    y: point.y,
  }))

  const salaryYValues = techSalaryRegression.scatterData.map(p => p.y)

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
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={safeWantsGrowthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {safeWantsGrowthData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={noGrowthReasonsExtended}
                  layout="vertical"
                  margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <YAxis
                    dataKey="reason"
                    type="category"
                    tick={{ fontSize: 9, fill: '#374151' }}
                    width={220}
                    tickFormatter={(value) => value.length > 35 ? value.substring(0, 35) + '...' : value}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} (${props.payload.percentage || 0}%)`,
                      'Cantidad'
                    ]}
                  />
                  <Bar dataKey="count" fill="#ED7D31" radius={[0, 4, 4, 0]} />
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
            {safeDigitalLevelData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={safeDigitalLevelData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="level"
                    tick={{ fontSize: 10, fill: '#374151' }}
                    angle={-30}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} (${props.payload.percentage || 0}%)`,
                      'Cantidad'
                    ]}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {safeDigitalLevelData.map((_, index) => (
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
            {digitalToolsExtended.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={digitalToolsExtended}
                  layout="vertical"
                  margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <YAxis
                    dataKey="tool"
                    type="category"
                    tick={{ fontSize: 9, fill: '#374151' }}
                    width={180}
                    tickFormatter={(value) => value.length > 30 ? value.substring(0, 30) + '...' : value}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} (${props.payload.percentage || 0}%)`,
                      'Cantidad'
                    ]}
                  />
                  <Bar dataKey="count" fill="#4472C4" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[280px] text-muted-foreground">
                No hay datos disponibles
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="mb-6"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Análisis de Correlación</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Explorando si la adopción de tecnología se correlaciona con la supervivencia del negocio y la valoración del dueño
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            <strong>Nivel de Tecnología codificado:</strong> Ninguno=0, Bajo/Básico=1, Medio=2, Alto=3
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-card-foreground">
                Nivel de Tecnología vs Edad del Negocio
              </h4>
              <span className={`text-xs px-2 py-1 rounded ${techBusinessAgeRegression.hasCorrelation ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                r = {techBusinessAgeRegression.correlation.toFixed(3)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              ¿Mayor tecnología = Mayor supervivencia? (n={techBusinessAgeRegression.n})
            </p>
            {techBusinessAgeRegression.n > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={businessAgeChartData} margin={{ top: 10, right: 20, left: 10, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    domain={[-0.5, 3.5]}
                    ticks={[0, 1, 2, 3]}
                    tickFormatter={(v) => {
                      const labels = ['Ninguno', 'Bajo', 'Medio', 'Alto']
                      return labels[v] || v
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    label={{ value: 'Edad (años)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#9ca3af' } }}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string) => [name === 'y' ? `${value} años` : value.toFixed(1), name === 'y' ? 'Edad' : 'Tech Level']}
                  />
                  <Scatter data={businessAgeChartData} fill="#1a3a5c" fillOpacity={0.5} />
                  {businessAgeLineData.length === 2 && (
                    <Line
                      type="linear"
                      data={businessAgeLineData}
                      dataKey="y"
                      stroke="#ED7D31"
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
                No hay datos con niveles de tecnología válidos para el análisis
              </div>
            )}
            <div className="mt-3 p-2 rounded bg-muted/50">
              <p className="text-[10px] text-muted-foreground">
                {techBusinessAgeRegression.hasCorrelation 
                  ? `✓ Correlación ${techBusinessAgeRegression.correlation > 0 ? 'positiva' : 'negativa'} (p=${techBusinessAgeRegression.pValue.toFixed(4)})`
                  : `✗ Sin correlación significativa (p=${techBusinessAgeRegression.pValue.toFixed(4)})`
                }
              </p>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-card-foreground">
                Nivel de Tecnología vs Sueldo Pretendido
              </h4>
              <span className={`text-xs px-2 py-1 rounded ${techSalaryRegression.hasCorrelation ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                r = {techSalaryRegression.correlation.toFixed(3)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              ¿Mayor tecnología = Mayor valoración del dueño? (n={techSalaryRegression.n})
            </p>
            {techSalaryRegression.n > 0 && salaryYValues.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={salaryChartData} margin={{ top: 10, right: 20, left: 60, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    domain={[-0.5, 3.5]}
                    ticks={[0, 1, 2, 3]}
                    tickFormatter={(v) => {
                      const labels = ['Ninguno', 'Bajo', 'Medio', 'Alto']
                      return labels[v] || v
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
                    domain={[0, Math.max(...salaryYValues) * 1.1]}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid #e5e7eb' }}
                    formatter={(value: number, name: string) => [name === 'y' ? `$${value.toLocaleString()}` : value.toFixed(1), name === 'y' ? 'Sueldo' : 'Tech Level']}
                  />
                  <Scatter data={salaryChartData} fill="#4472C4" fillOpacity={0.5} />
                  {salaryLineData.length === 2 && (
                    <Line
                      type="linear"
                      data={salaryLineData}
                      dataKey="y"
                      stroke="#ED7D31"
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
                No hay datos con niveles de tecnología válidos para el análisis
              </div>
            )}
            <div className="mt-3 p-2 rounded bg-muted/50">
              <p className="text-[10px] text-muted-foreground">
                {techSalaryRegression.hasCorrelation 
                  ? `✓ Correlación ${techSalaryRegression.correlation > 0 ? 'positiva' : 'negativa'} (p=${techSalaryRegression.pValue.toFixed(4)})`
                  : `✗ Sin correlación significativa (p=${techSalaryRegression.pValue.toFixed(4)})`
                }
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <SlideFooter page={7} />
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
