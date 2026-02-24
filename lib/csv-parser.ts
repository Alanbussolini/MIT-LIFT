export interface SurveyRow {
  finished: boolean
  teamName: string
  businessName: string
  surveyorName: string
  latitude: string
  longitude: string
  latitudeCorrect: string
  longitudeCorrect: string
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
      latitudeCorrect: cols[47]?.trim() || '',
      longitudeCorrect: cols[48]?.trim() || '',
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
  const order = ['Universidad y más', 'Secundaria', 'Primaria', 'Sin estudios']
  const counts: Record<string, number> = {}
  order.forEach(o => { counts[o] = 0 })
  
  rows.forEach(row => {
    let level = row.educationLevel
    if (level === 'Preparatoria') {
      level = 'Secundaria'
    }
    if (counts[level] !== undefined) counts[level]++
  })
  
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  if (total === 0) return []

  return order.map(level => ({
    level,
    percentage: parseFloat(((counts[level] / total) * 100).toFixed(2)),
  }))
}

export interface MostFrequentBusinessType {
  type: string
  count: number
  percentage: number
}

export function computeMostFrequentBusinessType(rows: SurveyRow[]): MostFrequentBusinessType | null {
  const counts: Record<string, number> = {}
  
  rows.forEach(row => {
    const type = row.businessType
    if (type && type !== '') {
      counts[type] = (counts[type] || 0) + 1
    }
  })
  
  const entries = Object.entries(counts)
  if (entries.length === 0) return null
  
  const total = entries.reduce((sum, [, count]) => sum + count, 0)
  const [topType, topCount] = entries.reduce((a, b) => a[1] > b[1] ? a : b)
  
  return {
    type: topType,
    count: topCount,
    percentage: parseFloat(((topCount / total) * 100).toFixed(1)),
  }
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
    { key: 'creditBank', label: 'Bancos' },
    { key: 'creditProviders', label: 'Proveedores' },
    { key: 'creditFamily', label: 'Familia' },
    { key: 'creditGovernment', label: 'Gobierno' },
    { key: 'creditPrivate', label: 'Crédito Privado' },
  ]

  return sources
    .map(({ key, label }) => ({
      source: label,
      count: rows.filter(r => {
        const val = (r[key] as string)?.toLowerCase().trim()
        return val === 'sí' || val === 'si' || val === 'yes' || val === 'y' || val === 'true'
      }).length,
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
    const hasFormal = 
      row.creditBank === 'Sí' || row.creditBank === 'Si' ||
      row.creditPrivate === 'Sí' || row.creditPrivate === 'Si' ||
      row.creditGovernment === 'Sí' || row.creditGovernment === 'Si'
    const hasInformal = 
      row.creditProviders === 'Sí' || row.creditProviders === 'Si' ||
      row.creditFamily === 'Sí' || row.creditFamily === 'Si'
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
      { name: 'Institucional', value: formal },
      { name: 'No Institucional', value: informal },
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

export interface WantsGrowthData {
  name: string
  value: number
  percentage: number
}

export function computeWantsGrowth(rows: SurveyRow[]): {
  yes: number
  no: number
  yesPct: number
  noPct: number
  chartData: WantsGrowthData[]
} {
  const yes = rows.filter(r => r.wantsGrowth === 'Sí').length
  const no = rows.filter(r => r.wantsGrowth === 'No').length
  const total = yes + no
  const yesPct = total > 0 ? parseFloat(((yes / total) * 100).toFixed(1)) : 0
  const noPct = total > 0 ? parseFloat(((no / total) * 100).toFixed(1)) : 0
  
  return {
    yes,
    no,
    yesPct,
    noPct,
    chartData: [
      { name: 'Quiere crecer', value: yes, percentage: yesPct },
      { name: 'No quiere crecer', value: no, percentage: noPct },
    ],
  }
}

export interface NoGrowthReasonData {
  reason: string
  count: number
  percentage: number
}

export function computeNoGrowthReasons(rows: SurveyRow[]): NoGrowthReasonData[] {
  const counts: Record<string, number> = {}
  
  rows.forEach(row => {
    const reason = row.noGrowthReason
    if (reason && reason !== '' && reason !== '-' && reason !== 'No aplica') {
      counts[reason] = (counts[reason] || 0) + 1
    }
  })
  
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  if (total === 0) return []
  
  return Object.entries(counts)
    .map(([reason, count]) => ({
      reason,
      count,
      percentage: parseFloat(((count / total) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.count - a.count)
}

export interface DigitalToolsData {
  tool: string
  count: number
  percentage: number
}

export function computeDigitalTools(rows: SurveyRow[]): DigitalToolsData[] {
  const counts: Record<string, number> = {}
  
  rows.forEach(row => {
    const tools = row.digitalTools
    if (tools && tools !== '' && tools !== '-') {
      const toolList = tools.split(',').map(t => t.trim()).filter(t => t)
      toolList.forEach(tool => {
        counts[tool] = (counts[tool] || 0) + 1
      })
    }
  })
  
  const total = rows.filter(r => r.digitalTools && r.digitalTools !== '' && r.digitalTools !== '-').length
  if (total === 0) return []
  
  return Object.entries(counts)
    .map(([tool, count]) => ({
      tool,
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

export interface ScatterPoint {
  x: number
  y: number
}

export interface LinearRegressionResult {
  slope: number
  intercept: number
  rSquared: number
  pValue: number
  correlation: number
  n: number
  standardError: number
  tStatistic: number
  scatterData: ScatterPoint[]
  regressionLine: ScatterPoint[]
  xLabel: string
  yLabel: string
  interpretation: string
  hasCorrelation: boolean
}

function salesExpectationToNumber(value: string): number | null {
  if (!value) return null
  const normalized = value.toLowerCase().trim()
  if (normalized.includes('mayor') || normalized.includes('higher') || normalized.includes('increase')) return 1
  if (normalized.includes('igual') || normalized.includes('same') || normalized.includes('equal')) return 0
  if (normalized.includes('menor') || normalized.includes('lower') || normalized.includes('decrease')) return -1
  return null
}

function digitalLevelToNumber(level: string): number | null {
  if (!level || level === '' || level === '-') return null
  const normalized = level.toLowerCase().trim()
  if (normalized.includes('alto') || normalized.includes('high')) return 3
  if (normalized.includes('medio') || normalized.includes('medium') || normalized.includes('moderate')) return 2
  if (normalized.includes('bajo') || normalized.includes('low') || normalized.includes('basic')) return 1
  if (normalized.includes('ninguno') || normalized.includes('none') || normalized.includes('no')) return 0
  const knownLevels: Record<string, number> = {
    'alto': 3,
    'medio': 2,
    'bajo': 1,
    'ninguno': 0,
  }
  return knownLevels[normalized] ?? null
}

function creditScore(row: SurveyRow): number {
  let score = 0
  if (row.creditBank === 'Sí') score += 1
  if (row.creditProviders === 'Sí') score += 1
  if (row.creditFamily === 'Sí') score += 1
  if (row.creditGovernment === 'Sí') score += 1
  if (row.creditPrivate === 'Sí') score += 1
  return score
}

function computeLinearRegression(xData: number[], yData: number[]): {
  slope: number
  intercept: number
  rSquared: number
  correlation: number
  standardError: number
  tStatistic: number
  pValue: number
} {
  const n = xData.length
  if (n < 3) {
    return { slope: 0, intercept: 0, rSquared: 0, correlation: 0, standardError: 0, tStatistic: 0, pValue: 1 }
  }

  const xMean = xData.reduce((a, b) => a + b, 0) / n
  const yMean = yData.reduce((a, b) => a + b, 0) / n

  let ssXy = 0
  let ssXx = 0
  let ssYy = 0

  for (let i = 0; i < n; i++) {
    const dx = xData[i] - xMean
    const dy = yData[i] - yMean
    ssXy += dx * dy
    ssXx += dx * dx
    ssYy += dy * dy
  }

  const slope = ssXx !== 0 ? ssXy / ssXx : 0
  const intercept = yMean - slope * xMean

  const correlation = ssXx > 0 && ssYy > 0 ? ssXy / Math.sqrt(ssXx * ssYy) : 0
  const rSquared = correlation * correlation

  let sse = 0
  for (let i = 0; i < n; i++) {
    const predicted = slope * xData[i] + intercept
    sse += (yData[i] - predicted) ** 2
  }

  const standardError = n > 2 ? Math.sqrt(sse / (n - 2)) : 0
  const seSlope = ssXx > 0 ? standardError / Math.sqrt(ssXx) : 0
  const tStatistic = seSlope > 0 ? slope / seSlope : 0

  const df = n - 2
  const pValue = tDistributionPValue(Math.abs(tStatistic), df)

  return { slope, intercept, rSquared, correlation, standardError, tStatistic, pValue }
}

function tDistributionPValue(t: number, df: number): number {
  if (df < 1 || t < 0) return 1
  
  const x = df / (df + t * t)
  return 2 * incompleteBeta(df / 2, 0.5, x)
}

function incompleteBeta(a: number, b: number, x: number): number {
  if (x < 0 || x > 1) return 0
  if (x === 0) return 0
  if (x === 1) return 1
  
  const maxIterations = 200
  const eps = 1e-10
  
  const front = Math.exp(
    logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x)
  ) / a
  
  let f = 1
  let c = 1
  let d = 1 - (a + b) * x / (a + 1)
  if (Math.abs(d) < eps) d = eps
  d = 1 / d
  let h = d
  
  for (let m = 1; m <= maxIterations; m++) {
    const m2 = 2 * m
    let aa = m * (b - m) * x / ((a + m2 - 1) * (a + m2))
    d = 1 + aa * d
    if (Math.abs(d) < eps) d = eps
    c = 1 + aa / c
    if (Math.abs(c) < eps) c = eps
    d = 1 / d
    h *= d * c
    
    aa = -(a + m) * (a + b + m) * x / ((a + m2) * (a + m2 + 1))
    d = 1 + aa * d
    if (Math.abs(d) < eps) d = eps
    c = 1 + aa / c
    if (Math.abs(c) < eps) c = eps
    d = 1 / d
    const delta = d * c
    h *= delta
    
    if (Math.abs(delta - 1) < eps) break
  }
  
  return front * h
}

function logGamma(x: number): number {
  const cof = [
    76.18009172947146,
    -86.50532032941677,
    24.01409824083091,
    -1.231739572450155,
    0.1208650973866179e-2,
    -0.5395239384953e-5
  ]
  
  let ser = 1.000000000190015
  let tmp = x + 5.5
  tmp -= (x + 0.5) * Math.log(tmp)
  
  for (let j = 0; j < 6; j++) {
    ser += cof[j] / (x + j + 1)
  }
  
  return -tmp + Math.log(2.5066282746310005 * ser / x)
}

function generateRegressionLine(slope: number, intercept: number, xMin: number, xMax: number): ScatterPoint[] {
  return [
    { x: xMin, y: slope * xMin + intercept },
    { x: xMax, y: slope * xMax + intercept },
  ]
}

function interpretRegression(correlation: number, pValue: number, rSquared: number): { interpretation: string; hasCorrelation: boolean } {
  const absR = Math.abs(correlation)
  const isSignificant = pValue < 0.05
  
  let strength: string
  if (absR < 0.1) strength = 'muy débil o inexistente'
  else if (absR < 0.3) strength = 'débil'
  else if (absR < 0.5) strength = 'moderada'
  else if (absR < 0.7) strength = 'considerable'
  else strength = 'fuerte'
  
  const direction = correlation > 0 ? 'positiva' : 'negativa'
  
  let interpretation = `La correlación es ${strength} (${direction}). `
  interpretation += `R² = ${(rSquared * 100).toFixed(1)}% indica que la variable independiente explica el ${(rSquared * 100).toFixed(1)}% de la varianza. `
  interpretation += `El p-valor = ${pValue.toFixed(4)} ${isSignificant ? 'es estadísticamente significativo (p < 0.05)' : 'no es estadísticamente significativo (p ≥ 0.05)'}. `
  
  if (isSignificant && absR >= 0.1) {
    interpretation += `Existe evidencia estadística para afirmar que hay una correlación ${direction} ${strength}.`
  } else if (!isSignificant) {
    interpretation += `No hay evidencia suficiente para rechazar la hipótesis nula de que no existe correlación.`
  } else {
    interpretation += `Aunque el p-valor sugiere significancia, la magnitud de la correlación es demasiado pequeña para ser relevante.`
  }
  
  return { interpretation, hasCorrelation: isSignificant && absR >= 0.1 }
}

export function computeCreditSalesExpectationRegression(rows: SurveyRow[]): LinearRegressionResult {
  const points: { x: number; y: number }[] = []
  
  rows.forEach(row => {
    const x = creditScore(row)
    const y = salesExpectationToNumber(row.salesExpectation)
    if (y !== null) {
      points.push({ x, y })
    }
  })
  
  if (points.length < 3) {
    return {
      slope: 0,
      intercept: 0,
      rSquared: 0,
      pValue: 1,
      correlation: 0,
      n: points.length,
      standardError: 0,
      tStatistic: 0,
      scatterData: points,
      regressionLine: [],
      xLabel: 'Nivel de Acceso al Crédito (0-5)',
      yLabel: 'Expectativa de Ventas (-1 a 1)',
      interpretation: 'Datos insuficientes para realizar el análisis.',
      hasCorrelation: false,
    }
  }
  
  const xData = points.map(p => p.x)
  const yData = points.map(p => p.y)
  const stats = computeLinearRegression(xData, yData)
  const { interpretation, hasCorrelation } = interpretRegression(stats.correlation, stats.pValue, stats.rSquared)
  
  const xMin = Math.min(...xData)
  const xMax = Math.max(...xData)
  
  return {
    ...stats,
    n: points.length,
    scatterData: points,
    regressionLine: generateRegressionLine(stats.slope, stats.intercept, xMin, xMax),
    xLabel: 'Nivel de Acceso al Crédito (0-5)',
    yLabel: 'Expectativa de Ventas (-1 a 1)',
    interpretation,
    hasCorrelation,
  }
}

export function computeTechnologySalesExpectationRegression(rows: SurveyRow[]): LinearRegressionResult {
  const points: { x: number; y: number }[] = []
  
  rows.forEach(row => {
    const x = digitalLevelToNumber(row.digitalLevel)
    const y = salesExpectationToNumber(row.salesExpectation)
    if (x !== null && y !== null) {
      points.push({ x, y })
    }
  })
  
  if (points.length < 3) {
    return {
      slope: 0,
      intercept: 0,
      rSquared: 0,
      pValue: 1,
      correlation: 0,
      n: points.length,
      standardError: 0,
      tStatistic: 0,
      scatterData: points,
      regressionLine: [],
      xLabel: 'Nivel de Tecnología (0-3)',
      yLabel: 'Expectativa de Ventas (-1 a 1)',
      interpretation: 'Datos insuficientes para realizar el análisis.',
      hasCorrelation: false,
    }
  }
  
  const xData = points.map(p => p.x)
  const yData = points.map(p => p.y)
  const stats = computeLinearRegression(xData, yData)
  const { interpretation, hasCorrelation } = interpretRegression(stats.correlation, stats.pValue, stats.rSquared)
  
  const xMin = Math.min(...xData)
  const xMax = Math.max(...xData)
  
  return {
    ...stats,
    n: points.length,
    scatterData: points,
    regressionLine: generateRegressionLine(stats.slope, stats.intercept, xMin, xMax),
    xLabel: 'Nivel de Tecnología (0-3)',
    yLabel: 'Expectativa de Ventas (-1 a 1)',
    interpretation,
    hasCorrelation,
  }
}

function parseExpectedSalary(value: string): number | null {
  if (!value || value === '' || value === '-' || value === '0') return null
  const cleaned = value.replace(/\./g, '').replace(/,/g, '.').trim()
  const num = parseFloat(cleaned)
  return isNaN(num) || num <= 0 ? null : num
}

export function computeTechnologySalaryRegression(rows: SurveyRow[]): LinearRegressionResult {
  const points: { x: number; y: number }[] = []
  
  rows.forEach(row => {
    const x = digitalLevelToNumber(row.digitalLevel)
    const y = parseExpectedSalary(row.expectedSalary)
    if (x !== null && y !== null) {
      points.push({ x, y })
    }
  })
  
  if (points.length < 3) {
    return {
      slope: 0,
      intercept: 0,
      rSquared: 0,
      pValue: 1,
      correlation: 0,
      n: points.length,
      standardError: 0,
      tStatistic: 0,
      scatterData: points,
      regressionLine: [],
      xLabel: 'Nivel de Tecnología (0-3)',
      yLabel: 'Sueldo Pretendido (MXN)',
      interpretation: 'Datos insuficientes para realizar el análisis.',
      hasCorrelation: false,
    }
  }
  
  const xData = points.map(p => p.x)
  const yData = points.map(p => p.y)
  const stats = computeLinearRegression(xData, yData)
  const { interpretation, hasCorrelation } = interpretRegression(stats.correlation, stats.pValue, stats.rSquared)
  
  const xMin = Math.min(...xData)
  const xMax = Math.max(...xData)
  
  return {
    ...stats,
    n: points.length,
    scatterData: points,
    regressionLine: generateRegressionLine(stats.slope, stats.intercept, xMin, xMax),
    xLabel: 'Nivel de Tecnología (0-3)',
    yLabel: 'Sueldo Pretendido (MXN)',
    interpretation,
    hasCorrelation,
  }
}

export function computeTechnologyBusinessAgeRegression(rows: SurveyRow[]): LinearRegressionResult {
  const points: { x: number; y: number }[] = []
  
  rows.forEach(row => {
    const x = digitalLevelToNumber(row.digitalLevel)
    const y = row.businessAge
    if (x !== null && y !== null && y >= 0) {
      points.push({ x, y })
    }
  })
  
  if (points.length < 3) {
    return {
      slope: 0,
      intercept: 0,
      rSquared: 0,
      pValue: 1,
      correlation: 0,
      n: points.length,
      standardError: 0,
      tStatistic: 0,
      scatterData: points,
      regressionLine: [],
      xLabel: 'Nivel de Tecnología (0-3)',
      yLabel: 'Edad del Negocio (años)',
      interpretation: 'Datos insuficientes para realizar el análisis.',
      hasCorrelation: false,
    }
  }
  
  const xData = points.map(p => p.x)
  const yData = points.map(p => p.y)
  const stats = computeLinearRegression(xData, yData)
  const { interpretation, hasCorrelation } = interpretRegression(stats.correlation, stats.pValue, stats.rSquared)
  
  const xMin = Math.min(...xData)
  const xMax = Math.max(...xData)
  
  return {
    ...stats,
    n: points.length,
    scatterData: points,
    regressionLine: generateRegressionLine(stats.slope, stats.intercept, xMin, xMax),
    xLabel: 'Nivel de Tecnología (0-3)',
    yLabel: 'Edad del Negocio (años)',
    interpretation,
    hasCorrelation,
  }
}

export interface SalaryByTechLevel {
  level: string
  levelNum: number
  salaries: number[]
  min: number
  q1: number
  median: number
  q3: number
  max: number
  mean: number
}

export interface SalesByTechLevel {
  level: string
  levelNum: number
  menores: number
  iguales: number
  mayores: number
  total: number
}

export interface TechSummary {
  averageLevel: number
  averageLevelLabel: string
  moderatePct: number
  mainTechnologies: { name: string; percentage: number }[]
  electronicPaymentsPct: number
  messagingAppsPct: number
}

export function computeTechSummary(rows: SurveyRow[]): TechSummary {
  const levelMap: Record<string, number> = {
    'Ninguno': 0,
    'Bajo': 1,
    'Básico': 1,
    'Medio': 2,
    'Alto': 3,
  }
  
  const levelNames = ['Ninguno', 'Básico', 'Medio', 'Alto']
  const levelCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 }
  
  let totalWithLevel = 0
  
  rows.forEach(row => {
    if (row.digitalLevel) {
      const levelNum = levelMap[row.digitalLevel]
      if (levelNum !== undefined) {
        levelCounts[levelNum]++
        totalWithLevel++
      }
    }
  })
  
  const moderatePct = totalWithLevel > 0 ? parseFloat(((levelCounts[2] / totalWithLevel) * 100).toFixed(1)) : 0
  
  let sumLevel = 0
  Object.entries(levelCounts).forEach(([level, count]) => {
    sumLevel += parseInt(level) * count
  })
  const averageLevel = totalWithLevel > 0 ? sumLevel / totalWithLevel : 0
  const averageLevelLabel = levelNames[Math.round(averageLevel)] || 'N/A'
  
  const toolCounts: Record<string, number> = {}
  let totalWithTools = 0
  
  rows.forEach(row => {
    if (row.digitalTools && row.digitalTools !== '' && row.digitalTools !== '-') {
      const tools = row.digitalTools.split(',').map(t => t.trim()).filter(t => t)
      tools.forEach(tool => {
        toolCounts[tool] = (toolCounts[tool] || 0) + 1
      })
      totalWithTools++
    }
  })
  
  const toolPercentages = Object.entries(toolCounts)
    .map(([tool, count]) => ({
      name: tool,
      percentage: totalWithTools > 0 ? parseFloat(((count / totalWithTools) * 100).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)
  
  const electronicKeywords = ['pago', 'transferencia', 'mercadopago', 'qr', 'pos', 'débito', 'crédito', 'tarjeta']
  const messagingKeywords = ['whatsapp', 'mensaje', 'teléfono', 'celular', 'llamada', 'telegram', 'signal']
  
  let electronicPayments = 0
  let messagingApps = 0
  
  Object.entries(toolCounts).forEach(([tool, count]) => {
    const toolLower = tool.toLowerCase()
    if (electronicKeywords.some(k => toolLower.includes(k))) {
      electronicPayments += count
    }
    if (messagingKeywords.some(k => toolLower.includes(k))) {
      messagingApps += count
    }
  })
  
  const electronicPaymentsPct = totalWithTools > 0 ? parseFloat(((electronicPayments / totalWithTools) * 100).toFixed(1)) : 0
  const messagingAppsPct = totalWithTools > 0 ? parseFloat(((messagingApps / totalWithTools) * 100).toFixed(1)) : 0
  
  return {
    averageLevel,
    averageLevelLabel,
    moderatePct,
    mainTechnologies: toolPercentages.slice(0, 5),
    electronicPaymentsPct,
    messagingAppsPct,
  }
}

export interface GeoPoint {
  lat: number
  lng: number
  businessType: string
  businessName: string
}

export function computeAMBAgeoPoints(rows: SurveyRow[]): GeoPoint[] {
  const points: GeoPoint[] = []
  
  const AMBA_BOUNDS = {
    latMin: -35.0,
    latMax: -34.3,
    lngMin: -59.0,
    lngMax: -58.0,
  }
  
  rows.forEach(row => {
    if (row.latitude && row.longitude) {
      const lat = parseFloat(row.latitude.replace(',', '.'))
      const lng = parseFloat(row.longitude.replace(',', '.'))
      
      if (
        !isNaN(lat) &&
        !isNaN(lng) &&
        lat >= AMBA_BOUNDS.latMin &&
        lat <= AMBA_BOUNDS.latMax &&
        lng >= AMBA_BOUNDS.lngMin &&
        lng <= AMBA_BOUNDS.lngMax
      ) {
        points.push({
          lat,
          lng,
          businessType: row.businessType || 'Unknown',
          businessName: row.businessName || '',
        })
      }
    }
  })
  
  return points
}

export function computeBuenosAiresMapPoints(rows: SurveyRow[]): GeoPoint[] {
  const points: GeoPoint[] = []
  
  rows.forEach(row => {
    const latStr = row.latitudeCorrect || row.latitude
    const lngStr = row.longitudeCorrect || row.longitude
    
    if (latStr && lngStr) {
      const lat = parseFloat(latStr.replace(',', '.'))
      const lng = parseFloat(lngStr.replace(',', '.'))
      
      if (!isNaN(lat) && !isNaN(lng)) {
        points.push({
          lat,
          lng,
          businessType: row.businessType || 'Unknown',
          businessName: row.businessName || '',
        })
      }
    }
  })
  
  return points
}

export function computeSalaryByTechLevel(rows: SurveyRow[]): SalaryByTechLevel[] {
  const levelMap: Record<string, number> = {
    'Ninguno': 0,
    'Bajo': 1,
    'Básico': 1,
    'Medio': 2,
    'Alto': 3,
  }
  
  const levelNames = ['Ninguno', 'Básico', 'Medio', 'Alto']
  const salariesByLevel: Record<number, number[]> = { 0: [], 1: [], 2: [], 3: [] }
  
  rows.forEach(row => {
    if (row.expectedSalary && row.digitalLevel) {
      const salary = parseExpectedSalary(row.expectedSalary)
      const levelNum = levelMap[row.digitalLevel]
      
      if (salary && salary > 0 && levelNum !== undefined && levelNum >= 0) {
        salariesByLevel[levelNum].push(salary)
      }
    }
  })
  
  return levelNames.map((level, idx) => {
    const salaries = salariesByLevel[idx].sort((a, b) => a - b)
    if (salaries.length === 0) {
      return {
        level,
        levelNum: idx,
        salaries: [],
        min: 0,
        q1: 0,
        median: 0,
        q3: 0,
        max: 0,
        mean: 0,
      }
    }
    
    const min = salaries[0]
    const max = salaries[salaries.length - 1]
    const mean = salaries.reduce((a, b) => a + b, 0) / salaries.length
    const median = getPercentile(salaries, 50)
    const q1 = getPercentile(salaries, 25)
    const q3 = getPercentile(salaries, 75)
    
    return { level, levelNum: idx, salaries, min, q1, median, q3, max, mean }
  })
}

export function computeSalesByTechLevel(rows: SurveyRow[]): SalesByTechLevel[] {
  const levelMap: Record<string, number> = {
    'Ninguno': 0,
    'Bajo': 1,
    'Básico': 1,
    'Medio': 2,
    'Alto': 3,
  }
  
  const levelNames = ['Ninguno', 'Básico', 'Medio', 'Alto']
  const salesByLevel: Record<number, { menores: number; iguales: number; mayores: number }> = {
    0: { menores: 0, iguales: 0, mayores: 0 },
    1: { menores: 0, iguales: 0, mayores: 0 },
    2: { menores: 0, iguales: 0, mayores: 0 },
    3: { menores: 0, iguales: 0, mayores: 0 },
  }
  
  rows.forEach(row => {
    if (row.salesComparison && row.digitalLevel) {
      const levelNum = levelMap[row.digitalLevel]
      const comparison = row.salesComparison.toLowerCase()
      
      if (levelNum !== undefined && levelNum >= 0) {
        if (comparison.includes('menor')) {
          salesByLevel[levelNum].menores++
        } else if (comparison.includes('mayor')) {
          salesByLevel[levelNum].mayores++
        } else {
          salesByLevel[levelNum].iguales++
        }
      }
    }
  })
  
  return levelNames.map((level, idx) => {
    const data = salesByLevel[idx]
    const total = data.menores + data.iguales + data.mayores
    return {
      level,
      levelNum: idx,
      menores: total > 0 ? parseFloat(((data.menores / total) * 100).toFixed(1)) : 0,
      iguales: total > 0 ? parseFloat(((data.iguales / total) * 100).toFixed(1)) : 0,
      mayores: total > 0 ? parseFloat(((data.mayores / total) * 100).toFixed(1)) : 0,
      total,
    }
  })
}

function getPercentile(sortedArr: number[], p: number): number {
  if (sortedArr.length === 0) return 0
  const index = (p / 100) * (sortedArr.length - 1)
  const lower = Math.floor(index)
  const upper = Math.ceil(index)
  if (lower === upper) return sortedArr[lower]
  return sortedArr[lower] + (sortedArr[upper] - sortedArr[lower]) * (index - lower)
}
