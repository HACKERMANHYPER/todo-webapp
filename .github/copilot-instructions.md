<!--
Kurze Copilot-Instruktionen für dieses Repo.
Sprache: Deutsch.
Max. Länge: ~1 Seite.
-->

# Copilot / Coding-Agent Hinweise — ToDo Webapp (BBS Brinkstraße)

Kurz: Dieses Repository ist eine kleine Laravel-basierte ToDo-Webapp, entwickelt als Schulprojekt. Ziel dieser Datei ist, einem automatisierten Coding-Agenten schnell zu vermitteln, wie er Änderungen zuverlässig bauen, testen und validieren kann, ohne große Erkundungsarbeit.

**Projekt-Typ**: PHP (Laravel) + optionale JS-Assets (Vite/NPM)

**Wichtigste Dateien/Orte**
- Projekt-Root: `artisan`, `composer.json`, `package.json`, `phpunit.xml`, `README.md`
- Backend: `app/` (Controller, Models, Providers)
- Routen: `routes/web.php`
- Views & Assets: `resources/views`, `resources/js`, `resources/css`

**Schnellstart / empfohlene Reihenfolge (immer befolgen)**
1. Stelle sicher, dass `ddev` und `Docker` installiert sind.
2. Im Projektroot ausführen:

```bash
ddev start
ddev php composer install
ddev php artisan migrate
ddev restart    # falls Konfigurationen angepasst wurden
```

Anmerkung: Verwende die obigen `ddev`-Befehle — nicht lokale Composer-/PHP-Binaries. Das vermeidet Umgebungsinkompatibilitäten.

**Tests & Linting**
- PHPUnit: `ddev php ./vendor/bin/phpunit`
- Pint (falls vorhanden): `ddev php ./vendor/bin/pint` oder `ddev php vendor/bin/pint` (prüfe, ob `vendor/bin/pint` existiert)

**Assets (wenn nötig)**
- JS/CSS: `ddev npm install` und `ddev npm run dev` bzw. `ddev npm run build`

**Build-/Test-Checks vor PR**
- Alle PHP-Unit-Tests müssen erfolgreich sein (`phpunit`).
- Sicherstellen, dass Composer-Abhängigkeiten aktualisiert sind (`composer install`).
- Falls Frontend-Änderungen: Assets bauen und kurz manuell prüfen.

**CI / GitHub Actions**
- Dieses Repo enthält keine öffentlichen Workflow-Dateien im `.github/workflows/`-Verzeichnis (Stand dieser Datei). Verifiziere vor Änderungen, ob neue Workflows hinzugekommen sind.

**Fehlerquellen / Workarounds (erprobt)**
- Problem: Abhängigkeiten oder PHP-Versionen weichen lokal von Container ab → Lösung: immer `ddev php composer install` verwenden.
- Problem: DB-Migration schlägt fehl wegen fehlender Umgebung → Lösung: `ddev restart` und erneut `ddev php artisan migrate`.

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
