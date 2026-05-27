# Issue Tracker - Sistema de Gestión de Incidencias

Este proyecto es una aplicación web (SPA) desarrollada para que el equipo de soporte técnico pueda gestionar reportes de errores (incidencias o bugs) de un software.

## Tecnologías Utilizadas

- **Framework:** React.js (inicializado con Vite)
- **Enrutamiento:** React-router-dom
- **Estado y Ciclo de vida:** Hooks de React (useState, useEffect)
- **Interacciones y Alertas:** SweetAlert2
- **Estilos:** Tailwind CSS
- **Iconos:** Lucide-react
- **Consumo de API:** Axios
- **Persistencia de sesión:** LocalStorage (Simulada)
- **Servidor de pruebas:** JSON Server (Mock API)

## Requisitos Previos

- Node.js (versión 18 o superior recomendada)
- npm o yarn

## Pasos para Instalar y Correr el Proyecto Localmente

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd prueba-tecnica4
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de base de datos (Mock API):**
   En una terminal separada, ejecuta:
   ```bash
   npm run server
   ```
   *Nota: El servidor correrá en http://localhost:3001*

4. **Ejecutar la aplicación en modo desarrollo:**
   En otra terminal, ejecuta:
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible en http://localhost:5173*

## Características Implementadas

- **Autenticación Mock:** Inicio de sesión con persistencia en LocalStorage y protección de rutas.
- **CRUD de Incidencias:** Listado, creación, edición y eliminación de reportes.
- **Feedback de Usuario:** Alertas de confirmación, éxito y error con SweetAlert2.
- **Diseño Responsivo:** Interfaz moderna y adaptable a dispositivos móviles y escritorio.
- **Arquitectura Limpia:** Estructura de carpetas organizada por componentes, páginas, servicios y contexto.

## Metodología de Desarrollo

Se utilizó la metodología **GitFlow**, trabajando con ramas de características (`feature/`) y manteniendo una rama `develop` para integración antes de pasar a `main`. Los commits siguen el estándar de **Conventional Commits**.

---
*Desarrollado para la Prueba Técnica de Desarrollador Frontend Junior.*
