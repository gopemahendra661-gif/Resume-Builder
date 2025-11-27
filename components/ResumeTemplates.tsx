
import React from 'react';
import { ResumeData } from '../types';

interface TemplateProps {
  data: ResumeData;
}

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
