import React from 'react';
import { Plus, Trash2, Code, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types/cv';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: '',
      startDate: '',
      endDate: '',
      current: false,
      url: '',
      github: '',
    };
    onChange([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(project => project.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <Code className="mr-3 text-purple-600" size={24} />
          Projects
        </h2>
        <button
          onClick={addProject}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          <Plus size={16} className="mr-2" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeProject(project.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Project name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used
                </label>
                <input
                  type="text"
                  value={project.technologies}
                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="React, Node.js, MongoDB, etc."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                  disabled={project.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              
              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={project.current}
                    onChange={(e) => {
                      updateProject(project.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateProject(project.id, 'endDate', '');
                      }
                    }}
                    className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Ongoing project</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Describe the project, your role, key features, and impact..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ExternalLink size={14} className="inline mr-1" />
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={project.url}
                  onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://your-project.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Github size={14} className="inline mr-1" />
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={project.github}
                  onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Code size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No projects added yet</p>
            <p className="text-sm">Click "Add Project" to showcase your work</p>
          </div>
        )}
      </div>
    </div>
  );
};