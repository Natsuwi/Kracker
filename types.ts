
import React from 'react';

export interface AppTracker {
  id: string;
  name: string;
  executable: string;
  icon: string;
  coverImage: string;
  bannerImage: string;
  color: string;
  totalMinutesToday: number;
  totalMinutesWeek: number;
  goalMinutes?: number;
  developer?: string;
}

export interface Session {
  id: string;
  appId: string;
  startTime: Date;
  endTime: Date;
  durationMs: number;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: React.ReactNode;
}

export type ViewType = 'dashboard' | 'apps' | 'insights' | 'detail';
