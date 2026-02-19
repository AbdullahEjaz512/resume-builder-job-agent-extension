import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { Profile, Experience, Education, ContactInfo } from '../types';

interface ProfileState {
  profile: Profile;
  setContact: (contact: ContactInfo) => void;
  setSummary: (summary: string) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Experience) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  removeEducation: (id: string) => void;
  setSkills: (skills: string[]) => void;
  setProfile: (profile: Profile) => void;
  resetProfile: () => void;
  resumeFile: { name: string; content: string } | null;
  setResumeFile: (file: { name: string; content: string } | null) => void;
}

const initialProfile: Profile = {
  contact: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    location: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

// Custom storage adapter for chrome.storage.local
const chromeStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      const result = await chrome.storage.local.get(name);
      return result[name] || null;
    }
    return localStorage.getItem(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ [name]: value });
    } else {
      localStorage.setItem(name, value);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.remove(name);
    } else {
      localStorage.removeItem(name);
    }
  },
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      setContact: (contact) =>
        set((state) => ({ profile: { ...state.profile, contact } })),
      setSummary: (summary) =>
        set((state) => ({ profile: { ...state.profile, summary } })),
      addExperience: (exp) =>
        set((state) => ({
          profile: {
            ...state.profile,
            experience: [...state.profile.experience, exp],
          },
        })),
      updateExperience: (id, exp) =>
        set((state) => ({
          profile: {
            ...state.profile,
            experience: state.profile.experience.map((e) =>
              e.id === id ? exp : e
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            experience: state.profile.experience.filter((e) => e.id !== id),
          },
        })),
      addEducation: (edu) =>
        set((state) => ({
          profile: {
            ...state.profile,
            education: [...state.profile.education, edu],
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            education: state.profile.education.filter((e) => e.id !== id),
          },
        })),
      setSkills: (skills) =>
        set((state) => ({ profile: { ...state.profile, skills } })),
      setProfile: (profile) => set({ profile }),
      resetProfile: () => set({ profile: initialProfile, resumeFile: null }),
      resumeFile: null,
      setResumeFile: (file) => set({ resumeFile: file }),
    }),
    {
      name: 'job-agent-profile-storage',
      storage: createJSONStorage(() => chromeStorage),
    }
  )
);
