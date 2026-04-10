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

  // Prevent form reload
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  if (icon && container && input && chatBox) {

    // ✅ LOAD CHAT (JSON SAFE)
    let savedChat = localStorage.getItem("chat");

    if (savedChat) {
      try {
        let parsed = JSON.parse(savedChat);
        chatBox.innerHTML = parsed.join("");
      } catch {
        chatBox.innerHTML = savedChat;
      }
    }

    // Toggle chatbot
    icon.addEventListener("click", () => {
      container.style.display =
        container.style.display === "flex" ? "none" : "flex";
    });

    // Enter key
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage(input.value);
      }
    });

    // Send button
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

      // Show user msg
      chatBox.innerHTML += `<div class="user-msg"><span>${text}</span></div>`;
      input.value = "";

      showTyping();

      setTimeout(() => {
        removeTyping();

        let reply = getBotResponse(text);

        // Show bot msg
        chatBox.innerHTML += `<div class="bot-msg"><span>${reply}</span></div>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        // ✅ SAVE JSON
        let chats = JSON.parse(localStorage.getItem("chat")) || [];
        chats.push(`<div class="user-msg"><span>${text}</span></div>`);
        chats.push(`<div class="bot-msg"><span>${reply}</span></div>`);
        localStorage.setItem("chat", JSON.stringify(chats));

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
        return "I built a Room Expense Tracker 💰 where users can manage expenses.";

      if (input.includes("skills"))
        return "My skills include Java, Spring Boot, JSON, APIs, Web Development 💻";

      if (input.includes("contact"))
        return "You can contact me at: jayeshborole205@gmail.com 📧";

      if (input.includes("experience"))
        return "I have experience as a Customer Support Engineer L2.";

      return "Ask me about projects, skills, or contact 😊";
    }
  }

  // ================= CLICK OUTSIDE RESET =================
  document.addEventListener("click", function (e) {

    if (
      container &&
      icon &&
      !container.contains(e.target) &&
      !icon.contains(e.target)
    ) {
      container.style.display = "none";
      chatBox.innerHTML = "";

      // ✅ RESET STORAGE
      localStorage.setItem("chat", JSON.stringify([]));

      input.value = "";
    }
  });

  // ================= TYPING EFFECT =================
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
