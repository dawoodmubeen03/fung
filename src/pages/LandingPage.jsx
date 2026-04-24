import { usePageTitle, useScrollToTop } from '../hooks/useCustom';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { Button } from '../components/UI';

export default function LandingPage() {
  usePageTitle('Home');
  useScrollToTop();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="mt-16 min-h-[calc(100vh-64px)] bg-gradient-brand flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-in">
            Pakistan's #1 Entry Test Platform
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-in" style={{ animationDelay: '0.1s' }}>
            Master ECAT, NET, MDCAT and more. Calculate aggregates for NUST, FAST, UET, and all major universities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/login">
              <Button variant="primary" size="lg" className="text-white">
                Get Started
              </Button>
            </Link>
            <Link to="/universities">
              <Button variant="secondary" size="lg">
                Explore Universities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Why Choose FUNGEP?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📚',
                title: 'Comprehensive Resources',
                description: 'Past papers, MCQs, study guides for all major entry tests.',
              },
              {
                icon: '🧮',
                title: 'Smart Calculators',
                description: 'Calculate your aggregate for NUST, FAST, UET instantly.',
              },
              {
                icon: '📊',
                title: 'Merit Predictor',
                description: 'Check your chances and see closing merits from previous years.',
              },
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Universities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Popular Universities</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'NUST', icon: '🎓' },
              { name: 'FAST', icon: '💻' },
              { name: 'UET', icon: '⚙️' },
              { name: 'GIKI', icon: '🔬' },
              { name: 'PIEAS', icon: '⚛️' },
              { name: 'COMSATS', icon: '🖥️' },
              { name: 'ITU', icon: '📱' },
              { name: 'LUMS', icon: '📖' },
            ].map((uni, i) => (
              <Link key={i} to="/universities">
                <div className="p-6 bg-white rounded-xl hover:shadow-lg hover:scale-105 transition text-center cursor-pointer">
                  <div className="text-4xl mb-2">{uni.icon}</div>
                  <p className="font-bold text-gray-800">{uni.name}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/universities">
              <Button variant="primary" size="lg">
                View All Universities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-brand text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ace Your Entry Test?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who've successfully used FUNGEP to prepare for their dream universities.
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Sign Up Now (Free)
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
