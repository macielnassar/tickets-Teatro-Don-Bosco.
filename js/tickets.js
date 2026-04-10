const seatsContainer = document.getElementById("seats");
const selectedText = document.getElementById("selectedText");
const buyBtn = document.getElementById("buyBtn");

let selectedSeats = [];

for (let i = 1; i <= 25; i++) {
  const seat = document.createElement("button");
  seat.innerText = i;

  seat.className = "bg-white border border-blue-300 p-3 rounded-lg";

  seat.onclick = () => {
    if (selectedSeats.includes(i)) {
      selectedSeats = selectedSeats.filter(s => s !== i);
      seat.className = "bg-white border border-blue-300 p-3 rounded-lg";
    } else {
      selectedSeats.push(i);
      seat.className = "bg-blue-300 text-white p-3 rounded-lg";
    }

    selectedText.innerText = "Seats: " + selectedSeats.join(", ");
  };

  seatsContainer.appendChild(seat);
}

if (buyBtn) {
  buyBtn.onclick = () => {
    if (selectedSeats.length === 0) {
      alert("Select seats first");
      return;
    }

    alert("You bought seats: " + selectedSeats.join(", "));
  };
}
