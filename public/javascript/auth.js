document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("ImgBttn_Login");
  const enrollInput = document.getElementById("txtUserid");
  const passwordInput = document.getElementById("txtpassword");
  const rememberMe = document.getElementById("chkrem");

  loginBtn.addEventListener("click", async () => {
    const enrollment = enrollInput.value.trim();
    const password = passwordInput.value;

    if (!enrollment || !password) {
      alert("Please enter both Enrollment No and Password.");
      return;
    }

    try {
      const response = await fetch('/api/login', {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enrollment, password, remember: rememberMe.checked }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Save session data or token if needed
        if (rememberMe.checked) {
          localStorage.setItem("rememberedUser", enrollment);
        } else {
          localStorage.removeItem("rememberedUser");
        }

        // Redirect to dashboard
        window.location.href = "dashboard.html";
      } else {
        if (result.reason === "unregistered") {
          alert("Sorry, you are not registered. Contact admin.");
        } else if (result.reason === "incorrect") {
          alert("Incorrect password. Please try again.");
        } else {
          alert("Login failed. Try again.");
        }

        // Clear password field and optionally reload
        passwordInput.value = "";
        setTimeout(() => location.reload(), 1500);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    }
  });

  // Auto-fill if remembered
  const rememberedUser = localStorage.getItem("rememberedUser");
  if (rememberedUser) {
    enrollInput.value = rememberedUser;
    rememberMe.checked = true;
  }
});
