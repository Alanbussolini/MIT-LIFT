'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, TrendingDown, Calendar, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SlideArgentinaBenchmarkProps {
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function SlideArgentinaBenchmark({ onBack }: SlideArgentinaBenchmarkProps) {
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
          <span className="mb-3 inline-block rounded-md bg-muted px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            00 - National Context
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'National Benchmark: The '}
            <span className="text-primary">SME Landscape</span>
            {' in Argentina'}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            Macro-contextual frame for understanding the nanostore ecosystem within Argentina&apos;s broader economic environment
          </p>
        </motion.div>

        <motion.div
          className="mb-10 flex flex-col gap-4 sm:flex-row"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-destructive/30 bg-destructive/5 p-6 shadow-sm">
            <span className="text-5xl font-black tracking-tight text-destructive sm:text-6xl">80%</span>
            <span className="mt-2 text-center text-sm font-medium text-muted-foreground">
              Failure Rate
            </span>
            <span className="mt-1 text-center text-xs text-muted-foreground/70 max-w-[200px]">
              Startups that do not survive their first year in Argentina
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/20 bg-card p-6 shadow-sm">
            <span className="text-5xl font-black tracking-tight text-primary sm:text-6xl">30%</span>
            <span className="mt-2 text-center text-sm font-medium text-muted-foreground">
              Longevity Rate
            </span>
            <span className="mt-1 text-center text-xs text-muted-foreground/70 max-w-[200px]">
              Businesses that successfully reach 8 years of operation
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent/20 bg-card p-6 shadow-sm">
            <span className="text-5xl font-black tracking-tight text-accent sm:text-6xl">28.8%</span>
            <span className="mt-2 text-center text-sm font-medium text-muted-foreground">
              Retail Focus
            </span>
            <span className="mt-1 text-center text-xs text-muted-foreground/70 max-w-[200px]">
              Entrepreneurs operating in retail, specifically nanostores
            </span>
          </div>
        </motion.div>

        <motion.div
          className="mb-8 rounded-xl border border-border bg-muted/30 p-6 shadow-sm"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <TrendingDown className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Market Environment</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            According to <span className="font-semibold text-foreground">CEPAL</span> projections, 
            private consumption growth for 2025 and 2026 is expected to remain weak. This economic 
            outlook places <span className="font-semibold text-primary">significant pressure</span> on 
            the profitability and survival of neighborhood stores, making understanding the factors 
            that enable nanostore success more critical than ever.
          </p>
        </motion.div>

        <motion.div
          className="mb-8 rounded-xl border border-border bg-muted/30 p-6 shadow-sm"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Entrepreneurial Activity</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Approximately <span className="font-semibold text-accent text-lg">23.3%</span> of the 
            adult population in Argentina is involved in entrepreneurial activities. This high 
            rate of entrepreneurship underscores the <span className="font-semibold text-foreground">
            vital importance</span> of these firms for the local economy, employment, and 
            community development.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Research Relevance
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In a context where <span className="font-semibold text-foreground">8 out of 10</span> new 
              businesses fail within their first year, identifying the determinants of nanostore 
              survival and growth becomes essential for policy-making and economic development strategies.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Economic Pressure
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              With nearly <span className="font-semibold text-foreground">one-third</span> of 
              entrepreneurs operating in retail, understanding this sector&apos;s dynamics is crucial 
              for Argentina&apos;s economic resilience and inclusive growth.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-border bg-muted/50 p-4"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Source
                </span>
                <p className="text-sm font-medium text-foreground">
                  IMPACTO ECONÓMICO y SOCIAL DE LAS MiPyMES EN ARGENTINA (Senate Report)
                </p>
              </div>
            </div>
            <a
              href="https://www.senado.gob.ar/upload/archivo/48498"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              View Report
            </a>
          </div>
        </motion.div>
      </div>

      <SlideFooter page={0} />
    </section>
  )
}

function SlideFooter({ page }: { page: number }) {
  return (
    <div className="flex items-center justify-between border-t border-border bg-foreground px-6 py-2.5 text-xs text-primary-foreground">
      <a href="https://liftlab.mit.edu" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
        liftlab.mit.edu
      </a>
      <span className="opacity-70">Card {page === 0 ? '00' : `0${page}`}</span>
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
