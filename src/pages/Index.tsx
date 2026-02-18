import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Music, Target, TrendingUp, Flame } from 'lucide-react';
import { songs } from '@/data/songs';
import { SongFilter } from '@/types';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateStreak, checkAchievements } from '@/store/progressSlice';
import SongCard from '@/components/SongCard';
import Navigation from '@/components/Navigation';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<SongFilter>('all');
  
  const dispatch = useAppDispatch();
  const songProgress = useAppSelector(state => state.progress.songProgress);
  const stats = useAppSelector(state => state.progress.stats);

  useEffect(() => {
    dispatch(updateStreak());
    dispatch(checkAchievements());
  }, [dispatch]);

  const filteredSongs = songs.filter(song => {
    const matchesSearch = 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    const progress = songProgress[song.id];
    switch (filter) {
      case 'started':
        return progress && !progress.completedAt;
      case 'completed':
        return progress?.completedAt;
      default:
        return true;
    }
  });

  const filters: { value: SongFilter; label: string }[] = [
    { value: 'all', label: 'Все' },
    { value: 'started', label: 'Начатые' },
    { value: 'completed', label: 'Завершённые' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="max-w-screen-xl mx-auto px-4 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-kpop-gradient flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                K-Pop Korean <span className="gradient-text">Master</span>
              </h1>
              <p className="text-muted-foreground">
                Изучай корейский через любимую музыку
              </p>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="glass-card p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold gradient-text">
                {stats.totalWordsLearned}
              </div>
              <div className="text-xs text-muted-foreground">слов изучено</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Flame className="w-5 h-5 text-warning" />
              </div>
              <div className="text-2xl font-bold text-warning">
                {stats.currentStreak}
              </div>
              <div className="text-xs text-muted-foreground">дней подряд</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="text-2xl font-bold text-success">
                {stats.totalSongsCompleted}
              </div>
              <div className="text-xs text-muted-foreground">песен освоено</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск по песням..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <Filter className="w-5 h-5 text-muted-foreground" />
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                filter === f.value
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              )}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Songs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <SongCard song={song} />
            </motion.div>
          ))}
        </div>

        {/* Empty state с иконкой */}
        {filteredSongs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
              <Music className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Песни не найдены
            </h3>
            <p className="text-muted-foreground">
              Попробуйте изменить поисковый запрос
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;