
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { format, subDays, parseISO } from 'date-fns';
import { SymptomEntry } from '@/pages/Index';

interface TrendChartProps {
  entries: SymptomEntry[];
}

const symptomColors = {
  fever: '#ef4444',
  headache: '#f97316',
  fatigue: '#3b82f6',
  nausea: '#22c55e',
  cough: '#a855f7',
  sorethroat: '#ec4899',
};

const TrendChart: React.FC<TrendChartProps> = ({ entries }) => {
  // Get last 7 days of data
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const entry = entries.find(e => e.date === dateStr);
      
      days.push({
        date: format(date, 'MMM d'),
        fullDate: dateStr,
        ...Object.keys(symptomColors).reduce((acc, symptom) => ({
          ...acc,
          [symptom]: entry?.symptoms[symptom as keyof typeof entry.symptoms] || 0,
        }), {}),
        mood: entry?.mood,
      });
    }
    return days;
  };

  const chartData = getLast7Days();
  
  const getMoodEmoji = (mood: string | null | undefined) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'neutral': return '😐';
      case 'sad': return '😢';
      default: return '❓';
    }
  };

  const getOverallWellness = (data: any) => {
    const totalSymptoms = Object.keys(symptomColors).reduce((sum, symptom) => 
      sum + (data[symptom] || 0), 0
    );
    return Math.max(0, 12 - totalSymptoms); // Scale from 0-12 (inverted)
  };

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            7-Day Symptom Trends
          </h2>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 3]}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                {Object.entries(symptomColors).map(([symptom, color]) => (
                  <Line
                    key={symptom}
                    type="monotone"
                    dataKey={symptom}
                    stroke={color}
                    strokeWidth={2}
                    dot={{ fill: color, strokeWidth: 2, r: 4 }}
                    name={symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Daily Mood Overview */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Daily Mood</h3>
          <div className="flex justify-between items-center">
            {chartData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-1">{getMoodEmoji(day.mood)}</div>
                <div className="text-xs text-gray-600">{day.date}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Wellness Score */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Wellness Overview</h3>
          <div className="space-y-3">
            {chartData.map((day, index) => {
              const wellness = getOverallWellness(day);
              const percentage = (wellness / 12) * 100;
              
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-sm font-medium w-12 text-gray-600">
                    {day.date}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        percentage >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                        percentage >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                        percentage >= 40 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                        'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 w-12">
                    {Math.round(percentage)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Legend */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <div className="p-4">
          <h4 className="text-sm font-semibold mb-3 text-gray-700">Intensity Levels</h4>
          <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
            <div>0 - None</div>
            <div>1 - Mild</div>
            <div>2 - Moderate</div>
            <div>3 - Severe</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrendChart;
