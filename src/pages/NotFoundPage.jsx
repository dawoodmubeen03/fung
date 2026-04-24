import { usePageTitle, useScrollToTop } from '../hooks/useCustom';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { Button } from '../components/UI';

export default function NotFoundPage() {
  usePageTitle('Page Not Found');
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-gradient-brand text-white">
        <div className="text-center px-4">
          <div className="text-9xl font-bold mb-4 opacity-80">404</div>
          <h1 className="text-5xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-white/80 mb-8 max-w-md">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link to="/">
            <Button variant="secondary" size="lg">
              Go Home
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
