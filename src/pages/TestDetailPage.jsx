import { usePageTitle, useScrollToTop } from '../hooks/useCustom';
import { Navbar, Footer } from '../components/Layout';
import { LoadingSpinner } from '../components/UI';

export default function TestDetailPage() {
  usePageTitle('Test Details');
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-3xl font-bold mb-2">Test Coming Soon</h1>
            <p className="text-gray-600">This test detail page is being prepared</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
