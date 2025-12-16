
import React from 'react';
import { ResumeData } from '../types';

interface TemplateProps {
  data: ResumeData;
}

/* ================= EXISTING TEMPLATES ================= */

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="p-8 bg-white text-gray-800 font-sans min-h-[1123px]" id="resume-preview-content">
    <header className="border-b-2 border-gray-800 pb-4 mb-6 flex justify-between items-start">
      <div className="flex-1">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">{data.fullName}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>| {data.phone}</span>}
          {data.location && <span>| {data.location}</span>}
          {data.website && <span>| {data.website}</span>}
        </div>
      </div>
      {data.photoUrl && (
        <img src={data.photoUrl} alt="Profile" className="w-24 h-24 rounded-lg object-cover ml-4 border border-gray-200" />
      )}
    </header>

    <div className="mb-6">
      <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-gray-700">Summary</h2>
      <p className="text-sm leading-relaxed text-gray-600">{data.summary}</p>
    </div>

    <div className="mb-6">
      <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-gray-700">Experience</h2>
      <div className="space-y-4">
        {data.experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-800">{exp.role}</h3>
              <span className="text-sm text-gray-500">{exp.duration}</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <h4 className="text-sm font-semibold text-gray-700">{exp.company}</h4>
              <span className="text-xs text-gray-500">{exp.city}</span>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-6">
      <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-gray-700">Education</h2>
      <div className="space-y-3">
        {data.education.map((edu) => (
          <div key={edu.id}>
            <div className="flex justify-between">
              <h3 className="font-bold text-gray-800">{edu.school}</h3>
              <span className="text-sm text-gray-500">{edu.year}</span>
            </div>
            <div className="text-sm text-gray-600">{edu.degree}, {edu.city}</div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-gray-700">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {data.skills.split(',').map((skill, i) => (
          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
            {skill.trim()}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="p-10 bg-white text-gray-800 font-serif min-h-[1123px]" id="resume-preview-content">
    <div className="text-center mb-8">
      {data.photoUrl && (
        <div className="mb-4 flex justify-center">
          <img src={data.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-gray-100" />
        </div>
      )}
      <h1 className="text-3xl font-normal mb-2">{data.fullName}</h1>
      <div className="text-sm text-gray-500 italic space-x-3">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>&bull; {data.phone}</span>}
        {data.location && <span>&bull; {data.location}</span>}
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6">
      {data.summary && (
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Profile</h3>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Work Experience</h3>
        <div className="space-y-5">
          {data.experience.map((exp) => (
            <div key={exp.id} className="relative pl-4 border-l-2 border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{exp.company}</h4>
                  <div className="text-sm text-gray-600 italic">{exp.role}</div>
                </div>
                <div className="text-xs text-gray-400">{exp.duration}</div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Education</h3>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-900">{edu.school}</span>
              <span className="text-xs text-gray-400">{edu.year}</span>
            </div>
            <div className="text-sm text-gray-600">{edu.degree}</div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Skills</h3>
        <p className="text-sm text-gray-600 leading-loose">
          {data.skills.split(',').map(s => s.trim()).join('  •  ')}
        </p>
      </section>
    </div>
  </div>
);

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="flex min-h-[1123px] bg-white" id="resume-preview-content">
    {/* Sidebar */}
    <div className="w-1/3 bg-slate-800 text-white p-8">
      <div className="mb-8 flex flex-col items-center text-center">
        {data.photoUrl && (
          <img src={data.photoUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-slate-600" />
        )}
        <h1 className="text-2xl font-bold leading-tight mb-4">{data.fullName}</h1>
        <div className="text-sm text-slate-300 space-y-2 w-full text-left">
          {data.email && <div className="break-all border-b border-slate-700 pb-1">{data.email}</div>}
          {data.phone && <div className="border-b border-slate-700 pb-1">{data.phone}</div>}
          {data.location && <div className="border-b border-slate-700 pb-1">{data.location}</div>}
          {data.website && <div className="break-all border-b border-slate-700 pb-1">{data.website}</div>}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-600 pb-2">Education</h3>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="font-bold text-sm">{edu.school}</div>
              <div className="text-xs text-slate-300 mb-1">{edu.degree}</div>
              <div className="text-xs text-slate-400">{edu.year}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-600 pb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.split(',').map((skill, i) => (
            <span key={i} className="text-xs bg-slate-700 px-2 py-1 rounded">
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="w-2/3 p-8">
      {data.summary && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-3">Professional Summary</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{data.summary}</p>
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-6">Experience</h3>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-slate-700 text-md">{exp.role}</h4>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">{exp.duration}</span>
              </div>
              <div className="text-sm font-medium text-slate-500 mb-2">{exp.company} &bull; {exp.city}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="flex min-h-[1123px] bg-white font-sans" id="resume-preview-content">
    {/* Left Sidebar */}
    <div className="w-1/3 bg-indigo-900 text-white p-8 flex flex-col gap-6">
      <div className="mb-4">
        <div className="w-32 h-32 mx-auto bg-indigo-700 rounded-full flex items-center justify-center text-4xl font-bold mb-4 overflow-hidden border-4 border-indigo-800">
          {data.photoUrl ? (
             <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
             <span>{data.fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-center leading-tight">{data.fullName}</h1>
        <p className="text-indigo-200 text-center text-sm mt-2">{data.location}</p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-indigo-300 text-xs uppercase font-bold">Email</span>
          <span className="break-all">{data.email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-indigo-300 text-xs uppercase font-bold">Phone</span>
          <span>{data.phone}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-indigo-300 text-xs uppercase font-bold">Website</span>
          <span className="break-all">{data.website}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold border-b border-indigo-700 pb-2 mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.split(',').map((skill, i) => (
            <span key={i} className="bg-indigo-800 px-3 py-1 rounded-full text-xs">
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold border-b border-indigo-700 pb-2 mb-4">Education</h3>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="font-bold text-sm">{edu.school}</div>
              <div className="text-indigo-200 text-xs">{edu.degree}</div>
              <div className="text-indigo-300 text-xs italic">{edu.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="w-2/3 p-10 bg-white text-gray-800">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-indigo-900 uppercase tracking-wider mb-4 border-b-2 border-indigo-100 pb-2">Profile</h2>
        <p className="text-gray-600 leading-relaxed">{data.summary}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-indigo-900 uppercase tracking-wider mb-6 border-b-2 border-indigo-100 pb-2">Experience</h2>
        <div className="space-y-8">
          {data.experience.map((exp) => (
            <div key={exp.id} className="relative pl-6 border-l-2 border-indigo-100">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white"></div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{exp.duration}</span>
              </div>
              <div className="text-md font-medium text-gray-500 mb-3">{exp.company} &bull; {exp.city}</div>
              <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="p-12 bg-white text-gray-900 font-serif min-h-[1123px]" id="resume-preview-content">
    {/* Header */}
    <div className="flex items-start justify-between border-b-2 border-gray-900 pb-6 mb-6">
      <div className="flex-1 text-center">
         <h1 className="text-4xl font-bold uppercase tracking-widest mb-3">{data.fullName}</h1>
         <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-700">
          {data.location && <span className="flex items-center">{data.location}</span>}
          {data.phone && <span className="flex items-center">&bull; {data.phone}</span>}
          {data.email && <span className="flex items-center">&bull; {data.email}</span>}
          {data.website && <span className="flex items-center">&bull; {data.website}</span>}
        </div>
      </div>
      {data.photoUrl && (
        <img src={data.photoUrl} alt="Profile" className="w-28 h-28 object-cover border border-gray-300 shadow-sm ml-6" />
      )}
    </div>

    {/* Summary */}
    {data.summary && (
      <div className="mb-6">
        <h2 className="text-md font-bold uppercase border-b border-gray-300 mb-3 tracking-wide">Professional Summary</h2>
        <p className="text-sm text-justify leading-relaxed">{data.summary}</p>
      </div>
    )}

    {/* Skills - Top for Executive often works well, or bottom. Let's put top for quick scan */}
    <div className="mb-6">
      <h2 className="text-md font-bold uppercase border-b border-gray-300 mb-3 tracking-wide">Core Competencies</h2>
      <div className="text-sm leading-relaxed text-justify">
        {data.skills.split(',').map((skill) => skill.trim()).join(' • ')}
      </div>
    </div>

    {/* Experience */}
    <div className="mb-6">
      <h2 className="text-md font-bold uppercase border-b border-gray-300 mb-4 tracking-wide">Professional Experience</h2>
      <div className="space-y-5">
        {data.experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-lg">{exp.company}</h3>
              <span className="text-sm font-bold">{exp.duration}</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <div className="text-md italic">{exp.role}</div>
              <div className="text-sm italic text-gray-600">{exp.city}</div>
            </div>
            <p className="text-sm text-justify leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Education */}
    <div>
      <h2 className="text-md font-bold uppercase border-b border-gray-300 mb-4 tracking-wide">Education</h2>
      <div className="space-y-3">
        {data.education.map((edu) => (
          <div key={edu.id} className="flex justify-between items-end">
            <div>
              <div className="font-bold">{edu.school}</div>
              <div className="italic text-sm">{edu.degree}</div>
            </div>
            <div className="text-sm text-right">
              <div>{edu.city}</div>
              <div className="font-bold">{edu.year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ================= NEW TEMPLATES (Added based on request) ================= */

export const VibrantTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="flex min-h-[1123px] bg-white font-sans" id="resume-preview-content">
    {/* Left Column (Emerald) */}
    <div className="w-[35%] bg-emerald-700 text-white p-6 flex flex-col gap-6">
       <div className="text-center">
         {data.photoUrl && (
           <img src={data.photoUrl} alt="Profile" className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-emerald-500 mb-4" />
         )}
         <h1 className="text-2xl font-bold leading-tight mb-2">{data.fullName}</h1>
         <p className="text-emerald-100 text-sm">{data.location}</p>
       </div>

       <div className="space-y-4">
         <h3 className="text-emerald-300 text-xs font-bold uppercase tracking-wider border-b border-emerald-600 pb-1">Contact</h3>
         <div className="text-sm space-y-2 break-words">
           <div>{data.email}</div>
           <div>{data.phone}</div>
           <div>{data.website}</div>
         </div>
       </div>

       <div className="space-y-4">
         <h3 className="text-emerald-300 text-xs font-bold uppercase tracking-wider border-b border-emerald-600 pb-1">Skills</h3>
         <div className="flex flex-wrap gap-2">
           {data.skills.split(',').map((s, i) => (
             <span key={i} className="bg-emerald-800 px-2 py-1 rounded text-xs">{s.trim()}</span>
           ))}
         </div>
       </div>

       {data.education.length > 0 && (
         <div className="space-y-4">
           <h3 className="text-emerald-300 text-xs font-bold uppercase tracking-wider border-b border-emerald-600 pb-1">Education</h3>
           {data.education.map((edu) => (
             <div key={edu.id} className="text-sm">
               <div className="font-bold">{edu.degree}</div>
               <div className="text-emerald-200">{edu.school}</div>
               <div className="text-xs text-emerald-300 italic">{edu.year}</div>
             </div>
           ))}
         </div>
       )}
    </div>

    {/* Right Column */}
    <div className="w-[65%] p-8">
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-3 border-b-2 border-emerald-100 pb-2">Profile</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-emerald-800 mb-6 border-b-2 border-emerald-100 pb-2">Experience</h2>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold text-gray-800">{exp.role}</h3>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">{exp.duration}</span>
              </div>
              <div className="text-sm font-semibold text-emerald-600 mb-2">{exp.company}, {exp.city}</div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const ElegantTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="p-10 bg-stone-50 text-stone-900 font-serif min-h-[1123px]" id="resume-preview-content">
    {/* Header */}
    <header className="text-center mb-10 border-b border-stone-300 pb-8">
      <h1 className="text-4xl font-normal tracking-wider uppercase mb-3 text-stone-800">{data.fullName}</h1>
      <div className="flex justify-center gap-4 text-sm text-stone-600 font-light">
        <span>{data.location}</span>
        <span>•</span>
        <span>{data.email}</span>
        <span>•</span>
        <span>{data.phone}</span>
      </div>
    </header>

    {/* Layout Split */}
    <div className="flex gap-8">
      {/* Main Column */}
      <div className="w-2/3">
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-normal uppercase tracking-widest text-stone-500 mb-4">About Me</h2>
            <p className="text-sm leading-7 text-stone-700">{data.summary}</p>
          </section>
        )}

        <section>
          <h2 className="text-lg font-normal uppercase tracking-widest text-stone-500 mb-6">Experience</h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-6 border-l border-stone-300">
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                <h3 className="font-bold text-lg text-stone-800">{exp.company}</h3>
                <div className="flex justify-between text-stone-500 text-sm mb-3 italic">
                  <span>{exp.role}</span>
                  <span>{exp.duration}</span>
                </div>
                <p className="text-sm text-stone-700 leading-6">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Side Column */}
      <div className="w-1/3 space-y-8 border-l border-stone-200 pl-8">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="font-bold text-stone-800">{edu.school}</div>
              <div className="text-sm text-stone-600">{edu.degree}</div>
              <div className="text-xs text-stone-400 mt-1">{edu.year}</div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Expertise</h2>
          <div className="flex flex-col gap-2">
            {data.skills.split(',').map((skill, i) => (
              <span key={i} className="text-sm text-stone-700 border-b border-stone-200 pb-1">
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>

        {data.website && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Links</h2>
            <div className="text-sm text-stone-700 break-all">{data.website}</div>
          </section>
        )}
      </div>
    </div>
  </div>
);

export const TechTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="min-h-[1123px] bg-slate-50 font-mono text-slate-800" id="resume-preview-content">
    {/* Dark Tech Header */}
    <header className="bg-slate-900 text-cyan-400 p-8">
      <h1 className="text-4xl font-bold mb-2">
        <span className="text-white">&lt;</span>
        {data.fullName} 
        <span className="text-white">/&gt;</span>
      </h1>
      <div className="flex flex-wrap gap-4 text-sm text-slate-400">
        <span>{data.email}</span>
        <span>// {data.phone}</span>
        <span>// {data.location}</span>
      </div>
    </header>

    <div className="p-8 grid grid-cols-12 gap-8">
      <div className="col-span-12">
        <div className="p-4 bg-white border-l-4 border-cyan-500 shadow-sm">
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      </div>

      <div className="col-span-8 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 mb-4">
            <span className="text-cyan-600">const</span> Experience = [
          </h2>
          <div className="space-y-6 pl-4 border-l border-dashed border-slate-300">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-[21px] top-1 text-cyan-500">●</div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">{exp.role}</h3>
                  <span className="text-xs bg-slate-200 px-2 py-1 rounded">{exp.duration}</span>
                </div>
                <div className="text-cyan-700 text-sm font-bold mb-2">@ {exp.company}</div>
                <p className="text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xl font-bold text-slate-900">];</div>
        </section>
      </div>

      <div className="col-span-4 space-y-8">
        <section>
          <h2 className="text-sm font-bold text-slate-900 uppercase mb-4">
            <span className="text-cyan-600">import</span> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.split(',').map((s, i) => (
              <span key={i} className="px-2 py-1 bg-slate-900 text-cyan-400 text-xs rounded-md font-bold">
                {s.trim()}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-slate-900 uppercase mb-4">
            <span className="text-cyan-600">import</span> Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-white p-3 border border-slate-200 shadow-sm rounded">
                <div className="font-bold text-sm">{edu.school}</div>
                <div className="text-xs text-slate-500">{edu.degree}</div>
                <div className="text-xs text-right text-cyan-600 mt-1">{edu.year}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

export const CompactTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="p-6 bg-white text-gray-900 font-sans min-h-[1123px] text-sm" id="resume-preview-content">
    <header className="border-b-4 border-gray-900 pb-4 mb-4">
      <h1 className="text-3xl font-black uppercase mb-1">{data.fullName}</h1>
      <div className="flex justify-between items-center text-xs font-semibold text-gray-600">
        <div className="flex gap-4">
           <span>{data.email}</span>
           <span>{data.phone}</span>
        </div>
        <div className="flex gap-4">
           <span>{data.location}</span>
           <span>{data.website}</span>
        </div>
      </div>
    </header>

    <div className="grid grid-cols-3 gap-6 h-full">
       {/* Left narrow column */}
       <div className="col-span-1 space-y-6">
          {data.education.length > 0 && (
            <section>
               <h3 className="font-black uppercase text-sm border-b-2 border-gray-200 mb-2">Education</h3>
               {data.education.map((edu) => (
                 <div key={edu.id} className="mb-3">
                   <div className="font-bold">{edu.school}</div>
                   <div>{edu.degree}</div>
                   <div className="text-gray-500 text-xs">{edu.year}</div>
                 </div>
               ))}
            </section>
          )}

          <section>
             <h3 className="font-black uppercase text-sm border-b-2 border-gray-200 mb-2">Skills</h3>
             <ul className="list-disc list-inside space-y-1 text-xs">
               {data.skills.split(',').map((s, i) => (
                 <li key={i}>{s.trim()}</li>
               ))}
             </ul>
          </section>
       </div>

       {/* Right wide column */}
       <div className="col-span-2 space-y-6">
          {data.summary && (
            <section>
               <h3 className="font-black uppercase text-sm border-b-2 border-gray-200 mb-2">Profile</h3>
               <p className="text-xs leading-5 text-justify">{data.summary}</p>
            </section>
          )}

          <section>
             <h3 className="font-black uppercase text-sm border-b-2 border-gray-200 mb-3">Professional Experience</h3>
             <div className="space-y-4">
               {data.experience.map((exp) => (
                 <div key={exp.id}>
                    <div className="flex justify-between items-end mb-1">
                      <h4 className="font-bold text-base">{exp.company}</h4>
                      <span className="text-xs font-bold bg-gray-100 px-2 py-0.5 rounded">{exp.duration}</span>
                    </div>
                    <div className="text-xs font-semibold text-gray-600 italic mb-1">{exp.role} | {exp.city}</div>
                    <p className="text-xs leading-5 text-justify">{exp.description}</p>
                 </div>
               ))}
             </div>
          </section>
       </div>
    </div>
  </div>
);

export const BoldTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="p-8 bg-white text-black font-sans min-h-[1123px] border-8 border-black m-4" id="resume-preview-content">
    <div className="bg-black text-white p-6 -mt-8 -mx-8 mb-8">
      <h1 className="text-5xl font-extrabold uppercase tracking-tighter mb-2">{data.fullName}</h1>
      <p className="text-lg font-medium opacity-80">{data.location}</p>
    </div>

    <div className="grid grid-cols-1 gap-8">
      <div className="flex gap-4 text-sm font-bold border-b-4 border-black pb-4">
        <div className="bg-black text-white px-2 py-1">CONTACT</div>
        <span>{data.email}</span>
        <span>/</span>
        <span>{data.phone}</span>
        <span>/</span>
        <span>{data.website}</span>
      </div>

      {data.summary && (
        <section>
          <h2 className="text-2xl font-black uppercase mb-2">About</h2>
          <p className="text-base font-medium leading-relaxed">{data.summary}</p>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-black uppercase mb-4 bg-yellow-400 inline-block px-2 transform -rotate-1">Experience</h2>
        <div className="space-y-6 border-l-4 border-black pl-6 ml-2">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <span className="font-bold text-sm bg-black text-white px-2 py-1">{exp.duration}</span>
              </div>
              <div className="text-lg font-bold mb-2">{exp.company}</div>
              <p className="font-medium text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-black uppercase mb-4 bg-yellow-400 inline-block px-2 transform rotate-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.split(',').map((s, i) => (
              <span key={i} className="border-2 border-black px-2 py-1 font-bold text-sm hover:bg-black hover:text-white transition-colors">
                {s.trim().toUpperCase()}
              </span>
            ))}
          </div>
        </section>

        <section>
           <h2 className="text-xl font-black uppercase mb-4 bg-yellow-400 inline-block px-2">Education</h2>
           <div className="space-y-4">
             {data.education.map((edu) => (
               <div key={edu.id} className="border-b-2 border-gray-200 pb-2">
                 <div className="font-black">{edu.school}</div>
                 <div>{edu.degree}</div>
                 <div className="text-sm font-bold text-gray-500">{edu.year}</div>
               </div>
             ))}
           </div>
        </section>
      </div>
    </div>
  </div>
);
