import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { DataTable } from '../components/DataTable';
import { SummaryCard } from '../components/SummaryCard';
import { MetricData } from '../types';

const METRICS: MetricData[] = [
  { label: '电力总营收', value: '4.89', unit: '亿元', color: 'blue' },
  { label: '电力净利润', value: '1.75', unit: '亿元', color: 'blue' },
  { label: '平均售电单价', value: '0.62', unit: '元/度', trend: 'neutral', color: 'gray' },
];

const REVENUE_SOURCE_DATA = [
  { name: '发电业务', revenue: 0.69, volume: '2.3亿 kWh', desc: '自有电站' },
  { name: '供电业务', revenue: 4.20, volume: '7.0亿 kWh', desc: '电网转供' },
];

const COST_DATA = [
  { name: '外购电成本', value: 2.10, percent: '67%' },
  { name: '折旧与运维', value: 0.65, percent: '21%' },
  { name: '人工及其他', value: 0.39, percent: '12%' },
];

const TABLE_COLUMNS = [
  { header: '业务类型', accessor: 'name', align: 'left' as const },
  { header: '业务描述', accessor: 'desc', align: 'left' as const },
  { header: '年业务量', accessor: 'volume', align: 'right' as const },
  { header: '营收贡献 (亿元)', accessor: 'revenue', align: 'right' as const },
];

export const PowerView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {METRICS.map((metric, idx) => (
          <SummaryCard key={idx} data={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">营收结构分析</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={REVENUE_SOURCE_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" name="营收 (亿元)" fill="#3B82F6" barSize={60} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Cost Structure */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">成本构成估算 (亿元)</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={COST_DATA} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="value" name="成本 (亿元)" fill="#EF4444" barSize={30} radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Operational Data Table */}
      <DataTable 
        title="电力板块运营数据明细" 
        columns={TABLE_COLUMNS} 
        data={REVENUE_SOURCE_DATA} 
      />
    </div>
  );
};