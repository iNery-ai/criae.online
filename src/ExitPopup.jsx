import React, { useEffect, useRef, useState } from 'react';
import { handleCheckout } from './shared.jsx';

// ============================================================================
// CONFIGURAÇÃO DA OFERTA DE EXIT INTENT
// ============================================================================
export const EXIT_PRICE_LABEL = 'R$ 10,90';
export const EXIT_CHECKOUT_URL = 'https://pay.kiwify.com.br/hrEcXkS';

/**
 * Anexa todos os parâmetros de rastreamento da URL atual (utm_*, fbclid, src, etc.)
 * ao link de checkout da oferta de saída.
 */
export function buildExitCheckoutUrl() {
  if (typeof window === 'undefined') return EXIT_CHECKOUT_URL;
  try {
    const currentParams = new URLSearchParams(window.location.search);
    if (!currentParams.toString()) return EXIT_CHECKOUT_URL;
    const url = new URL(EXIT_CHECKOUT_URL);
    currentParams.forEach((val, key) => {
      url.searchParams.set(key, val);
    });
    return url.toString();
  } catch {
    return EXIT_CHECKOUT_URL;
  }
}

export default function ExitPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  const exitShownRef = useRef(false);
  const mountTimeRef = useRef(Date.now());

  // Verifica se o pop-up já foi exibido na sessão ou se usuário já clicou em comprar nesta visita
  function canShow() {
    if (exitShownRef.current) return false;
    // Não exibir nos primeiros 5 segundos após montagem da página
    if (Date.now() - mountTimeRef.current < 5000) return false;
    try {
      if (sessionStorage.getItem('criae_exit_shown') === 'true') return false;
      if (sessionStorage.getItem('criae_checkout_clicked') === 'true') return false;
    } catch {}
    if (typeof window !== 'undefined' && window._criaeCheckoutClicked) return false;
    return true;
  }

  function markAsShown() {
    exitShownRef.current = true;
    try {
      sessionStorage.setItem('criae_exit_shown', 'true');
    } catch {}
  }

  function openPopup() {
    if (!canShow()) return;
    markAsShown();
    previousActiveElement.current = document.activeElement;
    setIsOpen(true);

    // Dispara evento customizado no Meta Pixel caso esteja disponível
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('trackCustom', 'ExitOfferShown');
      } catch (err) {
        console.warn('[Pixel ExitOfferShown Warning]', err);
      }
    }
  }

  function closePopup() {
    setIsOpen(false);
  }

  // Permite abrir ou resetar diretamente pelo console para testes rápidos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.openExitOffer = () => {
        exitShownRef.current = false;
        try {
          sessionStorage.removeItem('criae_exit_shown');
          sessionStorage.removeItem('criae_checkout_clicked');
        } catch {}
        mountTimeRef.current = 0;
        openPopup();
      };
      window.resetExitOffer = () => {
        exitShownRef.current = false;
        try {
          sessionStorage.removeItem('criae_exit_shown');
          sessionStorage.removeItem('criae_checkout_clicked');
        } catch {}
        mountTimeRef.current = Date.now();
      };
    }
  }, []);

  useEffect(() => {
    // 1. DESKTOP: Cursor sai da janela pela parte de cima (barra de abas/endereço)
    // O evento mouseleave NÃO borbulha (non-bubbling), logo precisa ser anexado em document.documentElement
    function handleMouseLeave(e) {
      if (e.clientY <= 25) {
        openPopup();
      }
    }

    function handleMouseOut(e) {
      if ((!e.relatedTarget || e.relatedTarget.nodeName === 'HTML') && e.clientY <= 25) {
        openPopup();
      }
    }

    // 2. MOBILE: Rolagem rápida para cima após passar de ~25-30% da página
    let lastScrollY = window.scrollY;
    let maxScrollY = 0;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > maxScrollY) {
        maxScrollY = currentScrollY;
      }

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentPassed = docHeight > 0 ? (maxScrollY / docHeight) * 100 : 0;

      // Se passou de ~25% da página e está rolando para cima com firmeza (> 45px de delta)
      if (percentPassed >= 25 && (lastScrollY - currentScrollY) > 45) {
        openPopup();
      }

      lastScrollY = currentScrollY;
    }

    // 3. INATIVIDADE: 40 segundos sem interação
    let inactivityTimer = null;
    function resetInactivity() {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        openPopup();
      }, 40000);
    }

    const activityEvents = ['mousemove', 'pointerdown', 'touchstart', 'keydown', 'scroll'];
    activityEvents.forEach((evt) => {
      window.addEventListener(evt, resetInactivity, { passive: true });
    });
    resetInactivity();

    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, resetInactivity);
      });
    };
  }, []);

  // Foco acessível (focus trap), bloqueio de rolagem do body e tecla ESC
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
      return;
    }

    document.body.style.overflow = 'hidden';

    // Foca o botão principal de CTA ao abrir para máxima clareza e acessibilidade
    const ctaBtn = modalRef.current?.querySelector('.exit-cta-btn');
    if (ctaBtn) {
      ctaBtn.focus();
    } else {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePopup();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const checkoutUrl = buildExitCheckoutUrl();

  function handleBuyClick() {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('trackCustom', 'ExitOfferClick', {
          value: 10.90,
          currency: 'BRL',
        });
      } catch (err) {
        console.warn('[Pixel ExitOfferClick Warning]', err);
      }
    }
    handleCheckout('Exit Intent Pop-up');
    closePopup();
  }

  return (
    <div
      className="exit-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePopup();
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="exit-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-popup-title"
      >
        <button
          type="button"
          className="exit-close-btn"
          onClick={closePopup}
          aria-label="Fechar oferta especial"
        >
          ✕
        </button>

        <span className="exit-badge" aria-hidden="true">🎁 Condição especial</span>

        <h2 id="exit-popup-title" className="exit-title">
          Espera! Liberamos uma condição especial pra você
        </h2>

        <p className="exit-desc">
          Antes de sair, o Natal Mágico está disponível por um preço especial, só nesta visita.
        </p>

        <div className="exit-price-box">
          <span className="exit-price-prefix">Por apenas</span>
          <strong className="exit-price-val">{EXIT_PRICE_LABEL}</strong>
          <span className="exit-price-sub">pagamento único · acesso imediato</span>
        </div>

        <ul className="exit-features" aria-label="Recursos inclusos no kit">
          <li>
            <span className="exit-check" aria-hidden="true">✓</span>
            <span>40 atividades de Natal</span>
          </li>
          <li>
            <span className="exit-check" aria-hidden="true">✓</span>
            <span>Colorir, recortar e brincar</span>
          </li>
          <li>
            <span className="exit-check" aria-hidden="true">✓</span>
            <span>PDF com acesso imediato</span>
          </li>
        </ul>

        <a
          href={checkoutUrl}
          className="button button--primary exit-cta-btn"
          onClick={handleBuyClick}
        >
          Quero o Natal Mágico por {EXIT_PRICE_LABEL}
        </a>

        <button
          type="button"
          className="exit-dismiss-btn"
          onClick={closePopup}
        >
          Não, obrigado
        </button>

        <p className="exit-security">
          <span aria-hidden="true">🔒</span> Pagamento seguro pela Kiwify. 7 dias de garantia.
        </p>
      </div>
    </div>
  );
}
