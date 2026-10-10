/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  AlertCircle,
  Trophy,
  MessageSquare,
  CheckCircle2,
  Flame,
  ArrowRight,
  Zap,
  Calculator,
} from 'lucide-react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ProblemInputSection } from './components/ProblemInputSection';
import { SolutionCard } from './components/SolutionCard';
import { FollowUpChat } from './components/FollowUpChat';
import { DedicatedChatbot } from './components/DedicatedChatbot';
import { ProgressTrackerCard } from './components/ProgressTrackerCard';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { FormulaBookModal } from './components/FormulaBookModal';
import { HistoryDrawer, HistoryItem } from './components/HistoryDrawer';
import { DataVaultModal } from './components/DataVaultModal';
import {
  MathSolution,
  LanguageMode,
  SolveMode,
  ChapterProgress,
  ChapterStatus,
  UserProfile,
} from './types';
import { CLASS_12_CHAPTERS } from './data/curriculum';
import { SAMPLE_PROBLEMS } from './data/sampleProblems';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('solver');
  const [currentSolution, setCurrentSolution] = useState<MathSolution | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<LanguageMode>('gujarati');
  const [formulaBookOpen, setFormulaBookOpen] = useState<boolean>(false);
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [dataVaultOpen, setDataVaultOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [initialPrompt, setInitialPrompt] = useState<string>('');

  // User Profile State (Google Sign-In required for Chatbot & Data Vault)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem('mathsguru_user');
      if (savedUser) return JSON.parse(savedUser);
      return null; // Guest initially to enforce sign-in for chatbot!
    } catch {
      return null;
    }
  });

  // Chapter Progress Map State (Persisted in LocalStorage)
  const [progressMap, setProgressMap] = useState<Record<number, ChapterProgress>>(() => {
    try {
      const storageKey = currentUser
        ? `mathsguru_progress_${currentUser.email}`
        : 'mathsguru_progress_guest';
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);

      // Initial realistic defaults for Class 12 preparation
      const initialMap: Record<number, ChapterProgress> = {
        1: { chapterId: 1, status: 'need_practice', updatedAt: new Date().toISOString() },
        2: { chapterId: 2, status: 'mastered', updatedAt: new Date().toISOString() },
        3: { chapterId: 3, status: 'mastered', updatedAt: new Date().toISOString() },
        4: { chapterId: 4, status: 'mastered', updatedAt: new Date().toISOString() },
        5: { chapterId: 5, status: 'need_practice', updatedAt: new Date().toISOString() },
        7: { chapterId: 7, status: 'need_practice', updatedAt: new Date().toISOString() },
        10: { chapterId: 10, status: 'mastered', updatedAt: new Date().toISOString() },
      };
      return initialMap;
    } catch {
      return {};
    }
  });

  // Sync progressMap whenever it changes
  useEffect(() => {
    try {
      const storageKey = currentUser
        ? `mathsguru_progress_${currentUser.email}`
        : 'mathsguru_progress_guest';
      localStorage.setItem(storageKey, JSON.stringify(progressMap));
    } catch (e) {
      console.error('Failed to persist progress', e);
    }
  }, [progressMap, currentUser]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mathsguru_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
  }, []);

  const handleUpdateStatus = (chapterId: number, status: ChapterStatus) => {
    setProgressMap((prev) => ({
      ...prev,
      [chapterId]: {
        chapterId,
        status,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('શું તમે તમામ પ્રકરણોનો પ્રોગ્રેસ રીસેટ કરવા માંગો છો?')) {
      setProgressMap({});
    }
  };

  const handleSignIn = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('mathsguru_user', JSON.stringify(user));
      // Load user's saved progress if exists
      const userProgress = localStorage.getItem(`mathsguru_progress_${user.email}`);
      if (userProgress) {
        setProgressMap(JSON.parse(userProgress));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('mathsguru_user');
    } catch (e) {
      console.error(e);
    }
  };

  const saveToHistory = (solution: MathSolution, promptText: string) => {
    try {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        previewPrompt: promptText,
        solution,
      };
      const updated = [newItem, ...history.slice(0, 19)];
      setHistory(updated);
      localStorage.setItem('mathsguru_history', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to history', e);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('mathsguru_history');
    } catch (e) {}
  };

  const handleSolve = async ({
    prompt,
    image,
    language,
    mode,
  }: {
    prompt: string;
    image?: { mimeType: string; base64: string };
    language: LanguageMode;
    mode: SolveMode;
  }) => {
    setLoading(true);
    setError(null);
    setActiveLanguage(language);

    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          image,
          language,
          mode,
          userEmail: currentUser?.email,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to analyze and solve problem.');
      }

      setCurrentSolution(result.data);
      saveToHistory(result.data, prompt || 'Handwritten Problem');

      // Scroll to solution
      window.scrollTo({
        top: 550,
        behavior: 'smooth',
      });
    } catch (err: any) {
      console.error('Solve error:', err);
      setError(
        err.message ||
          'દાખલો ઉકેલવામાં ક્ષતિ આવી છે. કૃપા કરીને લખાણ અથવા ફોટો તપાસીને ફરી પ્રયત્ન કરો.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setCurrentSolution(item.solution);
    setActiveTab('solver');
  };

  const handleLoadSampleFromPrompt = (problemText: string) => {
    setInitialPrompt(problemText);
    setActiveTab('solver');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Dashboard calculations
  const totalChapters = CLASS_12_CHAPTERS.length;
  const masteredCount = CLASS_12_CHAPTERS.filter(
    (c) => progressMap[c.id]?.status === 'mastered'
  ).length;
  const needPracticeCount = CLASS_12_CHAPTERS.filter(
    (c) => progressMap[c.id]?.status === 'need_practice'
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenFormulaBook={() => setFormulaBookOpen(true)}
        onOpenHistory={() => setHistoryOpen(true)}
        historyCount={history.length}
        currentUser={currentUser}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenDataVault={() => setDataVaultOpen(true)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* TAB 1: MATHS SOLVER VIEW */}
        {activeTab === 'solver' && (
          <>
            {/* Hero Section (Matching User HTML Gradient & Accents) */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-950/40 via-purple-950/50 to-cyan-950/40 p-6 sm:p-10 border border-white/15 shadow-2xl backdrop-blur-md">
              <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-10 -top-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 flex flex-col gap-4">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-semibold w-fit">
                    <Sparkles className="w-3.5 h-3.5" /> ધોરણ 12 ગણિત સ્પેશિયલ ડિજિટલ પોર્ટલ
                  </span>

                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    MathsGuru AI :{' '}
                    <span className="bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                      દાખલા સોલ્વર &amp; વિઝ્યુઅલ ગાઈડ
                    </span>
                  </h1>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                    હાથથી લખેલી નોટબુકનો ફોટો પાડો, વ્હાઇટબોર્ડ પર લખો અથવા સમીકરણ ટાઈપ કરો. GSEB બોર્ડ
                    અભ્યાસક્રમ આધારિત સ્ટેપ-બાય-સ્ટેપ સોલ્યુશન, સૂત્રો અને GUJCET શોર્ટકટ્સ મેળવો.
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-emerald-300 border border-white/10">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {masteredCount} પ્રકરણો Mastered
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-pink-300 border border-white/10">
                      <Flame className="w-3.5 h-3.5" />
                      {needPracticeCount} પ્રકરણો Need Practice
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('progress')}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold hover:scale-105 transition-transform"
                    >
                      પ્રોગ્રેસ ટ્રેકર જુઓ &rarr;
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3">
                  <div
                    onClick={() => setActiveTab('chat')}
                    className="group cursor-pointer p-4 rounded-2xl bg-slate-950/70 border border-white/15 hover:border-pink-500/50 hover:bg-slate-900/80 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center font-bold border border-pink-500/30">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-100 group-hover:text-pink-300 transition-colors">
                          AI ચેટબોટ સાથે વાત કરો
                        </div>
                        <div className="text-[11px] text-slate-400">મુક્તપણે ગણિતની શંકા પૂછો</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div
                    onClick={() => setFormulaBookOpen(true)}
                    className="group cursor-pointer p-4 rounded-2xl bg-slate-950/70 border border-white/15 hover:border-amber-500/50 hover:bg-slate-900/80 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold border border-amber-500/30">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                          બોર્ડ ફોર્મ્યુલા હેન્ડબુક
                        </div>
                        <div className="text-[11px] text-slate-400">13 પ્રકરણોના મુખ્ય સૂત્રો</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-900/60 text-rose-200 text-sm flex items-start gap-3 shadow-lg">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-rose-300">ભૂલ: </span>
                  {error}
                </div>
                <button
                  type="button"
                  onClick={() => setError(null)}
                  className="text-xs text-rose-300 hover:text-white underline font-semibold"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Main Problem Input Section */}
            <ProblemInputSection
              onSolve={handleSolve}
              loading={loading}
              onOpenFormulaBook={() => setFormulaBookOpen(true)}
              initialPrompt={initialPrompt}
            />

            {/* Solution Card & Inline Follow-up Chat */}
            {currentSolution && (
              <div className="flex flex-col gap-8 mt-2">
                <SolutionCard
                  solution={currentSolution}
                  onEditTranscription={(t) => {
                    setInitialPrompt(t);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  onSolveSimilar={(similar) => {
                    setInitialPrompt(similar);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                />

                <FollowUpChat
                  currentSolution={currentSolution}
                  language={activeLanguage}
                />
              </div>
            )}
          </>
        )}

        {/* TAB 2: PERSISTENT PROGRESS TRACKER VIEW */}
        {activeTab === 'progress' && (
          <ProgressTrackerCard
            progressMap={progressMap}
            onUpdateStatus={handleUpdateStatus}
            onResetProgress={handleResetProgress}
            onSelectChapterProblem={handleLoadSampleFromPrompt}
            currentUser={currentUser}
            onOpenAuthModal={() => setAuthModalOpen(true)}
          />
        )}

        {/* TAB 3: DEDICATED SEPARATE CHATBOT VIEW (GATED BEHIND GOOGLE SIGN-IN) */}
        {activeTab === 'chat' && (
          <DedicatedChatbot
            language={activeLanguage}
            onLanguageChange={setActiveLanguage}
            currentUser={currentUser}
            onOpenAuthModal={() => setAuthModalOpen(true)}
            onOpenDataVault={() => setDataVaultOpen(true)}
          />
        )}
      </main>

      {/* Floating Action Button to Switch to Chatbot quickly if not on chat tab */}
      {activeTab !== 'chat' && (
        <button
          type="button"
          onClick={() => {
            if (!currentUser) {
              setAuthModalOpen(true);
            } else {
              setActiveTab('chat');
            }
          }}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-2xl shadow-pink-600/40 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-white/20"
          title={currentUser ? "MathsGuru AI ચેટબોટ ખોલો" : "ચેટ કરવા માટે Google વડે સાઇન-ઇન કરો"}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden sm:inline text-xs">
            {currentUser ? 'AI ચેટબોટ' : 'ચેટ (Login)'}
          </span>
        </button>
      )}

      {/* Footer (Styled matching user HTML portal) */}
      <footer className="mt-16 bg-slate-950/90 border-t border-white/10 py-8 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="font-semibold text-slate-300">
            ✨ ધોરણ - 12 ગણિત દર્પણ | MathsGuru AI મલ્ટીમોડલ પોર્ટલ ✨
          </p>
          <p className="text-xs text-slate-500">
            ગુજરાત માધ્યમિક અને ઉચ્ચતર માધ્યમિક શિક્ષણ બોર્ડ (GSEB) તથા NCERT અભ્યાસક્રમ મુજબ તૈયાર કરેલ સહાયક.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <FormulaBookModal
        isOpen={formulaBookOpen}
        onClose={() => setFormulaBookOpen(false)}
        onSelectSampleProblem={handleLoadSampleFromPrompt}
      />

      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        onClearHistory={handleClearHistory}
      />

      <GoogleAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      <DataVaultModal
        isOpen={dataVaultOpen}
        onClose={() => setDataVaultOpen(false)}
        currentUser={currentUser}
        progressMap={progressMap}
        historyCount={history.length}
      />
    </div>
  );
}
