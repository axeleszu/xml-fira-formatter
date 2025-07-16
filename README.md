# XML HTML Formatter

## Descripción

**XML HTML Formatter** es una extensión para Visual Studio Code diseñada para formatear documentos XML de una manera específica. Su principal característica es la capacidad de identificar y formatear código HTML que se encuentra encapsulado dentro de secciones `<![CDATA[...]]>`.

El proceso de formateo se realiza en dos pasos principales:
1.  **Formateo de HTML dentro de CDATA**: La extensión busca todas las secciones `CDATA` en el documento, extrae su contenido y, si contiene código HTML, lo formatea de manera independiente.
2.  **Formateo del documento XML completo**: Una vez que el contenido HTML ha sido formateado, la extensión procede a formatear todo el documento XML, asegurando que la estructura general sea coherente y legible.

Esta herramienta es especialmente útil para trabajar con archivos XML que incrustan fragmentos de HTML, como es común en las plantillas o configuraciones de FIRA.

## Características

*   **Comando de Formateo**: Activa el formateo a través de un simple comando desde la paleta de comandos de VS Code.
*   **Formateo de HTML en CDATA**: Detecta y formatea automáticamente el código HTML dentro de las secciones `CDATA`.
*   **Formateo de XML**: Utiliza `prettier` y el plugin `@prettier/plugin-xml` para un formateo de XML robusto y consistente.
*   **Notificaciones**: Muestra mensajes informativos sobre el éxito o los errores durante el proceso de formateo.

## Uso

1.  Abre un archivo con formato `.xml` en Visual Studio Code.
2.  Abre la paleta de comandos (`Ctrl+Shift+P` o `Cmd+Shift+P` en Mac).
3.  Escribe y selecciona el comando **"Formatear Documento XML FIRA"** (o el nombre que le hayas dado en tu `package.json`, por ejemplo `xml-fira-formatter.format`).
4.  La extensión procesará el archivo y aplicará el formato.

## Dependencias

Esta extensión se basa en las siguientes librerías:

*   [**Prettier**](https://prettier.io/): Un formateador de código opinado.
*   [**@prettier/plugin-xml**](https://github.com/prettier/plugin-xml): El plugin oficial de Prettier para formatear archivos XML.

Asegúrate de tener estas dependencias instaladas en tu proyecto si deseas contribuir o modificar el código fuente:
```bash
npm install prettier @prettier/plugin-xml
```


## Contribuciones
Las contribuciones son bienvenidas. Si encuentras algún error o tienes una idea para una nueva funcionalidad, no dudes en abrir un issue o enviar un pull request en el repositorio del proyecto.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.