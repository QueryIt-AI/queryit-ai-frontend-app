'use client';

import React, { useState } from 'react';
import {
  BookOpenIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import SearchBar from './components/SearchBar';
import HelpCard from './components/HelpCard';

const faqs = [
  {
    question: 'How do I upload a new SOP?',
    answer: 'Navigate to the Documents page and click the "Upload" button. Follow the step-by-step process to add your document, fill in metadata, and submit for processing.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'We currently support PDF, DOCX, and TXT files. More formats will be added based on user feedback.',
  },
  {
    question: 'How does the AI analyze my documents?',
    answer: 'Our AI uses advanced natural language processing to understand your documents, extract key information, and provide relevant insights.',
  },
  {
    question: 'Can I edit documents after uploading?',
    answer: 'Yes, you can edit document metadata and version information. However, to maintain integrity, the original document content cannot be modified.',
  },
];

const tutorials = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of document management and AI analysis',
    icon: AcademicCapIcon,
    link: '/tutorials/getting-started',
  },
  {
    title: 'Document Upload Tutorial',
    description: 'Step-by-step guide to uploading and managing documents',
    icon: DocumentTextIcon,
    link: '/tutorials/document-upload',
  },
  {
    title: 'Using the AI Playground',
    description: 'Learn how to effectively interact with documents using AI',
    icon: RocketLaunchIcon,
    link: '/tutorials/playground',
  },
];

const releases = [
  {
    version: '2.1.0',
    date: 'January 15, 2025',
    changes: [
      'Added document categorization',
      'Improved search performance',
      'New AI analysis features',
    ],
  },
  {
    version: '2.0.0',
    date: 'January 1, 2025',
    changes: [
      'Major UI redesign',
      'Enhanced document processing',
      'Added support for more file formats',
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Help & Support</h1>
        <p className="mt-2 text-lg text-gray-600">
          Find answers, learn about features, and get in touch with our support team
        </p>
      </div>

      {/* Search */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HelpCard
          icon={BookOpenIcon}
          title="Knowledge Base"
          description="Browse our comprehensive guides and documentation"
          link="/help/knowledge-base"
        />
        <HelpCard
          icon={VideoCameraIcon}
          title="Video Tutorials"
          description="Watch step-by-step guides and feature walkthroughs"
          link="/help/tutorials"
        />
        <HelpCard
          icon={ChatBubbleLeftRightIcon}
          title="Contact Support"
          description="Get in touch with our support team"
          link="/help/contact"
        />
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#2861eb] transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <QuestionMarkCircleIcon className="w-5 h-5 text-[#2861eb] mr-2" />
                {faq.question}
              </h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tutorial Videos */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tutorial Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <HelpCard
              key={index}
              icon={tutorial.icon}
              title={tutorial.title}
              description={tutorial.description}
              link={tutorial.link}
            />
          ))}
        </div>
      </div>

      {/* Release Notes */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Release Notes</h2>
        <div className="space-y-4">
          {releases.map((release, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Version {release.version}
                </h3>
                <div className="flex items-center text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span className="text-sm">{release.date}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {release.changes.map((change, changeIndex) => (
                  <li
                    key={changeIndex}
                    className="flex items-center text-gray-600"
                  >
                    <span className="w-1.5 h-1.5 bg-[#2861eb] rounded-full mr-2" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <div className="text-center">
          <ChatBubbleLeftRightIcon className="w-12 h-12 text-[#2861eb] mx-auto" />
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Need More Help?
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any questions or issues
            you might have. We typically respond within 2 hours.
          </p>
          <button className="mt-6 px-6 py-3 bg-[#2861eb] text-white rounded-lg hover:bg-[#2861eb]/90 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
