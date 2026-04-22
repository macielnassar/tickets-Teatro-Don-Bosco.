import { db, auth } from "./firebase.js";
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

  adultBtn.onclick = () => currentType = "adult";
  childBtn.onclick = () => currentType = "child";

  // CREAR ASIENTOS VISIBLES
  for (let i = 1; i <= 60; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.dataset.number = i;

    seat.onclick = () => {
      if (seat.classList.contains("occupied")) return;

      const alreadySelected = selectedSeats.find(s => s.number == i);

      if (alreadySelected) {
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

    const adultCount = selectedSeats.filter(s => s.type === "adult").length;
    const childCount = selectedSeats.filter(s => s.type === "child").length;
    const total = adultCount * 10 + childCount * 6;
    const seatNumbers = selectedSeats.map(s => s.number);

    try {
      await addDoc(collection(db, "tickets"), {
        userEmail: auth.currentUser?.email || "guest",
        seats: seatNumbers,
        adultTickets: adultCount,
        childTickets: childCount,
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
        Total: $${total}
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
