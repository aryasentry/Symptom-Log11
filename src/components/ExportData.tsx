
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Database } from 'lucide-react';
import { format } from 'date-fns';
import { SymptomEntry } from '@/pages/Index';
import { toast } from 'sonner';

interface ExportDataProps {
  entries: SymptomEntry[];
}

const ExportData: React.FC<ExportDataProps> = ({ entries }) => {
  const exportAsCSV = () => {
    if (entries.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = [
      'Date',
      'Fever',
      'Headache',
      'Fatigue',
      'Nausea',
      'Cough',
      'Sore Throat',
      'Mood',
      'Notes',
      'Timestamp'
    ];

    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.date,
        entry.symptoms.fever,
        entry.symptoms.headache,
        entry.symptoms.fatigue,
        entry.symptoms.nausea,
        entry.symptoms.cough,
        entry.symptoms.sorethroat,
        entry.mood || '',
        `"${entry.notes.replace(/"/g, '""')}"`, // Escape quotes
        new Date(entry.timestamp).toISOString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `symptom-journal-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('CSV exported successfully!');
  };

  const exportAsJSON = () => {
    if (entries.length === 0) {
      toast.error('No data to export');
      return;
    }

    const jsonContent = JSON.stringify({
      exportDate: new Date().toISOString(),
      totalEntries: entries.length,
      entries: entries
    }, null, 2);

    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `symptom-journal-${format(new Date(), 'yyyy-MM-dd')}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('JSON exported successfully!');
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all symptom data? This action cannot be undone.')) {
      localStorage.removeItem('symptom-journal-entries');
      window.location.reload();
      toast.success('All data cleared successfully!');
    }
  };

  const getTotalSymptomDays = () => {
    return entries.filter(entry => 
      Object.values(entry.symptoms).some(intensity => intensity > 0)
    ).length;
  };

  const getSymptomFrequency = () => {
    const frequency: Record<string, number> = {
      fever: 0,
      headache: 0,
      fatigue: 0,
      nausea: 0,
      cough: 0,
      sorethroat: 0,
    };

    entries.forEach(entry => {
      Object.entries(entry.symptoms).forEach(([symptom, intensity]) => {
        if (intensity > 0) {
          frequency[symptom]++;
        }
      });
    });

    return frequency;
  };

  const symptomFreq = getSymptomFrequency();
  const mostCommonSymptom = Object.entries(symptomFreq).reduce((a, b) => 
    symptomFreq[a[0]] > symptomFreq[b[0]] ? a : b, ['none', 0]
  );

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Health Summary
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{entries.length}</div>
              <div className="text-sm text-blue-700">Total Entries</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {entries.length - getTotalSymptomDays()}
              </div>
              <div className="text-sm text-green-700">Symptom-Free Days</div>
            </div>
          </div>

          {mostCommonSymptom[1] > 0 && (
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="text-lg font-semibold text-purple-600">
                Most Common: {mostCommonSymptom[0].charAt(0).toUpperCase() + mostCommonSymptom[0].slice(1)}
              </div>
              <div className="text-sm text-purple-700">
                Occurred {mostCommonSymptom[1]} time{mostCommonSymptom[1] !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Export Options */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Export Your Data</h3>
          <div className="space-y-3">
            <Button
              onClick={exportAsCSV}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
              disabled={entries.length === 0}
            >
              <FileText className="w-4 h-4 mr-2" />
              Export as CSV (Excel Compatible)
            </Button>
            
            <Button
              onClick={exportAsJSON}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              disabled={entries.length === 0}
            >
              <Database className="w-4 h-4 mr-2" />
              Export as JSON (Developer Format)
            </Button>
          </div>
          
          {entries.length === 0 && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Start logging symptoms to enable export
            </p>
          )}
        </div>
      </Card>

      {/* Data Management */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Data Management</h3>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Data Storage</h4>
              <p className="text-sm text-gray-600">
                Your symptom data is stored locally on your device. It's not shared with any servers 
                and remains completely private to you.
              </p>
            </div>
            
            <Button
              onClick={clearAllData}
              variant="destructive"
              className="w-full"
              disabled={entries.length === 0}
            >
              Clear All Data
            </Button>
            
            {entries.length === 0 && (
              <p className="text-sm text-gray-500 text-center">
                No data to clear
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExportData;
