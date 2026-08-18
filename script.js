$(document).ready(function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const chatIcon = document.getElementById("chatbot-icon");
    const chatContainer = document.getElementById("chatbot-container");
    const chatInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const sendBtn = document.getElementById("send-btn");
    const clearChatBtn = document.getElementById("clear-chat");
    const toast = document.getElementById("toast");


    /* =====================================================
       CHATBOT WELCOME MESSAGE
    ===================================================== */

    const welcomeMessage = `
        <div class="bot-msg">
            <span>
                Hi 👋 I'm Jayesh's portfolio assistant.
                Ask me about Java, projects, experience, resume or contact.
            </span>
        </div>
    `;


    /* =====================================================
       NAVBAR / SCROLL
    ===================================================== */

    $(window).on("scroll", function () {

        $(".navbar").toggleClass(
            "sticky",
            this.scrollY > 20
        );

        $(".scroll-up-btn").toggleClass(
            "show",
            this.scrollY > 500
        );

        revealElements();
    });


    /* =====================================================
       SCROLL UP BUTTON
    ===================================================== */

    $(".scroll-up-btn").on("click", function () {

        $("html, body").animate(
            {
                scrollTop: 0
            },
            600
        );

    });


    /* =====================================================
       NAVIGATION LINKS
    ===================================================== */

    $(".navbar .menu li a, .footer-column a").on(
        "click",
        function (e) {

            const target = $(this).attr("href");

            if (
                target &&
                target.startsWith("#") &&
                $(target).length
            ) {

                e.preventDefault();

                $(".navbar .menu").removeClass("active");

                $("html, body").animate(
                    {
                        scrollTop:
                            $(target).offset().top - 65
                    },
                    650
                );
            }

        }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    $(".menu-toggle").on("click", function (e) {

        e.stopPropagation();

        $(".navbar .menu").toggleClass("active");

    });


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    if (typeof Typed !== "undefined") {

        [".typing", ".typing-2"].forEach(
            function (selector) {

                if ($(selector).length) {

                    new Typed(selector, {

                        strings: [
                            "Application Support Engineer",
                            "Java Developer",
                            "Backend Developer",
                            "Spring Boot Developer"
                        ],

                        typeSpeed: 70,
                        backSpeed: 45,
                        backDelay: 1400,
                        loop: true

                    });

                }

            }
        );

    }


    /* =====================================================
       OWL CAROUSEL
    ===================================================== */

    if (
        $.fn.owlCarousel &&
        $(".project-carousel").length
    ) {

        $(".project-carousel").owlCarousel({

            margin: 20,

            loop: true,

            autoplay: true,

            autoplayTimeout: 3000,

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


    /* =====================================================
       PROJECT DATA
    ===================================================== */

    const projects = {

        coffee: {

            title: "Coffee Shop Management",

            description:
                "A management application for handling coffee shop operations, products and customer orders.",

            tech: [
                "Java",
                "MySQL",
                "HTML",
                "CSS"
            ],

            github:
                "https://github.com/jayeshborole333/Cofee_Shop_Management"

        },


        headphone: {

            title: "Headphone Landing Page",

            description:
                "A responsive product landing page focused on product presentation, responsive layout and clean UI.",

            tech: [
                "HTML",
                "CSS",
                "JavaScript"
            ],

            github:
                "https://github.com/jayeshborole333"

        },


        vadapav: {

            title: "Patil VadaPav",

            description:
                "A food-business website for showcasing products, menu items and business information.",

            tech: [
                "HTML",
                "CSS",
                "JavaScript"
            ],

            github:
                "https://github.com/jayeshborole333"

        },


        food: {

            title: "Food Ordering System",

            description:
                "An online food ordering concept where users can browse meals, select items and place orders.",

            tech: [
                "Java",
                "MySQL",
                "HTML",
                "CSS"
            ],

            github:
                "https://github.com/jayeshborole333"

        },


        room: {

            title: "Room Expenses",

            description:
                "A shared expense management application designed to track room or flat expenses, members and shared payments.",

            tech: [
                "Java",
                "Spring Boot",
                "MySQL",
                "Angular",
                "REST API"
            ],

            github:
                "https://github.com/jayeshborole333"

        },


        employee: {

            title: "Employee Management",

            description:
                "An employee management application for maintaining employee records and payroll-related information.",

            tech: [
                "Java",
                "Spring",
                "MySQL"
            ],

            github:
                "https://github.com/jayeshborole333"

        }

    };


    /* =====================================================
       PROJECT MODAL ELEMENTS
    ===================================================== */

    const modal =
        document.getElementById("project-modal");

    const modalTitle =
        document.getElementById(
            "modal-project-title"
        );

    const modalDescription =
        document.getElementById(
            "modal-project-description"
        );

    const modalTech =
        document.getElementById(
            "modal-project-tech"
        );

    const modalGithub =
        document.getElementById(
            "modal-project-github"
        );


    /* =====================================================
       OPEN PROJECT MODAL
    ===================================================== */

    function openProject(key) {

        const project = projects[key];

        if (!project || !modal) {
            return;
        }

        if (modalTitle) {
            modalTitle.textContent =
                project.title;
        }

        if (modalDescription) {
            modalDescription.textContent =
                project.description;
        }

        if (modalTech) {

            modalTech.innerHTML =
                project.tech
                    .map(
                        function (technology) {
                            return `
                                <span>
                                    ${escapeHtml(technology)}
                                </span>
                            `;
                        }
                    )
                    .join("");

        }

        if (modalGithub) {
            modalGithub.href =
                project.github;
        }

        modal.style.display = "flex";

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* =====================================================
       CLOSE PROJECT MODAL
    ===================================================== */

    function closeProject() {

        if (!modal) {
            return;
        }

        modal.style.display = "none";

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       PROJECT DETAILS BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".project-details-btn")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openProject(
                            button.dataset.project
                        );

                    }
                );

            }
        );


    /* =====================================================
       PROJECT MODAL CLOSE BUTTON
    ===================================================== */

    document
        .getElementById("close-project-modal")
        ?.addEventListener(
            "click",
            closeProject
        );


    /* =====================================================
       CLOSE MODAL WHEN CLICKING OUTSIDE
    ===================================================== */

    modal?.addEventListener(
        "click",
        function (e) {

            if (e.target === modal) {
                closeProject();
            }

        }
    );


    /* =====================================================
       CHATBOT
    ===================================================== */

    if (
        chatIcon &&
        chatContainer &&
        chatInput &&
        chatBox
    ) {


        /* =================================================
           INITIAL CHAT
        ================================================= */

        chatBox.innerHTML =
            welcomeMessage;


        /* =================================================
           OPEN / CLOSE CHATBOT
        ================================================= */

        chatIcon.addEventListener(
            "click",
            function (e) {

                e.stopPropagation();

                const isOpen =
                    chatContainer.style.display === "flex";

                if (isOpen) {

                    closeAndClearChat();

                } else {

                    chatContainer.style.display =
                        "flex";

                    chatContainer.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    chatInput.focus();

                }

            }
        );


        /* =================================================
           CLOSE + CLEAR CHAT
        ================================================= */

        function closeAndClearChat() {

            chatContainer.style.display =
                "none";

            chatContainer.setAttribute(
                "aria-hidden",
                "true"
            );

            /* Clear current chat */
            chatBox.innerHTML =
                welcomeMessage;

            /* Remove saved chat */
            localStorage.removeItem(
                "portfolioChat"
            );

            /* Remove typing message if present */
            const typing =
                document.getElementById("typing");

            if (typing) {
                typing.remove();
            }

            /* Clear input */
            chatInput.value = "";

        }


        /* =================================================
           CHAT CLOSE BUTTON
        ================================================= */

        document
            .getElementById("chat-close")
            ?.addEventListener(
                "click",
                function (e) {

                    e.stopPropagation();

                    closeAndClearChat();

                }
            );


        /* =================================================
           CLICK OUTSIDE CHATBOT
        ================================================= */

        document.addEventListener(
            "click",
            function (e) {

                const clickedInsideChat =
                    chatContainer.contains(e.target);

                const clickedChatIcon =
                    chatIcon.contains(e.target);

                if (
                    chatContainer.style.display ===
                        "flex" &&
                    !clickedInsideChat &&
                    !clickedChatIcon
                ) {

                    closeAndClearChat();

                }

            }
        );


        /* =================================================
           QUICK CHAT BUTTONS
        ================================================= */

        document
            .querySelectorAll("#quick-btns button")
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (e) {

                            e.stopPropagation();

                            sendMessage(
                                button.dataset.message
                            );

                        }
                    );

                }
            );


        /* =================================================
           SEND BUTTON
        ================================================= */

        sendBtn?.addEventListener(
            "click",
            function (e) {

                e.stopPropagation();

                sendMessage(
                    chatInput.value
                );

            }
        );


        /* =================================================
           ENTER KEY
        ================================================= */

        chatInput.addEventListener(
            "keydown",
            function (e) {

                if (e.key === "Enter") {

                    e.preventDefault();

                    sendMessage(
                        chatInput.value
                    );

                }

            }
        );


        /* =================================================
           CLEAR CHAT BUTTON
        ================================================= */

        clearChatBtn?.addEventListener(
            "click",
            function (e) {

                e.stopPropagation();

                localStorage.removeItem(
                    "portfolioChat"
                );

                chatBox.innerHTML =
                    welcomeMessage;

                chatInput.value = "";

            }
        );


        /* =================================================
           SEND MESSAGE
        ================================================= */

        function sendMessage(raw) {

            const text =
                raw.trim();

            if (!text) {
                return;
            }


            /* User message */
            append(
                "user-msg",
                text
            );


            /* Clear input */
            chatInput.value = "";


            /* Typing indicator */
            const typing =
                document.createElement("div");

            typing.id = "typing";

            typing.className =
                "bot-msg";

            typing.innerHTML =
                "<span>Typing...</span>";

            chatBox.appendChild(
                typing
            );

            scrollChat();


            /* Bot response */
            setTimeout(
                function () {

                    if (
                        !chatContainer ||
                        chatContainer.style.display !==
                            "flex"
                    ) {
                        return;
                    }

                    typing.remove();

                    append(
                        "bot-msg",
                        getBotResponse(text)
                    );

                    saveChat();

                },
                450
            );

        }


        /* =================================================
           APPEND CHAT MESSAGE
        ================================================= */

        function append(
            className,
            text
        ) {

            const div =
                document.createElement("div");

            div.className =
                className;

            const span =
                document.createElement("span");

            span.textContent =
                text;

            div.appendChild(
                span
            );

            chatBox.appendChild(
                div
            );

            scrollChat();

        }


        /* =================================================
           SAVE CHAT
        ================================================= */

        function saveChat() {

            localStorage.setItem(
                "portfolioChat",
                chatBox.innerHTML
            );

        }


        /* =================================================
           CHAT SCROLL
        ================================================= */

        function scrollChat() {

            chatBox.scrollTop =
                chatBox.scrollHeight;

        }


        /* =================================================
           BOT RESPONSE
        ================================================= */

        function getBotResponse(input) {

            const text =
                input.toLowerCase();


            if (
                /\b(hi|hello|hey)\b/.test(text)
            ) {

                return "Hi 👋 Welcome to Jayesh's portfolio!";

            }


            if (
                text.includes("name") ||
                text.includes("who are you")
            ) {

                return "Jayesh Borole is a Java Developer and Application Support Engineer.";

            }


            if (
                text.includes("skill") ||
                text.includes("technology") ||
                text.includes("tech")
            ) {

                return "Core Java, Spring Boot, Spring MVC, Hibernate, REST APIs, MySQL, Angular, TypeScript, HTML, CSS, JavaScript and GitHub.";

            }


            if (
                text.includes("java") ||
                text.includes("spring") ||
                text.includes("backend")
            ) {

                return "Jayesh works with Core Java, Spring Boot, Spring MVC, Hibernate and RESTful APIs for backend development.";

            }


            if (
                text.includes("project") ||
                text.includes("expense") ||
                text.includes("room")
            ) {

                return "The Room Expenses project helps users manage shared room/flat expenses, members and payments. Other projects include Coffee Shop, Food Ordering and Employee Management.";

            }


            if (
                text.includes("experience") ||
                text.includes("support") ||
                text.includes("work")
            ) {

                return "Jayesh has experience in Application Support and Development, including production troubleshooting, SQL, APIs and Java technologies.";

            }


            if (
                text.includes("education") ||
                text.includes("degree") ||
                text.includes("college")
            ) {

                return "Jayesh completed BCA from KCES's Institute of Management & Research, Jalgaon with a CGPA of 9.29.";

            }


            if (
                text.includes("resume") ||
                text.includes("cv")
            ) {

                return "You can open Jayesh's Resume using the Resume button in the Home section.";

            }


            if (
                text.includes("contact") ||
                text.includes("email") ||
                text.includes("phone")
            ) {

                return "You can use the Contact section or connect through LinkedIn, GitHub, WhatsApp or email.";

            }


            if (
                text.includes("github")
            ) {

                return "Jayesh's GitHub is available from the GitHub icon in the portfolio.";

            }


            if (
                text.includes("linkedin") ||
                text.includes("hire") ||
                text.includes("job")
            ) {

                return "Jayesh is open to Java Developer and Application Support opportunities. Let's connect through LinkedIn or the Contact section.";

            }


            if (
                text.includes("thank")
            ) {

                return "You're welcome! 😊";

            }


            return "I can help with Projects, Skills, Java, Experience, Education, Resume or Contact. Try one of these topics.";

        }

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector(
            ".contact form"
        );


    contactForm?.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const button =
                this.querySelector("button");


            if (!button) {
                return;
            }


            const oldText =
                button.innerHTML;


            button.disabled =
                true;

            button.innerHTML =
                "Sending... ⏳";


            fetch(
                this.action,
                {
                    method: "POST",

                    body:
                        new FormData(this),

                    headers: {
                        Accept:
                            "application/json"
                    }
                }
            )

            .then(
                function (response) {

                    if (!response.ok) {
                        throw new Error(
                            "Send failed"
                        );
                    }

                    return response.json();

                }
            )

            .then(
                function () {

                    contactForm.reset();

                    button.innerHTML =
                        "Message Sent ✓";

                    showToast(
                        "Thanks! Your message was sent successfully."
                    );


                    setTimeout(
                        function () {

                            button.innerHTML =
                                oldText;

                            button.disabled =
                                false;

                        },
                        2500
                    );

                }
            )

            .catch(
                function () {

                    button.innerHTML =
                        "Try Again";

                    button.disabled =
                        false;

                    showToast(
                        "Unable to send right now. Please try email/WhatsApp."
                    );

                }
            );

        }
    );


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );


        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            3200
        );

    }


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    function revealElements() {

        document
            .querySelectorAll(
                ".snapshot-card, " +
                ".hire-banner, " +
                ".education-card, " +
                ".experience-card, " +
                ".skill, " +
                ".services .card, " +
                ".project-card"
            )
            .forEach(
                function (element) {

                    if (
                        element.getBoundingClientRect().top <
                        window.innerHeight - 70
                    ) {

                        element.classList.add(
                            "reveal-show"
                        );

                    }

                }
            );

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHtml(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value;

        return div.innerHTML;

    }


    /* =====================================================
       INITIAL REVEAL
    ===================================================== */

    revealElements();


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Escape") {

                closeProject();

                /* Also close chatbot if open */
                if (
                    chatContainer &&
                    chatContainer.style.display ===
                        "flex"
                ) {

                    const event =
                        new Event("click");

                    chatContainer.dispatchEvent(
                        event
                    );

                }

            }

        }
    );

});
