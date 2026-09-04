import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, MessageCircle, Bot } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    whatsappText: string;
  };
}

const QUICK_STARTERS = [
  {
    label: '🎬 סרט פרסומת למותג / מוצר',
    prompt: 'אני רוצה להפיק סרט פרסומת ב-AI עבור מוצר או מותג.'
  },
  {
    label: '🏢 סרטון תדמית והסברה לארגון',
    prompt: 'אנחנו מחפשים סרטון תדמית קולנועי ב-AI לחברה או ארגון.'
  },
  {
    label: '📱 קמפיין רילס / טיקטוק ממומן',
    prompt: 'אני צריך סדרת סרטונים אנכיים בקצב מהיר לרשתות החברתיות.'
  },
  {
    label: '💡 סיעור מוחות על רעיון מיוחד',
    prompt: 'יש לי רעיון ראשוני לסרט ואני רוצה לבדוק איך אפשר לבצע אותו ב-AI.'
  }
];

export const StudioAiConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'שלום! 👋 אני עוזר הקריאייטיב הדיגיטלי של סטודיו AmitAI.\n\nספרו לי על הסרטון שאתם רוצים להפיק, ואתן לכם כיוון קריאייטיבי ראשוני והערכה מהירה:',
      timestamp: 'עכשיו'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateAiReply = (userPrompt: string): { replyText: string; whatsappSummary: string } => {
    const lower = userPrompt.toLowerCase();

    if (lower.includes('פרסומת') || lower.includes('מותג') || lower.includes('מוצר')) {
      return {
        replyText: 'מעולה! עבור פרסומת מוצר/מותג ב-AI, אמיתי בונה קונספט שמדגיש את ערכי המותג בשילוב תנועות מצלמה קולנועיות ותאורה יוקרתית (בדומה לפרויקט של CBC ו-WIN CAMP).\n\n⏱️ אספקה: כ-5-7 ימי עבודה\n🎬 כולל: תסריט, שחקנים/דמויות ב-AI, ועריכת סאונד 4K.',
        whatsappSummary: `היי אמיתי, דיברתי עם עוזר ה-AI באתר לגבי הפקת פרסומת: "${userPrompt}". אשמח לתאם שיחה קצרה!`
      };
    }

    if (lower.includes('תדמית') || lower.includes('ארגון') || lower.includes('חברה') || lower.includes('משרד')) {
      return {
        replyText: 'מצוין! סרטוני תדמית והסברה ב-AI מתאימים במיוחד להמחשת מערכות, חזון עסקי או מסרים חברתיים מורכבים (כמו הפרויקטים שלנו למשרד המשפטים ורכבת ישראל) — ללא צורך בימי צילום פיזיים.\n\n⏱️ אספקה: כ-5-8 ימי עבודה\n🎬 כולל: נרטיב מדויק, עקביות ויזואלית ואיכות שידור מלאה.',
        whatsappSummary: `היי אמיתי, בדקתי באתר לגבי סרטון תדמית/הסברה: "${userPrompt}". אשמח לשמוע פרטים!`
      };
    }

    if (lower.includes('רילס') || lower.includes('טיקטוק') || lower.includes('סושיאל') || lower.includes('אינסטגרם')) {
      return {
        replyText: 'בול! סרטוני רילס וטיקטוק ב-AI הם הדרך הטובה ביותר לעצור גלילה בפיד. אנחנו מייצרים חבילות של 3-5 סרטונים עם הוק ויזואלי חזק ב-3 השניות הראשונות וקצב מהיר.\n\n⏱️ אספקה: כ-3-5 ימי עבודה\n📱 פורמט: 9:16 אנכי באיכות מקסימלית.',
        whatsappSummary: `היי אמיתי, מעניין אותי קמפיין רילס/טיקטוק ב-AI: "${userPrompt}". אפשר הצעת מחיר?`
      };
    }

    return {
      replyText: `נשמע כמו רעיון עם המון פוטנציאל ויזואלי! בסטודיו של אמיתי אנחנו מתמחים בבניית עולמות, לוקיישנים היסטוריים או עתידניים ושליטה בעקביות דמויות (LoRA).\n\nנשמח לפצח את הרעיון יחד איתכם בשיחת קריאייטיב מהירה.`,
      whatsappSummary: `היי אמיתי, יש לי רעיון לסרט AI: "${userPrompt}". אשמח לסיעור מוחות והצעת מחיר!`
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'עכשיו'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const { replyText, whatsappSummary } = generateAiReply(text);
      const aiResponse: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: 'עכשיו',
        suggestedAction: {
          label: 'העבר את הסיכום ישירות לאמיתי בוואטסאפ',
          whatsappText: whatsappSummary
        }
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button - Compact on Mobile, Rich on Desktop */}
      <div className="fixed bottom-5 left-4 sm:left-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 p-2.5 sm:px-4 sm:py-3 rounded-full bg-[#121216]/95 hover:bg-black text-white border border-amber-400/50 hover:border-amber-400 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:scale-105 font-hebrew text-right"
            title="עוזר קריאייטיב 24/7"
          >
            <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold shadow-sm shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-amber-300">בדיקת רעיון ב-AI</span>
              <span className="text-[10px] text-zinc-400">עוזר קריאייטיב 24/7</span>
            </div>
          </button>
        )}
      </div>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-5 left-3 sm:left-6 z-50 w-[calc(100vw-24px)] sm:w-[400px] h-[520px] max-h-[82vh] bg-[#121216] border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden font-hebrew text-right animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-[#181820] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#181820]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>עוזר הקריאייטיב</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                    AmitAI
                  </span>
                </h3>
                <span className="text-[10px] text-zinc-400">מענה אוטומטי וסיעור מוחות 24/7</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[90%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-400 text-black font-medium rounded-br-none shadow-md'
                      : 'bg-[#1c1c24] text-zinc-200 border border-white/5 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* WhatsApp Action Button if provided */}
                {msg.suggestedAction && (
                  <a
                    href={`https://wa.me/972526016115?text=${encodeURIComponent(msg.suggestedAction.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{msg.suggestedAction.label}</span>
                  </a>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2.5 rounded-2xl bg-[#1c1c24] border border-white/5 text-zinc-400 text-xs w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-200" />
                <span className="mr-1 text-[10px]">חושב על כיוון...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Pills (if only initial message) */}
          {messages.length <= 2 && (
            <div className="px-3.5 pb-2">
              <span className="text-[10px] text-zinc-500 block mb-1">הצעות מהירות:</span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_STARTERS.map((starter, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(starter.prompt)}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-400/20 text-zinc-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 transition-all text-right"
                  >
                    {starter.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-2.5 bg-[#181820] border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="כתבו רעיון לסרטון..."
                className="flex-1 bg-[#0e0e12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold disabled:opacity-40 transition-all"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
