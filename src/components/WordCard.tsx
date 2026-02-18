import { motion } from 'framer-motion';
import { Volume2, Star, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { Word, WordStatus } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleFavorite } from '@/store/progressSlice';
import { cn } from '@/lib/utils';

interface WordCardProps {
  word: Word;
  onClick?: () => void;
  compact?: boolean;
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

const statusIcons: Record<WordStatus, React.ReactNode> = {
  new: <BookOpen className="w-4 h-4" />,
  learning: <Clock className="w-4 h-4" />,
  learned: <CheckCircle className="w-4 h-4" />,
  review: <Clock className="w-4 h-4" />,
};

const statusColors: Record<WordStatus, string> = {
  new: 'text-muted-foreground',
  learning: 'text-warning',
  learned: 'text-success',
  review: 'text-primary',
};

const WordCard = ({ word, onClick, compact = false }: WordCardProps) => {
  const { speakKorean } = useSpeech();
  const dispatch = useAppDispatch();
  const progress = useAppSelector(state => state.progress.wordProgress[word.id]);
  const showRomanization = useAppSelector(state => state.settings.showRomanization);
  
  const status: WordStatus = progress?.status || 'new';
  const isFavorite = progress?.isFavorite || false;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakKorean(word.korean);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(word.id));
  };

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="glass-card p-3 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="korean-text text-xl">{word.korean}</span>
          <span className={cn('text-xs px-2 py-0.5 rounded-full', partOfSpeechClasses[word.partOfSpeech])}>
            {partOfSpeechLabels[word.partOfSpeech]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={statusColors[status]}>
            {statusIcons[status]}
          </span>
          <button
            onClick={handleToggleFavorite}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <Star className={cn(
              'w-4 h-4',
              isFavorite ? 'fill-warning text-warning' : 'text-muted-foreground'
            )} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card-hover p-5 cursor-pointer"
    >
      {/* Верхняя часть */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            partOfSpeechClasses[word.partOfSpeech]
          )}>
            {partOfSpeechLabels[word.partOfSpeech]}
          </span>
          <span className={cn(
            'flex items-center gap-1 text-xs',
            statusColors[status]
          )}>
            {statusIcons[status]}
            <span className="capitalize">{
              status === 'new' ? 'Новое' :
              status === 'learning' ? 'Изучается' :
              status === 'learned' ? 'Выучено' :
              'Повторение'
            }</span>
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleSpeak}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleToggleFavorite}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Star className={cn(
              'w-4 h-4',
              isFavorite ? 'fill-warning text-warning' : 'text-muted-foreground'
            )} />
          </button>
        </div>
      </div>

      {/* Корейское слово */}
      <div className="text-center py-4">
        <span className="korean-large text-4xl">{word.korean}</span>
        {showRomanization && (
          <p className="text-sm text-muted-foreground mt-2">{word.romanization}</p>
        )}
      </div>

      {/* Перевод */}
      <div className="text-center">
        <p className="font-medium text-lg">{word.meaning.join(', ')}</p>
      </div>

      {/* Пример */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <p className="korean-text text-sm text-center">{word.example.korean}</p>
        <p className="text-xs text-muted-foreground text-center mt-1">{word.example.translation}</p>
      </div>

      {/* Сложность */}
      <div className="mt-4 flex justify-center">
        <span className={cn(
          'px-3 py-1 rounded-full text-xs',
          word.difficulty === 1 && 'badge-difficulty-1',
          word.difficulty === 2 && 'badge-difficulty-2',
          word.difficulty === 3 && 'badge-difficulty-3'
        )}>
          Уровень {word.difficulty}
        </span>
      </div>
    </motion.div>
  );
};

export default WordCard;
