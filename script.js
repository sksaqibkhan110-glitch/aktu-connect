// ============================================================
// AUTH — real Supabase email/password signup + login
// ============================================================

let isSignupMode = false;

const nameField = document.getElementById("nameField");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const toggleText = document.getElementById("toggleText");
const toggleLink = document.getElementById("toggleLink");

// If already logged in, skip straight to dashboard
(async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        window.location.href = "dashboard.html";
    }
})();

function toggleMode(e) {
    e.preventDefault();
    isSignupMode = !isSignupMode;
    errorMsg.textContent = "";
    errorMsg.style.color = "";

    if (isSignupMode) {
        nameField.style.display = "block";
        formTitle.textContent = "Join AKTU Connect";
        formSubtitle.textContent = "Start Your XP Journey";
        submitBtn.textContent = "Sign Up";
        toggleText.innerHTML = 'Already have an account? <a href="#" id="toggleLink">Login</a>';
    } else {
        nameField.style.display = "none";
        formTitle.textContent = "AKTU Connect";
        formSubtitle.textContent = "Continue Your XP Journey";
        submitBtn.textContent = "Login";
        toggleText.innerHTML = 'New Users? <a href="#" id="toggleLink">Sign Up</a>';
    }
}

// Event delegation so the re-created <a> keeps working after innerHTML swaps
toggleText.addEventListener("click", (e) => {
    if (e.target && e.target.id === "toggleLink") {
        toggleMode(e);
    }
});

submitBtn.addEventListener("click", async () => {
    errorMsg.textContent = "";
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        errorMsg.textContent = "Email aur password dono chahiye ⚠️";
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Please wait...";

    if (isSignupMode) {
        const name = nameInput.value.trim() || "Player";

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: { data: { name } }
        });

        if (error) {
            errorMsg.textContent = error.message;
            submitBtn.disabled = false;
            submitBtn.textContent = "Sign Up";
            return;
        }

        // Stash name so goal-setup.html can create the player_stats row
        sessionStorage.setItem("pendingName", name);

        if (!data.session) {
            // Email confirmation required by the Supabase project settings
            errorMsg.style.color = "#4ade80";
            errorMsg.textContent = "Account created ✅ Check your email to confirm, then log in.";
            submitBtn.disabled = false;
            submitBtn.textContent = "Sign Up";
            return;
        }

        window.location.href = "goal-setup.html";
    } else {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

        if (error) {
            errorMsg.textContent = error.message;
            submitBtn.disabled = false;
            submitBtn.textContent = "Login";
            return;
        }

        // Check whether this user already finished onboarding
        const { data: stats } = await supabaseClient
            .from("player_stats")
            .select("user_id")
            .eq("user_id", data.user.id)
            .single();

        window.location.href = stats ? "dashboard.html" : "goal-setup.html";
    }
});
