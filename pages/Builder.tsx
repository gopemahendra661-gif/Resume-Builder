
import React, { useState, useEffect, useRef } from 'react';
import { ResumeData, Education, Experience, TemplateType } from '../types';
import { ModernTemplate, MinimalTemplate, ProfessionalTemplate, CreativeTemplate, ExecutiveTemplate } from '../components/ResumeTemplates';
import { Plus, Trash2, Download, LayoutTemplate, Upload, X } from 'lucide-react';
import { clsx } from 'clsx';

const initialData: ResumeData = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 890",
  location: "New York, NY",
  website: "linkedin.com/in/johndoe",
  summary: "Experienced Software Engineer with a passion for developing scalable web applications.",
  education: [
    { id: '1', school: "University of Technology", degree: "B.S. Computer Science", year: "2018 - 2022", city: "New York, NY" }
  ],
  experience: [
    { id: '1', company: "Tech Solutions Inc.", role: "Senior Developer", duration: "2022 - Present", description: "Led a team of 5 developers to build a cloud-native SaaS platform.", city: "Remote" }
  ],
  skills: "JavaScript, React, Node.js, TypeScript, AWS, Docker"
};

export const Builder: React.FC = () => {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  const handleChange = (field: keyof ResumeData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size too large. Please upload an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setData(prev => ({ ...prev, photoUrl: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleArrayChange = (section: 'education' | 'experience', id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map((item: any) => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addItem = (section: 'education' | 'experience') => {
    const newId = Date.now().toString();
    if (section === 'education') {
      setData(prev => ({
        ...prev,
        education: [...prev.education, { id: newId, school: 'New School', degree: 'Degree', year: 'Year', city: 'City' }]
      }));
    } else {
      setData(prev => ({
        ...prev,
        experience: [...prev.experience, { id: newId, company: 'New Company', role: 'Role', duration: 'Date', description: 'Description', city: 'City' }]
      }));
    }
  };

  const removeItem = (section: 'education' | 'experience', id: string) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter((item: any) => item.id !== id)
    }));
  };

  const exportPDF = () => {
    const element = document.getElementById('resume-preview-content');
    if (!element) return;
    const opt = {
      margin: 0,
      filename: `Resume_${data.fullName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    window.html2pdf().set(opt).from(element).save();
  };

  // Helper for Input fields
  const InputGroup = ({ label, value, onChange, placeholder, type = "text", textArea = false }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      {textArea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
        />
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Builder</h1>
        <div className="flex gap-2">
          {/* Mobile Tab Toggle */}
          <div className="flex lg:hidden bg-gray-200 dark:bg-gray-700 rounded-lg p-1 mr-2">
            <button 
              onClick={() => setActiveTab('editor')} 
              className={clsx("px-3 py-1 text-sm rounded-md", activeTab === 'editor' ? "bg-white shadow text-primary-600" : "text-gray-600 dark:text-gray-300")}
            >
              Edit
            </button>
            <button 
              onClick={() => setActiveTab('preview')} 
              className={clsx("px-3 py-1 text-sm rounded-md", activeTab === 'preview' ? "bg-white shadow text-primary-600" : "text-gray-600 dark:text-gray-300")}
            >
              Preview
            </button>
          </div>
          <button onClick={exportPDF} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-8 overflow-hidden">
        {/* Editor Panel */}
        <div className={clsx("flex-1 overflow-y-auto pr-2 space-y-6 pb-20", activeTab === 'preview' && "hidden lg:block")}>
          
          {/* Template Selector */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-bold uppercase text-gray-500 mb-3 flex items-center">
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Choose Template
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {(['modern', 'minimal', 'professional', 'creative', 'executive'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={clsx(
                    "px-3 py-2 text-sm rounded-lg border capitalize transition-all",
                    template === t 
                      ? "border-primary-500 bg-primary-50 text-primary-700 font-medium" 
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Personal Info</h2>
            
            {/* Photo Upload */}
            <div className="mb-6 flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                {data.photoUrl ? (
                  <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="text-gray-400" size={24} />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md font-medium transition-colors"
                >
                  Upload Photo
                </button>
                {data.photoUrl && (
                  <button 
                    onClick={removePhoto}
                    className="text-xs text-red-500 hover:text-red-600 flex items-center"
                  >
                    <X size={12} className="mr-1" /> Remove
                  </button>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="Full Name" value={data.fullName} onChange={(v: string) => handleChange('fullName', v)} />
              <InputGroup label="Job Title / Headline" value={data.location} onChange={(v: string) => handleChange('location', v)} placeholder="e.g. Software Engineer, London" />
              <InputGroup label="Email" value={data.email} onChange={(v: string) => handleChange('email', v)} />
              <InputGroup label="Phone" value={data.phone} onChange={(v: string) => handleChange('phone', v)} />
              <InputGroup label="Website / LinkedIn" value={data.website} onChange={(v: string) => handleChange('website', v)} />
            </div>
            <InputGroup label="Professional Summary" value={data.summary} onChange={(v: string) => handleChange('summary', v)} textArea />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Experience</h2>
              <button onClick={() => addItem('experience')} className="p-1 text-primary-600 hover:bg-primary-50 rounded"><Plus size={20} /></button>
            </div>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg relative group">
                <button onClick={() => removeItem('experience', exp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Company" value={exp.company} onChange={(v: string) => handleArrayChange('experience', exp.id, 'company', v)} />
                  <InputGroup label="Role" value={exp.role} onChange={(v: string) => handleArrayChange('experience', exp.id, 'role', v)} />
                  <InputGroup label="Duration" value={exp.duration} onChange={(v: string) => handleArrayChange('experience', exp.id, 'duration', v)} />
                  <InputGroup label="Location" value={exp.city} onChange={(v: string) => handleArrayChange('experience', exp.id, 'city', v)} />
                </div>
                <InputGroup label="Description" value={exp.description} onChange={(v: string) => handleArrayChange('experience', exp.id, 'description', v)} textArea />
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Education</h2>
              <button onClick={() => addItem('education')} className="p-1 text-primary-600 hover:bg-primary-50 rounded"><Plus size={20} /></button>
            </div>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg relative group">
                 <button onClick={() => removeItem('education', edu.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="School" value={edu.school} onChange={(v: string) => handleArrayChange('education', edu.id, 'school', v)} />
                  <InputGroup label="Degree" value={edu.degree} onChange={(v: string) => handleArrayChange('education', edu.id, 'degree', v)} />
                  <InputGroup label="Year" value={edu.year} onChange={(v: string) => handleArrayChange('education', edu.id, 'year', v)} />
                  <InputGroup label="City" value={edu.city} onChange={(v: string) => handleArrayChange('education', edu.id, 'city', v)} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Skills</h2>
            <InputGroup 
              label="Skills (comma separated)" 
              value={data.skills} 
              onChange={(v: string) => handleChange('skills', v)} 
              placeholder="e.g. JavaScript, Project Management, Design"
              textArea
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className={clsx("flex-1 bg-gray-200 dark:bg-gray-900 overflow-y-auto rounded-xl border border-gray-300 dark:border-gray-700 flex justify-center p-8", activeTab === 'editor' && "hidden lg:flex")}>
          <div className="w-[210mm] shadow-2xl origin-top transform scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.9] transition-transform">
             {template === 'modern' && <ModernTemplate data={data} />}
             {template === 'minimal' && <MinimalTemplate data={data} />}
             {template === 'professional' && <ProfessionalTemplate data={data} />}
             {template === 'creative' && <CreativeTemplate data={data} />}
             {template === 'executive' && <ExecutiveTemplate data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};
