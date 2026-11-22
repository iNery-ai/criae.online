import React from 'react';
import { trackMetaEvent } from './tracker.js';

export const checkout = 'https://pay.kiwify.com.br/K1eUYmk';
export const instagram = 'https://www.instagram.com/criae.online/';
export const whatsapp = `https://wa.me/5575983378022?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre o Natal Mágico.')}`;
export const offerPrice = 'R$ 17,90';
export const fullPrice = 'R$ 47,90';
export const OFFER_DURATION = 3600; // 1 hora em segundos

export function pad(n) { return String(n).padStart(2, '0'); }
export function formatTimer(s) { return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`; }

export function getSessionValue(key, initializer) {
  try {
    const stored = sessionStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  const value = initializer();
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch {}
  return value;
}

export function handleCheckout(origin = 'Geral') {
  try {
    sessionStorage.setItem('criae_checkout_clicked', 'true');
  } catch {}
  if (typeof window !== 'undefined') {
    window._criaeCheckoutClicked = true;
  }
  trackMetaEvent('InitiateCheckout', {
    content_name: 'Natal Mágico — 40 atividades para imprimir',
    content_category: 'Atividades Infantis',
    content_type: 'product',
    currency: 'BRL',
    value: 17.90,
    origin,
  });
}

export function ButtonLink({ children, href, variant = 'primary', ...props }) {
  return <a className={`button button--${variant}`} href={href} {...props}>{children}</a>;
}
