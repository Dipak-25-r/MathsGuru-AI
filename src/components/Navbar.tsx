import React from 'react';
import {
  Sparkles,
  BookOpen,
  History,
  Trophy,
  MessageSquare,
  Calculator,
  User,
  CheckCircle2,
  Database,
} from 'lucide-react';
import { UserProfile } from '../types';

export type ActiveTab = 'solver' | 'progress' | 'chat';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenFormulaBook: () => void;
  onOpenHistory: () => void;
  historyCount: number;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenDataVault?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenFormulaBook,
  onOpenHistory,
  historyCount,
  currentUser,
  onOpenAuthModal,
  onOpenDataVault,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/85 border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
        {/* Brand / Logo (Gradient & Icon from User's HTML) */}
        <div
          onClick={() => onSelectTab('solver')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-105 transition duration-300">
            <span className="text-xl">📐</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                MathsGuru AI
              </h1>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                ધોરણ 12 GSEB / NCERT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden xs:block">
              ડાયનેમિક મેથ્સ પોર્ટલ &amp; પ્રોગ્રેસ ટ્રેકર
            </p>
          </div>
        </div>

        {/* Center Main Tab Navigation (Hick's Law optimized options) */}
        <nav className="hidden md:flex items-center space-x-1.5 bg-white/5 p-1.5 rounded-full border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => onSelectTab('solver')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'solver'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-600/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            દાખલા સોલ્વર
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('progress')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'progress'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-600/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            પ્રોગ્રેસ ટ્રેકર
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('chat')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-600/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-300" />
            AI ચેટબોટ
          </button>

          <button
            type="button"
            onClick={onOpenFormulaBook}
            className="px-3.5 py-2 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-pink-400" />
            ફોર્મ્યુલા હેન્ડબુક
          </button>
        </nav>

        {/* Right Actions: Google Sign In / Account & History */}
        <div className="flex items-center gap-2">
          {/* Google Sign-in / User Profile Button */}
          <button
            type="button"
            onClick={onOpenAuthModal}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
              currentUser
                ? 'bg-white/10 hover:bg-white/20 text-slate-100 border-white/20'
                : 'bg-white text-slate-900 hover:bg-slate-100 shadow-md shadow-white/10'
            }`}
          >
            {currentUser ? (
              <>
                <img
                  src={currentUser.photoUrl}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full bg-slate-800"
                />
                <span className="hidden sm:inline truncate max-w-[100px]">{currentUser.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="hidden sm:inline">Sign in with Google</span>
                <span className="sm:hidden">Sign In</span>
              </>
            )}
          </button>

          {/* Data Vault Button (Active when signed in) */}
          {currentUser && onOpenDataVault && (
            <button
              type="button"
              onClick={onOpenDataVault}
              className="min-h-[38px] px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="તમારો તમામ ડેટા (My Data Vault & Export)"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden md:inline">તમારો ડેટા</span>
            </button>
          )}

          {/* History Button */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="min-h-[38px] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors relative cursor-pointer"
            title="ઇતિહાસ (History)"
          >
            <History className="w-4 h-4 text-cyan-300" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold bg-pink-500 text-white flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-white/10 bg-slate-950/90 py-2 px-2 text-xs">
        <button
          type="button"
          onClick={() => onSelectTab('solver')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl ${
            activeTab === 'solver' ? 'text-pink-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>સોલ્વર</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('progress')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl ${
            activeTab === 'progress' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>પ્રોગ્રેસ</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('chat')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl ${
            activeTab === 'chat' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>ચેટબોટ</span>
        </button>

        <button
          type="button"
          onClick={onOpenFormulaBook}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-slate-400 hover:text-slate-200"
        >
          <BookOpen className="w-4 h-4" />
          <span>હેન્ડબુક</span>
        </button>
      </div>
    </header>
  );
};
