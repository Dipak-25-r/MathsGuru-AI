import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Database,
  Cloud,
  MessageSquare,
  Calculator,
  Trophy,
  RefreshCw,
  FileText,
  User,
  ShieldCheck,
} from 'lucide-react';
import { UserProfile, ChapterProgress } from '../types';
import { CLASS_12_CHAPTERS } from '../data/curriculum';

interface DataVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  progressMap: Record<number, ChapterProgress>;
  historyCount: number;
}

export const DataVaultModal: React.FC<DataVaultModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  progressMap,
  historyCount,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'summary' | 'chats' | 'solved' | 'progress'>('summary');
  const [serverData, setServerData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchUserData();
    }
  }, [isOpen, currentUser]);

  const fetchUserData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/user-data?email=${encodeURIComponent(currentUser.email)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setServerData(json.data);
      }
    } catch (e) {
      console.error('Failed to fetch user data', e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Compute aggregated stats
  const masteredCount = CLASS_12_CHAPTERS.filter((c) => progressMap[c.id]?.status === 'mastered').length;
  const needPracticeCount = CLASS_12_CHAPTERS.filter((c) => progressMap[c.id]?.status === 'need_practice').length;
  const serverChats = serverData?.chats || [];
  const serverSolved = serverData?.solvedProblems || [];

  const handleDownloadJson = () => {
    const fullExport = {
      exportDate: new Date().toISOString(),
      studentProfile: currentUser,
      summary: {
        totalChapters: 13,
        masteredChapters: masteredCount,
        needPracticeChapters: needPracticeCount,
        totalChatQueries: serverChats.length,
        totalSolvedHistory: historyCount,
      },
      chapterProgress: CLASS_12_CHAPTERS.map((c) => ({
        chapterId: c.id,
        titleGu: c.titleGu,
        titleEn: c.titleEn,
        status: progressMap[c.id]?.status || 'not_started',
        weightage: c.weightage,
      })),
      chatHistory: serverChats,
      solvedHistory: serverSolved,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `MathsGuru_Data_${currentUser?.email || 'student'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyReport = () => {
    let report = `# MathsGuru AI - Class 12 Maths Progress Report\n`;
    report += `**Student:** ${currentUser?.name || 'Student'} (${currentUser?.email || 'N/A'})\n`;
    report += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    report += `## Chapter Mastery Summary\n`;
    report += `- 🏆 Mastered Chapters: ${masteredCount} / 13 (${Math.round((masteredCount / 13) * 100)}%)\n`;
    report += `- 📝 Need Practice: ${needPracticeCount} / 13\n`;
    report += `- ⏳ Remaining: ${13 - masteredCount - needPracticeCount} / 13\n\n`;
    report += `## Chapter Details\n`;
    CLASS_12_CHAPTERS.forEach((c) => {
      const st = progressMap[c.id]?.status || 'not_started';
      const label = st === 'mastered' ? '🏆 Mastered' : st === 'need_practice' ? '📝 Need Practice' : '⏳ Not Started';
      report += `- Ch ${c.id}: ${c.titleGu} (${c.titleEn}) - **${label}** [${c.weightage}]\n`;
    });

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl h-[88vh] flex flex-col rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-pink-500/30">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                  તમારો ડેટા વોલ્ટ (My Data Vault &amp; Export)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Cloud Synced
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {currentUser ? currentUser.email : 'Google Account Not Connected'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-950/40 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 font-semibold block">ચેટ પ્રશ્નો (Chats)</span>
            <span className="text-xl font-bold text-cyan-300">{serverChats.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 font-semibold block">ઉકેલેલા દાખલા</span>
            <span className="text-xl font-bold text-amber-300">{historyCount}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 font-semibold block">Mastered Chapters</span>
            <span className="text-xl font-bold text-emerald-300">{masteredCount} / 13</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 font-semibold block">Need Practice</span>
            <span className="text-xl font-bold text-pink-300">{needPracticeCount}</span>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="px-5 pt-3 border-b border-white/10 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'summary' as const, label: 'સમરી રિપોર્ટ (Summary)' },
            { id: 'chats' as const, label: `ચેટ ડેટા (${serverChats.length})` },
            { id: 'solved' as const, label: `ઉકેલેલા દાખલા (${serverSolved.length || historyCount})` },
            { id: 'progress' as const, label: 'ચેપ્ટર પ્રોગ્રેસ' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? 'border-pink-500 text-pink-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeSubTab === 'summary' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 leading-relaxed">
                <h4 className="font-bold text-slate-200 flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  તમારો ડેટા સુરક્ષિત અને સંપૂર્ણ ઉપલબ્ધ છે
                </h4>
                <p className="text-slate-300">
                  તમારો તમામ ચેટ સંવાદ, પૂછેલા પ્રશ્નો, ગણેલા દાખલા અને 13 પ્રકરણોની પ્રગતિ તમારા એકાઉન્ટ સાથે સેવ થયેલ છે. તમે ગમે ત્યારે તેને નીચેના બટન પરથી ડાઉનલોડ અથવા કોપી કરી શકો છો.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-950/60">
                <div className="p-3 bg-white/5 font-bold text-slate-300 text-xs">
                  પ્રકરણવાર તૈયારી સ્થિતિ (Class 12 NCERT/GSEB)
                </div>
                <div className="divide-y divide-white/5 text-xs">
                  {CLASS_12_CHAPTERS.map((c) => {
                    const st = progressMap[c.id]?.status || 'not_started';
                    return (
                      <div key={c.id} className="p-3 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-200">Ch {c.id}: {c.titleGu}</span>
                          <span className="text-[11px] text-slate-400 ml-2">({c.titleEn})</span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            st === 'mastered'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : st === 'need_practice'
                              ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {st === 'mastered' ? '✓ Mastered' : st === 'need_practice' ? '• Need Practice' : 'Not Started'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'chats' && (
            <div className="space-y-3">
              {serverChats.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  હજુ સુધી કોઈ ચેટ પ્રશ્ન પૂછેલ નથી. ચેટબોટમાં વાતચીત શરૂ કરો!
                </div>
              ) : (
                serverChats.map((c: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-pink-300 font-bold">{c.chapter}</span>
                      <span>{new Date(c.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="font-semibold text-slate-200">
                      <span className="text-cyan-400">પ્રશ્ન:</span> {c.question}
                    </div>
                    <div className="text-slate-300 line-clamp-3 bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                      <span className="text-emerald-400 font-bold">ઉકેલ:</span> {c.answer}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSubTab === 'solved' && (
            <div className="space-y-3">
              {serverSolved.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  હજુ સુધી કોઈ દાખલો સોલ્વરમાં સેવ થયો નથી.
                </div>
              ) : (
                serverSolved.map((s: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-amber-300 font-bold">{s.chapter}</span>
                      <span>{new Date(s.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-slate-200 font-medium">
                      {s.transcription}
                    </div>
                    <div className="text-emerald-300 font-bold">
                      જવાબ: {s.finalAnswer}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSubTab === 'progress' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {CLASS_12_CHAPTERS.map((c) => {
                const st = progressMap[c.id]?.status || 'not_started';
                return (
                  <div key={c.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-slate-200 mb-0.5">Ch {c.id}: {c.titleGu}</div>
                      <div className="text-[11px] text-slate-400 mb-2">{c.titleEn}</div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-amber-400 font-bold text-[11px]">{c.weightage}</span>
                      <span className="font-bold text-slate-300 capitalize">{st.replace('_', ' ')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyReport}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'રિપોર્ટ કોપી થયો!' : 'રિપોર્ટ કોપી કરો'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownloadJson}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-pink-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download All Data (JSON)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
