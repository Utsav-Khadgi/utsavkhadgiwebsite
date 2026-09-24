
(function () {
    const PROJECTS = [
        {
            tag: "Final Year Project · First Class Honours",
            title: "Mermat Sewa",
            desc: "A full-featured ASP.NET MVC system for running a local automobile workshop end to end — job cards, inventory, billing. Built as a final year project, with a real-world launch on the horizon.",
            stack: "C# · ASP.NET MVC · SQL Server",
            image: "../ig/Bhelu.jpeg",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94L14.7 6.3z"/></svg>'
        },
        {
            tag: "Freelance · Live",
            title: "S.K. Auto Workshop",
            desc: "A commissioned site for a family-run automobile workshop at skautoworkshop.com.np — taken from brief to deployment as a paid freelance project.",
            stack: "HTML · CSS · JavaScript",
            image: "../ig/Current Kumari Nepal.jpeg",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13l1.5-4.5A2 2 0 016.4 7h11.2a2 2 0 011.9 1.5L21 13m-18 0v5a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-5m-18 0h18M6.5 16h.01M17.5 16h.01"/></svg>'
        },
        {
            tag: "In Development",
            title: "Garage Parking App",
            desc: "An early-stage parking management app for garage operations — taking shape alongside the workshop tools it's designed to sit next to.",
            stack: "C# · ASP.NET Core",
            image: "images/garage-parking-app.jpg",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17V7h4.5a3 3 0 010 6H9m9 4V7m-9 10h9M4 20h16"/></svg>'
        },
        {
            tag: "Cultural Heritage",
            title: "Indra Jatra Hub",
            desc: "A black-and-white, premium tourism-style countdown page for Indra Jatra — the first piece of a growing hub covering Newari festivals.",
            stack: "HTML · CSS · JavaScript",
            image: "images/indra-jatra.jpg",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3l2.6 5.27L20 9.27l-4 3.9.94 5.5L12 16.5l-4.94 2.17L8 13.17l-4-3.9 5.4-1z"/></svg>'
        }
    ];

    const CYCLE_MS = 5500;

    const hero = document.getElementById('hero');
    const heroIcon = document.getElementById('heroIcon');
    const thumbs = document.getElementById('thumbs');
    const progressFill = document.getElementById('progressFill');
    const counter = document.getElementById('counter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function loadImageInto(container, src, alt) {
        const fallback = document.createElement('div');
        fallback.className = 'fallback';
        container.appendChild(fallback);
        if (!src) return;
        const img = document.createElement('img');
        img.alt = alt;
        img.loading = 'lazy';
        img.addEventListener('load', () => img.classList.add('is-loaded'));
        img.addEventListener('error', () => img.remove()); // keep the fallback pattern if the file is missing
        img.src = src;
        container.appendChild(img);
    }

    // build hero background media: a permanent fallback pattern plus one <img>
    // whose src is swapped on every render() call
    const heroMedia = document.createElement('div');
    heroMedia.className = 'hero-media';
    hero.insertBefore(heroMedia, hero.firstChild);
    const heroFallback = document.createElement('div');
    heroFallback.className = 'fallback';
    heroMedia.appendChild(heroFallback);
    const heroImg = document.createElement('img');
    heroImg.loading = 'eager';
    heroImg.addEventListener('load', () => heroImg.classList.add('is-loaded'));
    heroImg.addEventListener('error', () => heroImg.classList.remove('is-loaded'));
    heroMedia.appendChild(heroImg);

    // build hero layers
    PROJECTS.forEach((p, i) => {
        const layer = document.createElement('div');
        layer.className = 'hero-layer';
        layer.id = 'layer-' + i;
        layer.innerHTML =
            '<div class="index mono">Project ' + String(i + 1).padStart(2, '0') + ' / ' + String(PROJECTS.length).padStart(2, '0') + '</div>' +
            '<div class="tag">' + p.tag + '</div>' +
            '<h1>' + p.title + '</h1>' +
            '<p>' + p.desc + '</p>' +
            '<div class="stack">' + p.stack + '</div>';
        hero.appendChild(layer);
    });

    // build thumbnails (each with its own small image)
    PROJECTS.forEach((p, i) => {
        const btn = document.createElement('button');
        btn.className = 'thumb';
        btn.type = 'button';
        const media = document.createElement('div');
        media.className = 'thumb-media';
        loadImageInto(media, p.image, p.title);
        btn.appendChild(media);
        const idx = document.createElement('div');
        idx.className = 't-index mono';
        idx.textContent = String(i + 1).padStart(2, '0');
        const title = document.createElement('div');
        title.className = 't-title';
        title.textContent = p.title;
        btn.appendChild(idx);
        btn.appendChild(title);
        btn.addEventListener('click', () => goTo(i, true));
        thumbs.appendChild(btn);
    });

    const layers = Array.from(document.querySelectorAll('.hero-layer'));
    const thumbEls = Array.from(document.querySelectorAll('.thumb'));

    let active = 0;
    let timerId = null;
    let progressStart = 0;
    let rafId = null;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function render() {
        layers.forEach((l, i) => l.classList.toggle('is-active', i === active));
        thumbEls.forEach((t, i) => t.classList.toggle('is-active', i === active));
        heroIcon.innerHTML = PROJECTS[active].icon;
        counter.textContent = String(active + 1).padStart(2, '0') + ' / ' + String(PROJECTS.length).padStart(2, '0');

        heroImg.classList.remove('is-loaded');
        const src = PROJECTS[active].image;
        if (src) {
            heroImg.alt = PROJECTS[active].title;
            heroImg.src = src;
        } else {
            heroImg.removeAttribute('src');
        }
    }

    function goTo(i, manual) {
        active = (i + PROJECTS.length) % PROJECTS.length;
        render();
        if (manual) restartTimer();
    }

    function next() { goTo(active + 1); }
    function prev() { goTo(active - 1, true); }

    function tickProgress(ts) {
        if (!progressStart) progressStart = ts;
        const pct = Math.min(1, (ts - progressStart) / CYCLE_MS);
        progressFill.style.width = (pct * 100) + '%';
        if (pct < 1) {
            rafId = requestAnimationFrame(tickProgress);
        } else {
            next();
            restartTimer();
        }
    }

    function restartTimer() {
        if (rafId) cancelAnimationFrame(rafId);
        progressStart = 0;
        progressFill.style.width = '0%';
        if (!reduceMotion) rafId = requestAnimationFrame(tickProgress);
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', () => goTo(active + 1, true));

    document.querySelector('main').addEventListener('mouseenter', () => { if (rafId) cancelAnimationFrame(rafId); });
    document.querySelector('main').addEventListener('mouseleave', () => { if (!reduceMotion) restartTimer(); });

    render();
    if (!reduceMotion) restartTimer();

    // intro sequence
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('cover').classList.add('is-open');
            document.getElementById('nav').classList.add('is-in');
            document.getElementById('stage').classList.add('is-in');
            document.getElementById('footer').classList.add('is-in');
        }, reduceMotion ? 0 : 300);
    });
})();

