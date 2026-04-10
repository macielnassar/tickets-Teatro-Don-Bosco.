import { auth } from './firebase.js';
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');

if (loginBtn) {
  loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      window.location.href = 'dashboard.html';
    } catch (error) {
      alert(error.message);
    }
  });
}

if (signupBtn) {
  signupBtn.addEventListener('click', async () => {
    try {
      await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      alert('Account created successfully');
      window.location.href = 'dashboard.html';
    } catch (error) {
      alert(error.message);
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'login.html';
  });
}

onAuthStateChanged(auth, (user) => {
  const isDashboard = window.location.pathname.includes('dashboard.html');

  if (isDashboard && !user) {
    window.location.href = 'login.html';
  }
});
