import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Hook to load data with caching
export function useData(filename) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { fetchData } = await import('../utils/dataCache');
        const result = await fetchData(filename);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filename]);

  return { data, loading, error };
}

// Hook for document title
export function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | FUNGEP`;
    return () => {
      document.title = 'FUNGEP';
    };
  }, [title]);
}

// Hook for scroll to top on route change
export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
