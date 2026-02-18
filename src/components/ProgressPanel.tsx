import { motion } from 'framer-motion';
import { Flame, Target, BookOpen, Trophy, Music, RotateCcw, PartyPopper } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

// Функция для получения компонента иконки
const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    'award': Trophy,
    'book-open': BookOpen,
    'music': Music,
    'flame': Flame,
    'sparkles': PartyPopper,
    'repeat': RotateCcw,
    'crown': Trophy,
    'target': Target,
  };
  
  return icons[iconName] || Trophy;
};

const ProgressPanel = () => {
  const stats = useAppSelector(state => state.progress.stats);
  const achievements = useAppSelector(state => state.progress.achievements);
  
  const unlockedAchievements = achievements.filter(a => a.unlockedAt !== null);
  const dailyProgress = Math.min((stats.todayWords / stats.dailyGoal) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Ежедневная цель */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Дневная цель</h3>
            <p className="text-sm text-muted-foreground">
              {stats.todayWords} / {stats.dailyGoal} слов
            </p>
          </div>
        </div>
        
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-kpop-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${dailyProgress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        
        {dailyProgress >= 100 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-success text-sm mt-2 text-center flex items-center justify-center gap-2"
          >
            <PartyPopper className="w-4 h-4" />
            Цель достигнута!
          </motion.p>
        )}
      </motion.div>

      {/* Статистика */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        {/* Серия дней */}
        <div className="glass-card p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className={`w-6 h-6 ${stats.currentStreak > 0 ? 'text-warning animate-flame' : 'text-muted-foreground'}`} />
            <span className="text-3xl font-bold">{stats.currentStreak}</span>
          </div>
          <p className="text-xs text-muted-foreground">Дней подряд</p>
          <p className="text-xs text-muted-foreground mt-1">
            Рекорд: {stats.longestStreak}
          </p>
        </div>

        {/* Всего слов */}
        <div className="glass-card p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-secondary" />
            <span className="text-3xl font-bold">{stats.totalWordsLearned}</span>
          </div>
          <p className="text-xs text-muted-foreground">Слов изучено</p>
        </div>

        {/* Песни */}
        <div className="glass-card p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Music className="w-6 h-6 text-primary" />
            <span className="text-3xl font-bold">{stats.totalSongsCompleted}</span>
          </div>
          <p className="text-xs text-muted-foreground">Песен освоено</p>
        </div>

        {/* Повторения */}
        <div className="glass-card p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <RotateCcw className="w-6 h-6 text-success" />
            <span className="text-3xl font-bold">{stats.totalReviews}</span>
          </div>
          <p className="text-xs text-muted-foreground">Повторений</p>
        </div>
      </motion.div>

      {/* Достижения */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="font-semibold">Достижения</h3>
            <p className="text-sm text-muted-foreground">
              {unlockedAchievements.length} / {achievements.length}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement) => {
            const IconComponent = getIconComponent(achievement.icon);
            
            return (
              <motion.div
                key={achievement.id}
                className={`aspect-square rounded-xl flex items-center justify-center ${
                  achievement.unlockedAt 
                    ? 'bg-warning/20 shadow-lg text-warning' 
                    : 'bg-muted/50 opacity-50 grayscale text-muted-foreground'
                }`}
                whileHover={achievement.unlockedAt ? { scale: 1.1 } : {}}
                title={`${achievement.title}: ${achievement.description}`}
              >
                <IconComponent className="w-6 h-6" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressPanel;