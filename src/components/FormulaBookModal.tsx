import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  Zap,
  AlertTriangle,
  PlayCircle,
  Bookmark,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { CLASS_12_CHAPTERS, ChapterInfo } from '../data/curriculum';
import { MathRenderer } from './MathRenderer';

interface FormulaBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSampleProblem: (problemText: string) => void;
}

export const FormulaBookModal: React.FC<FormulaBookModalProps> = ({
  isOpen,
  onClose,
  onSelectSampleProblem,
}) => {
  const [activePart, setActivePart] = useState<1 | 2 | 'all'>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChapters = useMemo(() => {
    return CLASS_12_CHAPTERS.filter((chap) => {
      const matchPart = activePart === 'all' || chap.part === activePart;
      if (!matchPart) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const matchTitle =
        chap.titleEn.toLowerCase().includes(query) ||
        chap.titleGu.toLowerCase().includes(query);
      const matchFormula = chap.formulas.some(
        (f) =>
          f.nameEn.toLowerCase().includes(query) ||
          f.nameGu.toLowerCase().includes(query) ||
          f.latex.toLowerCase().includes(query)
      );
      const matchShortcut = chap.gujcetTricks.some((t) =>
        t.toLowerCase().includes(query)
      );
      return matchTitle || matchFormula || matchShortcut;
    });
  }, [activePart, searchQuery]);

  const selectedChapter: ChapterInfo | undefined = useMemo(() => {
    const found = CLASS_12_CHAPTERS.find((c) => c.id === selectedChapterId);
    return found || CLASS_12_CHAPTERS[0];
  }, [selectedChapterId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                Class 12 NCERT &amp; GSEB Maths Formula Handbook
              </h2>
              <p className="text-xs text-slate-400">
                Chapters 1-13 (Part 1 &amp; Part 2) with Gujarati terminology, formulas, and GUJCET shortcuts
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-6 py-3 bg-slate-950/40">
          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActivePart('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activePart === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Chapters (1-13)
            </button>
            <button
              type="button"
              onClick={() => setActivePart(1)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activePart === 1
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Part-1 (Ch 1-6)
            </button>
            <button
              type="button"
              onClick={() => setActivePart(2)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activePart === 2
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Part-2 (Ch 7-13)
            </button>
          </div>

          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formula, theorem, or chapter..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>
        </div>

        {/* Main Content Area (Sidebar + Detail) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Chapter List Sidebar */}
          <div className="w-full md:w-80 border-r border-slate-800 overflow-y-auto bg-slate-950/40 p-3 flex flex-row md:flex-col gap-1.5 shrink-0">
            {filteredChapters.map((chap) => {
              const isSelected = selectedChapter?.id === chap.id;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => setSelectedChapterId(chap.id)}
                  className={`flex items-center justify-between p-3 rounded-xl text-left transition-all shrink-0 md:shrink border ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-200 shadow-sm'
                      : 'border-transparent hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {chap.id}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold truncate">{chap.titleEn}</div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {chap.titleGu}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform hidden md:block ${
                      isSelected ? 'text-amber-400 translate-x-0.5' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Chapter Details View */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 flex flex-col gap-6 bg-slate-900/60">
            {selectedChapter ? (
              <>
                {/* Chapter Banner */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Class 12 Part-{selectedChapter.part}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Weightage: {selectedChapter.weightage}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-100 mb-1">
                    {selectedChapter.id}. {selectedChapter.titleEn}
                  </h3>
                  <h4 className="text-sm font-semibold text-amber-400 mb-3">
                    {selectedChapter.titleGu}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-1">
                    {selectedChapter.summaryEn}
                  </p>
                  <p className="text-xs text-slate-400 font-sans">
                    {selectedChapter.summaryGu}
                  </p>
                </div>

                {/* Formulas List */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-3">
                    <Bookmark className="w-4 h-4 text-amber-400" />
                    Essential Board Formulas
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedChapter.formulas.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-800 bg-slate-950/80 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-amber-300">
                            {item.nameEn}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {item.nameGu}
                          </span>
                        </div>
                        <div className="overflow-x-auto py-1 text-slate-100">
                          <MathRenderer content={`$$${item.latex}$$`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Pitfalls & GSEB Board Warnings */}
                <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-4">
                  <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Common Student Mistakes in GSEB Exams
                  </h4>
                  <ul className="space-y-1.5 text-xs text-rose-200">
                    {selectedChapter.pitfalls.map((pitfall, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* GUJCET / JEE Speed Tricks */}
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    GUJCET / JEE Entrance Speed Hacks
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-100">
                    {selectedChapter.gujcetTricks.map((trick, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{trick}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practice Questions */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-3">
                    <PlayCircle className="w-4 h-4 text-indigo-400" />
                    High-Weightage Board Practice Questions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedChapter.sampleProblems.map((sp, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                            <span>{sp.title}</span>
                            <span className="text-amber-400">{sp.marks}</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed mb-3">
                            {sp.question}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSampleProblem(sp.question);
                            onClose();
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-all active:scale-95"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          Solve in MathsGuru AI
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
