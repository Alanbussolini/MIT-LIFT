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
  Cell,
} from 'recharts'
import type { DigitalLevelData } from '@/lib/csv-parser'

interface SlideTechnologyProps {
  digitalLevelData: DigitalLevelData[]
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const COLORS = ['#1a3a5c', '#ED7D31', '#4472C4', '#A5A5A5', '#FFC000', '#5B9BD5']

export function SlideTechnology({
  digitalLevelData,
  onBack,
}: SlideTechnologyProps) {
  const topLevel = digitalLevelData.length > 0 ? digitalLevelData[0] : null
  const totalStores = digitalLevelData.reduce((a, b) => a + b.count, 0)

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
            {'Technology Adoption in '}
            <span className="text-primary">Nanostores</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            Distribution of digital adoption levels among surveyed nanostores
          </p>
        </motion.div>

        {topLevel && (
          <motion.div
            className="mb-10 flex justify-center"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-primary/20 bg-card p-6 shadow-sm min-w-[200px]">
              <span className="text-4xl font-black tracking-tight text-primary sm:text-5xl">
                {topLevel.percentage}%
              </span>
              <span className="mt-1 text-sm font-medium text-muted-foreground text-center">
                {topLevel.level}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                Most common level
              </span>
            </div>
          </motion.div>
        )}

        <motion.div
          className="rounded-xl border border-border bg-card p-6 shadow-sm"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-card-foreground">
              Digital Level Distribution
            </h3>
            <span className="text-xs text-muted-foreground">
              {totalStores} nanostores surveyed
            </span>
          </div>
          
          {digitalLevelData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={digitalLevelData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="level"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{
                    value: 'Number of Nanostores',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  formatter={(value: number, name: string, props: any) => [
                    `${value} (${props.payload.percentage}%)`,
                    'Count'
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
            <div className="flex items-center justify-center h-[400px] text-muted-foreground">
              No technology data available
            </div>
          )}
        </motion.div>

        {digitalLevelData.length > 1 && (
          <motion.div
            className="mt-6 rounded-xl border border-border bg-card p-6 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-bold text-card-foreground mb-4">
              Breakdown by Level
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {digitalLevelData.map((item, index) => (
                <div
                  key={item.level}
                  className="flex flex-col items-center p-4 rounded-lg bg-secondary/50"
                >
                  <div
                    className="w-3 h-3 rounded-full mb-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-lg font-bold text-foreground">
                    {item.percentage}%
                  </span>
                  <span className="text-xs text-muted-foreground text-center mt-1">
                    {item.level}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({item.count} stores)
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
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
