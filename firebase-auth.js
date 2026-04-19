// ==========================================
// 🔥 FUNGEP Firebase Auth & State Management
// ==========================================

let auth;
let provider;

// Global state tracking
window.isLoggedIn = false;
window.authInitialized = false;
window.currentUser = null;

/**
 * 🔐 Phase 1: Load Config & Initialize
 * We use fetch because the config is coming from your server API.
 */
fetch('/api/get-config')
  .then(res => res.json())
  .then(config => {
    // 1. Initialize App
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      if (typeof firebase.analytics === 'function') {
        firebase.analytics();
      }
    }

    auth = firebase.auth();
    provider = new firebase.auth.GoogleAuthProvider();

    // 2. Setup Auth Observer
    auth.onAuthStateChanged(user => {
      window.authInitialized = true;
      window.currentUser = user;
      window.isLoggedIn = !!user;

      console.log(user ? `✅ User Authenticated: ${user.email}` : "❌ No active session");

      // 3. UI Sync
      updateNavAvatar(user);
      if (typeof updateProfileUI === 'function') updateProfileUI(user);

      /**
       * 📢 4. Dispatch Global Readiness Signal
       * This is the "magic" that tells the Planner it's safe to load Firestore.
       */
      const firebaseReadyEvent = new CustomEvent('firebaseStateReady', { 
        detail: { user: user } 
      });
      window.dispatchEvent(firebaseReadyEvent);
    });
  })
  .catch(err => {
    console.error("❌ Firebase Initialization Failed:", err);
  });

// ===============================
// 🧭 Navbar Avatar Sync
// ===============================
function updateNavAvatar(user) {
  const logo = document.getElementById('nav-logo');
  const photo = document.getElementById('nav-profile-photo');
  if (!logo || !photo) return;

  if (user && user.photoURL) {
    photo.src = user.photoURL;
    photo.classList.remove('hidden');
    logo.classList.add('hidden');
  } else {
    logo.classList.remove('hidden');
    photo.classList.add('hidden');
  }
}

// ===============================
// 🔵 Global Auth Actions
// ===============================
window.firebaseLogin = function () {
  if (!auth || !provider) return alert("System loading...");
  auth.signInWithPopup(provider).catch(error => {
    if (error.code === 'auth/popup-blocked') auth.signInWithRedirect(provider);
  });
};

window.firebaseLogout = function () {
  if (!auth) return;
  auth.signOut().then(() => {
    window.location.href = "/login.html";
  });
};
