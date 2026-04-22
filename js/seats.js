// ===============================
// ELEMENTOS DEL DOM
// ===============================
const buyBtn = document.getElementById("buyBtn");
const typeSection = document.getElementById("typeSection");
const seatSection = document.getElementById("seatSection");
const seatMap = document.getElementById("seatMap");

const adultCountEl = document.getElementById("adultCount");
const childCountEl = document.getElementById("childCount");

// ===============================
// ESTADO
// ===============================
let adultCount = 0;
let childCount = 0;

// Número total de asientos
const totalSeats = 40;

// Asientos ocupados (ejemplo)
const occupiedSeats = [5, 12, 19, 26];

// ===============================
// PASO 1 → BUY TICKETS
// ===============================
buyBtn.addEventListener("click", () => {
  // Muestra el paso 2 y 3
  typeSection.classList.remove("hidden");
  seatSection.classList.remove("hidden");
});

// ===============================
// ACTUALIZAR CONTADORES
// ===============================
function updateCounters() {
  adultCountEl.textContent = adultCount;
  childCountEl.textContent = childCount;
}

// ===============================
// PASO 3 → CREAR MAPA DE ASIENTOS
// ===============================
function createSeatMap() {
  seatMap.innerHTML = "";

  for (let i = 1; i <= totalSeats; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.dataset.seatNumber = i;

    // Si el asiento está ocupado
    if (occupiedSeats.includes(i)) {
      seat.classList.add("occupied");
    } else {
      seat.addEventListener("click", () => handleSeatClick(seat));
    }

    seatMap.appendChild(seat);
  }
}

// ===============================
// LÓGICA DE SELECCIÓN
// ===============================
function handleSeatClick(seat) {
  // Si ya estaba seleccionado → deseleccionar
  if (seat.classList.contains("selected")) {
    if (seat.dataset.type === "adult") adultCount--;
    if (seat.dataset.type === "child") childCount--;

    seat.classList.remove("selected", "adult", "child");
    seat.dataset.type = "";
  } else {
    // Tipo seleccionado en el paso 2
    const selectedType = document.querySelector(
      'input[name="seatType"]:checked'
    ).value;

    seat.classList.add("selected", selectedType);
    seat.dataset.type = selectedType;

    if (selectedType === "adult") adultCount++;
    if (selectedType === "child") childCount++;
  }

  updateCounters();
}

// ===============================
// INICIALIZAR
// ===============================
createSeatMap();
updateCounters();
