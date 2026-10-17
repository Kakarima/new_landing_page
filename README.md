# Votre kit de départ

Tout est déjà en place : votre master prompt est dans `MASTER-PROMPT.md`, votre user flow dans `assets/`. Vous n'avez rien à installer ni à copier.

## En trois gestes

1. **Ouvrez ce dossier dans Claude Desktop** : l'application Claude installée sur votre ordinateur, onglet **Code** (l'icône </>). Au dessus du champ de saisie, la première pastille doit indiquer **Local**. Cliquez sur la pastille avec l'icône </> et choisissez ce dossier. Si Claude demande s'il peut faire confiance à ce dossier, répondez oui. En bas à droite du champ de saisie, choisissez le modèle **Sonnet 5** et l'effort **Moyen** : le modèle le plus puissant irait beaucoup plus lentement et consommerait bien plus de votre quota, pour le même résultat.
2. **Envoyez le message de démarrage**, tel quel :

   > Bonjour ! Avant de construire quoi que ce soit, prends connaissance de ce dossier : lis CLAUDE.md et MASTER-PROMPT.md, et regarde les images du dossier assets. Fais-moi un état des lieux en trois lignes : le nom de l'application, les écrans prévus, la fonctionnalité principale. Ne crée et ne modifie aucun fichier, n'écris aucun code : attends que j'écrive /kickoff. Si tu ne trouves pas MASTER-PROMPT.md, dis-le-moi simplement.

   Claude vous répond en trois lignes. S'il ne trouve pas MASTER-PROMPT.md, c'est que le mauvais dossier est ouvert : recommencez le geste 1.
3. **Écrivez `/kickoff`**, choisissez la commande dans le menu qui s'ouvre, puis Entrée. Votre application se construit et s'ouvre dans votre navigateur.

Si `/kickoff` ne fait rien, envoyez plutôt cette phrase :

> Lance la construction : suis les instructions du fichier .claude/commands/kickoff.md.

## Ensuite, deux commandes

- `/retouche` suivi de votre demande, une seule à la fois. Exemple : `/retouche mets le bouton principal en vert`.
- `/ca-casse` suivi de ce qui ne va pas. Exemple : `/ca-casse le bouton Créer ne fait rien`.

Une commande ne réagit pas ? Écrivez la même demande en phrase normale, Claude comprend.

## Ce qu'il y a dans ce dossier

| Fichier | À quoi il sert |
|---|---|
| `MASTER-PROMPT.md` | Votre cahier des charges, déjà rempli. |
| `assets/` | Votre user flow et, si vous l'avez ajoutée, votre inspiration graphique. |
| `index.html` | Votre application. Pour la rouvrir plus tard, double cliquez dessus. |
| `CLAUDE.md` | Les règles que Claude suit pour construire. Vous n'y touchez pas. |
| `.claude/` | Les commandes `/kickoff`, `/retouche` et `/ca-casse`. |
| `ET-APRES.md` | À lire quand votre application tourne : ce qui sépare ce dossier d'un produit que des gens utilisent. |

Votre application vit sur votre ordinateur, dans ce dossier. Elle vous appartient.
