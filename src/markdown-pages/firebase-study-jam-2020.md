---
title: "Firebase Study Jam"
date: "2020-05-08"
timestamp: "2020-05-08T09:00:00"
description: "Course content of Firebase study Jam by GDG"
tags: ["Firebase", "Google", "Tutorial"]
---

### Videos from GDG Pura Vida

#### Clase #1 Intro Firebase

Introducción a los productos de Firebase y creación de Primer Lab (Meetup).
Se crea base de datos NoSQL utilizando el <a href="https://console.firebase.google.com/" target="_blank">sitio web de Firebase</a>, se integra login con google utilizando usuario y password, se hace lógica para hacer RSVP y se crea un chat en tiempo real.

<iframe width="260" height="215" src="https://www.youtube.com/embed/5yGmd-ecLco" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<a href="https://github.com/nasarcacd/firebase-gtk-web-start-nasarca" target="_blank">Branch de github del lab completado</a>

<a href="https://fir-web-codelab-6d839.web.app" target="_blank">Demo</a>

#### Clase #2 Continuación Lab Meetup

Se continúa la creación de las funcionalidades del meetup y se crean las reglas de la base de datos con Firestore Rules

<iframe width="260" height="215" src="https://www.youtube.com/embed/Emf_F61icA8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Clase #3 NoSQL

Se explica a más detalle los conceptos de base de datos NoSQL

<iframe width="260" height="215" src="https://www.youtube.com/embed/qIkQ-5TmVk0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Clase #4 Lab friendlyeats-web

<iframe width="260" height="215" src="https://www.youtube.com/embed/m--P3S2ZKA0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

```
Crear proyecto en Firebase Console
FriendlyEats
cd friendlyeats-web
npm -g install firebase-tools
firebase --version
firebase login
firebase use --add
firebase serve --only hosting
```

```
firebase deploy
```

<a href="https://github.com/nasarcacd/friendlyeats-web" target="_blank">Branch de github del lab completado</a>

<a href="https://friendlyeats-nasarca.web.app" target="_blank">Demo</a>

#### Clase #5 Conceptos de Querys en Firestore, Rules y creación de Indexes

<iframe width="260" height="215" src="https://www.youtube.com/embed/d6k09brtBVc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Para solo hacer deploy de las reglas de Firestore

```
firebase deploy --only firestore:rules
```
