import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine, Cell } from 'recharts';
import { DataTable } from '../components/DataTable';
import { SummaryCard } from '../components/SummaryCard';
import { MetricData } from '../types';

const METRICS: MetricData[] = [
  { label: '硅业总营收', value: '3.00', unit: '亿元', color: 'orange' },
  { label: '预计净利润', value: '0.45', unit: '亿元', subValue: '中性预期', color: 'orange' },
  { label: '年产能', value: '3.0', unit: '万吨', color: 'gray' },
];

const SCENARIO_DATA = [
  { name: '保守情景', price: '12,500', revenue: '2.50', cost: '2.20', profit: '0.30', margin: '12.0%' },
  { name: '中性情景', price: '13,500', revenue: '3.00', cost: '2.55', profit: '0.45', margin: '15.0%' },
  { name: '乐观情景', price: '14,500', revenue: '3.50', cost: '2.90', profit: '0.60', margin: '17.1%' },
];

const COST_COMP_DATA = [
  { name: '行业平均', cost: 12000, type: 'market' },
  { name: '金洋硅业', cost: 10500, type: 'internal' },
];

const TABLE_COLUMNS = [
  { header: '市场情景', accessor: 'name' },
  { header: '假设均价 (元/吨)', accessor: 'price', align: 'right' as const },
  { header: '预计营收 (亿元)', accessor: 'revenue', align: 'right' as const },
  { header: '预计净利 (亿元)', accessor: 'profit', align: 'right' as const },
  { header: '净利率', accessor: 'margin', align: 'right' as const },
];

export const SiliconView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {METRICS.map((metric, idx) => (
          <SummaryCard key={idx} data={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profit Sensitivity Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">利润敏感性分析 (亿元)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SCENARIO_DATA}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area type="monotone" dataKey="profit" stroke="#F59E0B" fillOpacity={1} fill="url(#colorProfit)" name="净利润" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Advantage Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">吨生产成本优势对比 (元/吨)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COST_COMP_DATA} barSize={60}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 14000]} />
                <Tooltip />
                <ReferenceLine y={12000} stroke="red" strokeDasharray="3 3" label="行业盈亏线" />
                <Bar dataKey="cost" name="完全成本">
                   {COST_COMP_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === 'market' ? '#94A3B8' : '#10B981'} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
           <p className="text-xs text-center text-gray-500 mt-2">由于拥有自备电站，金洋硅业的电力成本显著低于网电价格，形成约 1,500元/吨 的成本护城河。</p>
        </div>
      </div>

      {/* Sensitivity Table */}
      <DataTable 
        title="不同市场价格情景下的业绩测算" 
        columns={TABLE_COLUMNS} 
        data={SCENARIO_DATA} 
      />
    </div>
  );
};