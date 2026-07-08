import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


/*
  IMPORTANT:
  Delete this sample firebaseConfig section
  and paste the firebaseConfig code you copied from Firebase.
*/
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "europe-study-ops-portal.firebaseapp.com",
  projectId: "europe-study-ops-portal",
  storageBucket: "europe-study-ops-portal.firebasestorage.app",
  messagingSenderId: "442213813326",
  appId: "1:442213813326:web:...",
  measurementId: "G-..."
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

setPersistence(
  auth,
  browserLocalPersistence
).catch(function (error) {
  console.error("Persistence error:", error);
});


function createLoginScreen() {
  if (document.getElementById("firebase-access-gate")) {
    return;
  }

  document.documentElement.classList.add(
    "firebase-access-locked"
  );

  const style = document.createElement("style");

  style.textContent = `
    html.firebase-access-locked body {
      overflow: hidden !important;
    }

    html.firebase-access-locked body > *:not(#firebase-access-gate) {
      visibility: hidden !important;
    }

    #firebase-access-gate,
    #firebase-access-gate * {
      visibility: visible !important;
    }

    #firebase-access-gate {
      position: fixed;
      inset: 0;
      z-index: 9999999;
      display: grid;
      place-items: center;
      padding: 24px;
      background:
        radial-gradient(
          circle at top left,
          rgba(95, 143, 130, 0.24),
          transparent 38%
        ),
        linear-gradient(
          145deg,
          #edf4f1,
          #f8faf9
        );
      font-family:
        Inter,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
    }

    #firebase-access-gate[hidden] {
      display: none !important;
    }

    .firebase-login-card {
      width: min(430px, 100%);
      padding: 34px;
      border: 1px solid rgba(95, 143, 130, 0.28);
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.97);
      box-shadow:
        0 24px 70px rgba(25, 45, 38, 0.16);
      text-align: center;
    }

    .firebase-login-icon {
      display: grid;
      place-items: center;
      width: 64px;
      height: 64px;
      margin: 0 auto 18px;
      border-radius: 18px;
      background: #e5f0ec;
      color: #4f7f72;
      font-size: 28px;
      font-weight: 900;
    }

    .firebase-login-card h1 {
      margin: 0;
      color: #17231f;
      font-size: 26px;
      line-height: 1.25;
    }

    .firebase-login-card p {
      margin: 12px 0 0;
      color: #65736d;
      font-size: 14px;
      line-height: 1.55;
    }

    #firebase-google-login,
    #firebase-google-logout {
      width: 100%;
      margin-top: 24px;
      padding: 13px 18px;
      border: 1px solid rgba(45, 68, 60, 0.18);
      border-radius: 12px;
      background: #ffffff;
      color: #24352f;
      box-shadow:
        0 7px 20px rgba(23, 35, 31, 0.08);
      font: inherit;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
    }

    #firebase-google-login:hover,
    #firebase-google-logout:hover {
      background: #f0f6f3;
    }

    #firebase-google-login:disabled {
      cursor: wait;
      opacity: 0.65;
    }

    #firebase-login-status {
      min-height: 20px;
      margin-top: 15px;
      color: #65736d;
      font-size: 12px;
      line-height: 1.45;
    }

    #firebase-login-status.firebase-error {
      color: #a33d3d;
    }

    .firebase-login-note {
      margin-top: 20px !important;
      padding-top: 16px;
      border-top:
        1px solid rgba(95, 143, 130, 0.18);
      font-size: 11px !important;
    }
  `;

  document.head.appendChild(style);

  const gate = document.createElement("div");

  gate.id = "firebase-access-gate";

  gate.innerHTML = `
    <div class="firebase-login-card">
      <div class="firebase-login-icon">
        E
      </div>

      <h1>Europe Study OPS Portal</h1>

      <p>
        Sign in using an approved Google account
        to access the portal.
      </p>

      <button
        id="firebase-google-login"
        type="button"
      >
        Continue with Google
      </button>

      <button
        id="firebase-google-logout"
        type="button"
        hidden
      >
        Sign out and use another account
      </button>

      <div id="firebase-login-status">
        Checking your sign-in status…
      </div>

      <p class="firebase-login-note">
        Access is restricted to authorised staff.
      </p>
    </div>
  `;

  document.body.appendChild(gate);

  document
    .getElementById("firebase-google-login")
    .addEventListener(
      "click",
      loginWithGoogle
    );

  document
    .getElementById("firebase-google-logout")
    .addEventListener(
      "click",
      async function () {
        await signOut(auth);
      }
    );
}


function updateStatus(message, isError = false) {
  const status = document.getElementById(
    "firebase-login-status"
  );

  if (!status) {
    return;
  }

  status.textContent = message;

  status.classList.toggle(
    "firebase-error",
    isError
  );
}


async function loginWithGoogle() {
  const button = document.getElementById(
    "firebase-google-login"
  );

  button.disabled = true;

  updateStatus(
    "Opening Google sign-in…"
  );

  try {
    await signInWithPopup(
      auth,
      provider
    );
  } catch (error) {
    console.error(error);

    if (
      error.code ===
      "auth/popup-closed-by-user"
    ) {
      updateStatus(
        "The Google sign-in window was closed.",
        true
      );
    } else {
      updateStatus(
        "Google sign-in failed. Please try again.",
        true
      );
    }
  } finally {
    button.disabled = false;
  }
}


async function checkUserAccess(user) {
  const accessDocument = doc(
    db,
    "allowedUsers",
    user.uid
  );

  const accessSnapshot = await getDoc(
    accessDocument
  );

  return (
    accessSnapshot.exists() &&
    accessSnapshot.data().active === true
  );
}


function unlockPortal() {
  const gate = document.getElementById(
    "firebase-access-gate"
  );

  if (gate) {
    gate.hidden = true;
  }

  document.documentElement.classList.remove(
    "firebase-access-locked"
  );
}


function showSignedOutScreen() {
  const gate = document.getElementById(
    "firebase-access-gate"
  );

  const loginButton = document.getElementById(
    "firebase-google-login"
  );

  const logoutButton = document.getElementById(
    "firebase-google-logout"
  );

  gate.hidden = false;
  loginButton.hidden = false;
  logoutButton.hidden = true;

  document.documentElement.classList.add(
    "firebase-access-locked"
  );

  updateStatus(
    "Please sign in to continue."
  );
}


function showAccessDenied(user) {
  const loginButton = document.getElementById(
    "firebase-google-login"
  );

  const logoutButton = document.getElementById(
    "firebase-google-logout"
  );

  loginButton.hidden = true;
  logoutButton.hidden = false;

  updateStatus(
    `${user.email} is signed in, but this account has not been approved.`,
    true
  );
}


async function handleAuthState(user) {
  if (!user) {
    showSignedOutScreen();
    return;
  }

  updateStatus(
    `Checking access for ${user.email}…`
  );

  try {
    const approved = await checkUserAccess(
      user
    );

    if (approved) {
      unlockPortal();
    } else {
      showAccessDenied(user);
    }
  } catch (error) {
    console.error(error);

    updateStatus(
      "Access could not be checked. Please contact the administrator.",
      true
    );
  }
}


function startFirebaseLogin() {
  createLoginScreen();

  onAuthStateChanged(
    auth,
    handleAuthState
  );
}


if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    startFirebaseLogin,
    { once: true }
  );
} else {
  startFirebaseLogin();
}
