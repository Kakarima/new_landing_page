# Master prompt : https://karimabacari-ia.com/

Tu es mon développeur produit. Je te décris l'application que je veux, et tu la construis. Lis tout le document avant de commencer.

## 1. Contexte
- Application web appelée « https://karimabacari-ia.com/ ».
- L'idée : Je veux créer mon site vitrine pour mon activité de consultant IA. J'en ai déjà un, mais il est sur un hébergement payant afin de permettre à mes clients de trouver des informations sur mes services et de réserver un rendez-vous avec moi. https://karimabacari-ia.com/
- Pour qui : Moi je suis consultante IA, et Product owner depuis plus de 6 ans sur des projets en agile de dev web et mobile. Et aujourd"hui j'accompagne des grands groupes sur de la transformations digitale, automatiosation de test de documentations etc. CE site est à destination des Pour les PME ou grands groupes, qui cherchent à travailler avec sur des sujets de transformation digitales grace à l'IA, ou les entreprises qui souhaitent intégrer des fonctionnalités IA dans leur applications. tous les secteurs confondus industrie, energie, assurance, banque.
- Le problème réglé : Aujourd'hui faire un site, faire sa comptabilité, toutes les activités annexes à son expertise llui coute du tmeps et de l'argent. Elle bacle les taches du coup.
- Pourquoi maintenant : cette personne se débrouille aujourd'hui avec des outils qui ne sont pas faits pour ça, et y perd du temps ou de l'argent. L'application doit lui faire gagner ce temps dès la première utilisation.

## 2. Objectif de la première version
Une application simple, en français, qui fait une seule chose très bien : Pouvoir prendre un rdv sur mon Calendly pour que les prospects puissent me contacter.
Tout le reste est secondaire. Si tu dois choisir entre une fonctionnalité de plus et cette fonctionnalité mieux faite, choisis mieux faite.

## 3. Le parcours utilisateur
- Accueil → Créer un compte
- Accueil → Se connecter
- Créer un compte → Tableau de bord
- Se connecter → Tableau de bord
- Tableau de bord → Paramètres
- Tableau de bord → Écran de la core feature
Le user flow complet est joint en image (user-flow-https-karimabacari-ia-com.jpg), dessiné à la main dans Whimsical : il fait foi sur les écrans et les flèches, les écrans listés ci-dessous le complètent. Respecte le.
- Les retours en arrière ne sont pas dessinés, ils vont de soi : chaque écran permet de revenir en arrière. Une fois connecté, une barre de navigation donne accès en un clic au tableau de bord, à l'écran principal et aux paramètres. Aucun écran n'est une impasse.

## 4. Les écrans, un par un
### 1. Accueil
- La promesse en une phrase
- 3 bénéfices concrets
- Bouton « Commencer »
- Lien « Se connecter »
- Trois blocs listant les bénéfices concrets pour les PME et grands groupes
- Bouton principal Commencer menant à la prise de rendez-vous
- Lien discret Se connecter pour accéder à l'espace personnel
- Espace visuel épuré aux teintes naturelles inspirant la confiance
- Mène vers : Créer un compte, Se connecter

### 2. Créer un compte
- Email et mot de passe
- Ou compte Google
- Prénom
- Champ de saisie pour l'adresse email professionnelle
- Champ de saisie pour le mot de passe sécurisé
- Bouton d'inscription rapide via un compte Google
- Champ de saisie pour le prénom du consultant ou du client
- Bouton de validation pour finaliser la création du compte
- Mène vers : Tableau de bord

### 3. Se connecter
- Email et mot de passe
- Mot de passe oublié
- Champ de saisie pour l'adresse email de connexion
- Champ de saisie pour le mot de passe personnel
- Lien interactif Mot de passe oublié en cas de perte
- Bouton de validation pour accéder au tableau de bord
- Message d'erreur discret en cas d'identifiants incorrects
- Mène vers : Tableau de bord

### 4. Tableau de bord
- Résumé de mon activité
- Accès à la fonctionnalité principale
- Dernières actions
- Résumé synthétique de l'activité du consultant en IA
- Bloc d'accès direct vers la fonctionnalité principale de prise de rendez-vous
- Liste des dernières actions réalisées sur la plateforme
- Menu de navigation latéral vers les paramètres du profil
- État vide affichant un message d'encouragement lors de la première connexion
- Mène vers : Paramètres, Écran de la core feature

### 5. Paramètres
- Mon profil
- Mon mot de passe
- Déconnexion
- Section de gestion des informations du profil professionnel
- Champ de modification du mot de passe actuel
- Bouton de sauvegarde des modifications apportées
- Option de déconnexion sécurisée de la session en cours
- Indicateur visuel de la version actuelle du site

### 6. Écran de la core feature (écran principal)
- La core feature : Pouvoir prendre un rdv sur mon Calendly pour que les prospects puissent me contacter
- Titre explicatif invitant le prospect à choisir un créneau
- Intégration directe du widget Calendly pour la prise de rendez-vous
- Sélection interactive des dates et heures disponibles
- Champ de saisie pour le nom et l'email du prospect
- Bouton de confirmation finalisant la réservation du rendez-vous

## 5. La core feature, ce qui fait tout tenir
En tant qu'utilisateur, Pouvoir prendre un rdv sur mon Calendly pour que les prospects puissent me contacter.
Critères de réussite :
- Je comprends quoi faire sans explication, dès l'écran principal.
- L'action principale prend moins de 30 secondes.
- Le résultat de mon action est visible immédiatement (une confirmation, une liste mise à jour).
- Des données d'exemple réalistes sont présentes dès le départ pour que l'écran ne soit jamais vide.
- On sait que ça marche quand le widget Calendly s'affiche correctement sur l'écran dédié
- On sait que ça marche quand un prospect peut consulter les créneaux horaires disponibles
- On sait que ça marche quand un utilisateur peut sélectionner une date et une heure sans erreur
- On sait que ça marche quand la réservation est confirmée et validée par le système Calendly
- On sait que ça marche quand le prospect reçoit une confirmation de son rendez-vous

## 6. Données
Déduis les objets de données nécessaires à partir des écrans (par exemple : utilisateur, et les objets manipulés sur l'écran principal).
Les données vivent dans la mémoire du navigateur : elles doivent rester après un rafraîchissement de la page, et des données d'exemple réalistes sont présentes au tout premier lancement.
Pas de base de données en ligne, pas de serveur, pas de compte réel : la connexion est factice, n'importe quelle adresse et n'importe quel mot de passe fonctionnent.
Données d'exemple à prévoir :
- Consultante IA et Product Owner pour grands groupes
- Transformation digitale et automatisation de documents
- Audit d'intégration d'IA pour PME tous secteurs
- Rendez-vous de cadrage agile de 30 minutes
- Créneau disponible le mardi à 14 heures
- Statut du rendez-vous confirmé avec succès

## 7. Design
- Ambiance : naturel,épuré, inspirant.
- Couleur principale : une seule couleur d'accent, au choix. Une seule couleur d'accent, fond clair, texte lisible.
- Inspiration : https://www.naiomagency.com/
- Une capture d'écran d'inspiration est jointe (inspiration-https-karimabacari-ia-com.jpg) : reprends l'esprit (espacements, hiérarchie, ton), pas le contenu.
- Interface en français, lisible sur ordinateur et sur téléphone, peu de texte, des boutons clairs, une seule action principale par écran.
- Pas d'animation superflue, pas de page « en construction ».
- Utiliser une palette de couleurs aux tons verts naturels et pastels pour inspirer le calme
- Privilégier une typographie sans empattement moderne, épurée et très lisible
- Concevoir des cartes de contenu avec des bordures fines et un fond blanc pur
- Conserver de grands espacements généreux entre chaque bloc pour alléger la lecture
- Éviter les éléments superflus pour garder un aspect minimaliste et professionnel

## 8. Ce qu'on ne construit pas maintenant
- Rien d'autre que la première version.
- Exclu pour l'instant : Les liens de paiments stripe etc.

## 9. Comment on travaille ensemble
- Tu construis, je décide. Je ne lis pas le code et je n'en écris pas.
- Parle moi en mots simples, jamais en jargon. Ne dis pas « composant » ou « API », dis « la partie qui fait telle chose ». Ne me montre jamais de code et ne me demande jamais de taper une commande.
- Construis une application web statique dans ce dossier : index.html, style.css, app.js. Aucune installation, jamais npm ni aucun outil à compiler, aucun serveur à lancer.
- Construis tout d'un coup : tous les écrans, reliés entre eux, avec le design, sans me demander de valider entre deux écrans. Puis ouvre index.html dans mon navigateur.
- Soigne le design autant que le fonctionnement : police lisible, palette cohérente, espacements généreux, cartes, survols, états vides expliqués, interface utilisable sur téléphone. Si un écran te paraît nu, enrichis le.
- Termine par trois points courts : ce qui marche, ce qui ne marche pas encore, et la prochaine amélioration possible.
- Ensuite, mes retouches arrivent une par une. Tu ne touches jamais à ce qui marche déjà, et tu me préviens si une demande risque de casser autre chose.
- Si quelque chose casse, ne me renvoie pas l'erreur : dis « je corrige », corrige, vérifie, puis « c'est réparé, réessayez ».

## 10. Pièces jointes à ce prompt
- Le user flow et la capture d'inspiration sont dans le dossier assets. Regarde les avant de construire : le user flow donne les écrans et leurs liens, l'inspiration donne l'ambiance graphique à reproduire.

Construis tout quand je lance /kickoff ou que je te demande de lancer la construction.
