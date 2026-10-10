import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Zap,
  Volume2,
  VolumeX,
  Copy,
  Check,
  HelpCircle,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { MathSolution } from '../types';
import { MathRenderer } from './MathRenderer';

interface SolutionCardProps {
  solution: MathSolution;
  onEditTranscription?: (transcription: string) => void;
  onSolveSimilar?: (problemQuestion: string) => void;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  solution,
  onEditTranscription,
  onSolveSimilar,
}) => {
  const [copied, setCopied] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showPracticeAnswer, setShowPracticeAnswer] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleCopyMarkdown = () => {
    let md = `# MathsGuru AI - Class 12 NCERT/GSEB Solution\n`;
    md += `**Chapter:** ${solution.chapter}\n`;
    md += `**Board Weightage:** ${solution.marksWeightage}\n\n`;
    md += `## Transcription\n${solution.transcription}\n\n`;
    md += `## Key Formulas\n`;
    solution.keyFormulas.forEach((f) => {
      md += `- **${f.name}:** ${f.formula}\n`;
    });
    md += `\n## Step-by-Step Solution\n`;
    solution.steps.forEach((s) => {
      md += `### Step ${s.stepNumber}: ${s.title}\n${s.explanation}\n\n$$${s.math}$$\n\n`;
    });
    md += `## Final Answer\n**${solution.finalAnswer}**\n\n`;
    md += `## GSEB/NCERT Board Common Pitfalls\n`;
    solution.commonPitfalls.forEach((p) => {
      md += `- ⚠️ ${p}\n`;
    });
    md += `\n## GUJCET / JEE Shortcut\n⚡ ${solution.gujcetJeeShortcut}\n\n`;
    md += `## Practice Question\n${solution.practiceQuestion.question}\nAnswer: ${solution.practiceQuestion.answer}\n`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePlayVoiceTutor = async () => {
    if (isPlayingAudio && audioElement) {
      audioElement.pause();
      setIsPlayingAudio(false);
      return;
    }

    try {
      setAudioLoading(true);
      // Construct a concise pedagogical explanation to speak
      const summaryText = `Here is the Class 12 solution for ${solution.chapter}. The key formula used is ${
        solution.keyFormulas[0]?.name || 'standard theorem'
      }. The final result is ${solution.finalAnswer}. Note this board exam pitfall: ${
        solution.commonPitfalls[0] || 'Be careful with step calculations.'
      }`;

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: summaryText }),
      });

      const data = await res.json();
      if (data.audio) {
        const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
        setAudioElement(audio);
        audio.play();
        setIsPlayingAudio(true);
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => {
          setIsPlayingAudio(false);
          setAudioLoading(false);
        };
      }
    } catch (err) {
      console.error('Audio playback failed', err);
    } finally {
      setAudioLoading(false);
    }
  };

  const confidenceBadge = () => {
    if (solution.transcriptionConfidence === 'clear') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <CheckCircle className="w-3.5 h-3.5" /> High Confidence OCR
        </span>
      );
    }
    if (solution.transcriptionConfidence === 'assumed') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <AlertTriangle className="w-3.5 h-3.5" /> Best Transcription Assumption
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
        <AlertTriangle className="w-3.5 h-3.5" /> Handwritting Partially Unclear
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Solution Header & Meta Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              {solution.chapter}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              <Award className="w-3.5 h-3.5" />
              {solution.marksWeightage}
            </span>
            {confidenceBadge()}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Audio Voice Tutor */}
            <button
              type="button"
              onClick={handlePlayVoiceTutor}
              disabled={audioLoading}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isPlayingAudio
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 animate-pulse'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700/60'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  Playing Audio...
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  {audioLoading ? 'Generating Audio...' : 'Listen to Voice Tutor'}
                </>
              )}
            </button>

            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Notes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Transcribed Problem Statement */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Transcribed Mathematical Problem
            </span>
            {onEditTranscription && (
              <button
                type="button"
                onClick={() => onEditTranscription(solution.transcription)}
                className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
              >
                Tweak Transcription
              </button>
            )}
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 font-medium">
            <MathRenderer content={solution.transcription} />
          </div>

          {solution.transcriptionNote && (
            <div className="mt-2.5 p-3 rounded-lg bg-amber-950/30 border border-amber-900/50 text-xs text-amber-300/90 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Transcription Note: </span>
                {solution.transcriptionNote}
              </div>
            </div>
          )}
        </div>

        {/* Given values & boundary conditions */}
        {solution.givenData && solution.givenData.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/60">
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
              Given Values / Data:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {solution.givenData.map((d, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs text-slate-200"
                >
                  <MathRenderer content={d} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fundamental Formulas and Theorems Box */}
      {solution.keyFormulas && solution.keyFormulas.length > 0 && (
        <div className="rounded-2xl border border-sky-900/40 bg-sky-950/20 p-5 sm:p-6 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <h3 className="text-sm font-bold text-sky-300 tracking-wide uppercase flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              Fundamental Formulas &amp; Theorems Used
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {solution.keyFormulas.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-sky-800/40 flex flex-col justify-between"
              >
                <div className="text-xs font-semibold text-sky-200 mb-1.5">{item.name}</div>
                <div className="overflow-x-auto py-1">
                  <MathRenderer content={item.formula} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step-by-Step Problem Solving Walkthrough */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black border border-amber-500/30">
              12
            </span>
            Step-by-Step GSEB / NCERT Board Solution
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {solution.steps.length} Steps
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {solution.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-md transition-all hover:border-slate-700/80 hover:bg-slate-900"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20">
                  {step.stepNumber}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-100">{step.title}</h4>
              </div>

              {/* Step Explanation in requested language */}
              <div className="text-sm text-slate-300 leading-relaxed pl-1 sm:pl-10 mb-3.5">
                <MathRenderer content={step.explanation} />
              </div>

              {/* Step Math Calculation in LaTeX */}
              {step.math && (
                <div className="sm:ml-10 p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 overflow-x-auto">
                  <MathRenderer content={`$$${step.math.trim()}$$`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Final Answer Banner */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 to-slate-900 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <CheckCircle className="w-4 h-4" /> Final Answer (અંતિમ જવાબ)
        </div>
        <div className="text-xl sm:text-2xl font-bold text-emerald-200 overflow-x-auto py-2">
          <MathRenderer content={`$$${solution.finalAnswer}$$`} />
        </div>
      </div>

      {/* GSEB / NCERT Common Pitfalls & Examiner Warnings */}
      {solution.commonPitfalls && solution.commonPitfalls.length > 0 && (
        <div className="rounded-2xl border border-rose-900/50 bg-rose-950/20 p-5 sm:p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="text-sm font-bold text-rose-300 tracking-wide uppercase">
              ⚠️ GSEB Board Pitfalls &amp; Common Student Mistakes (સામાન્ય ભૂલો)
            </h3>
          </div>
          <p className="text-xs text-rose-200/70 mb-3">
            Examiners frequently deduct marks here in Class 12 board evaluations. Take extra care:
          </p>
          <ul className="space-y-2">
            {solution.commonPitfalls.map((pitfall, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-100 bg-rose-950/40 p-3 rounded-xl border border-rose-900/40"
              >
                <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                <span>
                  <MathRenderer content={pitfall} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* GUJCET / JEE Speed Hack Shortcut */}
      {solution.gujcetJeeShortcut && (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-5 sm:p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-amber-300 tracking-wide uppercase">
              ⚡ GUJCET &amp; JEE Main Speed Hack (Shortcuts &amp; MCQ Tricks)
            </h3>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/20 text-xs sm:text-sm text-amber-100">
            <MathRenderer content={solution.gujcetJeeShortcut} />
          </div>
        </div>
      )}

      {/* Similar Practice Question Card */}
      {solution.practiceQuestion && solution.practiceQuestion.question && (
        <div className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-5 sm:p-6 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-indigo-300 tracking-wide uppercase">
                🎯 Similar Practice Problem for GSEB Board Revision
              </h3>
            </div>
            {onSolveSimilar && (
              <button
                type="button"
                onClick={() => onSolveSimilar(solution.practiceQuestion.question)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Solve This Problem With MathsGuru
              </button>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 text-slate-100 text-sm font-medium mb-3">
            <MathRenderer content={solution.practiceQuestion.question} />
          </div>

          {/* Collapsible Hint and Answer */}
          <div className="flex flex-wrap items-center gap-3">
            {solution.practiceQuestion.hint && (
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-700 transition-colors"
              >
                {showHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {showHint ? 'Hide Hint' : '💡 Show Hint'}
              </button>
            )}

            {solution.practiceQuestion.answer && (
              <button
                type="button"
                onClick={() => setShowPracticeAnswer(!showPracticeAnswer)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-700 transition-colors"
              >
                {showPracticeAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showPracticeAnswer ? 'Hide Answer' : 'Check Final Answer'}
              </button>
            )}
          </div>

          {showHint && solution.practiceQuestion.hint && (
            <div className="mt-3 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200">
              <span className="font-bold text-indigo-300">Hint: </span>
              <MathRenderer content={solution.practiceQuestion.hint} />
            </div>
          )}

          {showPracticeAnswer && solution.practiceQuestion.answer && (
            <div className="mt-3 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200">
              <span className="font-bold text-emerald-400">Answer: </span>
              <MathRenderer content={solution.practiceQuestion.answer} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
