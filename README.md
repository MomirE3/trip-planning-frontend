# Trip Planning Frontend

Frontend aplikacija za predmetni projekat iz predmeta **Primena veb programiranja u infrastrukturnim sistemima**.

Tema projekta je razvoj web aplikacije za planiranje putovanja. Aplikacija korisniku omogucava da organizuje osnovne podatke o putovanju, destinacije, dnevni plan aktivnosti, troskove, budzet, beleske, checklistu i deljenje plana sa drugim osobama.

## Tehnologije

- React
- TypeScript
- Vite
- React Router
- Redux Toolkit
- React Redux
- Ant Design
- REST API komunikacija sa backend servisima

## Instalacija dependency-ja

Za routing, globalno stanje i UI biblioteku koristimo:

```bash
npm i react-router @reduxjs/toolkit react-redux antd
```

Napomena: za aktuelni React Router data mode koristi se paket `react-router`, a ne `react-router-dom`.

## Da li je propisana struktura fajlova?

Zadatak ne trazi jednu tacno odredjenu strukturu foldera.

Mozemo organizovati frontend kako hocemo, ali moramo ispostovati sledeca pravila:

- frontend mora biti podeljen po komponentama
- HTTP pozivi ne smeju biti direktno u komponentama
- API pozivi moraju biti izdvojeni u servisima
- URL backend-a i eksternih servisa mora biti u `.env` fajlu
- moraju postojati frontend modeli i DTO tipovi
- aplikacija mora imati jasno odvojene stranice/prikaze
- mora postojati mehanizam za upravljanje stanjem aplikacije
- forme moraju imati validaciju
- treba prikazivati poruke o uspesnim i neuspesnim operacijama
- treba obraditi greske koje dolaze sa backend-a

Zato koristimo **component-based feature arhitekturu**. To znaci da svaki veci ekran, forma ili funkcionalni UI modul ima svoj folder i u njemu drzi svoje fajlove:

- komponentu
- lokalne tipove
- custom hook
- service za API pozive ako taj modul komunicira sa backendom
- Redux slice ili lokalni store fajl ako taj modul ima state koji treba deliti
- `index.ts` za javni export

Primer za login:

```txt
Login/
  Login.tsx
  login.types.ts
  useLogin.ts
  login.service.ts
  login.slice.ts
  index.ts
```

Ovim se izbegava jedan veliki `auth/types`, `auth/services` ili `auth/store` folder koji brzo postane neuredan.

## Funkcionalni zahtevi za frontend

### Autentikacija i korisnicke uloge

Frontend treba da podrzi:

- registraciju korisnika
- logovanje korisnika
- logout
- cuvanje access tokena
- prikaz UI elemenata na osnovu role korisnika
- role: `USER` i `ADMIN`
- zasticene rute za ulogovane korisnike
- admin rute dostupne samo admin korisniku

### Upravljanje planovima putovanja

Korisnik treba da moze da:

- kreira novi plan putovanja
- vidi listu svojih planova
- otvori detalje pojedinacnog plana
- izmeni osnovne podatke plana
- obrise plan putovanja

Plan putovanja sadrzi:

- naziv
- opis
- pocetni datum
- krajnji datum
- planirani budzet
- opste napomene

### Upravljanje destinacijama

Za svaki plan putovanja korisnik treba da moze da:

- doda destinaciju
- vidi listu destinacija
- izmeni destinaciju
- obrise destinaciju

Destinacija sadrzi:

- naziv
- lokaciju
- datum dolaska
- datum odlaska
- opis ili napomenu

### Aktivnosti po danima

Frontend treba da omoguci:

- prikaz aktivnosti grupisanih po datumu
- calendar view za laksi pregled
- dodavanje aktivnosti
- izmenu aktivnosti
- brisanje aktivnosti
- prikaz statusa aktivnosti

Aktivnost sadrzi:

- naziv
- datum
- vreme
- lokaciju
- opis
- procenjeni trosak
- status: `PLANNED`, `RESERVED`, `DONE`, `CANCELLED`

### Troskovi i budzet

Frontend treba da omoguci:

- unos troska
- izmenu troska
- brisanje troska
- prikaz troskova po kategoriji
- automatski prikaz ukupnih troskova
- automatski prikaz preostalog budzeta

Kategorije troskova:

- prevoz
- smestaj
- hrana
- ulaznice
- kupovina
- ostalo

### Pregled plana putovanja

Detalj plana treba da bude organizovan kroz sekcije ili tabove:

- pregled
- destinacije
- aktivnosti
- kalendar
- troskovi
- checklist
- beleske
- deljenje

### Checklist / packing lista

Korisnik treba da moze da:

- kreira stavku checkliste
- oznaci stavku kao zavrsenu
- izmeni stavku
- obrise stavku

Primeri stavki:

- pasos
- karta
- rezervacija smestaja
- putno osiguranje
- punjac
- garderoba

### Deljenje plana putovanja

Frontend treba da podrzi:

- generisanje linka ili QR koda za deljenje plana
- prikaz plana preko share tokena
- razlikovanje pristupa `VIEW` i `EDIT`
- sakrivanje edit akcija ako korisnik ima samo `VIEW` pristup

Backend validira token i konacno odlucuje da li je operacija dozvoljena.

### Admin deo

Admin korisnik treba da ima dodatne stranice za:

- pregled korisnickih naloga
- pregled sadrzaja sistema
- administraciju korisnika
- eventualno brisanje ili deaktiviranje naloga

### Dodatna nadogradnja

Za ovaj projekat je za frontend najprirodnija nadogradnja:

**Prikaz plana putovanja na mapi.**

Mapa treba da prikaze:

- markere za lokacije aktivnosti
- redosled obilaska
- liniju rute izmedju aktivnosti
- rutu po danu ili za celo putovanje

## Validacije na frontendu

Frontend treba da proverava osnovna pravila pre slanja zahteva backend-u:

- naziv putovanja je obavezan
- pocetni datum je obavezan
- krajnji datum je obavezan
- krajnji datum ne sme biti pre pocetnog datuma
- budzet ne sme biti negativan
- naziv destinacije je obavezan
- datum odlaska ne sme biti pre datuma dolaska
- naziv aktivnosti je obavezan
- trosak ne sme biti negativan
- email mora biti validnog formata
- lozinka mora imati minimalnu duzinu

Backend svakako mora ponovo validirati sve podatke.

## Predlozena struktura fajlova

```txt
src/
  app/
    App.tsx
    AppProviders.tsx
    router.tsx
    store.ts
    storeHooks.ts

  config/
    env.ts
    routes.ts

  layouts/
    AuthLayout/
      AuthLayout.tsx
      authLayout.types.ts
      index.ts
    AppLayout/
      AppLayout.tsx
      appLayout.types.ts
      index.ts
    AdminLayout/
      AdminLayout.tsx
      adminLayout.types.ts
      index.ts

  features/
    auth/
      Login/
        Login.tsx
        login.types.ts
        useLogin.ts
        login.service.ts
        login.slice.ts
        index.ts
      Register/
        Register.tsx
        register.types.ts
        useRegister.ts
        register.service.ts
        index.ts
      LogoutButton/
        LogoutButton.tsx
        useLogoutButton.ts
        index.ts
      ProtectedRoute/
        ProtectedRoute.tsx
        protectedRoute.types.ts
        index.ts
      AdminRoute/
        AdminRoute.tsx
        adminRoute.types.ts
        index.ts

    trips/
      TripList/
        TripList.tsx
        tripList.types.ts
        useTripList.ts
        tripList.service.ts
        tripList.slice.ts
        index.ts
      TripCard/
        TripCard.tsx
        tripCard.types.ts
        index.ts
      TripForm/
        TripForm.tsx
        tripForm.types.ts
        useTripForm.ts
        tripForm.service.ts
        index.ts
      TripDetails/
        TripDetails.tsx
        tripDetails.types.ts
        useTripDetails.ts
        tripDetails.service.ts
        tripDetails.slice.ts
        index.ts

    destinations/
      DestinationList/
        DestinationList.tsx
        destinationList.types.ts
        useDestinationList.ts
        destinationList.service.ts
        index.ts
      DestinationForm/
        DestinationForm.tsx
        destinationForm.types.ts
        useDestinationForm.ts
        destinationForm.service.ts
        index.ts

    activities/
      ActivityList/
        ActivityList.tsx
        activityList.types.ts
        useActivityList.ts
        activityList.service.ts
        index.ts
      ActivityForm/
        ActivityForm.tsx
        activityForm.types.ts
        useActivityForm.ts
        activityForm.service.ts
        index.ts
      CalendarView/
        CalendarView.tsx
        calendarView.types.ts
        useCalendarView.ts
        index.ts
      ActivityStatusBadge/
        ActivityStatusBadge.tsx
        activityStatusBadge.types.ts
        index.ts

    expenses/
      ExpenseList/
        ExpenseList.tsx
        expenseList.types.ts
        useExpenseList.ts
        expenseList.service.ts
        index.ts
      ExpenseForm/
        ExpenseForm.tsx
        expenseForm.types.ts
        useExpenseForm.ts
        expenseForm.service.ts
        index.ts
      BudgetSummary/
        BudgetSummary.tsx
        budgetSummary.types.ts
        useBudgetSummary.ts
        index.ts

    checklist/
      Checklist/
        Checklist.tsx
        checklist.types.ts
        useChecklist.ts
        checklist.service.ts
        checklist.slice.ts
        index.ts
      ChecklistItem/
        ChecklistItem.tsx
        checklistItem.types.ts
        index.ts

    sharing/
      SharePlanDialog/
        SharePlanDialog.tsx
        sharePlanDialog.types.ts
        useSharePlanDialog.ts
        sharePlanDialog.service.ts
        index.ts
      SharedTripView/
        SharedTripView.tsx
        sharedTripView.types.ts
        useSharedTripView.ts
        sharedTripView.service.ts
        index.ts
      QrCodeView/
        QrCodeView.tsx
        qrCodeView.types.ts
        index.ts

    maps/
      TripMap/
        TripMap.tsx
        tripMap.types.ts
        useTripMap.ts
        tripMap.service.ts
        index.ts
      RoutePolyline/
        RoutePolyline.tsx
        routePolyline.types.ts
        index.ts

    admin/
      AdminDashboard/
        AdminDashboard.tsx
        adminDashboard.types.ts
        useAdminDashboard.ts
        adminDashboard.service.ts
        index.ts
      UserTable/
        UserTable.tsx
        userTable.types.ts
        useUserTable.ts
        userTable.service.ts
        index.ts

  shared/
    components/
      AppButton/
        AppButton.tsx
        appButton.types.ts
        index.ts
      PageHeader/
        PageHeader.tsx
        pageHeader.types.ts
        index.ts
      FormError/
        FormError.tsx
        formError.types.ts
        index.ts
      LoadingState/
        LoadingState.tsx
        loadingState.types.ts
        index.ts
    services/
      apiClient.ts
      tokenStorage.ts
    types/
      api.types.ts
      common.types.ts
    utils/
      dateUtils.ts
      moneyUtils.ts
      validationUtils.ts

  styles/
    globals.css
    variables.css

  main.tsx
  index.css
```

## React Router plan

Koristimo React Router data mode.

Instalacija:

```bash
npm i react-router
```

Osnovni setup:

```tsx
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
```

Planirane rute:

```txt
/login
/register
/trips
/trips/new
/trips/:tripId
/trips/:tripId/edit
/shared/:shareToken
/admin
/admin/users
```

Rute koje zahtevaju autentikaciju treba da budu zasticene kroz `ProtectedRoute`.
Admin rute treba da budu zasticene kroz `AdminRoute`.

## Redux plan

Koristimo Redux Toolkit i React Redux.

Globalni Redux store ide u:

```txt
src/app/store.ts
src/app/storeHooks.ts
```

Slice fajl ne mora uvek da bude jedan po velikom feature-u. Kada state pripada konkretnom modulu, slice stoji uz taj modul.

Primer:

```txt
features/trips/TripList/tripList.slice.ts
features/trips/TripDetails/tripDetails.slice.ts
features/checklist/Checklist/checklist.slice.ts
```

Redux cuva stanje koje je bitno kroz vise komponenti i stranica:

- trenutno ulogovani korisnik
- access token
- lista planova
- trenutno otvoren plan
- status ucitavanja
- greske
- globalne success/error poruke

Lokalni state ostaje u komponentama za manje UI stvari kao sto su otvoren modal, aktivan tab ili trenutna vrednost inputa pre submit-a.

## Ant Design plan

Ant Design koristimo za osnovne UI elemente:

- `Button`
- `Form`
- `Input`
- `Select`
- `DatePicker`
- `Table`
- `Card`
- `Tabs`
- `Modal`
- `Calendar`
- `Tag`
- `Alert`
- `message`

AntD komponente mogu da se koriste direktno u feature komponentama, ali za cesto ponavljane obrasce pravimo shared wrapper komponente u `src/shared/components`.

## API servisi

Komponente ne smeju direktno da pozivaju `fetch` ili `axios`.

Svaki modul koji komunicira sa backendom ima svoj service fajl:

```txt
features/auth/Login/login.service.ts
features/trips/TripList/tripList.service.ts
features/trips/TripForm/tripForm.service.ts
features/expenses/ExpenseList/expenseList.service.ts
```

Zajednicka konfiguracija HTTP klijenta ide u:

```txt
src/shared/services/apiClient.ts
```

Taj fajl treba da:

- cita base URL iz `.env`
- dodaje authorization header ako token postoji
- obradjuje osnovne API greske
- vraca tipizovane odgovore

## Environment konfiguracija

Primer `.env` fajla:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_MAP_PROVIDER_URL=https://example-map-provider.com
```

U kodu se vrednosti citaju preko `import.meta.env`.

Primer:

```ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
```

## Pokretanje projekta

Instalacija dependency-ja:

```bash
npm install
```

Pokretanje development servera:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Napomene za backend integraciju

Frontend ocekuje da backend postuje REST konvencije za nazivanje resursa.

Primeri resursa:

```txt
/api/auth/login
/api/auth/register
/api/trips
/api/trips/:tripId
/api/trips/:tripId/destinations
/api/trips/:tripId/activities
/api/trips/:tripId/expenses
/api/trips/:tripId/checklist-items
/api/trips/:tripId/share-links
/api/admin/users
```

Lozinke se ne obradjuju na frontendu osim kroz unos i slanje backend-u preko HTTPS-a. Hashiranje lozinki, validacija potpisa tokena i validacija isteka tokena su odgovornost backend-a.
