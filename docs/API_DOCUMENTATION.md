# British Center for Languages - API Documentation
## المركز البريطاني لتعليم اللغات - توثيق واجهة برمجة التطبيقات

### Base URL
- Development: `http://localhost:5000/api` or `https://localhost:7000/api`
- Production: `https://api.britishcenter.uk/api`

---

## 1. Authentication Endpoints

### `POST /api/auth/login`
Authenticates administrative and staff personnel. Returns a secure JSON Web Token (JWT).

**Request Body:**
```json
{
  "username": "admin",
  "password": "AdminPassword2024!"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresInSeconds": 86400,
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@britishcenter.uk",
    "fullName": "Chief Academic Administrator",
    "role": "SuperAdmin",
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLoginAt": "2024-11-15T10:00:00Z"
  }
}
```

### `GET /api/auth/me`
*Requires `Bearer` token header.*
Returns the authenticated user's current session claims.

---

## 2. Public Certificate Verification Endpoints (No Auth Required)

### `GET /api/verify?query={certNumberOrStudentId}`
Authenticates and queries the official registry for a given Certificate Reference or Student ID.
Rate-limited and logged to `VerificationLogs` database table.

**Query Parameters:**
- `query` (string, required): e.g. `BCL-CERT-2024-8841` or `BCL-STU-2024-001` or 32-char hex token.

**Response (200 OK - Found & Valid):**
```json
{
  "isFound": true,
  "isValid": true,
  "status": "Valid",
  "statusBadgeColor": "green",
  "messageEn": "Certificate Record Verified. The credential has been authenticated against the official institution registry.",
  "messageAr": "تم العثور على سجل الشهادة والتحقق من صحة بياناتها وسريان اعتمادها رسمياً.",
  "studentNameEn": "Alexander James Sterling",
  "studentNameAr": "ألكسندر جيمس ستيرلنج",
  "studentIdNumber": "BCL-STU-2024-001",
  "certificateNumber": "BCL-CERT-2024-8841",
  "uniqueToken": "d9a7c3b2e1f44567890abcdef1234567",
  "courseNameEn": "Executive Diploma in Advanced English & Institutional Leadership",
  "courseNameAr": "الدبلوم التنفيذي في اللغة الإنجليزية المتقدمة والقيادة المؤسسية",
  "issueDate": "2024-06-15T00:00:00Z",
  "expiryDate": null,
  "issuingOrganizationEn": "British Center for Languages",
  "issuingOrganizationAr": "المركز البريطاني لتعليم اللغات",
  "accreditingEntityEn": "UK International Education & Training",
  "accreditingEntityAr": "التعليم والتدريب الدولي البريطاني",
  "gradeEn": "Distinction",
  "gradeAr": "امتياز مع مرتبة الشرف",
  "qrVerificationUrl": "https://britishcenter.uk/verify/certificate/d9a7c3b2e1f44567890abcdef1234567"
}
```

**Response (200 OK - Found & Revoked):**
```json
{
  "isFound": true,
  "isValid": false,
  "status": "Revoked",
  "statusBadgeColor": "red",
  "messageEn": "Certificate Revoked. This certificate has been officially revoked and is no longer valid.",
  "messageAr": "تم إلغاء الشهادة رسمياً بقرار إداري وأصبحت غير صالحة للاستخدام.",
  "studentNameEn": "Tarek Mahmoud El-Sayed",
  "studentNameAr": "طارق محمود السيد",
  "certificateNumber": "BCL-CERT-2024-7731",
  "revocationReason": "Administrative decision: candidate breached examination compliance rules / قرار إداري: مخالفة ضوابط الامتحانات المعتمدة",
  "revokedAt": "2024-05-12T14:30:00Z"
}
```

**Response (200 OK - Not Found):**
```json
{
  "isFound": false,
  "isValid": false,
  "status": "NotFound",
  "messageEn": "Certificate record not found in the official registry. Please check the reference number.",
  "messageAr": "لم يتم العثور على سجل الشهادة في قاعدة البيانات الرسمية. يرجى التأكد من الرقم المدخل."
}
```

### `GET /api/verify/token/{token}`
Direct destination endpoint scanned from physical certificate QR codes.

### `GET /api/verify/qr/{token}`
Dynamic SVG generation endpoint returning standalone SVG markup for any certificate token.

---

## 3. Student Management Endpoints (`/api/students`)
*Requires `Bearer` token header.*

- `GET /api/students`: Lists registered students with pagination, search, and status filter.
- `GET /api/students/{id}`: Returns complete student dossier including all issued certificates and ID cards.
- `POST /api/students`: Registers a new student.
- `PUT /api/students/{id}`: Updates an existing student record.
- `DELETE /api/students/{id}`: Soft-deletes a student record (audited).
- `POST /api/students/{id}/generate-id-card`: Generates a digital student ID card record.

---

## 4. Certificate Management Endpoints (`/api/certificates`)
*Requires `Bearer` token header.*

- `GET /api/certificates`: Lists all certificates with status filtering and search.
- `GET /api/certificates/{id}`: Retrieves certificate details.
- `POST /api/certificates`: Issues a new certificate, generating a cryptographic 32-character unique verification token.
- `PUT /api/certificates/{id}`: Updates certificate attributes.
- `POST /api/certificates/{id}/revoke`: Revokes a certificate. Requires a mandatory audit reason.
- `DELETE /api/certificates/{id}`: Soft-deletes a certificate record (audited).

---

## 5. Partners & Institutional Cooperation (`/api/partners`)

- `GET /api/partners`: Public endpoint returning active institutional partners.
- `GET /api/partners/all`: Admin endpoint returning all partners.
- `POST /api/partners`: Adds a partner institution.
- `PUT /api/partners/{id}`: Updates partner information.
- `DELETE /api/partners/{id}`: Removes a partner.

---

## 6. Services & Syllabus Endpoints (`/api/services`)

- `GET /api/services`: Returns the 6 core institutional services.
- `GET /api/services/{id}`: Returns specific service details.

---

## 7. Contact & Inquiries (`/api/contact`)

- `POST /api/contact`: Public submission form.
- `GET /api/contact`: Admin inbox of received communications.
- `PUT /api/contact/{id}/read`: Marks inquiry as read.

---

## 8. Dashboard Statistics & Telemetry (`/api/dashboard`)
*Requires `Bearer` token header.*

- `GET /api/dashboard/stats`: Returns live database statistics:
  - Total Students
  - Total Certificates
  - Valid, Pending, Revoked, Expired certificate counts
  - Monthly certificate issuance trend
  - Status distribution for charts
  - Recent live verification inquiries

