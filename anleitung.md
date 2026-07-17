# Installationsanleitung für EmberWATT

Es gibt zwei Wege, wie du diese Custom Card in deinen Home Assistant integrieren kannst. Die HACS-Methode ist die komfortabelste, da sie dir zukünftig auch Updates erleichtert.

---

## Option 1: Über HACS (Empfohlen)

Da das Projekt bereits für HACS vorbereitet ist (`hacs.json` liegt bei), kannst du es als dein eigenes Custom Repository laden.

### Vorbereitung: Auf GitHub hochladen
HACS benötigt ein GitHub-Repository. 
1. Erstelle ein neues, öffentliches Repository auf [GitHub](https://github.com). Nenne es z.B. `emberwatt-card`.
2. Lade den kompletten Inhalt aus deinem Ordner `/home/masterburns/Dokumente/EmberWATT` in dieses Repository hoch (oder committe ihn per Git).

### Installation in HACS
1. Öffne Home Assistant und navigiere im linken Menü zu **HACS**.
2. Klicke auf **Frontend**.
3. Klicke oben rechts auf die drei Punkte (`...`) und wähle **Benutzerdefinierte Repositories (Custom Repositories)**.
4. Füge die URL deines neuen GitHub-Repositories ein.
5. Wähle als Kategorie **Lovelace** und klicke auf Hinzufügen.
6. Schließe das Fenster. Die Karte "EmberWATT" taucht nun in der HACS-Liste auf. Klicke darauf und wähle **Herunterladen/Download**.
7. Lade zur Sicherheit die Home Assistant Webseite einmal neu (F5).

---

## Option 2: Manuelle Installation (Ohne GitHub/HACS)

Wenn du das Projekt nicht auf GitHub hochladen möchtest, kannst du die kompilierte Datei auch einfach manuell in Home Assistant kopieren.

### Dateien kopieren
1. Gehe in den Ordner deines Home Assistant (dort, wo auch die `configuration.yaml` liegt).
2. Suche den Ordner `www` (falls er nicht existiert, erstelle ihn).
3. Kopiere die Datei `dist/ember-watt-card.js` aus unserem Projekt in diesen `www` Ordner.

### Als Ressource in Home Assistant anmelden
1. Öffne Home Assistant und gehe zu **Einstellungen** -> **Dashboards**.
2. Klicke oben rechts auf die drei Punkte (`...`) und wähle **Ressourcen**. *(Hinweis: Falls du diesen Punkt nicht siehst, musst du zuerst den "Erweiterten Modus" in deinem Benutzerprofil aktivieren).*
3. Klicke unten rechts auf **Ressource hinzufügen**.
4. Trage bei URL folgendes ein: `/local/ember-watt-card.js`
5. Wähle als Ressourcentyp: **JavaScript Modul**.
6. Klicke auf Erstellen und lade die Home Assistant Seite neu (F5).

---

## Die Karte zum Dashboard hinzufügen

Unabhängig davon, welche der beiden Optionen du gewählt hast, ist die Karte nun bereit.

1. Gehe auf dein Dashboard und klicke oben rechts auf das Stift-Symbol (**Dashboard bearbeiten**).
2. Klicke auf **Karte hinzufügen**.
3. Scrolle ganz nach unten bis zu den Custom Cards oder suche nach **"EmberWATT"**.
4. Wähle die Karte aus. 
5. Nun öffnet sich direkt der **visuelle Editor**, in dem du ganz entspannt deine Sensoren, Solar-Anlagen und Batterien per Dropdown auswählen kannst!
