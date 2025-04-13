# Revue 1

Cette première revue à lieue le 13 avril 2025, après 3 cours sur le TP2.

La revue va se concentrer sur les parties suivantes: le *backend*, le *gameService*, l'*App* et les 3 *Views* principales et leurs *components*.

## Backend

Le *backend* a été créé à partir des fichiers obtenus avec l'énoncé: `db.default.json`, `requests.http` et `routes.json` (qui demeure aussi vide). Le fichier `copy-files-from-to.json` a été créé ainsi que les dépendances (notamment `json-server`) ont été installées.

Il n'y a pas vraiment d'éléments notables à observer ici, puisque cet ensemble est quasiment identique à la formule utilisée dans l'atelier 15.

## gameService.ts

`gameService.ts`, le service permettant à l'application de faire les requêtes vers le *backend*, est très similaire au `postsService.ts` de l'atelier 15. Il fait utilisation de la dépendance `axios`.

Le service me semble assez correct: ses fonctions sont plutôt exhaustives et sont fonctionnelles. Il est très inspiré du service de l'atelier 15.

## App.vue

Le fichier `App.vue` sert pour l'instant de point d'intersection pour les Vues à l'aide du `router`. Il fait utilisation d'une barre de navigation (une composante Bootstrap) incluant les `RouterLink` et fait directement appel au `RouterView`.

Ce fichier n'a pas beaucoup de contenu à évaluer, mais il serait peut-être préférable de prendre ce maigre contenu et de le transférer à une composante, plutôt que d'être directement dans le fichier `App.vue`.

## Les Vues

### HomeView.vue et HomePage.vue

`HomeView.vue` sert de page principale à l'application, alors que `HomePage.vue` est son composant principal. `HomeView.vue` elle-même n'a pas de code.

`HomePage.vue` permet à l'utilisateur d'entrer un nom et de choisir un vaisseau, parmis une liste obtenue du *backend*, pour ensuite commencer une partie. La page valide qu'un vaisseau est choisi et que le nom n'est pas juste composé d'espaces.

Pour le contenu, `HomePage.vue` pourrait définitivement avoir un message d'accueil plus robuste. La page va aussi définitivement avoir besoin d'un "loading wheel" à l'aide de `toast` pendant qu'elle obtient la liste de vaisseaux.

### ScoreView.vue et ScorePage.vue

`ScoreView.vue` sert de tableau de pointage à l'application, alors que `ScorePage.vue` est son composant principal. `ScoreView.vue` elle-même n'a pas de code.

`ScorePage.vue` obtient la liste des pointages du *backend*, puis les affiches par boucle dans son tableau. La page se charge de trier la liste pour qu'elle soit dans le bon ordre avant d'afficher le contenu.

Comme pour `HomePage.vue`, cette page a besoin d'un "loading wheel" à l'aide de `toast` pendant son chargement des pointages. Autre que ça, elle me semble robuste.

### GameView.vue et GameMain.vue

`GameView.vue` sert de page de jeu à l'application, alors que `GameMain.vue` est son composant principal. `GameView.vue` va simplement vérifier si elle reçoit les informations du joueur. Si oui, elle initialise `GameMain.vue`; si non, elle envoie un message d'erreur à l'utilisateur.

`GameMain.vue` va être la page la plus importante de l'application. Elle se charge de la boucle principale du jeu: introduction, suivie de missions et d'interludes (ou le joueur peut réparer son vaisseau, voir le prochain ennemi ainsi que sauter la prochaine mission). Elle obtient les informations du joueur par `HomeView.vue`, puis mets toutes ses informations utiles dans une interface `GameData` pour faciliter le partage entre ses sous-composantes (*GameFightScene* et *GameInterludeScene*).

D'abord, `GameView.vue`, à la place d'afficher une erreur, devrait dans un monde idéal renvoyer le joueur à la page d'accueil ou l'envoyer à une page 404 ou 403. Elle devrait aussi s'assurer d'envoyer un message de confirmation lorsque le joueur essaie de rafraichir la page ou d'aller à une autre page, puisque cela va causer la perte de sa partie en cours.

Ensuite, `GameMain.vue` ne contient pas assez de code pour l'instant pour mériter une revue en détail. Cela ira à la prochaine revue.
