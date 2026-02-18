import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSettings } from '@/types';

const STORAGE_KEY = 'kpop-settings';

// Загрузка настроек из localStorage
const loadSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Игнорируем ошибки
  }
  return {
    dailyGoal: 10,
    speechRate: 1.0,
    autoPlayAudio: false,
    showRomanization: true,
    hapticFeedback: true,
  };
};

// Сохранение настроек
const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Ошибка сохранения настроек:', error);
  }
};

const initialState: AppSettings = loadSettings();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSpeechRate: (state, action: PayloadAction<number>) => {
      state.speechRate = action.payload;
      saveSettings(state);
    },
    setAutoPlayAudio: (state, action: PayloadAction<boolean>) => {
      state.autoPlayAudio = action.payload;
      saveSettings(state);
    },
    setShowRomanization: (state, action: PayloadAction<boolean>) => {
      state.showRomanization = action.payload;
      saveSettings(state);
    },
    setHapticFeedback: (state, action: PayloadAction<boolean>) => {
      state.hapticFeedback = action.payload;
      saveSettings(state);
    },
    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.dailyGoal = action.payload;
      saveSettings(state);
    },
    resetSettings: () => {
      const defaults: AppSettings = {
        dailyGoal: 10,
        speechRate: 1.0,
        autoPlayAudio: false,
        showRomanization: true,
        hapticFeedback: true,
      };
      saveSettings(defaults);
      return defaults;
    },
  },
});

export const {
  setSpeechRate,
  setAutoPlayAudio,
  setShowRomanization,
  setHapticFeedback,
  setDailyGoal,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
