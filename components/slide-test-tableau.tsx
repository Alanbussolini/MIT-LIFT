'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SlideTestTableauProps {
  onBack: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function SlideTestTableau({ onBack }: SlideTestTableauProps) {
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
          <span className="mb-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Test - Tableau Embed
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Prueba de Tableau
          </h2>
        </motion.div>

        <motion.div
          className="rounded-xl border border-border bg-card p-4 shadow-sm"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-4 text-sm font-bold text-card-foreground">
            Razones para no crecer
          </h3>
          <div className="w-full h-[500px]">
            <div className='tableauPlaceholder' id='viz1771961246634' style={{ position: 'relative', width: '100%', height: '100%' }}>
              <noscript>
                <a href='#'>
                  <img alt='Razón para no crecer ' src='https://public.tableau.com/static/images/Li/Libro3_17719395393810/Raznparanocrecer/1_rss.png' style={{ border: 'none' }} />
                </a>
              </noscript>
              <object className='tableauViz' style={{ display: 'none' }}>
                <param name='host_url' value='https://public.tableau.com/' />
                <param name='embed_code_version' value='3' />
                <param name='site_root' value='' />
                <param name='name' value='Libro3_17719395393810/Raznparanocrecer' />
                <param name='tabs' value='no' />
                <param name='toolbar' value='yes' />
                <param name='static_image' value='https://public.tableau.com/static/images/Li/Libro3_17719395393810/Raznparanocrecer/1.png' />
                <param name='animate_transition' value='yes' />
                <param name='display_static_image' value='yes' />
                <param name='display_spinner' value='yes' />
                <param name='display_overlay' value='yes' />
                <param name='display_count' value='yes' />
                <param name='language' value='es-ES' />
                <param name='filter' value='publish=yes' />
              </object>
            </div>
            <script type='text/javascript'>
              {`
                var divElement = document.getElementById('viz1771961246634');
                var vizElement = divElement.getElementsByTagName('object')[0];
                if (divElement.offsetWidth) {
                  vizElement.style.width = '100%';
                  vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
                }
                var scriptElement = document.createElement('script');
                scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
                vizElement.parentNode.insertBefore(scriptElement, vizElement);
              `}
            </script>
          </div>
        </motion.div>
      </div>

      <SlideFooter page={8} />
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
