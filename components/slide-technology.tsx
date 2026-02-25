'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SlideTechnologyProps {
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function SlideTechnology({
  onBack,
}: SlideTechnologyProps) {
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

      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-20 pb-8">
        <motion.div className="mb-8 text-center" {...fadeUp} transition={{ duration: 0.5 }}>
          <span className="mb-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            06 - Technology Adoption
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'Nivel de Adopción de '}
            <span className="text-primary">Tecnología</span>
          </h2>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-col gap-4 sm:flex-row"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/20 bg-card p-5 shadow-sm">
            <span className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
              78,64%
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              quiere que su negocio crezca
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 bg-card p-5 shadow-sm">
            <span className="text-2xl font-black tracking-tight text-accent sm:text-3xl">
              Está satisfecho con su negocio
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Razón 1
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-5 shadow-sm">
            <span className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Porque sería muy complicado administrarlo
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Razón 2
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/30 bg-card p-5 shadow-sm">
            <span className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
              58,68%
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              tiene un nivel de tecnología moderado
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/30 bg-card p-5 shadow-sm">
            <span className="text-lg font-black tracking-tight text-accent sm:text-xl">
              Pagos electrónicos y Apps de mensajería
            </span>
            <span className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Tecnologías más adoptadas
            </span>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Hoja8?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Asume que tenés los medios, ¿Te gustaría que tu negocio crezca?"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Razonesparanocrecer?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Razones para no crecer"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Niveldetecnologa?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Nivel de Tecnología"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Tecnologasmasutilizadas?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Tecnologías más utilizadas"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Sueldopretendidovs_Niveldetecnologa?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Sueldo Pretendido vs Nivel de Tecnología"
            />
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <iframe
              src="https://public.tableau.com/views/Libro3_17719395393810/Ventasvs_LMyNiveldetecnologa?:showVizHome=no&:embed=y&:display_count=n&:tabs=n&:toolbar=n"
              width="100%"
              height="500"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Ventas vs Mes Pasado"
            />
          </motion.div>
        </div>
      </div>

      <SlideFooter page={6} />
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
