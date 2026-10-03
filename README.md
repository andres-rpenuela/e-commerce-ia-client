# ECommerceIaClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## 🌍 Gestión de Entornos con Archivos `.env`

Originalmente, Angular (`@angular/build:application`) gestiona las variables de entorno mediante archivos TypeScript tradicionales (`environment.ts`). En este proyecto se ha migrado el compilador a **`@ngx-env/builder`** por las siguientes razones:

### 🚀 ¿Por qué pasamos de Angular Nativo a `@ngx-env`?

1. **Soporte Estándar para `.env`:** Angular corre en el navegador y no tiene acceso nativo a Node.js (`process.env` o `dotenv`). `@ngx-env` actúa como un intermediario en tiempo de compilación para leer archivos `.env` reales de forma segura.
2. **Seguridad Avanzada (Git):** Evita subir credenciales o URLs críticas al repositorio. Ahora las configuraciones sensibles se guardan localmente en archivos `.env.development` o `.env.production` los cuales están protegidos en el `.gitignore`.
3. **Cambio de Perfiles Dinámico:** Permite alternar entre entornos (Desarrollo, Staging, Producción) simplemente cambiando el archivo de variables, sin necesidad de modificar ni duplicar código fuente en TypeScript.
4. **Prefijo Seguro (`NG_APP_`):** Por seguridad, el compilador solo inyecta en el cliente las variables que comiencen con `NG_APP_`, asegurando que no se filtren variables privadas del sistema operativo al navegador del usuario.

Importante, isntalar: 

```
npm install @ngx-env/builder --save-dev
```
### 🛠️ Uso en el Código
Para consumir una variable, se utiliza la sintaxis moderna de Vite/Esbuild inyectada por el builder:
```typescript
export const environment = {
  apiUrl: import.meta.env['NG_APP_API_URL']
};
```

En resumen:
No, no te hace falta instalar dotenv para nada.

De hecho, si lo instalas en tu proyecto de Angular, no va a funcionar. La librería dotenv clásica está programada exclusivamente para correr sobre Node.js (entorno de servidor). Si intentas importarla o ejecutarla en Angular, el navegador te arrojará un error en la consola diciendo que no reconoce módulos nativos del sistema como fs (file system) o path [🌐].

¿Quién hace el trabajo de dotenv entonces?

@ngx-env/builder hace exactamente el mismo trabajo que dotenv, pero adaptado para el mundo de Angular:

1. Busca y lee tus archivos .env.development o .env.production en tu computadora (en tiempo de compilación).
2. Extrae las variables que empiezan con NG_APP_.
3. Las inyecta directamente en tu código de Angular justo antes de enviarlo al navegador.

Así que puedes ahorrarte ese paquete. Con @ngx-env/builder configurado en tu angular.json ya tienes todo lo necesario para manejar tus perfiles de forma limpia y profesional.


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
| `npm run test:ci` | **Tests en Docker/CI** | Ejecuta pruebas unitarias sin interfaz en memoria | N/A |

> ⚠️ **ADVERTENCIA:** El comando `npm run pro` se conecta a la base de datos real en vivo. Úsalo con extrema precaución para no alterar datos de clientes reales.

---

### 🐋 Pruebas Unitarias en Entornos Automatizados (Docker / CI)

Para ejecutar las pruebas en contenedores Docker o flujos de integración continua (CI) donde **no hay una interfaz gráfica** ni un navegador físico instalado, se debe utilizar obligatoriamente el siguiente comando:

```bash
npm run test:ci
```

**¿Por qué usar este comando?**
* **Modo Non-Watch (`--no-watch`):** Obliga a Vitest a ejecutar las pruebas exactamente una vez y cerrar el proceso de Node inmediatamente al terminar (`exit 0` si pasan, `exit 1` si fallan), evitando que el contenedor Docker se quede colgado esperando cambios.
* **Virtualización en Memoria:** Utiliza el entorno simulado de Vitest/JSDOM por consola, permitiendo testear la aplicación de forma rápida y ligera sin consumir recursos gráficos de pantalla.
