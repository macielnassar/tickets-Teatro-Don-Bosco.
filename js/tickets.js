const btn = document.getElementById("buyBtn");

if (btn) {
  btn.onclick = () => {
    const qty = document.getElementById("ticketQuantity").value;
    alert("You bought " + qty + " tickets");
  };
}
