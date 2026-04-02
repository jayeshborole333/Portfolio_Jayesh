$(document).ready(function () {

  // ================= SCROLL =================
  $(window).scroll(function () {
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
  });

  $(".navbar .menu li a").click(function () {
    $("html").css("scrollBehavior", "smooth");
  });

  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // ================= CHATBOT =================
  // ================= CHATBOT =================
const icon = document.getElementById("chatbot-icon");
const container = document.getElementById("chatbot-container");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Toggle chatbot
if (icon && container) {
  icon.addEventListener("click", () => {
    container.classList.toggle("active");
  });
}

// Chat logic
if (input && chatBox) {
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      let userText = input.value.trim();
      if (userText === "") return;

      // User message
      chatBox.innerHTML += `<p class="message"><b>You:</b> ${userText}</p>`;

      input.value = "";

      // Typing animation
      const typingHTML = `
        <p class="message typing-msg">
          <b>Bot:</b>
          <span class="typing">
            <span></span><span></span><span></span>
          </span>
        </p>`;

      chatBox.insertAdjacentHTML("beforeend", typingHTML);
      chatBox.scrollTop = chatBox.scrollHeight;

      // Bot reply
      setTimeout(() => {
        const typingEl = document.querySelector(".typing-msg");
        if (typingEl) typingEl.remove(); // ✅ safe remove

        let botReply = getBotResponse(userText);

        chatBox.innerHTML += `<p class="message"><b>Bot:</b> ${botReply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 800);
    }
  });
}

  // Portfolio-based answers
  function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes("hi") || input.includes("hello"))
      return "Hi 👋 Welcome to my portfolio!";

    if (input.includes("name"))
      return "My name is Jayesh 😊";

    if (input.includes("project") || input.includes("work"))
      return "I have built Coffee Shop, Headphone Landing Page, Food Ordering System, and Room Expense Tracker.";

    if (input.includes("skills"))
      return "HTML, CSS, JavaScript, Customer Support & WhatsApp API 💻";

    if (input.includes("contact"))
      return "You can contact me at: your@email.com 📧";

    if (input.includes("experience"))
      return "I am working as a Customer Support Engineer L2 🚀";

    return "Ask me about my portfolio, skills, or projects 😊";
  }

  // ================= TYPING =================
  var typed1 = new Typed(".typing", {
    strings: ["Customer Support Engineer", "Support Engineer L2"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  var typed2 = new Typed(".typing-2", {
    strings: ["Customer Support Engineer", "Support Engineer L2"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  // ================= CAROUSEL =================
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });

});
