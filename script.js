$(document).ready(function () {

  $(window).scroll(function () {
    // Sticky navbar
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // Scroll-up button show/hide
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // Scroll-up click
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
  });

  // Smooth scroll for menu
  $(".navbar .menu li a").click(function () {
    $("html").css("scrollBehavior", "smooth");
  });

  // Toggle Navbar
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// 👇 Apni portfolio info yaha likh
const portfolioData = `
My name is Jayesh.
I am a Customer Support Engineer L2.
I work on Interakt, WhatsApp API, integrations, and troubleshooting.
My skills include HTML, CSS, JavaScript, and customer support.
Contact: your@email.com
`;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a portfolio assistant. Answer only based on this info: ${portfolioData}`
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  // Chatbot Toggle
$("#chatbot-icon").click(function () {
  $("#chatbot-container").toggle();
});

// Chatbot Logic
// Toggle chatbot (NO jQuery needed)
const icon = document.getElementById("chatbot-icon");
const container = document.getElementById("chatbot-container");

icon.addEventListener("click", () => {
  container.style.display =
    container.style.display === "flex" ? "none" : "flex";
});

// Chat logic
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    let userText = input.value.trim();
    if (userText === "") return;

    chatBox.innerHTML += `<p><b>You:</b> ${userText}</p>`;

    let botReply = getBotResponse(userText);

    setTimeout(() => {
      chatBox.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);

    input.value = "";
  }
});

// Smart portfolio answers
function getBotResponse(input) {
  input = input.toLowerCase();

  if (input.includes("hi") || input.includes("hello"))
    return "Hi 👋 Welcome to my portfolio!";

  if (input.includes("name"))
    return "My name is Jayesh 😊";

  if (input.includes("project") || input.includes("work"))
    return "I have built a Room Expense Tracker project 💰";

  if (input.includes("skills"))
    return "I am skilled in Customer Support, Tech, and Web Basics 💻";

  if (input.includes("contact"))
    return "You can contact me at: your@email.com 📧";

  if (input.includes("experience"))
    return "I have experience as a Customer Support Engineer 🚀";

  return "Sorry 😅 I can answer only portfolio-related questions.";
}
  // ================= TYPING ANIMATION =================

  var typed1 = new Typed(".typing", {
    strings: [
      "Customer Support Engineer",
      "Support Engineer L2"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  var typed2 = new Typed(".typing-2", {
    strings: [
      "Customer Support Engineer",
      "Support Engineer L2"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  // ================= OWL CAROUSEL =================

  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 3,
        nav: false
      }
    }
  });

});
