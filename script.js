<script>
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

    // Function to call OpenAI API
    async function getBotResponse(messageContent) {
        const apiKey = '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';  // Make sure this is correct
        const url = 'https://api.openai.com/v1/completions';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'text-davinci-003',  // Make sure you're using the right model
                    prompt: messageContent,     // Sending the user input as the prompt
                    max_tokens: 150            // Response limit
                })
            });

            const data = await response.json();

            // Check if the response is valid and return the bot message
            if (data.choices && data.choices[0] && data.choices[0].text) {
                return data.choices[0].text.trim();  // Extract the response
            } else {
                console.error("API response is missing expected data:", data);
                return "Sorry, I couldn't understand that.";
            }
        } catch (error) {
            console.error("Error fetching from OpenAI API:", error);
            return "Sorry, something went wrong!";
        }
    }

    // Event listener for the submit button
    submitButton.addEventListener('click', async () => {
        const messageContent = inputField.value.trim();
        if (messageContent) {
            appendMessage(messageContent, true); // Append user message
            inputField.value = ''; // Clear input field

            // Get bot response from OpenAI API
            const botResponse = await getBotResponse(messageContent);
            appendMessage(botResponse, false); // Append bot message
        }
    });

    // Event listener for the enter key to submit message
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitButton.click(); // Trigger submit button click
        }
    });
</script>
