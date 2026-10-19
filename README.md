# ATLAS V1.2 — Connexion Supabase configurée

**Commencer par [`LISEZ-MOI-DABORD.md`](LISEZ-MOI-DABORD.md).** `config.js` contient désormais l’URL de ton projet Supabase et sa clé publique publishable. Les comptes réels restent à tester après publication sur GitHub Pages.

# ATLAS — Le jeu des possibles · V1.1 (logo épuré + Supabase prêt à configurer)

**Une vraie base navigable**, optimisée d'abord pour un téléphone : site public de Cloé, quatre Territoires, Missions, chemin à Étapes, espace personnel, Cap, Carnet, photos privées, suivi par horizons et bibliothèque personnelle. La création de compte nécessite un projet Supabase configuré ; avant activation, le site propose uniquement une **démonstration locale**.

**Identité visuelle :** la phrase « DES VIES PLUS GRANDES QUE DEMAIN » a été retirée de la signature : la boussole + ATLAS apparaissent seuls dans le bandeau public et personnel.

**Backend :** `supabase/schema.sql` contient les règles RLS renforcées et `DEMARRAGE-SUPABASE.md` explique leur activation. Aucun compte ni base réelle ne sont créés par cette archive.

## A. Voir la version immédiatement, sans code

1. Ouvre `atlas-apercu.html` dans ton navigateur, ou publie le dossier entier sur un dépôt de test GitHub Pages.
2. Clique **Se connecter** → **Essayer Mon Atlas** pour tester le mode local.
3. Crée un Cap, une Mission, ses Étapes, coche une Étape, puis écris dans le Carnet.
4. Les données locales ne sont conservées que sur cet appareil si son navigateur autorise le stockage. **Ce n'est pas un compte sécurisé.**

La page publique affiche les **trois Missions fondatrices** de Cloé sans prétendre que les Étapes sont accomplies. Les avancées publiques ne deviennent visibles qu'après mise en service du compte fondateur et une publication volontaire.

## B. Publier une préversion GitHub Pages

1. Crée un nouveau dépôt nommé `atlas-v1-test`, **sans modifier ton dépôt `Atlas` existant**.
2. Décompresse le ZIP. Dans GitHub → **Add file → Upload files**, importe **les fichiers et le dossier `assets/`**, et non le ZIP. Garde `index.html`, `app.js`, `styles.css`, `config.js` et `assets/` au niveau racine. Sur GitHub, le dépôt doit conserver les sous-dossiers.
3. Confirme → Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.
4. Ton aperçu sera normalement `https://cloelb.github.io/atlas-v1-test/` si le dépôt s'appelle exactement `atlas-v1-test` (respect de la casse).
5. Vérifie directement sur **iPhone Safari**, **Chrome Android** et dans le navigateur intégré Instagram avant de publier sur Linktree.

GitHub Pages héberge le **frontend statique**, pas une base de données sécurisée ni un serveur d'identification. Sans B ci-dessous, **ne propose pas de vraies inscriptions**.

## C. Activer de vrais comptes individuels (Supabase)

**Les étapes suivantes doivent être réalisées dans un projet Supabase t'appartenant ; elles ne sont pas déjà activées dans ce ZIP.**

1. Crée un projet sur [Supabase](https://supabase.com/). Active l'authentification **Email** et la confirmation des e-mails. Configure un domaine d'envoi et les protections antibot / limites de tentatives avant toute ouverture au public.
2. Dans **SQL Editor**, exécute `supabase/schema.sql`. Celui-ci crée `profiles`, `atlas_data`, `public_pages`, un bucket **privé** pour les images et des règles RLS. Vérifie le succès de chaque instruction ; ne désactive pas RLS.
3. Dans **Authentication → URL Configuration**, ajoute comme URL autorisée le lien exact de la préversion GitHub Pages `https://cloelb.github.io/atlas-v1-test/`. Configure correctement la **Site URL** et les **Redirect URLs**, notamment pour les confirmations d'inscription et les mots de passe oubliés.
4. Dans `config.js`, saisis **l'URL publique du projet Supabase** et **sa clé publishable/anon**. Ces deux valeurs sont publiques par conception **à condition que RLS soit activé**. Ne renseigne **jamais** de clé `service_role`, mot de passe DB ou token administrateur dans GitHub.
5. Publie `config.js` modifié, puis crée un compte **de test** par l'interface. Vérifie la réception du mail de confirmation, la connexion, la déconnexion, la récupération du mot de passe et la sauvegarde sur deux appareils.
6. Crée ensuite le compte de Cloé. Dans **Authentication → Users** (Supabase), récupère son UUID. Place cet UUID dans `config.js` sous `founderUserId`, republie le fichier. **Seul cet UUID fait foi pour reconnaître les publications de la fondatrice, pas un pseudo qui pourrait être imité.**
7. Connectée à son Atlas, Cloé peut cocher **Rendre cette Mission publique** ou **Rendre cette trace publique (texte seulement)**. Puis ouvrir le menu du compte et cliquer **Mettre à jour mon Atlas public**. Les autres Atlas restent privés.

**Connexion :** cette V1 demande un **pseudo pour le profil**, une **adresse e-mail pour s'identifier / récupérer son compte**, et un **mot de passe**. Une connexion *par pseudo seul* requerrait une API dédiée, avec contrôles contre l'énumération des e-mails ; elle n'est **pas** implémentée.

### Publication contrôlée

- Les Missions, Étapes, réflexions, photos privées sont enregistrées sous `atlas_data` et `storage` (RLS par utilisateur).
- Les données publiques sont une **copie volontaire et filtrée** dans `public_pages` ; **les photos privées ne sont pas copiées vers le site public**.
- Le site public affiche les Missions fondatrices comme intentions. Il ne fabrique aucune date, aucune preuve et aucune réussite.
- Le compte de Cloé identifié dans `config.js` est le seul présenté comme **Atlas de Cloé** ; chaque visiteur peut créer son Atlas privé.

## D. Ce qui est déjà utilisable

- Accueil narratif avec **1 Cap, une infinité de Missions**, son histoire, ses Territoires, Missions publiques et Bibliothèque.
- Ambiance selon la **saison déterminée automatiquement** par la date du téléphone, sans interrupteur manuel.
- Espace personnel mobile-first : édition du Cap et historique des précédents Caps ; **Autonomie, Corps, Esprit, Savoir-faire** ; création, édition, archivage et suppression de Missions ; types **Mission / Expédition / Longue Route**.
- Carte verticale avec Étapes verrouillées jusqu'à validation des précédentes, animation de sceau et récapitulatif à compléter une fois toutes les Étapes validées.
- Actions par horizon : **aujourd'hui, cette semaine, ce mois-ci, long terme** ; validation libre sans pénalité.
- Carnet avec catégories, lien vers une Mission, photos compressées, traces chronologiques et notions / lectures / compétences.
- Export JSON manuel et sauvegarde en compte quand Supabase est configuré.

## E. Limitations de la V1 — ne pas les dissimuler

- **La maquette Pinterest fournie par Cloé est une référence artistique, pas une capture du site codé.** Le rendu web a une charte éditoriale analogue, mais il ne reproduit pas au pixel près les collages et illustrations des concept-arts.
- Le site n'a pas encore reçu un audit de sécurité ni de vrais tests sur appareils iPhone / Android, ni la validation d'une véritable installation Supabase.
- **Pas de connexion uniquement par pseudo** ; email + mot de passe avec pseudo choisi à l'inscription.
- **Pas d'import automatique depuis Instagram** ; Cloé publie sur Instagram et saisit les avancées qu'elle souhaite conserver ici.
- Le partage public ne transfère que des **textes** sélectionnés. Les photos restent privées jusqu'à une V2 avec contrôle explicite de visibilité, licences et consentements.
- Les tâches « aujourd’hui / semaine / mois » sont des **groupes d’actions**, pas encore un moteur de calendrier récurrent qui recrée automatiquement les tâches.
- La synchronisation cloud actuelle sauvegarde un document JSON par utilisateur ; en cas d'écriture simultanée depuis plusieurs appareils, **la dernière sauvegarde peut écraser la précédente**. Pour une conservation sur plusieurs décennies, migration vers des tables événementielles, versionnement, sauvegardes régulières et export standard seront nécessaires.
- Le compte ne propose **pas encore une fonction autonome de suppression définitive** ni de traitement des demandes RGPD. Ce point, les mentions légales, politique de confidentialité complète, les plans de restauration et l'accès des mineurs doivent être résolus **avant un lancement public avec comptes réels**.
- Pas de paiement pour le futur planner, ni de conseil personnalisé de santé/finance.

## F. Tests

- Syntaxe JavaScript : `node --check app.js`
- `tests/smoke.py` utilise Chromium Playwright avec un document en mémoire et images embarquées parce que l'environnement de validation bloque les serveurs locaux. Il vérifie les clics, création de Mission, Étapes, Carnet, Cap, et contrôle le débordement mobile.
- **Non testés en environnement de production** : connexion Supabase, sécurité dynamique des règles RLS, stockage et suppression de fichiers, e-mails, vrais appareils et réseaux mobiles.

## G. Fichiers importants

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil statique, point d'entrée |
| `styles.css` | Styles responsives, transitions, modes saisonniers |
| `app.js` | Navigation, édition, historique, interface et Supabase |
| `config.js` | Configuration publique à remplir |
| `assets/` | Illustrations, mosaïques, logo, saison |
| `supabase/schema.sql` | Base, authentification des profils, RLS et stockage privé |
| `atlas-apercu.html` | Aperçu HTML autonome local (sans comptes) |
| `docs/` | Captures d'écran de validation simulée |

**Aucune donnée de Cloé n'a été inventée dans les captures du site.** Les captures de test personnelles peuvent contenir une Mission de test fictive, clairement distincte de son Atlas public.
