# JSearch-AI

**Plataforma para buscar y entender PDFs usando inteligencia artificial**

---

# Descripción

J-Search AI es un backend desarrollado con NestJS que permite:

- Subida y gestión de archivos PDF
- Extracción de texto de los PDFs
- Generación de embeddings semánticos usando modelos locales de IA (`@xenova/transformers`)
- Búsqueda semántica eficiente sobre el contenido de los PDFs almacenados
- Preparado para futuras integraciones con frontend React y autenticación de usuarios

---

# Tecnologías

- NestJS
- MongoDB Atlas
- @xenova/transformers
- TypeScript
- Node.js

---

# Estado del proyecto

Proyecto en desarrollo. Funcionalidades actuales:

- Upload y almacenamiento de PDFs
- Extracción y almacenamiento del texto
- Generación y almacenamiento de embeddings
- Búsqueda semántica por similitud

---

# Próximos pasos

- Implementar autenticación y perfiles de usuario
- Desarrollo del frontend en React/Next.js
- Chat interactivo para consultar PDFs usando IA
- Mejoras en escalabilidad y performance

---

## Estructura 

```
src/
 ├─ embedding/
 │   ├─ embedding.module.ts       # Define el módulo Embedding, agrupa servicios relacionados con vectores semánticos
 │   └─ embedding.service.ts      # Lógica para generar embeddings y buscar similitud
 │
 ├─ pdf/
 │   ├─ pdf.controller.ts         # Controlador que maneja las rutas HTTP relacionadas con PDFs (subir, listar, buscar)
 │   ├─ pdf.module.ts             # Módulo PDF que agrupa todo lo relacionado con la gestión de PDFs
 │   ├─ pdf.schema.ts             # Esquema de MongoDB para almacenar metadata de los PDFs (nombre, path, fecha, texto)
 │   └─ pdf.service.ts            # Lógica de negocio para manipular PDFs, extraer texto, guardar en DB
 │
 ├─ app.controller.ts             # Controlador principal (quizás una ruta base o health check)
 ├─ app.module.ts                 # Módulo raíz que importa PdfModule, EmbeddingModule y otros
 ├─ app.service.ts                # Servicio principal con lógica general o de apoyo
 └─ main.ts                      # Punto de entrada de la app (configura NestJS, inicia servidor)
```
