# British Center for Languages - Production Deployment Guide
## دليل النشر والتشغيل للمركز البريطاني لتعليم اللغات

This comprehensive guide outlines the procedures for deploying the **British Center for Languages** platform to production environments.

---

## 1. System Requirements

### Server Specifications (Minimum Recommendations)
- **Web/Application Server:**
  - CPU: 2+ vCPUs (x64)
  - Memory: 4 GB RAM (8 GB recommended for high concurrent loads)
  - Disk: 20 GB SSD storage
  - OS: Windows Server 2022 / Windows Server 2019 or Ubuntu 22.04 LTS / 24.04 LTS
- **Database Server:**
  - Microsoft SQL Server 2019, 2022, or Azure SQL Database
  - Memory: 4 GB+ allocated to SQL Server
  - Storage: SSD with automated transaction log backups

### Runtime Prerequisites
- [.NET 10 Runtime / ASP.NET Core Hosting Bundle](https://dotnet.microsoft.com/download/dotnet/10.0)
- Node.js 18+ (for building the frontend assets)
- Reverse proxy / Web server: Nginx or Microsoft IIS 10.0+ with URL Rewrite module

---

## 2. Database Deployment & Configuration

### A. Initializing the Database via SQL Script
1. Connect to your production SQL Server instance via **SQL Server Management Studio (SSMS)** or `sqlcmd`.
2. Open and execute [`docs/database-schema.sql`](file:///c:/Users/CompuMarts/Downloads/British-Center-Website/docs/database-schema.sql).
3. The script will:
   - Create `BritishCenterDb` with optimal collation (`SQL_Latin1_General_CP1_CI_AS` supporting bilingual content).
   - Create all normalized tables (`Users`, `Students`, `Certificates`, `StudentIdCards`, `Partners`, `Services`, `ContactMessages`, `VerificationLogs`, `AuditLogs`, `PlatformSettings`).
   - Create unique filtered indexes for `CertificateNumber`, `UniqueToken`, and `StudentIdNumber`.
   - Seed the initial Super Administrator account and initial catalog of the 6 official services.

### B. Configuring Connection Security
Create a dedicated SQL Server user with restricted permissions:
```sql
USE BritishCenterDb;
CREATE LOGIN BritishCenterUser WITH PASSWORD = 'StrongProductionPassword2024!';
CREATE USER BritishCenterUser FOR LOGIN BritishCenterUser;
ALTER ROLE db_datareader ADD MEMBER BritishCenterUser;
ALTER ROLE db_datawriter ADD MEMBER BritishCenterUser;
GRANT EXECUTE TO BritishCenterUser;
```

---

## 3. Backend API Deployment

### Step 1: Publish the Application
Publish the ASP.NET Core Web API project in Release mode:
```powershell
dotnet publish backend/BritishCenter.Api/BritishCenter.Api.csproj -c Release -o ./publish/backend
```

### Step 2: Configure Production `appsettings.Production.json`
Inside the published directory `./publish/backend`, create or edit `appsettings.Production.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:sql.britishcenter.uk,1433;Database=BritishCenterDb;User ID=BritishCenterUser;Password=StrongProductionPassword2024!;Encrypt=True;TrustServerCertificate=False;MultipleActiveResultSets=True;"
  },
  "Jwt": {
    "Key": "REPLACE_WITH_A_SECURE_64_CHARACTER_CRYPTOGRAPHIC_SECRET_KEY!",
    "Issuer": "https://api.britishcenter.uk",
    "Audience": "https://britishcenter.uk",
    "ExpireDays": 7
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning",
      "BritishCenter.Api": "Information"
    }
  },
  "AllowedHosts": "api.britishcenter.uk"
}
```

---

### Deployment Option A: Windows Server & IIS
1. Install the **ASP.NET Core Hosting Bundle** for .NET 10 on the Windows Server.
2. Open **IIS Manager**, create a new Application Pool named `BritishCenterApiPool`:
   - .NET CLR Version: `No Managed Code`
   - Managed Pipeline Mode: `Integrated`
3. Create a new Website or Application pointing to `C:\inetpub\wwwroot\britishcenter-api`.
4. Ensure the application pool identity has read/write permissions to the publish directory (needed for XML Data Protection keys in `./DataProtection-Keys`).
5. Ensure a valid `web.config` is present:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" arguments=".\BritishCenter.Api.dll" stdoutLogEnabled="true" stdoutLogFile=".\logs\stdout" hostingModel="inprocess" />
    </system.webServer>
  </location>
</configuration>
```

---

### Deployment Option B: Linux (Ubuntu) with Nginx & systemd
1. Copy `./publish/backend` to `/var/www/britishcenter-api`.
2. Set ownership:
   ```bash
   sudo chown -R www-data:www-data /var/www/britishcenter-api
   ```
3. Create a systemd service file `/etc/systemd/system/britishcenter-api.service`:
   ```ini
   [Unit]
   Description=British Center for Languages API
   After=network.target

   [Service]
   WorkingDirectory=/var/www/britishcenter-api
   ExecStart=/usr/bin/dotnet /var/www/britishcenter-api/BritishCenter.Api.dll --urls http://127.0.0.1:5000
   Restart=always
   RestartSec=10
   KillSignal=SIGINT
   SyslogIdentifier=britishcenter-api
   User=www-data
   Environment=ASPNETCORE_ENVIRONMENT=Production
   Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

   [Install]
   WantedBy=multi-user.target
   ```
4. Enable and start the service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable britishcenter-api.service
   sudo systemctl start britishcenter-api.service
   ```
5. Configure Nginx reverse proxy block in `/etc/nginx/sites-available/api.britishcenter.uk`:
   ```nginx
   server {
       listen 80;
       server_name api.britishcenter.uk;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name api.britishcenter.uk;

       ssl_certificate /etc/letsencrypt/live/api.britishcenter.uk/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/api.britishcenter.uk/privkey.pem;

       location / {
           proxy_pass         http://127.0.0.1:5000;
           proxy_http_version 1.1;
           proxy_set_header   Upgrade $http_upgrade;
           proxy_set_header   Connection keep-alive;
           proxy_set_header   Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header   X-Forwarded-Proto $scheme;
       }
   }
   ```

---

## 4. Frontend Deployment

### Step 1: Build the Production Bundle
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Build the distribution assets:
   ```bash
   npm run build
   ```
3. The production bundle is compiled into `frontend/dist/`.

### Step 2: Configure Environment Variables
In production, point your frontend API client to the live API domain. In `frontend/src/services/api.ts` (or `.env.production`):
```env
VITE_API_URL=https://api.britishcenter.uk/api
```

### Step 3: Deploy Frontend Assets

#### Nginx Static Configuration:
```nginx
server {
    listen 80;
    server_name britishcenter.uk www.britishcenter.uk;
    return 301 https://britishcenter.uk$request_uri;
}

server {
    listen 443 ssl http2;
    server_name britishcenter.uk;

    root /var/www/britishcenter-web;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/britishcenter.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/britishcenter.uk/privkey.pem;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, no-transform, immutable";
    }

    # SPA routing: all routes fallback to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### IIS Configuration (`web.config` in `/dist`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="SPA Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
    </staticContent>
  </system.webServer>
</configuration>
```

---

## 5. Security Hardening Checklist

| Security Control | Implementation Standard | Status |
|---|---|---|
| **HTTPS Enforcement** | TLS 1.2 and TLS 1.3 only; HSTS enabled with `max-age=31536000` | Recommended |
| **CORS Policy** | Restrict origins strictly to `https://britishcenter.uk` | In `Program.cs` |
| **Password Hashing** | Cryptographic PBKDF2 SHA-256 with 100,000 iterations & random salt | Implemented |
| **JWT Secrets** | Minimum 256-bit (32 bytes) random cryptographic key; do not commit to Git | Configured |
| **SQL Injection** | Parameterized queries via Entity Framework Core & stored queries | Implemented |
| **Public Data Masking** | Personal email, phone, and national ID never exposed via public `/verify` | Implemented |
| **Rate Limiting** | Rate-limit public verification endpoint to 60 queries/min/IP | Recommended via Nginx / Cloudflare |
| **Audit Trails** | Every certificate issuance, modification, or revocation logged to `AuditLogs` | Implemented |

---

## 6. Health Checks & Verification Testing

Following deployment, execute smoke tests to ensure platform integrity:

1. **API Health Endpoint:**
   ```bash
   curl -i https://api.britishcenter.uk/api/health
   ```
   *Expected Response: HTTP 200 with `status: "Healthy"` and UK registration data.*

2. **Public Certificate Verification:**
   ```bash
   curl -i "https://api.britishcenter.uk/api/verify?query=BCL-CERT-2024-8841"
   ```
   *Expected Response: HTTP 200 with `isValid: true` and Alexander James Sterling details.*

3. **Frontend Verification Page:**
   Navigate in browser to:
   - `https://britishcenter.uk/verify`
   - Test certificate query `BCL-CERT-2024-8841`
   - Test student ID query `BCL-STU-2024-001`
   - Test direct QR route `https://britishcenter.uk/verify/certificate/d9a7c3b2e1f44567890abcdef1234567`

4. **Admin Dashboard Access:**
   Navigate to `https://britishcenter.uk/login`, log in with administrator credentials, and verify telemetry and management tabs.

---

*For technical inquiries or infrastructure support, contact the British Center System Operations Team at `support@britishcenter.uk`.*

