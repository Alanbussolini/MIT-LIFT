'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react'
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

interface SlideRegressionProps {
  creditRegression: LinearRegressionResult
  technologyRegression: LinearRegressionResult
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

function addJitter(value: number, intensity: number = 0.1): number {
  return value + (Math.random() - 0.5) * intensity * 2
}

export function SlideRegression({
  creditRegression,
  technologyRegression,
  onBack,
}: SlideRegressionProps) {
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
            07 - Statistical Analysis
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'Análisis de '}
            <span className="text-primary">Regresión Lineal</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            Explorando correlaciones entre acceso al crédito, tecnología y expectativas de ventas
          </p>
        </motion.div>

        <motion.div
          className="mb-6"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MethodologyExplanation sampleSize={creditRegression.n} />
        </motion.div>

        <motion.div
          className="mb-10 flex flex-col gap-4 sm:flex-row"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <RegressionSummaryCard
            title="Crédito vs Ventas"
            regression={creditRegression}
            color="primary"
          />
          <RegressionSummaryCard
            title="Tecnología vs Ventas"
            regression={technologyRegression}
            color="accent"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          <RegressionSection
            title="Regresión 1: Acceso al Crédito vs Expectativa de Ventas"
            subtitle="Analiza si el nivel de acceso al crédito se correlaciona con expectativas de ventas a 3 meses"
            regression={creditRegression}
            delay={0.2}
            xVariable="credit"
          />
          
          <RegressionSection
            title="Regresión 2: Nivel de Tecnología vs Expectativa de Ventas"
            subtitle="Analiza si el nivel de tecnología se correlaciona con expectativas de ventas a 3 meses"
            regression={technologyRegression}
            delay={0.3}
            xVariable="technology"
          />
        </div>
      </div>

      <SlideFooter page={8} />
    </section>
  )
}

function MethodologyExplanation({ sampleSize }: { sampleSize: number }) {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-card-foreground mb-2">Variables Codificadas</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-1">X₁: Acceso al Crédito (0-5)</p>
                <p>Suma de fuentes de crédito: Banco, Proveedor, Familia, Gobierno, Crédito Privado. Cada "Sí" suma 1 punto.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">X₂: Nivel de Tecnología (0-3)</p>
                <p>Ninguno=0, Básico=1, Medio=2, Alto=3. Extraído de la columna "Nivel de tecnología".</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Y: Expectativa de Ventas (-1 a 1)</p>
                <p>Menores=-1, Iguales=0, Mayores=1. De "¿Esperas que las ventas...sean mayores, menores o iguales?"</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-card-foreground mb-2">Procedimiento Estadístico</h4>
            <p className="text-xs text-muted-foreground">
              Se utilizó <strong>regresión lineal simple</strong> (OLS - Ordinary Least Squares) con la fórmula: <strong>Y = β₀ + β₁X + ε</strong>.
              El p-valor se calculó usando la distribución t de Student con n-2 grados de libertad.
              Una correlación se considera estadísticamente significativa cuando p &lt; 0.05.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-card-foreground mb-2">¿Por qué se ven pocos puntos si hay {sampleSize} encuestas?</h4>
            <p className="text-xs text-muted-foreground">
              Las variables son <strong>discretas</strong> (valores enteros), no continuas. Por ejemplo, expectativa de ventas solo tiene 3 valores posibles (-1, 0, 1) 
              y crédito solo 6 valores (0-5). Esto genera <strong>solo 18 combinaciones posibles</strong> en el gráfico, pero cada punto representa 
              <strong>múltiples encuestas superpuestas</strong>. Para visualizar la densidad, se agregó "jittering" (pequeña variación aleatoria) y un histograma 
              de frecuencias al lado del scatter plot.
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
  color,
}: {
  title: string
  regression: LinearRegressionResult
  color: 'primary' | 'accent'
}) {
  const colorClass = color === 'primary' ? 'border-primary/20 text-primary' : 'border-accent/20 text-accent'
  const isPositive = regression.correlation > 0
  
  return (
    <div className={`flex flex-1 flex-col items-center justify-center rounded-xl border-2 ${colorClass} bg-card p-6 shadow-sm`}>
      <div className="flex items-center gap-2 mb-2">
        {isPositive ? <TrendingUp className="h-5 w-5" /> : regression.correlation < 0 ? <TrendingDown className="h-5 w-5" /> : <Minus className="h-5 w-5" />}
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>
      <span className="text-3xl font-black tracking-tight sm:text-4xl">
        r = {regression.correlation.toFixed(3)}
      </span>
      <span className={`mt-2 text-xs font-semibold px-2 py-1 rounded ${regression.hasCorrelation ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {regression.hasCorrelation ? 'Correlación Significativa' : 'Sin Correlación Significativa'}
      </span>
      <span className="mt-1 text-[10px] text-muted-foreground">n = {regression.n}</span>
    </div>
  )
}

function RegressionSection({
  title,
  subtitle,
  regression,
  delay,
  xVariable,
}: {
  title: string
  subtitle: string
  regression: LinearRegressionResult
  delay: number
  xVariable: 'credit' | 'technology'
}) {
  const chartDataWithJitter = regression.scatterData.map((point, idx) => ({
    x: addJitter(point.x, 0.15),
    y: addJitter(point.y, 0.08),
    originalX: point.x,
    originalY: point.y,
    id: idx,
  }))

  const lineData = regression.regressionLine.map((point) => ({
    x: point.x,
    y: point.y,
  }))

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
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={chartDataWithJitter} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                dataKey="x"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                label={{ value: regression.xLabel, position: 'insideBottom', offset: -15, style: { fontSize: 10, fill: '#9ca3af' } }}
                domain={xVariable === 'credit' ? [-0.5, 5.5] : [-0.5, 3.5]}
                ticks={xVariable === 'credit' ? [0, 1, 2, 3, 4, 5] : [0, 1, 2, 3]}
              />
              <YAxis
                type="number"
                dataKey="y"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                label={{ value: regression.yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#9ca3af' } }}
                domain={[-1.5, 1.5]}
                ticks={[-1, 0, 1]}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                formatter={(value: number, name: string, props: any) => {
                  if (name === 'y') {
                    const original = props.payload.originalY
                    const label = original === 1 ? 'Mayores' : original === 0 ? 'Iguales' : 'Menores'
                    return [label, 'Expectativa Original']
                  }
                  return [value.toFixed(2), name]
                }}
                labelFormatter={(label: number, props: any) => `X original: ${props[0]?.payload?.originalX?.toFixed(0) || ''}`}
              />
              <Scatter name="Datos" data={chartDataWithJitter} fill="#1a3a5c" fillOpacity={0.4}>
                {chartDataWithJitter.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#1a3a5c" fillOpacity={0.3} />
                ))}
              </Scatter>
              {lineData.length === 2 && (
                <Line
                  type="linear"
                  data={lineData}
                  dataKey="y"
                  stroke="#ED7D31"
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
            <h4 className="text-xs font-bold text-card-foreground mb-3">Distribución de Frecuencias</h4>
            <p className="text-[10px] text-muted-foreground mb-2">
              Muestra cuántas encuestas hay en cada combinación (sin jittering)
            </p>
            <div className="max-h-40 overflow-y-auto">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={frequencyData.slice(0, 10)} layout="vertical" margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
                  <XAxis type="number" tick={{ fontSize: 9, fill: '#6b7280' }} />
                  <YAxis dataKey="label" type="category" tick={{ fontSize: 9, fill: '#6b7280' }} width={30} />
                  <Tooltip
                    contentStyle={{ fontSize: 10, borderRadius: 6 }}
                    formatter={(value: number) => [`${value} encuestas`, 'Cantidad']}
                  />
                  <Bar dataKey="count" fill="#4472C4" radius={[0, 2, 2, 0]} />
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
            <strong>Nota metodológica:</strong> {regression.hasCorrelation 
              ? `Con p = ${regression.pValue.toFixed(4)} < 0.05, rechazamos la hipótesis nula (H₀: β₁ = 0). Existe evidencia estadística de una relación lineal.`
              : `Con p = ${regression.pValue.toFixed(4)} ≥ 0.05, no podemos rechazar la hipótesis nula. No hay evidencia suficiente de correlación lineal.`
            }
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function computeFrequencyData(scatterData: { x: number; y: number }[]) {
  const counts: Record<string, { x: number; y: number; count: number }> = {}
  
  scatterData.forEach(point => {
    const key = `${point.x},${point.y}`
    if (!counts[key]) {
      counts[key] = { x: point.x, y: point.y, count: 0 }
    }
    counts[key].count++
  })
  
  return Object.values(counts)
    .map(d => ({
      ...d,
      label: `(${d.x},${d.y})`,
    }))
    .sort((a, b) => b.count - a.count)
}

function StatParameters({ regression }: { regression: LinearRegressionResult }) {
  const params = [
    { label: 'Pendiente (β₁)', value: regression.slope.toFixed(4), desc: 'Cambio esperado en Y por cada unidad de X' },
    { label: 'Intercepto (β₀)', value: regression.intercept.toFixed(4), desc: 'Valor esperado de Y cuando X = 0' },
    { label: 'Correlación (r)', value: regression.correlation.toFixed(4), desc: '-1 a 1: Fuerza y dirección de la relación' },
    { label: 'R² (Coef. Determinación)', value: `${(regression.rSquared * 100).toFixed(2)}%`, desc: '% de varianza de Y explicada por X' },
    { label: 'P-valor', value: regression.pValue < 0.0001 ? '< 0.0001' : regression.pValue.toFixed(4), desc: 'Probabilidad de H₀ siendo verdadera' },
    { label: 'Estadístico t', value: regression.tStatistic.toFixed(4), desc: 'β₁ / Error estándar de β₁' },
    { label: 'Error Estándar', value: regression.standardError.toFixed(4), desc: 'Dispersión de residuos' },
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
  const cardNum = page - 1
  return (
    <div className="flex items-center justify-between border-t border-border bg-foreground px-6 py-2.5 text-xs text-primary-foreground">
      <a href="https://liftlab.mit.edu" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
        liftlab.mit.edu
      </a>
      <span className="opacity-70">Card {cardNum.toString().padStart(2, '0')}</span>
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
