import { usePageTitle, useScrollToTop, useData } from '../hooks/useCustom';
import { Navbar, Footer } from '../components/Layout';
import { Link } from 'react-router-dom';
import { LoadingSpinner, EmptyState, SkeletonCard } from '../components/UI';
import { nameToSlug } from '../utils/dataCache';

export default function UniversitiesPage() {
  usePageTitle('Universities');
  useScrollToTop();

  const { data, loading, error } = useData('universities');
  const universities = data?.universities || [];

  if (loading) return <><Navbar /><LoadingSpinner /></>;
  if (error) return <><Navbar /><EmptyState icon="❌" title="Error" description={error} /></>;
  if (universities.length === 0) {
    return (
      <>
        <Navbar />
        <EmptyState icon="📚" title="No Universities" description="No universities found" />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Universities</h1>
          <p className="text-gray-600 mb-12">Explore top universities in Pakistan</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <Link
                key={uni.id}
                to={`/universities/${nameToSlug(uni.name)}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative h-48 bg-gray-200">
                  {uni.image && (
                    <img
                      src={uni.image}
                      alt={uni.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=' + uni.short;
                      }}
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{uni.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{uni.intro}</p>
                  <div className="flex gap-2 mb-4">
                    {uni.tests?.slice(0, 2).map((test, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {test}
                      </span>
                    ))}
                  </div>
                  <div className="text-brand-600 font-semibold hover:text-brand-700">
                    View Details →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
