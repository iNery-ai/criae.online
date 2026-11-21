/**
 * Utilitário de rastreamento híbrido (Pixel do Navegador + Meta Conversions API)
 * com deduplicação via event_id e envio de user_data (cookies _fbp, _fbc e fbclid).
 */

function getCookie(name) {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : '';
}

function getQueryParam(name) {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || '';
}

export function generateEventId(prefix = 'ev') {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${ts}_${rand}`;
}

/**
 * Dispara evento de forma sincronizada no Pixel (navegador) e na CAPI (servidor)
 */
export async function trackMetaEvent(eventName, customData = {}, userInfo = {}, customEventId = null) {
  const eventId = customEventId || generateEventId(eventName.toLowerCase().slice(0, 3));
  const fbp = getCookie('_fbp');
  const fbc = getCookie('_fbc');
  const fbclid = getQueryParam('fbclid');
  const testEventCode = getQueryParam('test_event_code');
  const url = typeof window !== 'undefined' ? window.location.href : '';

  // 1. Dispara no Pixel do Navegador com eventID para deduplicação
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', eventName, customData, { eventID: eventId });
    } catch (err) {
      console.warn('[Pixel Track Warning]', err);
    }
  }

  // 2. Dispara no Servidor (Conversions API) com o MESMO event_id e dados de navegação
  try {
    const payload = {
      event_name: eventName,
      event_id: eventId,
      event_source_url: url,
      fbp,
      fbc,
      fbclid,
      user_data: userInfo,
      custom_data: customData,
      ...(testEventCode ? { test_event_code: testEventCode } : {})
    };

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(err => {
      // Falha silenciosa para não impactar navegação
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[CAPI Client Warning]', err);
      }
    });
  } catch (err) {
    // Silencioso
  }

  return eventId;
}
