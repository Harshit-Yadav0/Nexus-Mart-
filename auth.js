// -------------------------------
// Firebase Configuration
// -------------------------------
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "YOUR_SENDER",
    appId: "YOUR_APPID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// -------------------------------
// SIGNUP
// -------------------------------
const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const pass = document.getElementById("signupPass").value;

        if (!name || !email || !pass) {
            alert("Please fill all fields");
            return;
        }

        auth.createUserWithEmailAndPassword(email, pass)
            .then(res => {
                localStorage.setItem("userName", name);
                alert("Account created successfully!");
                window.location.href = "index.html";
            })
            .catch(err => alert(err.message));
    });
}

// -------------------------------
// LOGIN
// -------------------------------
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value;
        const pass = document.getElementById("loginPass").value;

        auth.signInWithEmailAndPassword(email, pass)
            .then(res => {
                alert("Login successful!");
                window.location.href = "index.html";
            })
            .catch(err => alert(err.message));
    });
}
