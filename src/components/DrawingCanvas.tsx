import React, { useRef, useState, useEffect } from 'react';
import { Eraser, RotateCcw, Pen, Trash2, Check, Grid, Sparkles } from 'lucide-react';

interface DrawingCanvasProps {
  onCaptureImage: (base64Image: string) => void;
  onCancel?: () => void;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  onCaptureImage,
  onCancel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [penColor, setPenColor] = useState<string>('#ffffff');
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [gridStyle, setGridStyle] = useState<'ruled' | 'grid' | 'blank'>('ruled');
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial background
    drawCanvasBackground(ctx, rect.width, rect.height, gridStyle);

    // Save initial state to history
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
  }, [gridStyle]);

  const drawCanvasBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    style: 'ruled' | 'grid' | 'blank'
  ) => {
    ctx.fillStyle = '#0f172a'; // slate-900 board color
    ctx.fillRect(0, 0, width, height);

    if (style === 'ruled') {
      ctx.strokeStyle = '#1e293b'; // subtle lines
      ctx.lineWidth = 1;
      const rowHeight = 36;
      for (let y = rowHeight; y < height; y += rowHeight) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else if (style === 'grid') {
      ctx.fillStyle = '#334155';
      const gap = 24;
      for (let x = gap; x < width; x += gap) {
        for (let y = gap; y < height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (tool === 'eraser') {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 24;
    } else {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save state to history for undo
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), state]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // remove current state
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setHistory(newHistory);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    drawCanvasBackground(ctx, rect.width, rect.height, gridStyle);
    const cleared = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([cleared]);
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Export high-quality image
    const dataUrl = canvas.toDataURL('image/png', 0.95);
    onCaptureImage(dataUrl);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 px-4 py-3 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-slate-800/90 p-1 border border-slate-700/60">
            <button
              type="button"
              onClick={() => setTool('pen')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                tool === 'pen'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Pen className="w-3.5 h-3.5" />
              Pen
            </button>
            <button
              type="button"
              onClick={() => setTool('eraser')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                tool === 'eraser'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              Eraser
            </button>
          </div>

          {/* Color buttons */}
          {tool === 'pen' && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-700/40">
              {[
                { color: '#ffffff', title: 'White' },
                { color: '#f59e0b', title: 'Amber Gold' },
                { color: '#38bdf8', title: 'Sky Blue' },
                { color: '#34d399', title: 'Emerald' },
                { color: '#f43f5e', title: 'Rose' },
              ].map((c) => (
                <button
                  key={c.color}
                  type="button"
                  title={c.title}
                  onClick={() => setPenColor(c.color)}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    penColor === c.color
                      ? 'scale-125 ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900'
                      : 'hover:scale-110 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.color }}
                />
              ))}
            </div>
          )}

          {/* Stroke width */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800/60 px-2 py-1 rounded-lg border border-slate-700/40">
            {[2, 4, 6].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setLineWidth(w)}
                className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold transition-all ${
                  lineWidth === w
                    ? 'bg-slate-700 text-amber-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {w === 2 ? 'Fine' : w === 4 ? 'Med' : 'Bold'}
              </button>
            ))}
          </div>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2">
          {/* Background pattern */}
          <div className="flex items-center rounded-lg bg-slate-800/60 p-1 border border-slate-700/40 text-xs">
            <button
              type="button"
              onClick={() => setGridStyle('ruled')}
              className={`px-2 py-1 rounded ${
                gridStyle === 'ruled' ? 'bg-slate-700 text-amber-300' : 'text-slate-400'
              }`}
            >
              Ruled
            </button>
            <button
              type="button"
              onClick={() => setGridStyle('grid')}
              className={`px-2 py-1 rounded ${
                gridStyle === 'grid' ? 'bg-slate-700 text-amber-300' : 'text-slate-400'
              }`}
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => setGridStyle('blank')}
              className={`px-2 py-1 rounded ${
                gridStyle === 'blank' ? 'bg-slate-700 text-amber-300' : 'text-slate-400'
              }`}
            >
              Blank
            </button>
          </div>

          <button
            type="button"
            onClick={handleUndo}
            disabled={history.length <= 1}
            title="Undo"
            className="p-1.5 rounded-lg border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleClear}
            title="Clear Board"
            className="p-1.5 rounded-lg border border-slate-700/60 text-rose-400 hover:bg-rose-950/40 hover:border-rose-800 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full h-[280px] sm:h-[340px] bg-slate-900 cursor-crosshair touch-none select-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <div className="absolute bottom-2 left-3 pointer-events-none text-[11px] text-slate-500 font-mono tracking-tight bg-slate-950/70 px-2 py-0.5 rounded border border-slate-800">
          ✏️ Draw math formulas, equations, or matrices using mouse or finger
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between border-t border-slate-800/80 px-4 py-3 bg-slate-950/80">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            Close Scratchpad
          </button>
        )}
        <button
          type="button"
          onClick={handleExport}
          className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Analyze & Solve Handwritten Problem
        </button>
      </div>
    </div>
  );
};
