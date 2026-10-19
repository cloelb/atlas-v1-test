**Mise à jour V1.2 :** les tables sont déjà installées sur ton projet et les deux valeurs publiques sont déjà intégrées dans `config.js`. Passe directement aux réglages **Authentication → URL Configuration** et aux tests sur le dépôt GitHub de préversion. Ne réexécute pas le script SQL sans nécessité.

# ATLAS — connecter les comptes Supabase (V1.1)

Cette livraison **ne crée pas un compte Supabase à ta place** : elle contient le code de connexion, la base SQL, et les règles de confidentialité. Pour rendre les comptes réels, il faut créer ou connecter un projet qui t'appartient.

## 1. Créer ton projet, sans partager de mot de passe

1. Dans [Supabase](https://supabase.com/dashboard), inscris-toi puis crée un **New project** nommé `atlas`.
2. Choisis une région européenne proche de tes utilisateurs et protège ton compte avec un mot de passe fort et la double authentification.
3. Tu auras un **Project URL** et une **Publishable key** sous les paramètres API. La *publishable key* peut apparaître dans le navigateur ; **jamais la secret/service_role key ni le mot de passe du projet**.
4. Garde ce projet sous ton compte. ATLAS utilise GitHub Pages pour les pages et Supabase pour les comptes et les données.

## 2. Mettre en place les tables et la confidentialité

1. Supabase → **SQL Editor** → New query.
2. Colle et exécute le contenu entier de `supabase/schema.sql`.
3. Vérifie qu'aucune instruction ne signale d'erreur. Dans **Table Editor**, tu dois voir `profiles`, `atlas_data` et `public_pages`.
4. Dans **Authentication → Policies**, vérifie **RLS enabled** sur les trois tables. Dans **Storage**, le bucket `atlas-private` doit rester privé.
5. Les documents dans `atlas_data` ne sont accessibles qu'à leur propriétaire connecté. `public_pages` ne devient visible que lors d'une publication volontaire ; les photographies ne sont **pas** incluses dans le contenu public.

Ne désactive jamais les politiques pour résoudre un problème de connexion. Corrige plutôt la requête ou la politique.

## 3. Paramétrer l'inscription et les e-mails

Dans **Authentication → Providers**, active `Email`. Exige la **confirmation de l'e-mail**. En production, configure un service d'envoi d'e-mail avec ton domaine, les limites de tentatives et une protection antibot selon les options disponibles.

Dans **Authentication → URL Configuration** :

- **Site URL** = l'adresse exacte du site publié, par exemple `https://cloelb.github.io/atlas-v1-test/` (si tu utilises ce nom de dépôt).
- **Redirect URLs** : ajoute cette même adresse pour les liens de confirmation et de changement de mot de passe.
- Lorsque tu passes au vrai domaine, mets à jour ces URLs. L'adresse est sensible aux majuscules, au chemin du dépôt et au `/` final.

## 4. Relier le site au projet

Dans `config.js`, complète uniquement :

```javascript
window.ATLAS_CONFIG = {
  supabaseUrl: 'https://TON-PROJET.supabase.co',
  supabaseAnonKey: 'TA_CLE_PUBLISHABLE',
  founderUserId: ''
};
```

Tu peux committer ce fichier **uniquement** avec la publishable key. Ne colle jamais de clé secrète. Héberge les fichiers sur un dépôt GitHub de test, puis essaie **Créer un compte** et **Se connecter**. Le fichier `atlas-apercu.html` est volontairement une démo locale : il n'est pas connecté à Supabase.

## 5. Reconnaître le compte de la fondatrice

Après avoir créé et confirmé ton propre compte ATLAS :

1. Supabase → **Authentication → Users** → copie l'UUID de ton utilisateur.
2. Place-le dans `founderUserId` dans `config.js`.
3. Publie ton `config.js` mis à jour.
4. Depuis ton compte, sélectionne uniquement les Missions ou notes souhaitées puis clique sur « Mettre à jour mon Atlas public ».

La page publique ne doit **jamais** afficher automatiquement les données personnelles de tous les membres. Le fondateur est reconnu par son UUID, non par son pseudo.

## 6. Vérifications indispensables avant l'ouverture

Tester avec **deux comptes distincts**, A et B :

- A et B peuvent créer leur propre Cap et Mission et les retrouver après reconnexion sur un autre appareil.
- B ne peut pas lire, modifier ou supprimer `atlas_data` de A, même en appelant directement l'API ; l'inverse également.
- Les visites déconnectées ne voient **que** les publications effectivement rendues publiques ; aucun Carnet ni photo privée.
- `atlas-private` reste inaccessible sans le compte propriétaire ; les URL signées sont temporaires.
- Inscription → mail de confirmation → connexion → déconnexion → récupération du mot de passe fonctionnent.
- Les erreurs de synchronisation sont signalées ; ne considère pas une saisie comme enregistrée si une erreur apparaît.
- Les connexions fonctionnent dans Safari sur iPhone, Chrome sur Android et dans le navigateur intégré Instagram.

**Pas encore prêt pour l'ouverture générale** : suppression définitive du compte, procédures RGPD, restauration des sauvegardes, conflits d'écriture simultanée, test d'intrusion, conditions d'utilisation, politique de confidentialité et protection des mineurs. La V1 reste une préversion privée tant que ces sujets ne sont pas finalisés.

## 7. Si tu souhaites que je réalise la configuration directement

Connecte ton espace Supabase à ChatGPT via le connecteur Supabase proposé dans la conversation, puis confirme que la connexion est faite. Je pourrai alors examiner les projets auxquels tu m'auras donné accès et t'accompagner pour exécuter les migrations, sans recevoir tes mots de passe ni tes clés secrètes.
