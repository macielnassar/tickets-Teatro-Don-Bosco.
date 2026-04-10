const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

if (loginBtn) {
  loginBtn.onclick = () => {
    alert("Login successful");
    window.location.href = "dashboard.html";
  };
}

if (signupBtn) {
  signupBtn.onclick = () => {
    alert("Account created");
  };
}
