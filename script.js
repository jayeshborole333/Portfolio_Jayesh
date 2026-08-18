$(document).ready(function () {
  const body = document.body;
  const themeBtn = document.getElementById("theme-toggle");
  const chatIcon = document.getElementById("chatbot-icon");
  const chatContainer = document.getElementById("chatbot-container");
  const chatInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const sendBtn = document.getElementById("send-btn");
  const clearChatBtn = document.getElementById("clear-chat");
  const toast = document.getElementById("toast");

  // Theme
  const savedTheme = localStorage.getItem("portfolioTheme");
  if (savedTheme === "dark") body.classList.add("dark-mode");
  updateThemeIcon();
  themeBtn?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("portfolioTheme", body.classList.contains("dark-mode") ? "dark" : "light");
    updateThemeIcon();
  });
  function updateThemeIcon() {
    if (themeBtn) themeBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
  }

  // Navbar / scroll
  $(window).on("scroll", function () {
    $(".navbar").toggleClass("sticky", this.scrollY > 20);
    $(".scroll-up-btn").toggleClass("show", this.scrollY > 500);
    revealElements();
  });
  $(".scroll-up-btn").on("click", () => $("html, body").animate({ scrollTop: 0 }, 600));
  $(".navbar .menu li a, .footer-column a").on("click", function (e) {
    const target = $(this).attr("href");
    if (target?.startsWith("#") && $(target).length) {
      e.preventDefault();
      $(".navbar .menu").removeClass("active");
      $("html, body").animate({ scrollTop: $(target).offset().top - 65 }, 650);
    }
  });
  $(".menu-toggle").on("click", function (e) {
    e.stopPropagation();
    $(".navbar .menu").toggleClass("active");
  });

  // Typing
  if (typeof Typed !== "undefined") {
    [".typing", ".typing-2"].forEach(selector => {
      if ($(selector).length) new Typed(selector, {
        strings: ["Application Support Engineer", "Java Developer", "Backend Developer", "Spring Boot Developer"],
        typeSpeed: 70, backSpeed: 45, backDelay: 1400, loop: true
      });
    });
  }

  // Carousel
  if ($.fn.owlCarousel && $(".project-carousel").length) {
    $(".project-carousel").owlCarousel({ margin: 20, loop: true, autoplay: true, autoplayTimeout: 3000, autoplayHoverPause: true, dots: true, nav: true, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } } });
  }

  // Project modal
  const projects = {
    coffee: { title: "Coffee Shop Management", description: "A management application for handling coffee shop operations, products and customer orders.", tech: ["Java", "MySQL", "HTML", "CSS"], github: "https://github.com/jayeshborole333/Cofee_Shop_Management" },
    headphone: { title: "Headphone Landing Page", description: "A responsive product landing page focused on product presentation, responsive layout and clean UI.", tech: ["HTML", "CSS", "JavaScript"], github: "https://github.com/jayeshborole333" },
    vadapav: { title: "Patil VadaPav", description: "A food-business website for showcasing products, menu items and business information.", tech: ["HTML", "CSS", "JavaScript"], github: "https://github.com/jayeshborole333" },
    food: { title: "Food Ordering System", description: "An online food ordering concept where users can browse meals, select items and place orders.", tech: ["Java", "MySQL", "HTML", "CSS"], github: "https://github.com/jayeshborole333" },
    room: { title: "Room Expenses", description: "A shared expense management application designed to track room or flat expenses, members and shared payments.", tech: ["Java", "Spring Boot", "MySQL", "Angular", "REST API"], github: "https://github.com/jayeshborole333" },
    employee: { title: "Employee Management", description: "An employee management application for maintaining employee records and payroll-related information.", tech: ["Java", "Spring", "MySQL"], github: "https://github.com/jayeshborole333" }
  };
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-project-title");
  const modalDescription = document.getElementById("modal-project-description");
  const modalTech = document.getElementById("modal-project-tech");
  const modalGithub = document.getElementById("modal-project-github");
  function openProject(key) {
    const p = projects[key]; if (!p || !modal) return;
    modalTitle.textContent = p.title; modalDescription.textContent = p.description;
    modalTech.innerHTML = p.tech.map(t => `<span>${escapeHtml(t)}</span>`).join("");
    modalGithub.href = p.github; modal.style.display = "flex"; modal.setAttribute("aria-hidden", "false");
  }
  function closeProject() { if (modal) { modal.style.display = "none"; modal.setAttribute("aria-hidden", "true"); } }
  document.querySelectorAll(".project-details-btn").forEach(btn => btn.addEventListener("click", () => openProject(btn.dataset.project)));
  document.getElementById("close-project-modal")?.addEventListener("click", closeProject);
  modal?.addEventListener("click", e => { if (e.target === modal) closeProject(); });

  // Chatbot
  if (chatIcon && chatContainer && chatInput && chatBox) {
    const saved = localStorage.getItem("portfolioChat");
    chatBox.innerHTML = saved || `<div class="bot-msg"><span>Hi 👋 I'm Jayesh's portfolio assistant. Ask me about Java, projects, experience, resume or contact.</span></div>`;
    chatIcon.addEventListener("click", () => {
      const open = chatContainer.style.display === "flex";
      chatContainer.style.display = open ? "none" : "flex";
      chatContainer.setAttribute("aria-hidden", String(open));
      if (!open) chatInput.focus();
    });
    document.getElementById("chat-close")?.addEventListener("click", () => { chatContainer.style.display = "none"; });
    document.querySelectorAll("#quick-btns button").forEach(btn => btn.addEventListener("click", () => sendMessage(btn.dataset.message)));
    sendBtn?.addEventListener("click", () => sendMessage(chatInput.value));
    chatInput.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); sendMessage(chatInput.value); } });
    clearChatBtn?.addEventListener("click", () => { localStorage.removeItem("portfolioChat"); chatBox.innerHTML = `<div class="bot-msg"><span>Chat cleared. How can I help? 😊</span></div>`; });

    function sendMessage(raw) {
      const text = raw.trim(); if (!text) return;
      append("user-msg", text); chatInput.value = "";
      const typing = document.createElement("div"); typing.id = "typing"; typing.className = "bot-msg"; typing.innerHTML = "<span>Typing...</span>"; chatBox.appendChild(typing); scrollChat();
      setTimeout(() => { typing.remove(); append("bot-msg", getBotResponse(text)); saveChat(); }, 450);
    }
    function append(cls, text) { const div = document.createElement("div"); div.className = cls; const span = document.createElement("span"); span.textContent = text; div.appendChild(span); chatBox.appendChild(div); scrollChat(); }
    function saveChat() { localStorage.setItem("portfolioChat", chatBox.innerHTML); }
    function scrollChat() { chatBox.scrollTop = chatBox.scrollHeight; }
    function getBotResponse(input) {
      const t = input.toLowerCase();
      if (/\b(hi|hello|hey)\b/.test(t)) return "Hi 👋 Welcome to Jayesh's portfolio!";
      if (t.includes("name") || t.includes("who are you")) return "Jayesh Borole is a Java Developer and Application Support Engineer.";
      if (t.includes("skill") || t.includes("technology") || t.includes("tech")) return "Core Java, Spring Boot, Spring MVC, Hibernate, REST APIs, MySQL, Angular, TypeScript, HTML, CSS, JavaScript and GitHub.";
      if (t.includes("java") || t.includes("spring") || t.includes("backend")) return "Jayesh works with Core Java, Spring Boot, Spring MVC, Hibernate and RESTful APIs for backend development.";
      if (t.includes("project") || t.includes("expense") || t.includes("room")) return "The Room Expenses project helps users manage shared room/flat expenses, members and payments. Other projects include Coffee Shop, Food Ordering and Employee Management.";
      if (t.includes("experience") || t.includes("support") || t.includes("work")) return "Jayesh has experience in Application Support and Development, including production troubleshooting, SQL, APIs and Java technologies.";
      if (t.includes("education") || t.includes("degree") || t.includes("college")) return "Jayesh completed BCA from KCES's Institute of Management & Research, Jalgaon with a CGPA of 9.29.";
      if (t.includes("resume") || t.includes("cv")) return "You can open Jayesh's Resume using the Resume button in the Home section.";
      if (t.includes("contact") || t.includes("email") || t.includes("phone")) return "You can use the Contact section or connect through LinkedIn, GitHub, WhatsApp or email.";
      if (t.includes("github")) return "Jayesh's GitHub is available from the GitHub icon in the portfolio.";
      if (t.includes("linkedin") || t.includes("hire") || t.includes("job")) return "Jayesh is open to Java Developer and Application Support opportunities. Let's connect through LinkedIn or the Contact section.";
      if (t.includes("thank")) return "You're welcome! 😊";
      return "I can help with Projects, Skills, Java, Experience, Education, Resume or Contact. Try one of these topics.";
    }
  }

  // Contact form feedback
  const contactForm = document.querySelector(".contact form");
  contactForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const button = this.querySelector("button"); const old = button.innerHTML;
    button.disabled = true; button.innerHTML = "Sending... ⏳";
    fetch(this.action, { method: "POST", body: new FormData(this), headers: { Accept: "application/json" } })
      .then(r => { if (!r.ok) throw new Error("send failed"); return r.json(); })
      .then(() => { this.reset(); button.innerHTML = "Message Sent ✓"; showToast("Thanks! Your message was sent successfully."); setTimeout(() => { button.innerHTML = old; button.disabled = false; }, 2500); })
      .catch(() => { button.innerHTML = "Try Again"; button.disabled = false; showToast("Unable to send right now. Please try email/WhatsApp."); });
  });

  function showToast(message) { if (!toast) return; toast.textContent = message; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3200); }
  function revealElements() { document.querySelectorAll(".snapshot-card, .hire-banner, .education-card, .experience-card, .skill, .services .card, .project-card").forEach(el => { if (el.getBoundingClientRect().top < innerHeight - 70) el.classList.add("reveal-show"); }); }
  function escapeHtml(value) { const d = document.createElement("div"); d.textContent = value; return d.innerHTML; }
  revealElements();
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeProject(); });
});
