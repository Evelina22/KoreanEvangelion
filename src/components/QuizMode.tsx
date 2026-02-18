import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Volume2, TrendingUp, ThumbsUp, Target } from 'lucide-react';
import { Word, QuizQuestion, QuizType } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import { useAppDispatch } from '@/store/hooks';
import { updateWordProgress } from '@/store/progressSlice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getRandomWords } from '@/data/words';

interface QuizModeProps {
  words: Word[];
  onComplete: (correct: number, total: number) => void;
}

// Генерация вопросов для теста
const generateQuestions = (words: Word[], count: number = 10): QuizQuestion[] => {
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  const selectedWords = shuffled.slice(0, Math.min(count, shuffled.length));
  
  return selectedWords.map(word => {
    // Выбираем случайный тип вопроса
    const types: QuizType[] = ['choose_translation', 'choose_korean', 'audio_test'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Получаем неправильные варианты
    const wrongWords = getRandomWords(3, [word.id]);
    
    let options: string[];
    let correctAnswer: string;
    
    if (type === 'choose_translation') {
      correctAnswer = word.meaning[0];
      options = [
        correctAnswer,
        ...wrongWords.map(w => w.meaning[0])
      ].sort(() => Math.random() - 0.5);
    } else {
      correctAnswer = word.korean;
      options = [
        correctAnswer,
        ...wrongWords.map(w => w.korean)
      ].sort(() => Math.random() - 0.5);
    }
    
    return {
      type,
      word,
      options,
      correctAnswer,
    };
  });
};

const QuizMode = ({ words, onComplete }: QuizModeProps) => {
  const questions = useMemo(() => generateQuestions(words), [words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showingAnswer, setShowingAnswer] = useState(false); // Флаг показа результата
  
  const dispatch = useAppDispatch();
  const { speakKorean } = useSpeech();
  
  // Вопрос который показывается (фиксируется пока showingAnswer === true)
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = useCallback((answer: string) => {
    if (selectedAnswer !== null) return; // Уже выбран ответ
    
    setShowingAnswer(true); // Блокируем изменения
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setCorrectCount(prev => prev + 1);
    }
    
    // Обновляем прогресс слова
    // dispatch(updateWordProgress({
    //   wordId: currentQuestion.word.id,
    //   isCorrect: correct,
    // }));
    
    // Переход к следующему вопросу ПОСЛЕ показа результата
    setTimeout(() => {
      setShowingAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
      
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  }, [selectedAnswer, currentQuestion, currentIndex, questions.length, dispatch]);

  const handlePlayAudio = useCallback(() => {
    speakKorean(currentQuestion.word.korean);
  }, [currentQuestion, speakKorean]);

  if (showResult) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    const ResultIcon = percentage >= 80 ? TrendingUp : percentage >= 60 ? ThumbsUp : Target;
    const iconColor = percentage >= 80 ? 'text-success' : percentage >= 60 ? 'text-primary' : 'text-warning';
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center max-w-md mx-auto"
      >
        <div className={`mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 ${iconColor}`}>
          <ResultIcon className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {percentage >= 80 ? 'Отличный результат!' : 
           percentage >= 60 ? 'Хорошая работа!' : 
           'Продолжайте практиковаться!'}
        </h2>
        <div className="my-6">
          <div className="text-5xl font-bold gradient-text">
            {correctCount} / {questions.length}
          </div>
          <p className="text-muted-foreground mt-2">
            {percentage}% правильных ответов
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button 
            variant="outline"
            onClick={() => {
              setCurrentIndex(0);
              setSelectedAnswer(null);
              setIsCorrect(null);
              setCorrectCount(0);
              setShowResult(false);
              setShowingAnswer(false);
            }}
          >
            Попробовать снова
          </Button>
          <Button 
            onClick={() => onComplete(correctCount, questions.length)}
            className="bg-kpop-gradient"
          >
            Завершить
          </Button>
        </div>
      </motion.div>
    );
  }

  const getQuestionText = () => {
    switch (currentQuestion.type) {
      case 'choose_translation':
        return 'Выберите правильный перевод:';
      case 'choose_korean':
        return 'Выберите корейское слово:';
      case 'audio_test':
        return 'Прослушайте и выберите перевод:';
      default:
        return 'Выберите ответ:';
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Прогресс */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            Вопрос {currentIndex + 1} из {questions.length}
          </span>
          <span className="text-success">
            {correctCount} правильно
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-kpop-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Вопрос */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-6"
        >
          <p className="text-sm text-muted-foreground mb-4">
            {getQuestionText()}
          </p>
          
          {/* Слово вопроса */}
          <div className="text-center py-8">
            {currentQuestion.type === 'audio_test' ? (
              <button
                onClick={handlePlayAudio}
                className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto hover:bg-primary/30 transition-colors"
              >
                <Volume2 className="w-10 h-10 text-primary" />
              </button>
            ) : currentQuestion.type === 'choose_translation' ? (
              <span className="korean-large text-5xl">
                {currentQuestion.word.korean}
              </span>
            ) : (
              <span className="text-3xl font-semibold">
                {currentQuestion.word.meaning[0]}
              </span>
            )}
          </div>
          
          {/* Варианты ответа */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentQuestion.correctAnswer;
              const showCorrect = selectedAnswer !== null && isCorrectAnswer;
              const showWrong = isSelected && !isCorrectAnswer;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all text-left',
                    selectedAnswer === null && 'border-border hover:border-primary/50 hover:bg-muted/50',
                    showCorrect && 'border-success bg-success/20',
                    showWrong && 'border-destructive bg-destructive/20 animate-shake',
                    isSelected && !showWrong && !showCorrect && 'border-primary'
                  )}
                >
                  <span className={cn(
                    currentQuestion.type !== 'choose_korean' ? '' : 'korean-text text-lg'
                  )}>
                    {option}
                  </span>
                  
                  {showCorrect && (
                    <Check className="inline-block ml-2 w-5 h-5 text-success" />
                  )}
                  {showWrong && (
                    <X className="inline-block ml-2 w-5 h-5 text-destructive" />
                  )}
                </motion.button>
              );
            })}
          </div>
          
          {/* Фидбек */}
          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  'mt-6 p-4 rounded-xl text-center',
                  isCorrect ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                )}
              >
                {isCorrect ? (
                  <span className="font-medium"> Правильно!</span>
                ) : (
                  <span className="font-medium">
                     Неверно. Правильный ответ: {currentQuestion.correctAnswer}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizMode;