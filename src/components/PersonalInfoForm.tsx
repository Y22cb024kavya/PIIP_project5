import React from 'react';
import { PersonalInfo } from '../types/cv';
import { PhotoUpload } from './PhotoUpload';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        Personal Information
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex justify-center">
          <PhotoUpload 
            photo={data.photo} 
            onPhotoChange={(photo) => handleInputChange('photo', photo)}
          />
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="City, State/Country"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Title
              </label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Software Engineer, Marketing Manager, etc."
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary
        </label>
        <textarea
          value={data.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          rows={4}
          placeholder="Brief summary of your professional background, key skills, and career objectives..."
        />
      </div>
    </div>
  );
};