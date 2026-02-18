// Типы для K-Pop Korean Master приложения

export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'particle';
export type Difficulty = 1 | 2 | 3;
export type WordStatus = 'new' | 'learning' | 'learned' | 'review';

// Интерфейс для слова TOPIK 1
export interface Word {
  id: string;
  korean: string;
  meaning: string[];
  romanization: string;
  partOfSpeech: PartOfSpeech;
  difficulty: Difficulty;
  example: {
    korean: string;
    translation: string;
    songId: string;
  };
  audioUrl?: string;
}

// Интерфейс для песни
export interface Song {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  youtubeId?: string;
  words: string[];
  difficulty: 'beginner';
  colorTheme: string;
  gradientFrom: string;
  gradientTo: string;
}

// Прогресс изучения слова
export interface WordProgress {
  wordId: string;
  status: WordStatus;
  correctCount: number;
  wrongCount: number;
  lastReviewed: string | null;
  nextReview: string | null;
  interval: number;
  isFavorite: boolean;
  learnedAt: string | null;
}

// Прогресс по песне
export interface SongProgress {
  songId: string;
  startedAt: string;
  completedAt: string | null;
  wordsLearned: number;
  totalWords: number;
}

// Достижение — icon хранится как строка (сериализуется в JSON)
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;              // название иконки: 'Award', 'Flame' и т.д.
  unlockedAt: string | null;
  requirement: {
    type: 'words_learned' | 'songs_completed' | 'streak' | 'reviews';
    count: number;
  };
}

// Статистика пользователя
export interface UserStats {
  totalWordsLearned: number;
  totalSongsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  dailyGoal: number;
  todayWords: number;
  totalReviews: number;
}

// Настройки приложения
export interface AppSettings {
  dailyGoal: number;
  speechRate: number;
  autoPlayAudio: boolean;
  showRomanization: boolean;
  hapticFeedback: boolean;
}

// Тип теста
export type QuizType =
  | 'choose_translation'
  | 'choose_korean'
  | 'match_pairs'
  | 'audio_test';

// Вопрос теста
export interface QuizQuestion {
  type: QuizType;
  word: Word;
  options: string[];
  correctAnswer: string;
}

// Результат теста
export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: number;
  completedAt: string;
}

// Фильтры для библиотеки песен
export type SongFilter = 'all' | 'started' | 'completed';

// Режим изучения
export type StudyMode = 'vocabulary' | 'flashcards' | 'review' | 'quiz';