import { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import logoDark from '../assets/logo/revenue-logo-dark.webp';
import logoLight from '../assets/logo/revenue-logo-light.webp';
import revenueMark from '../assets/logo/revenue-mark.webp';
import heroChess from '../assets/images/hero-chess.webp';
import logoAzizon from '../assets/logos/clients/azizon.webp';
import logoPureMilky from '../assets/logos/clients/puremilky.webp';
import logoVisola from '../assets/logos/clients/visola.webp';
import logoChorvachi from '../assets/logos/clients/chorvachi.webp';
import logoMinorGroup from '../assets/logos/clients/minor-group.webp';
import logoGoldLavash from '../assets/logos/clients/gold-lavash.webp';
import logoFamilyEnglishSchool from '../assets/logos/clients/family-english-school.webp';
import logoRailCity from '../assets/logos/clients/railcity.webp';
import logoTaraqqiyot from '../assets/logos/clients/taraqqiyot.webp';
import { content } from './content';

const navTargets = ['#services', '#works', '#process', '#about', '#contact'];

const clientLogos = [
  { name: 'Azizon', src: logoAzizon, fit: 'contain' },
  { name: 'PureMilky', src: logoPureMilky, fit: 'contain' },
  { name: 'Visola', src: logoVisola, fit: 'contain' },
  { name: 'Chorvachi', src: logoChorvachi, fit: 'cover' },
  { name: 'Minor Group', src: logoMinorGroup, fit: 'cover' },
  { name: 'Gold Lavash', src: logoGoldLavash, fit: 'cover' },
  { name: 'Family English School', src: logoFamilyEnglishSchool, fit: 'cover' },
  { name: 'RailCity', src: logoRailCity, fit: 'cover' },
  { name: 'Taraqqiyot', src: logoTaraqqiyot, fit: 'cover' },
];

const worksProjects = [
  { slug: 'azizon', logo: logoAzizon, fit: 'contain' },
  { slug: 'chorvachi', logo: logoChorvachi, fit: 'cover' },
  { slug: 'rail-city', logo: logoRailCity, fit: 'cover' },
  { slug: 'visola', logo: logoVisola, fit: 'contain' },
];

function Icon({ name, size = 24, ...rest }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    ...rest,
  };

  const icons = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4Z" /></>,
    sun: <><circle cx="12" cy="12" r="3.6" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></>,
    moon: <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z" />,
    chart: <><path d="M4 19V9" /><path d="M10 19V5" /><path d="M16 19v-7" /><path d="M22 19V2" /><path d="m3 7 5-4 5 4 8-6" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M21 3 15 9" /><path d="M21 3h-5" /><path d="M21 3v5" /></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>,
    code: <><path d="m8 9-3 3 3 3" /><path d="m16 9 3 3-3 3" /><path d="m14 5-4 14" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    telegram: <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M11 13 22 2" /></>,
    menu: <><path d="M4 8h16" /><path d="M4 16h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    spark: <><path d="m12 3 1.4 4.1L18 8.5l-4.6 1.4L12 14l-1.4-4.1L6 8.5l4.6-1.4L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
  };

  return <svg {...common}>{icons[name] || icons.arrow}</svg>;
}

function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.classList.add('is-loading');
    const startedAt = performance.now();
    const duration = 1650;
    let frame;
    let doneTimer;

    const update = (now) => {
      const elapsed = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(eased * 100));
      if (elapsed < 1) {
        frame = requestAnimationFrame(update);
      } else {
        setLeaving(true);
        doneTimer = window.setTimeout(() => {
          document.body.classList.remove('is-loading');
          onDone();
        }, 850);
      }
    };

    frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(doneTimer);
      document.body.classList.remove('is-loading');
    };
  }, [onDone]);

  return (
    <div className={`preloader ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="preloader-noise" />
      <div className="preloader-grid" />
      <div className="preloader-center">
        <div className="preloader-mark"><img src={revenueMark} alt="" /></div>
        <div className="preloader-name"><span>Revenue</span><small>strategy → growth</small></div>
      </div>
      <div className="preloader-footer">
        <span>Marketing system loading</span>
        <div className="preloader-progress"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
        <strong>{String(progress).padStart(3, '0')}%</strong>
      </div>
      <div className="preloader-curtain preloader-curtain-top" />
      <div className="preloader-curtain preloader-curtain-bottom" />
    </div>
  );
}

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return undefined;
    let raf;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    const enter = () => document.documentElement.classList.add('cursor-active');
    const leave = () => document.documentElement.classList.remove('cursor-active');

    window.addEventListener('pointermove', move);
    document.querySelectorAll('a, button, input, textarea, .spotlight-card').forEach((node) => {
      node.addEventListener('pointerenter', enter);
      node.addEventListener('pointerleave', leave);
    });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
      document.querySelectorAll('a, button, input, textarea, .spotlight-card').forEach((node) => {
        node.removeEventListener('pointerenter', enter);
        node.removeEventListener('pointerleave', leave);
      });
    };
  }, []);

  return <><span className="cursor-dot" ref={dotRef} /><span className="cursor-ring" ref={ringRef} /></>;
}

function SpotlightCard({ children, className = '', ...props }) {
  const ref = useRef(null);
  const onMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    ref.current.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
    ref.current.style.setProperty('--rotate-x', `${rotateX}deg`);
    ref.current.style.setProperty('--rotate-y', `${rotateY}deg`);
  };
  const onLeave = () => {
    ref.current.style.setProperty('--rotate-x', '0deg');
    ref.current.style.setProperty('--rotate-y', '0deg');
  };
  return <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`spotlight-card ${className}`} {...props}>{children}</div>;
}

function ProjectPage({ lang, copy }) {
  const { slug } = useParams();
  const index = worksProjects.findIndex((item) => item.slug === slug);
  const project = worksProjects[index];
  const title = index >= 0 ? copy.projects[index] : slug;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <section className="section project-page">
      <div className="container project-page-inner">
        <Link className="text-link project-page-back" to="/#works">
          <Icon name="arrow" size={18} style={{ transform: 'rotate(180deg)' }} />
          {lang === 'uz' ? 'Ishlarimizga qaytish' : 'Назад к проектам'}
        </Link>

        {project ? (
          <>
            <div className="project-page-logo">
              <img src={project.logo} alt={title} className={`project-logo fit-${project.fit}`} />
            </div>
            <p className="kicker">Case study</p>
            <h1>{title}</h1>
            <p className="project-page-note">
              {lang === 'uz'
                ? 'Bu loyihaning to‘liq case-study sahifasi tez orada shu yerda joylashtiriladi.'
                : 'Полная страница кейса по этому проекту скоро появится здесь.'}
            </p>
          </>
        ) : (
          <p className="project-page-note">
            {lang === 'uz' ? 'Loyiha topilmadi.' : 'Проект не найден.'}
          </p>
        )}
      </div>
    </section>
  );
}

function App() {
  const [lang, setLang] = useState('uz');
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const heroRef = useRef(null);
  const copy = useMemo(() => content[lang], [lang]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('revenue-theme', theme);
  }, [theme]);

  useEffect(() => {
    const updateScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty('--scroll-progress', String(value));
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -40px' });

    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [lang, introDone]);

  useEffect(() => {
    const metrics = document.querySelector('.metrics');
    if (!metrics) return undefined;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      metrics.querySelectorAll('[data-count]').forEach((node) => {
        const target = Number(node.dataset.count);
        const decimal = node.dataset.decimal === 'true';
        const startedAt = performance.now();
        const duration = 1200;
        const tick = (now) => {
          const p = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          const value = target * eased;
          node.textContent = decimal ? (value / 10).toFixed(1) : Math.round(value);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(metrics);
    return () => observer.disconnect();
  }, [lang, introDone]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const onHeroMove = (event) => {
    if (!heroRef.current || !window.matchMedia('(pointer:fine)').matches) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroRef.current.style.setProperty('--hero-x', `${x * 18}px`);
    heroRef.current.style.setProperty('--hero-y', `${y * 12}px`);
    heroRef.current.style.setProperty('--hero-rx', `${y * -1.6}deg`);
    heroRef.current.style.setProperty('--hero-ry', `${x * 2.2}deg`);
  };

  const magneticMove = (event) => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.13;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.13;
    button.style.transform = `translate3d(${x}px,${y}px,0)`;
  };

  const magneticLeave = (event) => {
    event.currentTarget.style.transform = '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = [
      'Revenue sayti orqali yangi so‘rov',
      `Ism: ${data.get('name') || '-'}`,
      `Telefon: ${data.get('phone') || '-'}`,
      `Biznes: ${data.get('business') || '-'}`,
      `Maqsad: ${data.get('message') || '-'}`,
    ].join('\n');
    const status = form.querySelector('.form-status');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard is optional; Telegram still opens.
    }
    status.textContent = copy.form.status;
    window.open('https://t.me/revenueceo', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {!introDone && <Preloader onDone={() => setIntroDone(true)} />}
      <Cursor />
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />

      <header className={`site-header ${headerScrolled ? 'is-scrolled' : ''}`} id="top">
        <div className="container nav-wrap">
          <Link className="brand" to="/" aria-label="Revenue bosh sahifa">
            <img className="logo logo-on-dark" src={logoDark} alt="Revenue marketing" />
            <img className="logo logo-on-light" src={logoLight} alt="Revenue marketing" />
          </Link>

          <nav className="desktop-nav" aria-label="Asosiy navigatsiya">
            {copy.nav.map((item, index) => <Link key={item} to={`/${navTargets[index]}`}><span>{item}</span></Link>)}
          </nav>

          <div className="nav-actions">
            <div className="lang-switch" aria-label="Tilni tanlash">
              <button className={lang === 'uz' ? 'active' : ''} type="button" onClick={() => setLang('uz')}>UZ</button>
              <button className={lang === 'ru' ? 'active' : ''} type="button" onClick={() => setLang('ru')}>RU</button>
            </div>
            <button
              className="theme-toggle"
              type="button"
              aria-label="Rang rejimini almashtirish"
              aria-pressed={theme === 'light'}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Icon name="sun" size={15} />
              <span><i /></span>
              <Icon name="moon" size={14} />
            </button>
            <Link className="button button-outline desktop-cta" to="/#contact">{copy.cta}</Link>
            <button className="menu-toggle" type="button" aria-label="Menyuni ochish" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-noise" />
        <div className="mobile-menu-inner">
          <span className="mobile-menu-label">Revenue / Menu</span>
          <nav>
            {copy.nav.map((item, index) => (
              <Link key={item} to={`/${navTargets[index]}`} onClick={() => setMenuOpen(false)}>
                <small>0{index + 1}</small><span>{item}</span><Icon name="arrow" size={22} />
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <a href="https://instagram.com/revenue_uz" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://t.me/revenueceo" target="_blank" rel="noreferrer">Telegram</a>
          </div>
        </div>
      </div>

      <main id="main" className={introDone ? 'site-ready' : ''}>
      <Routes>
        <Route path="/works/:slug" element={<ProjectPage lang={lang} copy={copy} />} />
        <Route path="/" element={(
          <>
        <section className="hero" ref={heroRef} onPointerMove={onHeroMove} aria-labelledby="hero-title">
          <div className="hero-background" style={{ backgroundImage: `url(${heroChess})` }} />
          <div className="hero-overlay" />
          <div className="hero-noise" />
          <div className="hero-ambient hero-ambient-one" />
          <div className="hero-ambient hero-ambient-two" />

          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="hero-eyebrow hero-enter hero-enter-1"><span><Icon name="spark" size={15} /></span>{copy.heroEyebrow}</div>
              <h1 id="hero-title" className="hero-title">
                <span className="title-line hero-enter hero-enter-2">{copy.heroTitle[0]}</span>
                <span className="title-line title-gold hero-enter hero-enter-3">{copy.heroTitle[1]}</span>
                <span className="title-line hero-enter hero-enter-4">{copy.heroTitle[2]}<em>.</em></span>
              </h1>
              <p className="hero-text hero-enter hero-enter-5">{copy.heroText}</p>
              <div className="hero-actions hero-enter hero-enter-6">
                <a className="button button-primary magnetic" href="#contact" onPointerMove={magneticMove} onPointerLeave={magneticLeave}>{copy.heroPrimary}<Icon name="arrow" size={19} /></a>
                <a className="button button-glass" href="#works"><Icon name="play" size={19} />{copy.heroSecondary}</a>
              </div>
              <div className="trust-row hero-enter hero-enter-7">
                <div className="trust-circles"><span>R</span><span>M</span><span>A</span></div>
                <p><b>{copy.trust}</b><small>{copy.trustSub}</small></p>
              </div>
            </div>

            <div className="hero-side" aria-hidden="true">
              <div className="hero-coordinates"><span>41.2995° N</span><span>69.2401° E</span></div>
              <div className="float-card float-card-one"><small>{lang === 'uz' ? 'Yondashuv' : 'Подход'}</small><strong>{lang === 'uz' ? 'Strategik yurish' : 'Стратегический ход'}</strong></div>
              <div className="float-card float-card-two"><small>{lang === 'uz' ? 'Maqsad' : 'Цель'}</small><strong>{lang === 'uz' ? 'Barqaror o‘sish' : 'Стабильный рост'}</strong></div>
            </div>
          </div>

          <div className="hero-scroll"><span>{lang === 'uz' ? 'Pastga' : 'Ниже'}</span><i /></div>

          <div className="container metrics" data-reveal>
            {copy.stats.map((item, index) => (
              <article key={item.label}>
                <span className="metric-index">0{index + 1}</span>
                <div className="metric-value">{item.prefix}<b data-count={item.value} data-decimal={item.decimal || false}>0</b><em>{item.suffix}</em></div>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
          <p className="metrics-note container">{copy.demo}</p>
        </section>

        <section className="marquee-section" aria-label="Revenue xizmatlari">
          <div className="marquee-track">
            {[...copy.marquee, ...copy.marquee].map((item, index) => <span key={`${item}-${index}`}><i>✦</i>{item}</span>)}
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div><p className="kicker">{copy.servicesKicker}</p><h2>{copy.servicesTitle[0]} <em>{copy.servicesTitle[1]}</em></h2></div>
              <p>{copy.servicesDesc}</p>
            </div>

            <div className="services-grid">
              {copy.services.map((service, index) => (
                <SpotlightCard className="service-card" key={service.title} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                  <div className="service-top"><span>0{index + 1}</span><i><Icon name={service.icon} size={28} /></i></div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a href="#contact"><span>{lang === 'uz' ? 'Batafsil' : 'Подробнее'}</span><Icon name="arrow" size={18} /></a>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section works-section" id="works">
          <div className="container">
            <div className="section-heading section-heading-light" data-reveal>
              <div><p className="kicker">{copy.worksKicker}</p><h2>{copy.worksTitle[0]}<br /><em>{copy.worksTitle[1]}</em></h2></div>
              <p>{copy.worksDesc}</p>
            </div>

            <div className="works-grid">
              {copy.projects.slice(0, 4).map((project, index) => {
                const item = worksProjects[index];
                return (
                  <article className={`project-card ${index === 0 ? 'project-card-wide' : ''}`} key={project} data-reveal>
                    <Link className="project-visual" to={`/works/${item.slug}`}>
                      <img src={item.logo} alt={project} className={`project-logo fit-${item.fit}`} />
                      <span className="project-number">0{index + 1}</span>
                      <span className="project-hover"><span>{lang === 'uz' ? 'Loyihani ko‘rish' : 'Смотреть проект'}</span><Icon name="arrow" size={21} /></span>
                    </Link>
                    <div className="project-copy"><div><small>Strategy / Creative / Digital</small><h3>{project}</h3></div><span>2026</span></div>
                  </article>
                );
              })}
            </div>

            <p className="clients-label" data-reveal>{copy.clientsLabel}</p>
            <div className="client-logos-marquee" data-reveal>
              <div className="client-logos-track">
                {[...clientLogos, ...clientLogos].map((client, index) => (
                  <div className={`client-logo-card ${client.fit === 'contain' ? 'is-badge' : ''}`} key={`${client.name}-${index}`}>
                    <img src={client.src} alt={client.name} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="container process-grid">
            <div className="process-intro" data-reveal>
              <p className="kicker">{copy.processKicker}</p>
              <h2>{copy.processTitle[0]}<br /><em>{copy.processTitle[1]}</em></h2>
              <p>{copy.processDesc}</p>
              <a className="text-link" href="#contact">{copy.processCta}<Icon name="arrow" size={18} /></a>
              <div className="process-compass" aria-hidden="true"><span>R</span><i /><b>01—04</b></div>
            </div>

            <ol className="process-list">
              {copy.process.map((step, index) => (
                <li key={step[0]} data-reveal>
                  <div className="process-number"><span>0{index + 1}</span><i /></div>
                  <div><h3>{step[0]}</h3><p>{step[1]}</p></div>
                  <Icon name="arrow" size={22} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-stage" data-reveal>
              <div className="about-stage-glow" />
              <div className="about-orbit about-orbit-one" />
              <div className="about-orbit about-orbit-two" />
              <img src={revenueMark} alt="Revenue belgisi" />
              <div className="about-chip about-chip-one"><span>01</span>Strategy</div>
              <div className="about-chip about-chip-two"><span>02</span>Growth</div>
              <div className="about-chip about-chip-three"><span>03</span>Revenue</div>
              <p>{copy.quote}</p>
            </div>

            <div className="about-copy" data-reveal>
              <p className="kicker">{copy.aboutKicker}</p>
              <h2>{copy.aboutTitle[0]} <em>{copy.aboutTitle[1]}</em> {copy.aboutTitle[2]}</h2>
              <p>{copy.aboutText}</p>
              <div className="about-points">
                {copy.aboutPoints.map((point, index) => <div key={point}><span><Icon name="check" size={16} /></span><b>0{index + 1}</b><p>{point}</p></div>)}
              </div>
              <div className="signature">Revenue <span>marketing system</span></div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-shell" data-reveal>
            <div className="contact-aura" />
            <div className="contact-copy">
              <p className="kicker">{copy.contactKicker}</p>
              <h2>{copy.contactTitle}</h2>
              <p>{copy.contactDesc}</p>
              <div className="contact-links">
                <a href="https://t.me/revenueceo" target="_blank" rel="noreferrer"><Icon name="telegram" size={19} />@revenueceo</a>
                <a href="https://instagram.com/revenue_uz" target="_blank" rel="noreferrer"><Icon name="instagram" size={19} />@revenue_uz</a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label><span>{copy.form.name}</span><input name="name" type="text" placeholder={lang === 'uz' ? 'Ismingizni kiriting' : 'Введите имя'} required /></label>
              <label><span>{copy.form.phone}</span><input name="phone" type="tel" placeholder="+998 90 000 00 00" required /></label>
              <label><span>{copy.form.business}</span><input name="business" type="text" placeholder={lang === 'uz' ? 'Masalan: qurilish' : 'Например: строительство'} /></label>
              <label className="form-full"><span>{copy.form.message}</span><textarea name="message" rows="4" placeholder={lang === 'uz' ? 'Loyiha haqida qisqacha...' : 'Коротко о проекте...'} /></label>
              <button className="button button-dark form-full magnetic" type="submit" onPointerMove={magneticMove} onPointerLeave={magneticLeave}>{copy.form.send}<Icon name="arrow" size={19} /></button>
              <p className="form-status form-full" aria-live="polite" />
            </form>
          </div>
        </section>
          </>
        )} />
      </Routes>
      </main>

      <footer className="footer">
        <div className="container footer-top">
          <Link className="brand" to="/"><img className="logo logo-on-dark" src={logoDark} alt="Revenue" /><img className="logo logo-on-light" src={logoLight} alt="Revenue" /></Link>
          <p>{copy.footer}</p>
          <div><a href="https://instagram.com/revenue_uz" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://t.me/revenueceo" target="_blank" rel="noreferrer">Telegram ↗</a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Revenue Marketing.</span><span>{copy.rights}</span><Link to="/#top">Top ↑</Link></div>
      </footer>
    </>
  );
}

export default App;
