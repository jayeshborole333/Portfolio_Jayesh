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

// Load old chat
chatBox.innerHTML = localStorage.getItem("chat") || "";

// Toggle chatbot
icon.addEventListener("click", (e) => {
  e.stopPropagation(); // important
  container.style.display =
    container.style.display === "flex" ? "none" : "flex";
});

// Prevent close when clicking inside chatbot
container.addEventListener("click", (e) => {
  e.stopPropagation();
});

// 👉 OUTSIDE CLICK = CLOSE + RESET CHAT
document.addEventListener("click", () => {
  container.style.display = "none";

  // Reset chat
  chatBox.innerHTML = "";
  localStorage.removeItem("chat");
});

// Send message on Enter
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage(input.value);
});

// Quick buttons
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

    localStorage.setItem("chat", chatBox.innerHTML);
  }, 700);
}

// Typing animation
function showTyping() {
  chatBox.innerHTML += `<p id="typing">Typing...</p>`;
}

function removeTyping() {
  let t = document.getElementById("typing");
  if (t) t.remove();
}

// ================= SMART BOT RESPONSE =================
function getBotResponse(input) {
  input = input.toLowerCase();

  // Greeting
  if (input.includes("hi") || input.includes("hello"))
    return "Hi 👋 Welcome to my portfolio!";

  // Name
  if (input.includes("name"))
    return "I am Jayesh Borole 🚀";

  // Projects
  if (input.includes("project") || input.includes("expense"))
    return "I built a Room Expense Tracker 💰 to manage shared expenses easily.";

  // Skills
  if (input.includes("skills"))
    return "Skills: Java, Spring Boot, APIs, JSON, Web Dev 💻";

  // Contact
  if (input.includes("contact"))
    return "📧 Email: jayeshborole210@gmail.com";

  // Experience
  if (input.includes("experience"))
    return "Currently working as Support Engineer at Jio Haptik 💼";

  // Smart fallback (NEW)
  if (input.includes("who") || input.includes("about"))
    return "I'm a passionate developer & support engineer 🚀";

  return "Ask me about projects, skills, contact 😊";
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
