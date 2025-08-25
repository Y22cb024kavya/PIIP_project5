export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Language' | 'Other';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  startDate: string;
  endDate: string;
  current: boolean;
  url?: string;
  github?: string;
}

export interface Internship {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  organization?: string;
  category: 'Award' | 'Certification' | 'Publication' | 'Competition' | 'Other';
}

export interface CVData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  internships: Internship[];
  achievements: Achievement[];
}