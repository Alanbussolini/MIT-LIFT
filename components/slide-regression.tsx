'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react'
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
          className="mb-10 flex flex-col gap-4 sm:flex-row"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
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
          />
          
          <RegressionSection
            title="Regresión 2: Nivel de Tecnología vs Expectativa de Ventas"
            subtitle="Analiza si el nivel de tecnología se correlaciona con expectativas de ventas a 3 meses"
            regression={technologyRegression}
            delay={0.3}
          />
        </div>
      </div>

      <SlideFooter page={7} />
    </section>
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
        {regression.hasCorrelation ? 'Correlación Significativa' : 'Sin Correlación'}
      </span>
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
  const chartData = regression.scatterData.map((point, idx) => ({
    x: point.x,
    y: point.y,
    id: idx,
  }))

  const lineData = regression.regressionLine.map((point, idx) => ({
    x: point.x,
    y: point.y,
  }))

  return (
    <motion.div
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
      {...fadeUp}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-lg font-bold text-card-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                dataKey="x"
                name={regression.xLabel}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                label={{ value: regression.xLabel, position: 'insideBottom', offset: -10, style: { fontSize: 10, fill: '#9ca3af' } }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name={regression.yLabel}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                label={{ value: regression.yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#9ca3af' } }}
                domain={[-1.5, 1.5]}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                formatter={(value: number, name: string) => [value.toFixed(3), name === 'y' ? 'Expectativa' : name]}
              />
              <Scatter name="Datos" data={chartData} fill="#1a3a5c" />
              {lineData.length === 2 && (
                <Line
                  type="linear"
                  data={lineData}
                  dataKey="y"
                  stroke="#ED7D31"
                  strokeWidth={2}
                  dot={false}
                  name="Línea de Regresión"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-4">
          <StatParameters regression={regression} />
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
        <h4 className="text-sm font-bold text-card-foreground mb-2">Interpretación Estadística</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{regression.interpretation}</p>
      </div>
    </motion.div>
  )
}

function StatParameters({ regression }: { regression: LinearRegressionResult }) {
  const params = [
    { label: 'Pendiente (β₁)', value: regression.slope.toFixed(4), desc: 'Cambio en Y por unidad de X' },
    { label: 'Intercepto (β₀)', value: regression.intercept.toFixed(4), desc: 'Valor de Y cuando X = 0' },
    { label: 'Correlación (r)', value: regression.correlation.toFixed(4), desc: 'Fuerza de la relación lineal' },
    { label: 'R² (Coef. Determinación)', value: `${(regression.rSquared * 100).toFixed(2)}%`, desc: 'Varianza explicada' },
    { label: 'P-valor', value: regression.pValue < 0.0001 ? '< 0.0001' : regression.pValue.toFixed(4), desc: 'Significancia estadística' },
    { label: 'Estadístico t', value: regression.tStatistic.toFixed(4), desc: 'Magnitud del efecto' },
    { label: 'Error Estándar', value: regression.standardError.toFixed(4), desc: 'Precisión de la estimación' },
    { label: 'n (Muestra)', value: regression.n.toString(), desc: 'Tamaño de la muestra' },
  ]

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h4 className="text-sm font-bold text-card-foreground mb-3">Parámetros Estadísticos</h4>
      <div className="grid grid-cols-2 gap-3">
        {params.map((param) => (
          <div key={param.label} className="flex flex-col">
            <span className="text-[10px] text-muted-foreground">{param.label}</span>
            <span className="text-sm font-semibold text-foreground">{param.value}</span>
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
