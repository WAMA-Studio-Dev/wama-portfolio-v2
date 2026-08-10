---
name: wama-excellence
description: Reglas de oro para desarrollo frontend premium anti-IA, animaciones por GPU a 60 FPS, CSS defensivo y rendimiento extremo para WAMA Studio.
---

# WAMA Studio — Guardrailes de Excelencia Frontend

## 1. Reglas Anti-IA (Diseño y Copywriting)
- **CERO Clichés Visuales:** Prohibido usar tarjetas genéricas con sombras de neón brillantes, bordes redondeados exagerados o layouts de plantilla aburridos.
- **Copy Editorial Premium:** Prohibido usar palabros trillados de IA ("transforma", "revolucionario", "desbloquea", "soluciones holísticas"). Los textos deben sonar a agencia boutique de Silicon Valley (estilo Vercel / Apple).

## 2. CSS Defensivo y Red de Seguridad (Safety Nets)
- **Texto Siempre Visible (Anti-Blank):** Si usas Framer Motion con `opacity: 0` o desenfoque inicial, incluye reglas CSS defensivas para que el contenido NUNCA quede invisible si el script se retrasa o falla.
- **Timeout de Seguridad:** Todas las animaciones de scroll deben incluir un tiempo límite de seguridad (máximo 5 segundos) que fuere la visibilidad de los elementos si el observador de scroll no se activa.
- **Windows Reduced Motion:** No bloquees animaciones sutiles por `prefers-reduced-motion`. Mantén el layout plenamente funcional y visible en cualquier SO.

## 3. Rendimiento y Física a 60 FPS por GPU
- Anima únicamente propiedades aceleradas por hardware/GPU (`transform`, `opacity`, `filter`).
- Usa físicas de muelle (`spring physics`) con Framer Motion en lugar de transiciones lineales rígidas.
- **CERO Layout Shift (CLS):** Todas las imágenes y componentes interactivos deben declarar dimensiones explícitas o contenedores con aspect-ratio predefinido.

## 4. Estándar de Arquitectura Next.js
- Estructura modular en componentes limpios dentro de `components/` (Hero, TechStack, Projects, About, Contact).
- Tipado estricto en TypeScript sin utilizar `any`.
- Puntero magnético personalizado desactivado automáticamente en dispositivos móviles/táctiles.