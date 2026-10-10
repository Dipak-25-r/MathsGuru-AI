import React from 'react';
import { X, Trash2, Clock, ChevronRight, BookOpen } from 'lucide-react';
import { MathSolution } from '../types';
import { MathRenderer } from './MathRenderer';

export interface HistoryItem {
  id: string;
  timestamp: string;
  previewPrompt: string;
  solution: MathSolution;
}

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md h-full bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-slate-100">Solved Problems History</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
              {history.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400">
              <Clock className="w-10 h-10 mb-2 text-slate-600" />
              <p className="text-sm font-semibold">No problems solved yet</p>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Upload a problem photo or type an equation to solve and save it to your revision history.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectHistoryItem(item);
                  onClose();
                }}
                className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/60 hover:border-amber-500/40 p-4 transition-all"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                  <span className="text-amber-400 font-bold truncate max-w-[180px]">
                    {item.solution.chapter}
                  </span>
                  <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="text-xs text-slate-200 line-clamp-2 font-medium mb-2">
                  {item.solution.transcription || item.previewPrompt}
                </div>
                <div className="flex items-center justify-between text-[11px] text-indigo-300 font-semibold pt-2 border-t border-slate-900">
                  <span className="truncate max-w-[200px]">Ans: {item.solution.finalAnswer}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="border-t border-slate-800 p-4 bg-slate-950/80">
            <button
              type="button"
              onClick={onClearHistory}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-900/40 text-rose-300 hover:bg-rose-950/30 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Revision History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
