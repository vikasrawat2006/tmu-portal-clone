// javascript/reset.js

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("pnlPopup");
  const openPopupBtn = document.getElementById("forgetPasswordBtn");
  const closeBtn = document.getElementById("btnClose");
  const getPasswordBtn = document.getElementById("btnSave");

  openPopupBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    popup.style.display = "block";
  });

  closeBtn?.addEventListener("click", function () {
    popup.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });

  getPasswordBtn?.addEventListener("click", function () {
    const userId = document.getElementById("txtLoginUserId").value.trim();
    const mobile = document.getElementById("txtMobileNo").value.trim();

    if (!userId || !mobile) {
      alert("Please enter both User ID and Mobile No.");
      return;
    }

    alert(`Password reset requested for ${userId} (Mobile: ${mobile})`);
  });
});
