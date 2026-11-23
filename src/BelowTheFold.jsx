import React, { useRef, useState, useEffect } from 'react';
import page1 from '../assets/ui/atividade-01.webp';
import page2 from '../assets/ui/atividade-02.webp';
import page3 from '../assets/ui/atividade-03.webp';
import page4 from '../assets/ui/atividade-04.webp';
import page5 from '../assets/ui/atividade-05.webp';
import page6 from '../assets/ui/atividade-06.webp';
import testimonialAna from '../assets/ui/depoimento-ana.jpg';
import testimonialCarla from '../assets/ui/depoimento-carla.jpg';
import testimonialJuliana from '../assets/ui/depoimento-juliana.jpg';
import logo from '../assets/ui/logo.webp';
import { handleCheckout, ButtonLink, checkout, instagram, whatsapp } from './shared.jsx';

const samplePages = [
  { title: 'Capa', image: page1 },
  { title: 'Guia do adulto', image: page2 },
  { title: 'Mapa das atividades', image: page3 },
  { title: 'Calendário de Advento', image: page4 },
  { title: 'A Turma do Natal', image: page5 },
  { title: 'Meu Globo de Natal', image: page6 },
];

const testimonialsList = [
  {
    name: 'Ana Costa',
    role: 'Mãe',
    image: testimonialAna,
    alt: 'Mensagem no WhatsApp de Ana Costa elogiando o Calendário de Advento do Natal Mágico',
    highlight: '“O calendário do Advento foi um sucesso aqui em casa... uma das melhores comprinhas pro Natal deles.”',
  },
  {
    name: 'Profª Carla',
    role: 'Educação Infantil',
    image: testimonialCarla,
    alt: 'Mensagem no WhatsApp da Professora Carla relatando sucesso com a turma inteira de alunos',
    highlight: '“Usei com a turma inteira e foi um sucesso. As crianças ficaram encantadas... Prático, bonito e muito bem pensado.”',
  },
  {
    name: 'Juliana Moreira',
    role: 'Mãe de 3',
    image: testimonialJuliana,
    alt: 'Mensagem no WhatsApp de Juliana Moreira elogiando o kit personalizado com nome das crianças',
    highlight: '“O kit com o nome deles foi o ponto alto. Eles se sentiram muito especiais... dá pra ver o carinho em cada detalhe.”',
  },
];

const faqList = [
  {
    q: 'Como recebo o material?',
    a: 'O envio é 100% digital. Logo após a confirmação do pagamento, você recebe os links no seu e-mail para baixar todos os arquivos em PDF em alta resolução. Nenhum produto físico é enviado.',
  },
  {
    q: 'Posso imprimir mais de uma vez?',
    a: 'Sim! A licença de uso autoriza você a imprimir quantas cópias precisar para a sua família em casa ou para os alunos da sua sala de aula.',
  },
  {
    q: 'Qual papel e impressora devo usar?',
    a: 'Qualquer impressora comum em papel sulfite A4 (75 g/m²). Para o globo 3D e os fantoches ficarem mais firmes, sugerimos papel A4 de 90 a 120 g/m².',
  },
  {
    q: 'Como colocar o nome da criança no bônus?',
    a: 'Abra o PDF no celular ou computador com o Adobe Acrobat Reader gratuito, clique no campo e digite o nome. Se preferir, imprima em branco e escreva à mão junto com a criança.',
  },
  {
    q: 'Qual a idade indicada e os cuidados de segurança?',
    a: 'Indicado para crianças de 3 a 8 anos. Um adulto deve sempre acompanhar tesoura e cola; recomendamos recortar para menores de 5 anos; peças pequenas não são indicadas para menores de 3 anos.',
  },
  {
    q: 'Posso usar com meus alunos na escola?',
    a: 'Sim! A impressão para atividades em sala de aula é totalmente permitida. O guia cita que desenhar, pintar e colar aos 4 e 5 anos favorece a expressão livre (código BNCC EI03TS02). A redistribuição ou revenda dos arquivos é proibida.',
  },
];

/* 1. O que você recebe (3 pilares claros e objetivos) */
export function WhatYouGet() {
  return (
    <section className="section what-you-get" id="o-que-recebe" aria-labelledby="what-you-get-title">
      <div className="wrap">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Tudo incluso</p>
          <h2 id="what-you-get-title">O que você recebe no seu acesso digital</h2>
          <p>Três materiais em PDF prontos para imprimir em folha A4 comum:</p>
        </div>

        <div className="packages-grid">
          {/* Card 1: Principal */}
          <article className="package-card package-card--featured">
            <span className="package-badge">Material Principal</span>
            <h3>Natal Mágico Completo</h3>
            <p className="package-subtitle">40 atividades em PDF A4</p>
            <ul className="package-stacked-list">
              <li className="package-stacked-item">
                <span className="package-item-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                </span>
                <div className="package-item-content">
                  <strong className="package-item-title">40 atividades</strong>
                  <p className="package-item-desc">Globo de papel, fantoches da Turma do Natal, jogo da memória, sombras, labirintos, cartinha ao Noel e cenas com a cara do Brasil para colorir.</p>
                </div>
              </li>
              <li className="package-stacked-item">
                <span className="package-item-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
                </span>
                <div className="package-item-content">
                  <strong className="package-item-title">Calendário de Advento</strong>
                  <p className="package-item-desc">1 a 24 de dezembro com uma atividade por dia para acompanhar a contagem regressiva até o Natal.</p>
                </div>
              </li>
              <li className="package-stacked-item">
                <span className="package-item-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                </span>
                <div className="package-item-content">
                  <strong className="package-item-title">Guia do adulto e mapa</strong>
                  <p className="package-item-desc">Orientações práticas de montagem com tempo estimado e habilidade em destaque.</p>
                </div>
              </li>
            </ul>
          </article>

          {/* Card 2: Econômico */}
          <article className="package-card">
            <span className="package-badge package-badge--green">Gasta menos tinta</span>
            <h3>Versão Econômica</h3>
            <p className="package-subtitle">24 páginas em preto e branco</p>
            <ul className="package-stacked-list">
              <li className="package-stacked-item">
                <span className="package-item-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
                </span>
                <div className="package-item-content">
                  <strong className="package-item-title">24 páginas para colorir</strong>
                  <p className="package-item-desc">Ilustrações em traço limpo preto e branco pensadas para gastar menos tinta de impressora.</p>
                </div>
              </li>
              <li className="package-stacked-item">
                <span className="package-item-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="13" height="13" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </span>
                <div className="package-item-content">
                  <strong className="package-item-title">Economia e repetição</strong>
                  <p className="package-item-desc">Ideal para imprimir cópias extras para vários irmãos ou para toda a turma de alunos.</p>
                </div>
              </li>
            </ul>
          </article>

          {/* Card 3: Bônus */}
          <article className="package-card package-card--bonus">
            <span className="package-badge package-badge--purple">Bônus Exclusivo</span>
            <h3>Kit Personalizado</h3>
            <p className="package-subtitle">12 páginas com o nome da criança</p>
            <ul className="package-stacked-list">
              <li className="package-stacked-item">
                <span className="package-item-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="14" rx="2"/><path d="M12 8v14M3 12h18M12 8a3 3 0 0 0 0-6 3 3 0 0 0-3 3M12 8a3 3 0 0 1 0-6 3 3 0 0 1 3 3"/></svg>
                </span>
                <div className="package-item-content">
                  <strong className="package-item-title">Lembrancinhas e ceia</strong>
                  <p className="package-item-desc">Molduras de fotos da Turma do Natal, etiquetas de presente, marcadores e cartões de lugar para a mesa.</p>
                </div>
              </li>
              <li className="package-stacked-item">
                <span className="package-item-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                </span>
                <div className="package-item-content">
                  <strong className="package-item-title">Nome digitável no PDF</strong>
                  <p className="package-item-desc">Digite direto no PDF pelo Adobe Acrobat Reader no computador/celular ou preencha à mão.</p>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

/* 2. Folheie uma amostra real */
export function BookSample({ price }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const dialog = useRef(null);
  const touch = useRef(null);
  const nextButton = useRef(null);
  const total = samplePages.length + 1;
  const isLocked = index === samplePages.length;
  const currentPage = samplePages[index];

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

  return (
    <section className="section preview" id="amostra" aria-labelledby="preview-title">
      <div className="wrap preview-grid">
        <div className="preview-intro">
          <p className="eyebrow">Amostra real</p>
          <h2 id="preview-title">Veja como o material é por dentro</h2>
          <p>Diagramação limpa e ilustrações afetivas em tamanho real para imprimir sem complicação.</p>
          
          <div className="page-list" role="tablist" aria-label="Páginas da amostra">
            {samplePages.map((p, i) => (
              <button
                key={p.title}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-current={i === index ? 'page' : undefined}
                onClick={() => show(i)}
              >
                <span className="page-no">{i + 1}</span>
                <span>{p.title}</span>
              </button>
            ))}
            <button
              type="button"
              role="tab"
              aria-selected={isLocked}
              aria-current={isLocked ? 'page' : undefined}
              onClick={() => show(samplePages.length)}
            >
              <span className="page-no">+34</span>
              <span>Mais 34 atividades</span>
            </button>
          </div>
        </div>

        <div className="reader" onKeyDown={handleKey} tabIndex="0" aria-label="Leitor da amostra de atividades">
          <div className="reader-top">
            <strong>{isLocked ? 'Mais 34 atividades no kit' : currentPage.title}</strong>
            <span>{index + 1} de {total}</span>
          </div>
          <div className="book-stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className={`sheet ${direction}`} key={index}>
              {isLocked ? (
                <div className="book-lock">
                  <span className="lock-shape" aria-hidden="true"></span>
                  <p className="eyebrow">Kit completo</p>
                  <h3>Gostou da amostra?</h3>
                  <p>Baixe todas as 40 atividades + Versão Econômica + Bônus Personalizado agora mesmo.</p>
                  <ButtonLink href={checkout} onClick={() => handleCheckout('Leitor')}>QUERO O KIT POR {price}</ButtonLink>
                  <small className="muted">Acesso imediato no e-mail · PDF em A4</small>
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
            <p>{isLocked ? 'Amostra finalizada' : 'Clique na folha para ampliar'}</p>
            <button ref={nextButton} type="button" onClick={() => show(index + 1)} disabled={index === total - 1} aria-label="Próxima página">Próxima →</button>
          </div>
          <dialog ref={dialog} className="zoom" aria-label="Visualização ampliada">
            <form method="dialog"><button type="submit" className="button button--quiet">Fechar visualização</button></form>
            {currentPage && <img src={currentPage.image} width="640" height="904" alt={currentPage.title} />}
          </dialog>
        </div>
      </div>
    </section>
  );
}

/* 3. Depoimentos reais de quem já usou */
export function Testimonials() {
  return (
    <section className="section testimonials-section" id="depoimentos" aria-labelledby="testimonials-title">
      <div className="wrap">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Quem já usou</p>
          <h2 id="testimonials-title">O que dizem as famílias e professoras</h2>
          <p>Mensagens reais de quem já baixou, imprimiu e brincou com o Natal Mágico:</p>
        </div>

        <div className="testimonials-grid">
          {testimonialsList.map((t) => (
            <figure key={t.name} className="testimonial-card">
              <div className="testimonial-user">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
              <div className="testimonial-frame">
                <img
                  src={t.image}
                  alt={t.alt}
                  width="576"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                  className="testimonial-img"
                />
              </div>
              <figcaption className="testimonial-caption">
                <p>{t.highlight}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4. Como funciona (3 passos rápidos) */
export function HowItWorks() {
  return (
    <section className="section how-it-works" id="como-funciona" aria-labelledby="how-it-works-title">
      <div className="wrap">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Simples e direto</p>
          <h2 id="how-it-works-title">Como funciona? Em 3 passos</h2>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Compre e receba</h3>
            <p>Acesso digital imediato no seu e-mail logo após a confirmação do pagamento no Pix ou cartão.</p>
          </div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Imprima em A4</h3>
            <p>Em qualquer impressora caseira ou rápida. Em papel comum ou 90 a 120 g/m² para montagens mais firmes.</p>
          </div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Comece em 5 minutos</h3>
            <p>Pegue tesoura sem ponta, cola e lápis de cor. Zero complicação e zero perda de tempo procurando na internet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5. Dúvidas frequentes */
export function FAQ() {
  return (
    <section className="section faq" id="duvidas" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div>
          <p className="eyebrow">Dúvidas rápidas</p>
          <h2 id="faq-title">Perguntas frequentes</h2>
          <p className="faq-subtitle">Tudo o que você precisa saber antes de baixar.</p>
        </div>
        <div className="faq-items">
          {faqList.map(({ q, a }) => (
            <details name="natal-faq" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6. Oferta Final & Garantia */
export function FinalCTA({ price }) {
  return (
    <section className="section final-cta" id="comprar" aria-labelledby="cta-title">
      <div className="wrap final-cta-clean">
        <p className="eyebrow">Acesso digital imediato</p>
        <h2 id="cta-title">Garanta o Natal Mágico completo</h2>
        <p className="final-cta-desc">
          40 atividades + Versão Econômica + Bônus Kit Personalizado para imprimir em casa ou na escola.
        </p>

        <div className="final-cta-action">
          <p className="final-cta-price">{price}</p>
          <p className="final-cta-meta">Pagamento único · Acesso imediato no seu e-mail</p>
          <ButtonLink href={checkout} onClick={() => handleCheckout('CTA Final')} className="button button--primary button--hero">
            QUERO O NATAL MÁGICO · {price}
          </ButtonLink>
        </div>

        <div className="guarantee-badge">
          <span className="guarantee-icon" aria-hidden="true">🛡️</span>
          <p><b>Garantia incondicional de 7 dias:</b> se não gostar por qualquer motivo, receba 100% do seu dinheiro de volta.</p>
        </div>

        <div className="help-links">
          <span>Dúvidas? Fale com a Criaê:</span>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp de Suporte</a>
          <span>·</span>
          <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram @criae.online</a>
        </div>
      </div>
    </section>
  );
}

/* Rodapé */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer">
        <a className="footer-brand" href="#inicio" aria-label="Criaê, voltar ao início">
          <img src={logo} width="102" height="39" alt="Criaê" loading="lazy" decoding="async" />
        </a>
        <p className="footer-tagline">Criatividade que vira aprendizado. ✨</p>
        <div className="footer-legal">
          <p>© 2026 Criaê (@criae.online). Todos os direitos reservados.</p>
          <p>Uso pessoal e escolar liberado. Proibida revenda ou redistribuição.</p>
        </div>
      </div>
    </footer>
  );
}

/* Floating bar no Mobile */
export function MobileOffer({ price }) {
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

  if (!visible) return null;

  return (
    <aside className="mobile-offer" aria-label="Compra do Natal Mágico">
      <div>
        <strong className="mobile-price">{price}</strong>
        <p>Acesso imediato no e-mail</p>
      </div>
      <ButtonLink href={checkout} onClick={() => handleCheckout('Barra Mobile Fixa')} className="button button--primary">
        Garantir kit
      </ButtonLink>
    </aside>
  );
}

/* Componente Principal Abaixo da Dobra */
export default function BelowTheFold({ currentPrice }) {
  return (
    <>
      {/* 1. O que você recebe */}
      <WhatYouGet />

      {/* 2. Amostra real folheável */}
      <BookSample price={currentPrice} />

      {/* 3. Depoimentos reais */}
      <Testimonials />

      {/* 4. Como funciona */}
      <HowItWorks />

      {/* 5. FAQ */}
      <FAQ />

      {/* 6. Oferta final */}
      <FinalCTA price={currentPrice} />

      {/* Rodapé */}
      <Footer />

      {/* Barra de oferta mobile */}
      <MobileOffer price={currentPrice} />
    </>
  );
}
