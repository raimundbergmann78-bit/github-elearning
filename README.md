# 🐙 Git & GitHub lernen – E-Learning für die Schule

Interaktiver Online-Kurs, der Schülerinnen und Schülern Schritt für Schritt Git und GitHub beibringt.

## Inhalte

| # | Kapitel | Übung im Terminal |
|---|---------|:-:|
| 1 | Was ist Versionskontrolle? | – |
| 2 | Git installieren & einrichten | ✔ |
| 3 | Repository & erster Commit | ✔ |
| 4 | Branches & Merge | ✔ |
| 5 | GitHub: push, pull, clone | ✔ |
| 6 | Teamarbeit: Issues & Pull Requests | – |
| 7 | Eigene Website mit GitHub Pages | – |
| 🏆 | Abschlusstest (10 zufällige Fragen) + druckbares Zertifikat | |

## Funktionen

- Quiz nach jedem Kapitel (bestanden ab 70 %), Antworten werden gemischt und mit Erklärung ausgewertet
- Simuliertes Terminal zum Üben der Git-Befehle
- Lernfortschritt wird im Browser gespeichert (`localStorage`); keine Anmeldung, kein Server, keine Datenübertragung
- Hell-/Dunkelmodus automatisch, mobilfreundlich
- Zertifikat zum Drucken bzw. als PDF

## Lokal starten

`index.html` im Browser öffnen – fertig.

## Auf GitHub veröffentlichen

```bash
git remote add origin https://github.com/BENUTZERNAME/github-elearning.git
git push -u origin main
```

Dann auf GitHub unter **Settings → Pages** als Quelle Branch `main` und Ordner `/ (root)` wählen.
Die Seite ist danach unter `https://BENUTZERNAME.github.io/github-elearning/` erreichbar.

## Inhalte anpassen

Alle Texte, Quizfragen und Terminal-Übungen stehen in [`data.js`](data.js).
Ein neues Kapitel ist ein weiterer Eintrag in `COURSE.modules` – Navigation, Fortschritt und Abschlusstest passen sich automatisch an.

## Projektstruktur

```
index.html   Seitengerüst
style.css    Gestaltung (inkl. Dark Mode und Druckansicht)
data.js      Kursinhalte, Quizfragen, Terminal-Übungen
app.js       Navigation, Quiz-Logik, Terminal-Simulation, Fortschritt
```
