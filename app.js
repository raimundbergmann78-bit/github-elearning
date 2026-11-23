(() => {
  "use strict";

  const STORAGE_KEY = "git-elearning-progress-v1";
  const content = document.getElementById("content");
  const sidebar = document.getElementById("sidebar");
  const modules = COURSE.modules;

  // ---------- Fortschritt ----------
  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { modules: {}, final: null };
    } catch {
      return { modules: {}, final: null };
    }
  }
  let progress = loadProgress();
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  const modState = (id) => (progress.modules[id] ||= { quizBest: 0, terminalDone: false });
  const isPassed = (score) => score >= COURSE.passScore;
  const moduleDone = (m) => isPassed(progress.modules[m.id]?.quizBest || 0);

  function updateProgressBar() {
    const total = modules.length + 1; // + Abschlusstest
    const done = modules.filter(moduleDone).length + (progress.final && isPassed(progress.final.score) ? 1 : 0);
    const pct = Math.round((done / total) * 100);
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("progress-text").textContent = pct + " %";
  }

  // ---------- Hilfsfunktionen ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Antwortoptionen mischen, richtigen Index mitführen
  function shuffleQuestion(q) {
    const order = shuffle(q.options.map((_, i) => i));
    return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
  }

  // ---------- Navigation ----------
  function renderSidebar(activeRoute) {
    const items = modules.map((m, i) => {
      const route = `#/m/${m.id}`;
      const status = moduleDone(m) ? "✅" : m.icon;
      return `<li><a href="${route}" class="${activeRoute.startsWith(`/m/${m.id}`) || activeRoute.startsWith(`/q/${m.id}`) ? "active" : ""}">
        <span class="status">${status}</span><span>${i + 1}. ${esc(m.title)}</span></a></li>`;
    }).join("");
    const finalStatus = progress.final && isPassed(progress.final.score) ? "✅" : "🏆";
    sidebar.innerHTML = `
      <ol><li><a href="#/" class="${activeRoute === "/" ? "active" : ""}"><span class="status">🏠</span><span>Übersicht</span></a></li></ol>
      <h2>Kapitel</h2><ol>${items}</ol>
      <h2>Prüfung</h2>
      <ol>
        <li><a href="#/final" class="${activeRoute === "/final" ? "active" : ""}"><span class="status">${finalStatus}</span><span>Abschlusstest</span></a></li>
        <li><a href="#/zertifikat" class="${activeRoute === "/zertifikat" ? "active" : ""}"><span class="status">📜</span><span>Zertifikat</span></a></li>
      </ol>`;
  }

  // ---------- Seiten ----------
  function renderHome() {
    const cards = modules.map((m, i) => {
      const done = moduleDone(m);
      return `<div class="card">
        <h3>${m.icon} ${i + 1}. ${esc(m.title)}</h3>
        <p><span class="badge ${done ? "done" : ""}">${done ? "✔ abgeschlossen" : "offen"}</span>
           <span class="badge">⏱ ${m.minutes} min</span></p>
        <a class="btn ${done ? "secondary" : ""}" href="#/m/${m.id}">${done ? "Wiederholen" : "Starten"}</a>
      </div>`;
    }).join("");
    const next = modules.find((m) => !moduleDone(m));
    content.innerHTML = `
      <h1>Willkommen zum Git &amp; GitHub-Kurs! 👋</h1>
      <p>In diesem E-Learning lernst du Schritt für Schritt, wie Profis Code und Projekte verwalten – und wie ihr
      Gruppenarbeiten in der Schule mit GitHub organisiert. Jedes Kapitel endet mit einem Quiz.
      Ab ${Math.round(COURSE.passScore * 100)} % richtigen Antworten gilt ein Kapitel als bestanden.</p>
      ${next ? `<p><a class="btn" href="#/m/${next.id}">▶ Weiterlernen: ${esc(next.title)}</a></p>`
             : `<p><a class="btn" href="#/final">🏆 Zum Abschlusstest</a></p>`}
      <div class="grid">${cards}</div>
      <div class="card">
        <h3>🏆 Abschlusstest</h3>
        <p>${COURSE.finalExam.questionCount} zufällige Fragen aus allen Kapiteln. Bestanden? Dann gibt's ein Zertifikat zum Ausdrucken.</p>
        <a class="btn secondary" href="#/final">Zum Test</a>
      </div>`;
  }

  function renderModule(id) {
    const idx = modules.findIndex((m) => m.id === id);
    if (idx < 0) return renderNotFound();
    const m = modules[idx];
    const prev = modules[idx - 1];
    content.innerHTML = `
      <p class="badge">Kapitel ${idx + 1} von ${modules.length} · ⏱ ${m.minutes} min</p>
      <h1>${m.icon} ${esc(m.title)}</h1>
      ${m.content}
      ${m.terminal ? `<h2>🖥️ Übung im Terminal</h2><div id="terminal-slot"></div>` : ""}
      <div class="nav-buttons">
        ${prev ? `<a class="btn secondary" href="#/m/${prev.id}">← ${esc(prev.title)}</a>` : `<a class="btn secondary" href="#/">← Übersicht</a>`}
        <a class="btn" href="#/q/${m.id}">Weiter zum Quiz →</a>
      </div>`;
    if (m.terminal) mountTerminal(document.getElementById("terminal-slot"), m);
  }

  function mountTerminal(slot, m) {
    const t = m.terminal;
    let step = modState(m.id).terminalDone ? t.steps.length : 0;
    let fails = 0;
    slot.innerHTML = `<p>${t.intro}</p><div class="card"><p id="term-task"></p></div>
      <div class="terminal" id="term"><div id="term-out"></div>
        <div class="line"><span class="prompt">schueler@schule:~/referat$ </span><input id="term-in" autocomplete="off" spellcheck="false" aria-label="Befehl eingeben"></div>
      </div>`;
    const out = slot.querySelector("#term-out");
    const input = slot.querySelector("#term-in");
    const taskEl = slot.querySelector("#term-task");

    const print = (html) => { out.insertAdjacentHTML("beforeend", `<div class="line">${html}</div>`); };
    const showTask = () => {
      if (step >= t.steps.length) {
        taskEl.innerHTML = `✅ <strong>Übung geschafft!</strong> <button class="link-button" id="term-restart">Nochmal üben</button>`;
        input.disabled = true;
        slot.querySelector("#term-restart").onclick = () => { step = 0; fails = 0; out.innerHTML = ""; input.disabled = false; showTask(); input.focus(); };
      } else {
        taskEl.innerHTML = `<strong>Aufgabe ${step + 1}/${t.steps.length}:</strong> ${t.steps[step].task}`;
      }
    };

    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const cmd = input.value.trim().replace(/\s+/g, " ");
      input.value = "";
      if (!cmd) return;
      print(`<span class="prompt">schueler@schule:~/referat$ </span>${esc(cmd)}`);
      const s = t.steps[step];
      if (s.match.test(cmd)) {
        if (s.output) print(esc(s.output));
        print(`<span class="ok">✔ Richtig!</span>`);
        step++;
        fails = 0;
        if (step >= t.steps.length) { modState(m.id).terminalDone = true; save(); }
        showTask();
      } else {
        fails++;
        print(`<span class="err">✘ Das ist nicht der gesuchte Befehl.${fails >= 2 ? " Tipp: Schau dir die Befehlstabelle weiter oben an." : ""}</span>`);
      }
      out.parentElement.scrollTop = out.parentElement.scrollHeight;
    });
    slot.querySelector("#term").addEventListener("click", () => input.focus());
    showTask();
  }

  // Gemeinsamer Quiz-Renderer für Kapitel-Quiz und Abschlusstest
  function renderQuiz({ heading, intro, questions, onDone, backLink, nextLink }) {
    const qs = questions.map(shuffleQuestion);
    content.innerHTML = `
      <h1>${heading}</h1>
      <p>${intro}</p>
      <form id="quiz">
        ${qs.map((q, qi) => `
          <div class="card question" data-qi="${qi}">
            <fieldset>
              <legend>${qi + 1}. ${esc(q.q)}</legend>
              ${q.options.map((o, oi) => `
                <label class="option"><input type="radio" name="q${qi}" value="${oi}" required> <span>${esc(o)}</span></label>`).join("")}
              <div class="explanation" hidden></div>
            </fieldset>
          </div>`).join("")}
        <p id="quiz-result" class="result" aria-live="polite"></p>
        <div class="nav-buttons">
          ${backLink}
          <span>
            <button type="submit" class="btn" id="quiz-submit">Auswerten</button>
            <button type="button" class="btn secondary" id="quiz-retry" hidden>Nochmal versuchen</button>
            <span id="quiz-next" hidden>${nextLink}</span>
          </span>
        </div>
      </form>`;

    const form = document.getElementById("quiz");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let correct = 0;
      qs.forEach((q, qi) => {
        const box = form.querySelector(`[data-qi="${qi}"]`);
        const chosen = Number(form.querySelector(`input[name="q${qi}"]:checked`).value);
        box.querySelectorAll(".option").forEach((label, oi) => {
          label.querySelector("input").disabled = true;
          if (oi === q.answer) label.classList.add("correct");
          else if (oi === chosen) label.classList.add("wrong");
        });
        if (chosen === q.answer) correct++;
        const ex = box.querySelector(".explanation");
        ex.hidden = false;
        ex.textContent = (chosen === q.answer ? "✔ " : "✘ ") + (q.explain || "");
      });
      const score = correct / qs.length;
      const passed = isPassed(score);
      const result = document.getElementById("quiz-result");
      result.className = "result " + (passed ? "pass" : "fail");
      result.textContent = `${correct} von ${qs.length} richtig (${Math.round(score * 100)} %) – ${passed ? "bestanden! 🎉" : "leider noch nicht bestanden."}`;
      document.getElementById("quiz-submit").hidden = true;
      document.getElementById("quiz-retry").hidden = false;
      document.getElementById("quiz-next").hidden = !passed;
      onDone(score);
      renderSidebar(currentRoute());
      updateProgressBar();
      result.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    document.getElementById("quiz-retry").onclick = () => renderQuiz({ heading, intro, questions, onDone, backLink, nextLink });
  }

  function renderModuleQuiz(id) {
    const idx = modules.findIndex((m) => m.id === id);
    if (idx < 0) return renderNotFound();
    const m = modules[idx];
    const next = modules[idx + 1];
    renderQuiz({
      heading: `📝 Quiz: ${esc(m.title)}`,
      intro: `Beantworte alle Fragen. Ab ${Math.round(COURSE.passScore * 100)} % ist das Kapitel bestanden.`,
      questions: m.quiz,
      onDone: (score) => {
        const st = modState(m.id);
        st.quizBest = Math.max(st.quizBest, score);
        save();
      },
      backLink: `<a class="btn secondary" href="#/m/${m.id}">← Zurück zum Kapitel</a>`,
      nextLink: next ? `<a class="btn" href="#/m/${next.id}">Nächstes Kapitel →</a>` : `<a class="btn" href="#/final">🏆 Zum Abschlusstest</a>`
    });
  }

  function renderFinal() {
    const all = modules.flatMap((m) => m.quiz);
    const questions = shuffle(all).slice(0, Math.min(COURSE.finalExam.questionCount, all.length));
    renderQuiz({
      heading: "🏆 Abschlusstest",
      intro: `${questions.length} zufällige Fragen aus allen Kapiteln. Ab ${Math.round(COURSE.passScore * 100)} % erhältst du dein Zertifikat.`,
      questions,
      onDone: (score) => {
        if (!progress.final || score > progress.final.score) {
          progress.final = { score, date: new Date().toISOString() };
          save();
        }
      },
      backLink: `<a class="btn secondary" href="#/">← Übersicht</a>`,
      nextLink: `<a class="btn" href="#/zertifikat">📜 Zum Zertifikat</a>`
    });
  }

  function renderCertificate() {
    if (!progress.final || !isPassed(progress.final.score)) {
      content.innerHTML = `<h1>📜 Zertifikat</h1>
        <div class="card"><p>Das Zertifikat wird freigeschaltet, sobald du den Abschlusstest bestanden hast.</p>
        <a class="btn" href="#/final">Zum Abschlusstest</a></div>`;
      return;
    }
    const date = new Date(progress.final.date).toLocaleDateString("de-DE");
    content.innerHTML = `
      <h1>📜 Zertifikat</h1>
      <label>Dein Name: <input id="cert-name" value="${esc(progress.name || "")}" placeholder="Vor- und Nachname"></label>
      <div class="card" id="certificate" style="text-align:center;padding:3rem 2rem;border-width:3px">
        <p style="font-size:3rem;margin:0">🐙</p>
        <h2>Teilnahmezertifikat</h2>
        <p>Hiermit wird bestätigt, dass</p>
        <p id="cert-name-out" style="font-size:1.8rem;font-weight:700">${esc(progress.name || "________________")}</p>
        <p>den Kurs <strong>„${esc(COURSE.title)}“</strong> erfolgreich abgeschlossen hat.</p>
        <p>Ergebnis im Abschlusstest: <strong>${Math.round(progress.final.score * 100)} %</strong> · ${date}</p>
      </div>
      <button class="btn" onclick="window.print()">🖨️ Drucken / als PDF speichern</button>`;
    document.getElementById("cert-name").addEventListener("input", (e) => {
      progress.name = e.target.value;
      save();
      document.getElementById("cert-name-out").textContent = e.target.value || "________________";
    });
  }

  function renderNotFound() {
    content.innerHTML = `<h1>Seite nicht gefunden</h1><p><a href="#/">Zur Übersicht</a></p>`;
  }

  // ---------- Router ----------
  const currentRoute = () => location.hash.replace(/^#/, "") || "/";

  function router() {
    const route = currentRoute();
    const [, type, id] = route.split("/");
    if (route === "/") renderHome();
    else if (type === "m") renderModule(id);
    else if (type === "q") renderModuleQuiz(id);
    else if (type === "final") renderFinal();
    else if (type === "zertifikat") renderCertificate();
    else renderNotFound();
    renderSidebar(route);
    updateProgressBar();
    sidebar.classList.remove("open");
    window.scrollTo(0, 0);
    content.focus({ preventScroll: true });
  }

  document.getElementById("menu-toggle").addEventListener("click", () => sidebar.classList.toggle("open"));
  document.getElementById("reset-progress").addEventListener("click", () => {
    if (confirm("Gesamten Lernfortschritt wirklich löschen?")) {
      progress = { modules: {}, final: null };
      save();
      router();
    }
  });
  window.addEventListener("hashchange", router);
  router();
})();
