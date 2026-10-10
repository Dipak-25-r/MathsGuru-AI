export interface ChapterInfo {
  id: number;
  part: 1 | 2;
  titleEn: string;
  titleGu: string;
  weightage: string;
  summaryEn: string;
  summaryGu: string;
  formulas: {
    nameEn: string;
    nameGu: string;
    latex: string;
    note?: string;
  }[];
  sampleProblems: {
    title: string;
    question: string;
    marks: string;
  }[];
  pitfalls: string[];
  gujcetTricks: string[];
}

export const CLASS_12_CHAPTERS: ChapterInfo[] = [
  {
    id: 1,
    part: 1,
    titleEn: 'Relations and Functions',
    titleGu: 'સંબંધ અને વિધેય',
    weightage: '4 - 5 Marks',
    summaryEn: 'Equivalence relations, reflexive, symmetric, transitive, one-one (injective), onto (surjective), and bijective functions.',
    summaryGu: 'સામ્ય સંબંધ (સ્વવાચક, સંમિત, પરંપરિત) અને એક-એક તથા વ્યાપ્ત વિધેયો.',
    formulas: [
      {
        nameEn: 'Equivalence Relation Condition',
        nameGu: 'સામ્ય સંબંધની શરતો',
        latex: 'R \\text{ is reflexive: } (a,a) \\in R, \\text{ symmetric: } (a,b) \\in R \\implies (b,a) \\in R, \\text{ transitive: } (a,b), (b,c) \\in R \\implies (a,c) \\in R',
      },
      {
        nameEn: 'One-One (Injective) Test',
        nameGu: 'એક-એક વિધેયની કસોટી',
        latex: 'f(x_1) = f(x_2) \\implies x_1 = x_2',
      },
      {
        nameEn: 'Onto (Surjective) Condition',
        nameGu: 'વ્યાપ્ત વિધેયની શરત',
        latex: '\\text{Range}(f) = \\text{Codomain}(f)',
      },
    ],
    sampleProblems: [
      {
        title: 'Equivalence Relation Check',
        question: 'Let T be the set of all triangles in a plane with R a relation in T given by R = {(T1, T2) : T1 is congruent to T2}. Show that R is an equivalence relation.',
        marks: '3 Marks',
      },
      {
        title: 'Bijective Function Verification',
        question: 'Show that the function f: R -> R defined by f(x) = 3 - 4x is one-one and onto (bijective).',
        marks: '2 Marks',
      },
    ],
    pitfalls: [
      'Forgetting to test all three properties (Reflexive, Symmetric, Transitive) when proving an equivalence relation.',
      'Assuming Range = Codomain without verifying that every y in the codomain has a pre-image in the domain.',
    ],
    gujcetTricks: [
      'If f\'(x) > 0 for all x or f\'(x) < 0 for all x (strictly monotonic), then f is strictly one-one.',
      'Total number of relations from set A (|A|=m) to B (|B|=n) is 2^(m*n).',
    ],
  },
  {
    id: 2,
    part: 1,
    titleEn: 'Inverse Trigonometric Functions',
    titleGu: 'ત્રિકોણમિતીય પ્રતિવિધેયો',
    weightage: '4 - 6 Marks',
    summaryEn: 'Principal value branches, domain & range of inverse trig functions, and basic identities.',
    summaryGu: 'મુખ્ય કિંમત શાખાઓ, પ્રદેશ અને વિસ્તાર, પ્રતિવિધેયોના અગત્યના નિત્યસમો.',
    formulas: [
      {
        nameEn: 'Principal Branches',
        nameGu: 'મુખ્ય શાખાઓ',
        latex: '\\sin^{-1} x \\in [-\\frac{\\pi}{2}, \\frac{\\pi}{2}], \\quad \\cos^{-1} x \\in [0, \\pi], \\quad \\tan^{-1} x \\in (-\\frac{\\pi}{2}, \\frac{\\pi}{2})',
      },
      {
        nameEn: 'Negative Argument Identities',
        nameGu: 'ઋણ સંખ્યાઓ માટેના સૂત્રો',
        latex: '\\sin^{-1}(-x) = -\\sin^{-1}(x), \\quad \\cos^{-1}(-x) = \\pi - \\cos^{-1}(x)',
      },
      {
        nameEn: 'Sum of Complementary Inverses',
        nameGu: 'કોટિકોણ સરવાળા સૂત્રો',
        latex: '\\sin^{-1} x + \\cos^{-1} x = \\frac{\\pi}{2}, \\quad \\tan^{-1} x + \\cot^{-1} x = \\frac{\\pi}{2}',
      },
      {
        nameEn: 'Two Arctan Addition',
        nameGu: 'ટેન ઇન્વર્સ સરવાળા સૂત્ર',
        latex: '\\tan^{-1} x + \\tan^{-1} y = \\tan^{-1}\\left(\\frac{x+y}{1-xy}\\right) \\quad (xy < 1)',
      },
    ],
    sampleProblems: [
      {
        title: 'Principal Value Evaluation',
        question: 'Find the principal value of cos^(-1)(-1/2) + 2 sin^(-1)(1/2).',
        marks: '2 Marks',
      },
      {
        title: 'Inverse Trig Simplification',
        question: 'Prove that tan^(-1)(1/2) + tan^(-1)(2/11) = tan^(-1)(3/4).',
        marks: '3 Marks',
      },
    ],
    pitfalls: [
      'Writing cos^(-1)(-x) = -cos^(-1)(x) instead of the correct pi - cos^(-1)(x).',
      'Forgetting that sin^(-1)(sin(2pi/3)) is NOT 2pi/3, because 2pi/3 is outside [-pi/2, pi/2]!',
    ],
    gujcetTricks: [
      'In GUJCET MCQs, substitute simple test angles like x = 0 or x = 1 to eliminate options quickly.',
      'Check whether xy < 1 before applying tan^(-1) addition, otherwise add pi if x > 0, y > 0.',
    ],
  },
  {
    id: 3,
    part: 1,
    titleEn: 'Matrices',
    titleGu: 'શ્રેણિક',
    weightage: '5 - 6 Marks',
    summaryEn: 'Matrix operations, transpose, symmetric and skew-symmetric matrices, elementary operations and matrix invertibility.',
    summaryGu: 'શ્રેણિકના સરવાળા-ગુણાકાર, પરિવર્ત શ્રેણિક, સંમિત અને વિષમ સંમિત શ્રેણિક.',
    formulas: [
      {
        nameEn: 'Matrix Multiplication Rule',
        nameGu: 'શ્રેણિક ગુણાકાર શરત',
        latex: 'A_{m \\times n} \\cdot B_{n \\times p} = C_{m \\times p} \\quad (AB \\neq BA \\text{ in general})',
      },
      {
        nameEn: 'Transpose Reversal Property',
        nameGu: 'પરિવર્ત શ્રેણિક નિયમ',
        latex: '(AB)^T = B^T A^T, \\quad (A+B)^T = A^T + B^T',
      },
      {
        nameEn: 'Symmetric & Skew Decomposition',
        nameGu: 'સંમિત અને વિષમ સંમિત વિભાજન',
        latex: 'A = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T)',
      },
    ],
    sampleProblems: [
      {
        title: 'Symmetric Decomposition',
        question: 'Express the matrix A = [[3, 5], [1, -1]] as the sum of a symmetric and a skew-symmetric matrix.',
        marks: '3 Marks',
      },
      {
        title: 'Matrix Equation Proof',
        question: 'If A = [[3, 1], [-1, 2]], show that A^2 - 5A + 7I = O. Hence find A^(-1).',
        marks: '3 Marks',
      },
    ],
    pitfalls: [
      'Assuming AB = BA. Matrix multiplication is generally non-commutative!',
      'Diagonal entries of any skew-symmetric matrix MUST all be zero.',
    ],
    gujcetTricks: [
      'For 2x2 matrix A = [[a,b],[c,d]], Cayley-Hamilton equation is A^2 - (a+d)A + (ad-bc)I = O.',
      'If A is orthogonal, A^T = A^(-1) and det(A) = ±1.',
    ],
  },
  {
    id: 4,
    part: 1,
    titleEn: 'Determinants',
    titleGu: 'નિશ્ચાયક',
    weightage: '6 - 7 Marks',
    summaryEn: 'Determinant expansion, minors & cofactors, adjoint, matrix inverse, solving systems of linear equations via matrix method.',
    summaryGu: 'નિશ્ચાયકના મૂલ્ય, ઉપનિશ્ચાયક, સહઅવયવ, સહઅવયવજ શ્રેણિક (adj A), અને ક્રેમર/શ્રેણિક રીત.',
    formulas: [
      {
        nameEn: 'Inverse via Adjoint',
        nameGu: 'વ્યસ્ત શ્રેણિકનું સૂત્ર',
        latex: 'A^{-1} = \\frac{1}{|A|} \\text{adj}(A) \\quad (|A| \\neq 0)',
      },
      {
        nameEn: 'Adjoint Properties',
        nameGu: 'સહઅવયવજ શ્રેણિક ગુણધર્મો',
        latex: '|\\text{adj}(A)| = |A|^{n-1}, \\quad A \\cdot \\text{adj}(A) = |A| I_n',
      },
      {
        nameEn: 'Matrix Method Linear System',
        nameGu: 'સુરેખ સમીકરણ સંહતિનો ઉકેલ',
        latex: 'AX = B \\implies X = A^{-1} B = \\frac{1}{|A|} \\text{adj}(A) B',
      },
      {
        nameEn: 'Area of Triangle with Coordinates',
        nameGu: 'ત્રિકોણનું ક્ષેત્રફળ',
        latex: '\\Delta = \\frac{1}{2} \\left| \\begin{matrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{matrix} \\right|',
      },
    ],
    sampleProblems: [
      {
        title: '3-Variable Linear System (Section D)',
        question: 'Solve using matrix method: 2x + 3y + 3z = 5, x - 2y + z = -4, 3x - y - 2z = 3.',
        marks: '4 Marks',
      },
      {
        title: 'Adjoint Evaluation',
        question: 'If A is a 3x3 matrix and |A| = 4, find the value of |adj(2A)|.',
        marks: '2 Marks',
      },
    ],
    pitfalls: [
      'Sign errors in cofactors: Cofactor A_ij = (-1)^(i+j) M_ij. Missing the negative sign on A_12, A_21, A_23, A_32.',
      'Forgetting to transpose the cofactor matrix to get adj(A). Adjoint is the TRANSPOSE of cofactor matrix!',
    ],
    gujcetTricks: [
      '|adj(A)| = |A|^(n-1). For 3x3 matrix, |adj(A)| = |A|^2.',
      '|kA| = k^n |A| for an n x n square matrix.',
    ],
  },
  {
    id: 5,
    part: 1,
    titleEn: 'Continuity and Differentiability',
    titleGu: 'સાતત્ય અને વિકલનીયતા',
    weightage: '7 - 9 Marks',
    summaryEn: 'Limits, continuity at a point, chain rule, implicit differentiation, logarithmic differentiation, parametric differentiation, second order derivatives.',
    summaryGu: 'સાતત્યની શરત, સાંકળ નિયમ, ગર્ભિત વિધેયોનું વિકલન, લઘુગણકીય વિકલન, પ્રચલ સમીકરણો, દ્વિતીય વિકલિત.',
    formulas: [
      {
        nameEn: 'Continuity Condition at x = c',
        nameGu: 'સાતત્યની શરત',
        latex: '\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)',
      },
      {
        nameEn: 'Chain Rule',
        nameGu: 'સાંકળ નિયમ',
        latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
      },
      {
        nameEn: 'Parametric Differentiation',
        nameGu: 'પ્રચલ વિધેયનું વિકલન',
        latex: '\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}, \\quad \\frac{d^2y}{dx^2} = \\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\cdot \\frac{dt}{dx}',
      },
      {
        nameEn: 'Logarithmic Differentiation',
        nameGu: 'લઘુગણકીય વિકલન',
        latex: '\\frac{d}{dx}[u(x)^{v(x)}] = u^v \\left[ v\' \\ln u + \\frac{v \\cdot u\'}{u} \\right]',
      },
    ],
    sampleProblems: [
      {
        title: 'Logarithmic Differentiation',
        question: 'Differentiate with respect to x: y = (sin x)^x + x^(sin x).',
        marks: '4 Marks',
      },
      {
        title: 'Second Order Parametric Derivative',
        question: 'If x = a(theta - sin theta), y = a(1 + cos theta), find d^2y/dx^2 at theta = pi/2.',
        marks: '3 Marks',
      },
      {
        title: 'Continuity Constant Determination',
        question: 'Find k such that f(x) = { k(x^2 - 2x) for x <= 0; 4x + 1 for x > 0 } is continuous at x = 0.',
        marks: '2 Marks',
      },
    ],
    pitfalls: [
      'In parametric second derivative d^2y/dx^2, students often forget to multiply by (dt/dx)!',
      'For y = u^v + w^z, NEVER take log directly on both sides: log(A + B) is NOT log A + log B! Set u = ... and v = ... separately.',
    ],
    gujcetTricks: [
      'For implicit function f(x, y) = c, dy/dx = - (partial df/dx) / (partial df/dy). This finds dy/dx in 5 seconds in GUJCET!',
    ],
  },
  {
    id: 6,
    part: 1,
    titleEn: 'Application of Derivatives (AOD)',
    titleGu: 'વિકલિતના ઉપયોગો',
    weightage: '6 - 8 Marks',
    summaryEn: 'Rate of change, increasing and decreasing functions, maxima and minima word problems.',
    summaryGu: 'ફેરફારનો દર, વધતા-ઘટતા વિધેયો, મહત્તમ અને ન્યૂનતમ મૂલ્યોના કૂટપ્રશ્નો.',
    formulas: [
      {
        nameEn: 'Strictly Increasing / Decreasing',
        nameGu: 'વધતું અને ઘટતું વિધેય',
        latex: 'f\'(x) > 0 \\implies \\text{Strictly Increasing}, \\quad f\'(x) < 0 \\implies \\text{Strictly Decreasing}',
      },
      {
        nameEn: 'First Derivative Test',
        nameGu: 'પ્રથમ વિકલિત કસોટી',
        latex: 'f\'(c) = 0 \\text{ and sign changes } + \\to - \\implies \\text{Local Maxima}',
      },
      {
        nameEn: 'Second Derivative Test',
        nameGu: 'દ્વિતીય વિકલિત કસોટી',
        latex: 'f\'(c) = 0: \\quad f\'\'(c) < 0 \\implies \\text{Local Max}, \\quad f\'\'(c) > 0 \\implies \\text{Local Min}',
      },
    ],
    sampleProblems: [
      {
        title: 'Geometry Optimization (Section D)',
        question: 'Prove that the volume of the largest cone that can be inscribed in a sphere of radius R is 8/27 of the volume of the sphere.',
        marks: '4 Marks',
      },
      {
        title: 'Increasing Interval Determination',
        question: 'Find the intervals in which f(x) = 2x^3 - 3x^2 - 36x + 7 is strictly increasing and strictly decreasing.',
        marks: '3 Marks',
      },
    ],
    pitfalls: [
      'In maxima/minima word problems, students often forget to verify the second derivative sign (f\'\'(x) < 0 or > 0). GSEB deducts 1 full mark!',
      'Confusing increasing [f\'(x) >= 0] with strictly increasing [f\'(x) > 0].',
    ],
    gujcetTricks: [
      'For inscribed rectangle in circle of radius R, the maximum area is always a square of side R*sqrt(2) and max area = 2R^2.',
      'For cone inscribed in sphere, height for maximum volume is always h = 4R/3.',
    ],
  },
  {
    id: 7,
    part: 2,
    titleEn: 'Integrals (Calculus)',
    titleGu: 'સંકલન',
    weightage: '9 - 12 Marks',
    summaryEn: 'Indefinite integration, substitution, partial fractions, integration by parts, definite integrals and properties (King\'s rule, Queen\'s rule).',
    summaryGu: 'અનિશ્ચિત સંકલન, આદેશની રીત, આંશિક અપૂર્ણાંક, ખંડશઃ સંકલન, નિયત સંકલનના ગુણધર્મો.',
    formulas: [
      {
        nameEn: 'Integration by Parts (ILATE)',
        nameGu: 'ખંડશઃ સંકલન સૂત્ર',
        latex: '\\int u v dx = u \\int v dx - \\int \\left( \\frac{du}{dx} \\int v dx \\right) dx',
      },
      {
        nameEn: 'King\'s Property of Definite Integrals',
        nameGu: 'નિયત સંકલનનો રાજા નિયમ',
        latex: '\\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx, \\quad \\int_0^a f(x) dx = \\int_0^a f(a-x) dx',
      },
      {
        nameEn: 'Euler Exponential Form',
        nameGu: 'ઘાતાંકીય સ્વરૂપ',
        latex: '\\int e^x [f(x) + f\'(x)] dx = e^x f(x) + C',
      },
      {
        nameEn: 'Standard Quadratic Integrals',
        nameGu: 'વિશિષ્ટ સંકલ્ય સૂત્રો',
        latex: '\\int \\frac{dx}{x^2 - a^2} = \\frac{1}{2a} \\ln\\left|\\frac{x-a}{x+a}\\right| + C, \\quad \\int \\frac{dx}{\\sqrt{a^2-x^2}} = \\sin^{-1}\\left(\\frac{x}{a}\\right) + C',
      },
    ],
    sampleProblems: [
      {
        title: 'King\'s Property Definite Integral (Section D)',
        question: 'Evaluate: Integral from 0 to pi/2 of (sqrt(sin x) / (sqrt(sin x) + sqrt(cos x))) dx.',
        marks: '4 Marks',
      },
      {
        title: 'Integration by Parts with log',
        question: 'Evaluate: Integral of x * (tan^(-1) x) dx.',
        marks: '3 Marks',
      },
      {
        title: 'Exponential Form Integral',
        question: 'Evaluate: Integral of e^x * ((1 + sin x) / (1 + cos x)) dx.',
        marks: '3 Marks',
      },
    ],
    pitfalls: [
      'Always add "+ C" for indefinite integrals! GSEB examiners penalize 1/2 mark every time + C is omitted.',
      'When substituting x = g(t) in definite integrals, forgetting to change the upper and lower limits of integration.',
    ],
    gujcetTricks: [
      'If integral is int_a^b (f(x) / (f(x) + f(a+b-x))) dx, the answer is ALWAYS (b - a) / 2! For 0 to pi/2, answer is always pi/4 instantly.',
      'Odd function shortcut: int_(-a)^a f(x) dx = 0 if f(-x) = -f(x).',
    ],
  },
  {
    id: 8,
    part: 2,
    titleEn: 'Application of Integrals (AOI)',
    titleGu: 'સંકલનના ઉપયોગો (ક્ષેત્રફળ)',
    weightage: '4 - 5 Marks',
    summaryEn: 'Area under simple curves, lines, parabolas, ellipses, circles and area bounded between two curves.',
    summaryGu: 'વક્ર અને અક્ષો વચ્ચે ઘેરાયેલું ક્ષેત્રફળ, પરવલય, ઉપવલય અને વર્તુળના ક્ષેત્રફળ.',
    formulas: [
      {
        nameEn: 'Area along x-axis',
        nameGu: 'x-અક્ષ પર ક્ષેત્રફળ',
        latex: 'A = \\int_a^b |y| dx = \\int_a^b |f(x)| dx',
      },
      {
        nameEn: 'Area between two curves',
        nameGu: 'બે વક્રો વચ્ચેનું ક્ષેત્રફળ',
        latex: 'A = \\int_a^b [y_{\\text{upper}} - y_{\\text{lower}}] dx',
      },
      {
        nameEn: 'Ellipse Area Standard Form',
        nameGu: 'ઉપવલયનું કુલ ક્ષેત્રફળ',
        latex: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\implies \\text{Total Area} = \\pi a b',
      },
    ],
    sampleProblems: [
      {
        title: 'Area Bounded by Parabola & Line (Section D)',
        question: 'Find the area of the region bounded by the parabola y^2 = 4x and the line y = 2x.',
        marks: '4 Marks',
      },
      {
        title: 'Area of Ellipse Quarter',
        question: 'Find the area enclosed by the ellipse x^2/16 + y^2/9 = 1 using integration.',
        marks: '3 Marks',
      },
    ],
    pitfalls: [
      'Forgetting to draw the rough sketch. GSEB marking scheme awards 1 mark strictly for the correct labelled diagram!',
      'Area must always be positive. If curve lies below x-axis, take absolute value |int y dx|.',
    ],
    gujcetTricks: [
      'Area between parabola y^2 = 4ax and y = mx is always 8a^2 / (3m^3).',
      'Area between two parabolas y^2 = 4ax and x^2 = 4by is always 16ab / 3.',
    ],
  },
  {
    id: 9,
    part: 2,
    titleEn: 'Differential Equations',
    titleGu: 'વિકલ સમીકરણો',
    weightage: '5 - 7 Marks',
    summaryEn: 'Order and degree, general and particular solutions, variable separable method, homogeneous equations, first-order linear differential equations.',
    summaryGu: 'કક્ષા અને પરિમાણ, વ્યાપક અને વિશિષ્ટ ઉકેલ, વિયોજનીય ચલની રીત, સમપરિમાણ વિકલ સમીકરણ, સુરેખ વિકલ સમીકરણ (I.F.).',
    formulas: [
      {
        nameEn: 'Linear Differential Equation (Type 1)',
        nameGu: 'સુરેખ વિકલ સમીકરણ (પ્રથમ પ્રકાર)',
        latex: '\\frac{dy}{dx} + P(x) y = Q(x) \\implies \\text{I.F.} = e^{\\int P dx}, \\quad y \\cdot \\text{I.F.} = \\int (Q \\cdot \\text{I.F.}) dx + C',
      },
      {
        nameEn: 'Linear Differential Equation (Type 2)',
        nameGu: 'સુરેખ વિકલ સમીકરણ (દ્વિતીય પ્રકાર)',
        latex: '\\frac{dx}{dy} + P(y) x = Q(y) \\implies \\text{I.F.} = e^{\\int P dy}, \\quad x \\cdot \\text{I.F.} = \\int (Q \\cdot \\text{I.F.}) dy + C',
      },
      {
        nameEn: 'Homogeneous DE Substitution',
        nameGu: 'સમપરિમાણ વિધેય આદેશ',
        latex: '\\frac{dy}{dx} = g(y/x) \\implies \\text{Put } y = vx \\implies \\frac{dy}{dx} = v + x \\frac{dv}{dx}',
      },
    ],
    sampleProblems: [
      {
        title: 'Linear DE with Integrating Factor (Section D)',
        question: 'Find the general solution of the differential equation: x (dy/dx) + 2y = x^2 (x != 0).',
        marks: '4 Marks',
      },
      {
        title: 'Homogeneous Differential Equation',
        question: 'Solve: (x^2 - y^2) dx + 2xy dy = 0.',
        marks: '4 Marks',
      },
      {
        title: 'Order and Degree Identification',
        question: 'Find the order and degree (if defined) of: (d^2y/dx^2)^3 + (dy/dx)^2 + sin(dy/dx) = 0.',
        marks: '1 Mark',
      },
    ],
    pitfalls: [
      'Degree is NOT defined if the derivative is inside a transcendental function like sin(dy/dx) or e^(dy/dx)! Order is still defined.',
      'Dividing by x to ensure dy/dx coefficient is 1 BEFORE calculating P(x) and Integrating Factor.',
    ],
    gujcetTricks: [
      'For dx/dy + Px = Q, students mistakenly use e^(int P dx) instead of e^(int P dy). Notice which variable is dependent!',
    ],
  },
  {
    id: 10,
    part: 2,
    titleEn: 'Vector Algebra',
    titleGu: 'સદિશ બીજગણિત',
    weightage: '5 - 6 Marks',
    summaryEn: 'Position vectors, direction ratios & cosines, dot (scalar) product, cross (vector) product, projection of a vector.',
    summaryGu: 'સ્થાનસદિશ, દિક-કોસાઇન, અદિશ (ડોટ) ગુણાકાર, સદિશ (ક્રોસ) ગુણાકાર, સદિશનો પ્રક્ષેપ.',
    formulas: [
      {
        nameEn: 'Scalar (Dot) Product',
        nameGu: 'અદિશ (ડોટ) ગુણાકાર',
        latex: '\\vec{a} \\cdot \\vec{b} = |\\vec{a}| |\\vec{b}| \\cos \\theta = a_1 b_1 + a_2 b_2 + a_3 b_3',
      },
      {
        nameEn: 'Vector (Cross) Product',
        nameGu: 'સદિશ (ક્રોસ) ગુણાકાર',
        latex: '\\vec{a} \\times \\vec{b} = \\left| \\begin{matrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{matrix} \\right| = |\\vec{a}||\\vec{b}| \\sin \\theta \\,\\hat{n}',
      },
      {
        nameEn: 'Projection of a on b',
        nameGu: 'સદિશ a નો b પર પ્રક્ષેપ',
        latex: '\\text{Proj}_{\\vec{b}}(\\vec{a}) = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}',
      },
      {
        nameEn: 'Lagrange Identity',
        nameGu: 'લેગ્રાન્જ નિત્યસમ',
        latex: '|\\vec{a} \\times \\vec{b}|^2 + (\\vec{a} \\cdot \\vec{b})^2 = |\\vec{a}|^2 |\\vec{b}|^2',
      },
    ],
    sampleProblems: [
      {
        title: 'Perpendicular Vector Unit Normal',
        question: 'Find a unit vector perpendicular to each of the vectors (a + b) and (a - b), where a = i + j + k, b = i + 2j + 3k.',
        marks: '3 Marks',
      },
      {
        title: 'Vector Projection Calculation',
        question: 'Find the projection of the vector a = 2i + 3j + 2k on the vector b = i + 2j + k.',
        marks: '2 Marks',
      },
    ],
    pitfalls: [
      'a x b is anti-commutative: a x b = - (b x a). Order matters in cross product!',
      'Projection is a scalar quantity; do NOT multiply by unit vector unless asked for vector projection.',
    ],
    gujcetTricks: [
      'Perpendicular condition: a . b = 0. Collinear / parallel condition: a x b = 0 or a = lambda * b.',
      'Area of triangle with adjacent vectors a, b is (1/2)|a x b|. Area of parallelogram is |a x b|.',
    ],
  },
  {
    id: 11,
    part: 2,
    titleEn: 'Three-Dimensional Geometry (3D)',
    titleGu: 'ત્રિ-પરિમાણીય ભૂમિતિ',
    weightage: '7 - 8 Marks',
    summaryEn: 'Direction cosines and direction ratios of a line, vector and Cartesian equations of lines, angle between two lines, shortest distance between skew lines.',
    summaryGu: 'રેખાની દિક-કોસાઇન અને દિક-ગુણોત્તર, રેખાના સમીકરણો, બે રેખાઓ વચ્ચેનો ખૂણો, વિષમતલીય રેખાઓ વચ્ચેનું લઘુત્તમ અંતર.',
    formulas: [
      {
        nameEn: 'Vector Line Equation',
        nameGu: 'રેખાનું સદિશ સમીકરણ',
        latex: '\\vec{r} = \\vec{a} + \\lambda \\vec{b}',
      },
      {
        nameEn: 'Cartesian Line Equation',
        nameGu: 'રેખાનું કાર્તેઝિયન સમીકરણ',
        latex: '\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c}',
      },
      {
        nameEn: 'Shortest Distance between Skew Lines',
        nameGu: 'વિષમતલીય રેખાઓ વચ્ચેનું ન્યૂનતમ અંતર',
        latex: 'd = \\left| \\frac{(\\vec{b_1} \\times \\vec{b_2}) \\cdot (\\vec{a_2} - \\vec{a_1})}{|\\vec{b_1} \\times \\vec{b_2}|} \\right|',
      },
      {
        nameEn: 'Condition for Coplanar Lines',
        nameGu: 'સમતલીય રેખાઓની શરત',
        latex: '(\\vec{b_1} \\times \\vec{b_2}) \\cdot (\\vec{a_2} - \\vec{a_1}) = 0',
      },
    ],
    sampleProblems: [
      {
        title: 'Shortest Distance Between Skew Lines (Section D)',
        question: 'Find the shortest distance between lines r = (i + 2j + k) + lambda(i - j + k) and r = (2i - j - k) + mu(2i + j + 2k).',
        marks: '4 Marks',
      },
      {
        title: 'Cartesian Line Conversion',
        question: 'Find the vector and cartesian equations of the line that passes through points (3, -2, -5) and (3, -2, 6).',
        marks: '3 Marks',
      },
    ],
    pitfalls: [
      'In Cartesian form (x - x1)/a, the coefficients of x, y, z MUST be +1. If written (1 - x)/2, students must rewrite as (x - 1)/(-2)!',
      'Forgetting the outer absolute value in shortest distance: distance can never be negative.',
    ],
    gujcetTricks: [
      'If two lines are parallel (b1 = b2 = b), distance formula is d = |b x (a2 - a1)| / |b|.',
      'Check if (b1 x b2) . (a2 - a1) = 0 first. If zero, lines intersect and shortest distance is 0.',
    ],
  },
  {
    id: 12,
    part: 2,
    titleEn: 'Linear Programming (LPP)',
    titleGu: 'સુરેખ આયોજન',
    weightage: '4 - 5 Marks',
    summaryEn: 'Mathematical formulation of LPP, graphical method of solution, feasible and infeasible regions, corner point method, bounded and unbounded feasible regions.',
    summaryGu: 'સુરેખ આયોજનનું ગાણિતિક સ્વરૂપ, આલેખની રીત, શિરોબિંદુ પદ્ધતિ, સીમિત અને અસીમિત શક્ય ઉકેલ પ્રદેશ.',
    formulas: [
      {
        nameEn: 'Objective Function',
        nameGu: 'હેતુલક્ષી વિધેય',
        latex: 'Z = ax + by \\quad (\\text{Maximize or Minimize})',
      },
      {
        nameEn: 'Non-negativity Constraints',
        nameGu: 'અઋણ શરતો',
        latex: 'x \\ge 0, \\quad y \\ge 0 \\quad (\\text{First Quadrant only})',
      },
      {
        nameEn: 'Corner Point Theorem',
        nameGu: 'શિરોબિંદુ પ્રમેય',
        latex: 'Z_{\\max} \\text{ and } Z_{\\min} \\text{ occur at the extreme (corner) points of the feasible region.}',
      },
    ],
    sampleProblems: [
      {
        title: 'Corner Point Optimization (Section D)',
        question: 'Solve graphically: Maximize Z = 4x + y subject to constraints: x + y <= 50, 3x + y <= 90, x >= 0, y >= 0.',
        marks: '4 Marks',
      },
      {
        title: 'Cost Minimization LPP',
        question: 'Minimize Z = 200x + 500y subject to x + 2y >= 10, 3x + 4y <= 24, x >= 0, y >= 0.',
        marks: '4 Marks',
      },
    ],
    pitfalls: [
      'If the feasible region is UNBOUNDED, the maximum value M might not exist! Must verify if open half-plane ax + by > M has common points with feasible region.',
      'Failing to shade the correct half-plane (always test origin (0, 0) if line does not pass through origin).',
    ],
    gujcetTricks: [
      'In GUJCET MCQs, calculate corner points by intersecting lines two-by-two and evaluate Z directly in 30 seconds.',
    ],
  },
  {
    id: 13,
    part: 2,
    titleEn: 'Probability',
    titleGu: 'સંભાવના',
    weightage: '6 - 8 Marks',
    summaryEn: 'Conditional probability, multiplication theorem, independent events, total probability theorem, Bayes\' theorem, random variable and probability distribution.',
    summaryGu: 'શરતી સંભાવના, સંભાવનાનો ગુણાકાર નિયમ, નિરપેક્ષ ઘટનાઓ, બેઇઝનો પ્રમેય, યાદચ્છિક ચલ અને સંભાવના વિતરણ.',
    formulas: [
      {
        nameEn: 'Conditional Probability',
        nameGu: 'શરતી સંભાવના',
        latex: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\quad (P(B) \\neq 0)',
      },
      {
        nameEn: 'Independent Events Test',
        nameGu: 'નિરપેક્ષ ઘટનાઓ',
        latex: 'P(A \\cap B) = P(A) \\cdot P(B)',
      },
      {
        nameEn: 'Bayes\' Theorem',
        nameGu: 'બેઇઝનો પ્રમેય',
        latex: 'P(E_i|A) = \\frac{P(E_i) P(A|E_i)}{\\sum_{j=1}^n P(E_j) P(A|E_j)}',
      },
      {
        nameEn: 'Mean (Expectation) of Random Variable',
        nameGu: 'યાદચ્છિક ચલનો મધ્યક',
        latex: '\\mu = E(X) = \\sum x_i P(x_i), \\quad \\sum P(x_i) = 1',
      },
    ],
    sampleProblems: [
      {
        title: 'Bayes\' Theorem Diagnosis (Section D)',
        question: 'A doctor is called to see a sick child. The doctor knows that 90% of sick children in that neighborhood have the flu and 10% have measles. A rash is a symptom in 95% of measles cases and in only 8% of flu cases. If the child has a rash, what is the probability that the child has measles?',
        marks: '4 Marks',
      },
      {
        title: 'Probability Distribution of Heads',
        question: 'Find the probability distribution of number of heads in two tosses of a coin. Also find its mean.',
        marks: '3 Marks',
      },
    ],
    pitfalls: [
      'In Bayes\' Theorem, confusing prior probabilities P(E1) and likelihood P(A|E1). Clearly write out what event A denotes!',
      'Independent events is NOT mutually exclusive! If A and B are mutually exclusive with non-zero probabilities, they CANNOT be independent.',
    ],
    gujcetTricks: [
      'If A and B are independent, P(A | B) = P(A) and P(A U B) = 1 - P(A\')P(B\').',
    ],
  },
];
