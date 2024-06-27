body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

header {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
    text-align: center;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

nav ul li {
    flex: 1 1 auto;
    text-align: center;
}

nav ul li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

nav ul li a:hover, nav ul li a.active {
    background-color: #111;
}

.container {
    width: 100%;
    margin: auto;
    overflow: hidden;
    padding-top: 60px; /* Adjusted for desktop */
}

#main {
    padding: 20px;
    background: #fff;
    margin: 20px 0;
}

.card {
    width: 100%;
    max-width: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    background: #fff;
    margin: 10px auto;
    text-align: center;
    display: inline-block;
}

.card img {
    width: 100%;
}

.card .title {
    font-size: 16px;
    font-weight: bold;
}

.card .level {
    font-size: 12px;
    color: #888;
}

.card .energy {
    margin-top: 10px;
    font-size: 14px;
}

.card .count {
    font-size: 14px;
    color: #333;
    cursor: pointer;
}

footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
}

button {
    margin: 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: white;
    cursor: pointer;
    display: block; /* Ensure buttons take full width on mobile */
}

button:hover {
    background-color: #555;
}

section {
    display: none;
    padding-top: 60px; /* Additional padding for all sections */
    padding-bottom: 60px; /* Additional padding for bottom */
}

section.active {
    display: block;
}

.restricted {
    display: none;
}

.restricted.active {
    display: block;
}

.restricted-link {
    display: none;
}

#scrollTopBtn {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 99;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: #333;
    color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 5px;
}

#scrollTopBtn:hover {
    background-color: #555;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 5px;
}

input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
}

/* Media Queries for mobile responsiveness */
@media (max-width: 600px) {
    nav ul {
        flex-direction: column;
    }

    nav ul li {
        flex: none;
    }

    header {
        padding: 20px 0; /* Erhöhte Padding für den Header auf mobilen Geräten */
    }

    .container {
        padding-top: 180px; /* Anpassung für mobilen Header */
    }

    section {
        padding-top: 180px; /* Additional padding for all sections on mobile */
    }

    .card {
        max-width: 100%;
    }

    button {
        width: 100%;
        box-sizing: border-box;
        display: block;
    }
}

/* Buttons in a row for desktop view */
@media (min-width: 601px) {
    .button-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .button-row .button-container {
        flex: 1 1 auto;
        max-width: 200px; /* Adjust as needed */
        margin: 10px;
        text-align: center;
    }

    .energy-container {
        display: flex;
        align-items: center;
    }

    .energy-container p {
        margin: 0;
        margin-right: 10px;
    }

    .energy-container button {
        margin: 0;
    }
}

.blink {
    animation: blink 0.5s 3;
}

@keyframes blink {
    0% { background-color: yellow; }
    50% { background-color: white; }
    100% { background-color: yellow; }
}

/* Notification styles */
.notification {
    visibility: hidden;
    min-width: 300px;
    margin-left: -150px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 17px;
}

.notification.show {
    visibility: visible;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
}
