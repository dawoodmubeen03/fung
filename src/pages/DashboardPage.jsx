import { usePageTitle, useScrollToTop } from '../hooks/useCustom';
import { useAuth } from '../context/AuthContext';
import { Navbar, Footer } from '../components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI';

export default function DashboardPage() {
  usePageTitle('Dashboard');
  useScrollToTop();

  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600">Here's your personalized dashboard</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Tests Taken', value: '12', icon: '📝' },
              { label: 'Study Streak', value: '7 days', icon: '🔥' },
              { label: 'Average Score', value: '78%', icon: '🎯' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Featured Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">🎓 Recent Tests</h2>
              <div className="space-y-3">
                {['NUST NET', 'ECAT Prep', 'MDCAT Practice'].map((test, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{test}</span>
                    <span className="text-gray-500 text-sm">View →</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">📚 Recommended Resources</h2>
              <div className="space-y-3">
                {[
                  'Physics Formulas & Tricks',
                  'Math Chapter-Wise MCQs',
                  'Chemistry Quick Guide',
                ].map((resource, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{resource}</span>
                    <span className="text-gray-500 text-sm">Learn →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-brand text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Start Your Next Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'NUST NET', icon: '🎯' },
                { name: 'ECAT', icon: '⚙️' },
                { name: 'MDCAT', icon: '🧪' },
              ].map((test, i) => (
                <Link key={i} to="/calculator">
                  <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-6 transition">
                    <div className="text-4xl mb-3">{test.icon}</div>
                    <p className="font-bold">{test.name}</p>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
