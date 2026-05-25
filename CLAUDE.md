# CLAUDE.md — Alpha Kickoff
*par Alpha No_Code — Lead magnet générateur de fiche projet*

---

## 1. Contexte produit

**Alpha Kickoff** est un lead magnet web pour Alpha No_Code.
Un formulaire génère en 1 clic : nomenclature projet, jalons calculés, checklist de lancement, email client prêt à envoyer, export CSV.
Le CTA final invite à réserver un appel Calendly.

---

## 2. Stack

| Couche | Technologie |
|---|---|
| Markup | HTML5 sémantique |
| Style | CSS3 vanilla (custom properties, grid, flexbox) |
| Logique | JS vanilla ES6+ (zero framework, zero npm) |
| Fonts | Google Fonts — Montserrat 700 / Inter 400+500 / IBM Plex Mono 400 |
| Deploy | GitHub Pages — branch `main`, `/root` |

**Règle absolue** : zéro appel API externe sauf `<link>` Google Fonts. L'app fonctionne offline (hors fonts).

---

## 3. Fichiers

```
index.html   → structure + 3 états visuels
style.css    → design system + layout + responsive
script.js    → logique métier (jalons, checklist, email, CSV, validation, états)
CLAUDE.md    → ce fichier
```

---

## 4. Brand

| Token | Valeur |
|---|---|
| `--bg` | `#0B1020` |
| `--surface` | `#111827` |
| `--border` | `#1E2D4A` |
| `--teal` | `#0BA08F` |
| `--coral` | `#FF8F5C` |
| `--text` | `#E8EDF5` |
| `--text-sub` | `#8896B3` |
| Font titres | Montserrat 700 |
| Font corps | Inter 400/500 |
| Font mono | IBM Plex Mono 400 |

---

## 5. Architecture JS (script.js)

### États
3 sections HTML (`#state-form`, `#state-generating`, `#state-result`) — seule celle avec `.active` est visible.

### Données
- `JALONS` : objet avec 5 jalons par type de projet (`deltaDays` = jours avant la deadline)
- `CHECKLIST_PM` : items spécifiques par outil PM
- `CHECKLIST_COMMUNE` : 6 items communs à tous les projets

### Fonctions clés
- `buildNomenclature(nomClient, type, deadline)` → `CLIENT · TYPE_COURT · MMM YYYY`
- `buildJalons(type, deadline)` → array de `{ num, label, date }` calculés en remontant
- `buildChecklist(outilPM)` → `{ pm: [...], commune: [...] }`
- `buildEmail(data)` → string complète avec toutes variables interpolées
- `buildCSV(data)` → UTF-8 BOM + séparateur `;` (compatible Google Sheets FR)

### Validation
- Inline au `blur` + complète à la soumission
- Erreurs affichées sous chaque champ via `.field-error`
- Deadline : doit être dans le futur

---

## 6. Types de projets — TYPE_COURT

| Valeur select | Clé interne | TYPE_COURT |
|---|---|---|
| Identité visuelle / Branding | `branding` | ID/Brand |
| Site web | `site` | Site Web |
| Campagne digitale | `digital` | Digital |
| Motion design / Vidéo | `motion` | Motion |
| Contenu & SEO | `seo` | SEO |
| Autre | `autre` | Projet |

---

## 7. Placeholders

- Calendly : `https://calendly.com/agence-alphanc/audit-decouverte`
- Template Notion : `https://notion.so/alpha-nocode/template`

---

## 8. Règles de collaboration

- Lit le fichier avant de modifier
- Commits descriptifs + push
- **Règle BRAIN** : quand le message se termine par "Brain" ou "BRAIN", analyser et exposer les options/trade-offs avant d'implémenter — attendre un GO explicite
- Mobile-first — breakpoint 768px
- Labels accessibles : `for` ↔ `id` sur tous les inputs

---

## 9. État actuel (2026-05-25)

**v1.0 — app complète**
- Formulaire 7 champs avec validation inline
- Génération : nomenclature + jalons (5/type) + checklist (PM + commune) + email + CSV
- 3 états visuels : form → progress bar 1s → result
- CTA Calendly en fin de fiche
- Export CSV UTF-8 BOM, compatible Google Sheets
- Déployé sur GitHub Pages
