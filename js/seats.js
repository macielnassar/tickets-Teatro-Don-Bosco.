import { db } from "./firebase.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const seatsContainer = document.getElementById("seats");
  const summary = document.getElementById("summary");
  const confirmBtn = document.getElementById("confirm");
  const modal = document.getElementById("confirmationModal");
  const detailsText = document.getElementById("purchaseDetails");

  const adultBtn = document.getElementById("adultMode");
  const childBtn = document.getElementById("childMode");

  let currentType = "adult";
  let selectedSeats = [];

  const prices = {
    adult: 10,
    child: 6
  };

  adultBtn.onclick = () => {
    currentType = "adult";
  };

  childBtn.onclick = () => {
    currentType = "child";
  };

  // CREAR ASIENTOS
  for (let i = 1; i <= 60; i++) {
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.dataset.number = i;

    seat.onclick = () => {
      const found = selectedSeats.find(s => s.number == i);

      if (found) {
        selectedSeats = selectedSeats.filter(s => s.number != i);
        seat.classList.remove("selected-adult", "selected-child");
      } else {
        selectedSeats.push({
          number: i,
          type: currentType
        });

        seat.classList.add(
          currentType === "adult"
            ? "selected-adult"
            : "selected-child"
        );
      }

      updateSummary();
    };

    seatsContainer.appendChild(seat);
  }

  function updateSummary() {
    let total = 0;

    selectedSeats.forEach(seat => {
      total += prices[seat.type];
    });

    summary.innerHTML = `
      Selected seats: ${selectedSeats.length}<br>
      Total: $${total}
    `;
  }

  confirmBtn.onclick = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const seatNumbers = selectedSeats.map(s => s.number);
    const total = selectedSeats.reduce((sum, s) => sum + prices[s.type], 0);

    try {
      await addDoc(collection(db, "tickets"), {
        seats: seatNumbers,
        totalPaid: total
      });

      document.querySelectorAll(".seat").forEach(seat => {
        if (seatNumbers.includes(Number(seat.dataset.number))) {
          seat.classList.remove("selected-adult", "selected-child");
          seat.classList.add("occupied");
        }
      });

      detailsText.innerHTML = `
        Seats: ${seatNumbers.join(", ")}<br>
        Total Paid: $${total}
      `;

      selectedSeats = [];
      updateSummary();
      modal.style.display = "flex";

    } catch (error) {
      alert(error.message);
    }
  };

  window.closeModal = () => {
    modal.style.display = "none";
  };
});
