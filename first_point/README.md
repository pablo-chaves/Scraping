# Web scraping

En este repositorio encontrarás un script de extracción para un menú de despensa.

En el folder llamado "data_results_example" encontrarás un archivo JSON con el resultado a esperar.

## Instalación

comandos para correr script que se encuentra en el folder “first_point”


```bash
cd first_point

npm i

npm start
```
al finalizar el proceso se creará un archivo JSON con el resultado obtenido

```bash
data_results > despensa.json
```
#
### tecnologías utilizadas:

- Lenguaje de programación: JavaScript.
- Librerias: puppeteer, fs.

#
### Notas finales

#### complejidad de extracción:
- Complejidad Temporal O(n)

#### Bloqueo:
- al iniciar me encontré con este error
```bash
Access Denied

You don't have permission to access "http://www.soriana.com/" on this server.
Reference #18.7fa136b5.1667190006.bd5d28b
```
se soluciono con la siguiente línea de código
```bash
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')

```