import React from 'react';
import { FaPaw, FaHome, FaHandHoldingUsd, FaUserPlus } from 'react-icons/fa';

// Define valid activity types
type ActivityType = 'adoption' | 'shelter' | 'donation' | 'volunteer';

// Define the structure of an activity icon
interface ActivityIcon {
  icon: React.ComponentType; // React component for the icon
  bg: string; // Tailwind classes for background and text color
}

// Define the activityIcons object with types and gradients
const activityIcons: Record<ActivityType, ActivityIcon> = {
  adoption: {
    icon: FaPaw,
    bg: 'bg-gradient-to-br from-green-100 to-green-200 text-green-600',
  },
  shelter: {
    icon: FaHome,
    bg: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600',
  },
  donation: {
    icon: FaHandHoldingUsd,
    bg: 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600',
  },
  volunteer: {
    icon: FaUserPlus,
    bg: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600',
  },
};

// Define the structure of an activity
interface Activity {
  type: ActivityType;
  title: string;
  description: string;
  time: string;
}

// Define props for RecentActivityItem
interface RecentActivityItemProps {
  type: ActivityType;
  title: string;
  description: string;
  time: string;
}

// Define props for RecentActivity
interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivityItem: React.FC<RecentActivityItemProps> = ({ type, title, description, time }) => {
  const { icon: Icon, bg } = activityIcons[type] || { icon: FaPaw, bg: 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600' }; // Fallback if type is invalid

  return (
    <div
      className="flex items-start p-4 bg-white rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md mx-2 my-1 cursor-pointer"
    >
      <div
        className={`p-3 rounded-full mr-4 shadow-md transition-transform duration-300 hover:scale-105 ${bg}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 p-6 overflow-hidden">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Atividade Recente</h2>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <RecentActivityItem key={index} {...activity} />
        ))}
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
        <span className="text-gray-700 text-lg font-semibold">Em breve...</span>
      </div>
    </div>
  );
};

export default RecentActivity;