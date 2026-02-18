import { Achievement } from '@/types';

// Достижения в приложении
// icon — строка-название иконки, компонент подставляется в ProgressPage
export const achievements: Achievement[] = [
  {
    id: 'first_10',
    title: 'Первые шаги',
    description: 'Изучи первые 10 слов',
    icon: 'Award',
    unlockedAt: null,
    requirement: { type: 'words_learned', count: 10 }
  },
  {
    id: 'scholar_50',
    title: 'Прилежный ученик',
    description: 'Изучи 50 слов',
    icon: 'BookOpen',
    unlockedAt: null,
    requirement: { type: 'words_learned', count: 50 }
  },
  {
    id: 'song_master',
    title: 'Мастер песни',
    description: 'Освой все слова одной песни',
    icon: 'Music',
    unlockedAt: null,
    requirement: { type: 'songs_completed', count: 1 }
  },
  {
    id: 'streak_7',
    title: 'Неделя в огне',
    description: '7 дней подряд изучай слова',
    icon: 'Flame',
    unlockedAt: null,
    requirement: { type: 'streak', count: 7 }
  },
  {
    id: 'topik_master',
    title: 'TOPIK 1 Мастер',
    description: 'Изучи 250 слов TOPIK 1',
    icon: 'Sparkles',
    unlockedAt: null,
    requirement: { type: 'words_learned', count: 250 }
  },
  {
    id: 'review_100',
    title: 'Повторение — мать учения',
    description: 'Выполни 100 повторений',
    icon: 'Repeat',
    unlockedAt: null,
    requirement: { type: 'reviews', count: 100 }
  },
  {
    id: 'all_songs',
    title: 'K-Pop Гуру',
    description: 'Освой все доступные песни',
    icon: 'Crown',
    unlockedAt: null,
    requirement: { type: 'songs_completed', count: 5 }
  },
  {
    id: 'streak_30',
    title: 'Месяц дисциплины',
    description: '30 дней подряд изучай слова',
    icon: 'Target',
    unlockedAt: null,
    requirement: { type: 'streak', count: 30 }
  }
];

export const getAchievementById = (id: string): Achievement | undefined => {
  return achievements.find(a => a.id === id);
};