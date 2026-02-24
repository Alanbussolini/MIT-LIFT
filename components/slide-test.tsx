'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import type { GeoPoint } from '@/lib/csv-parser'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface SlideTestProps {
  geoPoints: GeoPoint[]
  onBack: () => void
}

const PRIMARY = '#1a3a5c'
const ACCENT = '#ED7D31'

export function SlideTest({
  geoPoints,
  onBack,
}: SlideTestProps) {
  const safeGeoPoints = geoPoints || []
  
  const businessTypes = [...new Set(safeGeoPoints.map(p => p.businessType))]
  
  const centerLat = safeGeoPoints.length > 0 
    ? safeGeoPoints.reduce((sum, p) => sum + p.lat, 0) / safeGeoPoints.length
    : -34.6
  
  const centerLng = safeGeoPoints.length > 0 
    ? safeGeoPoints.reduce((sum, p) => sum + p.lng, 0) / safeGeoPoints.length
    : -58.4

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
          className="rounded-xl border border-border bg-card p-4 shadow-sm overflow-hidden"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-4 text-sm font-bold text-card-foreground">
            Ubicación de Nanostores - Buenos Aires
          </h3>
          <div className="h-[500px] rounded-lg overflow-hidden">
            {safeGeoPoints.length > 0 ? (
              <MapContainer
                center={[centerLat, centerLng]}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {safeGeoPoints.map((point, idx) => (
                  <Marker key={idx} position={[point.lat, point.lng]}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold">{point.businessName || point.businessType}</p>
                        <p className="text-xs text-gray-500">{point.businessType}</p>
                        <p className="text-xs text-gray-400">
                          Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No hay datos de coordenadas disponibles
              </div>
            )}
          </div>
        </motion.div>

        {businessTypes.length > 0 && (
          <motion.div
            className="mt-6 rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xs font-bold text-card-foreground mb-3">Leyenda - Tipos de Negocio</h4>
            <div className="flex flex-wrap gap-3">
              {businessTypes.map((type, idx) => {
                const colors = [PRIMARY, ACCENT, '#4472C4', '#70AD47', '#FFC000', '#5B9BD5']
                return (
                  <div key={type} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: colors[idx % colors.length] }}
                    />
                    <span className="text-xs text-muted-foreground">{type}</span>
                  </div>
                )
              })}
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
