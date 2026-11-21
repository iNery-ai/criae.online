import crypto from 'node:crypto';

/**
 * Normaliza e gera hash SHA-256 de uma string para a Meta Conversions API
 */
function hashField(value) {
  if (!value || typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normaliza número de telefone (apenas dígitos com DDI e DDD) e gera hash SHA-256
 */
function hashPhone(phone) {
  if (!phone) return null;
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return null;
  return crypto.createHash('sha256').update(digits).digest('hex');
}

/**
 * Extrai cookies da requisição HTTP
 */
function parseCookies(cookieHeader = '') {
  const cookies = {};
  cookieHeader.split(';').forEach(c => {
    const [key, ...v] = c.trim().split('=');
    if (key) cookies[key] = decodeURIComponent(v.join('='));
  });
  return cookies;
}

/**
 * Constrói o objeto user_data em conformidade estrita com as regras da Meta CAPI:
 * - client_ip_address, client_user_agent, fbp, fbc: SEMPRE sem hash
 * - Dados pessoais (em, ph, fn, ln, etc.): SEMPRE com hash SHA-256 dentro de arrays
 */
export function buildUserData(req, userInfo = {}) {
  const headers = req.headers || {};
  const cookies = parseCookies(headers.cookie || '');
  const body = req.body || {};

  // 1. IP real do visitante (considera proxies e CDNs)
  const forwarded = headers['x-forwarded-for'];
  const client_ip_address = forwarded
    ? forwarded.split(',')[0].trim()
    : (headers['x-real-ip'] || headers['cf-connecting-ip'] || req.socket?.remoteAddress || '');

  // 2. User-Agent
  const client_user_agent = headers['user-agent'] || '';

  // 3. Cookie _fbp
  const fbp = cookies['_fbp'] || body.fbp || userInfo.fbp || '';

  // 4. Cookie _fbc ou construção via parâmetro fbclid
  let fbc = cookies['_fbc'] || body.fbc || userInfo.fbc || '';
  const fbclid = body.fbclid || req.query?.fbclid || '';
  if (!fbc && fbclid) {
    fbc = `fb.1.${Date.now()}.${fbclid}`;
  }

  const userData = {};

  if (client_ip_address) userData.client_ip_address = client_ip_address;
  if (client_user_agent) userData.client_user_agent = client_user_agent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  // Campos com hash SHA-256 (sempre em arrays)
  const email = userInfo.em || userInfo.email || body.email;
  if (email) {
    const hashed = hashField(email);
    if (hashed) userData.em = [hashed];
  }

  const phone = userInfo.ph || userInfo.phone || body.phone;
  if (phone) {
    const hashed = hashPhone(phone);
    if (hashed) userData.ph = [hashed];
  }

  const fn = userInfo.fn || userInfo.firstName || body.firstName;
  if (fn) {
    const hashed = hashField(fn);
    if (hashed) userData.fn = [hashed];
  }

  const ln = userInfo.ln || userInfo.lastName || body.lastName;
  if (ln) {
    const hashed = hashField(ln);
    if (hashed) userData.ln = [hashed];
  }

  const ct = userInfo.ct || userInfo.city || body.city;
  if (ct) {
    const hashed = hashField(ct);
    if (hashed) userData.ct = [hashed];
  }

  const st = userInfo.st || userInfo.state || body.state;
  if (st) {
    const hashed = hashField(st);
    if (hashed) userData.st = [hashed];
  }

  const zp = userInfo.zp || userInfo.zipCode || body.zipCode;
  if (zp) {
    const hashed = hashField(zp);
    if (hashed) userData.zp = [hashed];
  }

  const country = userInfo.country || body.country;
  if (country) {
    const hashed = hashField(country);
    if (hashed) userData.country = [hashed];
  }

  const external_id = userInfo.external_id || body.external_id;
  if (external_id) {
    const hashed = hashField(external_id);
    if (hashed) userData.external_id = [hashed];
  }

  return userData;
}

export default async function handler(req, res) {
  // Configuração CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const pixelId = process.env.META_PIXEL_ID || process.env.PIXEL_ID || '2278057266394112';
  const accessToken = process.env.FB_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN || process.env.FACEBOOK_ACCESS_TOKEN;

  const {
    event_name,
    event_id,
    event_source_url,
    user_data: clientUserData = {},
    custom_data = {},
    test_event_code: bodyTestCode
  } = req.body || {};

  if (!event_name) {
    return res.status(400).json({ error: 'event_name é obrigatório' });
  }

  // 1. Constrói user_data único com identificadores obrigatórios e hashing seguro
  const userData = buildUserData(req, clientUserData);

  // 2. Log em ambiente de desenvolvimento (exibe apenas chaves, sem dados sensíveis)
  if (process.env.NODE_ENV !== 'production' || process.env.DEBUG_CAPI === 'true') {
    console.log(`[Meta CAPI Dev] Evento "${event_name}" - Chaves de user_data presentes:`, Object.keys(userData));
  }

  // 3. Monta o payload do evento com deduplicação
  const eventPayload = {
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: event_id || `ev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    event_source_url: event_source_url || req.headers.referer || 'https://criae.online',
    action_source: 'website',
    user_data: userData,
    ...(Object.keys(custom_data).length > 0 ? { custom_data } : {})
  };

  const testEventCode = bodyTestCode || req.query?.test_event_code || process.env.FB_TEST_EVENT_CODE;
  const postData = {
    data: [eventPayload],
    ...(testEventCode ? { test_event_code: testEventCode } : {})
  };

  // Se o access token não estiver definido no ambiente, retorna status 200 informativo
  if (!accessToken) {
    return res.status(200).json({
      success: true,
      warning: 'FB_ACCESS_TOKEN não configurado no servidor. Defina a variável de ambiente para envio ao Graph API da Meta.',
      event_id: eventPayload.event_id,
      user_data_keys: Object.keys(userData)
    });
  }

  try {
    const metaResponse = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });

    const metaData = await metaResponse.json();

    if (!metaResponse.ok) {
      console.error('[Meta CAPI Error]', metaData);
      return res.status(metaResponse.status).json({
        success: false,
        error: metaData.error?.message || 'Erro retornado pela Meta Graph API',
        details: metaData
      });
    }

    return res.status(200).json({
      success: true,
      event_id: eventPayload.event_id,
      fbtrace_id: metaData.fbtrace_id,
      events_received: metaData.events_received,
      user_data_keys: Object.keys(userData)
    });
  } catch (err) {
    console.error('[Meta CAPI Exception]', err);
    return res.status(500).json({ error: 'Erro interno ao comunicar com a Meta Conversions API' });
  }
}
