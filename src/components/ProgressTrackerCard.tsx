import React, { useState } from 'react';
import {
  Trophy,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Flame,
  Star,
  RotateCcw,
  PlayCircle,
  Cloud,
} from 'lucide-react';
import { CLASS_12_CHAPTERS, ChapterInfo } from '../data/curriculum';
import { ChapterProgress, ChapterStatus, UserProfile } from '../types';

interface ProgressTrackerCardProps {
  progressMap: Record<number, ChapterProgress>;
  onUpdateStatus: (chapterId: number, status: ChapterStatus) => void;
  onResetProgress: () => void;
  onSelectChapterProblem: (problemPrompt: string) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
}

export const ProgressTrackerCard: React.FC<ProgressTrackerCardProps> = ({
  progressMap,
  onUpdateStatus,
  onResetProgress,
  onSelectChapterProblem,
  currentUser,
  onOpenAuthModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'mastered' | 'need_practice' | 'part1' | 'part2'>('all');

  // Calculate statistics
  const totalChapters = CLASS_12_CHAPTERS.length; // 13
  const masteredCount = CLASS_12_CHAPTERS.filter(
    (c) => progressMap[c.id]?.status === 'mastered'
  ).length;
  const needPracticeCount = CLASS_12_CHAPTERS.filter(
    (c) => progressMap[c.id]?.status === 'need_practice'
  ).length;
  const notStartedCount = totalChapters - (masteredCount + needPracticeCount);

  const masteredPercent = Math.round((masteredCount / totalChapters) * 100);
  const needPracticePercent = Math.round((needPracticeCount / totalChapters) * 100);

  // Filtered list
  const filteredChapters = CLASS_12_CHAPTERS.filter((c) => {
    const status = progressMap[c.id]?.status || 'not_started';
    if (filter === 'mastered') return status === 'mastered';
    if (filter === 'need_practice') return status === 'need_practice';
    if (filter === 'part1') return c.part === 1;
    if (filter === 'part2') return c.part === 2;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Visual Summary Card (Dashboard Header) */}
      <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-indigo-950/80 to-purple-950/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Top Title & User Connection */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-white text-xl shadow-lg shadow-pink-500/30">
                <Trophy className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                  ધોરણ 12 ગણિત પ્રગતિ ટ્રેકર (Chapter Mastery)
                </h2>
                <p className="text-xs text-slate-400">
                  NCERT અને GSEB બોર્ડ પ્રકરણોની તૈયારીનું જીવંત મૂલ્યાંકન
                </p>
              </div>
            </div>

            {/* Google Sync Status Badge */}
            <button
              type="button"
              onClick={onOpenAuthModal}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                currentUser
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                  : 'bg-white/10 text-pink-300 border-pink-500/30 hover:bg-white/20'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              {currentUser ? (
                <span>Synced: {currentUser.name}</span>
              ) : (
                <span>Sign in with Google to sync</span>
              )}
            </button>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Chapters */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">કુલ પ્રકરણો</div>
              <div className="text-2xl sm:text-3xl font-black text-slate-100 my-1">{totalChapters}</div>
              <div className="text-[11px] text-slate-500">ભાગ 1 (6) + ભાગ 2 (7)</div>
            </div>

            {/* Mastered */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col justify-between shadow-lg">
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> સિદ્ધ કરેલ (Mastered)
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-300 my-1">
                {masteredCount} <span className="text-sm font-semibold text-emerald-400/80">({masteredPercent}%)</span>
              </div>
              <div className="text-[11px] text-emerald-400/70">બોર્ડ પરીક્ષા માટે તૈયાર</div>
            </div>

            {/* Need Practice */}
            <div className="p-4 rounded-2xl bg-pink-950/40 border border-pink-500/30 flex flex-col justify-between shadow-lg">
              <div className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> મહાવરો જરૂરી
              </div>
              <div className="text-2xl sm:text-3xl font-black text-pink-300 my-1">
                {needPracticeCount} <span className="text-sm font-semibold text-pink-400/80">({needPracticePercent}%)</span>
              </div>
              <div className="text-[11px] text-pink-400/70">વધુ દાખલા ગણવા જરૂરી</div>
            </div>

            {/* Not Started */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> શરૂ કરવાનું બાકી
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 my-1">{notStartedCount}</div>
              <div className="text-[11px] text-slate-400">અભ્યાસ બાકી પ્રકરણો</div>
            </div>
          </div>

          {/* Multi-Segment Gradient Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">સંપૂર્ણ બોર્ડ અભ્યાસક્રમ તૈયારી:</span>
              <span className="text-pink-300">{masteredCount} / 13 પ્રકરણો પૂર્ણ</span>
            </div>

            <div className="w-full h-3.5 rounded-full bg-slate-950/80 overflow-hidden border border-white/10 flex">
              {/* Mastered segment */}
              <div
                style={{ width: `${(masteredCount / totalChapters) * 100}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                title={`Mastered: ${masteredCount} chapters`}
              />
              {/* Need practice segment */}
              <div
                style={{ width: `${(needPracticeCount / totalChapters) * 100}%` }}
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                title={`Need Practice: ${needPracticeCount} chapters`}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> સિદ્ધ કરેલ
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" /> મહાવરો જરૂરી
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> બાકી
                </span>
              </div>
              {masteredCount > 0 && (
                <button
                  type="button"
                  onClick={onResetProgress}
                  className="text-slate-500 hover:text-rose-400 underline transition-colors"
                >
                  પ્રોગ્રેસ રીસેટ કરો
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs for Chapters */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-2xl border border-white/10 text-xs font-semibold">
          {[
            { id: 'all' as const, label: `બધા પ્રકરણો (${totalChapters})` },
            { id: 'mastered' as const, label: `🏆 Mastered (${masteredCount})` },
            { id: 'need_practice' as const, label: `📝 Need Practice (${needPracticeCount})` },
            { id: 'part1' as const, label: 'ભાગ-૧ (Ch 1-6)' },
            { id: 'part2' as const, label: 'ભાગ-૨ (Ch 7-13)' },
          ].map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg shadow-pink-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-400 hidden sm:block">
          {filteredChapters.length} પ્રકરણો દર્શાવેલ છે
        </span>
      </div>

      {/* Chapter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChapters.map((chapter) => {
          const currentProgress = progressMap[chapter.id];
          const status = currentProgress?.status || 'not_started';

          return (
            <div
              key={chapter.id}
              className={`rounded-2xl border p-5 shadow-lg transition-all flex flex-col justify-between ${
                status === 'mastered'
                  ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500/60'
                  : status === 'need_practice'
                  ? 'bg-pink-950/20 border-pink-500/40 hover:border-pink-500/60'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {/* Header: Number, Weightage & Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-white/10 text-slate-200 border border-white/10">
                    Ch {chapter.id} • ભાગ {chapter.part}
                  </span>

                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {chapter.weightage}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-0.5">
                  {chapter.titleGu}
                </h3>
                <h4 className="text-xs font-semibold text-slate-400 mb-2.5">
                  {chapter.titleEn}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
                  {chapter.summaryGu}
                </p>
              </div>

              {/* Status Action Buttons (One-Click Toggle) */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateStatus(
                        chapter.id,
                        status === 'mastered' ? 'not_started' : 'mastered'
                      )
                    }
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      status === 'mastered'
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400'
                        : 'bg-white/5 hover:bg-emerald-950/40 text-emerald-400 border border-emerald-500/25'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {status === 'mastered' ? '✓ Mastered' : 'Mark Mastered'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onUpdateStatus(
                        chapter.id,
                        status === 'need_practice' ? 'not_started' : 'need_practice'
                      )
                    }
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      status === 'need_practice'
                        ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30 ring-2 ring-pink-400'
                        : 'bg-white/5 hover:bg-pink-950/40 text-pink-300 border border-pink-500/25'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    {status === 'need_practice' ? '✓ Need Practice' : 'Need Practice'}
                  </button>
                </div>

                {/* Direct Solve Problem button for this chapter */}
                <button
                  type="button"
                  onClick={() => onSelectChapterProblem(chapter.sampleProblems[0].question)}
                  className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors border border-cyan-500/20"
                >
                  <PlayCircle className="w-3 h-3" />
                  આ પ્રકરણનો દાખલો ઉકેલો &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
