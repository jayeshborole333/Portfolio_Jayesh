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

  const icon = document.getElementById("chatbot-icon");
  const container = document.getElementById("chatbot-container");
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const sendBtn = document.getElementById("send-btn");

  // FORM PREVENT (safe add)
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  if (icon && container && input && chatBox) {

    // Load old chat
    chatBox.innerHTML = localStorage.getItem("chat") || "";

    // Toggle chatbot
    icon.addEventListener("click", () => {
      container.style.display =
        container.style.display === "flex" ? "none" : "flex";
    });

    // Enter key send
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage(input.value);
      }
    });

    // Send button click
    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        sendMessage(input.value);
      });
    }

    // Quick buttons
    window.quickMsg = function (msg) {
      sendMessage(msg);
    };

    function sendMessage(text) {
      if (!text || !text.trim()) return;

      chatBox.innerHTML += `<div class="user-msg"><span>${text}</span></div>`;
      input.value = "";

      showTyping();

      setTimeout(() => {
        removeTyping();

        let reply = getBotResponse(text);

        chatBox.innerHTML += `<div class="bot-msg"><span>${reply}</span></div>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        localStorage.setItem("chat", chatBox.innerHTML);
      }, 800);
    }

    function showTyping() {
      chatBox.innerHTML += `<p id="typing">Bot is typing...</p>`;
    }

    function removeTyping() {
      let typing = document.getElementById("typing");
      if (typing) typing.remove();
    }

    function getBotResponse(input) {
      input = input.toLowerCase();

      if (input.includes("hi") || input.includes("hello"))
        return "Hi 👋 Welcome to my portfolio!";

      if (input.includes("name"))
        return "I am Jayesh, a passionate developer 🚀";

      if (input.includes("project") || input.includes("expense"))
        return "I built a Room Expense Tracker 💰 where users can manage and split expenses easily.";

      if (input.includes("skills"))
        return "My skills include Customer Support,Technical support, Java, Spring boot, JSON, APIs, and Web Development 💻";

      if (input.includes("contact"))
        return "You can contact me at: your@email.com 📧";

      if (input.includes("experience"))
        return "I have experience as a Customer Support Engineer with technical expertise.";

      return "You can ask me about my projects, skills, or contact 😊";
    }

  }
  
  // CLICK OUTSIDE → RESET CHATBOT
document.addEventListener("click", function (e) {
  if (!container.contains(e.target) && !icon.contains(e.target)) {

    // Hide chatbot
    container.style.display = "none";

    // Clear chat UI
    chatBox.innerHTML = "";

    // Clear localStorage
    localStorage.removeItem("chat");

    // Optional: clear input
    input.value = "";
  }
});

  // ================= TYPING =================
  if (typeof Typed !== "undefined") {
    new Typed(".typing", {
      strings: ["Customer Support Engineer", "Support Engineer L2"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
    });

    new Typed(".typing-2", {
      strings: ["Customer Support Engineer", "Support Engineer L2"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
    });
  }

  // ================= CAROUSEL =================
  if ($.fn.owlCarousel) {
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
  }

});
