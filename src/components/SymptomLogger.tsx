
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { SymptomEntry } from '@/pages/Index';

interface SymptomLoggerProps {
  date: Date;
  entry?: SymptomEntry;
  onUpdateEntry: (entry: SymptomEntry) => void;
}

const symptomTypes = [
  { key: 'fever', emoji: '🤒', label: 'Fever', color: 'from-red-400 to-red-600' },
  { key: 'headache', emoji: '🤕', label: 'Headache', color: 'from-orange-400 to-orange-600' },
  { key: 'fatigue', emoji: '😴', label: 'Fatigue', color: 'from-blue-400 to-blue-600' },
  { key: 'nausea', emoji: '🤢', label: 'Nausea', color: 'from-green-400 to-green-600' },
  { key: 'cough', emoji: '😷', label: 'Cough', color: 'from-purple-400 to-purple-600' },
  { key: 'sorethroat', emoji: '🫗', label: 'Sore Throat', color: 'from-pink-400 to-pink-600' },
] as const;

const intensityLevels = [
  { value: 0, label: 'None', size: 'text-2xl', opacity: 'opacity-30' },
  { value: 1, label: 'Mild', size: 'text-3xl', opacity: 'opacity-60' },
  { value: 2, label: 'Moderate', size: 'text-4xl', opacity: 'opacity-80' },
  { value: 3, label: 'Severe', size: 'text-5xl', opacity: 'opacity-100' },
];

const SymptomLogger: React.FC<SymptomLoggerProps> = ({ date, entry, onUpdateEntry }) => {
  const [notes, setNotes] = useState(entry?.notes || '');
  const [symptoms, setSymptoms] = useState(
    entry?.symptoms || {
      fever: 0,
      headache: 0,
      fatigue: 0,
      nausea: 0,
      cough: 0,
      sorethroat: 0,
    }
  );

  const updateSymptom = (symptomKey: string, intensity: number) => {
    const updatedSymptoms = { ...symptoms, [symptomKey]: intensity };
    setSymptoms(updatedSymptoms);
    
    const updatedEntry: SymptomEntry = {
      id: entry?.id || `${format(date, 'yyyy-MM-dd')}-${Date.now()}`,
      date: format(date, 'yyyy-MM-dd'),
      symptoms: updatedSymptoms,
      mood: entry?.mood || null,
      notes,
      timestamp: Date.now(),
    };
    
    onUpdateEntry(updatedEntry);
  };

  const updateNotes = (newNotes: string) => {
    setNotes(newNotes);
    
    const updatedEntry: SymptomEntry = {
      id: entry?.id || `${format(date, 'yyyy-MM-dd')}-${Date.now()}`,
      date: format(date, 'yyyy-MM-dd'),
      symptoms,
      mood: entry?.mood || null,
      notes: newNotes,
      timestamp: Date.now(),
    };
    
    onUpdateEntry(updatedEntry);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            How are you feeling?
          </h2>
          
          <div className="space-y-6">
            {symptomTypes.map((symptom) => (
              <div key={symptom.key} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{symptom.emoji}</span>
                  <span className="font-medium text-gray-700">{symptom.label}</span>
                </div>
                
                <div className="flex gap-2 justify-center">
                  {intensityLevels.map((level) => (
                    <Button
                      key={level.value}
                      variant="ghost"
                      size="sm"
                      onClick={() => updateSymptom(symptom.key, level.value)}
                      className={`flex flex-col items-center p-3 h-auto transition-all duration-200 hover:scale-105 ${
                        symptoms[symptom.key as keyof typeof symptoms] === level.value
                          ? `bg-gradient-to-r ${symptom.color} text-white shadow-lg`
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className={`${level.size} ${
                        symptoms[symptom.key as keyof typeof symptoms] === level.value 
                          ? 'opacity-100' 
                          : level.opacity
                      }`}>
                        {symptom.emoji}
                      </span>
                      <span className="text-xs mt-1">{level.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Notes Section */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Additional Notes</h3>
          <Textarea
            placeholder="How was your day? Any additional symptoms or observations..."
            value={notes}
            onChange={(e) => updateNotes(e.target.value)}
            className="min-h-[100px] border-gray-200 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>
      </Card>
    </div>
  );
};

export default SymptomLogger;
