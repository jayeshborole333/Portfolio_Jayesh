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

  // 👉 Toggle chatbot
  icon.addEventListener("click", function (e) {
    e.stopPropagation();

    if (container.style.display === "flex") {
      container.style.display = "none";
    } else {
      container.style.display = "flex";
    }
  });

  // 👉 Prevent close when clicking inside
  container.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // 👉 Outside click = close + reset
  document.addEventListener("click", function () {
    container.style.display = "none";
    chatBox.innerHTML = "";
    localStorage.removeItem("chat");
  });

  // 👉 Enter key
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage(input.value);
    }
  });

  // 👉 Button click
  window.sendBtn = function () {
    sendMessage(input.value);
  };

  // 👉 Quick buttons
  window.quickMsg = function (msg) {
    sendMessage(msg);
  };

  // ================= SEND MESSAGE =================
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

  // ================= ADD MESSAGE =================
  function addMessage(sender, text) {
    let className = sender === "You" ? "user-msg" : "bot-msg";

    chatBox.innerHTML += `
      <div class="${className}">
        <span>${text}</span>
      </div>
    `;
  }

  // ================= TYPING =================
  function showTyping() {
    chatBox.innerHTML += `
      <div id="typing" class="bot-msg">
        <span class="dots">Typing...</span>
      </div>
    `;
  }

  function removeTyping() {
    let t = document.getElementById("typing");
    if (t) t.remove();
  }

  // ================= BOT RESPONSE =================
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
      // 🔥 fallback (important)
      let input = inputText.toLowerCase();

      if (input.includes("hi") || input.includes("hello"))
        return "Hi 👋 Welcome to my portfolio!";

      if (input.includes("name"))
        return "I am Jayesh Borole 🚀";

      if (input.includes("project"))
        return "I built Room Expense Tracker 💰";

      if (input.includes("skills"))
        return "Java, Spring Boot, APIs, JSON 💻";

      if (input.includes("contact"))
        return "📧 jayeshborole210@gmail.com";

      return "🤖 Backend not connected but I'm still alive!";
    }
  }

  // 👉 Auto greeting
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
