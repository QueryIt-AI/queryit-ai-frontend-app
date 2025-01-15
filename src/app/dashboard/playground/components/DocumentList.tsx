import { useState } from 'react';
import { 
  DocumentIcon, 
  MagnifyingGlassIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';

interface Document {
  id: string;
  title: string;
  category: string;
  version: string;
  lastModified: string;
}

interface DocumentListProps {
  onSelect: (document: Document) => void;
  selectedDocument?: Document | null;
}

const getDocumentIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'sop':
      return DocumentCheckIcon;
    case 'report':
      return DocumentChartBarIcon;
    default:
      return DocumentTextIcon;
  }
};

// This would be replaced with actual API call to fetch documents
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Quality Control Process',
    category: 'SOP',
    version: '2.1',
    lastModified: '2024-01-15'
  },
  {
    id: '2',
    title: 'Customer Feedback Analysis',
    category: 'Report',
    version: '1.0',
    lastModified: '2024-01-14'
  },
  {
    id: '3',
    title: 'Equipment Maintenance',
    category: 'SOP',
    version: '3.2',
    lastModified: '2024-01-13'
  }
];

export default function DocumentList({ onSelect, selectedDocument }: DocumentListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2861eb] focus:border-transparent"
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto">
        {filteredDocuments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredDocuments.map((doc) => {
              const IconComponent = getDocumentIcon(doc.category);
              return (
                <button
                  key={doc.id}
                  onClick={() => onSelect(doc)}
                  className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors ${
                    selectedDocument?.id === doc.id ? 'bg-[#2861eb]/5' : ''
                  }`}
                >
                  <IconComponent className="w-6 h-6 text-[#2861eb] flex-shrink-0" />
                  <div className="ml-4 flex-1 text-left">
                    <h4 className="text-sm font-medium text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-500">
                      {doc.category} • Version {doc.version}
                    </p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No documents found matching your search
          </div>
        )}
      </div>
    </div>
  );
}
