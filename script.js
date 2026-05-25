'use strict';

/* ══════════════════════════════════════════════════════════════
   Alpha Kickoff — script.js
   Logique : jalons · checklist · email · CSV · validation · états
════════════════════════════════════════════════════════════════ */

// ── Données ──────────────────────────────────────────────────

const TYPE_COURT = {
  branding: 'ID/Brand',
  site:     'Site Web',
  digital:  'Digital',
  motion:   'Motion',
  seo:      'SEO',
  autre:    'Projet',
};

const TYPE_LABELS = {
  branding: 'Identité visuelle / Branding',
  site:     'Site web',
  digital:  'Campagne digitale',
  motion:   'Motion design / Vidéo',
  seo:      'Contenu & SEO',
  autre:    'Autre',
};

const PM_LABELS = {
  notion:  'Notion',
  clickup: 'ClickUp',
  asana:   'Asana / Trello',
  sheets:  'Google Sheets',
  autre:   'Autre',
};

const TYPE_ACCESS_LINE = {
  branding: 'Votre accès Figma (direction créative) sera partagé dans les 24h.',
  site:     'Votre accès Drive projet et les wireframes vous seront envoyés dans les 24h.',
  digital:  'Vos assets créatifs et accès Google Ads / Meta Ads seront partagés dans les 24h.',
  motion:   'Votre accès au dossier production (storyboard, rushs) sera partagé dans les 24h.',
  seo:      'Votre accès au plan éditorial et aux outils d\'analyse sera partagé dans les 24h.',
  autre:    'Votre dossier Google Drive projet vous sera partagé dans les 24h.',
};

// deltaDays = jours avant la deadline
const JALONS = {
  branding: [
    { label: 'Brief & kick-off',          deltaDays: 75 },
    { label: 'Moodboard & références',     deltaDays: 55 },
    { label: 'Concepts logo v1',           deltaDays: 35 },
    { label: 'Révisions & validation',     deltaDays: 14 },
    { label: 'Livraison fichiers finaux',  deltaDays: 0  },
  ],
  site: [
    { label: 'Brief & architecture',    deltaDays: 80 },
    { label: 'Maquettes validées',      deltaDays: 55 },
    { label: 'Développement',           deltaDays: 25 },
    { label: 'Recette & corrections',   deltaDays: 10 },
    { label: 'Mise en ligne',           deltaDays: 0  },
  ],
  digital: [
    { label: 'Brief stratégique',           deltaDays: 40 },
    { label: 'Créations visuels & copies',  deltaDays: 25 },
    { label: 'Paramétrage campagnes',       deltaDays: 12 },
    { label: 'Lancement & test',            deltaDays: 5  },
    { label: 'Bilan & rapport final',       deltaDays: 0  },
  ],
  motion: [
    { label: 'Brief & storyboard',    deltaDays: 55 },
    { label: 'Script & voix-off',     deltaDays: 40 },
    { label: 'Animation v1',          deltaDays: 18 },
    { label: 'Révisions',             deltaDays: 7  },
    { label: 'Export & livraison',    deltaDays: 0  },
  ],
  seo: [
    { label: 'Audit & stratégie mots-clés',  deltaDays: 45 },
    { label: 'Plan éditorial validé',         deltaDays: 28 },
    { label: 'Production contenu',            deltaDays: 14 },
    { label: 'SEO on-page & révisions',       deltaDays: 6  },
    { label: 'Publication & suivi analytics', deltaDays: 0  },
  ],
  autre: [
    { label: 'Cadrage projet',            deltaDays: 55 },
    { label: 'Livrable intermédiaire 1',  deltaDays: 38 },
    { label: 'Livrable intermédiaire 2',  deltaDays: 21 },
    { label: 'Révisions',                 deltaDays: 10 },
    { label: 'Livraison finale',          deltaDays: 0  },
  ],
};

const CHECKLIST_COMMUNE = [
  'Dossier Google Drive créé et partagé',
  'Email de bienvenue envoyé au client',
  'Réunion de kickoff planifiée (Google Calendar)',
  'Accès outils transmis (Figma / Notion / ClickUp selon projet)',
  'Contrat / devis signé archivé',
];

const CHECKLIST_PM = {
  notion: [
    'Dupliquer le template Notion',
    'Partager l\'espace client',
    'Activer les mises à jour par email',
  ],
  clickup: [
    'Créer l\'espace projet dans ClickUp',
    'Inviter le client (Guest)',
    'Configurer les automatisations de rappel',
  ],
  asana: [
    'Créer le board projet',
    'Inviter le client',
    'Activer les notifications',
  ],
  sheets: [
    'Dupliquer le tracker projet',
    'Partager en lecture avec le client',
    'Nommer l\'onglet avec la nomenclature',
  ],
  autre: [
    'Créer le document de suivi',
    'Définir le canal de communication principal',
    'Planifier les points hebdos',
  ],
};

// ── Helpers date ─────────────────────────────────────────────

function subtractDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() - days);
  return d;
}

function fmtDate(date) {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtDateShort(dateStr) {
  return fmtDate(new Date(dateStr + 'T00:00:00'));
}

// ── Constructeurs ────────────────────────────────────────────

function buildNomenclature(nomClient, typeKey, deadlineStr) {
  const d = new Date(deadlineStr + 'T00:00:00');
  const mois = d.toLocaleDateString('fr-FR', { month: 'short' })
    .replace('.', '')
    .replace(/^\w/, c => c.toUpperCase());
  const annee = d.getFullYear();
  const nom = nomClient.trim().toUpperCase();
  return nom + ' · ' + TYPE_COURT[typeKey] + ' · ' + mois + ' ' + annee;
}

function buildJalons(typeKey, deadlineStr) {
  return JALONS[typeKey].map((j, i) => ({
    num:   i + 1,
    label: j.label,
    date:  fmtDate(subtractDays(deadlineStr, j.deltaDays)),
  }));
}

function buildChecklist(pmKey) {
  return {
    pm:     CHECKLIST_PM[pmKey] || CHECKLIST_PM.autre,
    commune: CHECKLIST_COMMUNE,
  };
}

function buildEmail(data) {
  const jalonsText = data.jalons
    .map(j => '  ' + j.num + '. ' + j.label + ' — ' + j.date)
    .join('\n');

  const checklistText = [...data.checklist.pm, ...data.checklist.commune]
    .map(item => '  ☐ ' + item)
    .join('\n');

  const accessLine = '\n' + (TYPE_ACCESS_LINE[data.typeKey] || TYPE_ACCESS_LINE.autre) + '\n';

  return [
    'Objet : ' + data.nomClient + ' × Alpha No_Code — votre projet ' + TYPE_LABELS[data.typeKey] + ' est lancé',
    '',
    'Bonjour ' + data.prenom + ',',
    '',
    'Tout est en place pour démarrer votre projet.',
    'Voici le récapitulatif complet.',
    '',
    '━━━ FICHE PROJET ━━━',
    'Nom         : ' + data.nomenclature,
    'Type        : ' + TYPE_LABELS[data.typeKey],
    'Budget      : ' + data.budget,
    'Deadline    : ' + fmtDateShort(data.deadline),
    'Outil PM    : ' + PM_LABELS[data.pmKey],
    '',
    '━━━ JALONS CLÉS ━━━',
    jalonsText,
    '',
    '━━━ CHECKLIST DE LANCEMENT ━━━',
    checklistText,
    accessLine,
    '━━━ CONTEXTE ━━━',
    data.contexte,
    '',
    'N\'hésitez pas à me contacter pour toute question avant le kick-off.',
    '',
    'À très vite,',
    'L\'équipe Alpha No_Code',
  ].join('\n');
}

function buildCSV(data) {
  const BOM = '﻿';
  const SEP = ';';
  const q = v => '"' + String(v).replace(/"/g, '""') + '"';
  const today = new Date().toLocaleDateString('fr-FR');

  const headers = [
    'Nom projet', 'Client', 'Type', 'Budget', 'Deadline',
    'Interlocuteur', 'Email', 'Outil PM', 'Statut', 'Date création',
  ];

  const row = [
    data.nomenclature,
    data.nomClient,
    TYPE_LABELS[data.typeKey],
    data.budget,
    fmtDateShort(data.deadline),
    data.prenom,
    data.emailContact,
    PM_LABELS[data.pmKey],
    'En attente de kickoff',
    today,
  ];

  return BOM + headers.map(q).join(SEP) + '\n' + row.map(q).join(SEP);
}

// ── Gestion des états ────────────────────────────────────────

function showState(id) {
  document.querySelectorAll('.state').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Validation ───────────────────────────────────────────────

function getError(input) {
  const v = input.value.trim();

  if (!v) return 'Ce champ est requis.';

  if (input.type === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Adresse email invalide.';
  }

  if (input.type === 'date') {
    const chosen = new Date(v + 'T00:00:00');
    const today  = new Date(); today.setHours(0, 0, 0, 0);
    if (chosen <= today) return 'La deadline doit être dans le futur.';
  }

  return '';
}

function validateField(input) {
  const msg     = getError(input);
  const field   = input.closest('.field');
  const errorEl = field && field.querySelector('.field-error');

  input.classList.toggle('error', !!msg);
  if (errorEl) errorEl.textContent = msg;

  return !msg;
}

function validateAll() {
  const inputs = document.querySelectorAll('#kickoff-form input, #kickoff-form select, #kickoff-form textarea');
  let ok = true;
  inputs.forEach(input => { if (!validateField(input)) ok = false; });
  return ok;
}

// ── Rendu du résultat ────────────────────────────────────────

let _data = null;

function renderResult(data) {
  _data = data;

  // Nomenclature
  document.getElementById('result-nomenclature').textContent = data.nomenclature;

  // Brief
  document.getElementById('result-brief').textContent = data.contexte;

  // Meta
  const metaItems = [
    TYPE_LABELS[data.typeKey],
    data.budget,
    'Deadline : ' + fmtDateShort(data.deadline),
    PM_LABELS[data.pmKey],
    data.prenom + ' — ' + data.emailContact,
  ];
  document.getElementById('result-meta').innerHTML = metaItems
    .map((item, i) => (i > 0 ? '<span class="meta-dot"></span>' : '') + '<span>' + item + '</span>')
    .join('');

  // Jalons
  document.getElementById('result-jalons').innerHTML = data.jalons
    .map(j =>
      '<li class="timeline-item">' +
        '<span class="timeline-num">' + j.num + '</span>' +
        '<span class="timeline-label">' + j.label + '</span>' +
        '<span class="timeline-date">' + j.date + '</span>' +
      '</li>'
    ).join('');

  // Checklist
  const pmHtml      = data.checklist.pm.map(item => '<li>' + item + '</li>').join('');
  const communeHtml = data.checklist.commune.map(item => '<li>' + item + '</li>').join('');
  document.getElementById('result-checklist').innerHTML =
    pmHtml + '<li class="checklist-sep" aria-hidden="true"></li>' + communeHtml;

  // Email
  document.getElementById('result-email').textContent = data.emailText;
}

// ── Copier dans le presse-papiers ────────────────────────────

function copyToClipboard(text, btn, label) {
  const restore = () => {
    btn.textContent = label;
    btn.classList.remove('copied');
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copié ✓';
      btn.classList.add('copied');
      setTimeout(restore, 2000);
    }).catch(() => fallbackCopy(text, btn, restore));
  } else {
    fallbackCopy(text, btn, restore);
  }
}

function fallbackCopy(text, btn, restore) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) { /* silencieux */ }
  document.body.removeChild(ta);
  btn.textContent = 'Copié ✓';
  btn.classList.add('copied');
  setTimeout(restore, 2000);
}

// ── Télécharger CSV ──────────────────────────────────────────

function downloadCSV(data) {
  const csv      = buildCSV(data);
  const blob     = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url      = URL.createObjectURL(blob);
  const filename = data.nomenclature.replace(/[·\s]+/g, '_').replace(/[^A-Za-z0-9_\-]/g, '') + '.csv';
  const a        = document.createElement('a');

  a.href     = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── Soumission du formulaire ─────────────────────────────────

document.getElementById('kickoff-form').addEventListener('submit', function (e) {
  e.preventDefault();
  if (!validateAll()) return;

  const fd = new FormData(this);

  const data = {
    nomClient:    fd.get('nomClient').trim(),
    typeKey:      fd.get('typeProjet'),
    pmKey:        fd.get('outilPM'),
    budget:       fd.get('budget'),
    deadline:     fd.get('deadline'),
    prenom:       fd.get('prenom').trim(),
    emailContact: fd.get('emailContact').trim(),
    contexte:     fd.get('contexte').trim(),
  };

  data.nomenclature = buildNomenclature(data.nomClient, data.typeKey, data.deadline);
  data.jalons       = buildJalons(data.typeKey, data.deadline);
  data.checklist    = buildChecklist(data.pmKey);
  data.emailText    = buildEmail(data);

  // Lancer la génération
  showState('state-generating');

  const fill = document.getElementById('progress-fill');
  fill.style.width = '0%';

  // Deux frames pour déclencher la transition CSS
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fill.style.width = '100%';
    });
  });

  setTimeout(() => {
    renderResult(data);
    showState('state-result');
  }, 1150);
});

// ── Validation inline ────────────────────────────────────────

document.querySelectorAll('#kickoff-form input, #kickoff-form select, #kickoff-form textarea')
  .forEach(input => {
    input.addEventListener('blur',  () => validateField(input));
    input.addEventListener('input', () => { if (input.classList.contains('error')) validateField(input); });
    input.addEventListener('change',() => { if (input.classList.contains('error')) validateField(input); });
  });

// ── Boutons résultat ─────────────────────────────────────────

document.getElementById('btn-copy-email').addEventListener('click', function () {
  if (!_data) return;
  copyToClipboard(_data.emailText, this, 'Copier');
});

document.getElementById('btn-csv').addEventListener('click', function () {
  if (!_data) return;
  downloadCSV(_data);
});

document.getElementById('btn-new').addEventListener('click', function () {
  document.getElementById('kickoff-form').reset();
  document.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  document.getElementById('progress-fill').style.width = '0%';
  _data = null;
  showState('state-form');
});

// ── Deadline min = demain ────────────────────────────────────

(function setDeadlineMin() {
  const input    = document.getElementById('deadline');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  input.min = tomorrow.toISOString().split('T')[0];
})();
