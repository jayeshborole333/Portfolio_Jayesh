$(document).ready(function () {

  // ================= SCROLL =================
  $(window).scroll(function () {
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky"); // FIXED
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

  if (!icon || !container || !input || !chatBox) {
    console.error("Chatbot elements missing ❌");
    return;
  }

  // Load old chat
  chatBox.innerHTML = localStorage.getItem("chat") || "";

  // Toggle chatbot
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    container.style.display =
      container.style.display === "flex" ? "none" : "flex";
  });

  // Prevent closing
  container.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Outside click = reset
  document.addEventListener("click", () => {
    container.style.display = "none";
    chatBox.innerHTML = "";
    localStorage.removeItem("chat");
  });

  // Enter key
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage(input.value);
  });

  // Button click
  window.sendBtn = function () {
    sendMessage(input.value);
  };

  // Quick buttons
  window.quickMsg = function (msg) {
    sendMessage(msg);
  };

  // ================= SEND =================
  async function sendMessage(text) {
    if (!text.trim()) return;

    addMessage("You", text);
    input.value = "";

    showTyping();

    let reply = await getBotResponse(text);

    removeTyping();
    addMessage("Bot", reply);

    chatBox.scrollTop = chatBox.scrollHeight;
    localStorage.setItem("chat", chatBox.innerHTML);
  }

  function addMessage(sender, text) {
    let cls = sender === "You" ? "user-msg" : "bot-msg";

    chatBox.innerHTML += `
      <div class="${cls}">
        <span>${text}</span>
      </div>
    `;
  }

  function showTyping() {
    chatBox.innerHTML += `
      <div id="typing" class="bot-msg">
        <span class="dots"></span>
      </div>
    `;
  }

  function removeTyping() {
    let t = document.getElementById("typing");
    if (t) t.remove();
  }

  // ================= BOT =================
  async function getBotResponse(inputText) {
    try {
      let res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: inputText })
      });

      let data = await res.json();
      return data.reply;

    } catch (err) {
      let input = inputText.toLowerCase();

      if (input.includes("hi") || input.includes("hello"))
        return "Hi 👋 Welcome!";

      if (input.includes("name"))
        return "I am Jayesh Borole 🚀";

      if (input.includes("project"))
        return "Room Expense Tracker 💰";

      if (input.includes("skills"))
        return "Java, Spring Boot, APIs 💻";

      if (input.includes("contact"))
        return "📧 jayeshborole210@gmail.com";

      return "⚠️ Backend not running";
    }
  }

  // Greeting
  if (!localStorage.getItem("chat")) {
    setTimeout(() => {
      addMessage("Bot", "Hi 👋 Ask me anything!");
    }, 500);
  }

});
// ================= TYPING =================
function showTyping() {
  chatBox.innerHTML += `
    <div id="typing" class="bot-msg">
      <span class="dots"></span>
    </div>
  `;
}

function removeTyping() {
  let t = document.getElementById("typing");
  if (t) t.remove();
}

// ================= AI API =================
async function getBotResponse(input) {
  try {
    let res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    let data = await res.json();
    return data.reply;

  } catch (err) {
    return "⚠️ Server down";
  }
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
