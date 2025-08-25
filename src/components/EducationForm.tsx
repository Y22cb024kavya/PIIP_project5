import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { Education } from '../types/cv';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
    };
    onChange([...education, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <GraduationCap className="mr-3 text-teal-600" size={24} />
          Education
        </h2>
        <button
          onClick={addEducation}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
        >
          <Plus size={16} className="mr-2" />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="University/College name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree *
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Bachelor's, Master's, PhD, etc."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study *
                </label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Computer Science, Business, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="3.8/4.0"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  disabled={edu.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              
              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={edu.current}
                    onChange={(e) => {
                      updateEducation(edu.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateEducation(edu.id, 'endDate', '');
                      }
                    }}
                    className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Currently studying</span>
                </label>
              </div>
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No education added yet</p>
            <p className="text-sm">Click "Add Education" to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};