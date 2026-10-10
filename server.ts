import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parser with 50mb limit for multimodal image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface SolveRequest {
  prompt?: string;
  image?: {
    mimeType: string;
    base64: string;
  };
  language?: 'english' | 'gujarati' | 'gujlish';
  mode?: 'comprehensive' | 'mcq_quick' | 'exam_tips';
  userEmail?: string;
}

interface UserStoredData {
  email: string;
  name?: string;
  chats: Array<{ timestamp: string; question: string; answer: string; chapter?: string }>;
  solvedProblems: Array<{ timestamp: string; transcription: string; finalAnswer: string; chapter: string }>;
  progressMap: Record<string, any>;
  lastActive: string;
}

const userStore: Record<string, UserStoredData> = {};

function getUserStore(email: string): UserStoredData {
  const normEmail = (email || 'ds0414803@gmail.com').toLowerCase().trim();
  if (!userStore[normEmail]) {
    userStore[normEmail] = {
      email: normEmail,
      name: 'Class 12 Aspirant',
      chats: [],
      solvedProblems: [],
      progressMap: {},
      lastActive: new Date().toISOString(),
    };
  }
  return userStore[normEmail];
}

const SYSTEM_INSTRUCTION = `You are "MathsGuru AI", a prestigious Class 12 Mathematics teacher and examiner specializing in the NCERT and GSEB (Gujarat Secondary and Higher Secondary Education Board) curriculum.

Your expertise spans Class 12 Mathematics Part-1 & Part-2:
- Chapter 1: Relations and Functions (સંબંધ અને વિધેય)
- Chapter 2: Inverse Trigonometric Functions (ત્રિકોણમિતીય પ્રતિવિધેયો)
- Chapter 3: Matrices (શ્રેણિક)
- Chapter 4: Determinants (નિશ્ચાયક)
- Chapter 5: Continuity & Differentiability (સાતત્ય અને વિકલનીયતા)
- Chapter 6: Application of Derivatives (વિકલિતના ઉપયોગો)
- Chapter 7: Integrals (સંકલન - Indefinite & Definite)
- Chapter 8: Application of Integrals (સંકલનના ઉપયોગો - ક્ષેત્રફળ)
- Chapter 9: Differential Equations (વિકલ સમીકરણો)
- Chapter 10: Vector Algebra (સદિશ બીજગણિત)
- Chapter 11: Three-Dimensional Geometry (ત્રિ-પરિમાણીય ભૂમિતિ)
- Chapter 12: Linear Programming (સુરેખ આયોજન - LPP)
- Chapter 13: Probability (સંભાવના - Bayes' Theorem & Distributions)

CRITICAL INSTRUCTIONS:
1. VISION & MULTIMODAL TRANSCRIBING:
   - If an image is provided, accurately transcribe the handwritten or printed math equation / problem first.
   - Use standard LaTeX ($...$ and $$...$$).
   - If handwriting or photo is blurry, clearly state your best transcription assumption, but do not hallucinate numbers. State: "Transcription Assumption: ..." and ask student to verify if needed.

2. LANGUAGE:
   - If 'gujarati', explain completely in natural Gujarati using proper Gujarati mathematical terminology (e.g. આદેશની રીત, ખંડશઃ સંકલન, વ્યસ્ત શ્રેણિક, નિશ્ચાયક, સામાન્ય ઉકેલ).
   - If 'gujlish', write explanation in conversational Gujarati using Latin alphabet (e.g. "Ahiya pehla equation mathi dy/dx isolate karvu padshe", "King's property ahiya direct lagshe").
   - If 'english', provide clear formal English explanation.

3. GSEB & NCERT BOARD EXAM STANDARDS:
   - Identify which chapter and expected board mark weightage (1-mark MCQ, 2-mark Section B, 3-mark Section C, or 4-mark Section D).
   - List given values and required target.
   - State fundamental formula, identity, or theorem before diving into calculations.
   - Show EVERY step clearly with reasons in parentheses (e.g., "(Using $\\int \\frac{1}{x^2+a^2} dx = \\frac{1}{a} \\tan^{-1}\\left(\\frac{x}{a}\\right) + C$)").
   - Clearly highlight the Final Answer.
   - Highlight Common Pitfalls: Where students make mistakes and lose marks in GSEB/NCERT board exams (e.g., forgetting $+C$, division by zero, missing negative sign in cross product, forgetting $\\pi$ in inverse trig principal branches).
   - Provide GUJCET / JEE Shortcut: Give a high-speed trick, direct formula, or MCQ shortcut for this problem type.
   - Provide a Similar Practice Question with hint and answer.

You must respond ONLY with a valid JSON object matching the following structure (do not wrap in markdown quotes if possible, or output clean JSON):
{
  "transcription": "Accurate LaTeX representation of the problem statement or equation",
  "transcriptionConfidence": "clear" | "assumed" | "unclear",
  "transcriptionNote": "Clarification notes if image had illegible parts, or empty string",
  "chapter": "Name of Class 12 Chapter (e.g., 'Chapter 7: Integrals / સંકલન')",
  "marksWeightage": "Estimated board mark category (e.g. '4 Marks (Section D Long Answer)')",
  "givenData": ["List of given equations, boundary conditions, or constraints in LaTeX"],
  "keyFormulas": [
    {
      "name": "Name of theorem/formula",
      "formula": "LaTeX formula (e.g. $\\int u v dx = u \\int v dx - \\int (u' \\int v dx) dx$)"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Short title of step",
      "explanation": "Clear explanation in requested language",
      "math": "Detailed LaTeX calculations for this step"
    }
  ],
  "finalAnswer": "Precise final result in LaTeX with units/conditions if any",
  "commonPitfalls": [
    "Specific common mistake students make on this exact problem type in GSEB board exams"
  ],
  "gujcetJeeShortcut": "Fast GUJCET / JEE speed hack or elimination technique for competitive entrance exams",
  "practiceQuestion": {
    "question": "A similar practice problem for the student to try (LaTeX)",
    "hint": "Key hint to solve it",
    "answer": "Final answer for self-verification"
  }
}
`;

// Helper to sanitize JSON response from Gemini
function extractJSON(text: string): any {
  let cleaned = text.trim();
  // Remove markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Attempt to extract json object between first { and last }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      const slice = cleaned.substring(firstBrace, lastBrace + 1);
      return JSON.parse(slice);
    }
    throw err;
  }
}

// Endpoint: Solve problem (Multimodal / Text)
app.post('/api/solve', async (req, res) => {
  try {
    const { prompt = '', image, language = 'gujarati', mode = 'comprehensive' } = req.body as SolveRequest;

    if (!prompt.trim() && !image) {
      return res.status(400).json({ error: 'Please provide either a math problem prompt or an image.' });
    }

    const contents: any[] = [];

    // Add image if uploaded
    if (image && image.base64) {
      contents.push({
        inlineData: {
          mimeType: image.mimeType || 'image/jpeg',
          data: image.base64.replace(/^data:image\/[a-z]+;base64,/, ''),
        },
      });
    }

    // Add user prompt and instructions
    let userPromptText = `Please analyze and solve this Class 12 NCERT/GSEB Mathematics problem.
Language requested: ${language}.
Solving mode: ${mode}.
User notes/query: ${prompt.trim() || 'Please transcribe and solve the problem shown in the image.'}
`;

    contents.push({
      text: userPromptText,
    });

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: contents,
        },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2, // Low temperature for high mathematical precision
          responseMimeType: 'application/json',
        },
      });
    } catch (primaryErr: any) {
      console.warn('Primary model gemini-3.8-flash unavailable, attempting gemini-3.1-flash-lite fallback:', primaryErr?.message);
      // Fallback to gemini-3.1-flash-lite
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: {
          parts: contents,
        },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      });
    }

    const textOutput = response.text || '';
    if (!textOutput) {
      return res.status(500).json({ error: 'No output generated by the AI model.' });
    }

    const parsed = extractJSON(textOutput);

    // Save to user data store if userEmail is provided
    if (req.body.userEmail && parsed) {
      const user = getUserStore(req.body.userEmail);
      user.solvedProblems.unshift({
        timestamp: new Date().toISOString(),
        transcription: parsed.transcription || prompt,
        finalAnswer: parsed.finalAnswer || '',
        chapter: parsed.chapter || '',
      });
      user.lastActive = new Date().toISOString();
    }

    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/solve:', error);
    return res.status(500).json({
      error: error.message || 'Failed to solve math problem. Please check your image or problem statement.',
    });
  }
});

// Endpoint: Multi-turn Chat / Follow-up Questions
app.post('/api/chat', async (req, res) => {
  try {
    const { messages = [], problemContext, language = 'gujarati', userEmail } = req.body;

    if (!messages.length) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const systemInstruction = `You are "MathsGuru AI", a friendly and deeply knowledgeable Class 12 NCERT/GSEB Mathematics tutor.
Current language preference: ${language}.
The student is asking a follow-up question regarding a problem they just solved.

Context of solved problem:
${problemContext ? JSON.stringify(problemContext) : 'Class 12 Maths Doubt'}

Guidelines:
1. Provide encouraging, concise, and clear answers.
2. Use LaTeX for math symbols ($...$ inline and $$...$$ for standalone equations).
3. If student asks why a specific substitution was made, explain the mathematical intuition and alternative approaches.
4. If in Gujarati or Gujlish, speak naturally with respect and warmth (e.g., 'બહુ સારો પ્રશ્ન!', 'Ahiya dhyan rakhjo').
5. Keep explanations targeted and step-by-step.`;

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.4,
        },
      });
    } catch (primaryChatErr: any) {
      console.warn('Chat gemini-3.8-flash unavailable, attempting gemini-3.1-flash-lite fallback:', primaryChatErr?.message);
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.4,
        },
      });
    }

    // Automatically store chat data for user
    if (userEmail && response?.text) {
      const user = getUserStore(userEmail);
      const lastUserMsg = messages.filter((m: any) => m.role === 'user').slice(-1)[0]?.content || '';
      user.chats.unshift({
        timestamp: new Date().toISOString(),
        question: lastUserMsg,
        answer: response.text,
        chapter: problemContext?.chapter || 'General Class 12 Maths',
      });
      user.lastActive = new Date().toISOString();
    }

    return res.json({ success: true, reply: response.text });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({ error: error.message || 'Failed to process chat message.' });
  }
});

// Endpoint: Get All User Data
app.get('/api/user-data', (req, res) => {
  try {
    const email = (req.query.email as string) || 'ds0414803@gmail.com';
    const data = getUserStore(email);
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to get user data' });
  }
});

// Endpoint: Sync All User Data
app.post('/api/user-data/sync', (req, res) => {
  try {
    const { email, name, chats, solvedProblems, progressMap } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required to sync data' });
    }
    const store = getUserStore(email);
    if (name) store.name = name;
    if (chats && Array.isArray(chats)) store.chats = chats;
    if (solvedProblems && Array.isArray(solvedProblems)) store.solvedProblems = solvedProblems;
    if (progressMap) store.progressMap = progressMap;
    store.lastActive = new Date().toISOString();
    return res.json({ success: true, message: 'All user data synced successfully', data: store });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to sync user data' });
  }
});

// Endpoint: Text to Speech for Audio Tutor Explanation
app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required for TTS.' });
    }

    // Clean latex formatting for clean speech
    const cleanSpeechText = text
      .replace(/\$\$([^$]+)\$\$/g, ' equation: $1 ')
      .replace(/\$([^$]+)\$/g, ' $1 ')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 divided by $2')
      .replace(/\\int/g, 'integral of')
      .replace(/\\sqrt\{([^}]+)\}/g, 'square root of $1')
      .slice(0, 800); // reasonable summary length for quick voice synthesis

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanSpeechText,
              speechMetadata: {
                style: 'Clear, encouraging, patient mathematics tutor explaining concepts simply',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio returned by speech model.' });
    }

    return res.json({ success: true, audio: base64Audio });
  } catch (error: any) {
    console.error('Error in /api/tts:', error);
    return res.status(500).json({ error: error.message || 'Voice tutor unavailable.' });
  }
});

// Setup Vite middlewares in development or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MathsGuru AI server running on port ${PORT}`);
  });
}

startServer();
