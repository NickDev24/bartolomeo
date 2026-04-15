# Cafetería - Carta Digital

Una aplicación web completa para una cafetería con carta digital y pedidos por WhatsApp.

## Características

- 📱 Diseño responsive (mobile y desktop)
- 🛒 Carrito de compras funcional
- 📋 Menú completo con categorías
- 🏠 Opción de comer en local o pedir a domicilio
- 💬 Envío de pedidos por WhatsApp
- 🎨 Diseño moderno minimalista
- ⚡ Optimizado para Vercel

## Tecnologías

- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- Lucide React (iconos)

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en desarrollo:
```bash
npm run dev
```

3. Construir para producción:
```bash
npm run build
```

## Deploy en Vercel

1. Subir el código a GitHub
2. Importar el proyecto en Vercel
3. Deploy automático

## Estructura del proyecto

```
├── app/
│   ├── api/
│   │   └── send-order/    # Endpoint para WhatsApp
│   ├── components/        # Componentes React
│   │   ├── Cart.tsx
│   │   ├── MenuSection.tsx
│   │   └── OrderModal.tsx
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── data/
│   └── products.json      # Datos de productos
├── public/                # Archivos estáticos
└── package.json
```

## Personalización

### Cambiar colores
Editar `tailwind.config.ts` para modificar la paleta de colores.

### Modificar productos
Editar `data/products.json` para agregar, eliminar o modificar productos del menú.

### Cambiar número de WhatsApp
Editar `app/api/send-order/route.ts` y modificar la variable `phoneNumber`.

## Nota sobre WhatsApp

Esta aplicación utiliza el enlace `wa.me` para abrir WhatsApp con el mensaje pre-formateado. Esto funciona perfectamente en Vercel sin necesidad de un servidor backend persistente.

Si necesitas enviar mensajes automáticamente sin intervención del usuario, deberías implementar un servidor con `whatsapp-web.js` fuera de Vercel (por ejemplo, en un VPS o Railway con persistent storage).
# bartolomeo
