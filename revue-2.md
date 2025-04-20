# Revue 2

Cette deuxième revue à lieue le 20 avril 2025, après 4 cours sur le TP2. Le contenu ajouté se concentre sur la logique du jeu de l'application. Cette revue contient moins de contenu que la première, puisqu'on a manqué un cours et que je n'ai pas eu le temps d'y travailler hors de cours cette semaine.

La revue va se concentrer sur les parties suivantes : La logique générale, la logique d'interlude et la logique de combat.

## Logique générale

La logique générale se compose principalement de la vue `GameMain.vue`, l'interface `GameData` et des composants `HealthBar.vue`.

### GameMain.vue et GameData

`GameMain.vue` est en charge de faire la communication entre les composantes `GameFightScene.vue` et `GameInterlude.vue` et de les afficher au bon moment. Elle passe l'interface `GameData` entre les deux composants, ce qui permet de partager en une composante les données du joueur, de la mission courante et de l'ennemi courant. Puisque l'interface `GameData` est de plus partagée en référence (car elle est un objet et non un type solide), ce qui permet de modifier les valeurs sans les passer par `emit` à `GameMain.vue`.

Le `GameMain.vue` n'est cependant pas complet. Les méthodes permettant à un combat d'être gagné et que la partie se termine ne sont pas encore écrites, et cette vue à aussi besoin d'un message de confirmation lorsque le joueur essaie de sortir de la page où de la rafraichir.

### HealthBar.vue

Le composant `HealthBar.vue` est un composant d'affichage simple: à l'aide d'un paramètre `number`, il affiche les points de vie d'un vaisseau grâce à un composant Bootstrap. Il est utilisé dans l'affichage des composants `GameInterlude.vue` et `GameFightScene.vue`.

Ce composant est très simple pour l'instant, mais cela pourrait être intéressant de lui faire changer sa couleur dépendamment des points de vie (Exemple: vert > 50 points, 50pts > jaune 25pts, rouge < 25pts).

## Logique d'interlude

La logique d'interlude se concentre dans le composant `GameInterlude.vue`.

### GameInterlude.vue

Le composant `GameInterlude.vue` est un centre majeur de la logique de jeu de l'application, contrôlant toute la logique à l'extérieur de combat non-régie par `GameMain.vue`. Elle prend en charge notamment:

* **La logique de soin**: Dépendamment de la mission courante, elle calcule un coût de soin, puis permet au joueur de dépenser des crédits pour se soigner tant qu'il en a assez.
* **Le chargement du prochain ennemi**: Lorsque cette page est chargée, elle fait une requête au *backend* pour obtenir un nouvel ennemi aléatoire. Les options d'affrontement et de capitulation sont bloquées lorsqu'un ennemi est en chargement.

* **Débuter un affrontement**: Lorsqu'un ennemi est chargé, ce composant permet de passer au combat avec celui-ci à l'aide d'un `emit` au `GameMain.vue`, qui va ensuite mener le joueur au `GameFightScene.vue`.
* **Capituler à l'ennemi**: Lorsqu'un ennemi est chargé, le joueur peut capituler, évitant le combat et passant à la prochaine mission. Un nouvel ennemi est chargé par le composant.

Comme il est possible de le constater, ce composant est plutôt lourd, et il pourrait être divisé en plus petits composants. Ce composant à aussi besoin d'utiliser `toast` pour pouvoir afficher un icône de chargement lorsqu'un ennemi est en cours de chargement.

## Logique de combat

La logique de combat se situt surtout dans le composant `GameFightScene.vue`, bien qu'une bonne partie de l'affichage se situe dans les composants `PlayerShip.vue` et `EnemyShip.vue`.

### GameFightScene.vue

Le composant `GameFightScene.vue` est pour l'instant incomplet, ces seules fonctionnalités étant d'envoyer les données du joueur et de l'ennemi aux composants `PlayerShip.vue` et `EnemyShip.vue`, respectivement. Par contre, j'ai une idée plutôt claire des fonctionnalités qu'elle va avoir une fois complétée:

* **La logique d'attaque et de tours**: Ce composant va être en charge de recevoir l'attaque choisie par le joueur, de vérifier si elle touche, vérifier si l'attaque de l'ennemi touche, puis d'ajuster les points de vies des acteurs accordément.
* **La logique de fin de combat**: Lorsqu'un des deux acteurs n'a plus de points de vies, le composant est en charge de soit progresser à la prochaine mission ou de mettre fin à la partie.

Pour l'instant, ce composant est plutôt solide. Celui-ci n'aura pas besoin d'utiliser `toast`, puisqu'elle ne fait pas appelle au *backend*.

### PlayerShip.vue et EnemyShip.vue

Ces deux composants d'affichage sont plutôt simples: Elles affiches les données du joueur et de l'ennemi respectivement. Elles font toutes deux appel au composant `HealthBar.vue` pour afficher leurs points de vie.

Ces deux composants sont encore incomplet, affichant certaines de leurs données de manière brut (l'expérience en nombre plutôt qu'en texte, aucun icône pour les crédits, etc.). Le composant `PlayerShip.vue` aura aussi besoin de permettre au joueur de sélectionner l'attaque de son choix pour pouvoir progresser le combat.
