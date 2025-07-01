
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, TrendingUp, Award } from 'lucide-react';
import SymptomLogger from '@/components/SymptomLogger';
import TrendChart from '@/components/TrendChart';
import MoodTracker from '@/components/MoodTracker';
import StreakCounter from '@/components/StreakCounter';
import ExportData from '@/components/ExportData';
import { format, startOfWeek, addDays, subDays, isToday } from 'date-fns';

export interface SymptomEntry {
  id: string;
  date: string;
  symptoms: {
    fever: number;
    headache: number;
    fatigue: number;
    nausea: number;
    cough: number;
    sorethroat: number;
  };
  mood: 'happy' | 'neutral' | 'sad' | null;
  notes: string;
  timestamp: number;
}

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'log' | 'trends' | 'export'>('log');
  const [touchStart, setTouchStart] = useState<number>(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('symptom-journal-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('symptom-journal-entries', JSON.stringify(entries));
  }, [entries]);

  const getTodayEntry = () => {
    const today = format(currentDate, 'yyyy-MM-dd');
    return entries.find(entry => entry.date === today);
  };

  const updateEntry = (updatedEntry: SymptomEntry) => {
    setEntries(prev => {
      const existingIndex = prev.findIndex(entry => entry.date === updatedEntry.date);
      if (existingIndex >= 0) {
        const newEntries = [...prev];
        newEntries[existingIndex] = updatedEntry;
        return newEntries;
      } else {
        return [...prev, updatedEntry];
      }
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left - next day
        setCurrentDate(prev => addDays(prev, 1));
      } else {
        // Swipe right - previous day
        setCurrentDate(prev => subDays(prev, 1));
      }
    }
    setTouchStart(0);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'next' ? addDays(prev, 1) : subDays(prev, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Symptom Journal
              </h1>
              <p className="text-sm text-gray-600">Track your daily wellness</p>
            </div>
            <div className="flex items-center gap-2">
              <StreakCounter entries={entries} />
            </div>
          </div>
        </div>
      </div>

      {/* Date Navigation */}
      <div 
        className="max-w-md mx-auto px-4 py-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('prev')}
                className="text-purple-600 hover:bg-purple-100"
              >
                ←
              </Button>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-800">
                  {format(currentDate, 'EEEE')}
                </div>
                <div className="text-sm text-gray-600">
                  {format(currentDate, 'MMM d, yyyy')}
                </div>
                {isToday(currentDate) && (
                  <div className="text-xs text-purple-600 font-medium">Today</div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('next')}
                className="text-purple-600 hover:bg-purple-100"
                disabled={isToday(currentDate)}
              >
                →
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-1 border border-white/20">
          <Button
            variant={activeTab === 'log' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('log')}
            className={`flex-1 rounded-full ${
              activeTab === 'log' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            📝 Log
          </Button>
          <Button
            variant={activeTab === 'trends' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('trends')}
            className={`flex-1 rounded-full ${
              activeTab === 'trends' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Trends
          </Button>
          <Button
            variant={activeTab === 'export' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('export')}
            className={`flex-1 rounded-full ${
              activeTab === 'export' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 pb-8">
        {activeTab === 'log' && (
          <div className="space-y-4">
            <SymptomLogger 
              date={currentDate}
              entry={getTodayEntry()}
              onUpdateEntry={updateEntry}
            />
            <MoodTracker 
              date={currentDate}
              entry={getTodayEntry()}
              onUpdateEntry={updateEntry}
            />
          </div>
        )}
        
        {activeTab === 'trends' && (
          <TrendChart entries={entries} />
        )}
        
        {activeTab === 'export' && (
          <ExportData entries={entries} />
        )}
      </div>

      {/* Quick Log Floating Button */}
      {activeTab === 'log' && (
        <div className="fixed bottom-6 right-6">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => {
              // Quick log with no symptoms (feeling good)
              const quickEntry: SymptomEntry = {
                id: `${format(currentDate, 'yyyy-MM-dd')}-${Date.now()}`,
                date: format(currentDate, 'yyyy-MM-dd'),
                symptoms: {
                  fever: 0,
                  headache: 0,
                  fatigue: 0,
                  nausea: 0,
                  cough: 0,
                  sorethroat: 0,
                },
                mood: 'happy',
                notes: 'Feeling good today! 🌟',
                timestamp: Date.now(),
              };
              updateEntry(quickEntry);
            }}
          >
            ✨
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
