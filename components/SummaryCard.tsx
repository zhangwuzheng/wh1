import React from 'react';
import { MetricData } from '../types';
import { IconArrowUp } from './Icon';

interface SummaryCardProps {
  data: MetricData;
}

const getColorClass = (color?: string) => {
  switch(color) {
    case 'blue': return 'text-blue-600 border-blue-600';
    case 'green': return 'text-green-600 border-green-600';
    case 'orange': return 'text-orange-600 border-orange-600';
    case 'purple': return 'text-purple-600 border-purple-600';
    default: return 'text-gray-900 border-gray-300';
  }
};

export const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">{data.label}</h3>
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${getColorClass(data.color).split(' ')[0]}`}>
            {data.value}
          </span>
          {data.unit && <span className="text-sm text-gray-500 font-medium">{data.unit}</span>}
        </div>
        {data.subValue && <p className="text-xs text-gray-400 mt-1">{data.subValue}</p>}
      </div>
      
      {data.change && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`flex items-center font-medium ${data.trend === 'down' ? 'text-red-500' : 'text-green-500'}`}>
             {data.trend !== 'neutral' && <IconArrowUp className={`w-4 h-4 mr-1 ${data.trend === 'down' ? 'rotate-180' : ''}`} />}
             {data.change}
          </span>
          <span className="text-gray-400 ml-2 text-xs">较上年</span>
        </div>
      )}
    </div>
  );
};