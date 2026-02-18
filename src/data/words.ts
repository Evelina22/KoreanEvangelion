import { Word } from '@/types';

// Словарь TOPIK 1 слов для всех песен
export const words: Word[] = [
  // BTS - Dynamite (15 слов)
  {
    id: 'w1',
    korean: '학교',
    meaning: ['школа'],
    romanization: 'hakgyo',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '학교에서 만나요',
      translation: 'Встретимся в школе',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w2',
    korean: '친구',
    meaning: ['друг'],
    romanization: 'chingu',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '친구와 함께',
      translation: 'Вместе с другом',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w3',
    korean: '음식',
    meaning: ['еда', 'пища'],
    romanization: 'eumsik',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '맛있는 음식',
      translation: 'Вкусная еда',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w4',
    korean: '좋다',
    meaning: ['хороший', 'нравится'],
    romanization: 'jota',
    partOfSpeech: 'adjective',
    difficulty: 1,
    example: {
      korean: '기분이 좋다',
      translation: 'Настроение хорошее',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w5',
    korean: '크다',
    meaning: ['большой'],
    romanization: 'keuda',
    partOfSpeech: 'adjective',
    difficulty: 1,
    example: {
      korean: '큰 꿈을 꿔요',
      translation: 'Мечтаю о большом',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w6',
    korean: '작다',
    meaning: ['маленький'],
    romanization: 'jakda',
    partOfSpeech: 'adjective',
    difficulty: 1,
    example: {
      korean: '작은 것부터',
      translation: 'Начиная с малого',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w7',
    korean: '날씨',
    meaning: ['погода'],
    romanization: 'nalssi',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '오늘 날씨가 좋아요',
      translation: 'Сегодня хорошая погода',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w8',
    korean: '시간',
    meaning: ['время'],
    romanization: 'sigan',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '시간이 없어요',
      translation: 'Нет времени',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w9',
    korean: '사람',
    meaning: ['человек', 'люди'],
    romanization: 'saram',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '좋은 사람',
      translation: 'Хороший человек',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w10',
    korean: '이름',
    meaning: ['имя'],
    romanization: 'ireum',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '이름이 뭐예요?',
      translation: 'Как тебя зовут?',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w11',
    korean: '나라',
    meaning: ['страна'],
    romanization: 'nara',
    partOfSpeech: 'noun',
    difficulty: 2,
    example: {
      korean: '우리 나라',
      translation: 'Наша страна',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w12',
    korean: '도시',
    meaning: ['город'],
    romanization: 'dosi',
    partOfSpeech: 'noun',
    difficulty: 2,
    example: {
      korean: '큰 도시',
      translation: 'Большой город',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w13',
    korean: '집',
    meaning: ['дом'],
    romanization: 'jip',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '집에 가요',
      translation: 'Иду домой',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w14',
    korean: '방',
    meaning: ['комната'],
    romanization: 'bang',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '내 방에서',
      translation: 'В моей комнате',
      songId: 'bts-dynamite'
    }
  },
  {
    id: 'w15',
    korean: '문',
    meaning: ['дверь'],
    romanization: 'mun',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '문을 열어요',
      translation: 'Открываю дверь',
      songId: 'bts-dynamite'
    }
  },

  // BLACKPINK - How You Like That (12 слов)
  {
    id: 'w16',
    korean: '여자',
    meaning: ['женщина', 'девушка'],
    romanization: 'yeoja',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '강한 여자',
      translation: 'Сильная женщина',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w17',
    korean: '남자',
    meaning: ['мужчина', 'парень'],
    romanization: 'namja',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '그 남자',
      translation: 'Тот парень',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w18',
    korean: '사랑',
    meaning: ['любовь'],
    romanization: 'sarang',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '사랑해요',
      translation: 'Я тебя люблю',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w19',
    korean: '예쁘다',
    meaning: ['красивый'],
    romanization: 'yeppeuda',
    partOfSpeech: 'adjective',
    difficulty: 1,
    example: {
      korean: '정말 예쁘다',
      translation: 'Действительно красиво',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w20',
    korean: '강하다',
    meaning: ['сильный'],
    romanization: 'ganghada',
    partOfSpeech: 'adjective',
    difficulty: 2,
    example: {
      korean: '더 강하게',
      translation: 'Ещё сильнее',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w21',
    korean: '약하다',
    meaning: ['слабый'],
    romanization: 'yakhada',
    partOfSpeech: 'adjective',
    difficulty: 2,
    example: {
      korean: '약한 마음',
      translation: 'Слабое сердце',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w22',
    korean: '높다',
    meaning: ['высокий'],
    romanization: 'nopda',
    partOfSpeech: 'adjective',
    difficulty: 2,
    example: {
      korean: '높이 올라가',
      translation: 'Поднимаюсь высоко',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w23',
    korean: '낮다',
    meaning: ['низкий'],
    romanization: 'natda',
    partOfSpeech: 'adjective',
    difficulty: 2,
    example: {
      korean: '낮은 곳에서',
      translation: 'В низком месте',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w24',
    korean: '빨간',
    meaning: ['красный'],
    romanization: 'ppalgan',
    partOfSpeech: 'adjective',
    difficulty: 2,
    example: {
      korean: '빨간 입술',
      translation: 'Красные губы',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w25',
    korean: '파란',
    meaning: ['синий', 'голубой'],
    romanization: 'paran',
    partOfSpeech: 'adjective',
    difficulty: 2,
    example: {
      korean: '파란 하늘',
      translation: 'Синее небо',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w26',
    korean: '노란',
    meaning: ['жёлтый'],
    romanization: 'noran',
    partOfSpeech: 'adjective',
    difficulty: 2,
    example: {
      korean: '노란 꽃',
      translation: 'Жёлтый цветок',
      songId: 'blackpink-hylt'
    }
  },
  {
    id: 'w27',
    korean: '검은',
    meaning: ['чёрный'],
    romanization: 'geomeun',
    partOfSpeech: 'adjective',
    difficulty: 2,
    example: {
      korean: '검은 머리',
      translation: 'Чёрные волосы',
      songId: 'blackpink-hylt'
    }
  },

  // IU - Blueming (10 слов)
  {
    id: 'w28',
    korean: '꽃',
    meaning: ['цветок'],
    romanization: 'kkot',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '예쁜 꽃',
      translation: 'Красивый цветок',
      songId: 'iu-blueming'
    }
  },
  {
    id: 'w29',
    korean: '나무',
    meaning: ['дерево'],
    romanization: 'namu',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '큰 나무 아래',
      translation: 'Под большим деревом',
      songId: 'iu-blueming'
    }
  },
  {
    id: 'w30',
    korean: '물',
    meaning: ['вода'],
    romanization: 'mul',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '물이 흐른다',
      translation: 'Вода течёт',
      songId: 'iu-blueming'
    }
  },
  {
    id: 'w31',
    korean: '불',
    meaning: ['огонь', 'свет'],
    romanization: 'bul',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '불을 켜요',
      translation: 'Включаю свет',
      songId: 'iu-blueming'
    }
  },
  {
    id: 'w32',
    korean: '바람',
    meaning: ['ветер'],
    romanization: 'baram',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '바람이 불어요',
      translation: 'Дует ветер',
      songId: 'iu-blueming'
    }
  },
  {
    id: 'w33',
    korean: '하늘',
    meaning: ['небо'],
    romanization: 'haneul',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '푸른 하늘',
      translation: 'Голубое небо',
      songId: 'iu-blueming'
    }
  },
  {
    id: 'w34',
    korean: '땅',
    meaning: ['земля'],
    romanization: 'ttang',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '땅 위에',
      translation: 'На земле',
      songId: 'iu-blueming'
    }
  },
  {
    id: 'w35',
    korean: '별',
    meaning: ['звезда'],
    romanization: 'byeol',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '별이 빛나요',
      translation: 'Звезда сияет',
      songId: 'iu-blueming'
    }
  },
  {
    id: 'w36',
    korean: '달',
    meaning: ['луна', 'месяц'],
    romanization: 'dal',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '달빛 아래',
      translation: 'Под лунным светом',
      songId: 'iu-blueming'
    }
  },
  {
    id: 'w37',
    korean: '구름',
    meaning: ['облако'],
    romanization: 'gureum',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '하얀 구름',
      translation: 'Белое облако',
      songId: 'iu-blueming'
    }
  },

  // NewJeans - Hype Boy (12 слов)
  {
    id: 'w38',
    korean: '손',
    meaning: ['рука', 'кисть'],
    romanization: 'son',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '손을 잡아',
      translation: 'Держу за руку',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w39',
    korean: '발',
    meaning: ['нога', 'стопа'],
    romanization: 'bal',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '발이 아파요',
      translation: 'Болит нога',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w40',
    korean: '머리',
    meaning: ['голова', 'волосы'],
    romanization: 'meori',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '머리가 길어요',
      translation: 'Волосы длинные',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w41',
    korean: '얼굴',
    meaning: ['лицо'],
    romanization: 'eolgul',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '예쁜 얼굴',
      translation: 'Красивое лицо',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w42',
    korean: '눈',
    meaning: ['глаза', 'снег'],
    romanization: 'nun',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '눈이 커요',
      translation: 'Большие глаза',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w43',
    korean: '코',
    meaning: ['нос'],
    romanization: 'ko',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '작은 코',
      translation: 'Маленький нос',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w44',
    korean: '입',
    meaning: ['рот', 'губы'],
    romanization: 'ip',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '입을 열어',
      translation: 'Открой рот',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w45',
    korean: '귀',
    meaning: ['ухо'],
    romanization: 'gwi',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '귀에 들린다',
      translation: 'Слышу',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w46',
    korean: '몸',
    meaning: ['тело'],
    romanization: 'mom',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '몸이 좋아요',
      translation: 'Хорошее тело',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w47',
    korean: '마음',
    meaning: ['сердце', 'душа'],
    romanization: 'maeum',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '내 마음',
      translation: 'Моё сердце',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w48',
    korean: '생각',
    meaning: ['мысль', 'думать'],
    romanization: 'saenggak',
    partOfSpeech: 'noun',
    difficulty: 2,
    example: {
      korean: '좋은 생각',
      translation: 'Хорошая мысль',
      songId: 'newjeans-hypeboy'
    }
  },
  {
    id: 'w49',
    korean: '꿈',
    meaning: ['мечта', 'сон'],
    romanization: 'kkum',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '꿈을 꿔요',
      translation: 'Мечтаю',
      songId: 'newjeans-hypeboy'
    }
  },

  // Stray Kids - God's Menu (14 слов)
  {
    id: 'w50',
    korean: '아침',
    meaning: ['утро', 'завтрак'],
    romanization: 'achim',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '아침에 일어나요',
      translation: 'Встаю утром',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w51',
    korean: '점심',
    meaning: ['обед', 'полдень'],
    romanization: 'jeomsim',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '점심 먹었어요?',
      translation: 'Ты обедал?',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w52',
    korean: '저녁',
    meaning: ['вечер', 'ужин'],
    romanization: 'jeonyeok',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '저녁에 만나요',
      translation: 'Встретимся вечером',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w53',
    korean: '밤',
    meaning: ['ночь'],
    romanization: 'bam',
    partOfSpeech: 'noun',
    difficulty: 1,
    example: {
      korean: '밤이 깊어요',
      translation: 'Ночь глубока',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w54',
    korean: '오늘',
    meaning: ['сегодня'],
    romanization: 'oneul',
    partOfSpeech: 'adverb',
    difficulty: 1,
    example: {
      korean: '오늘 뭐 해요?',
      translation: 'Что делаешь сегодня?',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w55',
    korean: '내일',
    meaning: ['завтра'],
    romanization: 'naeil',
    partOfSpeech: 'adverb',
    difficulty: 1,
    example: {
      korean: '내일 봐요',
      translation: 'До завтра',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w56',
    korean: '어제',
    meaning: ['вчера'],
    romanization: 'eoje',
    partOfSpeech: 'adverb',
    difficulty: 1,
    example: {
      korean: '어제 뭐 했어요?',
      translation: 'Что делал вчера?',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w57',
    korean: '주',
    meaning: ['неделя'],
    romanization: 'ju',
    partOfSpeech: 'noun',
    difficulty: 2,
    example: {
      korean: '이번 주',
      translation: 'Эта неделя',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w58',
    korean: '월',
    meaning: ['месяц'],
    romanization: 'wol',
    partOfSpeech: 'noun',
    difficulty: 2,
    example: {
      korean: '다음 월',
      translation: 'Следующий месяц',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w59',
    korean: '년',
    meaning: ['год'],
    romanization: 'nyeon',
    partOfSpeech: 'noun',
    difficulty: 2,
    example: {
      korean: '새해',
      translation: 'Новый год',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w60',
    korean: '때',
    meaning: ['время', 'момент'],
    romanization: 'ttae',
    partOfSpeech: 'noun',
    difficulty: 2,
    example: {
      korean: '그때',
      translation: 'В то время',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w61',
    korean: '지금',
    meaning: ['сейчас'],
    romanization: 'jigeum',
    partOfSpeech: 'adverb',
    difficulty: 1,
    example: {
      korean: '지금 시작해',
      translation: 'Начинаем сейчас',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w62',
    korean: '처음',
    meaning: ['первый раз', 'начало'],
    romanization: 'cheoeum',
    partOfSpeech: 'noun',
    difficulty: 2,
    example: {
      korean: '처음부터',
      translation: 'С самого начала',
      songId: 'straykids-godsmenu'
    }
  },
  {
    id: 'w63',
    korean: '마지막',
    meaning: ['последний', 'конец'],
    romanization: 'majimak',
    partOfSpeech: 'noun',
    difficulty: 2,
    example: {
      korean: '마지막까지',
      translation: 'До самого конца',
      songId: 'straykids-godsmenu'
    }
  },
];

// Функция для получения слов по ID песни
export const getWordsBySongId = (songId: string): Word[] => {
  return words.filter(word => word.example.songId === songId);
};

// Функция для получения слова по ID
export const getWordById = (wordId: string): Word | undefined => {
  return words.find(word => word.id === wordId);
};

// Функция для получения случайных слов для теста
export const getRandomWords = (count: number, excludeIds: string[] = []): Word[] => {
  const available = words.filter(w => !excludeIds.includes(w.id));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
