const API_URL = "https://script.google.com/macros/s/AKfycbz17npRPO9BIaOuA3q4x64rkru9xoIhzZ6C-OUBxsQuBMw4bmAe53P4I4DFYqN2xbAj/exec";

document.getElementById("licenseForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const product = document.getElementById("product").value.trim();
  const orderId = document.getElementById("orderId").value.trim();
  const license = document.getElementById("license").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !product || !orderId || !license || !email) {
    document.getElementById("response").innerText = "All fields are required.";
    return;
  }

  grecaptcha.ready(function () {
    grecaptcha.execute("6LdP6TQrAAAAAN5Ld7eYDvMxD5m43MQuALG6y9Zs", { action: "submit" }).then(function (token) {
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          product: product,
          orderId: orderId,
          license: license,
          email: email,
          recaptchaScore: token
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            document.getElementById("response").style.color = "#03dac6";
            document.getElementById("response").innerText = "Successfully registered!";
            document.getElementById("licenseForm").reset();
          } else {
            document.getElementById("response").innerText = data.message || "An error occurred.";
          }
        })
        .catch((error) => {
          document.getElementById("response").innerText = "Failed to submit. Try again.";
        });
    });
  });
});