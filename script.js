// ============================================================
//  CONFIGURAZIONE — modifica solo questa parte
// ============================================================
const CONFIG = {
  // Incolla qui il link del tuo Google Form (quello che finisce con /viewform).
  // Esempio: "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform"
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfsGX8KaQsd8u3uDFRaU8moHm8LiGGEm05Zo_8dKkcNcSiILg/viewform",
};
// ============================================================

const STATI = {
  "in-valutazione": "In valutazione",
  "in-consiglio": "In Consiglio",
  "approvata": "Approvata",
  "realizzata": "Realizzata",
  "non-approvata": "Non approvata",
};

let proposte = [];

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function formatData(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(d) ? iso : d.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
}

function mostraForm() {
  const box = document.getElementById("form-container");
  const url = CONFIG.googleFormUrl.trim();
  if (!url) {
    box.innerHTML = `
      <div class="form-placeholder">
        <p><strong>Modulo non ancora collegato.</strong></p>
        <p>Apri <code>script.js</code> e incolla il link del Google Form in <code>googleFormUrl</code>.</p>
      </div>`;
    return;
  }
  const embed = url.includes("?") ? `${url}&embedded=true` : `${url}?embedded=true`;
  box.innerHTML = `<iframe src="${escapeHtml(embed)}" title="Modulo proposte" loading="lazy">Caricamento…</iframe>`;
}

function mostraStatistiche() {
  const conta = s => proposte.filter(p => p.stato === s).length;
  const approvate = conta("approvata") + conta("realizzata");
  document.getElementById("stats").innerHTML = `
    <div class="stat"><strong>${proposte.length}</strong><span>proposte selezionate</span></div>
    <div class="stat"><strong>${conta("in-consiglio")}</strong><span>in Consiglio</span></div>
    <div class="stat"><strong>${approvate}</strong><span>approvate</span></div>`;
}

function mostraProposte(filtro = "tutte") {
  const box = document.getElementById("cards");
  const lista = filtro === "tutte" ? proposte : proposte.filter(p => p.stato === filtro);

  if (!lista.length) {
    box.innerHTML = `<p class="muted">Nessuna proposta in questa categoria per ora.</p>`;
    return;
  }

  box.innerHTML = lista.map(p => `
    <article class="card">
      <div class="card-top">
        <span class="category">${escapeHtml(p.categoria || "Generale")}</span>
        <span class="badge ${escapeHtml(p.stato)}">${STATI[p.stato] || escapeHtml(p.stato)}</span>
      </div>
      <h3>${escapeHtml(p.titolo)}</h3>
      <p>${escapeHtml(p.descrizione)}</p>
      ${p.aggiornamento ? `<div class="update">📌 ${escapeHtml(p.aggiornamento)}</div>` : ""}
      <div class="card-meta">
        <span>${p.richieste ? `👥 ${Number(p.richieste)} studenti l'hanno chiesta` : ""}</span>
        <span>${formatData(p.data)}</span>
      </div>
    </article>`).join("");
}

function attivaFiltri() {
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      mostraProposte(chip.dataset.filter);
    });
  });
}

async function caricaProposte() {
  try {
    const res = await fetch("proposte.json", { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    proposte = await res.json();
    proposte.sort((a, b) => (b.data || "").localeCompare(a.data || ""));
    mostraStatistiche();
    mostraProposte();
  } catch (e) {
    document.getElementById("cards").innerHTML =
      `<p class="muted">Impossibile caricare le proposte. Riprova più tardi.</p>`;
  }
}

mostraForm();
attivaFiltri();
caricaProposte();
