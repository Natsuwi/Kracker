
import React from 'react';
import { StatCardProps } from '../types';

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon }) => {
  return (
    <div className="bg-surface p-5 rounded-2xl flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <span className="text-secondary text-xs font-bold uppercase tracking-widest">{label}</span>
        <div className="text-secondary opacity-50">{icon}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        {trend && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${trend.startsWith('+') ? 'text-teal-400 bg-teal-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
