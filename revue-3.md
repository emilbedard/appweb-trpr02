# Revue 3

Cette troisième revue à lieue le 27 avril 2025, à la suite de la complétion de ce TP. Cette revue va couvrir tout le contenu ajouté depuis la dernière revue.

La revue va se concentrer sur les parties suivantes: La logique de jeu, les notifications, les temps de chargement et les tests.

## Logique de jeu

La logique de jeu a été complétée, surtout à l'intérieure du composant `GameFightScene.vue`. Ces nouveaux morceaux de la logique se concentre dans les fichiers `GameFightScene.vue`, `Experience.vue`, `HealthBar.vue` et `battleLogic.ts`.

### GameFightScene.vue

Ce composant, déjà entammé dans la revue précédente, est maintenant complet avec l'addition de la logique d'attaque. Lorsqu'un joueur clique sur l'un des boutons de son sous-composant `PlayerShip.vue`, il va utiliser les fonctions d'attaque du script `battleLogic.ts` pour déterminer les dégats et les mettre en action. Si l'ennemi meurs, le joueur ne sera pas attaqué pendant cet échange.

Ce composant est plutôt simple mais solide, puisqu'il est divisé en plusieurs sous-composants et scripts qui ont chacun leur rôle à jouer.

### Experience.vue et HealthBar.vue

Comme `HealthBar.vue`, `Experience.vue` est un composant d'affichage simple qui permet de réutiliser le code d'affichage de l'expérience. Il reçoit un nombre représentant l'expérience, puis change son texte et sa couleur d'après ce nombre.

Le composant `HealthBar.vue` a aussi été bonifié, avec l'addition de différentes couleurs pour la barre dépendamment du nombre de points de vie restants.

Les deux composants sont très simple avec une logique minimale, donc il n'y a pas vraiment de quoi à améliorer.

### battleLogic.ts

Ce script éxiste pour créer une séparation entre le composant `GameFightScene.vue` et les règles d'attaque et d'aléatoire, ce qui permet un meilleur contrôle de cette logique.

Ce script contient deux méthodes, `playerAttack()` et `enemyAttack()`:

* `playerAttack()` prend deux valeurs, la puissance et la précision. Elle calcule d'abord si l'attaque touche grâce à l'aléatoire, puis, si c'est un succès, détermine les dégats. Les dégats ont une valeur aléatoire d'ajoutée à leur puissance de base.
* `enemyAttack()` prend une seule valeur, l'expérience de l'ennemi, et agit comme une sorte d'IA très simple. D'après la valeur d'expérience, elle va utiliser différents taux d'attaques pour simuler le niveau de danger: plus l'expérience est élevée, plus les attaques vont toucher et plus elles vont frapper fort.

Bien que ce script soit plutôt solide, il est probablement possible d'améliorer la manière dont `enemyAttack()` parcours ses différents taux d'attaques.

## Les notifications

Pendant le jeu, cette application fait usage de deux types de notification: les messages `toast` et les notifications de confirmation lorsque le joueur essaie de quitter.

### Messages Toasts

Le composant `GameMain.vue` fait usage des notifications `toast` dans trois cas:

* Pour afficher au joueur qu'il a gagné un combat, en bas de la page;
* Pour l'informer qu'il a gagné la partie après 5 missions, en haut de la page;
* Pour afficher au joueur qu'il a perdue la partie après avoir perdu tous ses points de vie, en haut de la page.

Tous les messages `toast` sont composés très simplement, avec seulement un message, une durée de vie et une position à l'écran.

### Messages de confirmation

Malheureusement, cette section m'a causé un certain degré de difficulté. Bien que j'aurais préféré utiliser `toast` pour ces messages, je n'ai pas trouvé de moyen de leur donner des options, ni d'agir sur ces options.

D'abord, à l'aide du `window.onbeforeunload`, si l'utilisateur essaie de raffraichir la page lorsqu'il est sur la page de jeu, il va recevoir un message de confirmation de base.

Ensuite, si le joueur essaie de changer de page par la barre de navigation lorsqu'il est sur la page de jeu, une fonction va faire afficher un `confirm` avec un message personnalisé pour assurer une confirmation.

Par contre, si le joueur quitte la page de jeu d'une autre façon, je n'ai pas trouvé de moyen d'afficher un message de confirmation. Ceci est définitivement un point à améliorer.

## Temps de chargement

Les composants `HomePage.vue`, `ScorePage.vue` et `GameInterlude.vue` font tous usage du composant `Loading` lorsqu'ils envoient une requête vers le *backend*.

Le code de ces sections est très similaire au code donné lors des ateliers, avec l'utilisation d'une valeur booléenne `ref` qui s'active et désactive autour des fonctions `async` liées au requêtes du `gameService.ts`.

## Tests

Ceci est probablement la section où j'ai eu le plus de difficulté, pour une raison très spécifiques

Je n'ai pas été capable de trouver comment faire un `Mock` de mes scripts `gameService.ts` et `battleLogic.ts`. Malgré avoir plannifié en avance de pouvoir remplacer les requêtes et l'aléatoire par des valeurs brutes, le fait que, malgré beaucoup de recherches en ligne et parmi les notes de cours, je n'ai pas trouvé de moyen de "mocker" ces scripts a fait que je n'ai pas pu tester les fonctions liées à ceux-ci.

Sinon, j'ai testé tous les états initiaux de mes composants ainsi que toutes les fonctions qui ne sont pas liées et qui n'avaient pas besoin des requêtes pour pouvoir fonctionner. Je n'ai aussi pas trouvé comment accéder aux valeurs internes d'un composant (comme les `ref`), ce qui aurait pu me permettre de passer par-dessus certaines requêtes.

Chaque composant possède deux tests dû à ces complications, à l'exception de trois:

* `EnemyShip.vue` (1), puisqu'il ne fait qu'afficher de l'information, sans aucune logique;
* `ScorePage.vue` (1), puisque je suis incapable de tester la logique d'affichage de la liste dû à la requête *backend*;
* `GameInterlude.vue` (5), puisque la majorité de ses fonctions n'ont pas besoin de requêtes pour bien fonctionner.
