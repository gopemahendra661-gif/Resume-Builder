import React from 'react';
import { clsx } from 'clsx';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ScoreCardProps {
  label: string;
  score: number;
  description?: string;
  details?: string[];
  type?: 'success' | 'warning' | 'danger' | 'info';
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ label, score, description, details, type = 'info' }) => {
  const getColor = (val: number) => {
    if (val >= 80) return 'text-green-600 dark:text-green-400 bg-green-500';
    if (val >= 60) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500';
    return 'text-red-600 dark:text-red-400 bg-red-500';
  };

  const getBgColor = (val: number) => {
    if (val >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (val >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{label}</h3>
          {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
        </div>
        <div className={clsx("flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg", getBgColor(score), getColor(score).split(' ')[0])}>
          {Math.round(score)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
        <div 
          className={clsx("h-2.5 rounded-full transition-all duration-1000", getColor(score).split(' ')[1])} 
          style={{ width: `${score}%` }}
        ></div>
      </div>

      {/* Details List */}
      {details && details.length > 0 ? (
        <div className="space-y-2 mt-4">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
              <span className="mr-2 mt-0.5 flex-shrink-0">
                {type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                {type === 'danger' && <XCircle className="w-4 h-4 text-red-500" />}
                {type === 'info' && <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5"></div>}
              </span>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      ) : details && (
        <div className="text-sm text-green-600 dark:text-green-400 flex items-center mt-4">
          <CheckCircle className="w-4 h-4 mr-2" />
          No issues found!
        </div>
      )}
    </div>
  );
};
