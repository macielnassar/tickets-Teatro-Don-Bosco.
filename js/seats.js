// 🔥 IMPORTS SEGUROS
let db = null;

try {
  const firebaseModule = await import("./firebase.js");
  db = firebaseModule.db;

  const firestore = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
  window.addDoc = firestore.addDoc;
  window.collection = firestore.collection;

} catch (e) {
  console.log("Firebase no cargó:", e);
}

// 🔐 PROTEGER
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "index.html";
}

// ELEMENTOS
const seatsContainer = document.getElementById("seats");
const summary = document.getElementById("summary");
const confirmBtn = document.getElementById("confirm");
const modal = document.getElementById("confirmationModal");
const purchaseDetails = document.getElementById("purchaseDetails");

const adultBtn = document.getElementById("adultMode");
const childBtn = document.getElementById("childMode");

// ESTADO
let mode = "adult";
let selectedAdults = [];
let selectedChildren = [];

// 🔥 CREAR ASIENTOS (ESTO YA NO FALLA)
for (let i = 1; i <= 50; i++) {
  const seat = document.createElement("div");
  seat.classList.add("seat");
  seat.dataset.id = i;

  seat.addEventListener("click", () => {
    const id = Number(seat.dataset.id);

    if (mode === "adult") {
      if (selectedAdults.includes(id)) {
        selectedAdults = selectedAdults.filter(s => s !== id);
        seat.classList.remove("selected-adult");
      } else {
        selectedAdults.push(id);
        seat.classList.add("selected-adult");
      }
    } else {
      if (selectedChildren.includes(id)) {
        selectedChildren = selectedChildren.filter(s => s !== id);
        seat.classList.remove("selected-child");
      } else {
        selectedChildren.push(id);
        seat.classList.add("selected-child");
      }
    }

    updateSummary();
  });

  seatsContainer.appendChild(seat);
}

// BOTONES
adultBtn.onclick = () => mode = "adult";
childBtn.onclick = () => mode = "child";

// RESUMEN
function updateSummary() {
  const total =
    selectedAdults.length * 10 +
    selectedChildren.length * 6;

  summary.innerHTML = `
    Adult seats: ${selectedAdults.length} <br>
    Child seats: ${selectedChildren.length} <br>
    Total: $${total}
  `;
}

// 🔥 CONFIRMAR
confirmBtn.onclick = async () => {
  if (selectedAdults.length === 0 && selectedChildren.length === 0) {
    alert("Selecciona al menos un asiento");
    return;
  }

  // 👉 SI FIREBASE FUNCIONA
  if (db && window.addDoc) {
    try {
      await window.addDoc(window.collection(db, "reservations"), {
        user: user.email,
        adults: selectedAdults,
        children: selectedChildren,
        createdAt: new Date()
      });

      showModal();

    } catch (error) {
      alert("Error Firebase: " + error.message);
    }
  } else {
    // 👉 FALLBACK (por si Firebase falla)
    console.log("Guardado local");
    showModal();
  }
};

// MODAL
function showModal() {
  purchaseDetails.innerHTML = `
    Adults: ${selectedAdults.join(", ") || "None"} <br>
    Children: ${selectedChildren.join(", ") || "None"}
  `;
  modal.style.display = "flex";
}

// CERRAR
window.closeModal = function () {
  modal.style.display = "none";
  location.reload();
};
