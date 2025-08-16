// Liste af sjove fejlbeskeder
const funnyErrors = [
    "This password was used by a medieval peasant on RuneScape.",
    "Error 404: Brain not found.",
    "This password is weaker than instant noodles.",
    "NASA just called, they want their launch code back.",
    "This password has been spotted on MySpace in 2006.",
    "Your cat could guess this faster.",
    "Congratulations, you found the worst password of 2025!"
];

let errorDeck = [];
let attempts = 0; // tæller login-forsøg

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getNextError() {
    if (errorDeck.length === 0) {
        errorDeck = [...funnyErrors];
        shuffle(errorDeck);
    }
    return errorDeck.pop();
}

// Event listener på login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); 
    attempts++;

    if (attempts < 20) {
        // Indtil 20 forsøg → vis tilfældig fejl
        document.getElementById("errorBox").innerText = getNextError();
    } else {
        // Når vi rammer 20 → ny login måde
        document.getElementById("loginForm").style.display = "none"; // skjul gammel login
        document.getElementById("errorBox").innerText = "⚡ Too many failed attempts! Secret login activated...";

        // Ny “hemmelig login”
        const secretDiv = document.createElement("div");
        secretDiv.innerHTML = `
            <h3>🔒 Secret Login Activated</h3>
            <p>Answer this to continue: What is 2 + 2?</p>
            <input type="text" id="secretAnswer" placeholder="Your answer">
            <button id="secretBtn">Submit</button>
            <p id="secretMsg"></p>
        `;
        document.body.appendChild(secretDiv);

        // Check svar (hemmelig: svaret er 5 🤡)
        document.getElementById("secretBtn").addEventListener("click", function() {
            const answer = document.getElementById("secretAnswer").value.trim();
            if (answer === "5") {
                document.getElementById("secretMsg").innerText = "🎉 Congratulations, you are officially stupid :)";
            } else {
                document.getElementById("secretMsg").innerText = "❌ Wrong! (Hint: It's definitely not 4...)";
            }
        });
    }
});
