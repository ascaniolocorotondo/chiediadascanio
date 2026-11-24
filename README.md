# Chiedi ad Ascanio

Sito per raccogliere le proposte degli studenti. Pubblicato su **https://chiediadascanio.github.io**.

## Come funziona

- **Gli studenti scrivono** tramite un Google Form inserito nella pagina. Le risposte arrivano a te (in un Foglio Google), **non** sono pubbliche: così filtri tu insulti e proposte inutili.
- **Tu pubblichi le migliori** aggiungendole a `proposte.json`, con il loro stato.

## 1. Crea il Google Form (5 minuti)

1. Vai su https://forms.google.com e crea un modulo nuovo, ad esempio con queste domande:
   - **Titolo della proposta** (risposta breve, obbligatoria)
   - **Descrivi la tua proposta** (paragrafo, obbligatoria)
   - **Categoria** (menu: Spazi, Eventi, Didattica, Ambiente, Servizi, Altro)
   - **Classe** (risposta breve, facoltativa)
   - **Nome** (risposta breve, facoltativa)
2. In **Impostazioni** disattiva "Raccogli indirizzi email" e "Limita a 1 risposta" (altrimenti serve l'account Google).
3. Nella scheda **Risposte** clicca sull'icona del Foglio per averle tutte in un foglio di calcolo.
4. Clicca **Invia** → icona del link 🔗 → copia il link.
5. Apri `script.js` e incollalo in `googleFormUrl`:
   ```js
   googleFormUrl: "https://docs.google.com/forms/d/e/XXXX/viewform",
   ```

## 2. Pubblica su GitHub Pages

1. Crea un account GitHub con nome utente **chiediadascanio** (il nome utente diventa l'indirizzo del sito).
2. Crea un repository pubblico chiamato esattamente **chiediadascanio.github.io**.
3. Carica tutti i file di questa cartella (anche dal sito: *Add file → Upload files*).
4. Dopo 1–2 minuti il sito è online su https://chiediadascanio.github.io.

## 3. Aggiorna le proposte

Modifica `proposte.json` (anche direttamente su GitHub, con la matita ✏️). Ogni proposta è così:

```json
{
  "titolo": "Distributore d'acqua in ogni piano",
  "descrizione": "Breve spiegazione della proposta.",
  "categoria": "Ambiente",
  "stato": "in-consiglio",
  "richieste": 34,
  "aggiornamento": "Facoltativo: ultime novità.",
  "data": "2026-11-15"
}
```

Valori possibili per `stato`: `in-valutazione`, `in-consiglio`, `approvata`, `realizzata`, `non-approvata`.

Attenzione alle virgole tra una proposta e l'altra: se il file ha un errore, la sezione proposte non si carica. Puoi controllarlo su https://jsonlint.com.

All'inizio il file contiene solo `[]` (nessuna proposta). Più proposte vanno separate da una virgola dentro le parentesi quadre.
