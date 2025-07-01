
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { SymptomEntry } from '@/pages/Index';

interface MoodTrackerProps {
  date: Date;
  entry?: SymptomEntry;
  onUpdateEntry: (entry: SymptomEntry) => void;
}

const moods = [
  { value: 'sad', emoji: '😢', label: 'Sad', color: 'from-blue-400 to-blue-600' },
  { value: 'neutral', emoji: '😐', label: 'Neutral', color: 'from-gray-400 to-gray-600' },
  { value: 'happy', emoji: '😊', label: 'Happy', color: 'from-green-400 to-green-600' },
] as const;

const MoodTracker: React.FC<MoodTrackerProps> = ({ date, entry, onUpdateEntry }) => {
  const updateMood = (mood: 'happy' | 'neutral' | 'sad') => {
    const updatedEntry: SymptomEntry = {
      id: entry?.id || `${format(date, 'yyyy-MM-dd')}-${Date.now()}`,
      date: format(date, 'yyyy-MM-dd'),
      symptoms: entry?.symptoms || {
        fever: 0,
        headache: 0,
        fatigue: 0,
        nausea: 0,
        cough: 0,
        sorethroat: 0,
      },
      mood,
      notes: entry?.notes || '',
      timestamp: Date.now(),
    };
    
    onUpdateEntry(updatedEntry);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          How's your mood?
        </h2>
        
        <div className="flex gap-4 justify-center">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              variant="ghost"
              size="lg"
              onClick={() => updateMood(mood.value)}
              className={`flex flex-col items-center p-6 h-auto transition-all duration-200 hover:scale-105 ${
                entry?.mood === mood.value
                  ? `bg-gradient-to-r ${mood.color} text-white shadow-lg`
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-4xl mb-2">{mood.emoji}</span>
              <span className="text-sm font-medium">{mood.label}</span>
            </Button>
          ))}
        </div>
        
        {entry?.mood && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              You're feeling {entry.mood} today
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoodTracker;
