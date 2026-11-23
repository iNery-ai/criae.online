import React, { useEffect, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import hero480 from '../assets/ui/hero-480.webp';
import hero800 from '../assets/ui/hero-800.webp';
import hero1200 from '../assets/ui/hero-1200.webp';
import logo from '../assets/ui/logo.webp';
import { trackMetaEvent } from './tracker.js';
import { handleCheckout, ButtonLink, checkout, offerPrice } from './shared.jsx';
import ExitPopup from './ExitPopup.jsx';
import './styles.css';

const BelowTheFold = lazy(() => import('./BelowTheFold.jsx'));

function Header() {
  return <header className="site-header site-header--clean" id="inicio">
    <div className="wrap nav nav--clean">
      <a className="brand" href="#inicio" aria-label="Criaê - Voltar ao início">
        <img src={logo} alt="Criaê" width="102" height="39" decoding="async" />
      </a>
    </div>
  </header>;
}

function Hero({ price }) {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow--product">NATAL MÁGICO</p>
          <h1 id="hero-title">40 atividades de Natal para imprimir e começar em 5 minutos</h1>
          <p className="hero-description">Crianças de 3 a 8 anos. Baixe o PDF em A4, imprima e viva um Natal leve, divertido e sem telas.</p>
        </div>
        <figure className="hero-picture">
          <img
            src={hero800}
            srcSet={`${hero480} 480w, ${hero800} 800w, ${hero1200} 1200w`}
            sizes="(max-width: 42rem) 92vw, (max-width: 64rem) 40vw, 416px"
            width="867"
            height="1540"
            alt="Folhas do kit Natal Mágico para imprimir sobre a mesa"
            fetchPriority="high"
            decoding="async"
          />
        </figure>
        <div className="hero-purchase">
          <div className="hero-actions">
            <ButtonLink href={checkout} onClick={() => handleCheckout('Hero')} className="button button--primary button--hero">
              QUERO O NATAL MÁGICO · {price}
            </ButtonLink>
            <p className="hero-meta">PDF digital · Acesso imediato no e-mail · Pix ou cartão</p>
            <p className="hero-license">Uso liberado para imprimir em casa ou na sala de aula.</p>
          </div>
        </div>
      </div>
    </section>
    <div className="quick-facts">
      <ul className="wrap" aria-label="Benefícios do Natal Mágico">
        <li><b>40</b> atividades prontas</li>
        <li><b>3 a 8</b> anos</li>
        <li><b>PDF</b> em folha A4</li>
        <li><b>5 min</b> para começar</li>
      </ul>
    </div>
  </>;
}

function App() {
  const currentPrice = offerPrice;

  useEffect(() => {
    const initialPvId = typeof window !== 'undefined' ? window._initialPageViewId : null;
    trackMetaEvent('PageView', {}, {}, initialPvId);
  }, []);

  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo">
      <Hero price={currentPrice} />
      <Suspense fallback={null}>
        <BelowTheFold currentPrice={currentPrice} />
      </Suspense>
    </main>
    <ExitPopup />
  </>;
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
