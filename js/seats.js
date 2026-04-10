const container = document.getElementById("seats");
const buyBtn = document.getElementById("buyBtn");

const rows = ["A","B","C","D","E"];
const seatsPerRow = 8;

let selected = [];
let taken = JSON.parse(localStorage.getItem("takenSeats")) || [];

rows.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "flex gap-2 justify-center mb-2";

  for (let i = 1; i <= seatsPerRow; i++) {
    const id = row + i;

    const seat = document.createElement("div");
    seat.innerText = id;

    let style = "w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-sm ";

    if (taken.includes(id)) {
      seat.className = style + "bg-gray-400";
    } else {
      seat.className = style + "bg-white border";
    }

    seat.onclick = () => {
      if (taken.includes(id)) return;

      if (selected.includes(id)) {
        selected = selected.filter(s => s !== id);
        seat.className = style + "bg-white border";
      } else {
        selected.push(id);
        seat.className = style + "bg-blue-400 text-white";
      }
    };

    rowDiv.appendChild(seat);
  }

  container.appendChild(rowDiv);
});

buyBtn.onclick = () => {
  if (selected.length === 0) {
    alert("Select seats");
    return;
  }

  taken = [...taken, ...selected];

  localStorage.setItem("takenSeats", JSON.stringify(taken));
  localStorage.setItem("myTickets", JSON.stringify(selected));

  alert("Seats booked!");
  location.reload();
};
