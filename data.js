// Lerninhalte: Jedes Kapitel hat Text (HTML), optional eine Terminal-Übung und ein Quiz.
// answer = Index der richtigen Antwort (0-basiert).
const COURSE = {
  title: "Git & GitHub lernen",
  passScore: 0.7,
  modules: [
    {
      id: "versionskontrolle",
      icon: "📚",
      title: "Was ist Versionskontrolle?",
      minutes: 10,
      content: `
        <p>Kennst du Dateinamen wie <code>Referat_final.docx</code>, <code>Referat_final2.docx</code> und
        <code>Referat_wirklich_final.docx</code>? Genau dieses Chaos löst <strong>Versionskontrolle</strong>.</p>
        <h2>Die Idee</h2>
        <p>Ein Versionskontrollsystem speichert jeden Stand deines Projekts wie einen Schnappschuss. Du kannst jederzeit:</p>
        <ul>
          <li>sehen, <strong>wer</strong> wann <strong>was</strong> geändert hat,</li>
          <li>zu einem älteren Stand zurückspringen,</li>
          <li>mit mehreren Personen gleichzeitig an denselben Dateien arbeiten.</li>
        </ul>
        <h2>Git und GitHub – nicht dasselbe!</h2>
        <div class="grid">
          <div class="card"><h3>🛠️ Git</h3><p>Ein Programm auf deinem Computer. Es verwaltet die Versionen deines Projekts – auch ganz ohne Internet.</p></div>
          <div class="card"><h3>🐙 GitHub</h3><p>Eine Website, auf der Git-Projekte (Repositories) online gespeichert und mit anderen geteilt werden.</p></div>
        </div>
        <div class="tip">💡 Vergleich: Git ist wie dein Fotoapparat, GitHub ist wie ein Online-Fotoalbum, das du mit der Klasse teilst.</div>
      `,
      quiz: [
        {
          q: "Was ist Git?",
          options: ["Eine Website zum Teilen von Code", "Ein Versionskontrollsystem, das lokal auf dem Computer läuft", "Eine Programmiersprache", "Ein Texteditor"],
          answer: 1,
          explain: "Git ist ein Programm zur Versionskontrolle und funktioniert auch offline."
        },
        {
          q: "Was ist GitHub?",
          options: ["Ein anderer Name für Git", "Ein Betriebssystem", "Eine Plattform, um Git-Repositories online zu speichern und gemeinsam zu bearbeiten", "Ein Virenscanner"],
          answer: 2,
          explain: "GitHub hostet Git-Repositories und bietet Werkzeuge zur Zusammenarbeit."
        },
        {
          q: "Welchen Vorteil bietet Versionskontrolle NICHT?",
          options: ["Ältere Stände wiederherstellen", "Änderungen nachvollziehen", "Code automatisch fehlerfrei machen", "Im Team gleichzeitig arbeiten"],
          answer: 2,
          explain: "Versionskontrolle verwaltet Änderungen – Fehler finden musst du weiterhin selbst."
        }
      ]
    },
    {
      id: "einrichten",
      icon: "⚙️",
      title: "Git installieren & einrichten",
      minutes: 10,
      content: `
        <h2>1. Installation</h2>
        <ul>
          <li><strong>Windows:</strong> <a href="https://git-scm.com/download/win" target="_blank" rel="noopener">git-scm.com</a> herunterladen und installieren (Standardeinstellungen sind okay).</li>
          <li><strong>macOS:</strong> Im Terminal <code>git --version</code> eingeben – macOS bietet die Installation dann an.</li>
          <li><strong>Linux:</strong> <code>sudo apt install git</code></li>
        </ul>
        <h2>2. Prüfen, ob es geklappt hat</h2>
        <pre><code>git --version</code></pre>
        <h2>3. Name und E-Mail festlegen</h2>
        <p>Jeder Commit wird mit deinem Namen gespeichert. Das stellst du einmalig ein:</p>
        <pre><code>git config --global user.name "Max Mustermann"
git config --global user.email "max@example.com"</code></pre>
        <div class="warn">⚠️ Datenschutz: Verwende für Schulprojekte keine private E-Mail-Adresse, wenn das Repository öffentlich ist.
        GitHub bietet eine anonyme <code>…@users.noreply.github.com</code>-Adresse an.</div>
        <h2>4. GitHub-Konto</h2>
        <p>Registriere dich auf <a href="https://github.com" target="_blank" rel="noopener">github.com</a>.
        Schülerinnen und Schüler können über <a href="https://education.github.com" target="_blank" rel="noopener">GitHub Education</a> kostenlose Extras bekommen.</p>
      `,
      terminal: {
        intro: "Richte Git ein. Gib die Befehle nacheinander ein:",
        steps: [
          { task: "Prüfe die installierte Git-Version.", match: /^git\s+--version$/, output: "git version 2.53.0" },
          { task: "Setze deinen Namen (global).", match: /^git\s+config\s+--global\s+user\.name\s+["'].+["']$/, output: "" },
          { task: "Setze deine E-Mail-Adresse (global).", match: /^git\s+config\s+--global\s+user\.email\s+["']?\S+@\S+["']?$/, output: "" }
        ]
      },
      quiz: [
        {
          q: "Mit welchem Befehl prüfst du, ob Git installiert ist?",
          options: ["git check", "git --version", "git install", "git status --all"],
          answer: 1,
          explain: "git --version gibt die installierte Version aus."
        },
        {
          q: "Wozu dient git config --global user.name?",
          options: ["Legt den Namen des Repositories fest", "Erstellt ein GitHub-Konto", "Legt fest, unter welchem Namen deine Commits gespeichert werden", "Ändert den Computernamen"],
          answer: 2,
          explain: "Name und E-Mail werden in jedem Commit als Autor gespeichert."
        }
      ]
    },
    {
      id: "erster-commit",
      icon: "📸",
      title: "Repository & erster Commit",
      minutes: 15,
      content: `
        <h2>Begriffe</h2>
        <ul>
          <li><strong>Repository (Repo):</strong> Ein Projektordner, den Git überwacht.</li>
          <li><strong>Commit:</strong> Ein gespeicherter Schnappschuss mit Beschreibung.</li>
          <li><strong>Staging Area:</strong> Der „Warenkorb“ – hier sammelst du Änderungen, bevor du sie committest.</li>
        </ul>
        <h2>Die drei Bereiche</h2>
        <pre><code>Arbeitsordner  ──git add──▶  Staging Area  ──git commit──▶  Repository
 (bearbeiten)                 (vormerken)                    (speichern)</code></pre>
        <h2>Die wichtigsten Befehle</h2>
        <table class="card" style="width:100%;border-collapse:collapse">
          <tr><td><code>git init</code></td><td>Macht den aktuellen Ordner zu einem Repository</td></tr>
          <tr><td><code>git status</code></td><td>Zeigt, welche Dateien geändert oder vorgemerkt sind</td></tr>
          <tr><td><code>git add datei.txt</code></td><td>Merkt eine Datei vor (<code>git add .</code> = alle)</td></tr>
          <tr><td><code>git commit -m "Nachricht"</code></td><td>Speichert die vorgemerkten Änderungen</td></tr>
          <tr><td><code>git log</code></td><td>Zeigt alle bisherigen Commits</td></tr>
        </table>
        <div class="tip">💡 Gute Commit-Nachrichten beschreiben <em>was</em> und <em>warum</em>: „Impressum ergänzt“ statt „Update“.</div>
      `,
      terminal: {
        intro: "Du hast einen Ordner <code>referat</code> mit der Datei <code>index.html</code>. Speichere sie in Git:",
        steps: [
          { task: "Mache den Ordner zu einem Git-Repository.", match: /^git\s+init$/, output: "Initialized empty Git repository in /home/schueler/referat/.git/" },
          { task: "Schau dir den Status an.", match: /^git\s+status$/, output: "Untracked files:\n  index.html" },
          { task: "Merke index.html vor (oder alle Dateien).", match: /^git\s+add\s+(index\.html|\.|-A|--all)$/, output: "" },
          { task: "Erstelle einen Commit mit einer Nachricht.", match: /^git\s+commit\s+-m\s+["'].+["']$/, output: "[main (root-commit) a1b2c3d] Erste Version\n 1 file changed, 12 insertions(+)" },
          { task: "Zeige die Commit-Historie an.", match: /^git\s+log(\s+--oneline)?$/, output: "a1b2c3d Erste Version" }
        ]
      },
      quiz: [
        {
          q: "Was macht git add?",
          options: ["Lädt Dateien zu GitHub hoch", "Merkt Änderungen für den nächsten Commit vor", "Erstellt eine neue Datei", "Fügt einen Mitarbeiter hinzu"],
          answer: 1,
          explain: "git add legt Änderungen in die Staging Area."
        },
        {
          q: "In welcher Reihenfolge speicherst du eine Änderung?",
          options: ["git commit → git add", "git init → git log", "git add → git commit", "git status → git push"],
          answer: 2,
          explain: "Erst vormerken (add), dann speichern (commit)."
        },
        {
          q: "Welche Commit-Nachricht ist am besten?",
          options: ["„asdf“", "„Update“", "„Quellenverzeichnis zum Referat hinzugefügt“", "„Änderungen“"],
          answer: 2,
          explain: "Eine gute Nachricht beschreibt konkret, was geändert wurde."
        }
      ]
    },
    {
      id: "branches",
      icon: "🌿",
      title: "Branches & Merge",
      minutes: 15,
      content: `
        <p>Ein <strong>Branch</strong> (Zweig) ist eine parallele Version deines Projekts. So kannst du Neues ausprobieren,
        ohne die funktionierende Hauptversion (<code>main</code>) zu gefährden.</p>
        <pre><code>main:      ●───●───────────●   (Merge)
                \\         /
feature:         ●───●───●</code></pre>
        <h2>Befehle</h2>
        <table class="card" style="width:100%;border-collapse:collapse">
          <tr><td><code>git branch</code></td><td>Listet alle Branches auf</td></tr>
          <tr><td><code>git switch -c neuer-branch</code></td><td>Erstellt einen Branch und wechselt hinein</td></tr>
          <tr><td><code>git switch main</code></td><td>Wechselt zurück zu main</td></tr>
          <tr><td><code>git merge neuer-branch</code></td><td>Übernimmt die Änderungen in den aktuellen Branch</td></tr>
        </table>
        <h2>Merge-Konflikte</h2>
        <p>Haben zwei Branches dieselbe Zeile unterschiedlich geändert, kann Git nicht automatisch entscheiden. Die Datei enthält dann:</p>
        <pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
Die Hauptstadt ist Berlin.
=======
Die Hauptstadt von Deutschland ist Berlin.
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature</code></pre>
        <p>Du entscheidest, welche Version bleibt, löschst die Markierungen und committest erneut.</p>
        <div class="tip">💡 Ältere Anleitungen nutzen <code>git checkout -b</code> – das funktioniert genauso wie <code>git switch -c</code>.</div>
      `,
      terminal: {
        intro: "Entwickle ein neues Feature „quiz“ in einem eigenen Branch:",
        steps: [
          { task: "Erstelle den Branch quiz und wechsle hinein.", match: /^git\s+(switch\s+-c|checkout\s+-b)\s+quiz$/, output: "Switched to a new branch 'quiz'" },
          { task: "Merke alle Änderungen vor.", match: /^git\s+add\s+(\.|-A|--all)$/, output: "" },
          { task: "Committe die Änderungen.", match: /^git\s+commit\s+-m\s+["'].+["']$/, output: "[quiz 4d5e6f7] Quiz hinzugefügt\n 1 file changed, 30 insertions(+)" },
          { task: "Wechsle zurück zu main.", match: /^git\s+(switch|checkout)\s+main$/, output: "Switched to branch 'main'" },
          { task: "Übernimm den Branch quiz in main.", match: /^git\s+merge\s+quiz$/, output: "Updating a1b2c3d..4d5e6f7\nFast-forward\n quiz.html | 30 ++++++" }
        ]
      },
      quiz: [
        {
          q: "Wozu verwendet man Branches?",
          options: ["Um Dateien zu löschen", "Um parallel an Änderungen zu arbeiten, ohne main zu gefährden", "Um das Repository zu verschlüsseln", "Um Git zu aktualisieren"],
          answer: 1,
          explain: "Branches isolieren Arbeit, bis sie fertig ist."
        },
        {
          q: "Was bedeutet ein Merge-Konflikt?",
          options: ["Git ist abgestürzt", "Zwei Branches haben dieselbe Stelle unterschiedlich geändert", "Das Repository ist zu groß", "Du hast kein Internet"],
          answer: 1,
          explain: "Git braucht dann deine Entscheidung, welche Version gilt."
        },
        {
          q: "Mit welchem Befehl erstellst du einen neuen Branch und wechselst direkt hinein?",
          options: ["git branch -d test", "git merge test", "git switch -c test", "git new test"],
          answer: 2,
          explain: "git switch -c (oder git checkout -b) erstellt und wechselt in einem Schritt."
        }
      ]
    },
    {
      id: "github-remote",
      icon: "☁️",
      title: "GitHub: push, pull, clone",
      minutes: 15,
      content: `
        <p>Bisher lag alles nur auf deinem Computer. Jetzt verbinden wir das Repository mit GitHub – dem <strong>Remote</strong>.</p>
        <h2>Neues Repository auf GitHub</h2>
        <ol>
          <li>Auf github.com oben rechts auf <strong>+ → New repository</strong> klicken.</li>
          <li>Namen vergeben, z.&nbsp;B. <code>referat</code>, und <strong>Create repository</strong> wählen.</li>
          <li>Die angezeigte URL kopieren.</li>
        </ol>
        <h2>Befehle</h2>
        <table class="card" style="width:100%;border-collapse:collapse">
          <tr><td><code>git remote add origin URL</code></td><td>Verknüpft dein lokales Repo mit GitHub</td></tr>
          <tr><td><code>git push -u origin main</code></td><td>Lädt deine Commits hoch (beim ersten Mal mit <code>-u</code>)</td></tr>
          <tr><td><code>git pull</code></td><td>Holt neue Commits von GitHub</td></tr>
          <tr><td><code>git clone URL</code></td><td>Lädt ein komplettes Repository herunter</td></tr>
        </table>
        <div class="tip">💡 Merksatz: <strong>Pull</strong> vor der Arbeit, <strong>Push</strong> nach der Arbeit.</div>
        <div class="warn">⚠️ Lade niemals Passwörter, Zugangsdaten oder persönliche Daten von Mitschülern in ein öffentliches Repository hoch!</div>
      `,
      terminal: {
        intro: "Verbinde dein Referat mit GitHub und lade es hoch:",
        steps: [
          { task: "Füge das Remote origin hinzu (URL: https://github.com/max/referat.git).", match: /^git\s+remote\s+add\s+origin\s+https:\/\/github\.com\/max\/referat\.git$/, output: "" },
          { task: "Lade den Branch main hoch und setze das Upstream.", match: /^git\s+push\s+(-u|--set-upstream)\s+origin\s+main$/, output: "To https://github.com/max/referat.git\n * [new branch]      main -> main\nbranch 'main' set up to track 'origin/main'." },
          { task: "Hole die neuesten Änderungen deiner Gruppe.", match: /^git\s+pull$/, output: "Already up to date." }
        ]
      },
      quiz: [
        {
          q: "Was macht git push?",
          options: ["Lädt lokale Commits zu GitHub hoch", "Lädt Änderungen von GitHub herunter", "Löscht den Branch", "Erstellt einen Commit"],
          answer: 0,
          explain: "push = hochladen, pull = herunterladen."
        },
        {
          q: "Wie lädst du ein bestehendes Projekt von GitHub komplett herunter?",
          options: ["git pull URL", "git download URL", "git clone URL", "git init URL"],
          answer: 2,
          explain: "git clone kopiert das komplette Repository inklusive Historie."
        },
        {
          q: "Was gehört NICHT in ein öffentliches Repository?",
          options: ["HTML-Dateien", "Eine README", "Passwörter und persönliche Daten", "Bilder, die du selbst gemacht hast"],
          answer: 2,
          explain: "Öffentliche Repositories kann jeder im Internet lesen."
        }
      ]
    },
    {
      id: "zusammenarbeit",
      icon: "🤝",
      title: "Teamarbeit: Issues & Pull Requests",
      minutes: 15,
      content: `
        <h2>Issues – die gemeinsame Aufgabenliste</h2>
        <p>Ein <strong>Issue</strong> ist ein Ticket für eine Aufgabe, einen Fehler oder eine Idee. Ihr könnt Issues Personen zuweisen
        und mit Labels wie <code>bug</code> oder <code>todo</code> sortieren.</p>
        <h2>Pull Requests (PR)</h2>
        <p>Ein Pull Request ist eine Anfrage: „Bitte übernehmt meinen Branch in <code>main</code>.“ Vorher kann das Team den Code ansehen und kommentieren (<strong>Code Review</strong>).</p>
        <ol>
          <li>Branch erstellen und Änderungen committen</li>
          <li>Branch pushen: <code>git push -u origin mein-branch</code></li>
          <li>Auf GitHub <strong>Compare &amp; pull request</strong> klicken</li>
          <li>Team prüft und kommentiert</li>
          <li><strong>Merge pull request</strong> – fertig!</li>
        </ol>
        <h2>Forks</h2>
        <p>Ein <strong>Fork</strong> ist deine eigene Kopie eines fremden Repositories auf GitHub. Damit kannst du zu Projekten beitragen, für die du keine Schreibrechte hast.</p>
        <div class="tip">💡 Schreibt in Pull Requests „Closes #3“ – dann wird Issue Nr. 3 beim Merge automatisch geschlossen.</div>
      `,
      quiz: [
        {
          q: "Wofür ist ein Pull Request da?",
          options: ["Um Git zu installieren", "Um Änderungen aus einem Branch zur Prüfung und Übernahme vorzuschlagen", "Um ein Repository zu löschen", "Um Dateien herunterzuladen"],
          answer: 1,
          explain: "Ein PR schlägt vor, einen Branch zu mergen – mit Möglichkeit zum Review."
        },
        {
          q: "Was ist ein Issue?",
          options: ["Ein Fehler in Git", "Ein Ticket für Aufgaben, Fehler oder Ideen", "Ein anderer Name für Commit", "Ein privates Repository"],
          answer: 1,
          explain: "Issues organisieren die Arbeit im Team."
        },
        {
          q: "Was ist ein Fork?",
          options: ["Eine eigene Kopie eines fremden Repositories auf GitHub", "Ein gelöschter Branch", "Ein Merge-Konflikt", "Ein Git-Befehl zum Rückgängigmachen"],
          answer: 0,
          explain: "Mit einem Fork kannst du ohne Schreibrechte Änderungen vorschlagen."
        }
      ]
    },
    {
      id: "github-pages",
      icon: "🌐",
      title: "Eigene Website mit GitHub Pages",
      minutes: 10,
      content: `
        <p>Mit <strong>GitHub Pages</strong> wird aus deinem Repository kostenlos eine echte Website – so wie dieses E-Learning hier!</p>
        <h2>So geht's</h2>
        <ol>
          <li>Im Repository eine <code>index.html</code> anlegen und pushen.</li>
          <li>Auf GitHub: <strong>Settings → Pages</strong>.</li>
          <li>Bei <em>Source</em> „Deploy from a branch“, Branch <code>main</code> und Ordner <code>/ (root)</code> wählen, speichern.</li>
          <li>Nach ca. einer Minute ist die Seite online unter<br><code>https://BENUTZERNAME.github.io/REPOSITORY/</code></li>
        </ol>
        <h2>Minimal-Beispiel</h2>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="de"&gt;
  &lt;head&gt;&lt;meta charset="UTF-8"&gt;&lt;title&gt;Mein Referat&lt;/title&gt;&lt;/head&gt;
  &lt;body&gt;&lt;h1&gt;Hallo Welt!&lt;/h1&gt;&lt;/body&gt;
&lt;/html&gt;</code></pre>
        <div class="warn">⚠️ GitHub-Pages-Seiten sind öffentlich. Achte auf Urheberrecht bei Bildern und auf das Recht am eigenen Bild.</div>
      `,
      quiz: [
        {
          q: "Wie heißt die Startdatei einer GitHub-Pages-Website?",
          options: ["start.html", "main.html", "index.html", "home.txt"],
          answer: 2,
          explain: "index.html wird automatisch als Startseite geladen."
        },
        {
          q: "Wo aktivierst du GitHub Pages?",
          options: ["In den Einstellungen des Repositories unter Pages", "Mit git pages on", "Im Windows-Explorer", "In der README"],
          answer: 0,
          explain: "Settings → Pages im jeweiligen Repository."
        }
      ]
    }
  ],
  // Abschlusstest: zieht zufällig Fragen aus allen Kapiteln
  finalExam: { questionCount: 10 }
};
