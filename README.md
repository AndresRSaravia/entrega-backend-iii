# Proyecto adopciones

El proyecto simula una plataforma de adopciones por parte de usuarios a mascotas. 

Link de la imagen en Dockerhub: https://hub.docker.com/r/andresrsaravia/entrega-backend-iii-ars

Para ejecutar la imagen se deberá usar el comando docker `pull andresrsaravia/entrega-backend-iii-ars` y construir el container con `docker build -t test .` y `docker run -p 8081:8080 test`

El proyecto se tomó del repositorio Adoptme del curso de Coderhouse de Backend (https://github.com/stocaimaza/backend--70420/tree/main/Adopciones/RecursosBackend-Adoptme). Las adiciones personales constan de una documentación en Swagger sobre la estructura de los usuarios en `/apidocs` y una serie de tests sobre la estructura de las adopciones en `adoptions.test.js`. Además, se cuentan leves modificaciones en el manejo de códigos de estatus (200, 201, 404, etc.) en la carpeta de `controllers` necesarios para los resultados de dichos tests.