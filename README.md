# Proyecto adopciones

El proyecto simula una plataforma de adopciones por parte de usuarios a mascotas. 

Link de la imagen en Dockerhub: https://hub.docker.com/r/andresrsaravia/entrega-backend-iii-ars

Para ejecutar la imagen se deberá usar el comando docker `pull andresrsaravia/entrega-backend-iii-ars` y con ello construir el container.

El proyecto se tomó del repositorio Adoptme del curso de Coderhouse de Backend (https://github.com/stocaimaza/backend--70420/tree/main/Adopciones/RecursosBackend-Adoptme). Las adiciones personales constan de una documentación en Swagger sobre la estructura de los usuarios en `/apidocs` y una serie de test sobre la estructura de las adopciones en `adoptions.test.js`. Además, se cuentan con leves modificaciones en el manejo de códigos de estatus (200, 201, 404, etc.) en la carpeta de `controllers` necesarios para dichos tests.