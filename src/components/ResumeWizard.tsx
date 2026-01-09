import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useProfileStore } from '../stores/useProfileStore';
import { generateResumeDoc, createResumeBlob } from '../utils/docGenerator';
import { Profile } from '../types';

const ResumeWizard: React.FC = () => {
  const { profile, setContact, setSummary, setSkills, setProfile, resumeFile } = useProfileStore();
  const [step, setStep] = useState(1);

  const { register, control, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<Profile>({
    defaultValues: profile,
    mode: 'onChange'
  });

  // Auto-save form changes to store
  useEffect(() => {
    const subscription = watch((value) => {
      if (value) {
        setProfile(value as Profile);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setProfile]);

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: 'experience',
  });

  // Education fields unused for now in this wizard step, but kept in store
  // const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
  //   control,
  //   name: 'education',
  // });

  const onSubmit: SubmitHandler<Profile> = (data) => {
    // Update store with final form data before generating
    setContact(data.contact);
    setSummary(data.summary);
    setSkills(data.skills);
    // Note: For arrays, we might need a bulk update method in the store or just rely on the fact 
    // that we are generating from the passed 'data' object here.
    // Ideally, we sync the store on every step or on final submit.
    
    generateResumeDoc(data);
  };

  const handleAutoApply = async () => {
    const data = getValues();
    // Update store
    setContact(data.contact);
    setSummary(data.summary);
    setSkills(data.skills);

    try {
      let url: string;

      if (resumeFile && resumeFile.content) {
        // Use uploaded file
        // resumeFile.content is a Data URL (data:application/pdf;base64,...)
        // We need to convert it back to a blob URL for the content script to fetch easily, 
        // OR just pass the Data URL directly if the content script handles it.
        // The content script expects a blob URL to fetch, but fetching a data URL works too!
        url = resumeFile.content;
        console.log("Using uploaded resume:", resumeFile.name);
      } else {
        // Generate new resume
        const blob = await createResumeBlob(data);
        url = URL.createObjectURL(blob);
        console.log("Generated new resume from profile");
      }

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'APPLY_WITH_PROFILE',
            data: {
              resumeBlobUrl: url,
              coverLetterText: '', // Empty for now, will be filled by AI if needed or user can copy-paste
            },
          }, (response) => {
             if (chrome.runtime.lastError) {
                 console.error("Error sending message:", chrome.runtime.lastError);
                 alert("Could not connect to the page. Make sure you are on a LinkedIn job page and reload it.");
             } else {
                 console.log("Application started:", response);
             }
          });
        }
      });
    } catch (error) {
      console.error('Error starting auto-apply:', error);
      alert('Failed to start auto-apply process.');
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Resume Wizard - Step {step}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* Step 1: Contact Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            
            <div>
              <input 
                {...register('contact.fullName', { required: 'Full Name is required' })} 
                placeholder="Full Name" 
                className={`w-full p-2 border rounded ${errors.contact?.fullName ? 'border-red-500' : ''}`} 
              />
              {errors.contact?.fullName && <p className="text-red-500 text-xs mt-1">{errors.contact.fullName.message}</p>}
            </div>

            <div>
              <input 
                {...register('contact.email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })} 
                placeholder="Email" 
                className={`w-full p-2 border rounded ${errors.contact?.email ? 'border-red-500' : ''}`} 
              />
              {errors.contact?.email && <p className="text-red-500 text-xs mt-1">{errors.contact.email.message}</p>}
            </div>

            <div>
              <input 
                {...register('contact.phone', { required: 'Phone number is required' })} 
                placeholder="Phone" 
                className={`w-full p-2 border rounded ${errors.contact?.phone ? 'border-red-500' : ''}`} 
              />
              {errors.contact?.phone && <p className="text-red-500 text-xs mt-1">{errors.contact.phone.message}</p>}
            </div>

            <div>
              <input 
                {...register('contact.linkedin', { 
                  required: 'LinkedIn URL is required',
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i,
                    message: "Invalid LinkedIn URL"
                  }
                })} 
                placeholder="LinkedIn URL" 
                className={`w-full p-2 border rounded ${errors.contact?.linkedin ? 'border-red-500' : ''}`} 
              />
              {errors.contact?.linkedin && <p className="text-red-500 text-xs mt-1">{errors.contact.linkedin.message}</p>}
            </div>

            <div>
              <input 
                {...register('contact.location', { required: 'Location is required' })} 
                placeholder="Location (City, State)" 
                className={`w-full p-2 border rounded ${errors.contact?.location ? 'border-red-500' : ''}`} 
              />
              {errors.contact?.location && <p className="text-red-500 text-xs mt-1">{errors.contact.location.message}</p>}
            </div>

            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => {
                  // Only proceed if step 1 is valid
                  if (!errors.contact) {
                    nextStep();
                  }
                }} 
                disabled={!!errors.contact}
                className={`px-4 py-2 rounded text-white ${!!errors.contact ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Professional Summary */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Professional Summary</h2>
            <textarea {...register('summary')} placeholder="Write a brief summary of your career..." className="w-full p-2 border rounded h-32" />
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">Back</button>
              <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Experience */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Experience</h2>
            {expFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded mb-2">
                <input {...register(`experience.${index}.company`)} placeholder="Company" className="w-full p-2 border rounded mb-2" />
                <input {...register(`experience.${index}.position`)} placeholder="Position" className="w-full p-2 border rounded mb-2" />
                <div className="flex gap-2 mb-2">
                  <input {...register(`experience.${index}.startDate`)} placeholder="Start Date" className="w-1/2 p-2 border rounded" />
                  <input {...register(`experience.${index}.endDate`)} placeholder="End Date" className="w-1/2 p-2 border rounded" />
                </div>
                <textarea {...register(`experience.${index}.description`)} placeholder="Description" className="w-full p-2 border rounded mb-2" />
                <button type="button" onClick={() => removeExp(index)} className="text-red-500">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => appendExp({ id: '', company: '', position: '', startDate: '', endDate: '', current: false, description: '' })} className="bg-green-500 text-white px-4 py-2 rounded">Add Experience</button>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">Back</button>
              <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
            </div>
          </div>
        )}

        {/* Step 4: Skills & Generate */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <p className="text-sm text-gray-500">Enter skills separated by commas</p>
            <textarea 
                placeholder="React, TypeScript, Node.js..." 
                className="w-full p-2 border rounded h-24"
                onChange={(e) => setValue('skills', e.target.value.split(',').map(s => s.trim()))}
            />
            
            <div className="flex justify-between mt-4">
              <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">Back</button>
              <div className="flex gap-2">
                <button type="button" onClick={handleAutoApply} className="bg-indigo-600 text-white px-4 py-2 rounded font-bold">Auto-Fill Application</button>
                <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded font-bold">Generate Resume (.docx)</button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResumeWizard;
