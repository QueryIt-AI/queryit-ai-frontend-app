import { 
  DocumentPlusIcon, 
  BeakerIcon, 
  ChartBarIcon,
  BellIcon,
  DocumentIcon,
  ClockIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const metrics = [
  {
    name: 'SOPs Uploaded',
    value: '245',
    icon: DocumentIcon,
    trend: '+12% from last month',
    trendUp: true
  },
  {
    name: 'Active Workflows',
    value: '38',
    icon: ArrowPathIcon,
    trend: '+5% from last month',
    trendUp: true
  },
  {
    name: 'Avg. Processing Time',
    value: '1.2s',
    icon: ClockIcon,
    trend: '-8% from last month',
    trendUp: false
  },
  {
    name: 'Pending Updates',
    value: '12',
    icon: BellIcon,
    trend: '+2 from last week',
    trendUp: true
  }
];

const quickActions = [
  {
    name: 'Upload Document',
    href: '/dashboard/documents',
    icon: DocumentPlusIcon,
    description: 'Upload new SOPs or documentation'
  },
  {
    name: 'Playground',
    href: '/dashboard/playground',
    icon: BeakerIcon,
    description: 'Test and experiment with queries'
  },
  {
    name: 'Help & Support',
    href: '/dashboard/help',
    icon: QuestionMarkCircleIcon,
    description: 'Get assistance and support'
  }
];

const recentActivity = [
  {
    id: 1,
    type: 'upload',
    user: 'Sarah Chen',
    action: 'uploaded',
    target: 'Customer Service Guidelines v2.1',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'update',
    user: 'Mike Johnson',
    action: 'updated',
    target: 'Return Policy SOP',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'query',
    user: 'Alex Martinez',
    action: 'ran 15 queries on',
    target: 'Product Manual v3',
    time: '5 hours ago'
  }
];

const notifications = [
  {
    id: 1,
    title: 'System Update',
    message: 'New features added to document processing pipeline',
    type: 'info',
    time: '1 hour ago'
  },
  {
    id: 2,
    title: 'SOP Update Required',
    message: 'Customer Returns Policy needs review',
    type: 'warning',
    time: '2 hours ago'
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{metric.value}</p>
              </div>
              <div className="p-3 bg-[#2861eb]/10 rounded-lg">
                <metric.icon className="h-6 w-6 text-[#2861eb]" />
              </div>
            </div>
            <div className={`mt-2 text-sm ${metric.trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {metric.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#2861eb] hover:shadow-md transition-all group"
            >
              <div className="p-3 bg-[#2861eb]/10 rounded-lg group-hover:bg-[#2861eb]">
                <action.icon className="h-6 w-6 text-[#2861eb] group-hover:text-white" />
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">{action.name}</p>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="border-l-4 border-[#2861eb] pl-4 py-2">
                  <p className="font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#2861eb]/10 rounded-lg">
                      <DocumentIcon className="h-5 w-5 text-[#2861eb]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
