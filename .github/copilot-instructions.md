<!--
Kurze Copilot-Instruktionen für dieses Repo.
Sprache: Deutsch.
Max. Länge: ~1 Seite.
-->

# Copilot / Coding-Agent Hinweise — ToDo Webapp (BBS Brinkstraße)

Kurz: Dieses Repository ist eine kleine Laravel-basierte ToDo-Webapp mit Inertia.js als Frontend-Monolith, entwickelt als Schulprojekt. Ziel dieser Datei ist, einem automatisierten Coding-Agenten schnell zu vermitteln, wie er Änderungen zuverlässig bauen, testen und validieren kann, ohne große Erkundungsarbeit.

**Projekt-Typ**: PHP (Laravel) + Inertia.js (React/Vue-Komponenten) + Vite

**Wichtigste Dateien/Orte**
- Projekt-Root: `artisan`, `composer.json`, `package.json`, `phpunit.xml`, `README.md`, `vite.config.js`
- Backend: `app/Http/Controllers/` (Controller mit Inertia-Responses), `app/Models/`, `app/Providers/`
- Routen: `routes/web.php` (definiert Inertia-Seiten/Endpoints)
- Frontend: `resources/js/Pages/` (React/Vue-Komponenten für Seiten), `resources/js/Components/` (wiederverwendbare Komponenten)
- Styles: `resources/css/app.css` (Tailwind CSS)

**Schnellstart / empfohlene Reihenfolge (immer befolgen)**
1. Stelle sicher, dass `ddev` und `Docker` installiert sind.
2. Im Projektroot ausführen:

```bash
ddev start
ddev php composer install
ddev npm install
ddev php artisan migrate
ddev restart    # falls Konfigurationen angepasst wurden
```

3. Frontend im Entwicklungsmodus starten:

```bash
ddev npm run dev
```

Anmerkung: Verwende die obigen `ddev`-Befehle — nicht lokale Composer-/NPM-/PHP-Binaries. Das vermeidet Umgebungsinkompatibilitäten. Der Vite-Dev-Server läuft parallel und wird von Laravel automatisch erfasst.

**Tests & Linting**
- PHPUnit: `ddev php ./vendor/bin/phpunit`
- Pint (PHP-Linting): `ddev php ./vendor/bin/pint` (prüfe, ob `vendor/bin/pint` existiert)

**Frontend-Struktur & Inertia.js**
- **Komponenten**: Alle React/Vue-Komponenten sind in `resources/js/Pages/` (für Seiten) und `resources/js/Components/` (wiederverwendbar) organaisiert.
- **Backend-Integration**: Controller mit `inertia()->render('ComponentName', $data)` definieren die Frontend-Komponenten und Daten.
- **Styling**: Tailwind CSS ist bereits konfiguriert (`resources/css/app.css`). Alle Komponenten nutzen dies.
- **Build**: `ddev npm run dev` für Entwicklung, `ddev npm run build` für Production.

**Assets (immer nötig)**
- JS/CSS: `ddev npm install` und `ddev npm run dev` (Vite läuft im Hintergrund).
- Nach neuen Dependencies oder JS-Änderungen: Assets müssen gebaut sein (`npm run dev` oder `npm run build`).

**Build-/Test-Checks vor PR**
- Alle PHP-Unit-Tests müssen erfolgreich sein (`phpunit`).
- Sicherstellen, dass Composer-Abhängigkeiten aktualisiert sind (`composer install`).
- Sicherstellen, dass NPM-Abhängigkeiten aktualisiert sind (`npm install`).
- Assets müssen gebaut sein: `npm run dev` (Entwicklung) oder `npm run build` (Production).
- Falls Frontend-Änderungen: Komponenten visuell prüfen (z. B. im Browser unter der DDEV-URL).

**CI / GitHub Actions**
- Dieses Repo enthält keine öffentlichen Workflow-Dateien im `.github/workflows/`-Verzeichnis (Stand dieser Datei). Verifiziere vor Änderungen, ob neue Workflows hinzugekommen sind.

**Fehlerquellen / Workarounds (erprobt)**
- Problem: Abhängigkeiten oder PHP-Versionen weichen lokal von Container ab → Lösung: immer `ddev php composer install` verwenden.
- Problem: DB-Migration schlägt fehl wegen fehlender Umgebung → Lösung: `ddev restart` und erneut `ddev php artisan migrate`.
- Problem: Inertia-Komponenten werden nicht angezeigt → Lösung: Stelle sicher, dass `ddev npm run dev` läuft und dass der Komponenten-Pfad in `inertia()->render()` korrekt ist.
- Problem: Assets/CSS sind nicht aktualisiert → Lösung: Browser-Cache leeren, `ddev npm run dev` neu starten oder `ddev npm run build` verwenden.

**Wann suchen?**
Vertraue dieser Datei als primären Leitfaden. Nur dann tiefer suchen (grep/Code-Search), wenn:
- ein Befehl fehlschlägt und hier nicht dokumentiert ist, oder
- Tests fehlschlagen und der Fehlerpunkt im Code nicht offensichtlich ist.

Kurze Prioritätenliste (in der Reihenfolge, in der du Dateien prüfen solltest):
1. `README.md` — Setup-Hinweise
2. `composer.json` — Abhängigkeiten
3. `phpunit.xml` — Testkonfiguration
4. `routes/web.php` — Routen-Änderungen
5. `app/` — Controller/Model-Dateien

Wenn du Änderungen vornimmst: dokumentiere in der PR-Beschreibung:
- Welche DDEV-Befehle du lokal ausgeführt hast
- Ergebnis der Tests
- Falls nötig: wie man die Änderung manuell prüfen kann (URL, Schritte)

Danke — diese Datei soll die Iterationen mit einem Coding-Agenten zuverlässig und schnell machen.
