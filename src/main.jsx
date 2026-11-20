import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import heroImage from '../assets/ui/hero.webp';
import logo from '../assets/ui/logo.webp';
import globeImage from '../assets/ui/globo.webp';
import memoryImage from '../assets/ui/memoria.webp';
import bonusImage from '../assets/ui/bonus.webp';
import bonusTags from '../assets/ui/bonus-etiquetas.webp';
import bonusLetter from '../assets/ui/bonus-cartinha.webp';
import page1 from '../assets/ui/atividade-01.webp';
import page2 from '../assets/ui/atividade-02.webp';
import page3 from '../assets/ui/atividade-03.webp';
import page4 from '../assets/ui/atividade-04.webp';
import page5 from '../assets/ui/atividade-05.webp';
import page6 from '../assets/ui/atividade-06.webp';
import './styles.css';

const checkout = 'https://pay.kiwify.com.br/K1eUYmk';
const instagram = 'https://www.instagram.com/criae.online/';
const whatsapp = `https://wa.me/5575983378022?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre o Natal Mágico.')}`;
const promotionPrice = 'R$ 17,90';
const regularPrice = 'R$ 47,90';
const promotionDeadline = '2026-11-22T00:00:00-03:00';
const promotionEndsAt = Date.parse(promotionDeadline);
const pages = [
  { title: 'Capa', image: page1 },
  { title: 'Guia do adulto', image: page2 },
  { title: 'Mapa das atividades', image: page3 },
  { title: 'Calendário de Advento', image: page4 },
  { title: 'A Turma do Natal', image: page5 },
  { title: 'Meu Globo de Natal', image: page6 },
];

const activities = [
  { tab: 'Montar', title: 'Meu Globo de Natal', image: globeImage, alt: 'Folha de peças e globo montado com o boneco Flocão', copy: 'Flocão vai passar o Natal na neve ou no calor? A criança escolhe a base, recorta as peças com ajuda e monta sua própria cena.', detail: 'O caderno também traz quatro personagens para montar como fantoches de papel.' },
  { tab: 'Jogar', title: 'Jogo da memória', image: memoryImage, alt: 'Cartas ilustradas da Turma do Natal para recortar', copy: 'Recortem as cartas juntos, espalhem as figuras na mesa e encontrem os pares da Turma do Natal.', detail: 'Também tem labirintos, sombras, contagem, diferenças e ligue os pontos.' },
];

const questions = [
  ['Para qual idade o Natal Mágico é indicado?', 'Para crianças de 3 a 8 anos. Nas atividades de recorte, supervisione e ajude conforme a idade. Use tesoura sem ponta e mantenha as peças pequenas longe das crianças menores.'],
  ['Preciso de impressora colorida?', 'A versão econômica tem 24 páginas para imprimir em preto e branco. Na edição completa, você encontra opções coloridas e páginas para a criança pintar.'],
  ['Como e quando recebo o kit?', 'O material é digital. Depois da confirmação do pagamento, você recebe o acesso para baixar os PDFs. Nenhum produto físico é enviado.'],
  ['Como personalizo o bônus com o nome da criança?', 'Abra o PDF em um leitor compatível, como o Adobe Acrobat Reader. Digite o nome nos campos, salve uma cópia e imprima. Você também pode preencher à mão.'],
  ['Posso usar o material com uma turma?', 'O kit tem licença de uso pessoal. Para usar com uma turma inteira, fale com a Criaê sobre a licença.'],
  ['Como funciona a garantia?', 'Você pode solicitar o reembolso em até 7 dias após a compra. Se precisar de ajuda com a solicitação, fale com a Criaê pelo WhatsApp ou Instagram.'],
];

function ButtonLink({ children, href, variant = 'primary', ...props }) {
  return <a className={`button button--${variant}`} href={href} {...props}>{children}</a>;
}

function Header() {
  return <header className="header" id="inicio">
    <div className="wrap nav">
      <a className="brand" href="#inicio"><img src={logo} alt="Criaê" width="102" height="39" /></a>
      <nav aria-label="Navegação principal"><a href="#caderno">Folhear</a><a href="#kit">Dentro do kit</a><a href="#duvidas">Dúvidas</a></nav>
      <ButtonLink href="#comprar" variant="nav">Garantir meu kit</ButtonLink>
    </div>
  </header>;
}

function OfferCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(() => Math.ceil((promotionEndsAt - Date.now()) / 1000));

  useEffect(() => {
    const tick = () => setSecondsLeft(Math.ceil((promotionEndsAt - Date.now()) / 1000));
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (secondsLeft <= 0) return null;

  const units = [
    [Math.floor(secondsLeft / 86400), 'dias'],
    [Math.floor(secondsLeft / 3600) % 24, 'horas'],
    [Math.floor(secondsLeft / 60) % 60, 'min'],
    [secondsLeft % 60, 'seg'],
  ];

  return <section className="deadline" aria-labelledby="launch-label">
    <p className="deadline-label" id="launch-label"><span aria-hidden="true">⚠️</span> Oferta de lançamento</p>
    <p className="deadline-price">Hoje por apenas <strong>{promotionPrice}</strong></p>
    <p className="deadline-after">Depois: {regularPrice}</p>
    <div className="countdown" role="timer" aria-label="Tempo restante da oferta">
      {units.map(([amount, unit]) => <div className="countdown-unit" key={unit}><b>{String(amount).padStart(2, '0')}</b><span>{unit}</span></div>)}
    </div>
    <p className="deadline-date">Encerra em <time dateTime={promotionDeadline}>22/11 às 00h</time></p>
  </section>;
}

function Hero({ promotionActive }) {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">✦</span> Natal Mágico da Criaê</p>
          <h1 id="hero-title">O Natal das crianças já tem atividade. <em>Você só precisa imprimir!</em></h1>
          <p className="hero-description">São <strong>40 atividades natalinas prontas para imprimir</strong>, colorir, recortar e brincar. Tudo pensado para facilitar sua rotina e proporcionar momentos de criatividade e diversão com as crianças, em casa ou na escola.</p>
        </div>
        <figure className="hero-picture">
          <img src={heroImage} width="867" height="1540" alt="Capa do Natal Mágico e folhas do jogo da memória, do globo de Natal e de ligue os pontos sobre uma mesa" fetchPriority="high" />
          <figcaption>Prévia do caderno</figcaption>
        </figure>
        <div className="hero-purchase">
          <div className="hero-actions">
            <ButtonLink href="#comprar">QUERO AS 40 ATIVIDADES</ButtonLink>
            <p className="hero-meta">Acesso imediato <span aria-hidden="true">•</span> Material digital <span aria-hidden="true">•</span> Pronto para imprimir</p>
          </div>
          {promotionActive && <OfferCountdown />}
        </div>
      </div>
    </section>
    <div className="quick-facts"><ul className="wrap" aria-label="Benefícios do Natal Mágico"><li><b>40</b> atividades prontas</li><li><b>3 a 8</b> anos</li><li><b>PDF</b> em A4</li></ul></div>
  </>;
}

function Book({ price }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const dialog = useRef(null);
  const touch = useRef(null);
  const nextButton = useRef(null);
  const lockHeading = useRef(null);
  const focusLock = useRef(false);
  const locked = index === pages.length;
  const currentPage = pages[index];
  const status = locked ? 'Página 7 bloqueada' : `Página ${index + 1} de 6 · ${currentPage.title}`;

  useEffect(() => {
    if (locked && focusLock.current) lockHeading.current?.focus({ preventScroll: true });
    focusLock.current = false;
  }, [locked]);

  function turnTo(target) {
    const nextIndex = Math.max(0, Math.min(pages.length, target));
    if (nextIndex === index) return;
    focusLock.current = nextIndex === pages.length && document.activeElement === nextButton.current;
    setDirection(nextIndex > index ? 'forward' : 'back');
    setIndex(nextIndex);
  }

  function handleKeys(event) {
    if (dialog.current?.open) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      turnTo(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }

  function finishSwipe(event) {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const point = event.changedTouches[0];
    const x = point.clientX - start.clientX;
    const y = point.clientY - start.clientY;
    if (Math.abs(x) > 48 && Math.abs(x) > 1.4 * Math.abs(y)) turnTo(index + (x < 0 ? 1 : -1));
  }

  return <section className="section preview" id="caderno" aria-labelledby="book-title">
    <div className="wrap preview-grid">
      <div className="preview-intro">
        <p className="eyebrow">Prévia gratuita</p>
        <h2 id="book-title">Dê uma olhada por dentro.</h2>
        <p>Folheie as seis primeiras páginas e veja o calendário, conheça os personagens e descubra como montar o primeiro globo.</p>
        <div className="page-list" role="group" aria-label="Escolher página da prévia">
          {pages.map(({ title }, pageIndex) => <button type="button" key={title} aria-current={index === pageIndex ? 'page' : undefined} onClick={() => turnTo(pageIndex)}>
            <span className="page-no">{pageIndex + 1}</span><span>{title}</span>
          </button>)}
        </div>
      </div>
      <div className="reader" role="region" aria-label="Caderno interativo" tabIndex={0} onKeyDown={handleKeys}>
        <div className="reader-top"><strong>Natal Mágico</strong><span aria-hidden="true">PRÉVIA</span></div>
        <div className="book-stage" onTouchStart={event => { const p = event.touches[0]; touch.current = event.touches.length === 1 ? p : null; }} onTouchEnd={finishSwipe} onTouchCancel={() => { touch.current = null; }}>
          <div className={`sheet ${direction}`} key={index}>
            {locked ? <div className="book-lock">
              <span className="lock-shape" aria-hidden="true" />
              <p className="eyebrow">A partir da página 7</p>
              <h3 tabIndex={-1} ref={lockHeading}>Continue com o kit completo.</h3>
              <p>Leve as 40 atividades, a versão econômica e o Kit Personalizado.</p>
              <ButtonLink href={checkout}>Acessar o kit</ButtonLink>
              <small>{price} · pagamento único</small>
            </div> : <button className="sheet-image" type="button" onClick={() => dialog.current.showModal()} aria-label={`Ampliar página ${index + 1}: ${currentPage.title}`}>
              <img src={currentPage.image} alt={currentPage.title} width="743" height="1050" loading="lazy" />
              <span aria-hidden="true">Ampliar</span>
            </button>}
          </div>
        </div>
        <div className="reader-controls">
          <button type="button" onClick={() => turnTo(index - 1)} disabled={index === 0}>Anterior</button>
          <p role="status" aria-live="polite">{status}</p>
          <button type="button" ref={nextButton} onClick={() => turnTo(index + 1)} disabled={locked}>Próxima</button>
        </div>
        <dialog className="zoom" ref={dialog} aria-label={currentPage?.title || 'Página ampliada'}>
          <form method="dialog"><button autoFocus type="submit" className="button button--quiet">Fechar ampliação</button></form>
          {currentPage && <img src={currentPage.image} width="743" height="1050" alt={currentPage.title} />}
        </dialog>
      </div>
    </div>
  </section>;
}

function Activities() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef([]);
  const activity = activities[selected];

  function handleTabKeys(event) {
    const targets = { ArrowLeft: (selected + activities.length - 1) % activities.length, ArrowRight: (selected + 1) % activities.length, Home: 0, End: activities.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    setSelected(targets[event.key]);
    tabs.current[targets[event.key]].focus();
  }

  return <section className="section activities" aria-labelledby="activities-title">
    <div className="wrap">
      <div className="section-heading"><p className="eyebrow">Da folha para a mesa</p><h2 id="activities-title">O que vamos brincar hoje?</h2><p>Escolha pelo que a criança está com vontade de fazer. A ideia e as instruções já estão no caderno.</p></div>
      <div className="activity-shell">
        <div className="activity-tabs" role="tablist" aria-label="Tipos de brincadeira" onKeyDown={handleTabKeys}>
          {activities.map(({ tab }, i) => <button type="button" ref={node => { tabs.current[i] = node; }} role="tab" id={`activity-tab-${i}`} aria-controls={`activity-panel-${i}`} aria-selected={selected === i} tabIndex={selected === i ? 0 : -1} key={tab} onClick={() => setSelected(i)}>{tab}</button>)}
        </div>
        {activities.map(({ tab }, i) => <div key={tab} className="activity-panel" role="tabpanel" id={`activity-panel-${i}`} aria-labelledby={`activity-tab-${i}`} hidden={selected !== i}>
          {selected === i && <><img src={activity.image} alt={activity.alt} width="820" height="820" loading="lazy" /><div><h3>{activity.title}</h3><p>{activity.copy}</p><p className="muted">{activity.detail}</p></div></>}
        </div>)}
      </div>
    </div>
  </section>;
}

function Kit() {
  return <section className="section kit" id="kit" aria-labelledby="kit-title"><div className="wrap">
    <div className="section-heading"><p className="eyebrow">O que você recebe</p><h2 id="kit-title">Dois cadernos e um bônus.</h2><p>Três PDFs em A4 para imprimir só as páginas que vocês quiserem usar.</p></div>
    <div className="kit-list">
      <article><span className="kit-label">40 páginas</span><h3>Edição completa</h3><p>Colorir, recortar e colar com a Turma do Natal. Inclui jogos, calendário de Advento, guia do adulto e gabarito.</p></article>
      <article><span className="kit-label">24 páginas</span><h3>Versão econômica</h3><p>Páginas em preto e branco para imprimir em casa e deixar as cores por conta da criança.</p></article>
    </div>
    <article className="bonus" aria-labelledby="bonus-title">
      <div className="bonus-copy">
        <div className="bonus-labels">
          <p className="eyebrow"><span aria-hidden="true">🎁</span> Bônus incluído • 12 páginas</p>
          <span className="bonus-badge">Grátis com o kit</span>
        </div>
        <h3 id="bonus-title">Um Natal ainda mais especial com o nome da criança! <span aria-hidden="true">✨</span></h3>
        <p className="bonus-product">Kit Personalizado do Natal</p>
        <p className="bonus-description">Personalize a cartinha ao Papai Noel, o certificado e as etiquetas de presente com o nome da criança.</p>
        <p className="bonus-description">Também inclui molduras da Turma do Natal, marcadores de livro e cartões de lugar.</p>
        <p className="bonus-tip"><span aria-hidden="true">✨</span> <strong>Personalize no próprio PDF ou preencha à mão.</strong></p>
      </div>
      <div className="bonus-art" role="img" aria-label="Simulação do Kit Personalizado impresso com a capa, as etiquetas de presente e a cartinha ao Papai Noel">
        <img className="bonus-sheet bonus-sheet--tags" src={bonusTags} alt="" width="524" height="740" loading="lazy" />
        <img className="bonus-sheet bonus-sheet--letter" src={bonusLetter} alt="" width="524" height="740" loading="lazy" />
        <img className="bonus-sheet bonus-sheet--cover" src={bonusImage} alt="" width="708" height="1000" loading="lazy" />
      </div>
    </article>
  </div></section>;
}

function Offer({ price, promotionActive }) {
  return <section className="section offer" id="comprar" aria-labelledby="offer-title"><div className="wrap offer-grid">
    <div className="offer-copy"><p className="eyebrow">Kit digital Natal Mágico</p><h2 id="offer-title">A próxima brincadeira já está pronta.</h2><p>Da primeira folha colorida ao cartão para a família, escolha o que cabe no dia de vocês.</p><ul className="checklist"><li>Edição completa com 40 atividades</li><li>Versão econômica para colorir</li><li>Bônus Kit Personalizado</li></ul></div>
    <div className="price-card"><p className="eyebrow">{promotionActive ? 'Oferta de lançamento' : 'Kit completo'}</p><p className="offer-price">{price}</p><p className="price-meta">Pagamento único · Pix ou cartão</p><ButtonLink href={checkout}>Comprar Natal Mágico</ButtonLink>{promotionActive && <p className="price-deadline">Encerra em <time dateTime={promotionDeadline}>22/11 às 00h</time></p>}<p className="price-delivery">Acesso aos PDFs após a confirmação do pagamento.</p></div>
  </div></section>;
}

function Guarantee() {
  return <section className="section guarantee" aria-labelledby="guarantee-title"><div className="wrap guarantee-box" >
    <div className="guarantee-main"><div className="seal" aria-hidden="true"><strong>7</strong><span>DIAS</span></div><div><h2 id="guarantee-title">7 dias para experimentar.</h2><p>Se o Natal Mágico não for o que você esperava, solicite o reembolso em até 7 dias após a compra.</p></div></div>
    <div className="contact"><div><h3>Ficou com alguma dúvida?</h3><p>Fale com a Criaê.</p></div><div className="contact-actions"><ButtonLink href={whatsapp} variant="green" target="_blank" rel="noopener noreferrer">WhatsApp</ButtonLink><ButtonLink href={instagram} variant="quiet" target="_blank" rel="noopener noreferrer">Instagram</ButtonLink></div></div>
  </div></section>;
}

function FAQ() {
  return <section className="section faq" id="duvidas" aria-labelledby="faq-title"><div className="wrap faq-grid">
    <div><p className="eyebrow">Antes de imprimir</p><h2 id="faq-title">Perguntas frequentes</h2></div>
    <div>{questions.map(([question, answer]) => <details name="natal-faq" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </div></section>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer">
      <a className="footer-brand" href="#inicio"><img src={logo} width="102" height="39" alt="Criaê, voltar ao início" /></a>
      <p className="footer-tagline">Criatividade que vira aprendizado. <span aria-hidden="true">✨</span></p>
      <p className="footer-description">Atividades educativas, materiais criativos e experiências para aprender brincando.</p>
      <nav className="footer-links" aria-label="Contato da Criaê">
        <a href={instagram} target="_blank" rel="noopener noreferrer">@criae.online</a>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer">Suporte via WhatsApp</a>
      </nav>
      <div className="footer-legal">
        <p>© 2026 Criaê. Todos os direitos reservados.</p>
        <p>Material digital sujeito às condições de uso.</p>
      </div>
    </div>
  </footer>;
}

function MobileOffer({ price, promotionActive }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroButton = document.querySelector('.hero-actions .button');
    const offer = document.getElementById('comprar');
    if (!heroButton || !offer) return;
    let frameId = 0;

    function scheduleUpdate() {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        const purchasePassed = heroButton.getBoundingClientRect().bottom <= 0;
        const { top, bottom } = offer.getBoundingClientRect();
        const offerVisible = top < window.innerHeight && bottom > 0;
        setVisible(purchasePassed && !offerVisible);
      });
    }

    const layoutObserver = new ResizeObserver(scheduleUpdate);
    layoutObserver.observe(document.getElementById('conteudo'));
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();
    return () => {
      window.cancelAnimationFrame(frameId);
      layoutObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return visible && <aside className="mobile-offer" aria-label="Compra do Natal Mágico">
    <div>
      <div className="mobile-offer-prices">
        <strong>{price}</strong>
        {promotionActive && <s>{regularPrice}</s>}
      </div>
      <p>Pagamento único</p>
    </div>
    <ButtonLink href="#comprar">Garantir meu kit</ButtonLink>
  </aside>;
}

function App() {
  const [promotionActive, setPromotionActive] = useState(() => Date.now() < promotionEndsAt);
  const price = promotionActive ? promotionPrice : regularPrice;

  useEffect(() => {
    let timeout;

    function syncPromotion() {
      window.clearTimeout(timeout);
      const remaining = promotionEndsAt - Date.now();
      setPromotionActive(remaining > 0);
      if (remaining > 0) timeout = window.setTimeout(syncPromotion, remaining);
    }

    syncPromotion();
    document.addEventListener('visibilitychange', syncPromotion);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener('visibilitychange', syncPromotion);
    };
  }, []);

  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo"><Hero promotionActive={promotionActive} /><Activities /><Book price={price} /><Kit /><Offer price={price} promotionActive={promotionActive} /><Guarantee /><FAQ /></main>
    <Footer />
    <MobileOffer price={price} promotionActive={promotionActive} />
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
