import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Star, Check, RotateCcw, ChevronLeft, ChevronRight, PartyPopper } from 'lucide-react';
import { Word } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateWordProgress, toggleFavorite } from '@/store/progressSlice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  words: Word[];
  onComplete?: () => void;
}

const partOfSpeechLabels: Record<string, string> = {
  noun: 'сущ.',
  verb: 'глаг.',
  adjective: 'прил.',
  adverb: 'нар.',
  particle: 'част.',
};

const partOfSpeechClasses: Record<string, string> = {
  noun: 'pos-noun',
  verb: 'pos-verb',
  adjective: 'pos-adjective',
  adverb: 'pos-adverb',
  particle: 'pos-particle',
};

const Flashcard = ({ words, onComplete }: FlashcardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [learnedInSession, setLearnedInSession] = useState<Set<string>>(new Set());
  
  const dispatch = useAppDispatch();
  const wordProgress = useAppSelector(state => state.progress.wordProgress);
  const showRomanization = useAppSelector(state => state.settings.showRomanization);
  const autoPlayAudio = useAppSelector(state => state.settings.autoPlayAudio);
  const { speakKorean } = useSpeech();

  const currentWord = words[currentIndex];
  const isFavorite = wordProgress[currentWord?.id]?.isFavorite || false;
  
  useEffect(() => {
    if (currentWord && autoPlayAudio && !isFlipped) {
      const timer = setTimeout(() => {
        speakKorean(currentWord.korean);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentWord, autoPlayAudio, isFlipped, speakKorean]);
  
  const remainingWords = words.filter(w => !learnedInSession.has(w.id));
  const isSessionComplete = remainingWords.length === 0;

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleSpeak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentWord) {
      speakKorean(currentWord.korean);
    }
  }, [currentWord, speakKorean]);

  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentWord) {
      dispatch(toggleFavorite(currentWord.id));
    }
  }, [currentWord, dispatch]);

  const handleKnow = useCallback(() => {
    if (currentWord) {
      dispatch(updateWordProgress({ 
        wordId: currentWord.id, 
        isCorrect: true, 
        markAsLearned: true 
      }));
      setLearnedInSession(prev => new Set(prev).add(currentWord.id));
      
      if (currentIndex < words.length - 1) {
        setDirection(1);
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
      } else if (onComplete) {
        onComplete();
      }
    }
  }, [currentWord, currentIndex, words.length, dispatch, onComplete]);

  const handleRepeat = useCallback(() => {
    dispatch(updateWordProgress({ 
      wordId: currentWord.id, 
      isCorrect: false 
    }));
    
    if (currentIndex < words.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  }, [currentWord, currentIndex, words.length, dispatch]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, words.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
        e.preventDefault();
        handleFlip();
        break;
      case 'ArrowLeft':
        goToPrev();
        break;
      case 'ArrowRight':
        goToNext();
        break;
    }
  }, [handleFlip, goToPrev, goToNext]);

  if (!currentWord) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Нет слов для изучения</p>
      </div>
    );
  }

  if (isSessionComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center max-w-md mx-auto"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 text-success mb-4">
          <PartyPopper className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Отлично!</h2>
        <p className="text-muted-foreground mb-6">
          Вы изучили все слова в этой сессии
        </p>
        <Button onClick={onComplete} className="bg-kpop-gradient">
          Продолжить
        </Button>
      </motion.div>
    );
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div 
      className="w-full max-w-lg mx-auto outline-none" 
      tabIndex={0} 
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {words.length}
        </span>
        <div className="flex-1 mx-4 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-kpop-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-sm text-success">
          {learnedInSession.size} выучено
        </span>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentWord.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flip-card w-full aspect-[3/4]"
          onClick={handleFlip}
        >
          <div className={cn('flip-card-inner w-full h-full', isFlipped && 'flipped')}>
            {/* Передняя сторона */}
            <div className="flip-card-front absolute inset-0 glass-card p-8 flex flex-col">
              <div className="flex items-center justify-between mb-auto">
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  partOfSpeechClasses[currentWord.partOfSpeech]
                )}>
                  {partOfSpeechLabels[currentWord.partOfSpeech]}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleSpeak}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleToggleFavorite}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <Star className={cn(
                      'w-5 h-5 transition-colors',
                      isFavorite ? 'fill-warning text-warning' : 'text-muted-foreground'
                    )} />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <motion.span 
                  className="korean-large text-6xl md:text-7xl mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentWord.korean}
                </motion.span>
                {showRomanization && (
                  <span className="text-lg text-muted-foreground">
                    {currentWord.romanization}
                  </span>
                )}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-auto">
                Нажмите для перевода
              </p>
            </div>

            {/* Задняя сторона */}
            <div className="flip-card-back absolute inset-0 glass-card p-8 flex flex-col">
              <div className="flex items-center justify-between mb-auto">
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  currentWord.difficulty === 1 && 'badge-difficulty-1',
                  currentWord.difficulty === 2 && 'badge-difficulty-2',
                  currentWord.difficulty === 3 && 'badge-difficulty-3'
                )}>
                  Уровень {currentWord.difficulty}
                </span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <span className="korean-text text-4xl">
                  {currentWord.korean}
                </span>
                <div className="text-center">
                  <p className="text-2xl font-semibold mb-2">
                    {currentWord.meaning.join(', ')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentWord.romanization}
                  </p>
                </div>
                
                <div className="bg-muted/50 rounded-xl p-4 w-full max-w-sm">
                  <p className="korean-text text-lg text-center mb-1">
                    {currentWord.example.korean}
                  </p>
                  <p className="text-sm text-muted-foreground text-center">
                    {currentWord.example.translation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="outline"
          onClick={handleRepeat}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Повторить
        </Button>
        
        <Button
          onClick={handleKnow}
          className="gap-2 bg-success hover:bg-success/90"
        >
          <Check className="w-4 h-4" />
          Знаю
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          disabled={currentIndex === words.length - 1}
          className="rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Flashcard;