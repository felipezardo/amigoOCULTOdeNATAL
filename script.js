document.addEventListener("DOMContentLoaded", function() {
    const participants = ["Zardo", "Lariza", "Rafaela", "Zorzan", "Hellan", "Nayre", "Naide", "Renan", "Iza"];
    let results = {};

    // Objeto para armazenar as senhas de cada participante
    const userPasswords = {
        Zardo: '123456',
        Lariza: '789012',
        Nayre: '345678',
        Naide: '901234',
        Renan: '567890',
        Rafaela: '123456',
        Zorzan: '789012',
        Iza: '345678',
        Hellan: '901234'
    };

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function drawSecretFriends() {
        let shuffledParticipants;
        let validDraw = false;

        while (!validDraw) {
            shuffledParticipants = shuffle([...participants]);
            validDraw = participants.every((participant, index) => participant !== shuffledParticipants[index]);
        }

        participants.forEach((participant, index) => {
            results[participant] = shuffledParticipants[index];
        });
    }

    // Inicialmente, realiza o sorteio
    drawSecretFriends();

    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginSection = document.getElementById("login-section");
    const resultSection = document.getElementById("result-section");
    const userNameDisplay = document.getElementById("user-name");
    const secretFriendDisplay = document.getElementById("secret-friend");
    const drawButton = document.getElementById("draw-button");
    const logoutButton = document.getElementById("logout-button");

    let currentUser = "";

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Verificação de senha personalizada
        if ((participants.includes(username) && password === userPasswords[username]) || (username === "admin" && password === "panqueca")) {
            currentUser = username;
            loginSection.style.display = "none";
            resultSection.style.display = "block";
            userNameDisplay.textContent = username;

            if (username === "admin") {
                let allResults = participants.map(p => `${p} tirou ${results[p]}`).join('\n');
                alert(`Resultados do sorteio:\n${allResults}`);
            } else {
                secretFriendDisplay.textContent = results[username];
            }

            // Mostrar o botão de sorteio apenas para Zardo e admin
            if (username === "Zardo" || username === "admin") {
                drawButton.style.display = "inline-block";
            } else {
                drawButton.style.display = "none";
            }
        } else {
            alert("Nome ou senha incorretos.");
        }
    });

    drawButton.addEventListener("click", function() {
        drawSecretFriends();
        secretFriendDisplay.textContent = results[currentUser];
        if (currentUser === "admin") {
            let allResults = participants.map(p => `${p} tirou ${results[p]}`).join('\n');
            alert(`Resultados do sorteio:\n${allResults}`);
        }
    });

    logoutButton.addEventListener("click", function() {
        currentUser = "";
        resultSection.style.display = "none";
        loginSection.style.display = "block";
        usernameInput.value = "";
        passwordInput.value = "";
        drawButton.style.display = "none";
    });
});
