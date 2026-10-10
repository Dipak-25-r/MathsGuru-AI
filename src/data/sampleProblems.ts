export interface SampleProblem {
  id: string;
  chapter: string;
  topic: string;
  marks: string;
  type: 'handwritten' | 'printed';
  title: string;
  description: string;
  prompt: string;
  imageDataUrl: string;
}

// Function to encode SVG into Data URL
function createSvgDataUrl(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

// Sample 1: Handwritten Definite Integral (King's Property)
const sample1Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
  <rect width="600" height="340" fill="#fdfbf7"/>
  <!-- Ruled notebook lines -->
  <line x1="0" y1="45" x2="600" y2="45" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="0" y1="90" x2="600" y2="90" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="0" y1="135" x2="600" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="0" y1="180" x2="600" y2="180" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="0" y1="225" x2="600" y2="225" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="0" y1="270" x2="600" y2="270" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="0" y1="315" x2="600" y2="315" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="60" y1="0" x2="60" y2="340" stroke="#fca5a5" stroke-width="1.5"/>

  <!-- Handwritten Text and Math Equations -->
  <text x="75" y="38" font-family="'Comic Sans MS', 'Caveat', cursive, sans-serif" font-size="17" font-weight="bold" fill="#dc2626">GSEB March 2024 / NCERT Ex 7.11 Q.2</text>
  <text x="470" y="38" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569">[4 Marks]</text>

  <text x="75" y="80" font-family="'Comic Sans MS', 'Caveat', cursive, sans-serif" font-size="20" fill="#1e293b" font-weight="600">Q. Evaluate the definite integral:</text>

  <!-- Math Equation representation -->
  <g transform="translate(110, 115)">
    <!-- Integral sign -->
    <path d="M 12 85 C 22 80, 16 5, 26 2 C 34 0, 36 8, 30 14" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Limits -->
    <text x="32" y="15" font-family="serif" font-size="18" font-style="italic" fill="#0f172a">π/2</text>
    <text x="25" y="88" font-family="serif" font-size="18" fill="#0f172a">0</text>

    <!-- Fraction -->
    <!-- Numerator: sqrt(sin x) -->
    <text x="80" y="35" font-family="serif" font-size="24" font-style="italic" fill="#0f172a">√(sin x)</text>
    <!-- Fraction line -->
    <line x1="75" y1="46" x2="280" y2="46" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Denominator: sqrt(sin x) + sqrt(cos x) -->
    <text x="80" y="75" font-family="serif" font-size="23" font-style="italic" fill="#0f172a">√(sin x) + √(cos x)</text>
    <text x="290" y="48" font-family="serif" font-size="25" font-style="italic" fill="#0f172a">dx</text>
  </g>

  <rect x="75" y="240" width="460" height="70" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="90" y="265" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1d4ed8">📌 Student Handwritten Doubt:</text>
  <text x="90" y="290" font-family="'Comic Sans MS', cursive, sans-serif" font-size="14" fill="#334155">"Sir, should I apply King's property directly or convert to tan(x/2)? Please explain step by step in Gujarati."</text>
</svg>`;

// Sample 2: Matrices Linear System 4-Mark Problem
const sample2Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
  <rect width="600" height="340" fill="#f8fafc"/>
  <rect x="20" y="20" width="560" height="300" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  
  <rect x="40" y="35" width="160" height="26" rx="6" fill="#e0f2fe"/>
  <text x="50" y="53" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0284c7">Chapter 4: Determinants</text>
  <text x="470" y="53" font-family="sans-serif" font-size="13" font-weight="bold" fill="#dc2626">Section D (4M)</text>

  <text x="40" y="95" font-family="sans-serif" font-size="17" font-weight="bold" fill="#0f172a">Solve the following system of equations using matrix method:</text>

  <g transform="translate(60, 115)">
    <text x="20" y="25" font-family="serif" font-size="22" fill="#1e293b">2x + 3y + 3z = 5</text>
    <text x="20" y="60" font-family="serif" font-size="22" fill="#1e293b">x - 2y + z = -4</text>
    <text x="20" y="95" font-family="serif" font-size="22" fill="#1e293b">3x - y - 2z = 3</text>
  </g>

  <rect x="360" y="110" width="190" height="90" rx="8" fill="#fef3c7" stroke="#fde68a"/>
  <text x="375" y="135" font-family="sans-serif" font-size="12" font-weight="bold" fill="#92400e">⚡ Target Checklist:</text>
  <text x="375" y="155" font-family="sans-serif" font-size="12" fill="#78350f">1. Form A, X, B matrices</text>
  <text x="375" y="172" font-family="sans-serif" font-size="12" fill="#78350f">2. Compute |A| ≠ 0</text>
  <text x="375" y="189" font-family="sans-serif" font-size="12" fill="#78350f">3. Compute adj(A) &amp; X = A⁻¹B</text>

  <text x="40" y="260" font-family="'Comic Sans MS', cursive, sans-serif" font-size="14" fill="#64748b">Student note: "I always make calculation mistakes in cofactors. Show each cofactor clearly!"</text>
</svg>`;

// Sample 3: 3D Geometry Shortest Distance
const sample3Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
  <rect width="600" height="340" fill="#fdfbf7"/>
  <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" stroke-width="2"/>
  <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" stroke-width="2"/>
  <line x1="0" y1="150" x2="600" y2="150" stroke="#f1f5f9" stroke-width="2"/>
  <line x1="0" y1="200" x2="600" y2="200" stroke="#f1f5f9" stroke-width="2"/>
  <line x1="0" y1="250" x2="600" y2="250" stroke="#f1f5f9" stroke-width="2"/>
  <line x1="50" y1="0" x2="50" y2="340" stroke="#fed7aa" stroke-width="2"/>

  <text x="65" y="40" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ea580c">NCERT Chapter 11 | GSEB Board Favourite</text>
  <text x="480" y="40" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569">[4 Marks]</text>

  <text x="65" y="85" font-family="sans-serif" font-size="16" font-weight="600" fill="#1e293b">Find the shortest distance between the skew lines:</text>

  <g transform="translate(65, 105)">
    <text x="15" y="30" font-family="serif" font-size="20" fill="#0f172a">r̄ = (î + 2ĵ + k̂) + λ(î - ĵ + k̂)</text>
    <text x="15" y="70" font-family="serif" font-size="20" fill="#0f172a">r̄ = (2î - ĵ - k̂) + μ(2î + ĵ + 2k̂)</text>
  </g>

  <rect x="65" y="210" width="480" height="90" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>
  <text x="80" y="235" font-family="sans-serif" font-size="13" font-weight="bold" fill="#166534">💡 Formula Required:</text>
  <text x="80" y="260" font-family="serif" font-size="16" font-style="italic" fill="#14532d">d = | ((b̄₁ × b̄₂) · (ā₂ - ā₁)) / |b̄₁ × b̄₂| |</text>
  <text x="80" y="285" font-family="sans-serif" font-size="12" fill="#15803d">Warning: Don't forget the magnitude in denominator and absolute sign!</text>
</svg>`;

// Sample 4: Differential Equations Linear Form
const sample4Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
  <rect width="600" height="340" fill="#0f172a"/>
  <!-- Blackboard grid pattern -->
  <circle cx="50" cy="50" r="1.5" fill="#334155"/>
  <circle cx="150" cy="50" r="1.5" fill="#334155"/>
  <circle cx="250" cy="50" r="1.5" fill="#334155"/>
  <circle cx="350" cy="50" r="1.5" fill="#334155"/>
  <circle cx="450" cy="50" r="1.5" fill="#334155"/>
  <circle cx="550" cy="50" r="1.5" fill="#334155"/>

  <rect x="30" y="25" width="180" height="26" rx="6" fill="#1e293b" stroke="#334155"/>
  <text x="40" y="43" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f59e0b">Class 12 Chalkboard Doubt</text>
  <text x="480" y="43" font-family="sans-serif" font-size="13" font-weight="bold" fill="#94a3b8">Ch 9 (3/4 Marks)</text>

  <text x="40" y="90" font-family="'Caveat', cursive, sans-serif" font-size="22" fill="#f8fafc">Q. Solve the differential equation:</text>

  <g transform="translate(60, 110)">
    <text x="30" y="45" font-family="serif" font-size="30" font-style="italic" fill="#fbbf24">x (dy/dx) + 2y = x²  (x ≠ 0)</text>
  </g>

  <rect x="40" y="195" width="520" height="95" rx="8" fill="#1e293b/80" stroke="#334155"/>
  <text x="55" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#38bdf8">🔍 Common Student Slip-up:</text>
  <text x="55" y="247" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Forgetting to divide entire equation by x first to put it in standard form: dy/dx + P y = Q.</text>
  <text x="55" y="270" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Computing I.F. = e^(∫(2/x) dx) = e^(2 ln x) = x².</text>
</svg>`;

// Sample 5: Probability Bayes Theorem
const sample5Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
  <rect width="600" height="340" fill="#ffffff"/>
  <rect x="15" y="15" width="570" height="310" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
  
  <text x="40" y="45" font-family="sans-serif" font-size="15" font-weight="bold" fill="#7c3aed">Chapter 13: Probability - Bayes' Theorem</text>
  <text x="470" y="45" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626">4 Marks (Sec D)</text>

  <rect x="40" y="65" width="520" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="55" y="92" font-family="serif" font-size="16" fill="#1e293b">A doctor is called to see a sick child. The doctor knows that 90% of</text>
  <text x="55" y="118" font-family="serif" font-size="16" fill="#1e293b">the sick children in that neighborhood have the flu, and 10% have</text>
  <text x="55" y="144" font-family="serif" font-size="16" fill="#1e293b">measles. A rash is a symptom in 95% of measles cases and in only</text>
  <text x="55" y="170" font-family="serif" font-size="16" fill="#1e293b">8% of flu cases. If the child has a rash, what is the probability</text>
  <text x="55" y="196" font-family="serif" font-size="16" font-weight="bold" fill="#0f172a">that the child has measles?</text>

  <rect x="40" y="230" width="520" height="75" rx="6" fill="#f5f3ff" stroke="#ddd6fe"/>
  <text x="55" y="255" font-family="sans-serif" font-size="13" font-weight="bold" fill="#6d28d9">🎯 Examination Tip:</text>
  <text x="55" y="278" font-family="sans-serif" font-size="12" fill="#5b21b6">Define events E₁ (flu), E₂ (measles), and A (child has rash) explicitly for step marks.</text>
</svg>`;

export const SAMPLE_PROBLEMS: SampleProblem[] = [
  {
    id: 'sample-integrals',
    chapter: 'Chapter 7: Integrals / સંકલન',
    topic: "Definite Integral - King's Property",
    marks: '4 Marks (Section D)',
    type: 'handwritten',
    title: 'Definite Integral with King\'s Rule',
    description: 'Evaluate ∫[0 to π/2] √(sin x) / (√(sin x) + √(cos x)) dx.',
    prompt: 'Evaluate: Integral from 0 to pi/2 of (sqrt(sin x) / (sqrt(sin x) + sqrt(cos x))) dx. Please explain King\'s property and provide GUJCET shortcut.',
    imageDataUrl: createSvgDataUrl(sample1Svg),
  },
  {
    id: 'sample-matrices',
    chapter: 'Chapter 4: Determinants / નિશ્ચાયક',
    topic: 'Matrix Method Linear Equations',
    marks: '4 Marks (Section D)',
    type: 'printed',
    title: '3-Variable Matrix Inversion System',
    description: 'Solve 2x + 3y + 3z = 5, x - 2y + z = -4, 3x - y - 2z = 3 using matrix method.',
    prompt: 'Solve the system using matrix method: 2x + 3y + 3z = 5, x - 2y + z = -4, 3x - y - 2z = 3. Show all cofactors and adj(A) clearly.',
    imageDataUrl: createSvgDataUrl(sample2Svg),
  },
  {
    id: 'sample-3d',
    chapter: 'Chapter 11: 3D Geometry / ત્રિ-પરિમાણીય ભૂમિતિ',
    topic: 'Shortest Distance Between Skew Lines',
    marks: '4 Marks (Section D)',
    type: 'handwritten',
    title: 'Shortest Distance Formula',
    description: 'Find shortest distance between r̄ = (î+2ĵ+k̂) + λ(î-ĵ+k̂) and r̄ = (2î-ĵ-k̂) + μ(2î+ĵ+2k̂).',
    prompt: 'Find the shortest distance between lines r = (i + 2j + k) + lambda(i - j + k) and r = (2i - j - k) + mu(2i + j + 2k). Include vector cross product steps.',
    imageDataUrl: createSvgDataUrl(sample3Svg),
  },
  {
    id: 'sample-de',
    chapter: 'Chapter 9: Differential Equations / વિકલ સમીકરણો',
    topic: 'First-Order Linear Differential Equation',
    marks: '3/4 Marks (Section C/D)',
    type: 'handwritten',
    title: 'Linear DE with Integrating Factor',
    description: 'Solve x(dy/dx) + 2y = x² (x ≠ 0).',
    prompt: 'Solve the differential equation: x (dy/dx) + 2y = x^2 (x != 0). Show how I.F. is calculated and state common GSEB mistakes.',
    imageDataUrl: createSvgDataUrl(sample4Svg),
  },
  {
    id: 'sample-bayes',
    chapter: 'Chapter 13: Probability / સંભાવના',
    topic: "Bayes' Theorem Word Problem",
    marks: '4 Marks (Section D)',
    type: 'printed',
    title: 'Doctor Rash & Measles Probability',
    description: 'Calculate posterior probability P(Measles | Rash) given 90% flu, 10% measles.',
    prompt: 'A doctor is called to see a sick child. The doctor knows that 90% of the sick children in that neighborhood have the flu, and 10% have measles. A rash is a symptom in 95% of measles cases and in only 8% of flu cases. If the child has a rash, what is the probability that the child has measles? State formulas and step distribution.',
    imageDataUrl: createSvgDataUrl(sample5Svg),
  },
];
