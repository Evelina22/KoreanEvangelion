import { motion } from 'framer-motion';
import { Star, Trash2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleFavorite } from '@/store/progressSlice';
import { getWordById } from '@/data/words';
import Navigation from '@/components/Navigation';
import WordCard from '@/components/WordCard';
import { Button } from '@/components/ui/button';

const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const wordProgress = useAppSelector(state => state.progress.wordProgress);
  
  // Получаем ID избранных слов
  const favoriteIds = Object.entries(wordProgress)
    .filter(([_, progress]) => progress.isFavorite)
    .map(([id]) => id);
  
  // Получаем полные данные слов
  const favoriteWords = favoriteIds
    .map(id => getWordById(id))
    .filter((word): word is NonNullable<typeof word> => word !== undefined);

  const handleRemoveFromFavorites = (wordId: string) => {
    dispatch(toggleFavorite(wordId));
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pt-24 md:pb-8">
      <Navigation />
      
      <main className="max-w-screen-xl mx-auto px-4 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-8 h-8 text-warning fill-warning" />
            <h1 className="text-3xl font-bold">
              Избранные <span className="gradient-text">слова</span>
            </h1>
          </div>
          <p className="text-muted-foreground">
            {favoriteWords.length > 0 
              ? `${favoriteWords.length} слов в избранном` 
              : 'Добавляйте слова в избранное для быстрого доступа'}
          </p>
        </motion.div>

        {/* Content */}
        {favoriteWords.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {favoriteWords.map((word, index) => (
              <motion.div
                key={word.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <WordCard word={word} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center max-w-md mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Star className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Пока пусто</h2>
            <p className="text-muted-foreground mb-6">
              Нажмите на звёздочку ⭐ на любой карточке слова, чтобы добавить его в избранное
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-kpop-gradient"
            >
              Перейти к песням
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;
