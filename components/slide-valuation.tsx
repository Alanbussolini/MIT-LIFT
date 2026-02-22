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
  Label,
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

function formatCurrencyShort(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value}`
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
      {/* Back button */}
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
        {/* Header */}
        <motion.div className="mb-8 text-center" {...fadeUp} transition={{ duration: 0.5 }}>
          <span className="mb-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            04 - Valuation
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'Nanostore '}
            <span className="text-primary">Valuation</span>
          </h2>
        </motion.div>

        {/* Angry Numbers Summary */}
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
              Willing to Exit
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 bg-card p-6 shadow-sm">
            <span className="text-4xl font-black tracking-tight text-accent sm:text-5xl">
              {notWillingPct}%
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Not Willing
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-6 shadow-sm">
            <span className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              ${avgSalary.toLocaleString('es-AR')}
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              {'Avg. Monthly Salary (ARS)'}
            </span>
          </div>
        </motion.div>

        {/* Data Transformation Section */}
        <motion.div
          className="mb-10 rounded-xl border border-border bg-card p-6 shadow-sm"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-5 text-sm font-bold text-card-foreground">
            Data Standardization via Gemini AI
          </h3>

          {/* Before / After images */}
          <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:gap-6">
            {/* Before */}
            <div className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Antes (Raw Data)
              </span>
              <div className="overflow-hidden rounded-lg border border-border shadow-sm">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Antes-yXfZI8vbn8ly4YlCjIfI3Fmx6S9Qjy.png"
                  alt="Raw survey data showing inconsistent free-text responses for salary expectations"
                  className="h-auto w-full max-w-xs object-contain"
                />
              </div>
            </div>

            {/* Arrow */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <ArrowRightIcon className="h-7 w-7 text-primary" />
            </div>

            {/* After */}
            <div className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Despues (Formatted Data)
              </span>
              <div className="overflow-hidden rounded-lg border border-border shadow-sm">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Despues-DzXMnUZLzkvLF3eKzezSv2b4PJUhJR.png"
                  alt="Cleaned data with binary willing/not willing categories and normalized salary values"
                  className="h-auto w-full max-w-xs object-contain"
                />
              </div>
            </div>
          </div>

          {/* Explanation text */}
          <div className="rounded-lg bg-secondary/50 p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {'Since the raw data came from open-ended text fields, it was highly inconsistent\u2014containing words, varied decimal formats, and zeros. Using Gemini AI, we performed a systematic cleaning process:'}
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              <li>{'Categorized responses into binary indicators (Willing to leave: Yes/No).'}</li>
              <li>{'Extracted and normalized monthly salary expectations into numeric values.'}</li>
            </ol>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {'This allows us to quantify the economic valuation of each Nanostore. Finally, we audited the information to ensure each data point remained correctly mapped to its specific store, preventing cross-referenced errors.'}
            </p>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
          {/* Donut Chart - Willingness to Exit */}
          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-card-foreground">
                {'Willingness to Exit for a Fixed Salary'}
              </h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded" style={{ backgroundColor: '#1a3a5c' }} />
                  <span className="text-muted-foreground">Willing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded" style={{ backgroundColor: '#4ECDC4' }} />
                  <span className="text-muted-foreground">Not Willing</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={willingnessChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
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
                    `${(props.payload.percent * 100).toFixed(1)}%`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart - Salary Distribution */}
          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              {'Monthly Salary Expectations Distribution'}
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={salaryDistribution}
                margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  label={{
                    value: 'ARS salary range',
                    position: 'insideBottom',
                    offset: -10,
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{
                    value: 'Owners',
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
                    value: 'Avg',
                    position: 'right',
                    style: { fontSize: 10, fill: '#ED7D31' },
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#1a3a5c"
                  radius={[3, 3, 0, 0]}
                  name="Owners"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
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
