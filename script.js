// Select elements from the DOM
const chatWindow = document.querySelector('.chat-window');
const inputField = document.querySelector('.input-field');
const submitButton = document.querySelector('.submit-button');

// Function to append a message to the chat
function appendMessage(content, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');
    messageElement.textContent = content;

    // Append the message to the messages container
    const messagesContainer = document.querySelector('.messages');
    messagesContainer.appendChild(messageElement);

    // Auto-scroll to the bottom of the chat window
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Event listener for the submit button
submitButton.addEventListener('click', () => {
    const messageContent = inputField.value.trim();
    if (messageContent) {
        appendMessage(messageContent, true); // Append user message
        inputField.value = ''; // Clear input field
        
        // Simulate a bot response after a short delay
        setTimeout(() => {
            const botResponse = "This is a simulated bot response."; // Example response
            appendMessage(botResponse, false); // Append bot message
        }, 1000);
    }
});

// Event listener for the enter key to submit message
inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        submitButton.click(); // Trigger submit button click
    }
});
