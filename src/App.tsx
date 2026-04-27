import React, { useState, useEffect } from "react";
import { lessons, Lesson, Question } from "./data/questions";
import { shuffleArray, cn } from "./lib/utils";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Home, RefreshCw, Trophy, Layers, GraduationCap, ArrowRightCircle, Volume2, VolumeX } from "lucide-react";

const CrossIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v20M8 8h8" />
  </svg>
);

const MandalaBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center bg-brand-bg">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,147,23,0.3)_0%,rgba(16,78,91,0)_70%)]" />
    <div className="absolute inset-0 opacity-[0.15] mix-blend-color-dodge flex items-center justify-center">
       <svg className="w-[150vw] h-[150vw] sm:w-[120vw] sm:h-[120vw] lg:w-[100vw] lg:h-[100vw] max-w-[1200px] max-h-[1200px] animate-[spin_180s_linear_infinite]" viewBox="0 0 100 100">
         <defs>
           <radialGradient id="gradOut" cx="50%" cy="50%" r="50%">
             <stop offset="0%" stopColor="#df9317" stopOpacity="1" />
             <stop offset="100%" stopColor="#df9317" stopOpacity="0" />
           </radialGradient>
         </defs>
         <g stroke="#df9317" strokeWidth="0.3" fill="none">
           {[...Array(16)].map((_, i) => (
             <g key={i} transform={`rotate(${i * (360 / 16)} 50 50)`}>
               <path d="M50 5 Q60 25 50 50 Q40 25 50 5" fill="url(#gradOut)" opacity="0.4" />
               <path d="M50 0 L53 45 L50 50 L47 45 Z" fill="rgba(223,147,23,0.2)"/>
               <circle cx="50" cy="15" r="1.5" fill="#df9317" />
             </g>
           ))}
           <circle cx="50" cy="50" r="45" strokeDasharray="1 4" strokeWidth="0.8"/>
           <circle cx="50" cy="50" r="35" strokeDasharray="2 3" strokeWidth="0.5"/>
           <circle cx="50" cy="50" r="25" />
           <circle cx="50" cy="50" r="15" strokeDasharray="1 2" strokeWidth="0.5"/>
         </g>
       </svg>
    </div>
  </div>
);

type ViewState = "MENU" | "QUIZ" | "MILESTONE" | "RESULT";

const relaxingImages = [
  "https://images.unsplash.com/photo-1548625361-ec846ea7646d?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1440613905118-99b921706b5c?auto=format&fit=crop&q=80&w=400&h=400",
];

const allQuestions = lessons.flatMap(l => l.questions);

export default function App() {
  const [view, setView] = useState<ViewState>("MENU");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [shuffledOptionsList, setShuffledOptionsList] = useState<{ text: string; originalIndex: number }[][]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [relaxImg, setRelaxImg] = useState(relaxingImages[0]);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
        if (isPlayingMusic) {
            audioRef.current.play().catch(e => {
                console.warn("Audio play blocked by browser:", e);
                setIsPlayingMusic(false);
            });
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlayingMusic, view]);

  const praises = ["Xuất sắc!", "Quá đỉnh!", "Tuyệt vời!", "Chính xác!", "Giỏi quá!"];
  const [currentPraise, setCurrentPraise] = useState("");

  const startQuiz = (title: string, questionsPool: Question[], limit?: number) => {
    setSelectedLesson({ title, questions: questionsPool });
    
    let poolToUse = [...questionsPool];
    if (limit) {
      poolToUse = shuffleArray(poolToUse).slice(0, limit);
    } else {
      poolToUse = shuffleArray(poolToUse);
    }
    
    setCurrentQuestions(poolToUse);

    const optsList = poolToUse.map(q => {
      const opts = q.options.map((text, i) => ({ text, originalIndex: i }));
      if (q.shuffleOptions) {
        return shuffleArray(opts);
      }
      return opts;
    });
    setShuffledOptionsList(optsList);

    setAnswers({});
    setCurrentIdx(0);
    setShowFeedback(false);
    setRelaxImg(relaxingImages[Math.floor(Math.random() * relaxingImages.length)]);
    setView("QUIZ");
    setIsPlayingMusic(true);
  };

  const handleOptionClick = (originalIndex: number) => {
    if (showFeedback) return;

    const currentQ = currentQuestions[currentIdx];
    const isCorrect = originalIndex === currentQ.correctAnswerIndex;

    setAnswers(prev => ({ ...prev, [currentQ.id]: originalIndex }));
    setShowFeedback(true);

    if (isCorrect) {
      setCurrentPraise(praises[Math.floor(Math.random() * praises.length)]);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    const nextIdx = currentIdx + 1;

    if (nextIdx > 0 && nextIdx % 5 === 0 && nextIdx < currentQuestions.length) {
      setRelaxImg(relaxingImages[Math.floor(Math.random() * relaxingImages.length)]);
      setView("MILESTONE");
      setCurrentIdx(nextIdx);
    } else if (nextIdx >= currentQuestions.length) {
      setView("RESULT");
    } else {
      setCurrentIdx(nextIdx);
    }
  };

  const continueFromMilestone = () => {
    setView("QUIZ");
  };

  const currentQ = currentQuestions[currentIdx];

  return (
    <div className="w-full min-h-screen bg-brand-bg text-white flex flex-col font-sans overflow-hidden selection:bg-brand-gold/30 selection:text-brand-gold relative">
      <MandalaBackground />
      <audio 
        ref={audioRef} 
        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Vivaldi_-_Spring_mvt_1_Allegro_-_John_Harrison_violin.ogg" 
        loop
      />
      {/* Header Section */}
      <header className="bg-brand-bg/40 backdrop-blur-md border-b border-brand-cyan/20 px-8 py-4 flex justify-between items-center z-10 w-full shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-gold to-brand-cyan rounded-xl flex items-center justify-center text-white border border-brand-gold/30 shadow-lg shadow-brand-gold/20">
            <CrossIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Giáo Lý Mân Côi</h1>
            {view !== "MENU" && selectedLesson && (
               <p className="text-brand-cyan text-xs font-medium uppercase tracking-wider">{selectedLesson.title}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
            className="w-10 h-10 rounded-full border border-brand-cyan/30 flex items-center justify-center text-brand-cyan hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/10 transition-colors"
            title={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}
          >
            {isPlayingMusic ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          
          {view !== "MENU" && (
            <>
              <button
                onClick={() => { setView("MENU"); setIsPlayingMusic(false); }}
                className="flex items-center gap-2 text-sm font-medium text-brand-cyan hover:text-brand-gold transition-colors mr-2 md:mr-0"
              >
                <Home className="w-4 h-4" /> Bảng điều khiển
              </button>
              {view === "QUIZ" && currentQuestions.length > 0 && (
                <div className="hidden md:flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-brand-cyan/70 font-semibold uppercase">Tiến độ</p>
                    <p className="text-sm font-bold text-white">Câu {currentIdx + 1} / {currentQuestions.length}</p>
                  </div>
                  <div className="w-48 h-2 bg-brand-cyan/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-gold"
                      initial={{ width: `${(currentIdx / currentQuestions.length) * 100}%` }}
                      animate={{ width: `${((currentIdx + 1) / currentQuestions.length) * 100}%` }}
                      transition={{ ease: "easeInOut" }}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {view === "MENU" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col gap-6 w-full max-w-5xl mx-auto"
            >
              <div className="text-center mt-8 mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Xin chào! Bạn muốn ôn tập như thế nào?</h2>
                <p className="text-brand-cyan">Hãy chọn chế độ phù hợp với nhu cầu của bạn dưới đây.</p>
              </div>

              {/* Chế độ Tổng hợp & Thi thử */}
              <div className="mb-2">
                <h3 className="text-xl font-bold text-white mb-4 px-2 flex items-center gap-2">
                  <CrossIcon className="w-6 h-6 text-brand-gold" />
                  Chế độ Đánh giá
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <button
                    onClick={() => startQuiz("Thi Thử (35 câu)", allQuestions, 35)}
                    className="bg-brand-bg/40 backdrop-blur-xl rounded-3xl border border-brand-cyan/30 p-6 md:p-8 shadow-lg hover:border-brand-gold hover:shadow-[0_0_20px_rgba(223,147,23,0.3)] transition-all text-left flex flex-col justify-between group"
                  >
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4 group-hover:bg-brand-gold group-hover:text-brand-bg transition-colors border border-brand-gold/20">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-white leading-snug group-hover:text-brand-gold transition-colors mb-2">Đề Thi Thử</h3>
                      <p className="text-brand-cyan/80 leading-relaxed">Hệ thống sẽ lấy ngẫu nhiên 35 câu từ tất cả bài học để giúp bạn kiểm tra bao quát kiến thức và sẵn sàng cho bài thi thật.</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-brand-cyan group-hover:text-brand-gold transition-colors">
                      Bắt đầu thi <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>

                  <button
                    onClick={() => startQuiz("Ôn Tập Tổng Hợp", allQuestions)}
                    className="bg-brand-bg/40 backdrop-blur-xl rounded-3xl border border-brand-cyan/30 p-6 md:p-8 shadow-lg hover:border-brand-cyan hover:shadow-[0_0_20px_rgba(25,146,176,0.3)] transition-all text-left flex flex-col justify-between group"
                  >
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-4 group-hover:bg-brand-cyan group-hover:text-white transition-colors border border-brand-cyan/20">
                        <Layers className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-white leading-snug group-hover:text-brand-cyan transition-colors mb-2">Ôn Tập Cục Bộ</h3>
                      <p className="text-brand-cyan/80 leading-relaxed">Ôn tập trọn bộ {allQuestions.length} câu hỏi của tất cả các bài được xáo trộn hoàn toàn, không phân loại theo bài, giúp bạn quen với mọi tình huống.</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-brand-cyan group-hover:text-white transition-colors">
                      Bắt đầu ôn tập <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Luyện tập theo bài */}
              <div className="mt-4 pb-10">
                <h3 className="text-xl font-bold text-white mb-4 px-2 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                  Ôn tập theo Bài học
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {lessons.map((lesson) => (
                    <button
                      key={lesson.title}
                      onClick={() => startQuiz(lesson.title, lesson.questions)}
                      className="bg-brand-bg/40 backdrop-blur-md rounded-2xl border border-brand-cyan/30 p-5 shadow-sm hover:border-brand-gold hover:shadow-[0_0_15px_rgba(223,147,23,0.3)] transition-all text-left flex items-center justify-between group"
                    >
                      <div className="pr-4">
                        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-brand-gold transition-colors line-clamp-1">{lesson.title}</h3>
                        <p className="text-sm text-brand-cyan/80 mt-1">{lesson.questions.length} câu hỏi</p>
                      </div>
                      <div className="w-10 h-10 shrink-0 rounded-full border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover:bg-brand-gold group-hover:text-brand-bg group-hover:border-brand-gold transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {view === "QUIZ" && currentQ && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col lg:flex-row gap-6 w-full h-full pb-8"
            >
              <div className="lg:w-1/3 flex flex-col gap-6 shrink-0 h-full">
                <div className="bg-brand-bg/40 backdrop-blur-lg border border-brand-cyan/30 rounded-3xl p-6 flex-1 flex flex-col justify-center items-center text-center shadow-lg min-h-[300px]">
                  <div className="w-48 h-48 rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-brand-gold/50 shadow-[0_0_20px_rgba(223,147,23,0.3)]">
                    <img src={relaxImg} alt="Nature" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000" />
                  </div>
                  <h2 className="text-white font-semibold mb-2 text-lg">Thư giãn một chút nhé!</h2>
                  <p className="text-brand-cyan/90 text-sm italic leading-relaxed">"Học tập là một hành trình, không phải là một cuộc đua. Hãy hít thở sâu và tin vào bản thân mình!"</p>
                </div>

                <div className="grid grid-cols-2 gap-4 shrink-0">
                  <div className="bg-emerald-500/10 rounded-2xl border border-emerald-500/30 p-4 text-center">
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Đúng</p>
                    <p className="text-3xl font-black text-emerald-400">
                       {String(Object.entries(answers).filter(([qId, ansIdx]) => {
                         const q = currentQuestions.find(qq => qq.id === qId);
                         return q && q.correctAnswerIndex === ansIdx;
                       }).length).padStart(2, '0')}
                    </p>
                  </div>
                  <div className="bg-rose-500/10 rounded-2xl border border-rose-500/30 p-4 text-center">
                    <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-1">Sai</p>
                    <p className="text-3xl font-black text-rose-400">
                       {String(Object.entries(answers).filter(([qId, ansIdx]) => {
                         const q = currentQuestions.find(qq => qq.id === qId);
                         return q && q.correctAnswerIndex !== ansIdx;
                       }).length).padStart(2, '0')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col h-full">
                <div className="bg-brand-bg/40 backdrop-blur-xl rounded-3xl border border-brand-cyan/30 p-6 md:p-10 flex-1 flex flex-col shadow-lg relative">
                  <div className="mb-8 shrink-0">
                    <span className="px-3 py-1 bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-xs font-bold rounded-full mb-4 inline-block uppercase">Câu hỏi {currentIdx + 1}</span>
                    <h3 className="text-2xl font-medium text-white leading-snug">
                      {currentQ.text}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-2 flex-1 content-start">
                    {shuffledOptionsList[currentIdx].map((opt, idx) => {
                      const isSelected = answers[currentQ.id] === opt.originalIndex;
                      const isCorrectOption = opt.originalIndex === currentQ.correctAnswerIndex;

                      let btnClass = "flex items-center gap-4 p-4 md:p-5 rounded-2xl transition-all text-left group border ";
                      let circleClass = "w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold transition-all relative ";

                      if (showFeedback) {
                        if (isCorrectOption) { // Correct Option
                          btnClass += "border-2 border-emerald-400 bg-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.3)] text-white";
                          circleClass += "bg-emerald-400 text-brand-bg border-transparent";
                        } else if (isSelected && !isCorrectOption) { // Incorrect Selected
                          btnClass += "border-2 border-rose-400 bg-rose-500/20 text-white";
                          circleClass += "bg-rose-400 text-brand-bg border-transparent";
                        } else { // Unselected incorrect
                          btnClass += "border-white/10 bg-white/5 opacity-50 text-white";
                          circleClass += "border border-white/20 text-white/50";
                        }
                      } else { // Normal State // Selected State applies immediately but we don't show colors until feedback
                        btnClass += "border-brand-cyan/30 hover:border-brand-gold hover:bg-brand-gold/10 bg-brand-bg/60 text-white";
                         circleClass += "border border-brand-cyan/50 text-brand-cyan group-hover:bg-brand-gold group-hover:text-brand-bg group-hover:border-transparent";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={showFeedback}
                          onClick={() => handleOptionClick(opt.originalIndex)}
                          className={btnClass}
                        >
                          <div className={circleClass}>
                            {showFeedback && isCorrectOption && <CheckCircle2 className="w-5 h-5 absolute inset-auto m-auto" />}
                            {showFeedback && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 absolute inset-auto m-auto" />}
                            {(!showFeedback || (!isCorrectOption && !isSelected)) && String.fromCharCode(65 + idx)}
                          </div>
                          <span className={cn(
                            "font-medium leading-tight",
                            (showFeedback && isCorrectOption) ? "font-bold" : ""
                          )}>
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  
                  {showFeedback && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between min-h-[56px] shrink-0 border-t border-brand-cyan/30 pt-6 gap-4"
                    >
                      <div className="flex-1">
                        {answers[currentQ.id] === currentQ.correctAnswerIndex ? (
                          <div className="flex items-center gap-4 animate-pulse">
                            <div className="text-3xl drop-shadow-sm">🙏</div>
                            <div>
                              <p className="text-brand-gold font-bold leading-none uppercase text-[10px] tracking-widest mb-1">HỒNG ÂN!</p>
                              <p className="text-white font-semibold">{currentPraise}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <div className="text-3xl drop-shadow-sm">💡</div>
                            <div>
                              <p className="text-brand-cyan font-bold leading-none uppercase text-[10px] tracking-widest mb-1">CHƯA ĐÚNG RỒI!</p>
                              <p className="text-white/80 font-semibold text-sm">Hãy kiểm tra lại đáp án đúng được làm nổi bật nhé!</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={handleNext}
                        className="bg-brand-gold text-brand-bg px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(223,147,23,0.4)] flex items-center justify-center gap-2 shrink-0 group w-full sm:w-auto"
                      >
                        Tiếp tục <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {view === "MILESTONE" && (
            <motion.div
              key="milestone"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-4 h-full"
            >
              <div className="bg-brand-bg/60 backdrop-blur-xl border border-brand-gold/50 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_40px_rgba(223,147,23,0.3)] relative overflow-hidden">
                <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 border-4 border-brand-gold/50 shadow-lg overflow-hidden">
                   <img src={relaxImg} alt="Nature relaxing view" className="w-full h-full object-cover mix-blend-luminosity" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Một nhịp nghỉ ngơi!</h2>
                <p className="text-lg text-brand-cyan/90 mb-10 leading-relaxed relative z-10">
                  Bạn đã vừa vượt qua một chặng đường ngắn. Ngắm nhìn vẻ đẹp của tạo hóa, tạ ơn Chúa, hít một hơi thật sâu rồi tiếp tục chinh phục những câu hỏi tiếp theo nhé!
                </p>
                <button
                  onClick={continueFromMilestone}
                  className="bg-brand-gold text-brand-bg px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 border border-yellow-300 transition-colors inline-flex items-center gap-2 relative z-10 shadow-[0_0_15px_rgba(223,147,23,0.4)] group"
                >
                  TIẾP TỤC HÀNH TRÌNH <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {view === "RESULT" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col max-w-4xl mx-auto w-full pb-10"
            >
              <div className="bg-brand-bg/60 backdrop-blur-xl rounded-3xl border border-brand-cyan/30 p-8 md:p-12 shadow-lg mb-6 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                 <div className="flex-1 text-center md:text-left">
                    <span className="px-3 py-1 bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-xs font-bold rounded-full mb-4 inline-block tracking-wider">KẾT QUẢ</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tổng Kết Ôn Tập</h2>
                    <p className="text-brand-cyan/90 text-lg leading-relaxed">Bạn đã hoàn thành bộ đề <span className="font-bold text-brand-gold">{selectedLesson?.title}</span>.</p>
                 </div>

                 <div className="flex gap-4 w-full md:w-auto shrink-0">
                    <div className="flex-1 md:w-32 bg-emerald-500/10 rounded-3xl border border-emerald-500/30 p-6 text-center shadow-sm">
                      <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Đúng</p>
                      <p className="text-4xl md:text-5xl font-black text-emerald-400">
                        {String(currentQuestions.filter(q => answers[q.id] === q.correctAnswerIndex).length).padStart(2, '0')}
                      </p>
                    </div>
                    <div className="flex-1 md:w-32 bg-rose-500/10 rounded-3xl border border-rose-500/30 p-6 text-center shadow-sm">
                      <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-2">Sai</p>
                      <p className="text-4xl md:text-5xl font-black text-rose-400">
                        {String(currentQuestions.filter(q => answers[q.id] !== q.correctAnswerIndex).length).padStart(2, '0')}
                      </p>
                    </div>
                 </div>
              </div>

              {currentQuestions.filter(q => answers[q.id] !== q.correctAnswerIndex).length > 0 && (
                <div className="bg-brand-bg/60 backdrop-blur-xl rounded-3xl border border-brand-cyan/30 p-8 md:p-10 shadow-lg mb-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Layers className="w-6 h-6 text-brand-gold" /> Gợi ý ôn tập lại:
                  </h3>
                  <div className="space-y-6">
                    {currentQuestions.filter(q => answers[q.id] !== q.correctAnswerIndex).map((q, idx) => (
                      <div key={q.id} className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10">
                        <h4 className="font-bold text-white mb-4 leading-relaxed text-lg flex items-start gap-4">
                          <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-sm">
                            <XCircle className="w-5 h-5" />
                          </span>
                          {q.text}
                        </h4>
                        <div className="flex items-start gap-4 bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 ml-0 md:ml-12">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                             <p className="text-emerald-50 font-semibold leading-relaxed">{q.options[q.correctAnswerIndex]}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => startQuiz(selectedLesson!.title, selectedLesson!.questions, selectedLesson!.title.includes("Thi Thử") ? 35 : undefined)}
                  className="flex-1 flex justify-center items-center gap-2 py-5 rounded-2xl font-bold bg-brand-cyan/20 border-2 border-brand-cyan/40 text-white hover:bg-brand-cyan/30 hover:border-brand-cyan transition-all shadow-sm group"
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> Thực hiện lại
                </button>
                <button
                  onClick={() => setView("MENU")}
                  className="flex-1 flex justify-center items-center gap-2 py-5 rounded-2xl font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors shadow-sm"
                >
                  <Home className="w-5 h-5" /> Về danh sách bài
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
