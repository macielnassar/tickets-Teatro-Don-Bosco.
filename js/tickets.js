import { db, auth } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const container = document.getElementById("tickets");

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    container.innerHTML = `
      <p class="text-center text-red-600">
        Please log in first.
      </p>
    `;
    return;
  }

  const q = query(
    collection(db, "tickets"),
    where("userEmail", "==", user.email)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    container.innerHTML = `
      <p class="text-center text-gray-600">
        No tickets found.
      </p>
    `;
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();

    container.innerHTML += `
      <div class="bg-white p-5 rounded-xl shadow">
        <h2 class="text-xl font-bold mb-2">Ticket Reservation</h2>
        <p><strong>Seats:</strong> ${data.seats.join(", ")}</p>
        <p><strong>Adult:</strong> ${data.adultTickets}</p>
        <p><strong>Child:</strong> ${data.childTickets}</p>
        <p><strong>Total Paid:</strong> $${data.totalPaid}</p>
      </div>
    `;
  });
});
    `;
  });
});
