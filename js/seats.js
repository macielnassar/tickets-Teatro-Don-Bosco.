document.addEventListener("DOMContentLoaded", () => {

  const seatContainer = document.getElementById("seats");
  const summary = document.getElementById("summary");
  const confirmBtn = document.getElementById("confirm");
  const modal = document.getElementById("confirmationModal");
  const detailsText = document.getElementById("purchaseDetails");

  const ROWS = 6;
  const COLS = 10;

  const PRICES = {
    adult: 10,
    child: 6
  };

  let selectedSeats = [];

  // CREATE SEATS
  for (let row = 1; row <= ROWS; row++) {
    for (let col = 1; col <= COLS; col++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");

      if (row <= 3) {
        seat.classList.add("adult");
        seat.dataset.type = "adult";
      } else {
        seat.classList.add("child");
        seat.dataset.type = "child";
      }

      seat.dataset.id = `R${row}-S${col}`;

      seat.addEventListener("click", () => toggleSeat(seat));
      seatContainer.appendChild(seat);
    }
  }

  function toggleSeat(seat) {
    if (seat.classList.contains("occupied")) return;

    if (seat.classList.contains("selected")) {
      seat.classList.remove("selected");
      selectedSeats = selectedSeats.filter(s => s !== seat);
    } else {
      seat.classList.add("selected");
      selectedSeats.push(seat);
    }

    updateSummary();
  }

  function updateSummary() {
    let total = 0;
    selectedSeats.forEach(seat => {
      total += PRICES[seat.dataset.type];
    });

    summary.innerHTML = `
      Selected seats: ${selectedSeats.length}<br>
      Total: $${total}
    `;
  }

  confirmBtn.addEventListener("click", () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    let adultCount = 0;
    let childCount = 0;

    selectedSeats.forEach(seat => {
      seat.dataset.type === "adult" ? adultCount++ : childCount++;
      seat.classList.remove("selected");
      seat.classList.add("occupied");
    });

    const total =
      adultCount * PRICES.adult +
      childCount * PRICES.child;

    detailsText.innerHTML = `
      Adult tickets: ${adultCount}<br>
      Child tickets: ${childCount}<br>
      <strong>Total paid: $${total}</strong>
    `;

    modal.style.display = "flex";
    selectedSeats = [];
    updateSummary();
  });

  window.closeModal = function () {
    modal.style.display = "none";
  };

});
