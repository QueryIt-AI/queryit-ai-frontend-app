import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface HelpCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  link: string;
}

export default function HelpCard({ icon: Icon, title, description, link }: HelpCardProps) {
  return (
    <a
      href={link}
      className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#2861eb] hover:shadow-md transition-all group"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="p-3 bg-[#2861eb]/5 rounded-lg group-hover:bg-[#2861eb]/10">
            <Icon className="w-6 h-6 text-[#2861eb]" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#2861eb]">
            {title}
          </h3>
          <p className="mt-1 text-gray-500">{description}</p>
        </div>
        <div className="flex-shrink-0">
          <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-[#2861eb] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}
