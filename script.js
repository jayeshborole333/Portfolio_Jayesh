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

  function getBotResponse(input) {
  input = input.toLowerCase();

  const responses = [
    {
      keywords: ["hi", "hello", "hey"],
      reply: "Hi 👋 Welcome to my portfolio!"
    },
    {
      keywords: ["name", "who are you"],
      reply: "My name is Jayesh Borole 😊"
    },
    {
      keywords: ["project", "work", "portfolio"],
      reply: "I have built Coffee Shop, Headphone Landing Page, Food Ordering System, and Room Expense Tracker."
    },
    {
      keywords: ["skills", "tech", "technology"],
      reply: "HTML, CSS, JavaScript, SQL, Chatbot Specialist, Scrum Master, Java, Spring, Microservices, Customer Support & WhatsApp API 💻"
    },
    {
      keywords: ["contact", "email", "reach"],
      reply: "You can contact me at: jayeshborole210@gmail.com 📧"
    },
    {
      keywords: ["experience", "job", "role"],
      reply: `Application Support Engineer with 2 years of experience at Sofquare Digital (OPC) Pvt. Ltd.
Skilled in application support, SQL, troubleshooting, and incident management. Strong foundation in IT fundamentals with experience in Banking domain (Loan Management & LOS). 🚀`
    }
  ];

  // loop through responses
  for (let i = 0; i < responses.length; i++) {
    for (let j = 0; j < responses[i].keywords.length; j++) {
      if (input.includes(responses[i].keywords[j])) {
        return responses[i].reply;
      }
    }
  }

  return "Sorry 😅 I can answer only portfolio-related questions.";
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
