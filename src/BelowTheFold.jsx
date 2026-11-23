import React, { useRef, useState, useEffect } from 'react';
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
import { handleCheckout, ButtonLink, checkout, instagram, whatsapp, offerPrice } from './shared.jsx';

const samplePages = [
  { title: 'Capa', image: page1 },
  { title: 'Guia do adulto', image: page2 },
  { title: 'Mapa das atividades', image: page3 },
  { title: 'Calendário de Advento', image: page4 },
  { title: 'A Turma do Natal', image: page5 },
  { title: 'Meu Globo de Natal', image: page6 },
];

const charactersList = [
  {
    name: 'Estrelina',
    role: 'A estrela curiosa',
    desc: 'Adora iluminar novas descobertas e guiar as brincadeiras mais criativas.',
    badgeColor: '#e07a24',
    bgLight: '#fff6ec',
    initial: '⭐',
  },
  {
    name: 'Flocão',
    role: 'O boneco de neve que adora o verão',
    desc: 'Bem-humorado e caloroso, adora passar o Natal debaixo da sombra de uma palmeira.',
    badgeColor: '#2b84ba',
    bgLight: '#f0f8fd',
    initial: '⛄',
  },
  {
    name: 'Canelinha',
    role: 'O biscoito valente',
    desc: 'Alegre e corajoso, está sempre pronto para animar qualquer desafio ou jogo.',
    badgeColor: '#964823',
    bgLight: '#faf1ea',
    initial: '🍪',
  },
  {
    name: 'Fagulha',
    role: 'A luzinha inquieta',
    desc: 'Pequena e cheia de energia, não para quieta enquanto houver imaginação no ar.',
    badgeColor: '#c72b2b',
    bgLight: '#fdf0f0',
    initial: '✨',
  },
];

const faqList = [
  {
    q: 'Como recebo o material?',
    a: 'O material é 100% digital. Assim que o pagamento for confirmado (no Pix é imediato), você recebe os links de download direto no seu e-mail para baixar todos os arquivos em PDF em alta resolução. Nenhum produto físico é enviado pelos Correios.',
  },
  {
    q: 'Posso imprimir mais de uma vez?',
    a: 'Sim! Sua licença de uso pessoal permite que você imprima quantas cópias forem necessárias para as crianças da sua família ou para seus alunos em sala de aula.',
  },
  {
    q: 'Funciona no celular?',
    a: 'Sim. Os arquivos estão no formato padrão PDF, compatível com celular, tablet e computador.',
  },
  {
    q: 'Como digitar o nome da criança no kit personalizado?',
    a: 'Digite o nome no computador ou no celular com o Adobe Acrobat Reader. Se o seu leitor não permitir digitar, imprima em branco e escreva à mão.',
  },
  {
    q: 'Qual tipo de papel devo usar?',
    a: 'Você pode usar o papel sulfite comum A4 (75 g/m²). Para o globo 3D, os fantoches e os marcadores de lugar ficarem mais firmes, recomendamos papéis com gramatura de 90 a 120 g/m².',
  },
  {
    q: 'Qual é a idade indicada e quais os cuidados de segurança?',
    a: 'Indicado para crianças de 3 a 8 anos. Por segurança: um adulto deve acompanhar tesoura e cola; recomendamos que o adulto recorte as peças para menores de 5 anos; as peças pequenas não são indicadas para menores de 3 anos.',
  },
  {
    q: 'Posso usar na escola com meus alunos?',
    a: 'Sim! A licença de uso autoriza você a imprimir quantas cópias precisar para atividades presenciais com a sua turma de alunos.',
  },
  {
    q: 'Posso compartilhar ou revender o material?',
    a: 'Não. O material é protegido por direitos autorais e tem licença para uso pessoal em casa ou em sala de aula do comprador. É proibido revender, compartilhar em grupos de WhatsApp/Telegram, drives ou redistribuir os arquivos.',
  },
];

/* 2. Para quem é */
export function ForWho() {
  return (
    <section className="section for-who" aria-labelledby="for-who-title">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">Para quem é</p>
          <h2 id="for-who-title">O Natal Mágico é para você se…</h2>
        </div>
        <ul className="for-who-list">
          <li>Quer entreter as crianças com algo educativo nas férias, sem telas</li>
          <li>Precisa de atividades prontas, sem perder horas no Pinterest</li>
          <li>Quer montar um calendário do Advento sem comprar kits caros</li>
          <li>É professora e precisa de material temático para a turma</li>
          <li>Quer criar memórias de Natal com as crianças, não só dar presentes</li>
        </ul>
      </div>
    </section>
  );
}

/* 3. O que você recebe */
export function WhatYouGet({ price }) {
  return (
    <section className="section what-you-get" id="o-que-recebe" aria-labelledby="what-you-get-title">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">O que você recebe</p>
          <h2 id="what-you-get-title">Tudo o que vem no seu acesso digital</h2>
          <p>São 3 materiais completos em formato PDF prontos para imprimir em folha A4 comum:</p>
        </div>

        <div className="packages-grid">
          {/* Card 1 */}
          <article className="package-card package-card--featured">
            <div className="package-card-header">
              <span className="package-badge">Material Principal</span>
              <h3>1. Natal Mágico Completo</h3>
              <p className="package-highlight">40 atividades em PDF A4</p>
            </div>
            <ul className="package-features">
              <li><b>40 atividades interativas:</b> globo de papel 3D, fantoches da Turma do Natal, jogo da memória, contagem, ligue os pontos, sombras, labirintos, o que mudou na ceia, cartinha ao Papai Noel, cartão interativo "Um abraço de papel", certificado e cenas do Natal brasileiro para colorir.</li>
              <li><b>Calendário de Advento:</b> 1 a 24 de dezembro, com uma atividade especial por dia.</li>
              <li><b>Guia do adulto:</b> orientações práticas de montagem e segurança.</li>
              <li><b>Mapa das atividades:</b> com tempo estimado e habilidade em destaque.</li>
              <li><b>Gabarito:</b> respostas e soluções de todos os jogos incluídos.</li>
            </ul>
          </article>

          {/* Card 2 */}
          <article className="package-card">
            <div className="package-card-header">
              <span className="package-badge package-badge--green">Economia de Tinta</span>
              <h3>2. Versão Econômica</h3>
              <p className="package-highlight">24 páginas em traço P&B</p>
            </div>
            <ul className="package-features">
              <li><b>24 páginas exclusivas para colorir:</b> traços limpos em preto e branco.</li>
              <li><b>Gasta menos tinta:</b> desenhado especificamente para quem quer economizar na impressão.</li>
              <li><b>Impressões ilimitadas:</b> ideal para imprimir cópias extras para vários irmãos ou alunos da escola.</li>
            </ul>
          </article>

          {/* Card 3 */}
          <article className="package-card package-card--bonus">
            <div className="package-card-header">
              <span className="package-badge package-badge--purple">Bônus Exclusivo</span>
              <h3>3. Kit Personalizado do Natal</h3>
              <p className="package-highlight">12 páginas personalizáveis</p>
            </div>
            <ul className="package-features">
              <li><b>Molduras de rosto:</b> Turma do Natal para montar uma divertida cabine de fotos.</li>
              <li><b>Etiquetas de presente:</b> tags natalinas prontas para identificar os presentes da família.</li>
              <li><b>Marcadores de livro:</b> lembrancinhas temáticas para recortar e usar.</li>
              <li><b>Cartões de lugar da ceia:</b> identifique o lugar de cada familiar na mesa de Natal.</li>
              <li><b>Cartinha & Certificado:</b> carta ao Papai Noel e Certificado de Ajudante Oficial do Papai Noel.</li>
            </ul>
            <div className="bonus-notice">
              <span aria-hidden="true">💡</span>
              <p><b>Como preencher:</b> Digite o nome no computador ou no celular com o Adobe Acrobat Reader. Se o seu leitor não permitir digitar, imprima em branco e escreva à mão.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* Amostra real folheável */
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
          <p className="eyebrow">Folheie uma amostra</p>
          <h2 id="preview-title">Veja como o material é por dentro</h2>
          <p>Imprima em A4 e comece em 5 minutos. Todas as páginas vêm com diagramação limpa, traços nítidos e instruções amigáveis.</p>
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
                  <p className="eyebrow">Amostra concluída</p>
                  <h3>Quer acessar as outras 34 atividades?</h3>
                  <p>O kit completo traz o calendário de Advento, a Turma do Natal para fantoches, jogos de memória, labirintos, versão econômica e o bônus personalizado.</p>
                  <ButtonLink href={checkout} onClick={() => handleCheckout('Leitor')}>QUERO O NATAL MÁGICO POR {price}</ButtonLink>
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
            <p>{isLocked ? 'Amostra finalizada' : 'Clique na página para ampliar'}</p>
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

/* 4. Conheça a Turma do Natal */
export function Characters() {
  return (
    <section className="section characters-section" id="personagens" aria-labelledby="characters-title">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">Personagens originais</p>
          <h2 id="characters-title">Conheça a Turma do Natal</h2>
          <p>Quatro amigos especiais que acompanham a criança nas histórias, jogos e fantoches do material:</p>
        </div>
        <div className="characters-grid">
          {charactersList.map((c) => (
            <article key={c.name} className="character-card" style={{ '--accent-color': c.badgeColor, '--accent-bg': c.bgLight }}>
              <div className="character-avatar" aria-hidden="true">
                <span className="character-icon">{c.initial}</span>
              </div>
              <div className="character-info">
                <h3>{c.name}</h3>
                <p className="character-role">{c.role}</p>
                <p className="character-desc">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5. Natal com cara de Brasil */
export function BrazilianChristmas() {
  return (
    <section className="section brazilian-section" aria-labelledby="brazilian-title">
      <div className="wrap brazilian-box">
        <div className="brazilian-copy">
          <p className="eyebrow">Diferencial exclusivo</p>
          <h2 id="brazilian-title">Natal com cara de Brasil</h2>
          <p className="brazilian-lead">
            Aqui não tem neve falsa nem renas de frio polar. O Natal Mágico foi criado para a nossa realidade.
          </p>
          <p>
            Tem boneco de neve que adora o calor, Natal no quintal com rede e palmeiras, panetone na mesa, ceia alegre em família e presépio. Um Natal com afeto, calor e a nossa identidade cultural.
          </p>
        </div>
        <div className="brazilian-highlights">
          <div className="highlight-pill">🌴 Natal no quintal com rede</div>
          <div className="highlight-pill">☀️ Boneco de neve que ama o calor</div>
          <div className="highlight-pill">🍞 Panetone e ceia em família</div>
          <div className="highlight-pill">✨ Presépio e memórias afetivas</div>
        </div>
      </div>
    </section>
  );
}

/* 6. Como funciona */
export function HowItWorks() {
  return (
    <section className="section how-it-works" id="como-funciona" aria-labelledby="how-it-works-title">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">Passo a passo</p>
          <h2 id="how-it-works-title">Como funciona? É simples e direto</h2>
          <p>Sem espera por frete e sem complicações. Em 3 passos você começa:</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Compre e baixe</h3>
            <p>Pagamento seguro no Pix ou cartão. O acesso aos arquivos em PDF chega imediatamente no seu e-mail.</p>
          </div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Imprima em A4 em tamanho real</h3>
            <p>Imprima em casa ou em gráfica rápida, em folhas A4 comuns (sulfite 75g) ou 90 a 120 g/m² para montagens mais firmes.</p>
          </div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Escolha a atividade do dia</h3>
            <p>Separe tesoura sem ponta, cola e lápis de cor. Sem complicação: comece em 5 minutos!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 7. Calendário de Advento */
export function AdventCalendar() {
  return (
    <section className="section advent-section" id="advento" aria-labelledby="advent-title">
      <div className="wrap advent-box">
        <div className="advent-copy">
          <p className="eyebrow">1 a 24 de dezembro</p>
          <h2 id="advent-title">Calendário de Advento: uma atividade por dia</h2>
          <p>
            O Calendário de Advento já vem <b>incluso dentro do Natal Mágico Completo</b>, sem custo adicional.
          </p>
          <p>
            São 24 atividades planejadas para acompanhar a contagem regressiva até a véspera de Natal. Cada dia reserva um momento de brincadeira, conexão e afeto em família, ajudando a diminuir a ansiedade das crianças de forma leve e divertida.
          </p>
        </div>
        <div className="advent-badge-wrap">
          <div className="advent-seal">
            <span className="advent-seal-number">24</span>
            <span className="advent-seal-text">DIAS DE<br />ATIVIDADES</span>
          </div>
          <p className="advent-seal-note">Incluso no kit Completo</p>
        </div>
      </div>
    </section>
  );
}

/* 8. Para professores */
export function ForTeachers() {
  return (
    <section className="section teachers-section" id="professores" aria-labelledby="teachers-title">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">Educação infantil e anos iniciais</p>
          <h2 id="teachers-title">Feito também para a sala de aula</h2>
          <p>Educadores encontram um material estruturado e pronto para usar com seus alunos:</p>
        </div>
        <div className="teachers-grid">
          <article className="teacher-card">
            <span className="teacher-card-icon" aria-hidden="true">🏫</span>
            <h3>Impressão autorizada para a turma</h3>
            <p>Sua licença de uso pessoal autoriza imprimir quantas cópias forem necessárias para realizar as atividades presenciais com os alunos da sua sala de aula.</p>
          </article>
          <article className="teacher-card">
            <span className="teacher-card-icon" aria-hidden="true">🗺️</span>
            <h3>Mapa das atividades organizado</h3>
            <p>Contém o tempo estimado de execução e a habilidade trabalhada em cada uma das 40 atividades para facilitar seu planejamento de aula.</p>
          </article>
          <article className="teacher-card">
            <span className="teacher-card-icon" aria-hidden="true">🎨</span>
            <h3>Nota pedagógica da BNCC</h3>
            <p>No guia da sala de aula, o material cita que <i>desenhar, pintar e colar aos 4 e 5 anos favorece a expressão livre (código EI03TS02)</i>.</p>
          </article>
          <article className="teacher-card">
            <span className="teacher-card-icon" aria-hidden="true">🖨️</span>
            <h3>Versão Econômica para poupar tinta</h3>
            <p>Acompanha 24 páginas em traço preto e branco, pensadas especialmente para impressão de muitas cópias na escola com máxima economia de tinta.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* 9. FAQ */
export function FAQ() {
  return (
    <section className="section faq" id="duvidas" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div>
          <p className="eyebrow">Dúvidas comuns</p>
          <h2 id="faq-title">Perguntas frequentes</h2>
          <p className="faq-subtitle">Tudo o que você precisa saber antes de imprimir.</p>
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

/* 10. CTA Final & Garantia */
export function FinalCTA({ price }) {
  return (
    <section className="section final-cta" id="comprar" aria-labelledby="cta-title">
      <div className="wrap final-cta-box">
        <div className="final-cta-copy">
          <p className="eyebrow">Acesso digital imediato</p>
          <h2 id="cta-title">Garanta o Natal Mágico hoje</h2>
          <p className="final-cta-desc">
            Imprima em A4 e comece em 5 minutos. Natal sem tela, sem preparação.
          </p>
          <ul className="checklist">
            <li><b>Natal Mágico Completo:</b> 40 atividades interativas + Calendário de Advento</li>
            <li><b>Versão Econômica:</b> 24 páginas para colorir e economizar tinta</li>
            <li><b>Bônus Kit Personalizado:</b> 12 páginas com o nome da criança</li>
            <li><b>Guia do adulto</b> com orientações e mapa com tempo e habilidade</li>
            <li><b>Licença de uso pessoal:</b> imprima quantas cópias precisar em casa ou na escola</li>
          </ul>
        </div>
        <div className="final-cta-card">
          <p className="cta-plan-label">Pagamento único</p>
          <p className="cta-price">{price}</p>
          <p className="cta-meta">Acesso para baixar e imprimir quantas vezes quiser</p>
          <ButtonLink href={checkout} onClick={() => handleCheckout('Bloco Oferta Final')} className="button button--primary button--hero">
            QUERO O NATAL MÁGICO · {price}
          </ButtonLink>
          <p className="cta-delivery">Entrega imediata no seu e-mail após a confirmação</p>
          
          <div className="guarantee-compact">
            <span className="guarantee-seal" aria-hidden="true">7</span>
            <div>
              <strong>Garantia incondicional de 7 dias</strong>
              <p>Experimente com a sua família. Se não gostar, solicite o reembolso integral em até 7 dias.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap help-contact">
        <p>Ficou com alguma dúvida? Fale com a Criaê:</p>
        <div className="help-buttons">
          <ButtonLink href={whatsapp} variant="green" target="_blank" rel="noopener noreferrer">WhatsApp de Suporte</ButtonLink>
          <ButtonLink href={instagram} variant="quiet" target="_blank" rel="noopener noreferrer">Instagram @criae.online</ButtonLink>
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
        <p className="footer-description">Atividades educativas, materiais criativos e experiências para aprender brincando.</p>
        <nav className="footer-links" aria-label="Contato da Criaê">
          <a href={instagram} target="_blank" rel="noopener noreferrer">@criae.online</a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">Suporte via WhatsApp</a>
        </nav>
        <div className="footer-legal">
          <p>© 2026 Criaê. Todos os direitos reservados.</p>
          <p>Uso pessoal e em sala de aula. É proibido revender, compartilhar ou redistribuir os arquivos.</p>
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
        <div className="mobile-offer-prices">
          <strong>{price}</strong>
        </div>
        <p>Pagamento único · Acesso imediato</p>
      </div>
      <ButtonLink href={checkout} onClick={() => handleCheckout('Barra Mobile Fixa')} className="button button--primary">
        Garantir agora
      </ButtonLink>
    </aside>
  );
}

/* Componente Principal Abaixo da Dobra */
export default function BelowTheFold({ currentPrice }) {
  return (
    <>
      {/* 2. Para quem é */}
      <ForWho />

      {/* 3. O que você recebe */}
      <WhatYouGet price={currentPrice} />

      {/* Amostra real folheável */}
      <BookSample price={currentPrice} />

      {/* 4. Conheça a Turma do Natal */}
      <Characters />

      {/* 5. Natal com cara de Brasil */}
      <BrazilianChristmas />

      {/* 6. Como funciona */}
      <HowItWorks />

      {/* 7. Calendário de Advento */}
      <AdventCalendar />

      {/* 8. Para professores */}
      <ForTeachers />

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. CTA Final */}
      <FinalCTA price={currentPrice} />

      {/* Rodapé */}
      <Footer />

      {/* Barra de oferta mobile */}
      <MobileOffer price={currentPrice} />
    </>
  );
}
