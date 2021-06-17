# Présentation du projet:


La pollution générée par l’industrie du net et son impact sur le climat sont équivalents à ceux du secteur de l’aviation.

L'empreinte écologique du numérique est loin d'être négligeable même si elle paraît anodine comparée à d'autres secteurs et qu'il est difficile de croire que l'on puisse "polluer" en surfant sur Internet et pourtant c'est ce qui se passe !

Nous avons décidé de traiter cette problématique en se focalisant sur l'impact des réseaux sociaux sur l'environnement et de là, notre choix s'est porté sur le réseau social Twitter.

A fin de garantir la meilleure expérience utilisateur (qu'elle soit **interactive, immersive** mais aussi **impactante),** nous avons conçu et développé une datavisualisation adaptée à notre thématique. 

Quel est donc l'impact environnemental de votre activité sur Twitter ? 

On vous donne rendez-vous sur notre site [Carbon](https://carbonproject.netlify.app/) pour découvrir la réponse !

# Organisation du projet: 

En ce qui concerne l'organisation, nous avons opté d'utiliser l'application [Notion](https://www.notion.so/carbonproject/Compte-rendu-data-Ecologique-60d2de0b9e514b54a05626d54f7154ba), nous avons mis en place plusieurs workspaces (calendrier, data ...), et delà une mise à jour quotidienne été établie, ce qui nous permettait de suivre l'avancement de notre projet.

# Technologies:

__Front-End__: Pug, SCSS, JS, D3.JS

Pour la représentation et la structure nous avons choisi : [Pug](https://pugjs.org/api/getting-started.html) /[SCSS](https://sass-lang.com/documentation).

En ce qui concerne la récupération des données du back-end, nous avons mis en place une requête fetch qui nous permet de récupérer  les données sous format JSON et de les représenter sous forme de dataviz à l'aide de [D3.JS](https://d3js.org/)

Pug est un outil de template qui permet de générer du code HTML en compilant via Webpack.

L’avantage de PUG est la simplification du code HTML. L’utilisation de balises n’est plus nécessaire, grâce au système d’indentations. Les classes et les id sont définis par des raccourcis, respectivement “.” et “#”. 

En plus de sa simplification, le code obtenu est plus clair et plus agréable à lire. Le language Pug est peu éloigné du Javascript, ce qui permet l’injection de code Javascript dans les fichiers Pug.

L’avantage de Pug réside également dans les nombreuses fonctionnalités qu’il offre comme par exemple la possibilité de définir des variables. On peut en outre écrire du JS directement depuis le fichier .pug, qui sera converti en page HTML.

L’écriture avec sass est mieux organisée, plus lisible, moins répétitive. Ce qui booste les performances du site et rend le travail sur le fichier plus agréable notamment avec le responsive.

## PWA 
Notre application est aussi un PWA application cross plateform que vous pouvez installez comme une application desktop/mobile, on bien fais attention au performance le responsive ainsi que la sécurité c'est pour ça on a créer un backend personalisé pour stoquer les codes d'accées au API de Twitter à la place de les stocker en client.
