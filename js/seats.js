const buyBtn = document.getElementById("buyBtn");
const typeSection = document.getElementById("typeSection");
const seatSection = document.getElementById("seatSection");
const seatMap = document.getElementById("seatMap");

const adultCountEl = document.getElementById("adultCount");
const childCountEl = document.getElementById("childCount");
const totalPriceEl = document.getElementById("totalPrice");

const ADULT_PRICE = 10;
const CHILD_PRICE = 6;

let adultCount = 0;
let childCount = 0;

const totalSeats = 50;
const occupiedSeats = [3, 7, 14, 22, 31];

buyBtn.addEventListener("click", () => {
  typeSection.classList.remove("hidden");
  seatSection.classList.remove("hidden");
});

function updateSummary() {
  adultCountEl.textContent = adultCount;
  childCountEl.textContent = childCount;
  totalPriceEl.textContent =
    adultCount * ADULT_PRICE + childCount * CHILD_PRICE;
}

function createSeatMap() {
  for (let i = 1; i <= totalSeats; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.textContent = i;

    if (occupiedSeats.includes(i)) {
      seat.classList.add("occupied");
    } else {
      seat.addEventListener("click", () => toggleSeat(seat));
    }

    seatMap.appendChild(seat);
  }
}

function toggleSeat(seat) {
  if (seat.classList.contains("occupied")) return;

  if (seat.classList.contains("selected")) {
    if (seat.dataset.type === "adult") adultCount--;
    if (seat.dataset.type === "child") childCount--;
    seat.classList.remove("selected", "adult", "child");
    seat.textContent = seat.dataset.number;
    seat.dataset.type = "";
  } else {
    const selectedType = document.querySelector(
      'input[name="seatType"]:checked'
    ).value;

    seat.classList.add("selected", selectedType);
    seat.dataset.type = selectedType;
    seat.textContent = selectedType === "adult" ? "A" : "C";

    if (selectedType === "adult") adultCount++;
    if (selectedType === "child") childCount++;
  }

  updateSummary();
}

createSeatMap();
updateSummary();
