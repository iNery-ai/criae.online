import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import heroImage from '../assets/ui/hero.webp';
import logo from '../assets/ui/logo.webp';
import globeImage from '../assets/ui/globo.webp';
import memoryImage from '../assets/ui/memoria.webp';
import bonusImage from '../assets/ui/bonus.webp';
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
const price = 'R$ 17,90';
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
      <ButtonLink href="#comprar" variant="nav">Ver oferta</ButtonLink>
    </div>
  </header>;
}

function Hero() {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">✦</span> Natal Mágico da Criaê</p>
          <h1 id="hero-title">Natal no papel. <em>Diversão em família.</em></h1>
          <p className="hero-description">40 atividades natalinas para colorir, recortar e brincar junto. Escolha uma página, imprima em A4 e convide a criança para criar com você.</p>
          <div className="hero-actions"><ButtonLink href="#comprar">Quero o kit por {price}</ButtonLink><a className="text-link" href="#caderno">Folhear 6 páginas grátis</a></div>
          <p className="hero-meta">De 3 a 8 anos <span>·</span> Pagamento único <span>·</span> Garantia de 7 dias</p>
        </div>
        <figure className="hero-picture">
          <img src={heroImage} width="664" height="1180" alt="Criança e adulta colorindo a atividade Meu Globo de Natal juntas à mesa" fetchPriority="high" />
          <figcaption><span className="picture-mark" aria-hidden="true">✦</span><span><strong>Meu Globo de Natal</strong><small>Uma das brincadeiras do caderno</small></span></figcaption>
        </figure>
      </div>
    </section>
    <div className="quick-facts"><div className="wrap"><span><b>40</b> atividades prontas</span><span><b>3–8</b> anos de idade</span><span><b>A4</b> imprima em casa</span></div></div>
  </>;
}

function Book() {
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
    <article className="bonus"><div className="bonus-art"><img src={bonusImage} alt="Capa do Kit Personalizado do Natal" width="708" height="1000" loading="lazy" /></div>
      <div className="bonus-copy"><p className="eyebrow">Bônus incluído · 12 páginas</p><h3>Kit Personalizado</h3><p>Coloque o nome da criança na cartinha ao Papai Noel, no certificado e nas etiquetas de presente.</p><p>O kit também traz molduras da Turma do Natal, marcadores de livro e cartões de lugar para a ceia. Preencha no PDF ou escreva à mão.</p></div>
    </article>
  </div></section>;
}

function Offer() {
  return <section className="section offer" id="comprar" aria-labelledby="offer-title"><div className="wrap offer-grid">
    <div className="offer-copy"><p className="eyebrow">Kit digital Natal Mágico</p><h2 id="offer-title">A próxima brincadeira já está pronta.</h2><p>Da primeira folha colorida ao cartão para a família, escolha o que cabe no dia de vocês.</p><ul className="checklist"><li>Edição completa com 40 atividades</li><li>Versão econômica para colorir</li><li>Bônus Kit Personalizado</li></ul></div>
    <div className="price-card"><p className="eyebrow">Tudo incluído</p><p className="offer-price">{price}</p><p className="price-meta">Pagamento único · Pix ou cartão</p><ButtonLink href={checkout}>Comprar Natal Mágico</ButtonLink><p className="price-delivery">Acesso aos PDFs após a confirmação do pagamento.</p></div>
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

function MobileOffer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const offer = document.getElementById('comprar');
    if (!('IntersectionObserver' in window)) return;
    let heroPassed = false;
    let offerVisible = false;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (entry.target === offer) offerVisible = entry.isIntersecting;
      }
      setVisible(heroPassed && !offerVisible);
    });
    observer.observe(hero);
    observer.observe(offer);
    return () => observer.disconnect();
  }, []);

  return visible && <aside className="mobile-offer" aria-label="Oferta Natal Mágico"><div><strong>{price}</strong><span>Pagamento único</span></div><ButtonLink href="#comprar">Ver oferta</ButtonLink></aside>;
}

function App() {
  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo"><Hero /><Activities /><Book /><Kit /><Offer /><Guarantee /><FAQ /></main>
    <footer><div className="wrap footer"><a href="#inicio"><img src={logo} width="88" height="33" alt="Criaê, voltar ao início" /></a><p>© Criaê · Material digital de uso pessoal.</p><a href={instagram}>@criae.online</a></div></footer>
    <MobileOffer />
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
