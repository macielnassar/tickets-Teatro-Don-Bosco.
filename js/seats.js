const seatsContainer = document.getElementById("seats-container");
const ticketTypeSelect = document.getElementById("ticketType");
const countSpan = document.getElementById("count");
const totalSpan = document.getElementById("total");

const PRICES = {
  adult: 20,
  child: 12
};

const rows = 6;
const seatsPerRow = 10;

let selectedSeats = [];

function createSeats() {
  for (let r = 0; r < rows; r++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    for (let s = 0; s < seatsPerRow; s++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");

      // Random occupied seats (example)
      if (Math.random() < 0.15) {
        seat.classList.add("occupied");
      }

      seat.addEventListener("click", () => {
        if (seat.classList.contains("occupied")) return;

        if (seat.classList.contains("selected")) {
          seat.classList.remove("selected", "adult", "child");
          selectedSeats = selectedSeats.filter(x => x !== seat);
        } else {
          seat.classList.add("selected");
          seat.classList.add(ticketTypeSelect.value);
          selectedSeats.push(seat);
        }

        updateSummary();
      });

      rowDiv.appendChild(seat);
    }

    seatsContainer.appendChild(rowDiv);
  }
}

function updateSummary() {
  let total = 0;

  selectedSeats.forEach(seat => {
    if (seat.classList.contains("adult")) total += PRICES.adult;
    if (seat.classList.contains("child")) total += PRICES.child;
  });

  countSpan.textContent = selectedSeats.length;
  totalSpan.textContent = total;
}

ticketTypeSelect.addEventListener("change", () => {
  selectedSeats.forEach(seat => {
    seat.classList.remove("adult", "child");
    seat.classList.add(ticketTypeSelect.value);
  });
  updateSummary();
});

createSeats();
