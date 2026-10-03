# --- ETAPA 1: Dependencias y Pruebas ---
FROM node:24.21.0-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run test:ci

# --- ETAPA 2: Compilación según el entorno ---
FROM base AS builder
ARG ENV_CONFIG=production
RUN npm run build -- --configuration=${ENV_CONFIG}

# --- ETAPA 3: Servidor de Producción Ligero (Nginx optimizado para Render) ---
FROM nginx:1.25-alpine AS runner
COPY --from=builder /app/dist/e-commerce-ia-client/browser /usr/share/nginx/html

# Configuración profesional de Nginx para Render (Soporta SPA routing y proxies)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    \
    # Soporte para las rutas dinámicas de Angular \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Optimización para manejo de errores comunes en la nube \
    error_page 500 502 503 504 /5x.html; \
    location = /5x.html { \
        root /usr/share/nginx/html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
