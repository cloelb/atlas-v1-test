# ATLAS — Connexion à Supabase : prochaine étape

Ton projet **Atlas** Supabase et les tables `profiles`, `atlas_data`, `public_pages` existent déjà. La clé publique a été installée dans **`config.js`** de cette archive.

## Ce que tu dois faire maintenant

1. **Ne remplace pas encore ton dépôt officiel ATLAS**. Crée plutôt un dépôt GitHub **public** de préversion : `atlas-v1-test` (ou conserve un dépôt test déjà créé, si tu en as un).
2. Décompresse cette archive puis, sur le dépôt test GitHub, utilise **Add file → Upload files**. Importe les fichiers `index.html`, `app.js`, `styles.css`, `config.js`, `manifest.webmanifest` et le dossier **`assets/`**. Tous doivent être à la racine du dépôt test, avec les illustrations bien dans `assets/`.
3. Dans **Settings → Pages**, sélectionne **Deploy from a branch → main → /(root) → Save**. Attends la publication.
4. Récupère l'URL exacte du site dans **Settings → Pages**. Pour `cloelb/atlas-v1-test`, ce serait normalement `https://cloelb.github.io/atlas-v1-test/` — ne la suppose pas si le nom du dépôt est différent.
5. Dans **Supabase → Authentication → URL Configuration**, mets cette **URL exacte** en **Site URL**, puis ajoute-la dans **Redirect URLs**. Inclure `https://`, le bon chemin, les majuscules éventuelles et le `/` final.
6. Dans **Supabase → Authentication → Providers → Email**, vérifie que l'inscription par e-mail et la confirmation d'adresse sont activées. Le service d'envoi Supabase d'essai peut être limité : teste avec ta propre adresse.
7. Ouvre la page publiée (pas le fichier local), clique **Se connecter → Créer un compte** ; crée un premier compte **de test**. Confirme l'e-mail reçu, reconnecte-toi, modifie le Cap, crée une Mission et une Étape, puis déconnecte-toi et reconnecte-toi pour vérifier la sauvegarde.

## Ce qui a changé dans cette livraison

- `config.js` pointe déjà vers **ton vrai projet Supabase**, avec la **clé publishable** que tu as fournie.
- **Aucune clé secrète** n'a été ajoutée aux fichiers publics.
- Le logo reste une **boussole + ATLAS**, sans sous-titre.
- Le fichier `atlas-apercu.html` reste **une démo locale non connectée**, par précaution. Pour tester les comptes, utilise **`index.html` après publication sur GitHub Pages**.
- Nous n'avons **pas** ajouté l'UUID `founderUserId` car ton compte fondateur n'est pas encore créé. Tes publications réelles ne peuvent donc pas encore apparaître sur la page publique.

## Précautions avant d'ouvrir au public

Les tables ont été créées avec RLS ; leur isolation doit encore être **testée avec deux vrais comptes différents** avant tout lancement. Vérifier l'accès aux photos privées et la déconnexion. La suppression complète de compte, les documents de confidentialité et les sauvegardes de long terme restent à finaliser. **Cette livraison est une préversion de test, pas encore un service public prêt à accepter des données sensibles.**

La clé publique visible dans le code **n'est pas un mot de passe**. Ne communique jamais une clé `sb_secret_`, `service_role` ou un mot de passe Supabase.

## En cas de problème

- Page vide : vérifier que `index.html`, `app.js`, `styles.css`, `config.js` et `assets/` sont au bon endroit dans GitHub.
- Bouton « Se connecter » qui ne montre que la démo locale : vérifier le chargement de `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2` (bloqueur/réseau) et la présence de `config.js` sur GitHub.
- E-mail non reçu : vérifier **Authentication → Users** et la confirmation e-mail, les restrictions du service d'envoi et les spams.
- Redirection vers la mauvaise page après le mail : vérifier **Authentication → URL Configuration** et copier l'URL exacte de GitHub Pages.
- Erreur « database error saving new user » : le trigger d'inscription a pu rencontrer un pseudo déjà pris, ou une erreur SQL. Nous vérifierons les logs ; ne désactive pas RLS.

**Pour continuer ensemble :** envoie une capture d'écran de **GitHub Pages → l'adresse de ton dépôt test** après publication, puis une capture de la page **Authentication → URL Configuration**. Ne montre pas de mot de passe ni de clé secrète.
