import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Layers, Brain, Music } from 'lucide-react';
import { getSongById } from '@/data/songs';
import { getWordsBySongId } from '@/data/words';
import { StudyMode } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { startSong, updateSongProgress } from '@/store/progressSlice';
import Flashcard from '@/components/Flashcard';
import QuizMode from '@/components/QuizMode';
import WordCard from '@/components/WordCard';
import Navigation from '@/components/Navigation';
import { cn } from '@/lib/utils';

const SongPage = () => {
  const { songId } = useParams<{ songId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [mode, setMode] = useState<StudyMode>('vocabulary');
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  
  const song = songId ? getSongById(songId) : undefined;
  const words = songId ? getWordsBySongId(songId) : [];
  const songProgress = useAppSelector(state => songId ? state.progress.songProgress[songId] : undefined);
  const wordProgress = useAppSelector(state => state.progress.wordProgress);

  useEffect(() => {
    if (songId && !songProgress) {
      dispatch(startSong(songId));
    }
  }, [songId, songProgress, dispatch]);

  useEffect(() => {
    if (songId) {
      dispatch(updateSongProgress(songId));
    }
  }, [songId, wordProgress, dispatch]);

  if (!song) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
            <Music className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Песня не найдена</h2>
          <Link to="/" className="text-primary hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const learnedWords = words.filter(w => wordProgress[w.id]?.status === 'learned').length;
  const progressPercent = words.length > 0 ? (learnedWords / words.length) * 100 : 0;

  const modes: { value: StudyMode; label: string; icon: React.ReactNode }[] = [
    { value: 'vocabulary', label: 'Словарь', icon: <BookOpen className="w-4 h-4" /> },
    { value: 'flashcards', label: 'Карточки', icon: <Layers className="w-4 h-4" /> },
    { value: 'quiz', label: 'Тест', icon: <Brain className="w-4 h-4" /> },
  ];

  const handleQuizComplete = (correct: number, total: number) => {
    setMode('vocabulary');
  };

  const handleFlashcardsComplete = () => {
    setMode('vocabulary');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pt-24 md:pb-8">
      <Navigation />
      
      <main className="max-w-screen-xl mx-auto px-4 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Назад</span>
          </button>

          <div className="glass-card overflow-hidden">
            <div 
              className="h-32 md:h-48 relative"
              style={{
                background: `linear-gradient(135deg, ${song.gradientFrom}80, ${song.gradientTo}80)`
              }}
            >
              <img
                src={song.albumCover}
                alt={song.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="badge-topik text-[10px] mb-2 inline-block">TOPIK 1</span>
                <h1 className="text-2xl md:text-3xl font-bold">{song.title}</h1>
                <p className="text-foreground/70">{song.artist}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Прогресс изучения</span>
                <span className="font-medium">
                  <span style={{ color: song.gradientFrom }}>{learnedWords}</span>
                  <span className="text-muted-foreground"> / {words.length} слов</span>
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{
                    background: `linear-gradient(90deg, ${song.gradientFrom}, ${song.gradientTo})`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2"
        >
          {modes.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                mode === m.value
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              )}
            >
              {m.icon}
              {m.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {mode === 'vocabulary' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {words.map((word, index) => (
                  <motion.div
                    key={word.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <WordCard 
                      word={word} 
                      onClick={() => setSelectedWordId(word.id === selectedWordId ? null : word.id)}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {mode === 'flashcards' && (
              <Flashcard words={words} onComplete={handleFlashcardsComplete} />
            )}

            {mode === 'quiz' && (
              <QuizMode words={words} onComplete={handleQuizComplete} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SongPage;