// Data utilities for caching and fetching
const CACHE_EXPIRY = 1 * 60 * 60 * 1000; // 1 hour

export async function fetchData(filename) {
  const cacheKey = `fungep_cache_${filename}`;
  const cached = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(`${cacheKey}_time`);

  // Return cached data if still valid
  if (cached && cachedTime && Date.now() - parseInt(cachedTime) < CACHE_EXPIRY) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Failed to parse cached data:', e);
    }
  }

  // Fetch fresh data
  try {
    const response = await fetch(`/data/${filename}.json`);
    if (!response.ok) throw new Error(`Failed to fetch ${filename}`);
    
    const data = await response.json();
    
    // Cache the data
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
    
    return data;
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    // Return empty data structure as fallback
    return getDefaultData(filename);
  }
}

function getDefaultData(filename) {
  const defaults = {
    universities: { universities: [] },
    fields: { fields: [] },
    tests: { tests: [] },
    resources: { resources: [] },
  };
  return defaults[filename] || {};
}

// Convert name to slug for URLs
export function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Convert slug back to name
export function slugToName(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
  }).format(amount);
}

// Format date
export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}
