'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { GeoPoint } from '@/lib/csv-parser'

interface SlideTestProps {
  geoPoints: GeoPoint[]
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const PRIMARY = '#1a3a5c'
const ACCENT = '#ED7D31'

export function SlideTest({
  geoPoints,
  onBack,
}: SlideTestProps) {
  const safeGeoPoints = geoPoints || []
  
  const chartData = safeGeoPoints.map((point, idx) => ({
    x: point.lng,
    y: point.lat,
    name: point.businessName || point.businessType,
    type: point.businessType,
    id: idx,
  }))

  const businessTypes = [...new Set(safeGeoPoints.map(p => p.businessType))]
  const typeColors: Record<string, string> = {}
  businessTypes.forEach((type, idx) => {
    const colors = [PRIMARY, ACCENT, '#4472C4', '#70AD47', '#FFC000', '#5B9BD5']
    typeColors[type] = colors[idx % colors.length]
  })

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
            Test Card
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'Mapa de Nanostores en '}
            <span className="text-primary">Buenos Aires</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            Distribución geográfica de los nanostores en la región AMBA
          </p>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-col gap-4 sm:flex-row"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/20 bg-card p-6 shadow-sm">
            <span className="text-4xl font-black tracking-tight text-primary sm:text-5xl">
              {safeGeoPoints.length}
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Nanostores en AMBA
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 bg-card p-6 shadow-sm">
            <span className="text-4xl font-black tracking-tight text-accent sm:text-5xl">
              {businessTypes.length}
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Tipos de negocio
            </span>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-border bg-card p-6 shadow-sm"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-4 text-sm font-bold text-card-foreground">
            Ubicación de Nanostores
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={500}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Longitud"
                  domain={[-59.1, -58.0]}
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  label={{ value: 'Longitud', position: 'bottom', style: { fontSize: 11, fill: '#9ca3af' } }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Latitud"
                  domain={[-35.0, -34.3]}
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  label={{ value: 'Latitud', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#9ca3af' } }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                />
                <Scatter name="Nanostores" data={chartData}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={typeColors[entry.type] || PRIMARY} 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[500px] text-muted-foreground">
              No hay datos de coordenadas disponibles
            </div>
          )}
        </motion.div>

        {businessTypes.length > 0 && (
          <motion.div
            className="mt-6 rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xs font-bold text-card-foreground mb-3">Leyenda - Tipos de Negocio</h4>
            <div className="flex flex-wrap gap-3">
              {businessTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: typeColors[type] || PRIMARY }}
                  />
                  <span className="text-xs text-muted-foreground">{type}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-accent mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Nota metodológica:</p>
              <p>Solo se muestran puntos dentro de la región AMBA (Área Metropolitana de Buenos Aires):</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                <li>Latitud: -35.0 a -34.3</li>
                <li>Longitud: -59.0 a -58.0</li>
              </ul>
              <p className="mt-1">Coordenadas tomadas de las columnas "Latitud bien" y "Longitud bien".</p>
            </div>
          </div>
        </motion.div>
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
