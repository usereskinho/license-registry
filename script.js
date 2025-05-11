const form = document.getElementById("license-form");
const messageEl = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageEl.textContent = "";
  const formData = new FormData(form);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz17npRPO9BIaOuA3q4x64rkru9xoIhzZ6C-OUBxsQuBMw4bmAe53P4I4DFYqN2xbAj/exec", {
      method: "POST",
      body: formData
    });
    const result = await response.json();

    if (result.success) {
      messageEl.textContent = "Registration successful!";
      messageEl.className = "message success";
      form.reset();
    } else {
      messageEl.textContent = result.message || "Registration failed.";
      messageEl.className = "message error";
    }
  } catch (err) {
    messageEl.textContent = "Failed to submit. Try again.";
    messageEl.className = "message error";
  }
});
