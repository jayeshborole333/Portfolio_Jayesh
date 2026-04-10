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
  document.addEventListener("DOMContentLoaded", function () {

  const icon = document.getElementById("chatbot-icon");
  const container = document.getElementById("chatbot-container");
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  // Load old chat
  chatBox.innerHTML = localStorage.getItem("chat") || "";

  // Toggle
  icon.addEventListener("click", () => {
    container.style.display =
      container.style.display === "flex" ? "none" : "flex";
  });

  // Send message
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage(input.value);
  });

  window.quickMsg = function (msg) {
    sendMessage(msg);
  };

  function sendMessage(text) {
    if (!text.trim()) return;

    chatBox.innerHTML += `<p><b>You:</b> ${text}</p>`;
    input.value = "";

    showTyping();

    setTimeout(() => {
      removeTyping();
      let reply = getBotResponse(text);
      chatBox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight;

      // Save chat
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
      return "My skills include Customer Support, Java, JSON, APIs, and Web Development 💻";

    if (input.includes("contact"))
      return "You can contact me at: your@email.com 📧";

    if (input.includes("experience"))
      return "I have experience as a Customer Support Engineer with technical expertise.";

    return "You can ask me about my projects, skills, or contact 😊";
  }

});
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
