const modal = document.querySelector(".modal");
let btn = document.querySelector("#btn");
let close = document.querySelector("#close");

const overlay = document.querySelector(".overlay");

overlay.addEventListener("click", function () {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});
btn.addEventListener("click", function () {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});
close.addEventListener("click", function () {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

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

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting

  // Validate input fields
  const loader = document.querySelector("#loader");
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const business = document.getElementById("jop").value.trim();
  const jopIsue = document.getElementById("jopIsue").value.trim();

  // Retrieve radio button value at submit
  const yes = document.querySelector("#yes");
  const no = document.querySelector("#no");
  let radioValue = "";

  if (yes.checked) {
    radioValue = "Ha";
  } else if (no.checked) {
    radioValue = "Yo'q";
  }

  let isValid = true;
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));

  if (!name) {
    document.querySelector("#name + .error-message").textContent =
      "Iltimos, ismingizni kiriting.";
    isValid = false;
  }

  const phonePattern = /^\(\d{2}\) \d{3}-\d{2}-\d{2}$/;
  if (!phone || !phonePattern.test(phone)) {
    document.querySelector("#phone + .error-message").textContent =
      "Telefon raqamingizni (88) 000-00-00 formatida kiriting.";
    isValid = false;
  }

  if (!business) {
    document.querySelector("#jop + .error-message").textContent =
      "Iltimos, biznesingiz nomi va faoliyat sohasini kiriting.";
    isValid = false;
  }

  if (!jopIsue) {
    document.querySelector("#jopIsue + .error-message").textContent =
      "Iltimos, marketingdagi muammoingizni kiriting.";
    isValid = false;
  }

  if (isValid) {
    loader.classList.remove("hidden");
    loader.classList.add("flex");
    const data = new FormData();
    data.append("Ismingiz", name);
    data.append("Telefon", phone);
    data.append("Biznesingiz nomi", business);
    data.append("Marketingdagi sizni qiynayotgan muammo:", jopIsue);
    data.append("Marketing agentligi bilan ishlaganmi", radioValue);


    fetch(
      "https://script.google.com/macros/s/AKfycbwjBFepkQLvi6vvq26OdS9ZxlhfTn_yCMDOHi2UFgAL2ppAZPDKkduzo9Cqq1UxhgBW7Q/exec",
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Test: ", radioValue || "malumot kelmadi");
        console.log(result); // Log the response
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.getElementById("form").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        alert("Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
      })
      .finally(() => {
        alert("Ma'lumot yuborildi!");
        loader.classList.add("hidden");
        loader.classList.remove("flex");
      });
  }
});
