// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TU CONFIG (REEMPLAZA CON LA TUYA)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
};

// Inicializar
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar
export { db };
