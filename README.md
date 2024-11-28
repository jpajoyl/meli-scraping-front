# Instrucciones para Ejecutar el Frontend

## Requisitos Previos

- **Node.js 20.x** instalado.
- **npm** (viene incluido con Node.js).
- **Git** instalado para clonar el repositorio.

## Pasos para Configurar y Ejecutar el Frontend (React con TypeScript)

### 1. Clonar el Repositorio

Clonar el repositorio

```bash
git clone https://github.com/jpajoyl/meli-scraping-front.git
```

### 2. Navegar al Directorio del Frontend

```bash
cd meli-scraping-front
```

### 3. Instalar las Dependencias

```bash
npm install
```

### 4. Ejecutar el Servidor de Desarrollo

Inicia el servidor de desarrollo:

```bash
npm start
```

Por defecto, la aplicación estará disponible en `http://localhost:3000/`.

### 6. Generar una Versión para Producción (Opcional)

Si necesitas generar una versión optimizada para producción:

```bash
npm run build
```

Esto generará una carpeta `build` con los archivos estáticos que puedes servir en un servidor web.

## Solución de Problemas Comunes

- **Errores de Conexión con el Backend**
  
  Asegúrate de que la URL de la API (`API_URL`) esté configurada correctamente en el archivo `src\config\AppConfig.ts`.
