      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyCNesK6Sf-t_DnSvH79-9dji1H5EJXWEZI",
        authDomain: "aiwallahportfolio.firebaseapp.com",
        projectId: "aiwallahportfolio",
        storageBucket: "aiwallahportfolio.firebasestorage.app",
        messagingSenderId: "200303589179",
        appId: "1:200303589179:web:443041105a484f0d86a91e",
        measurementId: "G-4TJ2MLSGXL"
      };
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
            const chatOverlay = document.getElementById('chatOverlay');
            const chatMessages = document.getElementById('chatMessages');
            const chatInput = document.getElementById('chatInput');
            const themeToggle = document.querySelector('.theme-toggle');
            const myFullName = "Narendra Damodardas Modi"; // Updated full name
            const myDescription = document.getElementById('myDescription').textContent;
            let isFirstOpen = true;
    
            function toggleChat() {
                if (chatOverlay.style.display !== 'block' && isFirstOpen) {
                    chatMessages.innerHTML = ''; // Clear previous messages
                    const initialMessage = document.createElement('div');
                    initialMessage.className = 'message ai';
                    initialMessage.innerHTML = `<div class="message-text">Hi, I am ${myFullName}. What do you want to know about me?</div>`;
                    chatMessages.appendChild(initialMessage);
                    isFirstOpen = false;
                }
                chatOverlay.style.display = chatOverlay.style.display === 'block' ? 'none' : 'block';
            }
    
            async function sendMessage() {
                const messageText = chatInput.value.trim();
                if (!messageText) return;
    
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message user';
                userMessage.innerHTML = `<div class="message-text">${messageText}</div>`;
                chatMessages.appendChild(userMessage);
    
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
    
                // Add typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'message ai typing-indicator';
                typingIndicator.innerHTML = `
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                `;
                chatMessages.appendChild(typingIndicator);
                chatMessages.scrollTop = chatMessages.scrollHeight;
    
                // Simulate API call to Gemini (replace with actual API call)
                try {
                    const apiKey = "AIzaSyBhUM4x7a-VtVtL4bG8SS0455UrPp1icOM"; // Replace with your actual API key
                    const response = await fetch(
                        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                contents: [{
                                    parts: [{
                                        text: `User_message:${messageText}. Reply naturally to the usermessage and if required then answer based on: ${myDescription} or just simply give friendly reply and reply in a way that Narendra Damodardas Modi is himself talking. Reply in short sentences`
                                    }]
                                }]
                            })
                        }
                    );
    
                    const data = await response.json();
                    const aiReply = data.candidates[0].content.parts[0].text; // Adjust based on actual API response structure
    
                    // Remove typing indicator and add AI response
                    chatMessages.removeChild(typingIndicator);
                    const aiMessage = document.createElement('div');
                    aiMessage.className = 'message ai';
                    aiMessage.innerHTML = `<div class="message-text">${aiReply}</div>`;
                    chatMessages.appendChild(aiMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                } catch (error) {
                    console.error("API call failed:", error);
                    // Remove typing indicator and add fallback mock response
                    chatMessages.removeChild(typingIndicator);
                    const aiMessage = document.createElement('div');
                    aiMessage.className = 'message ai';
                    aiMessage.innerHTML = `<div class="message-text">Namaste! I’m Narendra Modi. That’s an interesting question. What else can I share with you?</div>`;
                    chatMessages.appendChild(aiMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }
    
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
    
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
    
            function toggleTheme() {
                document.body.classList.toggle('dark-theme');
                themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
                localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
            }
    
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                themeToggle.textContent = '☀️';
            }