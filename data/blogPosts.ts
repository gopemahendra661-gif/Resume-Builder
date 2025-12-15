export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  keywords: string;
  content: string; // HTML content
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  "how-to-beat-ats-bots-2024": {
    id: "1",
    slug: "how-to-beat-ats-bots-2024",
    title: "How to Beat the ATS Bots in 2024: The Ultimate Guide",
    excerpt: "Learn the secrets to formatting your resume so it passes automated screening software and lands on a recruiter's desk.",
    date: "October 15, 2023",
    author: "ResumeAI Team",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200",
    keywords: "ATS resume, applicant tracking system, resume optimization, beat the bots, resume formatting 2024",
    content: `
      <h2>What is an Applicant Tracking System (ATS)?</h2>
      <p>An Applicant Tracking System (ATS) is software used by employers to manage the entire hiring process. Before a human recruiter ever sees your resume, it is likely scanned, parsed, and ranked by an ATS. In 2024, over 98% of Fortune 500 companies use these systems to filter out unqualified candidates.</p>
      
      <p>The problem? Even qualified candidates get rejected if their resumes aren't formatted in a way the bot can understand. Here is how to ensure your resume survives the digital purge.</p>

      <h3>1. Use Standard Section Headings</h3>
      <p>Creativity is great for your portfolio, but bad for ATS parsing. The software looks for specific "hooks" to identify data. Use standard headings like:</p>
      <ul>
        <li><strong>Experience</strong> or <strong>Work History</strong></li>
        <li><strong>Education</strong></li>
        <li><strong>Skills</strong></li>
        <li><strong>Summary</strong></li>
      </ul>
      <p>Avoid cute alternatives like "My Journey" or "Professional DNA".</p>

      <h3>2. Mirror Keywords from the Job Description</h3>
      <p>ATS algorithms work primarily on keyword matching. If the job description asks for "Project Management" and "Agile methodologies," your resume needs to contain those exact phrases.</p>
      <p><em>Pro Tip: Use our Resume Analyzer tool to compare your resume against a job description instantly.</em></p>

      <h3>3. Avoid Columns and Tables</h3>
      <p>While modern ATSs are getting smarter, many still struggle to read multi-column layouts correctly. They read left-to-right, top-to-bottom. A two-column layout might result in the parser mixing your skills section with your work experience, creating a jumbled mess of text.</p>
      <p><strong>Stick to a single-column layout for the safest results.</strong></p>

      <h3>4. Use Standard Fonts</h3>
      <p>Stick to universal fonts like Arial, Calibri, Helvetica, or Roboto. Custom web fonts or complex serifs might turn into unrecognizable symbols when parsed.</p>

      <h3>5. Save as the Right File Type</h3>
      <p>Unless the application specifically requests a Word Doc (.docx), <strong>PDF</strong> is generally the best format to preserve your formatting. However, ensure it is a text-based PDF, not an image-based PDF. If you can highlight the text with your mouse, the bot can read it.</p>

      <h3>Conclusion</h3>
      <p>Beating the ATS isn't about cheating the system; it's about making it easy for the system to see your value. Keep it clean, keep it relevant, and keep it standard.</p>
    `
  },
  "top-10-soft-skills-recruiters-want": {
    id: "2",
    slug: "top-10-soft-skills-recruiters-want",
    title: "Top 10 Soft Skills Recruiters Want in 2024",
    excerpt: "Technical skills get you the interview, but soft skills get you the job. Discover the top interpersonal traits employers are hunting for.",
    date: "November 2, 2023",
    author: "Sarah Jenkins, HR Specialist",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200",
    keywords: "soft skills, employability skills, communication, leadership, emotional intelligence, job interview tips",
    content: `
      <p>In a world increasingly dominated by AI and automation, human skills—often called "soft skills"—are becoming more valuable than ever. LinkedIn’s Global Talent Trends report suggests that 92% of talent professionals and hiring managers say soft skills are just as important, if not more important, than hard skills.</p>
      
      <p>Here are the top 10 soft skills you should highlight on your resume and in your interviews:</p>

      <h3>1. Communication</h3>
      <p>This includes both verbal and written communication. Can you explain complex technical concepts to non-technical stakeholders? Can you write clear, concise emails?</p>

      <h3>2. Adaptability</h3>
      <p>The business landscape changes rapidly. Recruiters want candidates who can pivot strategies, learn new tools quickly, and remain calm under shifting priorities.</p>

      <h3>3. Problem Solving</h3>
      <p>Employers hire you to solve problems. Don't just list "Problem Solver" as a skill; give an example in your work experience of a time you identified an issue and implemented a solution.</p>

      <h3>4. Teamwork & Collaboration</h3>
      <p>Even individual contributors need to work within a wider ecosystem. Show that you can support colleagues, share knowledge, and work towards shared goals.</p>

      <h3>5. Emotional Intelligence (EQ)</h3>
      <p>The ability to understand and manage your own emotions, as well as recognize and influence the emotions of others, is crucial for leadership and conflict resolution.</p>

      <h3>6. Time Management</h3>
      <p>With remote work becoming standard, the ability to manage your own schedule and meet deadlines without constant supervision is a top priority for hiring managers.</p>

      <h3>7. Critical Thinking</h3>
      <p>This is the ability to analyze information objectively and make a reasoned judgment. It involves evaluating sources such as data, facts, observable phenomena, and research findings.</p>

      <h3>8. Creativity</h3>
      <p>Creativity isn't just for designers. It’s about approaching tasks from a new perspective and finding innovative ways to improve efficiency.</p>

      <h3>9. Work Ethic</h3>
      <p>Reliability, dedication, and professionalism never go out of style. Punctuality and meeting deadlines are the simplest ways to demonstrate this.</p>

      <h3>10. Leadership</h3>
      <p>You don't need to be a manager to show leadership. Taking ownership of a project, mentoring a junior team member, or leading a volunteer initiative all count.</p>
    `
  },
  "resume-vs-cv-difference": {
    id: "3",
    slug: "resume-vs-cv-difference",
    title: "Resume vs CV: What's the Difference?",
    excerpt: "Understanding when to use a Curriculum Vitae versus a standard Resume is crucial for international applications and academic roles.",
    date: "September 28, 2023",
    author: "Career Coach Mike",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=1200",
    keywords: "Resume vs CV, curriculum vitae difference, academic CV, international job application, resume format",
    content: `
      <p>If you are applying for jobs internationally or in academia, you have likely encountered the request for a "CV" instead of a resume. While the terms are often used interchangeably in casual conversation, they represent two distinct documents with different purposes, layouts, and lengths.</p>

      <h2>The Resume (Résumé)</h2>
      <p><strong>Origin:</strong> French for "summary".</p>
      <p><strong>Length:</strong> 1 to 2 pages maximum.</p>
      <p><strong>Focus:</strong> A competency-based marketing document. It highlights skills and achievements relevant specifically to the job you are applying for.</p>
      <p><strong>Where used:</strong> Standard for industry jobs in the US, Canada, and increasingly in the corporate sector globally.</p>
      
      <h3>Key Characteristics of a Resume:</h3>
      <ul>
        <li><strong>Tailored:</strong> You should customize it for every job application.</li>
        <li><strong>Chronological (usually):</strong> Reverse-chronological order of experience.</li>
        <li><strong>Brief:</strong> Bullet points are preferred over long paragraphs.</li>
      </ul>

      <hr class="my-8 border-gray-200 dark:border-gray-700" />

      <h2>The CV (Curriculum Vitae)</h2>
      <p><strong>Origin:</strong> Latin for "course of life".</p>
      <p><strong>Length:</strong> No limit (often 3-10+ pages).</p>
      <p><strong>Focus:</strong> A comprehensive credential-based history. It details your entire career, including education, publications, awards, affiliations, and research.</p>
      <p><strong>Where used:</strong> Academia, medicine, science, and research positions in the US. In the UK, Ireland, and New Zealand, "CV" is the standard term for what Americans call a resume.</p>

      <h3>Key Characteristics of a CV:</h3>
      <ul>
        <li><strong>Static:</strong> The content doesn't change much for different jobs, you just add to it as you gain achievements.</li>
        <li><strong>Comprehensive:</strong> Includes full lists of publications, presentations, and grants.</li>
      </ul>

      <h2>Which One Should You Use?</h2>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg my-6">
        <h4 class="font-bold text-blue-800 dark:text-blue-200 mb-2">The Golden Rule:</h4>
        <p class="text-blue-800 dark:text-blue-200">If applying for a standard corporate job in the US or Canada, send a <strong>Resume</strong>. If applying for an academic role, a fellowship, or a job in Europe/UK (where they say CV but mean a short summary), check the specific length requirements. When in doubt, shorter is almost always better.</p>
      </div>
    `
  }
};
