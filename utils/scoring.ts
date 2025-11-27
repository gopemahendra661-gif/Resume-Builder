import { ResumeScore } from '../types';
import { TECHNICAL_SKILLS, SOFT_SKILLS, ACTION_VERBS } from './skillDatabase';

const cleanText = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, ' ');

export const analyzeResume = (resumeText: string, jobDescription: string = ''): ResumeScore => {
  const cleanResume = cleanText(resumeText);
  const cleanJob = cleanText(jobDescription);
  
  // 1. Skills Extraction & Scoring
  const foundSkills: string[] = [];
  const missingSkills: string[] = [];
  const allSkills = [...TECHNICAL_SKILLS, ...SOFT_SKILLS];

  allSkills.forEach(skill => {
    if (cleanResume.includes(skill)) {
      foundSkills.push(skill);
    }
  });

  // If JD is provided, check for specific missing skills
  let jobSkillsMatches = 0;
  let jobSkillsTotal = 0;
  if (cleanJob) {
    allSkills.forEach(skill => {
      if (cleanJob.includes(skill)) {
        jobSkillsTotal++;
        if (cleanResume.includes(skill)) {
          jobSkillsMatches++;
        } else {
          missingSkills.push(skill);
        }
      }
    });
  }

  // Calculate Skills Score
  // If JD exists, weight it heavily on JD matches. Otherwise, weight on raw count of skills found (capped at 15)
  const skillsScore = cleanJob && jobSkillsTotal > 0
    ? (jobSkillsMatches / jobSkillsTotal) * 100
    : Math.min(foundSkills.length * 5, 100);

  // 2. Keyword Match (Content Relevance)
  // If JD exists, check overlap of significant words (ignoring stop words)
  let keywordMatch = 0;
  if (cleanJob) {
    const stopWords = ['the', 'and', 'or', 'a', 'an', 'in', 'to', 'for', 'of', 'with', 'on', 'at', 'by', 'from'];
    const jobWords = cleanJob.split(/\s+/).filter(w => w.length > 3 && !stopWords.includes(w));
    const resumeWords = new Set(cleanResume.split(/\s+/));
    
    let matches = 0;
    jobWords.forEach(w => {
      if (resumeWords.has(w)) matches++;
    });
    
    keywordMatch = jobWords.length > 0 ? (matches / jobWords.length) * 100 : 0;
  } else {
    // If no JD, base keyword match on usage of strong Action Verbs
    let verbCount = 0;
    ACTION_VERBS.forEach(verb => {
      if (cleanResume.includes(verb)) verbCount++;
    });
    keywordMatch = Math.min(verbCount * 10, 100);
  }

  // 3. Formatting Check
  const lines = resumeText.split('\n');
  const formattingIssues: string[] = [];
  let scoreFormatting = 100;

  // Check line length
  const longLines = lines.filter(l => l.length > 120);
  if (longLines.length > 5) {
    formattingIssues.push(`Found ${longLines.length} lines that might be too long (over 120 chars). Consider wrapping text.`);
    scoreFormatting -= 10;
  }

  // Check section headers (simple heuristic: specific keywords on their own line or short lines)
  const sections = ['experience', 'education', 'skills', 'summary', 'projects'];
  const foundSections = sections.filter(s => cleanResume.includes(s));
  
  if (foundSections.length < 3) {
    formattingIssues.push(`Missing standard sections: ${sections.filter(s => !cleanResume.includes(s)).join(', ')}`);
    scoreFormatting -= 20;
  }

  // Check contact info
  if (!resumeText.includes('@')) {
    formattingIssues.push("Could not detect an email address.");
    scoreFormatting -= 20;
  }

  // 4. Structure & Grammar (Heuristic)
  let scoreStructure = 100;
  const structureIssues: string[] = [];
  
  // Long sentences check
  const sentences = resumeText.split(/[.!?]+/);
  const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 30);
  if (longSentences.length > 3) {
    structureIssues.push("Detected several very long sentences. Keep sentences concise.");
    scoreStructure -= 15;
  }

  // Passive voice detection (simple heuristic "was/were + ed")
  const passiveMatches = resumeText.match(/\b(was|were)\s+\w+ed\b/gi);
  if (passiveMatches && passiveMatches.length > 3) {
    structureIssues.push("Potential passive voice detected. Use active action verbs (e.g., 'Led' instead of 'Was led').");
    scoreStructure -= 10;
  }
  
  // Word repetition check
  const words = cleanResume.split(/\s+/);
  const wordCounts: Record<string, number> = {};
  words.forEach(w => {
    if (w.length > 4) wordCounts[w] = (wordCounts[w] || 0) + 1;
  });
  const repetitiveWords = Object.entries(wordCounts).filter(([_, count]) => count > 10).map(([w]) => w);
  if (repetitiveWords.length > 0) {
    structureIssues.push(`Repetitive words detected: ${repetitiveWords.slice(0, 5).join(', ')}`);
    scoreStructure -= 5;
  }

  // 5. Overall Calculation
  const overall = Math.round(
    (keywordMatch * 0.4) + 
    (skillsScore * 0.3) + 
    (scoreFormatting * 0.2) + 
    (scoreStructure * 0.1)
  );

  return {
    overall: Math.min(Math.max(overall, 0), 100),
    keywordMatch: Math.min(Math.max(keywordMatch, 0), 100),
    skillsScore: Math.min(Math.max(skillsScore, 0), 100),
    formatting: Math.min(Math.max(scoreFormatting, 0), 100),
    structure: Math.min(Math.max(scoreStructure, 0), 100),
    missingSkills: missingSkills.slice(0, 10), // Top 10 missing
    foundSkills: foundSkills.slice(0, 20), // Top 20 found
    formattingIssues,
    structureIssues
  };
};
