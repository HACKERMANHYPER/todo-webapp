# 📝 ToDo Webapp — Schulprojekt (BBS Brinkstraße)

Das Projekt ist eine kleine Laravel-basierte ToDo-Webapp. Es wird ein headless laravel mit React Komponenten angestrebt.

## ⚡️ Setup (lokal mit DDEV)
1. Starte die Entwicklungsumgebung:

```bash
ddev start
```

2. Abhängigkeiten installieren (Composer):

```bash
ddev composer install
```

3. Datenbankmigrationen ausführen:

```bash
ddev php artisan migrate
```

4. DDEV neu starten (optional, wenn Konfigs sich geändert haben):

```bash
ddev restart
```

Jetzt sollte die App unter der von DDEV ausgegebenen URL erreichbar sein.
```bash
https://todo-webapp.ddev.site
```

## 🔥 Kurz: Wie benutzen
- Entwicklungsserver läuft unter der URL, die `ddev start` ausgibt.
- Assets bauen: im Projektverzeichnis `ddev npm install` und `ddev npm run dev` (falls Node/JS-Assets benötigt werden).
- Tests ausführen:

```bash
ddev php ./vendor/bin/phpunit
```

## ‼️ Wichtige Dateien / Struktur
- `artisan` — Laravel CLI
- `composer.json` — PHP-Abhängigkeiten
- `package.json` — JS/Asset-Tasks
- `phpunit.xml` — Testkonfiguration
- `app/` — Haupt-Application-Logik (Controller, Models)
- `routes/web.php` — App-Routen
- `resources/` — Views, JS, CSS

## ⁉️ Kurz zu Laravel
Dieses Repo verwendet Laravel (PHP). Verwende die obigen `ddev`-Befehle, um die Umgebung lokal zu starten. Für tiefere Änderungen schaue in `app/` und `routes/`.

## ☕️ Lizenz
MIT

test
