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
function centerModal() {
  const modal = document.getElementById("pnlPopup");
  const rect = modal.getBoundingClientRect();
  modal.style.position = "fixed";
  modal.style.top = `calc(50% - ${rect.height / 2}px)`;
  modal.style.left = `calc(50% - ${rect.width / 2}px)`;
}

document.getElementById("forgetPasswordBtn").addEventListener("click", () => {
  centerModal();
});

window.addEventListener("resize", () => {
  const modal = document.getElementById("pnlPopup");
  if (modal.style.display === "block") {
    centerModal();
  }
});
