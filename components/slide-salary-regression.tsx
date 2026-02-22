'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Info, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Bar,
  BarChart,
  Cell,
} from 'recharts'
import type { LinearRegressionResult } from '@/lib/csv-parser'

interface SlideSalaryRegressionProps {
  salaryRegression: LinearRegressionResult
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

function addJitter(value: number, intensity: number = 0.1): number {
  return value + (Math.random() - 0.5) * intensity * 2
}

export function SlideSalaryRegression({
  salaryRegression,
  onBack,
}: SlideSalaryRegressionProps) {
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
          <span className="mb-3 inline-block rounded-md bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            08 - Salary Analysis
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'Sueldo Pretendido vs '}
            <span className="text-accent">Nivel de Tecnología</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            Analizando si el nivel de tecnología del nanostore influye en el sueldo pretendido del propietario
          </p>
        </motion.div>

        <motion.div
          className="mb-6"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MethodologyExplanation />
        </motion.div>

        <motion.div
          className="mb-10 flex flex-col gap-4 sm:flex-row justify-center"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <RegressionSummaryCard
            title="Tecnología vs Sueldo"
            regression={salaryRegression}
          />
        </motion.div>

        <RegressionSection
          title="Regresión: Nivel de Tecnología vs Sueldo Pretendido"
          subtitle="¿Existe relación entre el nivel de adopción tecnológica y las expectativas salariales?"
          regression={salaryRegression}
          delay={0.2}
        />
      </div>

      <SlideFooter page={8} />
    </section>
  )
}

function MethodologyExplanation() {
  return (
    <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-card-foreground mb-2">Hipótesis de Investigación</h4>
            <p className="text-xs text-muted-foreground">
              Se busca probar si <strong>H₁: El sueldo pretendido depende del nivel de tecnología del negocio</strong>.
              La hipótesis nula es <strong>H₀: No existe relación entre el nivel de tecnología y el sueldo pretendido</strong> (β₁ = 0).
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-card-foreground mb-2">Variables Codificadas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-1">X: Nivel de Tecnología (0-3)</p>
                <p>Ninguno=0, Básico=1, Medio=2, Alto=3. Extraído de la columna "Nivel de tecnología" del CSV.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Y: Sueldo Pretendido (MXN)</p>
                <p>Valor numérico extraído de "¿Cuál es el sueldo mensual mínimo que necesitarías para cerrar tu negocio?". Se excluyen valores nulos, cero o inválidos.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-card-foreground mb-2">Procedimiento Estadístico</h4>
            <p className="text-xs text-muted-foreground">
              Se utilizó <strong>regresión lineal simple</strong> (OLS - Ordinary Least Squares) con la fórmula: <strong>Y = β₀ + β₁X + ε</strong>.
              El p-valor se calculó usando la distribución t de Student con n-2 grados de libertad.
              La correlación se considera estadísticamente significativa cuando p &lt; 0.05.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function RegressionSummaryCard({
  title,
  regression,
}: {
  title: string
  regression: LinearRegressionResult
}) {
  const isPositive = regression.correlation > 0
  
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 text-accent bg-card p-6 shadow-sm max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="h-5 w-5" />
        {isPositive ? <TrendingUp className="h-5 w-5" /> : regression.correlation < 0 ? <TrendingDown className="h-5 w-5" /> : <Minus className="h-5 w-5" />}
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>
      <span className="text-3xl font-black tracking-tight sm:text-4xl">
        r = {regression.correlation.toFixed(3)}
      </span>
      <span className={`mt-2 text-xs font-semibold px-2 py-1 rounded ${regression.hasCorrelation ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {regression.hasCorrelation ? 'Correlación Significativa' : 'Sin Correlación Significativa'}
      </span>
      <span className="mt-1 text-[10px] text-muted-foreground">n = {regression.n} encuestas válidas</span>
    </div>
  )
}

function RegressionSection({
  title,
  subtitle,
  regression,
  delay,
}: {
  title: string
  subtitle: string
  regression: LinearRegressionResult
  delay: number
}) {
  const chartDataWithJitter = regression.scatterData.map((point, idx) => ({
    x: addJitter(point.x, 0.12),
    y: point.y,
    originalX: point.x,
    originalY: point.y,
    id: idx,
  }))

  const lineData = regression.regressionLine.map((point) => ({
    x: point.x,
    y: point.y,
  }))

  const yValues = regression.scatterData.map(p => p.y)
  const yMin = Math.min(...yValues)
  const yMax = Math.max(...yValues)
  const yPadding = (yMax - yMin) * 0.1

  const frequencyData = computeFrequencyData(regression.scatterData)

  return (
    <motion.div
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
      {...fadeUp}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-lg font-bold text-card-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <p className="text-xs text-muted-foreground mb-2">
            Gráfico de dispersión con jittering (variación aleatoria) para visualizar densidad de {regression.n} puntos
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={chartDataWithJitter} margin={{ top: 20, right: 30, left: 60, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                dataKey="x"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                label={{ value: regression.xLabel, position: 'insideBottom', offset: -15, style: { fontSize: 10, fill: '#9ca3af' } }}
                domain={[-0.5, 3.5]}
                ticks={[0, 1, 2, 3]}
              />
              <YAxis
                type="number"
                dataKey="y"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                label={{ value: regression.yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#9ca3af' } }}
                domain={[Math.max(0, yMin - yPadding), yMax + yPadding]}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                formatter={(value: number, name: string, props: any) => {
                  if (name === 'y') {
                    return [`$${value.toLocaleString('es-MX')}`, 'Sueldo Pretendido']
                  }
                  return [value.toFixed(2), name]
                }}
                labelFormatter={(label: number, props: any) => {
                  const techLevel = props[0]?.payload?.originalX
                  const techLabel = techLevel === 0 ? 'Ninguno' : techLevel === 1 ? 'Básico' : techLevel === 2 ? 'Medio' : 'Alto'
                  return `Nivel de Tecnología: ${techLabel}`
                }}
              />
              <Scatter name="Datos" data={chartDataWithJitter} fill="#ED7D31" fillOpacity={0.4}>
                {chartDataWithJitter.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#ED7D31" fillOpacity={0.3} />
                ))}
              </Scatter>
              {lineData.length === 2 && (
                <Line
                  type="linear"
                  data={lineData}
                  dataKey="y"
                  stroke="#1a3a5c"
                  strokeWidth={3}
                  dot={false}
                  name="Línea de Regresión"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-4">
          <StatParameters regression={regression} />
          
          <div className="rounded-lg border border-border bg-card p-4">
            <h4 className="text-xs font-bold text-card-foreground mb-3">Estadísticas Descriptivas</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sueldo Mínimo:</span>
                <span className="font-semibold">${Math.min(...yValues).toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sueldo Máximo:</span>
                <span className="font-semibold">${Math.max(...yValues).toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sueldo Promedio:</span>
                <span className="font-semibold">${Math.round(yValues.reduce((a, b) => a + b, 0) / yValues.length).toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mediana:</span>
                <span className="font-semibold">${getMedian(yValues).toLocaleString('es-MX')}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h4 className="text-xs font-bold text-card-foreground mb-3">Distribución por Nivel de Tech</h4>
            <div className="max-h-32 overflow-y-auto">
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={frequencyData.slice(0, 6)} layout="vertical" margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
                  <XAxis type="number" tick={{ fontSize: 9, fill: '#6b7280' }} />
                  <YAxis dataKey="label" type="category" tick={{ fontSize: 9, fill: '#6b7280' }} width={30} />
                  <Tooltip
                    contentStyle={{ fontSize: 10, borderRadius: 6 }}
                    formatter={(value: number) => [`${value} encuestas`, 'Cantidad']}
                  />
                  <Bar dataKey="count" fill="#ED7D31" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
        <h4 className="text-sm font-bold text-card-foreground mb-2">Interpretación Estadística</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{regression.interpretation}</p>
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Conclusión:</strong> {regression.hasCorrelation 
              ? `Con p = ${regression.pValue.toFixed(4)} < 0.05, rechazamos la hipótesis nula (H₀: β₁ = 0). Existe evidencia estadística de que el nivel de tecnología influye en el sueldo pretendido.`
              : `Con p = ${regression.pValue.toFixed(4)} ≥ 0.05, no podemos rechazar la hipótesis nula. No hay evidencia suficiente para afirmar que el sueldo pretendido depende del nivel de tecnología.`
            }
            {regression.correlation > 0 && regression.hasCorrelation && 
              ` Los nanostores con mayor nivel de tecnología tienden a tener propietarios con expectativas salariales más altas.`
            }
            {regression.correlation < 0 && regression.hasCorrelation && 
              ` Los nanostores con mayor nivel de tecnología tienden a tener propietarios con expectativas salariales más bajas.`
            }
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function getMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function computeFrequencyData(scatterData: { x: number; y: number }[]) {
  const counts: Record<string, { x: number; y: number; count: number }> = {}
  
  scatterData.forEach(point => {
    const key = `${point.x}`
    if (!counts[key]) {
      counts[key] = { x: point.x, y: 0, count: 0 }
    }
    counts[key].count++
  })
  
  const levelLabels = ['Ninguno', 'Básico', 'Medio', 'Alto']
  
  return Object.values(counts)
    .map(d => ({
      ...d,
      label: levelLabels[d.x] || `Nivel ${d.x}`,
    }))
    .sort((a, b) => a.x - b.x)
}

function StatParameters({ regression }: { regression: LinearRegressionResult }) {
  const params = [
    { label: 'Pendiente (β₁)', value: `$${regression.slope.toFixed(0)}/nivel`, desc: 'Aumento esperado en sueldo por cada nivel de tecnología' },
    { label: 'Intercepto (β₀)', value: `$${regression.intercept.toFixed(0)}`, desc: 'Sueldo base esperado (tecnología = 0)' },
    { label: 'Correlación (r)', value: regression.correlation.toFixed(4), desc: '-1 a 1: Fuerza y dirección de la relación' },
    { label: 'R²', value: `${(regression.rSquared * 100).toFixed(2)}%`, desc: '% de varianza del sueldo explicada por tecnología' },
    { label: 'P-valor', value: regression.pValue < 0.0001 ? '< 0.0001' : regression.pValue.toFixed(4), desc: 'Probabilidad de H₀ siendo verdadera' },
    { label: 'Estadístico t', value: regression.tStatistic.toFixed(4), desc: 'β₁ / Error estándar de β₁' },
    { label: 'Error Estándar', value: `$${regression.standardError.toFixed(0)}`, desc: 'Dispersión de residuos' },
    { label: 'n (Muestra)', value: regression.n.toString(), desc: 'Total de observaciones válidas' },
  ]

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h4 className="text-xs font-bold text-card-foreground mb-3">Parámetros Estadísticos</h4>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        {params.map((param) => (
          <div key={param.label} className="flex flex-col">
            <span className="text-[9px] text-muted-foreground">{param.label}</span>
            <span className="text-xs font-semibold text-foreground">{param.value}</span>
          </div>
        ))}
      </div>
    </div>
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
