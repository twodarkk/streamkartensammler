const auth = firebase.auth();
const db = firebase.database();

let userId = null;
let energy = 0;
let cards = Array(11).fill(0);
let loggedIn = false;

const energyDisplay = document.getElementById('energy');
const energyAccountDisplay = document.getElementById('energy-account');
const cardContainer = document.getElementById('card-container');
const cardCountContainer = document.getElementById('card-count');
const last5CardsContainer = document.getElementById('last-5-cards');
const last5Cards = [];
let selectedCardId = null;

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = "notification show";
    setTimeout(() => {
        notification.className = notification.className.replace("show", "");
    }, 3000);
}

function addEnergy() {
    energy += 100;
    updateDisplay();
    saveUserData();
}

function claimEnergy() {
    addEnergy();
    showNotification('100 Energie erfolgreich gesammelt!');
}

function claimCard(level) {
    if (level === 1 && energy >= 30) {
        energy -= 30;
        cards[1]++;
        updateDisplay();
        addCardToContainer(1);
        addCardToLast5(1);
        showNotification('Stufe 1 Karte erfolgreich erhalten!');
    } else if (level > 1 && cards[level - 1] >= 5) {
        cards[level - 1] -= 5;
        cards[level]++;
        updateDisplay();
        addCardToContainer(level);
        addCardToLast5(level);
        showNotification(`Stufe ${level} Karte erfolgreich erhalten!`);
    } else {
        showNotification('Nicht genügend Ressourcen!');
    }
    saveUserData();
}

function updateDisplay() {
    energyDisplay.textContent = energy;
    energyAccountDisplay.textContent = energy;

    for (let i = 1; i <= 10; i++) {
        document.getElementById(`count-${i}`).textContent = cards[i];
    }
}

function addCardToContainer(level) {
    const cardId = `card-${Date.now()}`; // Generate a unique ID
    const card = document.createElement('div');
    card.className = 'card';
    card.id = cardId;
    card.dataset.level = level;
    card.innerHTML = `
        <img src="https://via.placeholder.com/150" alt="Karte Stufe ${level}">
        <div class="title">Karte Stufe ${level}</div>
        <div class="level">Stufe ${level}</div>
        <div class="energy">Benötigte Energie: ${level === 1 ? 30 : `5x Stufe ${level - 1} Karten`}</div>
    `;
    cardContainer.appendChild(card);
    sortCards();
}

function addCardToLast5(level) {
    const card = {
        level: level,
        timestamp: new Date().toLocaleString(),
        id: `card-${Date.now()}`
    };
    last5Cards.unshift(card);
    if (last5Cards.length > 5) {
        last5Cards.pop();
    }
    renderLast5Cards();
}

function renderLast5Cards() {
    last5CardsContainer.innerHTML = '';
    last5Cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.id = card.id;
        cardElement.innerHTML = `
            <img src="https://via.placeholder.com/150" alt="Karte Stufe ${card.level}">
            <div class="title">Karte Stufe ${card.level}</div>
            <div class="level">Stufe ${card.level}</div>
            <div class="timestamp">Erhalten: ${card.timestamp}</div>
        `;
        cardElement.addEventListener('click', () => {
            selectedCardId = card.id;
            showSection('my-cards', document.querySelector('#menu-my-cards'));
            scrollToCard(card.id);
        });
        last5CardsContainer.appendChild(cardElement);
    });
}

function sortCards() {
    const cardsArray = Array.from(cardContainer.children);
    cardsArray.sort((a, b) => a.dataset.level - b.dataset.level);
    cardContainer.innerHTML = '';
    cardsArray.forEach(card => cardContainer.appendChild(card));
}

function scrollToCard(cardId) {
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cardElement.classList.add('blink');
        setTimeout(() => cardElement.classList.remove('blink'), 1500);
    }
}

function showSection(sectionId, menuLink) {
    if (sectionId !== 'login' && sectionId !== 'home' && !loggedIn) {
        showNotification('Bitte logge dich zuerst ein.');
        return;
    }

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });
    if (menuLink) {
        menuLink.classList.add('active');
    }

    if (sectionId === 'my-cards' && selectedCardId) {
        scrollToCard(selectedCardId);
        selectedCardId = null;
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
};

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
        const user = userCredential.user;
        userId = user.uid;
        showNotification('Login erfolgreich!');
        loggedIn = true;
        document.querySelectorAll('.restricted').forEach(section => {
            section.classList.add('active');
        });
        document.querySelectorAll('.restricted-link').forEach(link => {
            link.style.display = 'block';
        });
        document.getElementById('login-logout').textContent = 'Logout';
        loadProfile();
    })
    .catch((error) => {
        showNotification('Ungültiger Benutzername oder Passwort.');
        console.error('Error:', error);
    });
}

function register(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        userId = user.uid;
        db.ref('users/' + userId).set({
            username: username,
            email: email,
            energy: 0,
            cards: Array(11).fill(0)
        });
        showNotification('Registrierung erfolgreich! Bitte einloggen.');
        showSection('login', document.querySelector('.menu-link[href="#login"]'));
    })
    .catch((error) => {
        showNotification('Registrierung fehlgeschlagen.');
        console.error('Error:', error);
    });
}

function loadProfile() {
    const user = auth.currentUser;
    if (user) {
        userId = user.uid;
        db.ref('users/' + userId).once('value').then((snapshot) => {
            const userData = snapshot.val();
            document.getElementById('username').textContent = userData.username;
            document.getElementById('email').textContent = userData.email;
            energy = userData.energy;
            cards = userData.cards;
            updateDisplay();
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
}

function saveUserData() {
    if (userId) {
        db.ref('users/' + userId).update({
            energy: energy,
            cards: cards
        }).then(() => {
            showNotification('Benutzerdaten erfolgreich gespeichert.');
        }).catch((error) => {
            showNotification('Speichern der Benutzerdaten fehlgeschlagen.');
            console.error('Error:', error);
        });
    }
}

function toggleLoginLogout(menuLink) {
    if (loggedIn) {
        auth.signOut().then(() => {
            showNotification('Logout erfolgreich.');
            loggedIn = false;
            document.querySelectorAll('.restricted').forEach(section => {
                section.classList.remove('active');
            });
            document.querySelectorAll('.restricted-link').forEach(link => {
                link.style.display = 'none';
            });
            menuLink.textContent = 'Login';
            showSection('home', document.querySelector('.menu-link[href="#home"]'));
        }).catch((error) => {
            showNotification('Logout fehlgeschlagen.');
            console.error('Error:', error);
        });
    } else {
        showSection('login', menuLink);
    }
}

setInterval(addEnergy, 300000); // Alle 5 Minuten 10 Energie hinzufügen
