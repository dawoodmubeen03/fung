# FUNGEP - Pakistan's #1 Entry Test Prep Platform

**Modern React SPA | Production-Ready | Open Source**

> Pakistan's most comprehensive entry test preparation platform with aggregate calculators, study resources, and admission guidance for NUST, FAST, UET, GIKI, PIEAS, and more.

---

## 🌟 Features

- ✅ **React SPA** - Single Page Application with React Router v6
- ✅ **Protected Routes** - Authentication system with Context API
- ✅ **Smart Caching** - localStorage-based data caching (1-hour expiry)
- ✅ **Lazy Loading** - Code splitting for optimal performance
- ✅ **Responsive Design** - Mobile-first Tailwind CSS
- ✅ **Aggregate Calculators** - NUST, FAST, UET, and more
- ✅ **University Database** - 20+ top universities in Pakistan
- ✅ **Study Resources** - Past papers, MCQs, study guides
- ✅ **Vercel Ready** - Pre-configured for seamless deployment

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/fung.git
cd fung

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel (automatic via Git)
git push origin main
```

---

## 📁 Project Structure

```
fung/
├── src/
│   ├── pages/              # Route components (lazy-loaded)
│   ├── components/         # Reusable UI components
│   ├── context/            # Auth state management
│   ├── routes/             # Routing configuration
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
├── data/                   # JSON data (universities, tests, resources)
├── public/                 # Static assets
├── vite.config.js          # Build config
├── tailwind.config.js      # Tailwind settings
└── vercel.json             # Deployment config
```

---

## 🔗 Routes

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/` | Landing page | No |
| `/login` | User login | No |
| `/register` | User registration | No |
| `/dashboard` | User dashboard | **Yes** |
| `/universities` | List of universities | No |
| `/universities/:id` | University details | No |
| `/calculator` | Aggregate calculator | No |
| `/resources` | Study materials | No |

---

## 🔐 Authentication

### Current Implementation (Mock)

Login with any email and password:

```
Email: user@example.com
Password: anypassword
```

### Integration with Firebase

To use real authentication, update `src/context/AuthContext.jsx`:

```javascript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const login = async (email, password) => {
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  // ... save user data
};
```

---

## 📦 Tech Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: Context API + Hooks
- **Data Caching**: localStorage
- **Deployment**: Vercel

---

## 🎨 Component Library

### UI Components

```javascript
import { Button, Badge, LoadingSpinner, EmptyState } from '@/components/UI';

// Examples
<Button variant="primary">Click Me</Button>
<Badge variant="green">Active</Badge>
<LoadingSpinner />
<EmptyState icon="📚" title="No Data" />
```

### Layout Components

```javascript
import { Navbar, Sidebar, Footer } from '@/components/Layout';

// Automatically integrated in pages
```

### Custom Hooks

```javascript
import { useData, usePageTitle, useScrollToTop, useAuth } from '@/hooks';

// Load data with caching
const { data, loading, error } = useData('universities');

// Set page title automatically
usePageTitle('My Page');

// Scroll to top on route change
useScrollToTop();

// Access auth context
const { user, login, logout } = useAuth();
```

---

## 📊 Data Management

### Automatic Caching

```javascript
// Data is automatically cached for 1 hour
const { data } = useData('universities');

// Cache expires after 1 hour or on manual clear
localStorage.removeItem('fungep_cache_universities');
```

### Fetch Data Directly

```javascript
import { fetchData } from '@/utils/dataCache';

const universities = await fetchData('universities');
```

---

## ⚙️ Configuration

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://fungep.app
VITE_ENV=production
```

### Tailwind CSS

Customized in `tailwind.config.js`:

```javascript
extend: {
  colors: {
    brand: {
      500: '#3b82f6',  // Primary blue
      600: '#2563eb',
    }
  }
}
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel dashboard
3. Automatic deployment on push

**No manual configuration needed** - `vercel.json` is pre-configured!

### Environment Setup

```bash
# Build for production
npm run build

# Generates dist/ folder for deployment
```

### Custom Domain

1. Go to Vercel project settings
2. Add custom domain
3. Update DNS records (CNAME)

---

## 🔍 SEO

### Meta Tags

All pages include:
- Dynamic title tags
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data

### URL Structure

- Clean URLs: `/universities` instead of `/universities.html`
- Dynamic routes: `/universities/nust-islamabad`
- 404 redirects to home page

---

## 📱 Responsive Design

- **Mobile**: Optimized for 320px+
- **Tablet**: Enhanced layout for 768px+
- **Desktop**: Full experience at 1024px+

Uses Tailwind's responsive utilities:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Mobile: 1 column, Tablet: 2, Desktop: 3 */}
</div>
```

---

## 🐛 Troubleshooting

### Routes not working after deployment?

Verify `vercel.json` contains:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Slow performance?

1. Check DevTools Network tab
2. Clear browser cache
3. Verify lazy loading: Should see "Loading..." briefly on route change

### localStorage full?

```javascript
// Clear old caches
Object.keys(localStorage)
  .filter(key => key.startsWith('fungep_cache_'))
  .forEach(key => localStorage.removeItem(key));
```

---

## 📚 Development

### Add New Page

1. Create component in `src/pages/MyPage.jsx`
2. Add export in `src/routes/RouteGuards.jsx`
3. Add route in `src/routes/AppRoutes.jsx`

### Add New Component

1. Create in `src/components/MyComponent.jsx`
2. Export from components/index.js (if creating one)
3. Import and use in pages

### Performance Optimization

```javascript
// Use useMemo to avoid recalculation
const memoizedData = useMemo(() => 
  expensiveCalculation(data), 
  [data]
);

// Use useCallback to prevent function recreation
const handleClick = useCallback(() => {
  // action
}, [dependencies]);
```

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/awesome-feature`
3. Commit changes: `git commit -m 'Add awesome feature'`
4. Push to branch: `git push origin feature/awesome-feature`
5. Open Pull Request

---

## 📄 License

This project is **proprietary** - All rights reserved © FUNGEP 2024

---

## 📞 Support

- **Website**: https://fungep.app
- **Email**: info@fungep.app
- **Issues**: GitHub Issues

---

## 🎯 Roadmap

- [ ] Firebase authentication integration
- [ ] User progress tracking
- [ ] Interactive study planner
- [ ] Mock tests with detailed analytics
- [ ] Community forum
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Video lectures

---

## ⭐ Show Your Support

If you find this project helpful, please give it a star on GitHub!

---

**Built with ❤️ for Pakistani students**