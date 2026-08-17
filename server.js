$(document).ready(function () {

  // =====================================================
  // NAVBAR + SCROLL
  // =====================================================

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

    // Scroll reveal
    revealElements();
  });


  // Scroll to top
  $(".scroll-up-btn").click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
  });


  // Smooth navigation
  $(".navbar .menu li a").click(function () {
    $(".navbar .menu").removeClass("active");
    $(".menu-btn i").removeClass("active");

    const target = $(this).attr("href");

    if (target && target.startsWith("#")) {
      $("html, body").animate({
        scrollTop: $(target).offset().top - 70
      }, 700);
    }
  });


  // Mobile menu
  $(".menu-btn").click(function (e) {
    e.stopPropagation();

    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });


  // =====================================================
  // DARK / LIGHT MODE
  // =====================================================

  const themeBtn = document.getElementById("theme-toggle");

  if (themeBtn) {

    const savedTheme = localStorage.getItem("portfolioTheme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      themeBtn.innerHTML = "☀️";
    }

    themeBtn.addEventListener("click", function () {

      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("portfolioTheme", "dark");
        themeBtn.innerHTML = "☀️";

      } else {

        localStorage.setItem("portfolioTheme", "light");
        themeBtn.innerHTML = "🌙";
      }
    });
  }


  // =====================================================
  // TYPING EFFECT
  // =====================================================

  if (typeof Typed !== "undefined") {

    new Typed(".typing", {
      strings: [
        "Support Engineer",
        "Java Developer",
        "Backend Developer",
        "Spring Boot Developer"
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true
    });


    new Typed(".typing-2", {
      strings: [
        "Support Engineer",
        "Java Developer",
        "Backend Developer",
        "Spring Boot Developer"
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true
    });
  }


  // =====================================================
  // PROJECT CAROUSEL
  // =====================================================

  if ($.fn.owlCarousel) {

    $(".carousel").owlCarousel({

      margin: 20,
      loop: true,

      autoplay: true,
      autoplayTimeout: 2500,
      autoplayHoverPause: true,

      dots: true,
      nav: true,

      responsive: {

        0: {
          items: 1
        },

        600: {
          items: 2
        },

        1000: {
          items: 3
        }
      }

    });
  }


  // =====================================================
  // CHATBOT
  // =====================================================

  const icon = document.getElementById("chatbot-icon");
  const container = document.getElementById("chatbot-container");
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const sendBtn = document.getElementById("send-btn");


  if (icon && container && input && chatBox) {

    // -----------------------------------------------
    // Load previous chat
    // -----------------------------------------------

    loadChat();


    // -----------------------------------------------
    // Open / Close chatbot
    // -----------------------------------------------

    icon.addEventListener("click", function (e) {

      e.stopPropagation();

      if (container.style.display === "flex") {

        container.style.display = "none";

      } else {

        container.style.display = "flex";
        input.focus();
      }
    });


    // -----------------------------------------------
    // Prevent chatbot click from closing
    // -----------------------------------------------

    container.addEventListener("click", function (e) {
      e.stopPropagation();
    });


    // -----------------------------------------------
    // Enter key
    // -----------------------------------------------

    input.addEventListener("keypress", function (e) {

      if (e.key === "Enter") {

        e.preventDefault();

        sendMessage(input.value);
      }

    });


    // -----------------------------------------------
    // Send button
    // -----------------------------------------------

    if (sendBtn) {

      sendBtn.addEventListener("click", function () {

        sendMessage(input.value);

      });

    }


    // -----------------------------------------------
    // Quick buttons
    // -----------------------------------------------

    window.quickMsg = function (message) {

      sendMessage(message);

    };


    // -----------------------------------------------
    // Send Message
    // -----------------------------------------------

    function sendMessage(text) {

      text = text.trim();

      if (!text) return;


      // User message
      addMessage(text, "user");


      input.value = "";

      showTyping();


      // Bot response delay
      setTimeout(function () {

        removeTyping();

        const reply = getBotResponse(text);

        addMessage(reply, "bot");

      }, 700);

    }


    // -----------------------------------------------
    // Add Message
    // -----------------------------------------------

    function addMessage(message, type) {

      const div = document.createElement("div");

      div.classList.add(
        type === "user"
          ? "user-msg"
          : "bot-msg"
      );


      const span = document.createElement("span");

      span.textContent = message;

      div.appendChild(span);

      chatBox.appendChild(div);


      // Save chat
      saveChat();


      // Scroll bottom
      chatBox.scrollTop = chatBox.scrollHeight;

    }


    // -----------------------------------------------
    // Typing
    // -----------------------------------------------

    function showTyping() {

      if (document.getElementById("typing")) return;


      const typing = document.createElement("div");

      typing.id = "typing";

      typing.className = "bot-msg";

      typing.innerHTML = "<span>Jayesh Bot is typing... ⌨️</span>";


      chatBox.appendChild(typing);

      chatBox.scrollTop = chatBox.scrollHeight;

    }


    function removeTyping() {

      const typing = document.getElementById("typing");

      if (typing) {
        typing.remove();
      }

    }


    // -----------------------------------------------
    // Chatbot Response
    // -----------------------------------------------

    function getBotResponse(message) {

      const text = message.toLowerCase();


      // Greeting
      if (
        text.includes("hi") ||
        text.includes("hello") ||
        text.includes("hey")
      ) {

        return "Hi 👋 Welcome to Jayesh's Portfolio! How can I help you?";

      }


      // Name
      if (
        text.includes("name") ||
        text.includes("who are you")
      ) {

        return "I'm Jayesh Borole 🚀 — a Support Engineer and Java Developer.";

      }


      // About
      if (
        text.includes("about") ||
        text.includes("jayesh")
      ) {

        return "Jayesh is a software professional with experience in Application Support, Java, Spring Boot, REST APIs and MySQL.";

      }


      // Projects
      if (
        text.includes("project") ||
        text.includes("projects")
      ) {

        return "Jayesh has worked on Room Expenses Management, Coffee Shop Management, Food Ordering System, Employee Management and responsive web projects. 💻";

      }


      // Room Expenses
      if (
        text.includes("room") ||
        text.includes("expense")
      ) {

        return "RoomExpenses is a shared expense management application that helps users track room/flat expenses, manage members and organize shared payments. 💰";

      }


      // Skills
      if (
        text.includes("skill") ||
        text.includes("technology") ||
        text.includes("tech")
      ) {

        return "Jayesh's main skills include Core Java, Java, Spring Boot, Spring MVC, REST APIs, Hibernate, MySQL, Angular, TypeScript, HTML, CSS, JavaScript and GitHub. 🛠️";

      }


      // Java
      if (
        text.includes("java") ||
        text.includes("spring")
      ) {

        return "Jayesh works with Core Java, Spring Boot, Spring MVC, Hibernate and RESTful Web Services. ☕";

      }


      // Experience
      if (
        text.includes("experience") ||
        text.includes("work")
      ) {

        return "Jayesh has experience in Application Support and Development, including troubleshooting, production issue handling, SQL, APIs and Java technologies. 💼";

      }


      // Education
      if (
        text.includes("education") ||
        text.includes("college") ||
        text.includes("degree")
      ) {

        return "Jayesh completed his Bachelor of Computer Application (BCA) from KCES's Institute of Management & Research, Jalgaon with a CGPA of 9.29. 🎓";

      }


      // Contact
      if (
        text.includes("contact") ||
        text.includes("email") ||
        text.includes("phone")
      ) {

        return "You can contact Jayesh through the Contact section, LinkedIn, GitHub or email. 📧";

      }


      // GitHub
      if (
        text.includes("github")
      ) {

        return "You can check Jayesh's projects on GitHub from the GitHub icon in the portfolio. 🐙";

      }


      // LinkedIn
      if (
        text.includes("linkedin") ||
        text.includes("job")
      ) {

        return "You can connect with Jayesh on LinkedIn for professional opportunities. 💼";

      }


      // Resume
      if (
        text.includes("resume") ||
        text.includes("cv")
      ) {

        return "You can view/download Jayesh's Resume using the Resume or Download CV button. 📄";

      }


      // Thank you
      if (
        text.includes("thank") ||
        text.includes("thanks")
      ) {

        return "You're welcome! 😊 Feel free to ask me anything about Jayesh.";

      }


      // Bye
      if (
        text.includes("bye")
      ) {

        return "Goodbye 👋 Thanks for visiting Jayesh's Portfolio!";

      }


      // Default
      return "I'm not sure about that 🤔. You can ask me about Projects, Skills, Experience, Education, Resume or Contact.";

    }


    // -----------------------------------------------
    // Save Chat
    // -----------------------------------------------

    function saveChat() {

      localStorage.setItem(
        "portfolioChat",
        chatBox.innerHTML
      );

    }


    // -----------------------------------------------
    // Load Chat
    // -----------------------------------------------

    function loadChat() {

      const savedChat =
        localStorage.getItem("portfolioChat");


      if (savedChat) {

        chatBox.innerHTML = savedChat;

      }

    }


    // -----------------------------------------------
    // Clear Chat
    // -----------------------------------------------

    window.clearChat = function () {

      chatBox.innerHTML = "";

      localStorage.removeItem("portfolioChat");

    };

  }


  // =====================================================
  // CLICK OUTSIDE
  // =====================================================

  document.addEventListener("click", function (e) {

    if (
      container &&
      icon &&
      !container.contains(e.target) &&
      !icon.contains(e.target)
    ) {

      container.style.display = "none";

    }

  });


  // =====================================================
  // SCROLL REVEAL
  // =====================================================

  function revealElements() {

    const elements = document.querySelectorAll(
      ".education-card, .experience-card, .skill, .services .card, .projects .card"
    );


    const windowHeight = window.innerHeight;


    elements.forEach(function (element) {

      const position =
        element.getBoundingClientRect().top;


      if (position < windowHeight - 80) {

        element.classList.add("reveal-show");

      }

    });

  }


  revealElements();


  // =====================================================
  // COUNTER ANIMATION
  // =====================================================

  const counters =
    document.querySelectorAll(".counter");


  counters.forEach(function (counter) {

    counter.innerText = "0";


    function updateCounter() {

      const target =
        Number(counter.getAttribute("data-target"));


      const current =
        Number(counter.innerText);


      const increment =
        Math.ceil(target / 50);


      if (current < target) {

        counter.innerText =
          Math.min(current + increment, target);

        setTimeout(updateCounter, 30);

      } else {

        counter.innerText = target;

      }

    }


    updateCounter();

  });


  // =====================================================
  // PROJECT DETAILS MODAL
  // =====================================================

  const projectButtons =
    document.querySelectorAll(".project-details-btn");


  const projectModal =
    document.getElementById("project-modal");


  const closeProjectModal =
    document.getElementById("close-project-modal");


  projectButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const title =
        button.getAttribute("data-title");

      const description =
        button.getAttribute("data-description");

      const technologies =
        button.getAttribute("data-technologies");


      const modalTitle =
        document.getElementById("modal-project-title");

      const modalDescription =
        document.getElementById("modal-project-description");

      const modalTech =
        document.getElementById("modal-project-tech");


      if (modalTitle) {
        modalTitle.textContent = title;
      }


      if (modalDescription) {
        modalDescription.textContent = description;
      }


      if (modalTech) {
        modalTech.textContent = technologies;
      }


      if (projectModal) {
        projectModal.style.display = "flex";
      }

    });

  });


  // Close modal
  if (closeProjectModal) {

    closeProjectModal.addEventListener("click", function () {

      projectModal.style.display = "none";

    });

  }


  // Click outside modal
  if (projectModal) {

    projectModal.addEventListener("click", function (e) {

      if (e.target === projectModal) {

        projectModal.style.display = "none";

      }

    });

  }


  // =====================================================
  // RESUME PREVIEW
  // =====================================================

  const resumeBtn =
    document.querySelector(".resume-preview-btn");


  const resumeModal =
    document.getElementById("resume-modal");


  const closeResume =
    document.getElementById("close-resume-modal");


  if (resumeBtn && resumeModal) {

    resumeBtn.addEventListener("click", function (e) {

      e.preventDefault();

      resumeModal.style.display = "flex";

    });

  }


  if (closeResume) {

    closeResume.addEventListener("click", function () {

      resumeModal.style.display = "none";

    });

  }


  if (resumeModal) {

    resumeModal.addEventListener("click", function (e) {

      if (e.target === resumeModal) {

        resumeModal.style.display = "none";

      }

    });

  }


  // =====================================================
  // CONTACT FORM
  // =====================================================

  const contactForm =
    document.querySelector(".contact form");


  if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

      e.preventDefault();


      const button =
        contactForm.querySelector("button");


      const originalText =
        button.innerHTML;


      button.innerHTML =
        "Sending... ⏳";


      button.disabled = true;


      const formData =
        new FormData(contactForm);


      fetch(contactForm.action, {

        method: "POST",

        body: formData,

        headers: {
          Accept: "application/json"
        }

      })

      .then(function (response) {

        if (!response.ok) {
          throw new Error("Failed");
        }

        return response.json();

      })

      .then(function () {

        button.innerHTML =
          "Message Sent ✓";


        contactForm.reset();


        setTimeout(function () {

          button.innerHTML =
            originalText;

          button.disabled = false;

        }, 2500);

      })

      .catch(function () {

        button.innerHTML =
          "Try Again";


        button.disabled = false;

      });

    });

  }


  // =====================================================
  // ESC KEY
  // =====================================================

  document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

      if (projectModal) {
        projectModal.style.display = "none";
      }


      if (resumeModal) {
        resumeModal.style.display = "none";
      }


      if (container) {
        container.style.display = "none";
      }

    }

  });

});
