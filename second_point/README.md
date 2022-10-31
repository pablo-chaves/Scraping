# Web scraping

En este repositorio encontrarás un script de extracción que recibe una url para obtener los diferentes productos de https://www.tiendasjumbo.co/.

En el folder llamado "data_results_example" encontrarás un archivo JSON con el resultado a esperar.

## Instalación

comandos para correr script que se encuentra en el folder “second_point”


```bash
cd second_point

npm i

// si deseas cambiar la url para extraer productos diferentes lo puedes hacer editando la línea 70 en el archivo index.js

npm start
```
al finalizar el proceso se creará un archivo JSON con el resultado obtenido

```bash
data_results > result.json
```
#
### tecnologías utilizadas:

- Lenguaje de programación: JavaScript.
- Librerias: puppeteer, fs.

#
### Notas finales

#### complejidad de extracción:
- Complejidad Temporal O(n)

#### Bloqueo o algunas incidencias:
- No hubo ningún bloqueo por parte de la página web.
- Me encontré con una incidencia en el momento de extraer la información de los productos ya que en el momento que esta cargando la pagina se detectan solo 8 productos, y en el momento de que la pagina esta al 100% se detectan 12 productos. se soluciono esperando el tiempo prudente cada vez que se llaman nuevos productos con el botón “MOSTRAR MÁS”.
