# Manual Method

Método manual

Si por alguna razón no se puede usar la herramienta USB Flash Creator o no se detecta su dispositivo USB flash, es posible formatear y preparar manualmente un dispositivo USB flash de arranque. dispositivo. Nota: este método solo funciona para dispositivos de 32 GB y más pequeños.

1. Conecte el dispositivo flash USB a su Mac o PC.
2. Formatee el USB usando el sistema de archivos FAT (o FAT32). No debe ser ex-FAT. Si su USB tiene más de 32 GB, entonces necesita usar una herramienta de terceros (por ejemplo, Rufus) para formatearlo en FAT32, ya que Windows no ofrece esta opción en unidades de más de 32 GB.
3. Establezca la "etiqueta de volumen" (Volume Label) en UNRAID (distingue entre mayúsculas y minúsculas, use todo en mayúsculas).
4. Vaya a [la página de descargas](https://unraid.net/es/descargar) para obtener el archivo zip de la versión que desea usar.
5. Elija una versión y descárguela en una ubicación temporal en su computadora/ordenador (por ejemplo, una carpeta de "descargas").
6. Extraer el contenido del archivo ZIP se acaba de descargar en su dispositivo flash USB.
7. Busque el dispositivo flash USB para ver el contenido recién extraído de su Mac o PC.
8. Ejecute el script de arranque apropiado para el sistema operativo que está utilizando.

**Windows 7 o posterior**

- haga clic derecho en el archivo make_bootable y seleccione: Ejecutar como administrador
- **Mac**
    - haga doble clic en el archivo make_bootable_mac e ingrese su contraseña de administrador cuando se le solicite.
- **Linux**:
    - copie el archivo make_bootable_linux en el disco duro
    - desmontar (no expulsar) la unidad USB
    - ejecute el siguiente comando desde donde lo desempaquetó en su sistema Linux:

sudo bash ./make_bootable_linux

- NOTA: Durante el proceso de ejecución de este script, el dispositivo flash puede parecer a desaparecer y reaparecer en su estación de trabajo un par de veces - este comportamiento se espera.