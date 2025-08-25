import React from 'react';
import { Plus, Trash2, Target } from 'lucide-react';
import { Skill } from '../types/cv';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Technical',
    };
    onChange([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;
  const skillCategories = ['Technical', 'Soft', 'Language', 'Other'] as const;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <Target className="mr-3 text-orange-600" size={24} />
          Skills
        </h2>
        <button
          onClick={addSkill}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
        >
          <Plus size={16} className="mr-2" />
          Add Skill
        </button>
      </div>

      <div className="grid gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Skill name"
              />
            </div>
            
            <div className="w-32">
              <select
                value={skill.category}
                onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {skillCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="w-32">
              <select
                value={skill.level}
                onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {skillLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Target size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No skills added yet</p>
            <p className="text-sm">Click "Add Skill" to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};