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
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type {
  EmployeeCountData,
  BusinessAgeData,
  BusinessTypeRentalData,
} from '@/lib/csv-parser'

interface SlideNanostoreProps {
  employeeData: EmployeeCountData[]
  businessAgeData: BusinessAgeData[]
  businessTypeData: BusinessTypeRentalData[]
  averageEmployees: number
  averageBusinessAge: number
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function SlideNanostore({
  employeeData,
  businessAgeData,
  businessTypeData,
  averageEmployees,
  averageBusinessAge,
  onBack,
}: SlideNanostoreProps) {
  // Compute rental percentages from data
  const totalBusinesses = businessTypeData.reduce((sum, d) => sum + d.propio + d.rentado, 0)
  const totalRentado = businessTypeData.reduce((sum, d) => sum + d.rentado, 0)
  const totalPropio = businessTypeData.reduce((sum, d) => sum + d.propio, 0)
  const rentedPct = totalBusinesses > 0 ? ((totalRentado / totalBusinesses) * 100).toFixed(2) : '0'
  const ownedPct = totalBusinesses > 0 ? ((totalPropio / totalBusinesses) * 100).toFixed(2) : '0'

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
            02 - Nanostore Profile
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'The Typical '}
            <span className="text-primary">Nanostore</span>
            {' Profile'}
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
              {rentedPct}%
            </span>
            <span className="mt-1 text-sm font-medium text-muted-foreground">Rented</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 bg-card p-6 shadow-sm">
            <span className="text-4xl font-black tracking-tight text-accent sm:text-5xl">
              {ownedPct}%
            </span>
            <span className="mt-1 text-sm font-medium text-muted-foreground">Owned</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-6 shadow-sm">
            <span className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              ~{averageEmployees}
            </span>
            <span className="mt-1 text-sm font-medium text-muted-foreground">
              {'Employees (Avg)'}
            </span>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto]">
          {/* Employee Count Chart */}
          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              {'Employee count (previous month)'}
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={employeeData} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="count"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{
                    value: 'Number of workers',
                    position: 'insideBottom',
                    offset: -10,
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{
                    value: 'Nanostores',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                />
                <ReferenceLine
                  x={averageEmployees}
                  stroke="#9ca3af"
                  strokeDasharray="5 5"
                  label={{
                    value: 'Avg',
                    position: 'top',
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <Bar dataKey="quantity" fill="#1a3a5c" radius={[3, 3, 0, 0]} name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Business Age + Gate Chart */}
          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              {'Business Age - Security Infrastructure (Rejas)'}
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={businessAgeData} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="age"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  interval={1}
                  label={{
                    value: 'Business age (years)',
                    position: 'insideBottom',
                    offset: -10,
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{
                    value: 'Nanostores',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <ReferenceLine
                  x={averageBusinessAge}
                  stroke="#9ca3af"
                  strokeDasharray="5 5"
                  label={{
                    value: 'Avg',
                    position: 'top',
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <Bar dataKey="withoutGate" stackId="gate" fill="#1a3a5c" name="No" />
                <Bar
                  dataKey="withGate"
                  stackId="gate"
                  fill="#4ECDC4"
                  name="Yes"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Business Type Horizontal Bar */}
          <motion.div
            className="col-span-2 rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              {'Business Type - Owned vs Rented'}
            </h3>
            <ResponsiveContainer
              width="100%"
              height={Math.max(280, businessTypeData.length * 32)}
            >
              <BarChart
                data={businessTypeData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{
                    value: 'Number of nanostores',
                    position: 'insideBottom',
                    offset: -2,
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <YAxis
                  dataKey="type"
                  type="category"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  width={130}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="rentado" stackId="rental" fill="#1a3a5c" name="Rented" />
                <Bar
                  dataKey="propio"
                  stackId="rental"
                  fill="#4ECDC4"
                  name="Owned"
                  radius={[0, 3, 3, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <SlideFooter page={3} />
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
