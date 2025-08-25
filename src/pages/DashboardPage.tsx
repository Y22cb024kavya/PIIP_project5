import React, { useState } from 'react';
import { FileText, Download, Eye, EyeOff, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PersonalInfoForm } from '../components/PersonalInfoForm';
import { ExperienceForm } from '../components/ExperienceForm';
import { EducationForm } from '../components/EducationForm';
import { SkillsForm } from '../components/SkillsForm';
import { ProjectsForm } from '../components/ProjectsForm';
import { InternshipsForm } from '../components/InternshipsForm';
import { AchievementsForm } from '../components/AchievementsForm';
import { CVPreview } from '../components/CVPreview';
import { CVData } from '../types/cv';
import { generatePDF } from '../utils/pdfGenerator';

const initialData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    photo: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  internships: [],
  achievements: [],
};

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [showPreview, setShowPreview] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const updatePersonalInfo = (personalInfo: CVData['personalInfo']) => {
    setCvData(prev => ({ ...prev, personalInfo }));
  };

  const updateExperience = (experience: CVData['experience']) => {
    setCvData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: CVData['education']) => {
    setCvData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: CVData['skills']) => {
    setCvData(prev => ({ ...prev, skills }));
  };

  const updateProjects = (projects: CVData['projects']) => {
    setCvData(prev => ({ ...prev, projects }));
  };

  const updateInternships = (internships: CVData['internships']) => {
    setCvData(prev => ({ ...prev, internships }));
  };

  const updateAchievements = (achievements: CVData['achievements']) => {
    setCvData(prev => ({ ...prev, achievements }));
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const filename = cvData.personalInfo.fullName 
        ? `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`
        : 'My_CV.pdf';
      
      await generatePDF('cv-content', filename);
    } catch (error) {
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">
                Digital CV Generator
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <User size={18} className="mr-2" />
                <span className="text-sm font-medium">{user?.fullName}</span>
              </div>
              
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {showPreview ? (
                  <>
                    <EyeOff size={18} className="mr-2" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye size={18} className="mr-2" />
                    Show Preview
                  </>
                )}
              </button>
              
              <button
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF || !cvData.personalInfo.fullName}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                <Download size={18} className="mr-2" />
                {isGeneratingPDF ? 'Generating...' : 'Export PDF'}
              </button>
              
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-4xl mx-auto'}`}>
          {/* Forms Section */}
          <div className="space-y-8">
            <PersonalInfoForm 
              data={cvData.personalInfo} 
              onChange={updatePersonalInfo} 
            />
            
            <ExperienceForm 
              experiences={cvData.experience} 
              onChange={updateExperience} 
            />
            
            <EducationForm 
              education={cvData.education} 
              onChange={updateEducation} 
            />
            
            <SkillsForm 
              skills={cvData.skills} 
              onChange={updateSkills} 
            />
            
            <ProjectsForm 
              projects={cvData.projects} 
              onChange={updateProjects} 
            />
            
            <InternshipsForm 
              internships={cvData.internships} 
              onChange={updateInternships} 
            />
            
            <AchievementsForm 
              achievements={cvData.achievements} 
              onChange={updateAchievements} 
            />
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-8 lg:self-start">
              <CVPreview data={cvData} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Create professional CVs with ease. Export to PDF and land your dream job!
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};