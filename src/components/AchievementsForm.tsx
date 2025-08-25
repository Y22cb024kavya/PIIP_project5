import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';
import { Achievement } from '../types/cv';

interface AchievementsFormProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

export const AchievementsForm: React.FC<AchievementsFormProps> = ({ achievements, onChange }) => {
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
      organization: '',
      category: 'Award',
    };
    onChange([...achievements, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    onChange(achievements.filter(achievement => achievement.id !== id));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: any) => {
    onChange(achievements.map(achievement => 
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    ));
  };

  const categories = ['Award', 'Certification', 'Publication', 'Competition', 'Other'] as const;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <Award className="mr-3 text-yellow-600" size={24} />
          Achievements
        </h2>
        <button
          onClick={addAchievement}
          className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
        >
          <Plus size={16} className="mr-2" />
          Add Achievement
        </button>
      </div>

      <div className="space-y-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeAchievement(achievement.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievement Title *
                </label>
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Achievement name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={achievement.category}
                  onChange={(e) => updateAchievement(achievement.id, 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="month"
                  value={achievement.date}
                  onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization/Institution
                </label>
                <input
                  type="text"
                  value={achievement.organization}
                  onChange={(e) => updateAchievement(achievement.id, 'organization', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Awarding organization"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={achievement.description}
                onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Describe the achievement, its significance, and any relevant details..."
              />
            </div>
          </div>
        ))}

        {achievements.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Award size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No achievements added yet</p>
            <p className="text-sm">Click "Add Achievement" to highlight your accomplishments</p>
          </div>
        )}
      </div>
    </div>
  );
};