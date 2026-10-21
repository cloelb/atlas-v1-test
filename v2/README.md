# ATLAS V2 — Première tranche interactive

Préversion **isolée** de l'ancienne branche `main`. Le site public existant n'a pas été remplacé.

## Démarrer localement

`python3 -m http.server 8000` dans ce dossier, puis ouvrir `http://localhost:8000/`. Un serveur HTTP est indispensable aux modules JavaScript.

L'aperçu fonctionne **sans dépendances npm** : accueil artistique, Cap pré-inscription, mode découverte local, création des Missions, chemin guidé/libre, Étapes déverrouillables, animation de sceau, Carnet, export JSON.

### Comptes Supabase (facultatifs, non homologués)

1. Copier `config.example.js` en `config.js` et y renseigner **uniquement** l'URL du projet et la clé publique publishable.
2. Insérer `<script src="./config.js"></script>` avant le script `src/main.mjs` dans `index.html`.
3. Disposer côté Supabase de `auth` et de la table `atlas_data` protégée par RLS. **Le schéma effectif de production n'a pas été vérifié : ne pas ouvrir aux utilisateurs réels.**
4. Vérifier le chargement de `@supabase/supabase-js` et tester avec **deux comptes distincts** et les autorisations RLS avant de présenter l'inscription comme fiable.

Les photos, la publication réelle et la synchronisation multi-appareils sans conflits ne font **pas** partie de cette tranche. La sauvegarde locale est provisoire, les images sont conservées hors base, et aucune clé secrète n'est requise.

## Assets artistiques

- `assets/hero-original.png` : **illustration approuvée intacte** (avec typographie peinte dans le visuel), conservée sans retouche.
- `assets/{autonomie,corps,esprit,savoir-faire}.webp` : **découpes de travail** de la planche artistique approuvée. Elles ne doivent pas être confondues avec des illustrations indépendantes finalisées.
- `assets/compass.svg` : boussole vectorielle, sans sous-titre.

### Limite de composition de l'accueil

L'image originale intègre déjà texte, navigation et bouton dessinés. Sur ordinateur, un *hotspot* transparent et accessible est disposé sur le bouton dessiné ; sur téléphone, l'image est cadrée vers le personnage et un **vrai bouton HTML** séparé apparaît. Une version dérivée de l'illustration sans typographie devra être validée avant publication finale pour éviter les doublons et permettre un placement parfait du vrai titre.

## Architecture et tests

- `src/model.mjs` : données et règles, fonctions pures et idempotence.
- `src/storage.mjs` : brouillon local et export manuel.
- `src/cloud.mjs` : adaptateur Supabase, activable après audit.
- `src/main.mjs` : écrans et interactions, échappement des textes utilisateurs.
- `tests/model.test.mjs` : assertions sous Node 22+.

`node --test tests/model.test.mjs`

**Étape d'architecture suivante :** après validation visuelle et métier de ce parcours, migration des composants vers React/TypeScript/Vite, schéma de données versionné et extension de l'Atelier. Les dépendances npm ne sont pas téléchargeables dans cet environnement : cette tranche autonome permet des vérifications réelles plutôt que d'affirmer des tests non exécutés.

**Limites de sécurité :** brouillon local non chiffré ; pas de garantie de conservation des souvenirs sur 30 ans ; comptes non audités ; pas de photos Cloud, pas d'effacement de compte, pas de mention RGPD complète. Ne pas utiliser comme produit public définitif.
