# Tracking y Analytics - Aurigital

## IDs Actuales

- **Google Analytics 4:** `G-F79B9ETYTV`
- **Google Ads:** `AW-17131483110`
- **Meta Pixel:** `1416522006230127`

## ⚠️ CONFIGURACIÓN REQUERIDA

### 1. Configurar Conversión en Google Ads

1. Ir a Google Ads > Herramientas > Conversiones
2. Crear nueva conversión tipo "Visita al sitio web"
3. Categoría: "Envío de formulario de generación de contactos"
4. Nombre: "WhatsApp Contact - Landing Pages"
5. Valor: Usar valor de transacción
6. Copiar el **CONVERSION_LABEL** generado
7. Reemplazar en `app/lib/analytics.js` línea 12:

```javascript
send_to: 'AW-17131483110/CONVERSION_LABEL'
```

Por:

```javascript
send_to: 'AW-17131483110/TU_CONVERSION_LABEL_AQUI'
```

### 2. Crear Imágenes Open Graph

Crear y subir a `/public/assets/`:

- `og-diseno-web.jpg` (1200x630px)
- `og-desarrollo-web.jpg` (1200x630px)

**Recomendaciones de diseño:**
- Incluir logo de Aurigital
- Texto legible: "Diseño Web Costa Rica" / "Desarrollo Web Costa Rica"
- Background con brand colors (#B2FF00 + #101010)
- Alta calidad, optimizado para web

## Eventos Tracked

### Conversiones

- **`whatsapp_click`** - Cuando envía formulario a WhatsApp
  - Parámetros: `package_selected`, `value`, `transaction_id`
  - Se envía también como conversión a Google Ads

### Engagement

- **`package_selected`** - Cuando selecciona un paquete en pricing cards
  - Parámetros: `package_name`, `package_value`

- **`form_started`** - Cuando comienza a llenar formulario (onFocus primer campo)
  - Parámetros: `form_name`

- **`cta_click`** - Cuando hace click en CTAs principales
  - Parámetros: `cta_text`, `cta_location`, `traffic_source`

## Testing

### Verificar eventos en Chrome DevTools

1. Abrir DevTools > Network
2. Filtrar por "collect" o "gtag"
3. Hacer acción (ej: click en CTA)
4. Ver request a google-analytics.com con event data

### Verificar en Google Analytics

1. Ir a GA4 > Informes > Tiempo real
2. Hacer acción en el sitio
3. Ver evento aparecer en tiempo real (puede tardar unos segundos)

### Verificar conversión en Google Ads

1. Ir a Google Ads > Herramientas > Conversiones
2. Hacer test de conversión en sitio
3. Verificar que aparezca (puede tardar 24-48h en reportar completamente)

## URLs para Google Ads

### Formato de URLs para Campañas

Usar este formato en campañas de Google Ads:

```
https://www.aurigital.com/diseno-web?source=ads
https://www.aurigital.com/desarrollo-web?source=ads
```

**Nota:** El parámetro `?source=ads` está preparado para cambiar CTAs dinámicos, pero esta funcionalidad está pendiente de implementar (TAREA 2).

## Structured Data Implementado

Cada landing page tiene:

- **LocalBusiness Schema** - Información de la empresa
- **Service Schema** - Descripción del servicio y ofertas
- **FAQ Schema** - Preguntas frecuentes estructuradas
- **AggregateRating Schema** - Rating de la empresa
- **Breadcrumb Schema** - Navegación estructurada

Verificar con: https://search.google.com/test/rich-results

## Breadcrumbs Visuales

Implementados en ambas landing pages antes del contenido principal:

- Inicio > Servicios > Diseño Web
- Inicio > Servicios > Desarrollo Web

## Archivos Creados

### Utilidades

- `app/lib/analytics.js` - Funciones de tracking
- `app/lib/structuredData.js` - Schemas JSON-LD

### Componentes SEO

- `app/components/seo/StructuredData.jsx` - Componente para JSON-LD
- `app/components/seo/Breadcrumbs.jsx` - Componente de breadcrumbs

### Archivos Modificados

- `app/components/diseno-web/WhatsAppForm.jsx` - Agregado tracking de eventos

## Checklist Pre-Launch

### Configuración Requerida

- [ ] Configurar conversión en Google Ads y obtener CONVERSION_LABEL
- [ ] Reemplazar CONVERSION_LABEL en `app/lib/analytics.js`
- [ ] Crear imágenes Open Graph (og-diseno-web.jpg, og-desarrollo-web.jpg)
- [ ] Subir imágenes OG a `/public/assets/`

### Verificación Técnica

- [ ] Compilar proyecto sin errores: `npm run build`
- [ ] Verificar eventos en GA4 Tiempo Real
- [ ] Probar formulario WhatsApp y verificar conversión
- [ ] Verificar Structured Data con Rich Results Test
- [ ] Verificar breadcrumbs visuales en ambas landings
- [ ] Verificar metadata en ambas landings (title, description, OG tags)

### Testing de Eventos

- [ ] Click en CTA Hero → evento `cta_click`
- [ ] Click en CTA secundario → evento `cta_click`
- [ ] Focus en campo nombre → evento `form_started`
- [ ] Seleccionar paquete en dropdown → (preparado para `package_selected`)
- [ ] Enviar formulario → evento `whatsapp_click` + `conversion`

### SEO y Performance

- [ ] Verificar canonical URLs
- [ ] Verificar meta robots
- [ ] Verificar sitemap.xml incluye ambas landing pages
- [ ] Verificar tiempos de carga (< 3s)
- [ ] Verificar móvil en PageSpeed Insights

## Funcionalidades Pendientes

### TAREA 2: CTAs Dinámicos (No Implementado)

Los CTAs dinámicos basados en `?source=ads` están preparados en concepto pero NO implementados en código.

**Para implementar:**

1. Agregar `useSearchParams` en ambas landing pages
2. Detectar parámetro `source`
3. Cambiar textos de CTAs según source:
   - Organic: "Solicitar cotización"
   - Ads: "Agenda una consulta gratis"

**Prioridad:** Media (puede agregarse después del launch)

### TAREA 6: Metadata Optimization (Parcial)

La metadata existe pero puede optimizarse más:

- Agregar geo meta tags
- Agregar twitter:creator
- Verificar keywords density

### TAREA 7: Preconnect (No Implementado)

Agregar preconnect links en `app/layout.js` para GA y GTM.

## Soporte

Para dudas sobre tracking o configuración:

1. Revisar este documento
2. Verificar console del navegador para errores
3. Usar Google Tag Assistant para debugging
4. Contactar equipo de desarrollo

## Recursos Útiles

- [Google Analytics 4 Events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Google Ads Conversion Tracking](https://support.google.com/google-ads/answer/1722022)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
