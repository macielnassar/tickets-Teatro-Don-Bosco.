const container = document.getElementById("seats");
const buyBtn = document.getElementById("buyBtn");

const rows = ["A","B","C","D","E"];
const seatsPerRow = 8;

let selected = [];
let taken = JSON.parse(localStorage.getItem("takenSeats")) || [];

// tipo de asiento
function getSeatType(row) {
  if (row === "A" || row === "B") return "adult";
  return "child";
}

rows.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "flex gap-2 justify-center mb-2";

  for (let i = 1; i <= seatsPerRow; i++) {
    const id = row + i;
    const type = getSeatType(row);

    const seat = document.createElement("div");
    seat.innerText = id;

    let base = "w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-xs ";

    // colores por tipo
    if (taken.includes(id)) {
      seat.className = base + "bg-gray-400";
    } else if (type === "adult") {
      seat.className = base + "bg-blue-400 text-white";
    } else {
      seat.className = base + "bg-green-400 text-white";
    }

    seat.onclick = () => {
      if (taken.includes(id)) return;

      if (selected.includes(id)) {
        selected = selected.filter(s => s !== id);
      } else {
        selected.push(id);
      }

      renderSeats();
    };

    rowDiv.appendChild(seat);
  }

  container.appendChild(rowDiv);
});

function renderSeats() {
  container.innerHTML = "";
  rows.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "flex gap-2 justify-center mb-2";

    for (let i = 1; i <= seatsPerRow; i++) {
      const id = row + i;
      const type = getSeatType(row);

      const seat = document.createElement("div");

      let base = "w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-xs ";

      if (taken.includes(id)) {
        seat.className = base + "bg-gray-400";
      } else if (selected.includes(id)) {
        seat.className = base + "bg-yellow-400";
      } else if (type === "adult") {
        seat.className = base + "bg-blue-400 text-white";
      } else {
        seat.className = base + "bg-green-400 text-white";
      }

      seat.innerText = id;

      seat.onclick = () => {
        if (taken.includes(id)) return;

        if (selected.includes(id)) {
          selected = selected.filter(s => s !== id);
        } else {
          selected.push(id);
        }

        renderSeats();
      };

      rowDiv.appendChild(seat);
    }

    container.appendChild(rowDiv);
  });
}

// comprar
buyBtn.onclick = () => {
  if (selected.length === 0) {
    alert("Selecciona asientos");
    return;
  }

  taken = [...taken, ...selected];
  localStorage.setItem("takenSeats", JSON.stringify(taken));

  alert("Compra realizada");
  location.reload();
};
