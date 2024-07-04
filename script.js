const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');
const funnyMessage = document.getElementById('funnyMessage');

const funnyVoices = [
    'Fred',
    'Princess',
    'Hysterical',
    'Boing',
    'Whisper',
    'Screech'
];

speakButton.addEventListener('click', () => {
    const text = textInput.value;
    if (text.trim() === '') {
        funnyMessage.textContent = 'Please type something funny!';
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const randomVoice = funnyVoices[Math.floor(Math.random() * funnyVoices.length)];

    // Check if the browser supports funny voices
    const availableVoices = speechSynthesis.getVoices();
    const selectedVoice = availableVoices.find(voice => voice.name === randomVoice);

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    } else {
        funnyMessage.textContent = `Sorry, the voice "${randomVoice}" is not available.`;
    }

    speechSynthesis.speak(utterance);

    // Reset funny message after speaking
    utterance.onend = () => {
        funnyMessage.textContent = '';
    };
});
