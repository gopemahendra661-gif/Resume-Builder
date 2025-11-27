import React from 'react';
import { Helmet } from 'react-helmet';
import { FileText, CheckCircle, Zap, Shield, ChevronRight, Star, ArrowRight, Layout, Download } from 'lucide-react';
import { clsx } from 'clsx';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'analyzer' | 'builder') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Free Resume Builder – Create ATS-Friendly Resumes Online</title>
        <meta name="description" content="Build professional resumes instantly with our free resume builder. Download PDF, use ATS-friendly templates, and get noticed by recruiters." />
        <meta property="og:title" content="Free Resume Builder – Create ATS-Friendly Resumes Online" />
        <meta property="og:description" content="Build professional resumes instantly with our free resume builder. Download PDF, use ATS-friendly templates, and get noticed by recruiters." />
        <meta property="og:image" content="https://via.placeholder.com/1200x630.png?text=Resume+Builder+Preview" />
        <meta name="keywords" content="resume builder, free resume maker, ATS check, resume templates, cv builder, pdf resume" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            100% Free & Client-Side Secure
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Build Your <span className="text-primary-600 dark:text-primary-400">Dream Resume</span> in Minutes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create professional, ATS-optimized resumes that pass the bots and impress recruiters. No sign-up required, no data stored on servers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={() => onNavigate('builder')}
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/30 flex items-center justify-center"
            >
              Build Resume Now <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('analyzer')}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center"
            >
              Check My Score
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Resume Architect?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We combine powerful ATS analysis with professional design tools to help you land more interviews.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10 text-primary-600" />,
                title: "Privacy First",
                desc: "100% Client-side processing. Your personal data never leaves your browser."
              },
              {
                icon: <Layout className="w-10 h-10 text-primary-600" />,
                title: "ATS-Friendly Templates",
                desc: "Designed to be easily readable by Applicant Tracking Systems used by HR."
              },
              {
                icon: <FileText className="w-10 h-10 text-primary-600" />,
                title: "Smart Analysis",
                desc: "Get instant feedback on keyword matching, formatting, and missing skills."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="bg-primary-50 dark:bg-primary-900/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
            
            {[
              { step: "01", title: "Choose or Import", desc: "Select a professional template or upload your existing resume for analysis." },
              { step: "02", title: "Edit & Optimize", desc: "Use our real-time editor to add skills, experience, and fix ATS issues." },
              { step: "03", title: "Download PDF", desc: "Export your polished resume in high-quality PDF format instantly." }
            ].map((item, idx) => (
              <div key={idx} className="text-center bg-white dark:bg-gray-900">
                <div className="w-24 h-24 mx-auto bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 border-8 border-white dark:border-gray-900 shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Professional Templates</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
             Choose from our collection of modern, clean, and executive styles designed to highlight your strengths.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="group cursor-pointer" onClick={() => onNavigate('builder')}>
               <div className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                    <Layout className="w-16 h-16 opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold px-6 py-2 border-2 border-white rounded-lg">Use Modern</span>
                  </div>
               </div>
               <h3 className="font-semibold text-gray-900 dark:text-white">Modern Clean</h3>
             </div>
             <div className="group cursor-pointer" onClick={() => onNavigate('builder')}>
               <div className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                    <FileText className="w-16 h-16 opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold px-6 py-2 border-2 border-white rounded-lg">Use Executive</span>
                  </div>
               </div>
               <h3 className="font-semibold text-gray-900 dark:text-white">Executive</h3>
             </div>
             <div className="group cursor-pointer" onClick={() => onNavigate('builder')}>
               <div className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                    <Star className="w-16 h-16 opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold px-6 py-2 border-2 border-white rounded-lg">Use Creative</span>
                  </div>
               </div>
               <h3 className="font-semibold text-gray-900 dark:text-white">Creative</h3>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">What Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { text: "The ATS analyzer is a game changer! I realized my old resume was getting rejected because of formatting issues. Fixed it and got an interview the next week.", author: "Sarah J.", role: "Marketing Manager" },
                 { text: "I love that it's free and doesn't require a login. The builder is super intuitive and the templates look very professional.", author: "Mike T.", role: "Software Engineer" },
                 { text: "Best resume tool I've used. The tips for missing skills helped me tailor my application perfectly.", author: "Emily R.", role: "Data Analyst" }
               ].map((t, i) => (
                 <div key={i} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-primary-500 mb-4">★★★★★</div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{t.text}"</p>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{t.author}</div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Latest Career Advice</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 w-full"></div>
              <div className="p-6">
                <div className="text-primary-600 text-sm font-semibold mb-2">Resume Tips</div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">How to Beat the ATS Bots in 2024</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Learn the secrets to formatting your resume so it passes automated screening software.</p>
                <a href="#" className="text-primary-600 font-medium hover:underline flex items-center">Read More <ChevronRight size={16} /></a>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 w-full"></div>
              <div className="p-6">
                <div className="text-primary-600 text-sm font-semibold mb-2">Career Growth</div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Top 10 Soft Skills Recruiters Want</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Technical skills get you the interview, but soft skills get you the job.</p>
                <a href="#" className="text-primary-600 font-medium hover:underline flex items-center">Read More <ChevronRight size={16} /></a>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 w-full"></div>
              <div className="p-6">
                <div className="text-primary-600 text-sm font-semibold mb-2">Job Search</div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Resume vs CV: What's the Difference?</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Understanding when to use a Curriculum Vitae versus a standard Resume.</p>
                <a href="#" className="text-primary-600 font-medium hover:underline flex items-center">Read More <ChevronRight size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
               {[
                 { q: "Is this resume builder really free?", a: "Yes, 100%. We do not charge for downloads or premium templates. Everything is free." },
                 { q: "Do you store my personal data?", a: "No. All processing happens locally in your browser. We do not have a backend server database." },
                 { q: "What formats can I download?", a: "You can download your resume as a high-quality PDF format, optimized for printing and digital sharing." },
                 { q: "Can I import my existing resume?", a: "Yes, you can upload a PDF or DOCX file to extract text and analyze it against ATS standards." }
               ].map((faq, i) => (
                 <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                   <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-primary-100 text-xl mb-10">Join thousands of job seekers who have improved their resumes with our free tool.</p>
          <button 
             onClick={() => onNavigate('builder')}
             className="px-10 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
             Build My Resume
          </button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 text-center">
         <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8 text-left">
            <div>
               <h4 className="text-white font-bold text-lg mb-4">Resume Architect</h4>
               <p className="text-sm">Free, secure, and professional resume building tools for everyone.</p>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4">Tools</h4>
               <ul className="space-y-2 text-sm">
                  <li><button onClick={() => onNavigate('builder')} className="hover:text-white">Resume Builder</button></li>
                  <li><button onClick={() => onNavigate('analyzer')} className="hover:text-white">ATS Checker</button></li>
                  <li><button className="hover:text-white">Templates</button></li>
               </ul>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4">Resources</h4>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Examples</a></li>
                  <li><a href="#" className="hover:text-white">Career Tips</a></li>
               </ul>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4">Legal</h4>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
               </ul>
            </div>
         </div>
         <div className="border-t border-gray-800 pt-8 text-sm">
           © {new Date().getFullYear()} AI Resume Architect. All rights reserved.
         </div>
      </footer>
    </div>
  );
};