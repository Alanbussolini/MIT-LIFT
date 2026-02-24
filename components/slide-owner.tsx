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
} from 'recharts'
import type {
  AgeGenderData,
  GenderPercentage,
  EducationData,
} from '@/lib/csv-parser'

interface SlideOwnerProps {
  ageGenderData: AgeGenderData[]
  genderPercentage: GenderPercentage[]
  educationData: EducationData[]
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function SlideOwner({
  ageGenderData,
  genderPercentage,
  educationData,
  onBack,
}: SlideOwnerProps) {
  const topEducation = educationData.length > 0
    ? educationData.reduce((a, b) => (a.percentage > b.percentage ? a : b))
    : null
  const topAgeRange = ageGenderData.length > 0
    ? ageGenderData.reduce((a, b) =>
        a.hombre + a.mujer > b.hombre + b.mujer ? a : b
      )
    : null
  const maleObj = genderPercentage.find(g => g.gender === 'Hombre')
  const femaleObj = genderPercentage.find(g => g.gender === 'Mujer')

  const totalAgeGender = ageGenderData.reduce((sum, d) => sum + d.hombre + d.mujer, 0)
  
  const ageGenderWithPct = ageGenderData.map(d => ({
    ...d,
    total: d.hombre + d.mujer,
    pctHombre: totalAgeGender > 0 ? parseFloat(((d.hombre / totalAgeGender) * 100).toFixed(1)) : 0,
    pctMujer: totalAgeGender > 0 ? parseFloat(((d.mujer / totalAgeGender) * 100).toFixed(1)) : 0,
    pctTotal: totalAgeGender > 0 ? parseFloat((((d.hombre + d.mujer) / totalAgeGender) * 100).toFixed(1)) : 0,
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
          Volver al Mapa
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pt-20 pb-8">
        <motion.div className="mb-8 text-center" {...fadeUp} transition={{ duration: 0.5 }}>
          <span className="mb-3 inline-block rounded-md bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            03 - Perfil del Dueño
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'El Dueño Típico del '}
            <span className="text-accent">Nanostore</span>
          </h2>
        </motion.div>

        <motion.div
          className="mb-10 flex flex-col gap-4 sm:flex-row"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {topEducation && (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/20 bg-card p-6 shadow-sm">
              <span className="text-4xl font-black tracking-tight text-primary sm:text-5xl">
                {topEducation.percentage}%
              </span>
              <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
                {topEducation.level}
              </span>
            </div>
          )}
          {topAgeRange && (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 bg-card p-6 shadow-sm">
              <span className="text-4xl font-black tracking-tight text-accent sm:text-5xl">
                {topAgeRange.ageRange.replace('De ', '').replace(' a ', '-')}
              </span>
              <span className="mt-1 text-sm font-medium text-muted-foreground">
                Rango de edad más frecuente
              </span>
            </div>
          )}
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-6 shadow-sm">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
                {maleObj ? `${maleObj.percentage.toFixed(1)}%` : '--'}
              </span>
              <span className="text-lg text-muted-foreground">/</span>
              <span className="text-2xl font-black tracking-tight text-accent sm:text-3xl">
                {femaleObj ? `${femaleObj.percentage.toFixed(1)}%` : '--'}
              </span>
            </div>
            <span className="mt-1 text-sm font-medium text-muted-foreground">
              Hombre / Mujer
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[2fr_1fr] lg:grid-rows-[1fr_1fr]">
          <motion.div
            className="row-span-2 rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-card-foreground">
                Distribución por Edad y Género
              </h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded" style={{ backgroundColor: '#1a3a5c' }} />
                  <span className="text-muted-foreground">Hombre</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded" style={{ backgroundColor: '#ED7D31' }} />
                  <span className="text-muted-foreground">Mujer</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart
                data={ageGenderWithPct}
                margin={{ top: 20, right: 10, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="ageRange"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  angle={-30}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{
                    value: 'Cantidad',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 10, fill: '#9ca3af' },
                  }}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  formatter={(value: number, name: string) => [
                    value,
                    name === 'hombre' ? 'Hombre' : name === 'mujer' ? 'Mujer' : name
                  ]}
                />
                <Bar dataKey="mujer" stackId="gender" fill="#ED7D31" name="Mujer" />
                <Bar
                  dataKey="hombre"
                  stackId="gender"
                  fill="#1a3a5c"
                  name="Hombre"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 text-center text-xs text-muted-foreground">
              Total: {totalAgeGender} nanostores ({ageGenderWithPct.reduce((s, d) => s + d.pctTotal, 0).toFixed(0)}%)
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Género del Dueño (%)
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 text-left font-semibold text-primary">Género</th>
                  <th className="pb-2 text-right font-semibold text-primary">%</th>
                </tr>
              </thead>
              <tbody>
                {genderPercentage.map((item) => (
                  <tr key={item.gender} className="border-b border-border/30">
                    <td className="py-3 font-medium text-card-foreground">{item.gender}</td>
                    <td className="py-3 text-right tabular-nums text-card-foreground">
                      {item.percentage.toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                      })}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-1 text-sm font-bold text-card-foreground">
              Nivel Educativo Alcanzado
            </h3>
            <div className="mb-3 p-2 rounded bg-amber-50 border border-amber-200">
              <p className="text-[10px] text-amber-800">
                <strong>Nota:</strong> Se utiliza el supuesto de que el nivel educativo "Preparatoria" es parte de Secundaria, ya que la Preparatoria corresponde a la edad 15-18, la cual en Argentina es parte de la secundaria.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart
                data={[...educationData].reverse()}
                layout="vertical"
                margin={{ top: 0, right: 50, left: 10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  domain={[0, 'auto']}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  dataKey="level"
                  type="category"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  width={110}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  formatter={(value: number) => [`${value}%`, 'Porcentaje']}
                />
                <Bar
                  dataKey="percentage"
                  fill="#1a3a5c"
                  radius={[0, 3, 3, 0]}
                  name="Nivel Educativo"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      <SlideFooter page={4} />
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
