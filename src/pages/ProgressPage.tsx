import { motion } from 'framer-motion';
import { Award, BookOpen, Music, Flame, Sparkles, Repeat, Crown, Target, CheckCircle, PartyPopper } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ProgressPanel from '@/components/ProgressPanel';
import { useAppSelector } from '@/store/hooks';

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    'award': Award,
    'book-open': BookOpen,
    'music': Music,
    'flame': Flame,
    'sparkles': Sparkles,
    'repeat': Repeat,
    'crown': Crown,
    'target': Target,
  };
  
  return icons[iconName] || Award;
};

const ProgressPage = () => {
  const stats = useAppSelector(state => state.progress.stats);
  const achievements = useAppSelector(state => state.progress.achievements);
  const unlockedCount = achievements.filter(a => a.unlockedAt).length;

  return (
    <div className="min-h-screen bg-background pb-20 md:pt-24 md:pb-8">
      <Navigation />
      
      <main className="max-w-screen-xl mx-auto px-4 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Мой <span className="gradient-text">прогресс</span>
          </h1>
          <p className="text-muted-foreground">
            Отслеживай свои достижения в изучении корейского
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProgressPanel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">Все достижения</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Разблокировано {unlockedCount} из {achievements.length}
              </p>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const IconComponent = getIconComponent(achievement.icon);

                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                        achievement.unlockedAt 
                          ? 'bg-muted/50' 
                          : 'bg-muted/20 opacity-60'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        achievement.unlockedAt 
                          ? 'bg-warning/20 text-warning' 
                          : 'bg-muted text-muted-foreground grayscale'
                      }`}>
                        <IconComponent className="w-7 h-7" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.unlockedAt && (
                          <p className="text-xs text-success mt-1 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Получено {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}
                          </p>
                        )}
                      </div>

                      {!achievement.unlockedAt && (
                        <div className="text-sm text-muted-foreground">
                          {achievement.requirement.type === 'words_learned' && (
                            <span>{stats.totalWordsLearned}/{achievement.requirement.count}</span>
                          )}
                          {achievement.requirement.type === 'songs_completed' && (
                            <span>{stats.totalSongsCompleted}/{achievement.requirement.count}</span>
                          )}
                          {achievement.requirement.type === 'streak' && (
                            <span>{stats.currentStreak}/{achievement.requirement.count}</span>
                          )}
                          {achievement.requirement.type === 'reviews' && (
                            <span>{stats.totalReviews}/{achievement.requirement.count}</span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* TOPIK 1 Progress */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">Прогресс TOPIK 1</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Изучено слов</span>
                    <span className="font-medium">{stats.totalWordsLearned} / 800</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-kpop-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.totalWordsLearned / 800) * 100}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  {stats.totalWordsLearned >= 800 ? (
                    <>
                      <PartyPopper className="w-4 h-4 text-success" />
                      <span>Поздравляем! Вы освоили базовый словарь TOPIK 1!</span>
                    </>
                  ) : (
                    `До освоения TOPIK 1 осталось ${800 - stats.totalWordsLearned} слов`
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;