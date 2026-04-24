import React, { useState, useEffect } from "react";
import { lessons, Lesson, Question } from "./data/questions";
import { shuffleArray, cn } from "./lib/utils";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Home, RefreshCw, Trophy, Layers, GraduationCap, ArrowRightCircle, Volume2, VolumeX } from "lucide-react";

type ViewState = "MENU" | "QUIZ" | "MILESTONE" | "RESULT";

const relaxingImages = [
  "https://images.unsplash.com/photo-1548625361-ec846ea7646d?auto=format&fit=crop&q=80&w=400&h=400", // Nature grass
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400&h=400", // Beach
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=400&h=400", // Forest light
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400&h=400", // Misty mountains
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=400&h=400", // Sunlight
  "https://images.unsplash.com/photo-1440613905118-99b921706b5c?auto=format&fit=crop&q=80&w=400&h=400", // Peaceful view
];

const allQuestions = lessons.flatMap(l => l.questions);

export default function App() {
  const [view, setView] = useState<ViewState>("MENU");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Quiz state
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [shuffledOptionsList, setShuffledOptionsList] = useState<{ text: string; originalIndex: number }[][]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Tracking answers
  const [answers, setAnswers] = useState<Record<string, number>>({}); // questionId -> selected originalIndex
  const [showFeedback, setShowFeedback] = useState(false);
  const [relaxImg, setRelaxImg] = useState(relaxingImages[0]);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Handle global background music
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

  // Motivational messages
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

    // Check if we hit a 5-question milestone (and not the very end)
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
    <div className="w-full min-h-screen bg-slate-100 flex flex-col font-sans overflow-hidden">
      <audio 
        ref={audioRef} 
        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Vivaldi_-_Spring_mvt_1_Allegro_-_John_Harrison_violin.ogg" 
        loop
      />
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center z-10 w-full shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            Q
          </div>
          <div>
            <h1 className="text-slate-800 font-bold text-lg leading-tight">Ứng dụng Ôn Tập Thông Minh</h1>
            {view !== "MENU" && selectedLesson && (
               <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{selectedLesson.title}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            title={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}
          >
            {isPlayingMusic ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          
          {view !== "MENU" && (
            <>
              <button
                onClick={() => { setView("MENU"); setIsPlayingMusic(false); }}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mr-2 md:mr-0"
              >
                <Home className="w-4 h-4" /> Bảng điều khiển
              </button>
              {view === "QUIZ" && currentQuestions.length > 0 && (
                <div className="hidden md:flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-semibold uppercase">Tiến độ</p>
                    <p className="text-sm font-bold text-slate-700">Câu {currentIdx + 1} / {currentQuestions.length}</p>
                  </div>
                  <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500"
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
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Xin chào! Bạn muốn ôn tập như thế nào?</h2>
                <p className="text-slate-500">Hãy chọn chế độ phù hợp với nhu cầu của bạn dưới đây.</p>
              </div>

              {/* Chế độ Tổng hợp & Thi thử */}
              <div className="mb-2">
                <h3 className="text-xl font-bold text-slate-800 mb-4 px-2 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-emerald-500" />
                  Chế độ Đánh giá
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <button
                    onClick={() => startQuiz("Thi Thử (35 câu)", allQuestions, 35)}
                    className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 shadow-sm hover:border-emerald-500 hover:shadow-md hover:bg-emerald-50/30 transition-all text-left flex flex-col justify-between group"
                  >
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors mb-2">Đề Thi Thử</h3>
                      <p className="text-slate-500 leading-relaxed">Hệ thống sẽ lấy ngẫu nhiên 35 câu từ tất cả bài học để giúp bạn kiểm tra bao quát kiến thức và sẵn sàng cho bài thi thật.</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-indigo-600 group-hover:text-emerald-600">
                      Bắt đầu thi <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>

                  <button
                    onClick={() => startQuiz("Ôn Tập Tổng Hợp", allQuestions)}
                    className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 shadow-sm hover:border-emerald-500 hover:shadow-md hover:bg-emerald-50/30 transition-all text-left flex flex-col justify-between group"
                  >
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 mb-4 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                        <Layers className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors mb-2">Ôn Tập Cục Bộ</h3>
                      <p className="text-slate-500 leading-relaxed">Ôn tập trọn bộ {allQuestions.length} câu hỏi của tất cả các bài được xáo trộn hoàn toàn, không phân loại theo bài, giúp bạn quen với mọi tình huống.</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-sky-600 group-hover:text-emerald-600">
                      Bắt đầu ôn tập <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Luyện tập theo bài */}
              <div className="mt-4 pb-10">
                <h3 className="text-xl font-bold text-slate-800 mb-4 px-2 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  Ôn tập theo Bài học
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {lessons.map((lesson) => (
                    <button
                      key={lesson.title}
                      onClick={() => startQuiz(lesson.title, lesson.questions)}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-left flex items-center justify-between group"
                    >
                      <div className="pr-4">
                        <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-1">{lesson.title}</h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">{lesson.questions.length} câu hỏi</p>
                      </div>
                      <div className="w-10 h-10 shrink-0 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-colors">
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
              {/* Left Panel: Content & Relaxing Visuals */}
              <div className="lg:w-1/3 flex flex-col gap-6 shrink-0 h-full">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 flex-1 flex flex-col justify-center items-center text-center shadow-sm min-h-[300px]">
                  <div className="w-48 h-48 bg-emerald-50 rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-white shadow-md">
                    <img src={relaxImg} alt="Nature" className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-slate-700 font-semibold mb-2 text-lg">Thư giãn một chút nhé!</h2>
                  <p className="text-slate-500 text-sm italic leading-relaxed">"Học tập là một hành trình, không phải là một cuộc đua. Hãy hít thở sâu và tin vào bản thân mình!"</p>
                </div>

                {/* Score Summary */}
                <div className="grid grid-cols-2 gap-4 shrink-0">
                  <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 text-center">
                    <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-1">Đúng</p>
                    <p className="text-3xl font-black text-emerald-700">
                       {String(Object.entries(answers).filter(([qId, ansIdx]) => {
                         const q = currentQuestions.find(qq => qq.id === qId);
                         return q && q.correctAnswerIndex === ansIdx;
                       }).length).padStart(2, '0')}
                    </p>
                  </div>
                  <div className="bg-rose-50 rounded-2xl border border-rose-100 p-4 text-center">
                    <p className="text-rose-600 text-xs font-bold uppercase tracking-widest mb-1">Sai</p>
                    <p className="text-3xl font-black text-rose-700">
                       {String(Object.entries(answers).filter(([qId, ansIdx]) => {
                         const q = currentQuestions.find(qq => qq.id === qId);
                         return q && q.correctAnswerIndex !== ansIdx;
                       }).length).padStart(2, '0')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Panel: Question Interface */}
              <div className="flex-1 flex flex-col h-full">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 flex-1 flex flex-col shadow-sm relative">
                  {/* Question Text */}
                  <div className="mb-8 shrink-0">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-4 inline-block uppercase">Câu hỏi {currentIdx + 1}</span>
                    <h3 className="text-2xl font-medium text-slate-800 leading-snug">
                      {currentQ.text}
                    </h3>
                  </div>

                  {/* Answers Grid */}
                  <div className="grid grid-cols-1 gap-4 mb-2 flex-1 content-start">
                    {shuffledOptionsList[currentIdx].map((opt, idx) => {
                      const isSelected = answers[currentQ.id] === opt.originalIndex;
                      const isCorrectOption = opt.originalIndex === currentQ.correctAnswerIndex;

                      let btnClass = "flex items-center gap-4 p-4 md:p-5 rounded-2xl transition-all text-left group border ";
                      let circleClass = "w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold transition-all relative ";

                      if (showFeedback) {
                        if (isCorrectOption) { // Correct Option
                          btnClass += "border-2 border-emerald-500 bg-emerald-50 shadow-sm";
                          circleClass += "bg-emerald-500 text-white border-transparent";
                        } else if (isSelected && !isCorrectOption) { // Incorrect Selected
                          btnClass += "border-2 border-rose-400 bg-rose-50 opacity-90";
                          circleClass += "bg-rose-400 text-white border-transparent";
                        } else { // Unselected incorrect
                          btnClass += "border-slate-200 bg-white opacity-40 grayscale";
                          circleClass += "border border-slate-300 text-slate-400";
                        }
                      } else { // Normal State
                        btnClass += "border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 bg-white";
                        circleClass += "border border-slate-300 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-transparent";
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
                            (showFeedback && isCorrectOption) ? "text-slate-800 font-bold" : "text-slate-600"
                          )}>
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Bottom Feedback Banner & Next Button */}
                  {showFeedback && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between min-h-[56px] shrink-0 border-t border-slate-100 pt-6 gap-4"
                    >
                      <div className="flex-1">
                        {answers[currentQ.id] === currentQ.correctAnswerIndex ? (
                          <div className="flex items-center gap-4 animate-pulse">
                            <div className="text-3xl drop-shadow-sm">🎉</div>
                            <div>
                              <p className="text-emerald-600 font-bold leading-none uppercase text-[10px] tracking-widest mb-1">TUYỆT VỜI!</p>
                              <p className="text-slate-700 font-semibold">{currentPraise}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <div className="text-3xl drop-shadow-sm">💡</div>
                            <div>
                              <p className="text-rose-600 font-bold leading-none uppercase text-[10px] tracking-widest mb-1">CHƯA ĐÚNG RỒI!</p>
                              <p className="text-slate-700 font-semibold text-sm">Hãy kiểm tra lại đáp án đúng được làm nổi bật nhé!</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={handleNext}
                        className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors shadow-md flex items-center justify-center gap-2 shrink-0 group w-full sm:w-auto"
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
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl shadow-xl shadow-slate-200/50 relative overflow-hidden">
                <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 border-4 border-white shadow-sm overflow-hidden">
                   <img src={relaxImg} alt="Nature relaxing view" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4 relative z-10">Một nhịp nghỉ ngơi!</h2>
                <p className="text-lg text-slate-500 mb-10 leading-relaxed relative z-10">
                  Bạn đã vừa vượt qua một chặng đường ngắn. Ngắm nhìn vẻ đẹp của tạo hóa, hít một hơi thật sâu rồi tiếp tục chinh phục những câu hỏi tiếp theo nhé!
                </p>
                <button
                  onClick={continueFromMilestone}
                  className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-900 transition-colors inline-flex items-center gap-2 relative z-10 shadow-md group"
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
              <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm mb-6 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                 <div className="flex-1 text-center md:text-left">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-4 inline-block tracking-wider">KẾT QUẢ</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Tổng Kết Ôn Tập</h2>
                    <p className="text-slate-500 text-lg leading-relaxed">Bạn đã hoàn thành bộ đề <span className="font-bold text-slate-700">{selectedLesson?.title}</span>.</p>
                 </div>

                 <div className="flex gap-4 w-full md:w-auto shrink-0">
                    <div className="flex-1 md:w-32 bg-emerald-50 rounded-3xl border border-emerald-100 p-6 text-center shadow-sm">
                      <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">Đúng</p>
                      <p className="text-4xl md:text-5xl font-black text-emerald-700">
                        {String(currentQuestions.filter(q => answers[q.id] === q.correctAnswerIndex).length).padStart(2, '0')}
                      </p>
                    </div>
                    <div className="flex-1 md:w-32 bg-rose-50 rounded-3xl border border-rose-100 p-6 text-center shadow-sm">
                      <p className="text-rose-600 text-xs font-bold uppercase tracking-widest mb-2">Sai</p>
                      <p className="text-4xl md:text-5xl font-black text-rose-700">
                        {String(currentQuestions.filter(q => answers[q.id] !== q.correctAnswerIndex).length).padStart(2, '0')}
                      </p>
                    </div>
                 </div>
              </div>

              {currentQuestions.filter(q => answers[q.id] !== q.correctAnswerIndex).length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <Layers className="w-6 h-6 text-emerald-500" /> Gợi ý ôn tập lại:
                  </h3>
                  <div className="space-y-6">
                    {currentQuestions.filter(q => answers[q.id] !== q.correctAnswerIndex).map((q, idx) => (
                      <div key={q.id} className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
                        <h4 className="font-bold text-slate-800 mb-4 leading-relaxed text-lg flex items-start gap-4">
                          <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 text-rose-600 border border-border-rose-200 shadow-sm">
                            <XCircle className="w-5 h-5" />
                          </span>
                          {q.text}
                        </h4>
                        <div className="flex items-start gap-4 bg-emerald-50/80 p-5 rounded-2xl border border-emerald-100 ml-0 md:ml-12">
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                             <p className="text-slate-800 font-semibold leading-relaxed">{q.options[q.correctAnswerIndex]}</p>
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
                  className="flex-1 flex justify-center items-center gap-2 py-5 rounded-2xl font-bold bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-emerald-500 hover:text-emerald-700 transition-all shadow-sm group"
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> Thực hiện lại
                </button>
                <button
                  onClick={() => setView("MENU")}
                  className="flex-1 flex justify-center items-center gap-2 py-5 rounded-2xl font-bold bg-slate-800 text-white hover:bg-slate-900 transition-colors shadow-sm"
                >
                  <Home className="w-5 h-5" /> Về danh sách bài
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Visual Flare */}
      <div className="fixed bottom-10 right-10 flex gap-2 pointer-events-none opacity-50">
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-rose-400 opacity-50"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
      </div>
    </div>
  );
}
