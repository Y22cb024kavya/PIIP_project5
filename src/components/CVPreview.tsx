import React from 'react';
import { CVData } from '../types/cv';
import { Mail, Phone, MapPin, User, ExternalLink, Github, Calendar, MapPin as LocationIcon } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-green-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Beginner': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getSkillWidth = (level: string) => {
    switch (level) {
      case 'Expert': return '100%';
      case 'Advanced': return '75%';
      case 'Intermediate': return '50%';
      case 'Beginner': return '25%';
      default: return '50%';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-4">CV Preview</h2>
      </div>
      
      <div id="cv-content" className="p-8 max-w-4xl mx-auto bg-white" style={{ minHeight: '297mm' }}>
        {/* Header Section */}
        <div className="flex items-start gap-6 mb-8 pb-6 border-b border-gray-200">
          <div className="flex-shrink-0">
            {data.personalInfo.photo ? (
              <img
                src={data.personalInfo.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-blue-100">
                <User size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            {data.personalInfo.title && (
              <p className="text-xl text-blue-600 mb-3">{data.personalInfo.title}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={14} />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1">
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1">
              Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {['Technical', 'Soft', 'Language', 'Other'].map(category => {
                const categorySkills = data.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">{category} Skills</h3>
                    <div className="space-y-3">
                      {categorySkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                            <span className="text-xs text-gray-500">{skill.level}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getSkillColor(skill.level)}`}
                              style={{ width: getSkillWidth(skill.level) }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1">
              Projects
            </h2>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                      {project.technologies && (
                        <p className="text-sm text-blue-600 font-medium mb-1">
                          Technologies: {project.technologies}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                            <ExternalLink size={12} />
                            Live Demo
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                            <Github size={12} />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      {formatDate(project.startDate)} - {project.current ? 'Present' : formatDate(project.endDate)}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internships */}
        {data.internships.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1">
              Internships
            </h2>
            <div className="space-y-6">
              {data.internships.map((internship) => (
                <div key={internship.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{internship.position}</h3>
                      <p className="text-blue-600 font-medium">{internship.company}</p>
                      {internship.location && (
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <LocationIcon size={12} />
                          {internship.location}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      {formatDate(internship.startDate)} - {internship.current ? 'Present' : formatDate(internship.endDate)}
                    </div>
                  </div>
                  {internship.description && (
                    <p className="text-gray-700 leading-relaxed">{internship.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {data.achievements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1">
              Achievements
            </h2>
            <div className="space-y-4">
              {data.achievements.map((achievement) => (
                <div key={achievement.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{achievement.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          {achievement.category}
                        </span>
                        {achievement.organization && (
                          <span>{achievement.organization}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 text-right flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(achievement.date)}
                    </div>
                  </div>
                  {achievement.description && (
                    <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};