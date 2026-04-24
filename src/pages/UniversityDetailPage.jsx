import { usePageTitle, useScrollToTop, useData } from '../hooks/useCustom';
import { useParams } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { slugToName, formatDate } from '../utils/dataCache';
import { LoadingSpinner, EmptyState, Button } from '../components/UI';

export default function UniversityDetailPage() {
  const { slug } = useParams();
  const { data, loading } = useData('universities');
  usePageTitle(slugToName(slug || ''));
  useScrollToTop();

  const university = data?.universities?.find(
    uni => uni.id === slug?.replace(/-/g, '-').toLowerCase() ||
            uni.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (loading) return <><Navbar /><LoadingSpinner /></>;
  if (!university) {
    return (
      <>
        <Navbar />
        <EmptyState icon="❌" title="University Not Found" description="The university you're looking for doesn't exist" />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 pb-20">
        {/* Hero Section */}
        <section className="relative h-96 bg-gray-200 overflow-hidden">
          {university.images?.[0] && (
            <img
              src={university.images[0]}
              alt={university.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x400?text=' + university.name;
              }}
            />
          )}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
              <h1 className="text-5xl font-bold text-white">{university.name}</h1>
              <p className="text-white/90 mt-2">{university.intro}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Admission Info */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">📋 Admission Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Session</p>
                      <p className="text-lg font-bold">{university.admission.session}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Status</p>
                      <p className="text-lg font-bold text-green-600">{university.admission.status}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Start Date</p>
                      <p className="text-lg font-bold">{university.admission.start}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Deadline</p>
                      <p className="text-lg font-bold">{university.admission.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* Programs */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">🎓 Programs Offered</h2>
                  <ul className="space-y-3">
                    {university.programs?.map((prog, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-brand-600 mr-3">✓</span>
                        <span className="font-medium">{prog}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fees */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">💰 Fee Structure</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Admission Fee:</span>
                      <span className="font-bold">PKR {university.fee?.admissionFee?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span>Semester Fee:</span>
                      <span className="font-bold">PKR {university.fee?.semesterFee?.toLocaleString()}</span>
                    </div>
                    {university.fee?.note && (
                      <p className="text-sm text-gray-600 mt-4 italic">{university.fee.note}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Tests */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">📝 Required Tests</h3>
                  <div className="space-y-2">
                    {university.tests?.map((test, i) => (
                      <div key={i} className="px-3 py-2 bg-blue-50 rounded-lg text-blue-700 font-medium">
                        {test}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <a href={university.applyLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="w-full text-center">
                    Apply Now →
                  </Button>
                </a>

                {/* Merit Lists */}
                {university.merit && university.merit.length > 0 && (
                  <div className="bg-white rounded-xl p-8 shadow-sm">
                    <h3 className="text-xl font-bold mb-4">📊 Merit Lists</h3>
                    <div className="space-y-3">
                      {university.merit.map((m, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">{m.year}</p>
                          {m.image && (
                            <img
                              src={m.image}
                              alt={m.year}
                              className="w-full rounded-lg mt-2"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x200?text=Merit+List';
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
