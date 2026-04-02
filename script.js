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

  // ================= CHATBOT =================

  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  if (input && chatBox) {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        let userText = input.value.trim();

        if (userText === "") return;

        chatBox.innerHTML += `<p><b>You:</b> ${userText}</p>`;

        let botReply = getBotResponse(userText);
        chatBox.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;

        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    });
  }

  function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) return "Hi! 👋";
    if (input.includes("portfolio")) return "This is my portfolio website!";
    if (input.includes("contact")) return "You can contact me via email!";
    if (input.includes("name")) return "I am your portfolio bot 🤖";

    return "Sorry, I didn’t understand 😅";
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
