'use client';

import { useState } from 'react';
import { 
  CheckCircleIcon,
  TagIcon,
  DocumentTextIcon,
  LinkIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import FileUpload from './components/FileUpload';

const steps = [
  { id: 1, name: 'Upload', description: 'Upload your document' },
  { id: 2, name: 'Metadata', description: 'Add document details' },
  { id: 3, name: 'Review', description: 'Review and confirm' }
];

const categories = [
  'HR Policies',
  'Customer Service',
  'Technical Documentation',
  'Legal',
  'Operations',
  'Training'
];

const relatedDocuments = [
  { id: 1, name: 'Employee Handbook v2.1', category: 'HR Policies' },
  { id: 2, name: 'Customer Service Guidelines', category: 'Customer Service' },
  { id: 3, name: 'Technical Support SOP', category: 'Technical Documentation' }
];

export default function Documents() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    title: '',
    category: '',
    effectiveDate: '',
    version: '',
    description: ''
  });
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    // Handle document submission logic here
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setSelectedFile(null);
      setMetadata({
        title: '',
        category: '',
        effectiveDate: '',
        version: '',
        description: ''
      });
      setSelectedDocs([]);
      setCurrentStep(1);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Progress Steps */}
      <nav aria-label="Progress">
        <ol className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <li key={step.id} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-20' : ''}`}>
              {stepIdx !== steps.length - 1 && (
                <div className="absolute top-4 w-full h-0.5 bg-gray-200" />
              )}
              <div className="relative flex flex-col items-center group">
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    step.id === currentStep
                      ? 'bg-[#2861eb] text-white'
                      : step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id < currentStep ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </span>
                <span className="text-sm font-medium text-gray-900 mt-2">
                  {step.name}
                </span>
                <span className="text-xs text-gray-500">{step.description}</span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-2 text-green-500">
              <CheckCircleIcon className="h-6 w-6" />
              <span className="text-lg font-medium">Document uploaded successfully!</span>
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Upload Document</h2>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Document Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Document Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2861eb] focus:outline-none focus:ring-1 focus:ring-[#2861eb]"
                  value={metadata.title}
                  onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2861eb] focus:outline-none focus:ring-1 focus:ring-[#2861eb]"
                  value={metadata.category}
                  onChange={(e) => setMetadata({ ...metadata, category: e.target.value })}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Effective Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2861eb] focus:outline-none focus:ring-1 focus:ring-[#2861eb]"
                  value={metadata.effectiveDate}
                  onChange={(e) => setMetadata({ ...metadata, effectiveDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Version
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2861eb] focus:outline-none focus:ring-1 focus:ring-[#2861eb]"
                  value={metadata.version}
                  onChange={(e) => setMetadata({ ...metadata, version: e.target.value })}
                  placeholder="e.g., 1.0"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2861eb] focus:outline-none focus:ring-1 focus:ring-[#2861eb]"
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Review & Link</h2>
            
            {/* Document Summary */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-start space-x-4">
                <DocumentTextIcon className="h-6 w-6 text-[#2861eb]" />
                <div>
                  <h3 className="font-medium text-gray-900">{metadata.title || selectedFile?.name}</h3>
                  <p className="text-sm text-gray-500">
                    {metadata.category} • Version {metadata.version}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Documents */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Link Related Documents</h3>
              <div className="space-y-2">
                {relatedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      selectedDocs.includes(doc.id)
                        ? 'border-[#2861eb] bg-[#2861eb]/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <TagIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedDocs((prev) =>
                          prev.includes(doc.id)
                            ? prev.filter((id) => id !== doc.id)
                            : [...prev, doc.id]
                        );
                      }}
                      className={`p-1 rounded-md ${
                        selectedDocs.includes(doc.id)
                          ? 'text-[#2861eb] hover:bg-[#2861eb]/10'
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {selectedDocs.includes(doc.id) ? (
                        <XMarkIcon className="h-5 w-5" />
                      ) : (
                        <LinkIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          )}
          {currentStep < 3 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="ml-auto px-4 py-2 bg-[#2861eb] text-white rounded-md hover:bg-[#2861eb]/90"
            >
              Continue
            </button>
          )}
          {currentStep === 3 && (
            <button
              onClick={handleSubmit}
              className="ml-auto px-4 py-2 bg-[#2861eb] text-white rounded-md hover:bg-[#2861eb]/90"
            >
              Upload Document
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
