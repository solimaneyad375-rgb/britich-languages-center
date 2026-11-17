# British Center for Languages
## المركز البريطاني لتعليم اللغات

[![Platform](https://img.shields.io/badge/Platform-React%2019%20%7C%20Vite%20%7C%20TypeScript-102F5C.svg)](https://britishcenter.uk)
[![Storage](https://img.shields.io/badge/Storage-LocalStorage%20Persistence-C5A04B.svg)]()
[![Aesthetic](https://img.shields.io/badge/Aesthetic-British%20Academic%20Luxury-102F5C.svg)]()
[![Bilingual](https://img.shields.io/badge/Bilingual-Arabic%20RTL%20%26%20English%20LTR-C8102E.svg)]()
[![Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

> **Brand Slogan:**
> *"Excellence in Education, Building Future Leaders."*
> *"التميز في التعليم وبناء قادة المستقبل."*

---

## 1. Project Overview & Architectural Scope

The **British Center for Languages (المركز البريطاني لتعليم اللغات)** is a pure, production-quality frontend web platform with a built-in **Simple Admin Dashboard**.

The application is completely self-contained and runs 100% in the user's browser without requiring any external backend server, database daemon, or API infrastructure. Data persistence is managed seamlessly through a centralized **LocalStorage** engine with reactive state updates.

### Official Brand Assets
- **Institutional Crest:** [`public/assets/logo.png`](file:///c:/Users/CompuMarts/Downloads/British-Center-Website/public/assets/logo.png) (Square emblem with Big Ben, Union Jack, open book, and official typography).
- **Institutional Panorama:** [`public/assets/cover.png`](file:///c:/Users/CompuMarts/Downloads/British-Center-Website/public/assets/cover.png) (Panoramic London skyline with Westminster Palace and the institutional motto *"Learn • Grow • Teach • Make a Difference"*).

### Color Palette & Visual Aesthetic
- **Primary Navy Blue (`#102F5C`):** Institutional authority, header, footers, and active navigation.
- **Luxury Gold (`#C5A04B`):** Crest borders, verified seals, buttons, and decorative accents.
- **British Red (`#C8102E`):** Flag flourishes, security stamps, and revocation status badges.
- **Pristine White (`#FFFFFF`):** Clean reading surfaces and card backgrounds.
- **Light Gray Background (`#F7F8FA`):** Elegant page body backdrop.

### Bilingual Typography & Bi-Directional Layout
- **English:** *Playfair Display* for authoritative serif titles; *Inter* for crisp body text.
- **Arabic:** *Cairo* for modern Arabic academic typography.
- Real-time language switcher toggles between Arabic RTL (Right-to-Left, default) and English LTR.

---

## 2. Public Website Pages

The public institutional website consists of 7 fully responsive, interactive pages:

1. **Home (`/`):**
   - Panoramic London architectural Hero with entrance animations and dynamic headlines.
   - Quick Certificate Verification widget with 1-click lookup.
   - Live credential showcase card.
   - Institutional About Us overview.
   - The 6 Core Educational Services.
   - Official UK Strategic Cooperation section.
   - Cooperating Partners logo showcase.
2. **About Us (`/about`):**
   - Who We Are, Institutional Vision, Mission, and Core Values.
   - UK registration disclosures (Companies House: `16605467`, UKRLP: `10099520`).
3. **Our Services (`/services`):**
   - 01. Educational Certificates & ID Cards (*إصدار الشهادات والكارنيهات التعليمية والمهنية*)
   - 02. Educational & Training Development (*بناء وتأهيل الكوادر التعليمية والتدريبية*)
   - 03. Institutional Development (*تطوير أداء المراكز والمؤسسات التعليمية*)
   - 04. Educational Programs & Courses (*تقديم البرامج والدورات التعليمية والتدريبية*)
   - 05. Professional Qualification (*دعم منظومة الشهادات والتأهيل المهني*)
   - 06. Certification Cooperation (*التعاون في مجال اعتماد الشهادات التعليمية والتدريبية*)
   - *Interactive deep-dive modal for each service.*
4. **Certificates & ID Cards (`/certificates` and `/id-cards`):**
   - Dedicated credentialing framework presentation.
   - Executive PVC student smart ID badge preview (CR80 standard) with chip, barcode, and QR code.
   - One-click print styling for physical card badge printing.
5. **Certificate Verification Portal (`/verify`):**
   - Dual search support: by **Certificate ID** (e.g. `BCL-2026-00125`) or **Student ID** (e.g. `BCL-STU-2026-001`).
   - Deep-linking support: visiting `/verify?certificate=BCL-2026-00125` automatically executes the search immediately!
   - Real-time status display: Valid (green seal, confetti, dynamic QR code), Revoked (crimson alert with recorded reason), Expired (amber alert), or Not Found.
   - **Download QR Code as PNG:** One-click export of the generated QR code.
6. **Our Partners (`/partners`):**
   - Responsive partner academy cards.
   - Dynamically reflects partners added or edited through the Admin Dashboard.
7. **Contact Us (`/contact`):**
   - Interactive inquiry submission form with client-side validation.
   - Dynamic contact information (phone, email, London address) synced from admin settings.

---

## 3. Simple Admin Dashboard (`/admin`)

Access the administration portal by navigating to `/admin` or `/login`.

### Demo Login Screen
- **Username:** `admin`
- **Password:** `admin` *(or `admin123`)*
- Clearly labeled as an interactive in-browser demonstration.

### Dashboard Sections
1. **Overview:**
   - Real-time metric counters: Total Students, Total Certificates, Total Partners, Verification Queries.
   - Monthly issuance chart & certificate status breakdown.
   - Recent Activity Timeline tracking student additions, certificate issuances, revocations, and verification checks.
   - Quick action shortcuts.
2. **Students Management:**
   - Search students by Name, Student ID, or Course.
   - **Add Student:** Modal to register new students with bilingual names, student ID, and status.
   - **Edit Student:** Modal to update student profile details.
   - **Delete Student:** Removes student record from LocalStorage.
   - **View ID Badge:** Opens interactive preview of the student's smart ID card.
3. **Certificates Management:**
   - Search and filter by status (`Valid`, `Pending`, `Revoked`, `Expired`).
   - **Issue Certificate:** Modal with **"Auto-Generate ID"** button (generates unique IDs like `BCL-2026-XXXXX`), student selector, course title, and grade.
   - **QR Code Modal:** Displays the certificate's unique QR code on canvas with a **"Download QR Code as PNG"** button!
   - **Revoke Certificate:** Formally marks a certificate as Revoked with a mandatory administrative reason and timestamp.
   - **Restore to Valid:** Instantly reactivates revoked or expired certificates.
   - **Edit & Delete:** Full control over certificate records.
4. **Partners Management:**
   - Add new cooperating institutions and academies.
   - **Logo Upload:** Supports both pasting an image URL or uploading an image file from disk (automatically encoded into a Base64 data URL).
   - Edit and delete partners; updates appear live on the public `/partners` page.
5. **Student ID Cards:**
   - Overview of generated student cards with one-click print preview.
6. **Website Content & Settings:**
   - Live editing of public website copy:
     - Homepage Headline (English & Arabic)
     - Homepage Description (English & Arabic)
     - About Us Narrative (English & Arabic)
     - Brand Slogan (English & Arabic)
     - Contact Phone, Contact Email, London Address
   - **Save Website Content:** Saves changes to LocalStorage and triggers instant re-rendering across the public site.
   - **Reset All Demo Data:** Prompts for confirmation and resets all students, certificates, partners, and settings back to default demo data.

---

## 4. LocalStorage Architecture & Data Flow

All application state is managed by [`frontend/src/services/storage.ts`](file:///c:/Users/CompuMarts/Downloads/British-Center-Website/frontend/src/services/storage.ts):

```
+-------------------------------------------------------------+
|                      Browser Window                         |
|                                                             |
|  +--------------------+         +------------------------+  |
|  |   Public Website   |         | Simple Admin Dashboard |  |
|  | (Home, Verify, ...) |         |   (/admin, /login)     |  |
|  +---------+----------+         +-----------+------------+  |
|            |                                |               |
|            |    Read / Write Operations     |               |
|            +--------------+-----------------+               |
|                           |                                 |
|                           v                                 |
|            +--------------------------------+               |
|            |     Central Storage Service    |               |
|            |   (frontend/src/services/...)  |               |
|            +--------------+-----------------+               |
|                           |                                 |
|            +--------------+-----------------+               |
|            |                                |               |
|            v                                v               |
|  +--------------------+         +------------------------+  |
|  | window.localStorage|         |  Custom Event Bus      |  |
|  | (Persistent Store) |         | (bcl_storage_updated)  |  |
|  +--------------------+         +------------------------+  |
|                                             |               |
|                      Notifies Components    |               |
|                      To Re-render Live <----+               |
+-------------------------------------------------------------+
```

### Pre-Seeded Demo Records (For Instant Testing)

| Type | Reference / Query | Name / Details | Status |
|---|---|---|---|
| **Valid Certificate** | `BCL-2026-00125` | Alexander James Sterling | Verified green seal, confetti, QR code download |
| **Valid Certificate** | `BCL-2026-00841` | Fatima Al-Zahra Mansour | Verified green seal, distinction grade |
| **Revoked Certificate** | `BCL-2026-00731` | Tarek Mahmoud El-Sayed | Revocation notice with recorded disciplinary reason |
| **Expired Certificate** | `BCL-2025-00410` | Sarah Elizabeth Jenkins | Expired amber notice |
| **Student ID** | `BCL-STU-2026-001` | Alexander James Sterling | Resolves to student profile & certificate |
| **Student ID** | `BCL-STU-2026-002` | Fatima Al-Zahra Mansour | Resolves to student profile & certificate |

---

## 5. Technology Stack

- **Framework:** React 19 (Functional Components, Hooks)
- **Bundler & Tooling:** Vite 8, TypeScript 5.9
- **Styling:** Tailwind CSS v4, custom CSS print stylesheets for CR80 PVC ID cards
- **Icons:** Lucide React
- **QR Code Engine:** `qrcode` library with dynamic `<canvas>` rendering and PNG export
- **Visual FX:** `canvas-confetti` for celebratory verification animation
- **Data Persistence:** Browser `window.localStorage`

---

## 6. Getting Started & Running the Project

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher.
- A modern web browser (Chrome, Edge, Firefox, Safari).

### Step 1: Navigate to the Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies (if not already installed)
```bash
npm install
```

### Step 3: Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### Step 4: Build for Production
```bash
npm run build
```
The optimized, static single-page application will be output to `frontend/dist/`. It can be hosted on any static web server (GitHub Pages, Netlify, Vercel, Cloudflare Pages, Nginx, Apache, or IIS).

---

## 7. Verification Quick Test URLs

- **Direct Certificate Search:**  
  `http://localhost:5173/verify?certificate=BCL-2026-00125`
- **Revoked Certificate Check:**  
  `http://localhost:5173/verify?certificate=BCL-2026-00731`
- **Expired Certificate Check:**  
  `http://localhost:5173/verify?certificate=BCL-2025-00410`
- **Admin Dashboard (Demo Login):**  
  `http://localhost:5173/admin` (Enter `admin` / `admin`)
- **Student Smart Badges:**  
  `http://localhost:5173/id-cards`

---

### Institutional Registration Notice
*British Center for Languages (المركز البريطاني لتعليم اللغات) partners strategically with UK International Education & Training (Companies House Registration No. 16605467, UKRLP Provider Reference No. 10099520). All rights reserved &copy; 2026.*
