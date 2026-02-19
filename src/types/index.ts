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
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  website?: string;
}

export interface Profile {
  contact: ContactInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export interface JobDescription {
  title: string;
  company: string;
  description: string;
  url?: string;
}
