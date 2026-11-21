import React, { useEffect, useRef, useState } from 'react';
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
import logo from '../assets/ui/logo.webp';
import { handleCheckout, ButtonLink, checkout, instagram, whatsapp, fullPrice, formatTimer } from './shared.jsx';

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

const testimonials = [
  { name: 'Ana C.', role: 'Mãe de 2', text: 'Meus filhos amaram o calendário do Advento! Cada dia era uma surpresa diferente e eles já pedem o próximo.' },
  { name: 'Profª Carla', role: 'Ed. Infantil', text: 'Usei com a turma inteira e foi sucesso. As crianças ficaram encantadas com os personagens e a qualidade do material.' },
  { name: 'Juliana M.', role: 'Mãe de 3', text: 'O kit personalizado com o nome das crianças foi o ponto alto! Eles se sentiram muito especiais.' },
];

export function ForWho() {
  return <section className="section for-who" aria-labelledby="for-who-title">
    <div className="wrap">
      <div className="section-heading">
        <p className="eyebrow">Para quem é</p>
        <h2 id="for-who-title">O Natal Mágico é para você se…</h2>
      </div>
      <ul className="for-who-list">
        <li>Quer entreter as crianças com algo educativo nas férias</li>
        <li>Precisa de atividades prontas, sem perder horas no Pinterest</li>
        <li>Quer montar um calendário do Advento sem comprar kits caros</li>
        <li>É professora e precisa de material temático para a turma</li>
        <li>Quer criar memórias de Natal com as crianças, não só dar presente</li>
      </ul>
    </div>
  </section>;
}

export function Book({ price }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const dialog = useRef(null);
  const touch = useRef(null);
  const nextButton = useRef(null);
  const total = pages.length + 1;
  const isLocked = index === pages.length;
  const currentPage = pages[index];

  function show(next) {
    if (next === index) return;
    setDirection(next > index ? 'forward' : 'back');
    setIndex(next);
  }

  function handleKey(e) {
    if (e.key === 'ArrowRight' && index < total - 1) show(index + 1);
    if (e.key === 'ArrowLeft' && index > 0) show(index - 1);
  }

  function handleTouchStart(e) {
    const point = e.touches[0];
    touch.current = { x: point.clientX, y: point.clientY };
  }

  function handleTouchEnd(e) {
    if (!touch.current) return;
    const point = e.changedTouches[0];
    const dx = point.clientX - touch.current.x;
    const dy = point.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0 && index < total - 1) show(index + 1);
    if (dx > 0 && index > 0) show(index - 1);
  }

  return <section className="section preview" id="caderno" aria-labelledby="preview-title">
    <div className="wrap preview-grid">
      <div className="preview-intro">
        <p className="eyebrow">Folheie uma amostra</p>
        <h2 id="preview-title">Veja como o material é por dentro.</h2>
        <p>São 40 atividades divididas em jogos, recortes, montagens e páginas para colorir. Todas vêm prontas para imprimir em folhas A4 comuns.</p>
        <div className="page-list" role="tablist" aria-label="Páginas da amostra">
          {pages.map((p, i) => <button key={p.title} type="button" role="tab" aria-selected={i === index} aria-current={i === index ? 'page' : undefined} onClick={() => show(i)}>
            <span className="page-no">{i + 1}</span><span>{p.title}</span>
          </button>)}
          <button type="button" role="tab" aria-selected={isLocked} aria-current={isLocked ? 'page' : undefined} onClick={() => show(pages.length)}>
            <span className="page-no">+34</span><span>Atividades no kit</span>
          </button>
        </div>
      </div>
      <div className="reader" onKeyDown={handleKey} tabIndex="0" aria-label="Leitor da amostra de atividades">
        <div className="reader-top">
          <strong>{isLocked ? 'Mais 34 atividades' : currentPage.title}</strong>
          <span>{index + 1} de {total}</span>
        </div>
        <div className="book-stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className={`sheet ${direction}`} key={index}>
            {isLocked ? (
              <div className="book-lock">
                <span className="lock-shape" aria-hidden="true"></span>
                <p className="eyebrow">Amostra concluída</p>
                <h3>Quer ver as outras 34 atividades?</h3>
                <p>O kit completo traz o calendário do Advento, novos personagens, jogos de tabuleiro, labirintos e cartões.</p>
                <ButtonLink href={checkout} onClick={() => handleCheckout('Leitor')}>QUERO O KIT POR {price}</ButtonLink>
                <small className="muted">Acesso imediato após a confirmação do pagamento</small>
              </div>
            ) : (
              <button type="button" className="sheet-image" onClick={() => dialog.current?.showModal()} aria-label={`Ampliar ${currentPage.title}`}>
                <img src={currentPage.image} alt={currentPage.title} width="640" height="904" loading="lazy" decoding="async" />
                <span>Ampliar</span>
              </button>
            )}
          </div>
        </div>
        <div className="reader-controls">
          <button type="button" onClick={() => show(index - 1)} disabled={index === 0} aria-label="Página anterior">← Anterior</button>
          <p>{isLocked ? 'Amostra finalizada' : 'Clique na página para ampliar'}</p>
          <button ref={nextButton} type="button" onClick={() => show(index + 1)} disabled={index === total - 1} aria-label="Próxima página">Próxima →</button>
        </div>
        <dialog ref={dialog} className="zoom" aria-label="Visualização ampliada">
          <form method="dialog"><button type="submit" className="button button--quiet">Fechar visualização</button></form>
          {currentPage && <img src={currentPage.image} width="640" height="904" alt={currentPage.title} />}
        </dialog>
      </div>
    </div>
  </section>;
}

export function Activities() {
  const [selected, setSelected] = useState(0);
  return <section className="section activities" id="atividades" aria-labelledby="activities-title">
    <div className="wrap">
      <div className="section-heading">
        <p className="eyebrow">Destaques do material</p>
        <h2 id="activities-title">Atividades pensadas para entreter e ensinar.</h2>
      </div>
      <div className="activity-shell">
        <div className="activity-tabs" role="tablist" aria-label="Tipos de atividade">
          {activities.map((item, i) => <button key={item.tab} type="button" role="tab" id={`tab-${i}`} aria-controls={`panel-${i}`} aria-selected={selected === i} onClick={() => setSelected(i)}>{item.tab}</button>)}
        </div>
        {activities.map((activity, i) => <div key={activity.title} id={`panel-${i}`} role="tabpanel" aria-labelledby={`tab-${i}`} hidden={selected !== i} className="activity-panel">
          {selected === i && <><img src={activity.image} alt={activity.alt} width="640" height="640" loading="lazy" decoding="async" /><div><h3>{activity.title}</h3><p>{activity.copy}</p><p className="muted">{activity.detail}</p></div></>}
        </div>)}
      </div>
    </div>
  </section>;
}

export function Kit() {
  return <section className="section kit" id="kit" aria-labelledby="kit-title"><div className="wrap">
    <div className="section-heading"><p className="eyebrow">O que você recebe</p><h2 id="kit-title">Tudo o que vem no seu acesso digital.</h2></div>
    <div className="kit-list">
      <article><span className="kit-label">Caderno principal</span><h3>40 atividades natalinas</h3><p>Jogos de recortar e montar, calendário do Advento, labirintos, desenhos para colorir e cartões interativos em formato A4.</p></article>
      <article><span className="kit-label">Para os responsáveis</span><h3>Guia de apoio e mapa</h3><p>Orientações práticas de montagem, lista de materiais simples e mapa visual com a ordem sugerida para cada faixa etária.</p></article>
    </div>
  </div></section>;
}

export function Bonus({ price }) {
  return <section className="section bonus-wrap"><div className="wrap"><div className="bonus">
    <div className="bonus-art">
      <img className="bonus-sheet bonus-sheet--tags" src={bonusTags} alt="" width="460" height="650" loading="lazy" decoding="async" />
      <img className="bonus-sheet bonus-sheet--letter" src={bonusLetter} alt="" width="460" height="650" loading="lazy" decoding="async" />
      <img className="bonus-sheet bonus-sheet--cover" src={bonusImage} alt="" width="600" height="847" loading="lazy" decoding="async" />
    </div>
    <div className="bonus-copy">
      <div className="bonus-labels"><p className="eyebrow">Bônus exclusivo</p><span className="bonus-badge">Incluso nesta oferta</span></div>
      <h3>Kit de Natal personalizado com o nome da criança</h3>
      <p className="bonus-product">Cartinha para o Papai Noel + 12 etiquetas para presentes</p>
      <p className="bonus-description">Você recebe um arquivo digital especial: abra no computador ou celular, digite o nome da criança e os materiais já saem personalizados na impressão. Ou, se preferir, imprima e preencha à mão junto com ela.</p>
      <p className="bonus-tip"><span aria-hidden="true">💡</span> <span>Fica pronto em menos de 2 minutos, sem precisar de programas complicados.</span></p>
    </div>
  </div></div></section>;
}

export function Offer({ price, offerActive, secondsLeft, units }) {
  return <section className="section offer" id="comprar" aria-labelledby="offer-title"><div className="wrap offer-grid">
    <div className="offer-copy">
      <p className="eyebrow">Acesso digital imediato</p>
      <h2 id="offer-title">Garanta as 40 atividades do Natal Mágico.</h2>
      <p>Você recebe o link para baixar os arquivos logo após a confirmação do pagamento. Imprima quantas vezes quiser para a sua família.</p>
      <ul className="checklist">
        <li>40 atividades prontas para imprimir em papel A4 comum</li>
        <li>Bônus: cartinha para o Papai Noel personalizável</li>
        <li>Bônus: 12 etiquetas de presente personalizáveis</li>
        <li>Guia de instruções e mapa de atividades</li>
        <li>Garantia incondicional de 7 dias</li>
      </ul>
    </div>
    <div className="price-card">
      <p className="eyebrow">Pagamento único</p>
      {offerActive && <p className="offer-anchor"><s>{fullPrice}</s></p>}
      <p className="offer-price">{price}</p>
      {offerActive && secondsLeft > 0 && <div className="offer-timer" aria-live="polite">
        <p>Esta oferta encerra em:</p>
        <div className="offer-timer-value">{formatTimer(secondsLeft)}</div>
      </div>}
      {offerActive && <p className="offer-units"><span aria-hidden="true">🔥</span> Restam apenas <strong>{units} kits</strong> com valor promocional</p>}
      <p className="price-meta">Acesso para baixar e imprimir quantas vezes quiser</p>
      <ButtonLink href={checkout} onClick={() => handleCheckout('Bloco Oferta')}>QUERO MEU KIT DIGITAL</ButtonLink>
      <p className="price-delivery">Entrega imediata por e-mail após a confirmação</p>
    </div>
  </div></section>;
}

export function Guarantee() {
  return <section className="section guarantee" aria-labelledby="guarantee-title"><div className="wrap guarantee-box">
    <div className="guarantee-main"><div className="seal" aria-hidden="true"><strong>7</strong><span>DIAS</span></div><div><h2 id="guarantee-title">7 dias para experimentar.</h2><p>Se o Natal Mágico não for o que você esperava, solicite o reembolso em até 7 dias após a compra.</p></div></div>
    <div className="contact"><div><h3>Ficou com alguma dúvida?</h3><p>Fale com a Criaê.</p></div><div className="contact-actions"><ButtonLink href={whatsapp} variant="green" target="_blank" rel="noopener noreferrer">WhatsApp</ButtonLink><ButtonLink href={instagram} variant="quiet" target="_blank" rel="noopener noreferrer">Instagram</ButtonLink></div></div>
  </div></section>;
}

export function SocialProof() {
  return <section className="section testimonials" aria-labelledby="testimonials-title">
    <div className="wrap">
      <div className="section-heading">
        <p className="eyebrow">Quem já usou</p>
        <h2 id="testimonials-title">O que dizem sobre as atividades da Criaê</h2>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((t) => <blockquote key={t.name} className="testimonial-card">
          <p>"{t.text}"</p>
          <footer><strong>{t.name}</strong> · <span>{t.role}</span></footer>
        </blockquote>)}
      </div>
    </div>
  </section>;
}

export function FAQ() {
  return <section className="section faq" id="duvidas" aria-labelledby="faq-title"><div className="wrap faq-grid">
    <div><p className="eyebrow">Antes de imprimir</p><h2 id="faq-title">Perguntas frequentes</h2></div>
    <div>{questions.map(([question, answer]) => <details name="natal-faq" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </div></section>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer">
      <a className="footer-brand" href="#inicio"><img src={logo} width="102" height="39" alt="Criaê, voltar ao início" loading="lazy" decoding="async" /></a>
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

export function MobileOffer({ price, offerActive, secondsLeft }) {
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
    const contentEl = document.getElementById('conteudo');
    if (contentEl) layoutObserver.observe(contentEl);
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
        {offerActive && <s>{fullPrice}</s>}
      </div>
      {offerActive && secondsLeft > 0
        ? <p className="mobile-offer-timer">{formatTimer(secondsLeft)}</p>
        : <p>Pagamento único</p>}
    </div>
    <ButtonLink href={checkout} onClick={() => handleCheckout('Barra Mobile Fixa')}>{offerActive ? 'Garantir agora' : 'Comprar agora'}</ButtonLink>
  </aside>;
}

export default function BelowTheFold({ currentPrice, offerActive, secondsLeft, units }) {
  return <>
    <ForWho />
    <Activities />
    <Book price={currentPrice} />
    <Kit />
    <SocialProof />
    <Bonus price={currentPrice} />
    <Offer price={currentPrice} offerActive={offerActive} secondsLeft={secondsLeft} units={units} />
    <Guarantee />
    <FAQ />
    <Footer />
    <MobileOffer price={currentPrice} offerActive={offerActive} secondsLeft={secondsLeft} />
  </>;
}
