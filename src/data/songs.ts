import { Song } from '@/types';

// Коллекция песен K-Pop с TOPIK 1 словами
export const songs: Song[] = [
  {
    id: 'bts-dynamite',
    title: 'Dynamite',
    artist: 'BTS',
    albumCover: 'https://tse4.mm.bing.net/th/id/OIP.hqS6R1cG6cLPR0kJqJXu3AHaHa?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
    youtubeId: 'gdZLi9oWNZg',
    words: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w10', 'w11', 'w12', 'w13', 'w14', 'w15'],
    difficulty: 'beginner',
    colorTheme: '#9333ea',
    gradientFrom: '#9333ea',
    gradientTo: '#4f46e5'
  },
  {
    id: 'blackpink-hylt',
    title: 'How You Like That',
    artist: 'BLACKPINK',
    albumCover: 'https://tse2.mm.bing.net/th/id/OIP.bYEtGBcRDfPYDp0lMzKMrQHaHa?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
    youtubeId: 'ioNng23DkIM',
    words: ['w16', 'w17', 'w18', 'w19', 'w20', 'w21', 'w22', 'w23', 'w24', 'w25', 'w26', 'w27'],
    difficulty: 'beginner',
    colorTheme: '#ec4899',
    gradientFrom: '#ec4899',
    gradientTo: '#f43f5e'
  },
  {
    id: 'iu-blueming',
    title: 'Blueming',
    artist: 'IU',
    albumCover: 'https://tse1.mm.bing.net/th/id/OIP.06z1SZ8lXq3P4FILp0pucwHaHa?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
    youtubeId: 'D1PvIWdJ8xo',
    words: ['w28', 'w29', 'w30', 'w31', 'w32', 'w33', 'w34', 'w35', 'w36', 'w37'],
    difficulty: 'beginner',
    colorTheme: '#3b82f6',
    gradientFrom: '#3b82f6',
    gradientTo: '#06b6d4'
  },
  {
    id: 'newjeans-hypeboy',
    title: 'Hype Boy',
    artist: 'NewJeans',
    albumCover: 'https://tse2.mm.bing.net/th/id/OIP.wdDaee0DTDDkSVeK1kGGXAHaHa?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
    youtubeId: '11cta61wi0g',
    words: ['w38', 'w39', 'w40', 'w41', 'w42', 'w43', 'w44', 'w45', 'w46', 'w47', 'w48', 'w49'],
    difficulty: 'beginner',
    colorTheme: '#22c55e',
    gradientFrom: '#22c55e',
    gradientTo: '#10b981'
  },
  {
    id: 'straykids-godsmenu',
    title: "God's Menu",
    artist: 'Stray Kids',
    albumCover: 'https://tse1.mm.bing.net/th/id/OIP.xK_O6NMvUS3hv4LZ8ATqbwHaHa?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
    youtubeId: 'TQTlCHxyuu8',
    words: ['w50', 'w51', 'w52', 'w53', 'w54', 'w55', 'w56', 'w57', 'w58', 'w59', 'w60', 'w61', 'w62', 'w63'],
    difficulty: 'beginner',
    colorTheme: '#f97316',
    gradientFrom: '#f97316',
    gradientTo: '#eab308'
  }
];

// Получить песню по ID
export const getSongById = (songId: string): Song | undefined => {
  return songs.find(song => song.id === songId);
};

// Получить все песни
export const getAllSongs = (): Song[] => {
  return songs;
};
