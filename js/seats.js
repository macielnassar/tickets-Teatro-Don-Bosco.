// 🔐 PROTEGER PÁGINA
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
let mode = "adult"; // adult o child
let selectedAdults = [];
let selectedChildren = [];

// GENERAR ASIENTOS
for (let i = 1; i <= 50; i++) {
  const seat = document.createElement("div");
  seat.classList.add("seat");
  seat.dataset.id = i;

  // Cargar ocupados guardados
  const occupied = JSON.parse(localStorage.getItem("occupiedSeats")) || [];
  if (occupied.includes(i)) {
    seat.classList.add("occupied");
  }

  seat.addEventListener("click", () => {
    if (seat.classList.contains("occupied")) return;

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

// CAMBIO DE MODO
adultBtn.onclick = () => {
  mode = "adult";
};

childBtn.onclick = () => {
  mode = "child";
};

// ACTUALIZAR RESUMEN
function updateSummary() {
  const totalSeats = selectedAdults.length + selectedChildren.length;
  const total =
    selectedAdults.length * 10 +
    selectedChildren.length * 6;

  summary.innerHTML = `
    Adult seats: ${selectedAdults.length} <br>
    Child seats: ${selectedChildren.length} <br>
    Total: $${total}
  `;
}

// CONFIRMAR
confirmBtn.onclick = () => {
  if (selectedAdults.length === 0 && selectedChildren.length === 0) {
    alert("Selecciona al menos un asiento");
    return;
  }

  // GUARDAR OCUPADOS
  let occupied = JSON.parse(localStorage.getItem("occupiedSeats")) || [];

  const allSelected = [...selectedAdults, ...selectedChildren];
  occupied = [...new Set([...occupied, ...allSelected])];

  localStorage.setItem("occupiedSeats", JSON.stringify(occupied));

  // GUARDAR RESERVA DEL USUARIO
  const reservation = {
    user: user.email,
    adults: selectedAdults,
    children: selectedChildren
  };

  localStorage.setItem("lastReservation", JSON.stringify(reservation));

  // MOSTRAR MODAL
  purchaseDetails.innerHTML = `
    Adults: ${selectedAdults.join(", ") || "None"} <br>
    Children: ${selectedChildren.join(", ") || "None"}
  `;

  modal.style.display = "flex";
};

// CERRAR MODAL
window.closeModal = function () {
  modal.style.display = "none";
  location.reload();
};
