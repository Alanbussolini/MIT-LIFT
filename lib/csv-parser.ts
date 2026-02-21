export interface SurveyRow {
  finished: boolean
  teamName: string
  businessName: string
  surveyorName: string
  latitude: string
  longitude: string
  businessType: string
  hasGate: string // "Sí" | "No"
  openingYear: number | null
  businessAge: number | null
  totalWorkers: number | null
  salariedWorkers: number | null
  workerExpectation: string
  salesComparison: string
  salesReason: string
  salesExpectation: string
  inventoryChange: string
  inventoryExpectation: string
  inventoryLevel: string
  priceChange: string
  priceExpectation: string
  impactCrime: string
  impactCredit: string
  impactPrices: string
  impactCompetition: string
  creditBank: string
  creditProviders: string
  creditFamily: string
  creditGovernment: string
  creditPrivate: string
  creditOther: string
  noBankCreditReason: string
  wantsGrowth: string
  noGrowthReason: string
  minimumSalary: string
  willingToLeave: string
  expectedSalary: string
  digitalLevel: string
  digitalTools: string
  openingHour: string
  closingHour: string
  unnamed41: string
  ownerGender: string // "Mujer" | "Hombre" | "Preferencia de no especificar"
  ownerDNI: string
  ownedOrRented: string // "Propio" | "Rentado"
  educationLevel: string // "Sin estudios" | "Primaria" | "Secundaria" | "Preparatoria" | "Universidad y más"
  ownerAgeRange: string // "Menos de 20" | "De 21 a 30" | "De 31 a 40" | "De 41 a 50" | "De 51 a 60" | "Más de 60"
}

export function parseCSV(text: string): SurveyRow[] {
  const lines = text.split('\n')
  if (lines.length < 2) return []

  // Skip header line
  const dataLines = lines.slice(1).filter((line) => line.trim().length > 0)

  return dataLines.map((line) => {
    const cols = parseSemicolonLine(line)

    return {
      finished: cols[0]?.trim() === 'True',
      teamName: cols[1]?.trim() || '',
      businessName: cols[2]?.trim() || '',
      surveyorName: cols[3]?.trim() || '',
      latitude: cols[4]?.trim() || '',
      longitude: cols[5]?.trim() || '',
      businessType: cols[6]?.trim() || '',
      hasGate: cols[7]?.trim() || '',
      openingYear: parseFloatSafe(cols[8]),
      businessAge: parseIntSafe(cols[9]),
      totalWorkers: parseFloatSafe(cols[10]),
      salariedWorkers: parseFloatSafe(cols[11]),
      workerExpectation: cols[12]?.trim() || '',
      salesComparison: cols[13]?.trim() || '',
      salesReason: cols[14]?.trim() || '',
      salesExpectation: cols[15]?.trim() || '',
      inventoryChange: cols[16]?.trim() || '',
      inventoryExpectation: cols[17]?.trim() || '',
      inventoryLevel: cols[18]?.trim() || '',
      priceChange: cols[19]?.trim() || '',
      priceExpectation: cols[20]?.trim() || '',
      impactCrime: cols[21]?.trim() || '',
      impactCredit: cols[22]?.trim() || '',
      impactPrices: cols[23]?.trim() || '',
      impactCompetition: cols[24]?.trim() || '',
      creditBank: cols[25]?.trim() || '',
      creditProviders: cols[26]?.trim() || '',
      creditFamily: cols[27]?.trim() || '',
      creditGovernment: cols[28]?.trim() || '',
      creditPrivate: cols[29]?.trim() || '',
      creditOther: cols[30]?.trim() || '',
      noBankCreditReason: cols[31]?.trim() || '',
      wantsGrowth: cols[32]?.trim() || '',
      noGrowthReason: cols[33]?.trim() || '',
      minimumSalary: cols[34]?.trim() || '',
      willingToLeave: cols[35]?.trim() || '',
      expectedSalary: cols[36]?.trim() || '',
      digitalLevel: cols[37]?.trim() || '',
      digitalTools: cols[38]?.trim() || '',
      openingHour: cols[39]?.trim() || '',
      closingHour: cols[40]?.trim() || '',
      unnamed41: cols[41]?.trim() || '',
      ownerGender: cols[42]?.trim() || '',
      ownerDNI: cols[43]?.trim() || '',
      ownedOrRented: cols[44]?.trim() || '',
      educationLevel: cols[45]?.trim() || '',
      ownerAgeRange: cols[46]?.trim() || '',
    }
  }).filter(row => row.finished)
}

function parseSemicolonLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ';' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

function parseFloatSafe(val: string | undefined): number | null {
  if (!val) return null
  const cleaned = val.trim().replace(/,/g, '.')
  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
}

function parseIntSafe(val: string | undefined): number | null {
  if (!val) return null
  const cleaned = val.trim().replace(/,/g, '.')
  const num = parseInt(cleaned, 10)
  return isNaN(num) ? null : num
}

// Aggregation helpers
export interface AgeGenderData {
  ageRange: string
  hombre: number
  mujer: number
}

export interface GenderPercentage {
  gender: string
  percentage: number
}

export interface EducationData {
  level: string
  percentage: number
}

export interface EmployeeCountData {
  count: number
  quantity: number
}

export interface BusinessAgeData {
  age: number
  withGate: number
  withoutGate: number
}

export interface BusinessTypeRentalData {
  type: string
  propio: number
  rentado: number
}

export function computeAgeGenderData(rows: SurveyRow[]): AgeGenderData[] {
  const ageOrder = ['Menos de 20', 'De 21 a 30', 'De 31 a 40', 'De 41 a 50', 'De 51 a 60', 'Más de 60']
  const map: Record<string, { hombre: number; mujer: number }> = {}
  
  ageOrder.forEach(a => { map[a] = { hombre: 0, mujer: 0 } })
  
  rows.forEach(row => {
    const range = row.ownerAgeRange
    const gender = row.ownerGender
    if (map[range]) {
      if (gender === 'Hombre') map[range].hombre++
      else if (gender === 'Mujer') map[range].mujer++
    }
  })

  return ageOrder.filter(a => map[a].hombre + map[a].mujer > 0).map(a => ({
    ageRange: a,
    hombre: map[a].hombre,
    mujer: map[a].mujer,
  }))
}

export function computeGenderPercentage(rows: SurveyRow[]): GenderPercentage[] {
  const total = rows.filter(r => r.ownerGender === 'Hombre' || r.ownerGender === 'Mujer').length
  if (total === 0) return []
  const hombre = rows.filter(r => r.ownerGender === 'Hombre').length
  const mujer = rows.filter(r => r.ownerGender === 'Mujer').length
  return [
    { gender: 'Hombre', percentage: parseFloat(((hombre / total) * 100).toFixed(3)) },
    { gender: 'Mujer', percentage: parseFloat(((mujer / total) * 100).toFixed(3)) },
  ]
}

export function computeEducationData(rows: SurveyRow[]): EducationData[] {
  const order = ['Universidad y más', 'Secundaria', 'Primaria', 'Preparatoria', 'Sin estudios']
  const counts: Record<string, number> = {}
  order.forEach(o => { counts[o] = 0 })
  
  rows.forEach(row => {
    if (counts[row.educationLevel] !== undefined) counts[row.educationLevel]++
  })
  
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  if (total === 0) return []

  return order.map(level => ({
    level,
    percentage: parseFloat(((counts[level] / total) * 100).toFixed(2)),
  }))
}

export function computeEmployeeCountData(rows: SurveyRow[]): EmployeeCountData[] {
  const counts: Record<number, number> = {}
  
  rows.forEach(row => {
    if (row.totalWorkers !== null && row.totalWorkers >= 0) {
      const val = Math.round(row.totalWorkers)
      counts[val] = (counts[val] || 0) + 1
    }
  })

  const maxKey = Math.max(...Object.keys(counts).map(Number))
  const result: EmployeeCountData[] = []
  for (let i = 0; i <= Math.min(maxKey, 15); i++) {
    result.push({ count: i, quantity: counts[i] || 0 })
  }
  return result
}

export function computeBusinessAgeData(rows: SurveyRow[]): BusinessAgeData[] {
  const counts: Record<number, { withGate: number; withoutGate: number }> = {}
  
  rows.forEach(row => {
    if (row.businessAge !== null && row.businessAge >= 0) {
      const age = row.businessAge
      if (!counts[age]) counts[age] = { withGate: 0, withoutGate: 0 }
      if (row.hasGate === 'Sí') counts[age].withGate++
      else counts[age].withoutGate++
    }
  })

  const maxAge = Math.max(...Object.keys(counts).map(Number))
  const result: BusinessAgeData[] = []
  for (let i = 0; i <= Math.min(maxAge, 50); i++) {
    result.push({
      age: i,
      withGate: counts[i]?.withGate || 0,
      withoutGate: counts[i]?.withoutGate || 0,
    })
  }
  return result
}

export function computeBusinessTypeRental(rows: SurveyRow[]): BusinessTypeRentalData[] {
  const counts: Record<string, { propio: number; rentado: number }> = {}
  
  rows.forEach(row => {
    const t = row.businessType
    if (!t) return
    if (!counts[t]) counts[t] = { propio: 0, rentado: 0 }
    if (row.ownedOrRented === 'Propio') counts[t].propio++
    else if (row.ownedOrRented === 'Rentado') counts[t].rentado++
  })

  return Object.entries(counts)
    .map(([type, vals]) => ({
      type,
      propio: vals.propio,
      rentado: vals.rentado,
      total: vals.propio + vals.rentado,
    }))
    .sort((a, b) => b.total - a.total)
    .map(({ type, propio, rentado }) => ({ type, propio, rentado }))
}

export function computeAverageEmployees(rows: SurveyRow[]): number {
  const valid = rows.filter(r => r.totalWorkers !== null && r.totalWorkers >= 0)
  if (valid.length === 0) return 0
  const sum = valid.reduce((a, r) => a + (r.totalWorkers || 0), 0)
  return parseFloat((sum / valid.length).toFixed(1))
}

export function computeAverageBusinessAge(rows: SurveyRow[]): number {
  const valid = rows.filter(r => r.businessAge !== null && r.businessAge >= 0)
  if (valid.length === 0) return 0
  const sum = valid.reduce((a, r) => a + (r.businessAge || 0), 0)
  return parseFloat((sum / valid.length).toFixed(1))
}

// ── Valuation helpers ─────────────────────────────────────────────

export interface WillingnessData {
  name: string
  value: number
}

export interface SalaryRangeData {
  range: string
  count: number
}

export function computeWillingnessToExit(rows: SurveyRow[]): {
  willing: number
  notWilling: number
  willingPct: number
  notWillingPct: number
  chartData: WillingnessData[]
} {
  const willing = rows.filter(r => r.willingToLeave === 'Dispuesto').length
  const notWilling = rows.filter(r => r.willingToLeave === 'No Dispuesto').length
  const total = willing + notWilling
  const willingPct = total > 0 ? parseFloat(((willing / total) * 100).toFixed(1)) : 0
  const notWillingPct = total > 0 ? parseFloat(((notWilling / total) * 100).toFixed(1)) : 0
  return {
    willing,
    notWilling,
    willingPct,
    notWillingPct,
    chartData: [
      { name: 'Willing to Exit', value: willing },
      { name: 'Not Willing', value: notWilling },
    ],
  }
}

export function computeAverageExpectedSalary(rows: SurveyRow[]): number {
  const valid = rows
    .map(r => {
      if (!r.expectedSalary || r.expectedSalary === '-' || r.expectedSalary === '0') return null
      const cleaned = r.expectedSalary.replace(/\./g, '').replace(/,/g, '.').trim()
      const num = parseFloat(cleaned)
      return isNaN(num) || num <= 0 ? null : num
    })
    .filter((v): v is number => v !== null)

  if (valid.length === 0) return 0
  const sum = valid.reduce((a, b) => a + b, 0)
  return Math.round(sum / valid.length)
}

// ── Credit helpers ────────────────────────────────────────────────

export interface BusinessImpactData {
  variable: string
  nada: number
  poco: number
  algo: number
  moderado: number
  mucho: number
}

export interface CreditSourceData {
  source: string
  count: number
}

export interface FormalInformalData {
  name: string
  value: number
}

export interface BarrierData {
  reason: string
  count: number
}

export function computeBusinessImpactComparison(rows: SurveyRow[]): BusinessImpactData[] {
  const fields: { key: keyof SurveyRow; label: string }[] = [
    { key: 'impactCrime', label: 'Crime' },
    { key: 'impactCredit', label: 'Lack of Credit' },
    { key: 'impactPrices', label: 'Price Increases' },
    { key: 'impactCompetition', label: 'Competition' },
  ]

  const scale = ['Nada', 'Poco', 'Algo', 'Moderado', 'Mucho']

  return fields.map(({ key, label }) => {
    const counts: Record<string, number> = {}
    scale.forEach(s => { counts[s] = 0 })
    rows.forEach(row => {
      const val = row[key] as string
      if (counts[val] !== undefined) counts[val]++
    })
    return {
      variable: label,
      nada: counts['Nada'],
      poco: counts['Poco'],
      algo: counts['Algo'],
      moderado: counts['Moderado'],
      mucho: counts['Mucho'],
    }
  })
}

export function computeCreditSources(rows: SurveyRow[]): CreditSourceData[] {
  const sources: { key: keyof SurveyRow; label: string }[] = [
    { key: 'creditBank', label: 'Banks' },
    { key: 'creditProviders', label: 'Suppliers' },
    { key: 'creditFamily', label: 'Family' },
    { key: 'creditGovernment', label: 'Government' },
    { key: 'creditPrivate', label: 'Private Credit' },
  ]

  return sources
    .map(({ key, label }) => ({
      source: label,
      count: rows.filter(r => (r[key] as string) === 'Sí').length,
    }))
    .sort((a, b) => b.count - a.count)
}

export function computeFormalInformalCredit(rows: SurveyRow[]): {
  formal: number
  informal: number
  formalPct: number
  informalPct: number
  chartData: FormalInformalData[]
} {
  let formal = 0
  let informal = 0

  rows.forEach(row => {
    const hasFormal = row.creditBank === 'Sí' || row.creditProviders === 'Sí' || row.creditGovernment === 'Sí'
    const hasInformal = row.creditFamily === 'Sí' || row.creditPrivate === 'Sí'
    if (hasFormal) formal++
    if (hasInformal) informal++
  })

  const total = formal + informal
  const formalPct = total > 0 ? parseFloat(((formal / total) * 100).toFixed(1)) : 0
  const informalPct = total > 0 ? parseFloat(((informal / total) * 100).toFixed(1)) : 0

  return {
    formal,
    informal,
    formalPct,
    informalPct,
    chartData: [
      { name: 'Formal', value: formal },
      { name: 'Informal', value: informal },
    ],
  }
}

export function computeBankCreditBarriers(rows: SurveyRow[]): BarrierData[] {
  const counts: Record<string, number> = {}

  rows.forEach(row => {
    const reason = row.noBankCreditReason
    if (!reason || reason === '' || reason === '-') return
    counts[reason] = (counts[reason] || 0) + 1
  })

  return Object.entries(counts)
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count)
}

export function computeCreditImpactPct(rows: SurveyRow[]): number {
  const impactRows = rows.filter(r => r.impactCredit === 'Mucho' || r.impactCredit === 'Moderado')
  const validRows = rows.filter(r => r.impactCredit && r.impactCredit !== '')
  if (validRows.length === 0) return 0
  return parseFloat(((impactRows.length / validRows.length) * 100).toFixed(1))
}

export function computeFormalInformalRatio(rows: SurveyRow[]): string {
  let formal = 0
  let informal = 0
  rows.forEach(row => {
    if (row.creditBank === 'Sí' || row.creditProviders === 'Sí' || row.creditGovernment === 'Sí') formal++
    if (row.creditFamily === 'Sí' || row.creditPrivate === 'Sí') informal++
  })
  if (informal === 0) return `${formal}:0`
  const ratio = (formal / informal).toFixed(1)
  return `${ratio}:1`
}

export function computeMainBarrier(rows: SurveyRow[]): string {
  const barriers = computeBankCreditBarriers(rows)
  if (barriers.length === 0) return 'N/A'
  return barriers[0].reason
}

export interface DigitalLevelData {
  level: string
  count: number
  percentage: number
}

export function computeDigitalLevelDistribution(rows: SurveyRow[]): DigitalLevelData[] {
  const counts: Record<string, number> = {}
  
  rows.forEach(row => {
    const level = row.digitalLevel
    if (level && level !== '' && level !== '-') {
      counts[level] = (counts[level] || 0) + 1
    }
  })
  
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  if (total === 0) return []
  
  return Object.entries(counts)
    .map(([level, count]) => ({
      level,
      count,
      percentage: parseFloat(((count / total) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.count - a.count)
}

export function computeSalaryDistribution(rows: SurveyRow[]): SalaryRangeData[] {
  const ranges = [
    { range: '< 1M', min: 0, max: 1000000 },
    { range: '1M - 2M', min: 1000000, max: 2000000 },
    { range: '2M - 3M', min: 2000000, max: 3000000 },
    { range: '3M - 5M', min: 3000000, max: 5000000 },
    { range: '5M - 10M', min: 5000000, max: 10000000 },
    { range: '> 10M', min: 10000000, max: Infinity },
  ]

  const counts: Record<string, number> = {}
  ranges.forEach(r => { counts[r.range] = 0 })

  rows.forEach(row => {
    if (!row.expectedSalary || row.expectedSalary === '-' || row.expectedSalary === '0') return
    const cleaned = row.expectedSalary.replace(/\./g, '').replace(/,/g, '.').trim()
    const num = parseFloat(cleaned)
    if (isNaN(num) || num <= 0) return

    for (const r of ranges) {
      if (num >= r.min && num < r.max) {
        counts[r.range]++
        break
      }
    }
  })

  return ranges.map(r => ({ range: r.range, count: counts[r.range] }))
}
