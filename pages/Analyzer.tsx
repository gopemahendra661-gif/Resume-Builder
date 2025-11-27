import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { ScoreCard } from '../components/ScoreCard';
import { analyzeResume } from '../utils/scoring';
import { ResumeScore } from '../types';
import { RefreshCw, Download, FileText, Briefcase } from 'lucide-react';

export const Analyzer: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState<ResumeScore | null>(null);

  const handleAnalysis = () => {
    if (!resumeText) return;
    const result = analyzeResume(resumeText, jobDescription);
    setScore(result);
  };

  const handleReset = () => {
    setResumeText('');
    setFileName('');
    setScore(null);
    setJobDescription('');
  };

  const downloadReport = () => {
    const element = document.getElementById('analysis-report');
    if (!element) return;
    const opt = {
      margin: 0.5,
      filename: `Report_${fileName || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resume Analyzer</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Get instant ATS feedback and actionable tips to improve your resume.
          </p>
        </div>
        {score && (
           <div className="flex gap-3">
             <button onClick={handleReset} className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
               <RefreshCw className="w-4 h-4 mr-2" />
               New Analysis
             </button>
             <button onClick={downloadReport} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
               <Download className="w-4 h-4 mr-2" />
               Export Report
             </button>
           </div>
        )}
      </div>

      {!score ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
                <FileText className="w-5 h-5 mr-2 text-primary-500" />
                1. Upload Resume
              </h2>
              {resumeText ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex items-center justify-between">
                  <span className="truncate max-w-[200px] font-medium">{fileName}</span>
                  <button onClick={() => { setResumeText(''); setFileName(''); }} className="text-sm underline hover:text-green-800">Change</button>
                </div>
              ) : (
                <FileUploader onTextExtracted={(text, name) => { setResumeText(text); setFileName(name); }} />
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
                <Briefcase className="w-5 h-5 mr-2 text-primary-500" />
                2. Job Description (Optional)
              </h2>
              <textarea
                className="w-full h-40 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                placeholder="Paste the job description here to check keyword matching..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <button
              onClick={handleAnalysis}
              disabled={!resumeText}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg transition-transform active:scale-[0.98]"
            >
              Analyze Resume
            </button>
          </div>

          {/* Right: Info / Placeholder */}
          <div className="hidden lg:flex flex-col justify-center items-center text-center p-8 bg-gray-100 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-400">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <FileText size={48} className="opacity-50" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ready to optimize?</h3>
            <p className="max-w-xs">Upload your resume and paste a job description to get a comprehensive ATS score and improvement tips.</p>
          </div>
        </div>
      ) : (
        <div id="analysis-report" className="space-y-6 animate-fade-in">
          {/* Overall Score Banner */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall ATS Score</h2>
              <p className="text-primary-100 max-w-lg">
                Your resume is <span className="font-bold">{score.overall >= 80 ? 'Excellent' : score.overall >= 60 ? 'Good' : 'Needs Improvement'}</span>. 
                Follow the suggestions below to increase your interview chances.
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/30">
              <span className="text-4xl md:text-5xl font-bold">{score.overall}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScoreCard 
              label="Keyword Match" 
              score={score.keywordMatch} 
              description={jobDescription ? "Relevance to Job Description" : "Usage of strong action verbs"}
              type={score.keywordMatch < 60 ? 'danger' : 'success'}
            />
            <ScoreCard 
              label="Skills Found" 
              score={score.skillsScore} 
              description="Technical & Soft skills detection"
              type="info"
              details={[`Found ${score.foundSkills.length} skills`, ...score.foundSkills.slice(0, 5).map(s => `✓ ${s}`)]}
            />
            <ScoreCard 
              label="Formatting & Layout" 
              score={score.formatting} 
              description="Structure, sections, and readability"
              details={score.formattingIssues}
              type={score.formattingIssues.length > 0 ? 'warning' : 'success'}
            />
            <ScoreCard 
              label="Grammar & Style" 
              score={score.structure} 
              description="Voice, sentence length, and repetition"
              details={score.structureIssues}
              type={score.structureIssues.length > 0 ? 'warning' : 'success'}
            />
          </div>

          {score.missingSkills.length > 0 && jobDescription && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {score.missingSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500">Consider adding these keywords to your resume contextually.</p>
            </div>
          )}
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
             <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Extracted Text Preview</h3>
             <div className="h-48 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-xs font-mono text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
               {resumeText}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
