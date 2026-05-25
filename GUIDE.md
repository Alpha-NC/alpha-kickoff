# GUIDE.md — Alpha No_Code
*Document de référence transversal : Guide Utilisateur · Guide de Production · Ideas*

---

## Table des matières

1. [Guide Utilisateur — Alpha Kickoff](#1-guide-utilisateur--alpha-kickoff)
2. [Guide de Production — Logique Alpha No_Code](#2-guide-de-production--logique-alpha-nocode)
3. [Ideas — Évolutions futures](#3-ideas--évolutions-futures)

---

## 1. Guide Utilisateur — Alpha Kickoff

### Qu'est-ce que c'est ?

Alpha Kickoff est un générateur de fiche projet pour les freelances et agences.
En moins de 30 secondes et sans compte, l'outil produit :

- Une **nomenclature projet** standardisée (`CLIENT · TYPE · MMM YYYY`)
- Des **jalons calculés** automatiquement depuis la deadline
- Une **checklist de lancement** adaptée à l'outil de suivi choisi
- Un **email de lancement** prêt à envoyer au client
- Un **export CSV** compatible Google Sheets (UTF-8 BOM + séparateur `;`)

---

### Remplir le formulaire

| Champ | Ce qu'on attend | Exemple |
|---|---|---|
| **Nom du client** | Nom court de l'entreprise ou du client | `Studio Vega` |
| **Type de projet** | Catégorie parmi 6 options | `Identité visuelle / Branding` |
| **Outil de suivi** | Le PM tool utilisé pour ce projet | `Notion` |
| **Budget** | Fourchette indicative | `5–15k€` |
| **Deadline** | Date de livraison finale | `2026-09-30` |
| **Prénom interlocuteur** | Prénom du contact client | `Marie` |
| **Email interlocuteur** | Email du contact client | `marie@client.fr` |
| **Contexte projet** | Description courte : enjeux, contraintes | `Refonte complète de l'identité...` |

**Règles de validation :**
- Tous les champs sont obligatoires
- La deadline doit être dans le futur
- L'email doit être valide

---

### Comprendre les sorties

#### Nomenclature
Format : `NOMCLIENT · TYPE_COURT · Mois Année`
Exemple : `STUDIO VEGA · ID/Brand · Sep 2026`

Sert de référence unique pour nommer les dossiers, Drive, Notion, etc.

#### Jalons clés
5 jalons calculés automatiquement en remontant depuis la deadline.
Chaque type de projet a ses propres jalons calibrés :

| Type | Jalons caractéristiques |
|---|---|
| Branding | Brief → Moodboard → Logo v1 → Révisions → Livraison |
| Site web | Brief → Maquettes → Dev → Recette → Mise en ligne |
| Digital | Brief → Créations → Paramétrage → Lancement → Bilan |
| Motion | Brief → Script → Animation v1 → Révisions → Export |
| SEO | Audit → Plan éditorial → Production → On-page → Publication |
| Autre | Cadrage → Intermédiaire 1 → Intermédiaire 2 → Révisions → Final |

#### Checklist de lancement
Deux blocs fusionnés :
1. **Items PM** : spécifiques à l'outil choisi (Notion, ClickUp, Asana, Sheets, Autre)
2. **Items communs** : Contrat signé, Acompte 50%, Brief validé, Accès partagés, Kick-off planifié, Facturation calendrée

#### Email de lancement
Email complet avec :
- Objet standardisé (`Lancement projet — NOMENCLATURE`)
- Fiche récap (type, budget, deadline, outil PM)
- Jalons en texte clair
- Checklist formatée avec cases à cocher
- Contexte projet

**Bouton "Copier"** → colle dans Gmail/Outlook directement.

#### Export CSV
Fichier compatible Google Sheets FR. Contient 10 colonnes :
`Nom projet · Client · Type · Budget · Deadline · Interlocuteur · Email · Outil PM · Statut · Date création`

Pour ouvrir dans Google Sheets : Fichier → Importer → choisir le CSV → séparateur `;`.

---

### Démarrer un nouveau projet
Le bouton **"Nouveau projet"** en bas de la fiche remet le formulaire à zéro sans recharger la page.

---

## 2. Guide de Production — Logique Alpha No_Code

### Philosophie

Alpha No_Code construit des **outils internes et des lead magnets** avec une logique de production cohérente :
zéro friction, déploiement immédiat, autonomie totale (pas de dépendance tierce fragile).

Deux stacks selon le besoin :

| Outil | Stack | Quand |
|---|---|---|
| Lead magnet / outil simple | HTML + CSS + JS vanilla | Pas de compte, pas de backend, offline-capable |
| Outil interne / SaaS | Next.js 15 + Supabase + Vercel | Auth, BDD, API, multi-utilisateurs |

---

### Créer un nouveau projet — Checklist de démarrage

```
1. Créer le dossier local
   mkdir C:\Users\Administrateur\Documents\<nom-projet>

2. Init git + remote GitHub
   cd <nom-projet>
   git init
   git remote add origin https://github.com/Alpha-NC/<nom-projet>.git

3. Créer les fichiers de base selon la stack
   Vanilla : index.html, style.css, script.js
   Next.js  : npx create-next-app@latest (voir Alpha Kall comme référence)

4. Écrire CLAUDE.md en premier
   → Contexte produit, stack, fichiers, brand tokens, règles de collaboration

5. Commit initial descriptif + push
   git add .
   git commit -m "feat: init <nom-projet> — <description courte>"
   git push -u origin main

6. Activer le déploiement
   GitHub Pages → repo Settings → Pages → branch main / root
   Vercel       → import repo depuis vercel.com → auto-deploy sur push main
```

---

### Workflow de développement quotidien

```
Modifier le code (HTML / CSS / JS ou .tsx)
    ↓
Tester localement (ouvrir index.html / npm run dev)
    ↓
Commit descriptif
    git commit -m "feat|fix|style|refactor: <quoi> — <pourquoi>"
    ↓
Push
    git push
    ↓
Déploiement auto (GitHub Pages ~1min / Vercel ~30s)
    ↓
Vérifier la prod
```

---

### Conventions de commit

```
feat:    nouvelle fonctionnalité
fix:     correction de bug
style:   changement visuel pur (CSS, layout)
refactor: refactoring sans changement de comportement
docs:    mise à jour CLAUDE.md, GUIDE.md, PRD.md
chore:   config, dépendances, scripts
```

Exemple : `feat(email): ajouter lien Notion dans le corps du mail`

---

### Design System — Brand Alpha No_Code

```css
/* Couleurs */
--bg      : #0B1020   /* fond principal */
--surface : #111827   /* cards, panels */
--border  : #1E2D4A   /* bordures */
--teal    : #0BA08F   /* signature — actions principales */
--coral   : #FF8F5C   /* accent chaud — CTAs secondaires */
--text    : #E8EDF5   /* texte principal */
--text-sub: #8896B3   /* texte secondaire */

/* Typographie */
Montserrat 700      → titres, logotype
Inter 400/500       → corps, labels, UI
IBM Plex Mono 400   → code, mono, tags

/* Règles */
Dark UI strictement
Pas d'emojis sauf demande
Une action principale par écran (bg-teal ou --teal)
Mobile-first — breakpoint 768px
```

---

### Structure de fichiers recommandée (vanilla)

```
<projet>/
  index.html    → structure + états visuels
  style.css     → design system + layout + responsive
  script.js     → logique métier
  CLAUDE.md     → référence technique pour Claude Code
  GUIDE.md      → guide utilisateur + guide de prod + ideas
```

---

### Structure de fichiers recommandée (Next.js)

Référence : `C:\Users\Administrateur\Documents\alpha-kall` (voir son `CLAUDE.md`).

---

### Règles absolues (tous projets)

- **Pas d'appel API externe côté client** sauf Google Fonts (vanilla) ou APIs déclarées dans CLAUDE.md (Next.js)
- **Zéro secret dans le code** (pas de clé API, pas de token hardcodé)
- **CLAUDE.md à jour** avant chaque session de travail
- **Tester en prod** après chaque déploiement (pas juste en local)
- **Commits atomiques** : un commit = une chose

---

### Déploiement — Référence rapide

| Projet | Déploiement | URL prod |
|---|---|---|
| alpha-kickoff | GitHub Pages | `https://alpha-nc.github.io/alpha-kickoff/` |
| alpha-kall | Vercel | `https://alpha-kall.vercel.app` |

**GitHub Pages** : push sur `master` → déploiement automatique (~1 min)
**Vercel** : push sur `main` → build auto → deploy Production (~30s)

---

### Maintenance et mise à jour de CLAUDE.md

Mettre à jour CLAUDE.md quand :
- Une règle durable change
- Une décision d'architecture est prise
- Une nouvelle table/route est ajoutée
- L'état du produit évolue (section "État actuel")

Ne pas mettre à jour CLAUDE.md pour :
- Des bugs ponctuels résolus (ça va dans les commits)
- Du contexte de session en cours (ça va dans les TODOs)

---

## 3. Ideas — Évolutions futures

### Alpha Kickoff v1.x — Court terme

| Idée | Impact | Complexité |
|---|---|---|
| **Sauvegarde localStorage** — reprendre une fiche en cours | Haut | Faible |
| **Export PDF** — fiche projet imprimable | Haut | Moyen |
| **Jalons personnalisables** — ajouter/supprimer/renommer | Moyen | Moyen |
| **Champ "Nombre de révisions incluses"** dans le formulaire | Moyen | Faible |
| **Copier la nomenclature** séparément (bouton dédié) | Faible | Faible |
| **Pré-remplir depuis URL** (`?client=Vega&type=branding`) | Moyen | Moyen |

---

### Alpha Kickoff v2.0 — Moyen terme

| Idée | Description |
|---|---|
| **Intégration Notion** | Créer automatiquement la page Notion depuis la fiche générée |
| **Intégration Airtable** | Exporter la fiche directement dans la base Alpha No_Code |
| **Email via Brevo/Resend** | Envoyer l'email directement depuis l'app (sans copier-coller) |
| **Templates emails personnalisables** | L'utilisateur peut modifier le template par défaut |
| **Mode "Agence"** | Plusieurs projets, vue liste, historique |

---

### Alpha Kickoff v3.0 — Long terme

| Idée | Description |
|---|---|
| **IA génération brief** | Claude génère un brief complet depuis les inputs du formulaire |
| **Calcul automatique du budget** | Suggestion de budget selon le type et les jalons |
| **Connexion Alpha Kall** | Sync automatique : prospect converti → fiche kickoff pré-remplie |
| **Multilingue** | EN + FR au minimum |
| **Dashboard agence** | Vue globale tous projets en cours (Supabase backend) |

---

### Nouveaux lead magnets Alpha No_Code — Ideas projets

| Projet | Description | Stack |
|---|---|---|
| **Alpha Brief** | Générateur de brief créatif (questionnaire → PDF brief complet) | Vanilla |
| **Alpha Devis** | Calculateur de devis interactif avec export PDF | Vanilla |
| **Alpha Retro** | Template de rétrospective projet (bilan, learnings, NPS client) | Vanilla |
| **Alpha Onboard** | Kit d'onboarding client automatisé (Notion + email) | Next.js |
| **Alpha Scope** | Outil de cadrage de scope avec détection "scope creep" | Next.js |

---

*Dernière mise à jour : 2026-05-25 — v1.0*
