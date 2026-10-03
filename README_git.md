# e-commerce-ia-client
Client E-Commerce desarrollado en Angular


# Caracteristica

Version de node: 24.21.0
Version de angular: 

## Nota

La solución definitiva: Crea tu proyecto Angular 22 desde cero
Como tu carpeta e-commerce-ia-client ya es la carpeta de tu repositorio, introduce este comando exacto para crear el proyecto directamente ahí con Angular 22:
powershell
npx @angular/cli@latest new e-commerce-ia-client --directory .

Usa el código con precaución.
¿Qué hace este comando?

1. npx @angular/cli@latest: Ignora tu versión antigua de Angular y descarga la versión 22 más nueva para este comando.
2. new . --directory .: Le dice a Angular que cree la nueva aplicación dentro de la carpeta actual en la que estás parado, sin crear subcarpetas molestas.

---

## ⚙️ Scripts de Ejecución y Entornos

El proyecto gestiona de forma automatizada los perfiles de configuración. Por defecto, los comandos nativos de Angular están mapeados de la siguiente manera:

* **`npm start`** ➡️ Ejecuta el entorno de **Pre-producción** (`preproduction`) de forma local.
* **`npm run build`** ➡️ Compila el proyecto optimizado para **Producción** (`production`).

### 👤 Perfiles Disponibles en el Proyecto

1. **Perfil Local / Development (`development`)**
   * **Propósito:** Desarrollo diario en tu computadora local. Las optimizaciones están apagadas para compilar al instante y permitir depuración de errores (`sourceMaps`).
   * **Archivos:** Mapea `.env.development` y reemplaza el entorno con `environment.development.ts`.

2. **Perfil Pre-producción (`preproduction`)**
   * **Propósito:** Entorno de pruebas (Staging). Funciona con la velocidad y herramientas de desarrollo, pero apunta a los servidores y APIs de prueba en la nube.
   * **Archivos:** Mapea `.env.preproduction` y reemplaza el entorno con `environment.preproduction.ts`.

3. **Perfil Producción (`production`)**
   * **Propósito:** El entorno real para los clientes finales. El código se optimiza, minifica y empaqueta al máximo para garantizar la mayor velocidad y seguridad en internet.
   * **Archivos:** Mapea `.env.production` y utiliza el archivo base `environment.ts`.

---

### 🛠️ Lista de Comandos Disponibles

| Comando | Entorno | Propósito | Archivo `.env` |
| :--- | :--- | :--- | :--- |
| `npm run dev` | **Local / Dev** | Desarrollo en máquina local | `.env.development` |
| `npm run pre` / `npm start` | **Pre-producción** | Pruebas conectadas al servidor staging | `.env.preproduction` |
| `npm run pro` | **Producción Local** | Levanta entorno real localmente ⚠️ | `.env.production` |
| `npm run build:pre` | **Build Pre** | Compila paquete para el servidor de pruebas | `.env.preproduction` |
| `npm run build:prod` / `npm run build` | **Build Prod** | Compila paquete optimizado para clientes reales | `.env.production` |

> ⚠️ **ADVERTENCIA:** El comando `npm run pro` se conecta a la base de datos real en vivo. Úsalo con extrema precaución para no alterar datos de clientes reales.
