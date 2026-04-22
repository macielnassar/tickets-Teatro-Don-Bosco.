// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TU CONFIG (REEMPLAZA CON LA TUYA)
const firebaseConfig = {
  apiKey: "AIzaSyBqJ9bSb2gwJMF64T7fD_2PBBHIe3VRNg4",
  authDomain: "tickets-system-baa0f.firebaseapp.com",
  projectId: "tickets-system-baa0f",
  storageBucket: "tickets-system-baa0f.firebasestorage.app",
  messagingSenderId: "617421342489",
  appId: "1:617421342489:web:31ce139de74b0edf1b6788"
};

// Inicializar
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar
export { db };
