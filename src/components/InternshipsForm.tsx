import React from 'react';
import { Plus, Trash2, Building } from 'lucide-react';
import { Internship } from '../types/cv';

interface InternshipsFormProps {
  internships: Internship[];
  onChange: (internships: Internship[]) => void;
}

export const InternshipsForm: React.FC<InternshipsFormProps> = ({ internships, onChange }) => {
  const addInternship = () => {
    const newInternship: Internship = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: '',
    };
    onChange([...internships, newInternship]);
  };

  const removeInternship = (id: string) => {
    onChange(internships.filter(internship => internship.id !== id));
  };

  const updateInternship = (id: string, field: keyof Internship, value: any) => {
    onChange(internships.map(internship => 
      internship.id === id ? { ...internship, [field]: value } : internship
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <Building className="mr-3 text-indigo-600" size={24} />
          Internships
        </h2>
        <button
          onClick={addInternship}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          <Plus size={16} className="mr-2" />
          Add Internship
        </button>
      </div>

      <div className="space-y-6">
        {internships.map((internship) => (
          <div key={internship.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeInternship(internship.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={internship.company}
                  onChange={(e) => updateInternship(internship.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  value={internship.position}
                  onChange={(e) => updateInternship(internship.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Intern position"
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
                  value={internship.startDate}
                  onChange={(e) => updateInternship(internship.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={internship.endDate}
                  onChange={(e) => updateInternship(internship.id, 'endDate', e.target.value)}
                  disabled={internship.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              
              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={internship.current}
                    onChange={(e) => {
                      updateInternship(internship.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateInternship(internship.id, 'endDate', '');
                      }
                    }}
                    className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Current internship</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={internship.location}
                onChange={(e) => updateInternship(internship.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="City, State/Country or Remote"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={internship.description}
                onChange={(e) => updateInternship(internship.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Describe your responsibilities, projects worked on, and skills gained..."
              />
            </div>
          </div>
        ))}

        {internships.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Building size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No internships added yet</p>
            <p className="text-sm">Click "Add Internship" to showcase your experience</p>
          </div>
        )}
      </div>
    </div>
  );
};