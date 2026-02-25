'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HeroSection } from '@/components/hero-section'
import { RoadmapCards } from '@/components/roadmap-cards'
import { CsvUpload } from '@/components/csv-upload'
import { SlideEconomy } from '@/components/slide-economy'
import { SlideNanostore } from '@/components/slide-nanostore'
import { SlideOwner } from '@/components/slide-owner'
import { SlideValuation } from '@/components/slide-valuation'
import { SlideCredit } from '@/components/slide-credit'
import { SlideTechnology } from '@/components/slide-technology'
import { SlideTestTableau } from '@/components/slide-test-tableau'
import { parseCSV } from '@/lib/csv-parser'
import {
  computeAgeGenderData,
  computeGenderPercentage,
  computeEducationData,
  computeEmployeeCountData,
  computeBusinessAgeData,
  computeBusinessTypeRental,
  computeAverageEmployees,
  computeAverageBusinessAge,
  computeWillingnessToExit,
  computeAverageExpectedSalary,
  computeSalaryDistribution,
  computeBusinessImpactComparison,
  computeCreditSources,
  computeFormalInformalCredit,
  computeBankCreditBarriers,
  computeCreditImpactPct,
  computeMainBarrier,
  computeWantsGrowth,
  computeMostFrequentBusinessType,
  computeAMBAgeoPoints,
  computeBuenosAiresMapPoints,
  computeHasGate,
} from '@/lib/csv-parser'
import type { SurveyRow } from '@/lib/csv-parser'
import { FileSpreadsheet } from 'lucide-react'

type ActiveView = null | 'economy' | 'nanostore' | 'owner' | 'valuation' | 'credit' | 'technology' | 'testTableau'

export default function Home() {
  const [csvText, setCsvText] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<ActiveView>(null)

  const rows: SurveyRow[] = csvText ? parseCSV(csvText) : []

  // Computed data for slides
  const employeeData = computeEmployeeCountData(rows)
  const businessAgeData = computeBusinessAgeData(rows)
  const businessTypeData = computeBusinessTypeRental(rows)
  const averageEmployees = computeAverageEmployees(rows)
  const averageBusinessAge = computeAverageBusinessAge(rows)
  const ageGenderData = computeAgeGenderData(rows)
  const genderPercentage = computeGenderPercentage(rows)
  const educationData = computeEducationData(rows)
  const willingnessData = computeWillingnessToExit(rows)
  const avgSalary = computeAverageExpectedSalary(rows)
  const salaryDistribution = computeSalaryDistribution(rows)
  const businessImpactData = computeBusinessImpactComparison(rows)
  const creditSources = computeCreditSources(rows)
  const formalInformalData = computeFormalInformalCredit(rows)
  const barriers = computeBankCreditBarriers(rows)
  const creditImpactPct = computeCreditImpactPct(rows)
  const mainBarrier = computeMainBarrier(rows)
  const wantsGrowth = computeWantsGrowth(rows)
  const mostFrequentBusinessType = computeMostFrequentBusinessType(rows)
  const geoPoints = computeAMBAgeoPoints(rows)
  const baGeoPoints = computeBuenosAiresMapPoints(rows)
  const hasGateData = computeHasGate(rows)

  const goBack = () => setActiveView(null)

  return (
    <AnimatePresence mode="wait">
      {activeView === 'economy' ? (
        <motion.div
          key="economy"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          <SlideEconomy onBack={goBack} />
        </motion.div>
      ) : activeView === 'nanostore' ? (
        <motion.div
          key="nanostore"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          <SlideNanostore
            employeeData={employeeData}
            businessAgeData={businessAgeData}
            businessTypeData={businessTypeData}
            averageEmployees={averageEmployees}
            averageBusinessAge={averageBusinessAge}
            mostFrequentBusinessType={mostFrequentBusinessType}
            hasGateData={hasGateData}
            onBack={goBack}
          />
        </motion.div>
      ) : activeView === 'owner' ? (
        <motion.div
          key="owner"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          <SlideOwner
            ageGenderData={ageGenderData}
            genderPercentage={genderPercentage}
            educationData={educationData}
            onBack={goBack}
          />
        </motion.div>
      ) : activeView === 'valuation' ? (
        <motion.div
          key="valuation"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          <SlideValuation
            willingPct={willingnessData.willingPct}
            notWillingPct={willingnessData.notWillingPct}
            avgSalary={avgSalary}
            willingnessChartData={willingnessData.chartData}
            salaryDistribution={salaryDistribution}
            onBack={goBack}
          />
        </motion.div>
      ) : activeView === 'credit' ? (
        <motion.div
          key="credit"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          <SlideCredit
            creditImpactPct={creditImpactPct}
            formalPct={formalInformalData.formalPct}
            informalPct={formalInformalData.informalPct}
            mainBarrier={mainBarrier}
            businessImpactData={businessImpactData}
            creditSources={creditSources}
            formalInformalChartData={formalInformalData.chartData}
            barriers={barriers}
            onBack={goBack}
          />
        </motion.div>
      ) : activeView === 'technology' ? (
        <motion.div
          key="technology"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          <SlideTechnology
            onBack={goBack}
          />
        </motion.div>
      ) : activeView === 'testTableau' ? (
        <motion.div
          key="testTableau"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          <SlideTestTableau
            onBack={goBack}
          />
        </motion.div>
      ) : (
        <motion.main
          key="landing"
          className="relative min-h-screen bg-background dot-grid-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          {/* Hero */}
          <HeroSection />

          {/* CSV Upload area */}
          <section className="mx-auto flex w-full max-w-xl flex-col items-center px-6 pb-12">
            {!csvText ? (
              <CsvUpload onFileLoaded={setCsvText} />
            ) : (
              <motion.div
                className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-5 py-3 text-sm text-foreground"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                <span className="font-medium">{'CSV loaded'}</span>
                <span className="text-muted-foreground">
                  {'- '}{rows.length}{' records'}
                </span>
                <button
                  onClick={() => setCsvText(null)}
                  className="ml-2 text-xs font-medium text-primary underline-offset-2 hover:underline"
                >
                  Change
                </button>
              </motion.div>
            )}
          </section>

          {/* Roadmap Cards */}
          <section className="mx-auto w-full max-w-xl px-6 pb-20">
            <RoadmapCards
              onSelectCard={setActiveView}
              disabled={!csvText}
            />
          </section>
        </motion.main>
      )}
    </AnimatePresence>
  )
}
