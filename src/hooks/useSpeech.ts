// Хук для Web Speech API - озвучивание корейских слов
import { useCallback, useRef } from 'react';
import { useAppSelector } from '@/store/hooks';

export const useSpeech = () => {
  const speechRate = useAppSelector(state => state.settings.speechRate);
  const isSpeakingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const speak = useCallback((text: string, lang: string = 'ko-KR') => {
    if (!('speechSynthesis' in window)) {
      console.warn('⚠️ Web Speech API не поддерживается');
      return;
    }

    // Отменяем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Останавливаем предыдущее озвучивание
    if (isSpeakingRef.current || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
      
      // Небольшая задержка перед новым
      timeoutRef.current = window.setTimeout(() => {
        performSpeak(text, lang);
      }, 200);
    } else {
      performSpeak(text, lang);
    }
  }, [speechRate]);

  const performSpeak = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = speechRate;
    utterance.pitch = 1;
    utterance.volume = 1;

    // НЕ выбираем голос вручную - даём браузеру решить
    // Это самый надёжный способ избежать synthesis-failed

    // События
    utterance.onstart = () => {
      isSpeakingRef.current = true;
      console.log('🔊 Озвучивание:', text);
    };

    utterance.onend = () => {
      isSpeakingRef.current = false;
    };
    
    utterance.onerror = (event) => {
      isSpeakingRef.current = false;
      
      // Показываем только реальные ошибки (не interrupted)
      if (event.error !== 'interrupted') {
        console.warn('⚠️ Ошибка озвучивания:', event.error);
      }
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('❌ Ошибка при запуске озвучивания:', error);
      isSpeakingRef.current = false;
    }
  };

  const speakKorean = useCallback((text: string) => {
    speak(text, 'ko-KR');
  }, [speak]);

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
    }
  }, []);

  return { speak, speakKorean, stop, voicesLoaded: true };
};