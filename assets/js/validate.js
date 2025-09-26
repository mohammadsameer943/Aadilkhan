
// contect form


 const WHATSAPP_NUMBER = "919672850230"; // TODO: replace with your real number

    // ====== HELPERS ======
    const $ = (sel) => document.querySelector(sel);
    const yearEl = $("#year");
    yearEl.textContent = new Date().getFullYear();

    const form = document.getElementById("waForm");
    const nameEl = $("#name");
    const emailEl = $("#email");
    const messageEl = $("#message");
    const errorEl = $("#error");
    const previewBox = $("#previewBox");

    function buildMessage(){
      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const body = messageEl.value.trim();

      let lines = [];
      if(name) lines.push(`Name: ${name}`); 
      if(email) lines.push(`Email: ${email}`);
      if(body) {
        lines.push("");
        lines.push(body);
      }
      return lines.join("\n");
    }

    function updatePreview(){
      const text = buildMessage();
      previewBox.textContent = text || "(Type to see the WhatsApp text…)";
    }

    [nameEl, emailEl, messageEl].forEach(el => {
      el.addEventListener("input", updatePreview);
    });
    updatePreview();

    function isValidEmail(v){
      if(!v) return true; // optional field
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    form.addEventListener("submit", function(e){
      e.preventDefault();
      errorEl.textContent = "";

      // Basic validation
      if(!nameEl.value.trim()){
        errorEl.textContent = "Please enter your name.";
        nameEl.focus();
        return;
      }
      if(!messageEl.value.trim()){
        errorEl.textContent = "Please enter a message.";
        messageEl.focus();
        return;
      }
      if(!isValidEmail(emailEl.value.trim())){
        errorEl.textContent = "Please enter a valid email (or leave it empty).";
        emailEl.focus();
        return;
      }

      // Build WhatsApp link
      const text = buildMessage();
      const encoded = encodeURIComponent(text);

      // Ensure number is digits only
      const phone = String(WHATSAPP_NUMBER).replace(/\D/g, "");
      if(!phone){
        errorEl.textContent = "WhatsApp number is not set. Please edit WHATSAPP_NUMBER in the HTML.";
        return;
      }

      const waLink = `https://wa.me/${phone}?text=${encoded}`;

      // Open in a new tab/window
      window.open(waLink, "_blank", "noopener");

    });
