import React from 'react';
import { SegmentType } from '../types';
import { IconBolt, IconCube, IconChartBar } from './Icon';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: SegmentType;
  onTabChange: (tab: SegmentType) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    J
                </div>
                <span className="font-bold text-xl text-gray-900 hidden sm:block">
                    四川金洋投资集团
                </span>
                <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hidden md:block">
                    2024-2025 财务预估
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tabs */}
            <div className="mb-8 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => onTabChange(SegmentType.GROUP)}
                        className={`
                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                            ${activeTab === SegmentType.GROUP 
                                ? 'border-blue-500 text-blue-600' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                    >
                        <IconChartBar className="w-5 h-5" />
                        集团总览
                    </button>
                    <button
                        onClick={() => onTabChange(SegmentType.POWER)}
                        className={`
                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                            ${activeTab === SegmentType.POWER 
                                ? 'border-blue-500 text-blue-600' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                    >
                        <IconBolt className="w-5 h-5" />
                        电力板块
                    </button>
                    <button
                        onClick={() => onTabChange(SegmentType.SILICON)}
                        className={`
                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                            ${activeTab === SegmentType.SILICON 
                                ? 'border-orange-500 text-orange-600' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                    >
                         <IconCube className="w-5 h-5" />
                        硅业板块
                    </button>
                </nav>
            </div>

            {/* View Content */}
            {children}
        </div>
      </main>

       <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-400">
            数据来源：基于集团公开资料及行业分析报告推算 (2024-2025预测值)
          </p>
        </div>
      </footer>
    </div>
  );
};