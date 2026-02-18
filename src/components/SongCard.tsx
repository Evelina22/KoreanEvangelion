import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, BookOpen, Target } from 'lucide-react';
import { Song } from '@/types';
import { useAppSelector } from '@/store/hooks';

interface SongCardProps {
  song: Song;
}

const SongCard = ({ song }: SongCardProps) => {
  const navigate = useNavigate();
  const wordProgress = useAppSelector(state => state.progress.wordProgress);
  
  const totalWords = song.words.length;
  const learnedWords = song.words.filter(
    wordId => wordProgress[wordId]?.status === 'learned'
  ).length;
  const progressPercent = totalWords > 0 ? (learnedWords / totalWords) * 100 : 0;
  
  const handleClick = () => {
    navigate(`/song/${song.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="glass-card-hover cursor-pointer group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Обложка альбома */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={song.albumCover}
          alt={`${song.title} by ${song.artist}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(135deg, ${song.gradientFrom}40, ${song.gradientTo}60)`
          }}
        />
        
        <div className="song-card-overlay absolute inset-0" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold mb-1 font-display">{song.title}</h3>
          <p className="text-sm text-foreground/70">{song.artist}</p>
        </div>
        
        <div className="absolute top-3 right-3">
          <span className="badge-topik text-[10px]">TOPIK 1</span>
        </div>
        
        {progressPercent > 0 && (
          <div className="absolute top-3 left-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: `conic-gradient(${song.gradientFrom} ${progressPercent}%, transparent ${progressPercent}%)`,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                {Math.round(progressPercent)}%
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Нижняя часть */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Слова</span>
          <span className="font-medium">
            <span style={{ color: song.gradientFrom }}>{learnedWords}</span>
            <span className="text-muted-foreground">/{totalWords}</span>
          </span>
        </div>
        
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${song.gradientFrom}, ${song.gradientTo})`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        
        {/* Статусы с иконками */}
        <div className="flex items-center gap-2">
          {progressPercent === 100 ? (
            <span className="text-xs text-success flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Завершено
            </span>
          ) : progressPercent > 0 ? (
            <span className="text-xs text-warning flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              В процессе
            </span>
          ) : (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              Начать изучение
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SongCard;