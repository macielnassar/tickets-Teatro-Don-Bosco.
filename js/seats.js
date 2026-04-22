import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const seatContainer = document.getElementById("seats");
  const summary = document.getElementById("summary");
  const confirmBtn = document.getElementById("confirm");
  const modal = document.getElementById("confirmationModal");
  const detailsText = document.getElementById("purchaseDetails");

  const adultBtn = document.getElementById("adultMode");
  const childBtn = document.getElementById("childMode");

  const ROWS = 6;
  const COLS = 10;

  const PRICES = {
    adult: 10,
    child: 6
  };

  let selectedSeats = [];
  let currentType = "adult";
  let occupiedSeats = [];

  adultBtn.onclick = () => currentType = "adult";
  childBtn.onclick = () => currentType = "child";

  // CARGAR ASIENTOS YA RESERVADOS DESDE FIREBASE
  const snapshot = await getDocs(collection(db, "tickets"));

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.seats) {
      occupiedSeats.push(...data.seats.map(String));
    }
  });

  for (let i = 0; i < ROWS * COLS; i++) {
    const seatNumber = String(i + 1);
    const seat = document.createElement("div");

    seat.classList.add("seat");
    seat.dataset.number = seatNumber;

    if (occupiedSeats.includes(seatNumber)) {
      seat.classList.add("occupied");
    }

    seat.addEventListener("click", () => {
      if (seat.classList.contains("occupied")) return;

      if (
        seat.classList.contains("selected-adult") ||
        seat.classList.contains("selected-child")
      ) {
        seat.classList.remove("selected-adult", "selected-child");
        selectedSeats = selectedSeats.filter(s => s !== seat);
      } else {
        seat.classList.add(
          currentType === "adult" ? "selected-adult" : "selected-child"
        );
        seat.dataset.type = currentType;
        selectedSeats.push(seat);
      }

      updateSummary();
    });

    seatContainer.appendChild(seat);
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

  confirmBtn.onclick = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    let adultCount = 0;
    let childCount = 0;
    let seatNumbers = [];

    selectedSeats.forEach(seat => {
      if (seat.dataset.type === "adult") {
        adultCount++;
      } else {
        childCount++;
      }

      seatNumbers.push(seat.dataset.number);
    });

    const total = adultCount * PRICES.adult + childCount * PRICES.child;

    try {
      await addDoc(collection(db, "tickets"), {
        userEmail: auth.currentUser ? auth.currentUser.email : "guest",
        adultTickets: adultCount,
        childTickets: childCount,
        seats: seatNumbers,
        totalPaid: total,
        createdAt: serverTimestamp()
      });

      selectedSeats.forEach(seat => {
        seat.classList.remove("selected-adult", "selected-child");
        seat.classList.add("occupied");
      });

      detailsText.innerHTML = `
        Adult tickets: ${adultCount}<br>
        Child tickets: ${childCount}<br>
        Seats: ${seatNumbers.join(", ")}<br>
        <strong>Total paid: $${total}</strong>
      `;

      selectedSeats = [];
      updateSummary();
      modal.style.display = "flex";

    } catch (error) {
      alert("Error saving ticket: " + error.message);
    }
  };

  window.closeModal = () => {
    modal.style.display = "none";
  };
});
