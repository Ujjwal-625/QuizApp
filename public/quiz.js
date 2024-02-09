const fs = require('fs');

fs.readFile('questions.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading questions file:', err);
        return;
    }

    try {
        const questions = JSON.parse(data);
        const quizContainer = document.getElementById('quiz');
        questions.forEach((questionData, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            const questionText = document.createElement('p');
            questionText.textContent = `Question ${index + 1}: ${questionData.question}`;
            questionElement.appendChild(questionText);

            const optionsList = document.createElement('ul');
            optionsList.classList.add('options-list');
            questionData.options.forEach(option => {
                const optionItem = document.createElement('li');
                optionItem.textContent = option;
                optionsList.appendChild(optionItem);
            });
            questionElement.appendChild(optionsList);

            quizContainer.appendChild(questionElement);
        });
    } catch (error) {
        console.error('Error parsing questions JSON:', error);
    }
});
