
export interface ResumeScore {
  overall: number;
  keywordMatch: number;
  formatting: number;
  skillsScore: number;
  structure: number;
  missingSkills: string[];
  foundSkills: string[];
  formattingIssues: string[];
  structureIssues: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
  city: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  city: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string; // Comma separated for editing, array for display
  photoUrl?: string;
}

export type TemplateType = 'modern' | 'minimal' | 'professional' | 'creative' | 'executive';

// Define global types for libraries loaded via CDN
declare global {
  interface Window {
    pdfjsLib: any;
    mammoth: any;
    html2pdf: any;
  }
}
