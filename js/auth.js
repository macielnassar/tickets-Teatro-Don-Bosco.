import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

if (loginBtn) {
  loginBtn.onclick = async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
}

if (signupBtn) {
  signupBtn.onclick = async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
}
