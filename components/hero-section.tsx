'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 pt-12 pb-16 text-center">
      {/* Logos */}
      <motion.div
        className="mb-8 flex items-center gap-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UBA-FGCyubKOiBZUK47a0WSv6ESTGMxwlE.png"
          alt="Universidad de Buenos Aires logo"
          className="h-28 w-28 object-contain"
        />
        <div className="h-12 w-px bg-border" />
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/liftmit%20%281%29-tzonEgoBlR1yEoTJgPqd00NwxhRNOv.png"
          alt="MIT Low Income Firms Transformation Lab logo"
          className="h-16 w-auto object-contain"
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {'Evaluating factors impacting the economic growth and survival of '}
        <span className="text-primary">nanostores</span>
      </motion.h1>

      {/* Author */}
      <motion.p
        className="mt-5 text-base font-medium tracking-wide text-muted-foreground md:text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Alan Bussolini · 2026
      </motion.p>

      {/* Decorative line */}
      <motion.div
        className="mt-8 h-px w-24 bg-primary/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
    </section>
  )
}
