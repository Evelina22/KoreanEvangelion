import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordProgress, SongProgress, UserStats, Achievement } from '@/types';
import { achievements as defaultAchievements } from '@/data/achievements';
import { songs } from '@/data/songs';

// Ключи для localStorage
const STORAGE_KEYS = {
  WORD_PROGRESS: 'kpop-word-progress',
  SONG_PROGRESS: 'kpop-song-progress',
  USER_STATS: 'kpop-user-stats',
  ACHIEVEMENTS: 'kpop-achievements',
};

// Начальные значения статистики
const initialStats: UserStats = {
  totalWordsLearned: 0,
  totalSongsCompleted: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  dailyGoal: 10,
  todayWords: 0,
  totalReviews: 0,
};

// Загрузка данных из localStorage
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

// Сохранение в localStorage
const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error);
  }
};

// Интерфейс состояния прогресса
interface ProgressState {
  wordProgress: Record<string, WordProgress>;
  songProgress: Record<string, SongProgress>;
  stats: UserStats;
  achievements: Achievement[];
  favorites: string[]; // ID избранных слов
}

// Начальное состояние
const initialState: ProgressState = {
  wordProgress: loadFromStorage(STORAGE_KEYS.WORD_PROGRESS, {}),
  songProgress: loadFromStorage(STORAGE_KEYS.SONG_PROGRESS, {}),
  stats: loadFromStorage(STORAGE_KEYS.USER_STATS, initialStats),
  achievements: loadFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements),
  favorites: [],
};

// Вычисление следующего интервала повторения (Spaced Repetition)
const calculateNextInterval = (currentInterval: number, isCorrect: boolean): number => {
  if (!isCorrect) return 1; // Сброс при ошибке
  // SM-2 подобный алгоритм: 1, 3, 7, 14, 30 дней
  const intervals = [1, 3, 7, 14, 30];
  const currentIndex = intervals.indexOf(currentInterval);
  if (currentIndex === -1 || currentIndex >= intervals.length - 1) {
    return 30;
  }
  return intervals[currentIndex + 1];
};

// Slice прогресса
const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    // Обновление прогресса слова
    updateWordProgress: (state, action: PayloadAction<{
      wordId: string;
      isCorrect?: boolean;
      markAsLearned?: boolean;
    }>) => {
      const { wordId, isCorrect, markAsLearned } = action.payload;
      const now = new Date().toISOString();
      
      if (!state.wordProgress[wordId]) {
        state.wordProgress[wordId] = {
          wordId,
          status: 'new',
          correctCount: 0,
          wrongCount: 0,
          lastReviewed: null,
          nextReview: null,
          interval: 1,
          isFavorite: false,
          learnedAt: null,
        };
      }

      const progress = state.wordProgress[wordId];
      
      if (isCorrect !== undefined) {
        if (isCorrect) {
          progress.correctCount++;
          progress.interval = calculateNextInterval(progress.interval, true);
        } else {
          progress.wrongCount++;
          progress.interval = calculateNextInterval(progress.interval, false);
        }
        progress.lastReviewed = now;
        
        // Вычисление даты следующего повторения
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + progress.interval);
        progress.nextReview = nextDate.toISOString();
        
        state.stats.totalReviews++;
      }

      if (markAsLearned && progress.status !== 'learned') {
        progress.status = 'learned';
        progress.learnedAt = now;
        state.stats.totalWordsLearned++;
        state.stats.todayWords++;
      } else if (progress.status === 'new') {
        progress.status = 'learning';
      }

      saveToStorage(STORAGE_KEYS.WORD_PROGRESS, state.wordProgress);
      saveToStorage(STORAGE_KEYS.USER_STATS, state.stats);
    },

    // Переключение избранного
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const wordId = action.payload;
      
      if (!state.wordProgress[wordId]) {
        state.wordProgress[wordId] = {
          wordId,
          status: 'new',
          correctCount: 0,
          wrongCount: 0,
          lastReviewed: null,
          nextReview: null,
          interval: 1,
          isFavorite: true,
          learnedAt: null,
        };
      } else {
        state.wordProgress[wordId].isFavorite = !state.wordProgress[wordId].isFavorite;
      }

      // Обновление списка избранных
      const isFav = state.wordProgress[wordId].isFavorite;
      if (isFav && !state.favorites.includes(wordId)) {
        state.favorites.push(wordId);
      } else if (!isFav) {
        state.favorites = state.favorites.filter(id => id !== wordId);
      }

      saveToStorage(STORAGE_KEYS.WORD_PROGRESS, state.wordProgress);
    },

    // Начать изучение песни
    startSong: (state, action: PayloadAction<string>) => {
      const songId = action.payload;
      const song = songs.find(s => s.id === songId);
      
      if (!state.songProgress[songId] && song) {
        state.songProgress[songId] = {
          songId,
          startedAt: new Date().toISOString(),
          completedAt: null,
          wordsLearned: 0,
          totalWords: song.words.length,
        };
        saveToStorage(STORAGE_KEYS.SONG_PROGRESS, state.songProgress);
      }
    },

    // Обновить прогресс песни
    updateSongProgress: (state, action: PayloadAction<string>) => {
      const songId = action.payload;
      const song = songs.find(s => s.id === songId);
      
      if (state.songProgress[songId] && song) {
        // Подсчёт выученных слов из этой песни
        const learnedWords = song.words.filter(
          wordId => state.wordProgress[wordId]?.status === 'learned'
        ).length;
        
        state.songProgress[songId].wordsLearned = learnedWords;
        
        // Проверка завершения
        if (learnedWords === song.words.length && !state.songProgress[songId].completedAt) {
          state.songProgress[songId].completedAt = new Date().toISOString();
          state.stats.totalSongsCompleted++;
        }
        
        saveToStorage(STORAGE_KEYS.SONG_PROGRESS, state.songProgress);
        saveToStorage(STORAGE_KEYS.USER_STATS, state.stats);
      }
    },

    // Обновить серию дней
    updateStreak: (state) => {
      const today = new Date().toISOString().split('T')[0];
      const lastActive = state.stats.lastActiveDate;
      
      if (lastActive !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (lastActive === yesterdayStr) {
          state.stats.currentStreak++;
        } else if (lastActive !== today) {
          state.stats.currentStreak = 1;
        }
        
        state.stats.todayWords = 0; // Сброс дневного счётчика
      }
      
      state.stats.lastActiveDate = today;
      
      if (state.stats.currentStreak > state.stats.longestStreak) {
        state.stats.longestStreak = state.stats.currentStreak;
      }
      
      saveToStorage(STORAGE_KEYS.USER_STATS, state.stats);
    },

    // Проверка и разблокировка достижений
    checkAchievements: (state) => {
      const { stats, achievements } = state;
      let updated = false;

      achievements.forEach((achievement, index) => {
        if (achievement.unlockedAt) return; // Уже разблокировано

        let unlocked = false;
        switch (achievement.requirement.type) {
          case 'words_learned':
            unlocked = stats.totalWordsLearned >= achievement.requirement.count;
            break;
          case 'songs_completed':
            unlocked = stats.totalSongsCompleted >= achievement.requirement.count;
            break;
          case 'streak':
            unlocked = stats.currentStreak >= achievement.requirement.count;
            break;
          case 'reviews':
            unlocked = stats.totalReviews >= achievement.requirement.count;
            break;
        }

        if (unlocked) {
          state.achievements[index].unlockedAt = new Date().toISOString();
          updated = true;
        }
      });

      if (updated) {
        saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, state.achievements);
      }
    },

    // Установить ежедневную цель
    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.stats.dailyGoal = action.payload;
      saveToStorage(STORAGE_KEYS.USER_STATS, state.stats);
    },

    // Сброс прогресса (для тестирования)
    resetProgress: (state) => {
      state.wordProgress = {};
      state.songProgress = {};
      state.stats = initialStats;
      state.achievements = defaultAchievements;
      state.favorites = [];
      
      localStorage.removeItem(STORAGE_KEYS.WORD_PROGRESS);
      localStorage.removeItem(STORAGE_KEYS.SONG_PROGRESS);
      localStorage.removeItem(STORAGE_KEYS.USER_STATS);
      localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    },
  },
});

export const {
  updateWordProgress,
  toggleFavorite,
  startSong,
  updateSongProgress,
  updateStreak,
  checkAchievements,
  setDailyGoal,
  resetProgress,
} = progressSlice.actions;

export default progressSlice.reducer;
