const modal = document.querySelector(".modal");
let btn = document.querySelector("#btn");
const overlay = document.querySelector(".overlay");

overlay.addEventListener("click", function () {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

btn.addEventListener("click", function () {
  modal.classList.remove("hidden");
  // modal.classList.add("flex")
});

const url = `https://script.google.com/macros/s/AKfycbz_fVuhlrKPD7NERctiv3MT4Ho7Qt0WzwT9m2J8IqEwOhRQ7bP27pgn57z-Oa9DjlRZyA/exec`;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("phone").addEventListener("input", function (event) {
    let value = event.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    let formatted = "";

    if (value.length > 0) {
      formatted += "(" + value.substring(0, 2);
    }
    if (value.length >= 3) {
      formatted += ") " + value.substring(2, 5);
    }
    if (value.length >= 6) {
      formatted += "-" + value.substring(5, 7);
    }
    if (value.length >= 8) {
      formatted += "-" + value.substring(7, 9);
    }

    event.target.value = formatted;
  });

  // Form submission handling
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting
    const loader = document.querySelector("#loader");
    // Clear previous error messages
    document.getElementById("name-error").textContent = "";
    document.getElementById("phone-error").textContent = "";
    document.getElementById("jop-error").textContent = "";

    // Get form values
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const business = document.getElementById("jop").value.trim();

    // Validate form inputs
    let isValid = true;
    if (!name) {
      document.getElementById("name-error").textContent =
        "Iltimos, ismingizni kiriting.";
      isValid = false;
    }
    const phonePattern = /^\(\d{2}\) \d{3}-\d{2}-\d{2}$/;
    if (!phone || !phonePattern.test(phone)) {
      document.getElementById("phone-error").textContent =
        "Telefon raqamingizni (88) 000-00-00 formatida kiriting.";
      isValid = false;
    }
    if (!business) {
      document.getElementById("jop-error").textContent =
        "Iltimos, biznesingiz nomi va faoliyat sohasini kiriting.";
      isValid = false;
    }

    if (isValid) {
      loader.classList.remove("hidden");
      loader.classList.add("flex");

      // Prepare form data
      const formData = new FormData();
      formData.append("Ismingiz", name);
      formData.append("Telefon", phone);
      formData.append("Biznesingiz nomi", business);

      // Send data to the server
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          modal.classList.add("hidden");
          modal.classList.remove("flex");
          window.location = "https://asoschilar.uz/video.html";
          document.getElementById("form").reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          modal.classList.add("hidden");
          modal.classList.remove("flex");
          alert("Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
        })
        .finally(() => {
          // Hide loader
          loader.classList.add("hidden");
          loader.classList.remove("flex");
        });
    }
  });
});
