// Utility para enviar eventos a Google Analytics y Google Ads
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Evento de conversión de WhatsApp
export const trackWhatsAppConversion = (packageName = 'unknown', packageValue = 2500) => {
  trackEvent('conversion', {
    send_to: 'AW-17131483110/CONVERSION_LABEL', // Cliente debe reemplazar CONVERSION_LABEL
    value: packageValue,
    currency: 'USD',
    transaction_id: `wa_${Date.now()}`
  });

  trackEvent('whatsapp_click', {
    package_selected: packageName,
    value: packageValue,
    event_category: 'engagement',
    event_label: 'WhatsApp Contact'
  });
};

// Evento de selección de paquete
export const trackPackageSelection = (packageName, packageValue) => {
  trackEvent('package_selected', {
    package_name: packageName,
    package_value: packageValue,
    event_category: 'engagement',
    event_label: 'Package Selection'
  });
};

// Evento de inicio de formulario
export const trackFormStart = (formName = 'contact_form') => {
  trackEvent('form_started', {
    form_name: formName,
    event_category: 'engagement',
    event_label: 'Form Interaction'
  });
};

// Evento de CTA click
export const trackCTAClick = (ctaText, ctaLocation, source = 'organic') => {
  trackEvent('cta_click', {
    cta_text: ctaText,
    cta_location: ctaLocation,
    traffic_source: source,
    event_category: 'engagement',
    event_label: 'CTA Interaction'
  });
};

// Helper para obtener valores de paquetes
export const PACKAGE_VALUES = {
  'Professional Pack': 2000,
  'Startup Pack': 3450,
  'Enterprise Pack': 6800,
  'default': 2500
};

export const getPackageValue = (packageName) => {
  return PACKAGE_VALUES[packageName] || PACKAGE_VALUES.default;
};
