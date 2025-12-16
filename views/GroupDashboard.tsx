import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SummaryCard } from '../components/SummaryCard';
import { DataTable } from '../components/DataTable';
import { MetricData } from '../types';

const METRICS: MetricData[] = [
  { label: '集团总营收', value: '7.89', unit: '亿元', trend: 'up', change: '+5.2%', color: 'blue' },
  { label: '集团净利润', value: '2.20', unit: '亿元', trend: 'up', change: '+3.8%', color: 'green' },
  { label: '整体净利率', value: '27.9', unit: '%', trend: 'neutral', change: '-0.5%', color: 'purple' },
];

const PROFIT_DISTRIBUTION = [
  { name: '电力板块', value: 1.75, color: '#3B82F6' },
  { name: '硅业板块', value: 0.45, color: '#F59E0B' },
];

const SEGMENT_COMPARISON = [
  { name: '电力业务', revenue: 4.89, profit: 1.75, margin: '35.8%' },
  { name: '硅业业务', revenue: 3.00, profit: 0.45, margin: '15.0%' },
];

const TABLE_COLUMNS = [
  { header: '业务板块', accessor: 'name', align: 'left' as const },
  { header: '营业收入 (亿元)', accessor: 'revenue', align: 'right' as const },
  { header: '净利润 (亿元)', accessor: 'profit', align: 'right' as const },
  { header: '净利率', accessor: 'margin', align: 'right' as const },
];

export const GroupDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {METRICS.map((metric, idx) => (
          <SummaryCard key={idx} data={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart: Revenue vs Profit */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">板块业绩对比分析</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SEGMENT_COMPARISON} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ fill: '#F9FAFB' }} />
                <Legend />
                <Bar dataKey="revenue" name="营业收入" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="净利润" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Profit Contribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-2">利润贡献占比</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PROFIT_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PROFIT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
             <p className="text-sm text-gray-500">电力板块贡献了约 <span className="font-bold text-gray-900">80%</span> 的集团净利润</p>
          </div>
        </div>
      </div>

      {/* Detailed Data Table */}
      <DataTable 
        title="集团年度经营数据汇总 (2024-2025预估)" 
        columns={TABLE_COLUMNS} 
        data={SEGMENT_COMPARISON} 
      />

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
        <strong>分析总结：</strong> 集团整体财务状况健康，呈现“一主一辅”的良性结构。电力业务提供稳定的现金流和高毛利支撑；硅业业务虽然净利率相对较低，但作为营收增长的重要引擎，且消纳了内部电力，实现了集团利益最大化。
      </div>
    </div>
  );
};