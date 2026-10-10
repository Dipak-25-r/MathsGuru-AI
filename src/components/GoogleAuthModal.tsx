import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, LogOut, Sparkles, User, Cloud } from 'lucide-react';
import { UserProfile } from '../types';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onSignIn: (user: UserProfile) => void;
  onSignOut: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSignIn,
  onSignOut,
}) => {
  const [emailInput, setEmailInput] = useState('ds0414803@gmail.com');
  const [nameInput, setNameInput] = useState('Divyesh (Class 12 Maths)');

  if (!isOpen) return null;

  const handleSimulateGoogleSignIn = () => {
    const newUser: UserProfile = {
      id: 'google-user-' + Date.now(),
      name: nameInput || 'Class 12 Student',
      email: emailInput || 'student@gmail.com',
      photoUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(emailInput || 'student')}`,
      signedInAt: new Date().toISOString(),
    };
    onSignIn(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-6 sm:p-8 shadow-2xl text-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <span className="text-xl">📐</span>
          </div>
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
              {currentUser ? 'તમારું પ્રોફાઇલ' : 'Google સાઇન-ઇન (Sign in with Google)'}
            </h3>
            <p className="text-xs text-slate-400">MathsGuru AI • પ્રગતિ સાચવવા માટે</p>
          </div>
        </div>

        {currentUser ? (
          /* Logged In View */
          <div className="flex flex-col gap-5">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <img
                src={currentUser.photoUrl}
                alt={currentUser.name}
                className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-pink-500/40 p-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-100 truncate">{currentUser.name}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> સક્રિય
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">{currentUser.email}</p>
                <div className="text-[11px] text-pink-300 mt-1 flex items-center gap-1">
                  <Cloud className="w-3 h-3 text-cyan-400" /> ક્લાઉડ પ્રોગ્રેસ સિન્ક થયેલ છે
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>કનેક્ટેડ પ્રોવાઇડર:</span>
                <span className="font-semibold text-slate-200 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  Google Account
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>પ્રગતિ સ્થિતિ:</span>
                <span className="font-semibold text-emerald-400">Mastered &amp; Need Practice Saved</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-rose-950/40 text-rose-300 border border-white/10 hover:border-rose-900/50 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              સાઇન આઉટ કરો (Sign Out)
            </button>
          </div>
        ) : (
          /* Sign In View */
          <div className="flex flex-col gap-5">
            <p className="text-xs text-slate-300 leading-relaxed">
              Google એકાઉન્ટ વડે સાઇન-ઇન કરીને તમારો પ્રકરણવાર 'Mastered' અને 'Need Practice' પ્રોગ્રેસ હંમેશા સુરક્ષિત રાખો.
            </p>

            {/* Google Sign-in Primary Button */}
            <button
              type="button"
              onClick={handleSimulateGoogleSignIn}
              className="w-full py-3.5 px-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[11px] text-slate-500 uppercase tracking-wider">અથવા વિગતો કન્ફર્મ કરો</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">વિદ્યાર્થીનું નામ</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="તમારું નામ"
                  className="w-full bg-slate-950/70 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Google Email</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full bg-slate-950/70 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>તમારો ડેટા સુરક્ષિત રીતે સચવાય છે</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
