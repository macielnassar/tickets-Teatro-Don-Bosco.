const confirmBtn = document.getElementById("confirm");
const modal = document.getElementById("confirmationModal");
const detailsText = document.getElementById("purchaseDetails");

confirmBtn.addEventListener("click", () => {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  let adultCount = 0;
  let childCount = 0;

  selectedSeats.forEach(seat => {
    if (seat.classList.contains("adult")) adultCount++;
    if (seat.classList.contains("child")) childCount++;
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

  // Lock seats after purchase
  selectedSeats.forEach(seat => {
    seat.classList.remove("selected");
    seat.classList.add("occupied");
  });

  selectedSeats = [];
  updateSummary();
});

function closeModal() {
  modal.style.display = "none";
}
