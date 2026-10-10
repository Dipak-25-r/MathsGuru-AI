export interface KeyFormula {
  name: string;
  formula: string;
}

export interface SolutionStep {
  stepNumber: number;
  title: string;
  explanation: string;
  math: string;
}

export interface PracticeQuestion {
  question: string;
  hint: string;
  answer: string;
}

export interface MathSolution {
  transcription: string;
  transcriptionConfidence: 'clear' | 'assumed' | 'unclear';
  transcriptionNote?: string;
  chapter: string;
  marksWeightage: string;
  givenData: string[];
  keyFormulas: KeyFormula[];
  steps: SolutionStep[];
  finalAnswer: string;
  commonPitfalls: string[];
  gujcetJeeShortcut: string;
  practiceQuestion: PracticeQuestion;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export type LanguageMode = 'english' | 'gujarati' | 'gujlish';
export type SolveMode = 'comprehensive' | 'mcq_quick' | 'exam_tips';

export type ChapterStatus = 'mastered' | 'need_practice' | 'not_started';

export interface ChapterProgress {
  chapterId: number;
  status: ChapterStatus;
  updatedAt: string;
  notes?: string;
  confidence?: number; // 1 to 5
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  signedInAt: string;
}
