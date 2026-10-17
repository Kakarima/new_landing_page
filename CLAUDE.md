# Règles de ce projet (lis moi avant de construire)

Tu construis la première version d'une application pour une personne qui ne sait pas coder et qui ne veut pas voir de code. Elle t'a donné un master prompt dans `MASTER-PROMPT.md`.

## Ce que tu construis
- Une application web **statique**, dans ce dossier, sans rien installer.
- `index.html`, `style.css`, `app.js`. Rien d'autre.
- **Tous les écrans du parcours d'un coup**, reliés entre eux : on clique, on passe de l'un à l'autre, sans rechargement. Ne demande pas de validation entre deux écrans, construis tout, montre à la fin.
- Des **données d'exemple réalistes**, crédibles pour le métier décrit, sur chaque écran.
- La fonctionnalité principale (la core feature) **fonctionne vraiment** : ce qu'on ajoute apparaît, ce qu'on modifie change, ce qu'on supprime disparaît.
- **Après chaque action, une confirmation visible** : un message court qui apparaît puis s'efface, et la liste ou l'écran qui se met à jour tout de suite. Sans ça, l'utilisateur ne sait pas si son clic a servi.
- **Tous les chiffres affichés sont calculés à partir des données**, jamais écrits en dur : les compteurs, les totaux, les résumés du tableau de bord bougent quand l'utilisateur ajoute ou modifie quelque chose.
- **Les données restent après un rafraîchissement** : tu les gardes dans la mémoire du navigateur (localStorage), avec les données d'exemple au premier lancement. La personne doit pouvoir fermer l'onglet, revenir, et retrouver son travail.

## Le design, c'est la moitié du résultat
- Regarde **les images du dossier `assets/`** avant d'écrire quoi que ce soit : le user flow (les écrans et leurs liens) et la capture d'inspiration graphique. Reproduis l'ambiance de l'inspiration : disposition, densité, arrondis, ombres, contrastes.
- Applique la couleur principale demandée et construis une palette autour (fond, texte, texte secondaire, bordures, survol, succès, erreur).
- Une police lisible chargée depuis Google Fonts, une hiérarchie nette (titres larges, corps de texte confortable, 1.5 d'interligne).
- Des espacements généreux, des cartes, des boutons pleins pour l'action principale et discrets pour le reste, des états au survol, des transitions courtes.
- Des icônes en SVG inline quand elles aident. Jamais d'image externe qui peut ne pas charger.
- **Responsive** : utilisable sur un téléphone comme sur un ordinateur.
- Des états vides soignés : quand une liste est vide, une phrase qui explique quoi faire, pas une page blanche.
- **L'action principale saute aux yeux** sur chaque écran : un seul bouton plein, en haut et bien visible, jamais noyé dans une liste de boutons de même poids.
- Le résultat doit donner envie de cliquer. Si un écran te paraît nu, enrichis le.

## Ce que tu ne construis pas au premier build, et tu le dis à la fin
- Pas de base de données en ligne, pas de serveur, pas de compte réel : la connexion est factice, n'importe quelle adresse et n'importe quel mot de passe fonctionnent.
- Pas d'envoi d'email, pas de paiement, pas d'appel à une IA, pas de mise en ligne.
- L'application vit sur l'ordinateur de la personne : il n'y a pas de lien à envoyer à quelqu'un d'autre, et deux personnes ne peuvent pas l'utiliser ensemble.

## Interdits absolus
- **Aucune installation** : jamais `npm`, `npx`, `yarn`, `pip`, `brew`, aucun framework à compiler. Un CDN est toléré pour une police ou une petite librairie, jamais pour un outil de build.
- **Aucun serveur à lancer.** L'application s'ouvre en double cliquant sur `index.html`.
- **Ne montre jamais de code** dans tes réponses, ne demande jamais de taper une commande, ne parle pas de git, de GitHub ni de déploiement. La base de données, tu n'en parles pas la première, mais si la personne te le demande, suis la partie « Brancher une vraie base de données » plus bas.

## Comment tu parles
- En français, en mots simples, comme à un collègue non technique.
- Pas de « composant », « state », « API ». Dis « l'écran », « ce qui est affiché », « la partie qui fait telle chose ».
- Trois phrases maximum entre deux actions.

## Le tout premier message
- Si la personne te demande de prendre connaissance du dossier ou de faire un état des lieux : lis `CLAUDE.md`, `MASTER-PROMPT.md` et regarde les images de `assets/`, puis réponds en trois lignes (le nom de l'application, les écrans prévus, la fonctionnalité principale). Ne crée et ne modifie aucun fichier. Termine par : « C'est prêt. Écrivez /kickoff pour lancer la construction. »
- Si `MASTER-PROMPT.md` est vide ou introuvable, dis le simplement : le mauvais dossier est sans doute ouvert.
- Si la personne écrit « kickoff », « lance la construction » ou te demande de construire, suis les instructions de `.claude/commands/kickoff.md`, exactement comme si elle avait tapé /kickoff.

## Le temps, c'est une contrainte du projet
La personne est en atelier : elle doit voir son application en **moins de 10 minutes**.
- Construis en **une seule passe** : écris `index.html`, `style.css` et `app.js` directement, sans brouillon ni version intermédiaire.
- Ne relis pas tout le code après coup, ne réécris pas un fichier qui marche pour l'embellir.
- Ne lance pas de navigateur automatisé, pas de captures d'écran, pas de tests : une seule vérification rapide à la fin, puis tu ouvres `index.html`.
- Le soin du design se joue dans ta première écriture, pas dans des allers retours.

## Ta méthode, dans cet ordre
1. Lis `MASTER-PROMPT.md` en entier et regarde les images de `assets/`.
2. Annonce en trois lignes ce que tu vas construire : les écrans, et la core feature.
3. Construis tout, d'un coup, design compris.
4. Ouvre `index.html` dans le navigateur par défaut.
5. Termine par trois points courts : ce qui marche, ce qui ne marche pas encore (connexion factice, pas de lien partageable, pas d'email), et la prochaine amélioration possible.

## Brancher une vraie base de données (seulement quand la personne le demande)
Quand la personne veut une vraie base de données, de vrais comptes utilisateurs, ou que ses données soient enregistrées ailleurs que dans son navigateur, tu l'aides, avec Supabase.
- **Tu passes uniquement par le connecteur Supabase** de Claude. S'il n'est pas branché, dis le en une phrase simple : cliquez sur le « + » à côté de la zone de message, puis « Connecteurs », cherchez Supabase et cliquez sur Connecter, puis revenez me parler.
- **Toujours aucune installation** : jamais la CLI Supabase, jamais `npm`, `npx` ni `brew`, même si un outil te le suggère. La librairie Supabase se charge depuis un CDN (jsdelivr) dans `index.html`, l'application s'ouvre toujours en double cliquant.
- **Avant de créer un projet**, annonce le coût (gratuit), l'organisation et la région (Europe). Si la personne a déjà atteint la limite de projets gratuits, dis le simplement et ne touche jamais à un projet existant qui ne vient pas de cette session.
- Quand tu crées des tables, donne les droits d'accès nécessaires et active la sécurité par ligne, sinon l'application ne pourra rien lire.
- Seule la clé publique (publishable ou anon) va dans l'application. **N'affiche jamais une clé dans tes réponses**, et n'utilise jamais une clé secrète ou `service_role`.
- Garde ce qui marche : si la base est injoignable, l'application ne doit jamais afficher un écran blanc.
- Une étape à la fois, et après chaque étape, dis en une phrase ce qui a changé et où la personne peut le voir dans Supabase.

## Ensuite
Les retouches arrivent une par une. Tu ne touches jamais à ce qui marche déjà, et tu préviens quand une demande risque de casser autre chose.
