import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Lock,
  Database,
  Cloud,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { ChatMessage, LanguageMode, UserProfile } from '../types';
import { CLASS_12_CHAPTERS } from '../data/curriculum';
import { MathRenderer } from './MathRenderer';

interface DedicatedChatbotProps {
  language: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenDataVault: () => void;
}

export const DedicatedChatbot: React.FC<DedicatedChatbotProps> = ({
  language,
  currentUser,
  onOpenAuthModal,
  onOpenDataVault,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'model',
      content: `નમસ્તે! હું **MathsGuru AI** છું. ધોરણ 12 સાયન્સ ગણિત (GSEB / NCERT) ના કોઈપણ પ્રકરણની થીયરી, સૂત્ર, ગણતરી કે GUJCET/JEE શોર્ટકટ્સ વિશે મને મુક્તપણે પૂછો. \n\nહું તમામ ગાણિતિક સમીકરણો LaTeX ($...$) માં સ્ટેપ-બાય-સ્ટેપ સમજાવીશ! તમારો તમામ સંવાદ સુરક્ષિત સેવ થાય છે.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    'ત્રિકોણમિતીય પ્રતિવિધેયોની મુખ્ય કિંમત શોધવાની સરળ રીત',
    "સંકલનમાં King's Property ક્યારે વાપરવી?",
    'બેઇઝના પ્રમેયમાં P(A|B) અને P(B|A) વચ્ચેનો તફાવત',
    'શ્રેણિકના વ્યસ્ત (A⁻¹) શોધવાની સ્ટેપ પદ્ધતિ',
    'વિષમતલીય રેખાઓ વચ્ચેનું લઘુત્તમ અંતર કેવી રીતે મેળવવું?',
    'GUJCET ગણિતમાં સ્પીડ વધારવાની ટિપ્સ',
  ];

  // If user is NOT signed in, show Google Sign-In Gate
  if (!currentUser) {
    return (
      <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-indigo-950/90 to-purple-950/95 p-8 sm:p-14 shadow-2xl backdrop-blur-xl text-center flex flex-col items-center justify-center overflow-hidden min-h-[550px]">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg flex flex-col items-center gap-5">
          {/* Lock & Portal Icon */}
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center shadow-xl shadow-pink-500/30">
              <span className="text-3xl">📐</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-slate-950 border-2 border-pink-500 flex items-center justify-center text-pink-400 shadow-md">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-3">
              <Lock className="w-3.5 h-3.5" /> સાઇન-ઇન જરૂરી છે (Sign-in Required)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
              MathsGuru AI ચેટબોટ ઍક્સેસ
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              ગણિતના ડાઉટ્સ પૂછવા, ચેટબોટનો ઉપયોગ કરવા અને તમારો તમામ ડેટા સુરક્ષિત મેળવવા માટે Google વડે સાઇન-ઇન કરો.
            </p>
          </div>

          {/* Feature Highlights of signing in */}
          <div className="w-full text-left bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>તમામ પૂછેલા પ્રશ્નો અને ચેટ હિસ્ટ્રી ક્લાઉડમાં સેવ થશે</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ચેપ્ટર પ્રોગ્રેસ (Mastered &amp; Need Practice) એકાઉન્ટ સાથે સિન્ક થશે</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>એક ક્લિકમાં 'Download All Data (JSON)' થી તમારો તમામ ડેટા મળશે</span>
            </div>
          </div>

          {/* Prominent Google Sign-in Action Button (Fitts's Law) */}
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="w-full sm:w-auto min-h-[52px] py-3.5 px-8 rounded-2xl bg-white text-slate-950 font-bold text-sm sm:text-base shadow-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-105 active:scale-98"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Sign in with Google to Chat</span>
          </button>
        </div>
      </div>
    );
  }

  // If user IS signed in, render the full Chatbot
  const handleSend = async (overrideText?: string) => {
    const text = overrideText || input;
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overrideText) setInput('');
    setLoading(true);

    try {
      let problemContext = null;
      if (selectedChapterId !== 'all') {
        const chap = CLASS_12_CHAPTERS.find((c) => c.id === Number(selectedChapterId));
        if (chap) {
          problemContext = {
            chapter: `${chap.id}. ${chap.titleGu} (${chap.titleEn})`,
            weightage: chap.weightage,
            summary: chap.summaryGu,
          };
        }
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          problemContext,
          language,
          userEmail: currentUser.email, // Persist on server under this user!
        }),
      });

      const data = await response.json();
      if (data.reply) {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: data.reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to get answer');
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: `ક્ષમા કરશો, પ્રશ્નનો ઉકેલ મેળવવામાં ભૂલ આવી: ${
          err.message || 'કૃપા કરીને ફરીથી પ્રયત્ન કરો.'
        }`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlayVoice = async (id: string, text: string) => {
    if (playingAudioId === id && audioElement) {
      audioElement.pause();
      setPlayingAudioId(null);
      return;
    }

    try {
      setPlayingAudioId(id);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.audio) {
        const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
        setAudioElement(audio);
        audio.play();
        audio.onended = () => setPlayingAudioId(null);
        audio.onerror = () => setPlayingAudioId(null);
      } else {
        setPlayingAudioId(null);
      }
    } catch (e) {
      console.error(e);
      setPlayingAudioId(null);
    }
  };

  const insertSymbol = (sym: string) => {
    setInput((prev) => prev + sym);
  };

  return (
    <div className="flex flex-col h-[750px] max-h-[85vh] rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-indigo-950/90 to-purple-950/95 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Chatbot Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-lg shadow-pink-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                MathsGuru AI ચેટબોટ
              </h3>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span className="text-pink-300 font-semibold">{currentUser.name}</span>
              <span>•</span>
              <span className="truncate max-w-[150px]">{currentUser.email}</span>
            </div>
          </div>
        </div>

        {/* Chapter Focus Selector & Get All Data Button */}
        <div className="flex items-center gap-2.5">
          {/* Get All Data Button */}
          <button
            type="button"
            onClick={onOpenDataVault}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="તમારો તમામ સેવ થયેલો ડેટા જુઓ અને ડાઉનલોડ કરો"
          >
            <Database className="w-3.5 h-3.5" />
            <span>તમારો ડેટા (Get Data)</span>
          </button>

          <select
            value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}
            className="bg-white/5 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 cursor-pointer"
          >
            <option value="all" className="bg-slate-900 text-slate-100">
              સંપૂર્ણ અભ્યાસક્રમ (All)
            </option>
            {CLASS_12_CHAPTERS.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900 text-slate-100">
                Ch {c.id}: {c.titleGu}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setMessages([messages[0]])}
            title="નવી ચેટ શરૂ કરો"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/10 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-pink-500/20 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium shadow-lg shadow-pink-600/20'
                  : 'bg-slate-900/90 border border-white/15 text-slate-100 shadow-xl'
              }`}
            >
              {msg.role === 'user' ? (
                <div className="whitespace-pre-wrap">{msg.content}</div>
              ) : (
                <div className="space-y-3">
                  <MathRenderer content={msg.content} />

                  {/* Actions Bar for AI Response */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[11px] text-pink-300">MathsGuru GSEB AI</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePlayVoice(msg.id, msg.content)}
                        className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 text-[11px] ${
                          playingAudioId === msg.id
                            ? 'bg-pink-600 text-white border-pink-400 animate-pulse'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                        }`}
                      >
                        {playingAudioId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                        )}
                        <span>{playingAudioId === msg.id ? 'અવાજ બંધ કરો' : 'સાંભળો'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-white/10 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-5 py-3.5 rounded-2xl bg-slate-900 border border-white/15 flex items-center gap-2.5 text-xs text-pink-300 shadow-md">
              <Loader2 className="w-4 h-4 animate-spin text-pink-400" />
              <span>MathsGuru ગણિતનો ઉકેલ વિચારી રહ્યો છે...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pills */}
      <div className="px-4 py-2 border-t border-white/10 bg-slate-950/60 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-400 shrink-0">સૂચવેલા પ્રશ્નો:</span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(p)}
            className="shrink-0 px-3 py-1 rounded-full bg-white/5 hover:bg-pink-600/30 text-[11px] text-slate-300 hover:text-pink-200 border border-white/10 transition-all cursor-pointer"
          >
            💡 {p}
          </button>
        ))}
      </div>

      {/* Input Controls */}
      <div className="p-3.5 sm:p-4 border-t border-white/10 bg-slate-950/90 space-y-2">
        {/* Math Symbols Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[10px] text-slate-500 shrink-0 font-bold">સંકેતો:</span>
          {[
            { l: '∫ dx', v: '\\int f(x) dx ' },
            { l: 'dy/dx', v: '\\frac{dy}{dx} ' },
            { l: 'd²y/dx²', v: '\\frac{d^2y}{dx^2} ' },
            { l: '√x', v: '\\sqrt{x} ' },
            { l: 'tan⁻¹', v: '\\tan^{-1}(x) ' },
            { l: 'શ્રેણિક', v: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} ' },
            { l: 'ā · b̄', v: '\\vec{a} \\cdot \\vec{b} ' },
            { l: 'π', v: '\\pi ' },
          ].map((s) => (
            <button
              key={s.l}
              type="button"
              onClick={() => insertSymbol(s.v)}
              className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 font-mono text-[11px] shrink-0 border border-white/10 cursor-pointer"
            >
              {s.l}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ગણિતની શંકા અથવા પ્રશ્ન અહીં પૂછો (ઉદા. 'વિષમતલીય રેખાઓનું સૂત્ર સમજાવો')..."
            className="flex-1 bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold flex items-center justify-center shadow-lg shadow-pink-600/30 disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
