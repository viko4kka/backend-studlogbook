﻿# Student-LogBook-Backend
## Dokumentacja projektu
### Przegląd 
Projekt jest backendowym API zaprojektowanym o dwóch rolach: nauczyciel (teacher) oraz student. Aplikacja pozwala nauczycielowi na pełne zarządzanie przedmiotami (kursami), podczas gdy student ma dostęp jedynie do przeglądania szczegółów kursów. Wykorzystano Node.js, Express oraz Sequelize z bazą danych PostgreSQL. Aplikacja obsługuje autentykację za pomocą JWT oraz wprowadza kontrolę dostępu na podstawie ról.
### Głowne funkcje:
- Autentykacja użytkowników: Użytkownicy (nauczyciele i studenci) mogą się rejestrować i logować, uzyskując dostęp do odpowiednich zasobów za pomocą tokenów JWT.
- Zarządzanie kursami przez nauczyciela. Nauczyciel ma możliwość tworzenia, edytowania, usuwania kursów oraz przypisywania studentów do kursów.
- Przeglądanie kursów przez studentów. Studenci mogą przeglądać dostępne kursy oraz ich szczegóły, do których są przypisani.

## Enpointy 
### Route Auth
- POST /api/auth/register
  -   Rejestracja nowego użytkownika. Przy rejestracji użytkownik wybiera rolę (nauczyciel lub student).
  -   Parametry - **userName**, **email**, **password**, **confirmPassword**, **role**.
  -   Odpowiedź polega na danych użytkonwika oraz tokenu JWT, który pozwala na logowania i autentykację

- POST /api/auth/login
  - Logowanie za pomocą e-maila oraz password
  - Parametry - **email**, **password**
  - Token JWT, który jest wykorzystywany w dalszych zapytaniach w celu autentykacji użytkownika(np. przy rolach)
 
- POST /api/auth/retrive-user
  - Pobiera dane użytkwonika po weryfikacji tokena.
  - Parametry: token
  - Opowiedz polega na danych użytkownika (userName, email, role)
 
### Route Przedmiotów (Course)

- POST /api/course/create
  - Tworzenie nowego przedmiotu przez nauczyciela
  - Parametry - title, description, startDate, endDate, teacherId

- GET /api/course/all-courses
  -  Pobranie listy wszystkich dostępnych przedmiotów. Endpoint dostępny zarówno dla nauczycieli, jak i studentów.
  -  List przedmiorów

- GET /api/course/:id
  -  Pobranie szczegółów przedmitu po jego ID. Endpoint dostępny dla wszystkich użytkowników
   
- PUT /api/course/:id
  - Aktualizacja przedmitu. Tylko nauczyciel, który stworzył przedmit, ma dostęp do tego endpointu.
  
- DELETE /api/course/:id
  - Usuwanie przedmitu po ID. Tylko nauczyciel, który stworzył przedmit, może go usunąć.
   
- GET /api/course/all/students
  - Pobranie listy wszystkich studentów przypisanych do przedmiotu. Endpoint dostępny dla nauczyciela.

- POST /api/course/student/add:
  - Dodanie studentów do kursu przez nauczyciela.
  - Parametry: courseId, studentsIds

## Przegląd sequelize
  
**Sequelize** to biblioteka ORM (Object-Relational Mapping), która umożliwia łatwą interakcję z bazą danych, korzystając z modelów w JavaScript, zamiast bezpośredniego pisania zapytań SQL. W projekcie Sequelize jest używany do tworzenia tabel w bazie danych, zarządzania migracjami oraz operacjami na rekordach.

## Głowne funckji
- Modele. Reprezentują tabele w bazie danych, takie jak **User** (użytkownik), **Course** (przedmiot).
- Migracje. Umożliwiają wersjonowanie struktury bazy danych, co ułatwia zarządzanie zmianami w schemacie.
- Zapytania. Umożliwiają wykonywanie operacji na danych, takich jak tworzenie, pobieranie, aktualizowanie i usuwanie rekordów.

  ## Uruchomianie projektu

1. Skopiuj repo
   git clone <adres-repo>
2. Przjedz do folderu projektu
   cd <folder-projektu>
3. Zainstalowac zależności
   npm install
4. Skonfiguruj bazę danych
   npx sequelize-cli db:migrate
5. Uruchomic serwer
   npm start
      
  
