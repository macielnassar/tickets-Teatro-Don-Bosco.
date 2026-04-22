import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtOT318VIQPeIwNKNHekvU2HQiw3oVHv4",
  authDomain: "don-bosco-tickets.firebaseapp.com",
  projectId: "don-bosco-tickets",
  storageBucket: "don-bosco-tickets.firebasestorage.app",
  messagingSenderId: "943287220988",
  appId: "1:943287220988:web:d0baafef8cc17a7a457579"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
