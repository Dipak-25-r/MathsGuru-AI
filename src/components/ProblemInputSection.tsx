import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  PenTool,
  Sparkles,
  X,
  FileText,
  Image as ImageIcon,
  Zap,
  Globe,
  Loader2,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { LanguageMode, SolveMode } from '../types';
import { SAMPLE_PROBLEMS, SampleProblem } from '../data/sampleProblems';
import { DrawingCanvas } from './DrawingCanvas';

interface ProblemInputSectionProps {
  onSolve: (data: {
    prompt: string;
    image?: { mimeType: string; base64: string };
    language: LanguageMode;
    mode: SolveMode;
  }) => Promise<void>;
  loading: boolean;
  onOpenFormulaBook: () => void;
  initialPrompt?: string;
}

export const ProblemInputSection: React.FC<ProblemInputSectionProps> = ({
  onSolve,
  loading,
  onOpenFormulaBook,
  initialPrompt = '',
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [imageFile, setImageFile] = useState<{
    url: string;
    base64: string;
    mimeType: string;
    name: string;
  } | null>(null);
  const [language, setLanguage] = useState<LanguageMode>('gujarati');
  const [mode, setMode] = useState<SolveMode>('comprehensive');
  const [showCanvas, setShowCanvas] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  // Global paste listener (Ctrl+V) for screenshots
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileSelect(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setImageFile({
        url: base64,
        base64: base64,
        mimeType: file.type,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCanvasCapture = (base64Image: string) => {
    setImageFile({
      url: base64Image,
      base64: base64Image,
      mimeType: 'image/png',
      name: 'Handwritten_Board.png',
    });
    setShowCanvas(false);
  };

  const handleSelectSample = (sample: SampleProblem) => {
    setImageFile({
      url: sample.imageDataUrl,
      base64: sample.imageDataUrl,
      mimeType: 'image/svg+xml',
      name: `${sample.title}.svg`,
    });
    setPrompt(sample.prompt);
    setShowSamples(false);
  };

  const handleInsertMathSymbol = (symbol: string) => {
    setPrompt((prev) => prev + symbol);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !imageFile) return;

    await onSolve({
      prompt,
      image: imageFile
        ? {
            mimeType: imageFile.mimeType,
            base64: imageFile.base64,
          }
        : undefined,
      language,
      mode,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Control Bar: Language Selection & Handbook Quick Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-sm backdrop-blur-md">
        {/* Language Selection (Visual Invariance & Accessibility) */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-amber-400" />
            ભાષા / Language:
          </span>
          <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {[
              { id: 'gujarati' as LanguageMode, label: 'ગુજરાતી' },
              { id: 'english' as LanguageMode, label: 'English' },
              { id: 'gujlish' as LanguageMode, label: 'Gujlish' },
            ].map((item) => {
              const active = language === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLanguage(item.id)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm ring-1 ring-amber-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Navigation Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenFormulaBook}
            className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all hover:border-slate-600 active:scale-98"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            બોર્ડ ફોર્મ્યુલા બુક
          </button>
          <button
            type="button"
            onClick={() => setShowSamples(!showSamples)}
            className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all active:scale-98"
          >
            <Sparkles className="w-4 h-4" />
            બોર્ડ સેમ્પલ પ્રશ્નો
          </button>
        </div>
      </div>

      {/* Sample Problem Quick Picker Grid */}
      {showSamples && (
        <div className="p-6 rounded-2xl border border-indigo-900/60 bg-indigo-950/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-indigo-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                GSEB / NCERT બોર્ડ પરીક્ષાના મહત્વના સેમ્પલ દાખલા
              </h3>
              <p className="text-xs text-indigo-300/80 mt-0.5">
                દાખલા પર ક્લિક કરીને તેનું ટ્રાન્સક્રિપ્શન અને ક્રમશઃ ઉકેલ મેળવો
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSamples(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SAMPLE_PROBLEMS.map((sample) => (
              <div
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/90 hover:border-amber-500/50 hover:bg-slate-850 p-4 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[11px] font-bold text-amber-400 truncate">
                      {sample.chapter}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                      {sample.marks}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors mb-1.5">
                    {sample.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {sample.description}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-indigo-300 font-semibold">
                  <span>📸 {sample.type === 'handwritten' ? 'હાથથી લખેલ' : 'ટેક્સ્ટબુક સ્કેન'}</span>
                  <span className="group-hover:translate-x-1 transition-transform">ઉકેલો &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Solver Workspace Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col gap-7"
      >
        {/* Step 1: Multimodal Vision Input */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <label className="text-xs font-bold tracking-wider uppercase text-slate-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-[11px] border border-amber-500/30">
                1
              </span>
              દાખલાનો ફોટો / સ્કેન અપલોડ કરો (Image or Whiteboard)
            </label>
            <button
              type="button"
              onClick={() => setShowCanvas(!showCanvas)}
              className={`min-h-[38px] inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                showCanvas
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-slate-800/90 text-amber-300 hover:bg-slate-800 border-slate-700/80'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              {showCanvas ? 'સ્ક્રેચપેડ બંધ કરો' : '✏️ વ્હાઇટબોર્ડ પર હાથથી લખો'}
            </button>
          </div>

          {/* Interactive Whiteboard Canvas */}
          {showCanvas && (
            <div className="mb-4">
              <DrawingCanvas
                onCaptureImage={handleCanvasCapture}
                onCancel={() => setShowCanvas(false)}
              />
            </div>
          )}

          {/* Upload Dropzone / Image Preview */}
          {!imageFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-amber-500/70 bg-slate-950/60 hover:bg-slate-950/90 p-6 sm:p-10 text-center transition-all flex flex-col items-center justify-center gap-2.5"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />
              <div className="w-14 h-14 rounded-2xl bg-slate-800/80 group-hover:bg-amber-500/20 group-hover:text-amber-400 flex items-center justify-center text-slate-400 transition-colors border border-slate-700">
                <Upload className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-slate-200">
                દાખલાનો ફોટો અહીં ડ્રેગ કરો અથવા ફાઇલ પસંદ કરો
              </p>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                હાથથી લખેલી નોટબુક, ટેક્સ્ટબુક અથવા સ્ક્રીનશોટ સપોર્ટેડ છે (ક્યાંય પણ <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-amber-300">Ctrl+V</kbd> પેસ્ટ કરો)
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 flex items-center gap-4">
              <div className="w-28 h-24 sm:w-36 sm:h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0 flex items-center justify-center">
                <img
                  src={imageFile.url}
                  alt="Uploaded problem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  ફોટો સફળતાપૂર્વક જોડાયો (Ready for Vision OCR)
                </div>
                <div className="text-xs text-slate-200 font-mono truncate">{imageFile.name}</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  MathsGuru AI હાથથી લખેલા સંકેતોનું સચોટ LaTeX માં રૂપાંતર કરશે.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setImageFile(null)}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-900 transition-colors"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Math Equation / Text Query */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold tracking-wider uppercase text-slate-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-[11px] border border-amber-500/30">
                2
              </span>
              પ્રશ્નની વિગત અથવા LaTeX સમીકરણ (લખીને દાખલો પૂછો)
            </label>
            <span className="text-[11px] text-slate-400">LaTeX $...$ સપોર્ટેડ</span>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="તમારો પ્રશ્ન અથવા સમીકરણ અહીં લખો (ઉદા. 'સંકલન શોધો: \int_0^{\pi/2} \frac{\sqrt{\sin x}}{\sqrt{\sin x} + \sqrt{\cos x}} dx' અથવા 'શ્રેણિક પદ્ધતિથી સમીકરણ ઉકેલો')..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 leading-relaxed font-sans"
          />

          {/* Quick Mathematical Symbols Bar */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className="text-[11px] font-bold text-slate-400 mr-1">ઝડપી સંકેતો:</span>
            {[
              { label: '∫ dx', latex: '\\int f(x) dx ' },
              { label: '∫[a,b]', latex: '\\int_a^b f(x) dx ' },
              { label: 'dy/dx', latex: '\\frac{dy}{dx} ' },
              { label: 'd²y/dx²', latex: '\\frac{d^2y}{dx^2} ' },
              { label: '√x', latex: '\\sqrt{x} ' },
              { label: 'tan⁻¹', latex: '\\tan^{-1}(x) ' },
              { label: 'શ્રેણિક 2x2', latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} ' },
              { label: 'ā · b̄', latex: '\\vec{a} \\cdot \\vec{b} ' },
              { label: 'ā × b̄', latex: '\\vec{a} \\times \\vec{b} ' },
              { label: 'P(A|B)', latex: 'P(A|B) ' },
              { label: 'π', latex: '\\pi ' },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => handleInsertMathSymbol(s.latex)}
                className="min-h-[32px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-mono text-amber-300 border border-slate-700/60 transition-all hover:scale-105"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Solving Mode & High-Contrast Primary CTA (Fitts's Law) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          {/* Mode Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-slate-300">પદ્ધતિ / Mode:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              {[
                { id: 'comprehensive' as SolveMode, label: '📚 સંપૂર્ણ બોર્ડ સ્ટેપ્સ' },
                { id: 'mcq_quick' as SolveMode, label: '⚡ GUJCET / JEE શોર્ટકટ' },
                { id: 'exam_tips' as SolveMode, label: '🎯 ગુણ વહેંચણી અને ભૂલો' },
              ].map((m) => {
                const active = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={`min-h-[36px] px-3.5 py-1.5 rounded-lg transition-all ${
                      active
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm ring-1 ring-amber-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Button (Fitts's Law: Prominent, High-Contrast, Large Target) */}
          <button
            type="submit"
            disabled={(!prompt.trim() && !imageFile) || loading}
            className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 active:scale-98 disabled:opacity-40 disabled:pointer-events-none transition-all tracking-wide cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                <span>ગણતરી ચાલુ છે (Gemini AI Solver)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>દાખલો ઉકેલો (Solve Step-by-Step)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
