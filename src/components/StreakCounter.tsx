
import React from 'react';
import { Card } from '@/components/ui/card';
import { Award, Flame } from 'lucide-react';
import { format, subDays, parseISO, isAfter, isBefore } from 'date-fns';
import { SymptomEntry } from '@/pages/Index';

interface StreakCounterProps {
  entries: SymptomEntry[];
}

const StreakCounter: React.FC<StreakCounterProps> = ({ entries }) => {
  const calculateStreak = () => {
    const today = new Date();
    let streak = 0;
    let currentDate = today;
    
    // Sort entries by date (most recent first)
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Check each day backwards from today
    for (let i = 0; i < 30; i++) { // Check up to 30 days back
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const dayEntry = sortedEntries.find(entry => entry.date === dateStr);
      
      if (dayEntry) {
        // Check if it's a "good" day (low or no symptoms)
        const totalSymptoms = Object.values(dayEntry.symptoms).reduce((sum, intensity) => sum + intensity, 0);
        const isGoodDay = totalSymptoms <= 2; // Mild symptoms or less
        
        if (isGoodDay) {
          streak++;
        } else {
          break; // Streak broken
        }
      } else {
        // No entry for this day - assume neutral/good day if it's not today
        if (format(currentDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
          break; // No entry for today breaks the streak
        }
        // For past days with no entry, we can be lenient and continue the streak
      }
      
      currentDate = subDays(currentDate, 1);
    }
    
    return streak;
  };

  const currentStreak = calculateStreak();

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your wellness journey!";
    if (streak === 1) return "Great start!";
    if (streak < 7) return "Building momentum!";
    if (streak < 14) return "You're on a roll!";
    if (streak < 30) return "Fantastic streak!";
    return "Incredible dedication!";
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 7) return <Flame className="w-5 h-5 text-orange-500" />;
    return <Award className="w-5 h-5 text-purple-500" />;
  };

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-3 py-2">
      {getStreakIcon(currentStreak)}
      <div className="text-center">
        <div className="text-lg font-bold text-gray-800">{currentStreak}</div>
        <div className="text-xs text-gray-600">day streak</div>
      </div>
    </div>
  );
};

export default StreakCounter;
