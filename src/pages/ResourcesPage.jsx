import { usePageTitle, useScrollToTop, useData } from '../hooks/useCustom';
import { Navbar, Footer } from '../components/Layout';
import { LoadingSpinner, EmptyState } from '../components/UI';

export default function ResourcesPage() {
  usePageTitle('Resources');
  useScrollToTop();

  const { data, loading, error } = useData('resources');
  const resources = data?.resources || [];

  if (loading) return <><Navbar /><LoadingSpinner /></>;
  if (error) return <><Navbar /><EmptyState icon="❌" title="Error" description={error} /></>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Study Resources</h1>
          <p className="text-gray-600 mb-12">Comprehensive study materials for all entry tests</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.length > 0 ? (
              resources.map((resource, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{resource.icon || '📚'}</div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <a
                    href={resource.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 font-semibold hover:text-brand-700"
                  >
                    Access →
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState
                  icon="📚"
                  title="No Resources Yet"
                  description="Check back soon for study materials"
                />
              </div>
            )}
          </div>

          {/* Resource Categories */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold gradient-text mb-8">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '📄', name: 'Past Papers', count: '150+' },
                { icon: '❓', name: 'MCQs', count: '5000+' },
                { icon: '📖', name: 'Notes', count: '200+' },
                { icon: '🎥', name: 'Video Tutorials', count: '100+' },
              ].map((cat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition cursor-pointer hover:scale-105"
                >
                  <div className="text-5xl mb-3">{cat.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
                  <p className="text-brand-600 font-bold">{cat.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
