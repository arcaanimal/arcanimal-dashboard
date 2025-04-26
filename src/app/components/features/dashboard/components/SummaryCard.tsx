import React from 'react';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Define valid color types
type ColorType = 'indigo' | 'green' | 'blue' | 'yellow';

// Define valid trend types
type TrendType = 'up' | 'down';

// Define the structure of icon background colors with gradients
const iconBgColors: Record<ColorType, string> = {
  indigo: 'bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600',
  green: 'bg-gradient-to-br from-green-100 to-green-200 text-green-600',
  blue: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600',
  yellow: 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600',
};

// Define the structure of trend colors
const trendColors: Record<TrendType, string> = {
  up: 'text-green-500',
  down: 'text-red-500',
};

// Define props for SummaryCard
interface SummaryCardProps {
  title: string;
  count: number | undefined | string;
  icon: IconType; // Use IconType from react-icons for icon components
  color: ColorType;
  trend: TrendType;
  trendValue: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, icon: Icon, color, trend, trendValue }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center">
        <div
          className={cn(
            'p-4 rounded-full mr-4 shadow-md transition-transform duration-300 hover:scale-105',
            iconBgColors[color]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-gray-500 font-semibold text-sm uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-extrabold text-gray-800">{count}</h3>
          <p className={cn('text-sm flex items-center font-medium', trendColors[trend])}>
            {trend === 'up' ? (
              <FaArrowUp className="mr-1 w-4 h-4" />
            ) : (
              <FaArrowDown className="mr-1 w-4 h-4" />
            )}
            {trendValue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;