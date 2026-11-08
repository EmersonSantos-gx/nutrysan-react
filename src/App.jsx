import { useEffect, useState } from 'react'
import Sprite from './Sprite.jsx'
import mono from './assets/monograma.png'
import gxdev from './assets/gxdev.png'
import * as D from './data.js'

const Icon = ({ n, wa }) => (
  <svg className="i" aria-hidden="true">
    <use href={`#${n}`} {...(wa ? { fill: 'currentColor', stroke: 'none' } : {})} />
  </svg>
)

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(x => {
      if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target) }
    }), { threshold: 0.15 })
    document.querySelectorAll('.rv').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useActiveSection(ids) {
  const [active, setActive] = useState('inicio')
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(x => x.isIntersecting && setActive(x.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(i => { const el = document.getElementById(i); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return active
}

function Header({ active }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const esc = e => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [])
  return (
    <>
      <header>
        <div className="wrap bar">
          <a href="#inicio" className="logo" aria-label="Nutrysan Consultoria Sanitária — início">
            <img src={mono} alt="" width="44" height="44" />
            <span><b>Nutrysan</b><small>CONSULTORIA SANITÁRIA</small></span>
          </a>
          <nav className="dk" aria-label="Principal">
            {D.NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>
            ))}
          </nav>
          <a className="btn d cta-h" href={D.WA} target="_blank" rel="noopener" aria-label="Agendar visita técnica pelo WhatsApp">
            <Icon n="wa" wa />Agendar visita técnica
          </a>
          <button className="burger" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(true)}><Icon n="menu" /></button>
        </div>
      </header>
      <div className={'ov' + (open ? ' on' : '')} onClick={() => setOpen(false)} />
      <aside className={'drawer' + (open ? ' on' : '')} aria-label="Menu">
        <button className="burger" style={{ alignSelf: 'flex-end' }} aria-label="Fechar menu" onClick={() => setOpen(false)}><Icon n="x" /></button>
        {D.NAV.map(([id, label]) => (
          <a key={id} className="l" href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="btn d" href={D.WA} target="_blank" rel="noopener" aria-label="Falar pelo WhatsApp"><Icon n="wa" wa />{D.PHONE}</a>
        <a className="btn d" href={`mailto:${D.EMAIL}`} aria-label="Enviar e-mail"><Icon n="mail" />Enviar e-mail</a>
      </aside>
    </>
  )
}

const Hero = () => (
  <section className="hero" id="inicio">
    <div className="wrap">
      <div>
        <span className="tag">CONFIANÇA • CUIDADO • SEGURANÇA</span>
        <h1>Excelência e Segurança Sanitária para Proteger e Valorizar o Seu Negócio</h1>
        <p className="sub">Consultoria especializada em adequação às normas da ANVISA e Vigilância Sanitária, implantação de Boas Práticas e controle de qualidade para serviços de alimentação e saúde.</p>
        <div className="ctas"><a className="btn s" href="#servicos">Conhecer Nossos Serviços</a></div>
      </div>
      <div className="frame">
        <div className="ck">
          <span className="eyebrow">Checklist de vistoria</span>
          <h3>Adequação às normas da Vigilância Sanitária (RDC 216 / ANVISA)</h3>
          <ul>
            {D.CHECKLIST.map(t => <li key={t}><Icon n="chk" /><span>{t}</span><em>Conforme</em></li>)}
          </ul>
          <div className="stamp"><Icon n="leaf" />Pronto para a vistoria</div>
          <small>Ilustração de checklist de vistoria sanitária.</small>
        </div>
      </div>
    </div>
  </section>
)

const Pillars = () => (
  <div className="pill">
    <div className="wrap">
      {D.PILLARS.map(([ic, t, p]) => (
        <div className="c" key={t}><h3><Icon n={ic} />{t}</h3><p>{p}</p></div>
      ))}
    </div>
  </div>
)

const Services = () => (
  <section id="servicos">
    <div className="wrap">
      <span className="eyebrow">Soluções completas</span>
      <h2>Nossos Serviços de Consultoria Sanitária</h2>
      <div className="grid g">
        {D.SERVICES.map(([ic, t, d]) => (
          <article className="card rv" key={t}>
            <div className="ic"><Icon n={ic} /></div>
            <h3>{t}</h3><p>{d}</p>
            <a className="lk" target="_blank" rel="noopener" aria-label={`Solicitar pelo WhatsApp: ${t}`}
               href={`${D.WA}?text=${encodeURIComponent(`Olá! Tenho interesse no serviço: ${t}. Podem me passar mais informações?`)}`}>
              Solicitar este serviço →
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
)

const Audience = () => (
  <section id="publico">
    <div className="wrap">
      <span className="eyebrow">Quem atendemos</span>
      <h2>Para negócios que levam a segurança a sério</h2>
      <div className="chips">
        {D.AUDIENCE.map(a => <span className="chip" key={a}><Icon n="leaf" />{a}</span>)}
      </div>
    </div>
  </section>
)

const Method = () => (
  <section id="metodologia" className="about" style={{ background: 'var(--mf)', border: 0 }}>
    <div className="wrap" style={{ display: 'block' }}>
      <span className="eyebrow">Passo a passo</span>
      <h2>Nossa Metodologia de Trabalho</h2>
      <div className="steps">
        {D.STEPS.map(([t, p], i) => (
          <div className="step" data-n={String(i + 1).padStart(2, '0')} key={t}><h3>{t}</h3><p>{p}</p></div>
        ))}
      </div>
    </div>
  </section>
)

const About = () => (
  <section className="about" id="sobre">
    <div className="wrap">
      <div className="quote rv">
        <div className="mono"><img src={mono} alt="" /></div>
        <strong>Edna Maria</strong><span>Contato técnico de referência</span>
      </div>
      <div>
        <span className="eyebrow">Sobre a consultoria</span>
        <h2>Rigor técnico com didática para quem está na operação</h2>
        <p>A Nutrysan Consultoria Sanitária une rigor científico, didática acessível para equipes operacionais e foco em resultados práticos para estabelecimentos que buscam excelência em segurança alimentar.</p>
        <p>Do diagnóstico ao monitoramento contínuo, cada projeto é conduzido com atenção aos detalhes, linguagem clara e respaldo na legislação sanitária vigente, para que sua equipe pratique, e não apenas arquive, as Boas Práticas.</p>
      </div>
    </div>
  </section>
)

const Faq = () => (
  <section id="faq">
    <div className="wrap">
      <span className="eyebrow">Dúvidas frequentes</span>
      <h2>Perguntas que recebemos com frequência</h2>
      <div className="faq">
        {D.FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </div>
  </section>
)

function Contact() {
  const [f, setF] = useState({ n: '', e: '', t: '', m: '' })
  const [err, setErr] = useState({})
  const [ok, setOk] = useState('')
  const set = k => ev => setF({ ...f, [k]: ev.target.value })

  const submit = ev => {
    ev.preventDefault()
    const digits = f.t.replace(/\D/g, '')
    const errors = {
      n: f.n.trim() ? '' : 'Informe seu nome.',
      t: digits.length >= 10 ? '' : 'Informe um telefone com DDD.',
    }
    setErr(errors)
    if (errors.n || errors.t) { setOk(''); document.querySelector(errors.n ? '[name=n]' : '[name=t]').focus(); return }
    const msg = `Olá! Meu nome é ${f.n.trim()}${f.e.trim() ? ', da empresa ' + f.e.trim() : ''}. Telefone: ${f.t.trim()}.` +
      (f.m.trim() ? ' ' + f.m.trim() : ' Gostaria de agendar um diagnóstico sanitário.')
    window.open(`${D.WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    setOk('Pronto! Abrimos o WhatsApp com a sua mensagem. Basta enviar para concluir.')
    setF({ n: '', e: '', t: '', m: '' })
  }

  return (
    <section id="contato">
      <div className="wrap">
        <div className="ct">
          <div>
            <span className="eyebrow">Fale com a Nutrysan</span>
            <h2>Vamos proteger o seu negócio?</h2>
            <p>Conte rapidamente sobre o seu estabelecimento e retornamos pelo WhatsApp para agendar o diagnóstico.</p>
          </div>
          <form onSubmit={submit} noValidate>
            <label>Nome
              <input name="n" autoComplete="name" required aria-describedby="en" value={f.n} onChange={set('n')} />
              {err.n && <em className="er" id="en" role="alert">{err.n}</em>}
            </label>
            <label>Nome da empresa
              <input name="e" autoComplete="organization" value={f.e} onChange={set('e')} />
            </label>
            <label>Telefone / WhatsApp
              <input name="t" type="tel" autoComplete="tel" required aria-describedby="et" value={f.t} onChange={set('t')} />
              {err.t && <em className="er" id="et" role="alert">{err.t}</em>}
            </label>
            <label>Mensagem
              <textarea name="m" placeholder="Ex.: Tenho uma padaria e preciso do Alvará Sanitário" value={f.m} onChange={set('m')} />
            </label>
            <button className="btn p" type="submit" style={{ width: '100%' }}><Icon n="wa" wa />Enviar pelo WhatsApp</button>
            {ok && <p className="ok" role="status" aria-live="polite">{ok}</p>}
            <p className="pv">As informações são enviadas apenas por WhatsApp para a Nutrysan e usadas somente para retornar o seu contato.</p>
          </form>
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer>
    <div className="wrap top">
      <div className="brand">
        <div className="mono"><img src={mono} alt="" style={{ width: '100%' }} /></div>
        <b>Nutrysan</b><small>CONSULTORIA SANITÁRIA</small>
        <p>Confiança • Cuidado • Segurança</p>
        <p style={{ marginTop: '.6rem', fontSize: '.85rem', opacity: 0.85 }}>CNPJ 70.009.368/0001-04</p>
      </div>
      <div>
        <h4>Navegação</h4>
        <ul>{D.NAV.map(([id, l]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ul>
      </div>
      <div>
        <h4>Atendimento</h4>
        <ul>
          <li><a href={D.IG} target="_blank" rel="noopener" aria-label={`Instagram ${D.IG_HANDLE}`}><Icon n="ig" />{D.IG_HANDLE}</a></li>
          <li><a href={D.WA} target="_blank" rel="noopener" aria-label={`WhatsApp ${D.PHONE}`}><Icon n="wa" wa />{D.PHONE}</a></li>
          <li><a href={`mailto:${D.EMAIL}`} aria-label="E-mail"><Icon n="mail" />{D.EMAIL}</a></li>
        </ul>
      </div>
    </div>
    <div className="wrap copy">
      <span>©Nutrysan Consultoria 2026. Criado com 🧠 e desenvolvido com ☕ por</span>
      <a className="gx" href={D.IG_DEV} target="_blank" rel="noopener" aria-label="Desenvolvido por GxDev — Instagram @emssantos_">
        <img src={gxdev} alt="GxDev" />
      </a>
    </div>
  </footer>
)

export default function App() {
  useReveal()
  const active = useActiveSection(D.NAV.map(n => n[0]))
  return (
    <>
      <Sprite />
      <Header active={active} />
      <main>
        <Hero /><Pillars /><Services /><Audience /><Method /><About /><Faq /><Contact />
      </main>
      <Footer />
      <a className="wa" href={D.WA} target="_blank" rel="noopener" aria-label="Falar pelo WhatsApp">
        <svg viewBox="0 0 24 24"><use href="#wa" /></svg>
      </a>
    </>
  )
}
