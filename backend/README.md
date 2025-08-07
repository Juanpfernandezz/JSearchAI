# Backend de JSearch AI

Este backend está desarrollado con **NestJS** y se encarga de la lógica principal del proyecto, incluyendo la gestión de archivos PDF y la búsqueda semántica.

## Tecnologías utilizadas

- NestJS (Node.js framework)
- MongoDB (base de datos NoSQL)
- @xenova/transformers (procesamiento de lenguaje natural e IA local)
- Multer (para manejo de subida de archivos)
- TypeScript

## Funcionalidades principales

- Subida y almacenamiento de archivos PDF.
- Extracción y procesamiento del texto de los PDFs.
- Generación de embeddings para búsquedas semánticas.
- Almacenamiento de datos y vectores en MongoDB.
- API REST para búsqueda por similitud y gestión de documentos.
