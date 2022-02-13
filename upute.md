# Upute za pokretanje projekta

Projekt se sastoji od dvije aplikacije: front-end (direktorij `angular`) i back-end (direktorij `server`).

Aplikacija je deployana na https://njp.azurewebsites.net/.

## Okolina i pokretanje

Konfiguraciju okoline možete mijenjati u datoteci `server/.env`.

S postavkom `NODE_ENV=development` (defaultno postavljeno) aplikacija se pokreće na sljedeći način:

1.  U direktorijima `server` i `angular` izvršiti naredbu `yarn start` ili `npm start`.
2.  Aplikacija je dostupna na `localhost:4200`.

S postavkom `NODE_ENV=production` aplikacija se pokreće na sljedeći način:

1.  U direktoriju `server` izvršiti naredbu `yarn start` ili `npm start`.
2.  Aplikacija je dostupna na `localhost:8080` (front-end je buildan u direktorij `server/public`).

## Baza

Dump baze nalazi se u direktoriju `server/assets/db-dump`. Tamo ćete naći podatke po tablicama u bson i csv formatima.

Direktorij `bson` sadrži dump dvije baze, `admin` i `NJP-projekt`. Za pokretanje projekta treba vam samo baza `NJP-projekt`. Direktorij `csv` ima samo dump baze `NJP-projekt`.

## Korisnici i poruke

U bazi postoji nekoliko korisnika (`korisnik, korisnik2, korisnik3, drugi_korisnik, treci_korisnik`). Lozinka svakog od tih korisnika ista je kao njegovo korisničko ime. Kroz aplikaciju možete registrirati nove korisnike.

Ne postoji korisnik koji je administrator cijele stranice. Svaki je korisnik administrator eventa kojeg napravi.

Ako u aplikaciji želite započeti novi razgovor s korisnikom, to možete napraviti na dva načina:

1.  Klikom na korisničko ime primatelja
2.  Odlaskom na putanju `/messages/:username` (gdje je `username` korisničko ime primatelja)
