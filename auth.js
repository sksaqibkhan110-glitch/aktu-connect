const authForm = document.getElementById("auth-form");
const authMessage = document.getElementById("auth-message");
const configWarning = document.getElementById("config-warning");
const modePrompt = document.getElementById("mode-prompt");
const submitButton = document.getElementById("submit-button");
const googleButton = document.getElementById("google-button");
const forgotButton = document.getElementById("forgot-button");
const nameField = document.getElementById("name-field");
const emailField = document.getElementById("email-field");
const passwordField = document.getElementById("password-field");
const confirmField = document.getElementById("confirm-field");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const fullNameInput = document.getElementById("full-name");

let authMode = "signin";

function setMessage(message, kind = "error") {
  authMessage.textContent = message;
  authMessage.dataset.kind = kind;
  authMessage.hidden = false;
}

function clearMessage() {
  authMessage.textContent = "";
  authMessage.hidden = true;
}

function setMode(mode) {
  authMode = mode;
  clearMessage();

  const modes = {
    signin: ["WELCOME BACK", "Sign in to continue", "Pick up where your learning left off.", "Sign in", 'New to AKTU Connect? <button id="mode-button" class="text-button" type="button">Create an account</button>'],
    signup: ["GET STARTED", "Create your account", "Your study space is a few details away.", "Create account", 'Already have an account? <button id="mode-button" class="text-button" type="button">Sign in</button>'],
    recovery: ["ACCOUNT RECOVERY", "Reset your password", "We will email you a secure password reset link.", "Send reset link", 'Remembered your password? <button id="mode-button" class="text-button" type="button">Back to sign in</button>'],
    update: ["NEW PASSWORD", "Choose a new password", "Use at least 8 characters for your account.", "Update password", ""]
  };
  const [eyebrow, title, subtitle, submitLabel, prompt] = modes[mode];
  document.getElementById("form-eyebrow").textContent = eyebrow;
  document.getElementById("form-title").textContent = title;
  document.getElementById("form-subtitle").textContent = subtitle;
  submitButton.querySelector("span:first-child").textContent = submitLabel;
  modePrompt.innerHTML = prompt;

  nameField.hidden = mode !== "signup";
  confirmField.hidden = mode !== "signup" && mode !== "update";
  passwordField.hidden = mode === "recovery";
  forgotButton.hidden = mode !== "signin";
  googleButton.hidden = mode === "recovery" || mode === "update";
  emailField.hidden = mode === "update";
  emailInput.required = mode !== "update";
  passwordInput.required = mode === "signin" || mode === "signup" || mode === "update";
  confirmInput.required = mode === "signup" || mode === "update";
  passwordInput.autocomplete = mode === "signin" ? "current-password" : "new-password";
  passwordInput.placeholder = mode === "signin" ? "Your password" : "At least 8 characters";
  passwordInput.value = "";
  confirmInput.value = "";
}

function setBusy(isBusy, label = "Please wait...") {
  submitButton.disabled = isBusy;
  googleButton.disabled = isBusy;
  if (!isBusy) {
    const labels = { signin: "Sign in", signup: "Create account", recovery: "Send reset link", update: "Update password" };
    submitButton.querySelector("span:first-child").textContent = labels[authMode];
  } else {
    submitButton.querySelector("span:first-child").textContent = label;
  }
}

function redirectUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

async function submitAuthForm(event) {
  event.preventDefault();
  clearMessage();

  if (!window.supabaseClient) {
    configWarning.hidden = false;
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (authMode !== "update" && !emailInput.validity.valid) {
    setMessage("Enter a valid email address.");
    emailInput.focus();
    return;
  }
  if (["signin", "signup", "update"].includes(authMode) && password.length < 8) {
    setMessage("Your password must be at least 8 characters.");
    passwordInput.focus();
    return;
  }
  if (authMode === "signup" && !fullNameInput.value.trim()) {
    setMessage("Enter your name to create an account.");
    fullNameInput.focus();
    return;
  }
  if (["signup", "update"].includes(authMode) && password !== confirmInput.value) {
    setMessage("Your passwords do not match.");
    confirmInput.focus();
    return;
  }

  setBusy(true);
  try {
    if (authMode === "recovery") {
      const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl() });
      if (error) throw error;
      setMessage("If an account exists for this email, a password reset link is on its way.", "success");
    } else if (authMode === "update") {
      const { error } = await window.supabaseClient.auth.updateUser({ password });
      if (error) throw error;
      await window.supabaseClient.auth.signOut();
      setMode("signin");
      setMessage("Password updated. Sign in with your new password.", "success");
    } else if (authMode === "signup") {
      const { data, error } = await window.supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullNameInput.value.trim() },
          emailRedirectTo: redirectUrl()
        }
      });
      if (error) throw error;
      if (data.session) {
        window.location.assign("study.html");
        return;
      }
      setMode("signin");
      setMessage("Account created. Check your email to confirm your address, then sign in.", "success");
    } else {
      const { error } = await window.supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      window.location.assign("study.html");
      return;
    }
  } catch (error) {
    setMessage(error.message || "Authentication failed. Please try again.");
  } finally {
    setBusy(false);
  }
}

async function signInWithGoogle() {
  clearMessage();
  if (!window.supabaseClient) {
    configWarning.hidden = false;
    return;
  }
  googleButton.disabled = true;
  try {
    const { error } = await window.supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectUrl() }
    });
    if (error) throw error;
  } catch (error) {
    setMessage(error.message || "Google sign-in could not be started.");
    googleButton.disabled = false;
  }
}

authForm.addEventListener("submit", submitAuthForm);
googleButton.addEventListener("click", signInWithGoogle);
forgotButton.addEventListener("click", () => setMode("recovery"));
modePrompt.addEventListener("click", (event) => {
  if (event.target.id !== "mode-button") return;
  setMode(authMode === "signin" ? "signup" : "signin");
});

const recoveryInUrl = new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery" ||
  new URLSearchParams(window.location.search).get("type") === "recovery";

if (!window.SUPABASE_CONFIGURED || !window.supabaseClient) {
  configWarning.hidden = false;
  submitButton.disabled = true;
  googleButton.disabled = true;
} else {
  window.supabaseClient.auth.onAuthStateChange((event) => {
    if (event === "PASSWORD_RECOVERY") {
      setMode("update");
    } else if (event === "SIGNED_IN" && !recoveryInUrl && authMode !== "update") {
      window.location.assign("study.html");
    }
  });

  if (recoveryInUrl) {
    setMode("update");
  } else {
    window.supabaseClient.auth.getSession().then(({ data, error }) => {
      if (error) setMessage(error.message);
      else if (data.session) window.location.assign("study.html");
    });
  }
}
