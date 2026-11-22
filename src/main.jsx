import React, { useEffect, useState, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import hero480 from '../assets/ui/hero-480.webp';
import hero800 from '../assets/ui/hero-800.webp';
import hero1200 from '../assets/ui/hero-1200.webp';
import logo from '../assets/ui/logo.webp';
import { trackMetaEvent } from './tracker.js';
import { handleCheckout, ButtonLink, checkout, offerPrice, fullPrice, OFFER_DURATION, getSessionValue } from './shared.jsx';
import ExitPopup from './ExitPopup.jsx';
import './styles.css';

const BelowTheFold = lazy(() => import('./BelowTheFold.jsx'));

function Header() {
  return <header className="site-header" id="inicio">
    <div className="top-bar">
      <div className="wrap top-bar-inner">
        <p>🎁 Atividades de Natal prontas para imprimir</p>
      </div>
    </div>
    <div className="nav-bar">
      <div className="wrap nav">
        <a className="brand" href="#inicio" aria-label="Criaê - Voltar ao início">
          <img src={logo} alt="Criaê" width="102" height="39" decoding="async" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#caderno">Folhear</a>
          <a href="#kit">Dentro do kit</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <a className="header-cta" href={checkout} onClick={() => handleCheckout('Cabecalho')}>
          <span>Quero meu kit</span>
          <span className="cta-arrow" aria-hidden="true">↓</span>
        </a>
      </div>
    </div>
  </header>;
}

function Hero({ price, offerActive, units }) {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">✦</span> Natal Mágico da Criaê</p>
          <h1 id="hero-title">Atividades de Natal prontas para imprimir, colorir e brincar. <em>Sem preparação. Só alegria!</em></h1>
          <p className="hero-description">São <strong>40 atividades natalinas criadas para crianças de 3 a 8 anos</strong> — jogos, recortes, montagens e até um calendário do Advento. Você baixa, imprime e a diversão começa. Ideal para mães, pais e professoras que querem um Natal criativo sem complicação.</p>
        </div>
        <figure className="hero-picture">
          <img
            src={hero800}
            srcSet={`${hero480} 480w, ${hero800} 800w, ${hero1200} 1200w`}
            sizes="(max-width: 42rem) 92vw, (max-width: 64rem) 40vw, 416px"
            width="867"
            height="1540"
            alt="Capa do Natal Mágico e folhas do jogo da memória, do globo de Natal e de ligue os pontos sobre uma mesa"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>Prévia do caderno</figcaption>
        </figure>
        <div className="hero-purchase">
          <div className="hero-actions">
            <ButtonLink href={checkout} onClick={() => handleCheckout('Hero')}>QUERO AS 40 ATIVIDADES</ButtonLink>
            <p className="hero-meta">Acesso imediato <span aria-hidden="true">•</span> Material digital <span aria-hidden="true">•</span> Pronto para imprimir</p>
          </div>
          <div className="hero-pricing">
            {offerActive && <p className="hero-anchor"><s>{fullPrice}</s></p>}
            <p className="hero-price">{price} <span>· pagamento único</span></p>
            {offerActive && <p className="hero-units"><span aria-hidden="true">🔥</span> Restam apenas <strong>{units} kits</strong> por este valor</p>}
          </div>
        </div>
      </div>
    </section>
    <div className="quick-facts"><ul className="wrap" aria-label="Benefícios do Natal Mágico"><li><b>40</b> atividades prontas</li><li><b>3 a 8</b> anos</li><li><b>PDF</b> em A4</li></ul></div>
  </>;
}

function App() {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const data = getSessionValue('criae-timer', () => ({ start: Date.now() }));
    const elapsed = Math.floor((Date.now() - data.start) / 1000);
    return Math.max(0, OFFER_DURATION - elapsed);
  });

  const offerActive = secondsLeft > 0;
  const currentPrice = offerActive ? offerPrice : fullPrice;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      const data = getSessionValue('criae-timer', () => ({ start: Date.now() }));
      const elapsed = Math.floor((Date.now() - data.start) / 1000);
      setSecondsLeft(Math.max(0, OFFER_DURATION - elapsed));
    }, 1000);
    return () => window.clearInterval(id);
  }, [secondsLeft > 0]);

  const [units, setUnits] = useState(() => {
    const data = getSessionValue('criae-units', () => ({
      initial: Math.floor(Math.random() * 12) + 22,
      start: Date.now(),
    }));
    const minutesElapsed = (Date.now() - data.start) / 60000;
    return Math.max(3, data.initial - Math.floor(minutesElapsed / 2));
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      setUnits(prev => (prev <= 3 ? prev : prev - 1));
    }, 120000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const initialPvId = typeof window !== 'undefined' ? window._initialPageViewId : null;
    trackMetaEvent('PageView', {}, {}, initialPvId);
  }, []);

  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo">
      <Hero price={currentPrice} offerActive={offerActive} units={units} />
      <Suspense fallback={null}>
        <BelowTheFold currentPrice={currentPrice} offerActive={offerActive} secondsLeft={secondsLeft} units={units} />
      </Suspense>
    </main>
    <ExitPopup />
  </>;
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
