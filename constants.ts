
import { AppTracker } from './types';

export const MOCK_APPS: AppTracker[] = [
  {
    id: '1',
    name: 'God of War Ragnarök',
    executable: 'GoWR.exe',
    icon: '⚔️',
    coverImage: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
    color: '#3b82f6',
    totalMinutesToday: 185,
    totalMinutesWeek: 1240,
    goalMinutes: 120,
    developer: 'Santa Monica Studio'
  },
  {
    id: '2',
    name: 'Elden Ring',
    executable: 'eldenring.exe',
    icon: '💍',
    coverImage: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=1974&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?q=80&w=2070&auto=format&fit=crop',
    color: '#fbbf24',
    totalMinutesToday: 320,
    totalMinutesWeek: 2100,
    goalMinutes: 240,
    developer: 'FromSoftware'
  },
  {
    id: '3',
    name: 'Cyberpunk 2077',
    executable: 'Cyberpunk2077.exe',
    icon: '⚡',
    coverImage: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=2070&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    color: '#facc15',
    totalMinutesToday: 45,
    totalMinutesWeek: 850,
    developer: 'CD PROJEKT RED'
  },
  {
    id: '4',
    name: 'Red Dead Redemption 2',
    executable: 'RDR2.exe',
    icon: '🤠',
    coverImage: 'https://images.unsplash.com/photo-1533923156502-be31530547c4?q=80&w=1974&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2168&auto=format&fit=crop',
    color: '#dc2626',
    totalMinutesToday: 120,
    totalMinutesWeek: 940,
    developer: 'Rockstar Games'
  },
  {
    id: '5',
    name: 'Hades II',
    executable: 'Hades2.exe',
    icon: '🔥',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    color: '#ec4899',
    totalMinutesToday: 65,
    totalMinutesWeek: 420,
    developer: 'Supergiant Games'
  }
];

export const TIMELINE_DATA = [
  { hour: '08:00', minutes: 0 },
  { hour: '10:00', minutes: 0 },
  { hour: '12:00', minutes: 15 },
  { hour: '14:00', minutes: 45 },
  { hour: '16:00', minutes: 120 },
  { hour: '18:00', minutes: 180 },
  { hour: '20:00', minutes: 240 },
  { hour: '22:00', minutes: 210 },
  { hour: '00:00', minutes: 90 },
];
