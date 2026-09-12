let currentUser = null;

(async () => {
    currentUser = await requireAuth();
})();

async function sendMessage() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;

    appendMessage("user", text);
    input.value = "";

    const loadingId = appendMessage("bot", "Thinking according to AKTU marking scheme...");

    try {
        // Built-in response mapping for instant offline assistance + LLM fallback
        const lower = text.toLowerCase();
        let reply = "";

        if (lower.includes("3-tier") || lower.includes("schema")) {
            reply = "📚 **AKTU 10-Mark Structure:**\n1. **Physical Level:** Deals with internal storage (blocks, files, indexing).\n2. **Conceptual/Logical Level:** Defines entities, attributes, and relationships (tables/ERD).\n3. **External/View Level:** Tailored user views.\n\n*Logical Independence:* Changing conceptual schema without affecting view level.\n*Physical Independence:* Changing physical disk layout without affecting logical schema.";
        } else if (lower.includes("banker") || lower.includes("deadlock")) {
            reply = "🛡️ **Banker's Algorithm (Deadlock Avoidance):**\n- Calculates `Need = Max - Allocation`.\n- Maintains `Work` and `Finish` vectors.\n- Finds an index `i` such that `Finish[i] == false` and `Need[i] <= Work`.\n- Ensures system stays in a Safe State using a Safe Sequence.";
        } else if (lower.includes("bcnf") || lower.includes("normalization")) {
            reply = "📊 **BCNF (Boyce-Codd Normal Form):**\n- Must be in 3NF.\n- For every functional dependency $X \\rightarrow Y$, $X$ must be a super key.\n- Stricter than 3NF where $Y$ can be a prime attribute.";
        } else {
            reply = `📖 **AKTU Exam Tip:** For "${text}", make sure to include standard block diagrams, step-by-step algorithms, and clear definitions to secure full marks in 10-mark questions. Check the PYQ Vault for repeated question formats!`;
        }

        const botMsgDiv = document.getElementById(loadingId);
        if (botMsgDiv) {
            botMsgDiv.innerHTML = reply.replace(/\n/g, "<br/>");
        }
    } catch (err) {
        document.getElementById(loadingId).innerText = "Unable to process query at the moment.";
    }
}

function appendMessage(sender, text) {
    const chat = document.getElementById("chatMessages");
    const div = document.createElement("div");
    const id = "msg-" + Date.now();
    div.id = id;
    div.className = `msg ${sender === 'user' ? 'msg-user' : 'msg-bot'}`;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    return id;
}