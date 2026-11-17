-- ==========================================================
-- BRITISH CENTER FOR LANGUAGES (المركز البريطاني لتعليم اللغات)
-- Production SQL Server Database Schema (DDL)
-- Generated for ASP.NET Core & EF Core
-- ==========================================================

USE master;
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'BritishCenterDb')
BEGIN
    CREATE DATABASE BritishCenterDb;
END
GO

USE BritishCenterDb;
GO

-- 1. Users & Identity Table
IF OBJECT_ID(N'dbo.Users', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Username NVARCHAR(100) NOT NULL,
        Email NVARCHAR(150) NOT NULL,
        PasswordHash NVARCHAR(MAX) NOT NULL,
        FullName NVARCHAR(100) NOT NULL,
        Role INT NOT NULL DEFAULT 2, -- 0=SuperAdmin, 1=Admin, 2=Staff
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        LastLoginAt DATETIME2 NULL,
        CONSTRAINT UQ_Users_Username UNIQUE (Username),
        CONSTRAINT UQ_Users_Email UNIQUE (Email)
    );
END
GO

-- 2. Students Registry Table
IF OBJECT_ID(N'dbo.Students', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Students (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        StudentIdNumber NVARCHAR(50) NOT NULL,
        FullNameEn NVARCHAR(150) NOT NULL,
        FullNameAr NVARCHAR(150) NOT NULL,
        Email NVARCHAR(150) NULL,
        Phone NVARCHAR(50) NULL,
        NationalId NVARCHAR(50) NULL,
        ProgramEn NVARCHAR(150) NOT NULL,
        ProgramAr NVARCHAR(150) NOT NULL,
        AcademyEn NVARCHAR(150) NOT NULL DEFAULT N'British Center for Languages',
        AcademyAr NVARCHAR(150) NOT NULL DEFAULT N'المركز البريطاني لتعليم اللغات',
        Status INT NOT NULL DEFAULT 0, -- 0=Active, 1=Inactive, 2=Graduated, 3=Suspended
        PhotoUrl NVARCHAR(500) NULL,
        RegistrationDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT UQ_Students_StudentIdNumber UNIQUE (StudentIdNumber)
    );
    CREATE INDEX IX_Students_Status ON dbo.Students(Status);
END
GO

-- 3. Certificates Registry Table
IF OBJECT_ID(N'dbo.Certificates', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Certificates (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        CertificateNumber NVARCHAR(50) NOT NULL,
        UniqueToken NVARCHAR(100) NOT NULL,
        StudentId INT NOT NULL,
        CourseNameEn NVARCHAR(200) NOT NULL,
        CourseNameAr NVARCHAR(200) NOT NULL,
        IssueDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        ExpiryDate DATETIME2 NULL,
        IssuingOrganizationEn NVARCHAR(200) NOT NULL DEFAULT N'British Center for Languages',
        IssuingOrganizationAr NVARCHAR(200) NOT NULL DEFAULT N'المركز البريطاني لتعليم اللغات',
        AccreditingEntityEn NVARCHAR(200) NOT NULL DEFAULT N'UK International Education & Training',
        AccreditingEntityAr NVARCHAR(200) NOT NULL DEFAULT N'التعليم والتدريب الدولي البريطاني',
        Status INT NOT NULL DEFAULT 0, -- 0=Valid, 1=Revoked, 2=Expired, 3=Pending
        RevocationReason NVARCHAR(500) NULL,
        RevokedAt DATETIME2 NULL,
        RevokedBy NVARCHAR(100) NULL,
        GradeEn NVARCHAR(50) NULL DEFAULT N'Excellent',
        GradeAr NVARCHAR(50) NULL DEFAULT N'ممتاز',
        PdfUrl NVARCHAR(500) NULL,
        QrCodeImageUrl NVARCHAR(500) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_Certificates_Students FOREIGN KEY (StudentId) REFERENCES dbo.Students(Id),
        CONSTRAINT UQ_Certificates_CertificateNumber UNIQUE (CertificateNumber),
        CONSTRAINT UQ_Certificates_UniqueToken UNIQUE (UniqueToken)
    );
    CREATE INDEX IX_Certificates_StudentId ON dbo.Certificates(StudentId);
    CREATE INDEX IX_Certificates_Status ON dbo.Certificates(Status);
    CREATE INDEX IX_Certificates_IssueDate ON dbo.Certificates(IssueDate);
END
GO

-- 4. Student ID Cards Table
IF OBJECT_ID(N'dbo.StudentIdCards', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.StudentIdCards (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        StudentId INT NOT NULL,
        CardNumber NVARCHAR(50) NOT NULL,
        IssueDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        ExpiryDate DATETIME2 NOT NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT N'Active',
        Barcode NVARCHAR(100) NULL,
        QrCodeUrl NVARCHAR(500) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_StudentIdCards_Students FOREIGN KEY (StudentId) REFERENCES dbo.Students(Id) ON DELETE CASCADE,
        CONSTRAINT UQ_StudentIdCards_CardNumber UNIQUE (CardNumber)
    );
END
GO

-- 5. Partners Table
IF OBJECT_ID(N'dbo.Partners', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Partners (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        NameEn NVARCHAR(150) NOT NULL,
        NameAr NVARCHAR(150) NOT NULL,
        DescriptionEn NVARCHAR(500) NULL,
        DescriptionAr NVARCHAR(500) NULL,
        LogoUrl NVARCHAR(500) NULL,
        WebsiteUrl NVARCHAR(250) NULL,
        Category NVARCHAR(100) NOT NULL DEFAULT N'Educational Academy',
        OrderIndex INT NOT NULL DEFAULT 0,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- 6. Service Items Table
IF OBJECT_ID(N'dbo.ServiceItems', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.ServiceItems (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        ServiceNumber NVARCHAR(10) NOT NULL DEFAULT N'01',
        TitleEn NVARCHAR(150) NOT NULL,
        TitleAr NVARCHAR(150) NOT NULL,
        DescriptionEn NVARCHAR(MAX) NOT NULL,
        DescriptionAr NVARCHAR(MAX) NOT NULL,
        IconName NVARCHAR(50) NOT NULL DEFAULT N'Award',
        DetailedContentEn NVARCHAR(MAX) NULL,
        DetailedContentAr NVARCHAR(MAX) NULL,
        OrderIndex INT NOT NULL DEFAULT 0,
        IsActive BIT NOT NULL DEFAULT 1
    );
END
GO

-- 7. Contact Messages Table
IF OBJECT_ID(N'dbo.ContactMessages', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.ContactMessages (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FullName NVARCHAR(100) NOT NULL,
        Email NVARCHAR(150) NOT NULL,
        Phone NVARCHAR(50) NULL,
        Subject NVARCHAR(200) NOT NULL,
        Message NVARCHAR(MAX) NOT NULL,
        IsRead BIT NOT NULL DEFAULT 0,
        RepliedAt DATETIME2 NULL,
        Notes NVARCHAR(MAX) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
    CREATE INDEX IX_ContactMessages_IsRead ON dbo.ContactMessages(IsRead);
END
GO

-- 8. Verification Audit Logs Table
IF OBJECT_ID(N'dbo.VerificationLogs', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.VerificationLogs (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        QueryTerm NVARCHAR(100) NOT NULL,
        SearchType NVARCHAR(50) NOT NULL DEFAULT N'CertificateId',
        ResultStatus NVARCHAR(50) NOT NULL DEFAULT N'NotFound',
        IpAddress NVARCHAR(50) NULL,
        UserAgent NVARCHAR(500) NULL,
        CertificateId INT NULL,
        VerifiedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_VerificationLogs_Certificates FOREIGN KEY (CertificateId) REFERENCES dbo.Certificates(Id) ON DELETE SET NULL
    );
    CREATE INDEX IX_VerificationLogs_VerifiedAt ON dbo.VerificationLogs(VerifiedAt);
    CREATE INDEX IX_VerificationLogs_QueryTerm ON dbo.VerificationLogs(QueryTerm);
END
GO

-- 9. Administrative Audit Trail Table
IF OBJECT_ID(N'dbo.AuditLogs', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.AuditLogs (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NULL,
        Username NVARCHAR(100) NULL,
        Action NVARCHAR(100) NOT NULL,
        EntityName NVARCHAR(100) NOT NULL,
        EntityId NVARCHAR(50) NULL,
        Details NVARCHAR(MAX) NULL,
        IpAddress NVARCHAR(50) NULL,
        Timestamp DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
    CREATE INDEX IX_AuditLogs_Timestamp ON dbo.AuditLogs(Timestamp);
END
GO

-- 10. Platform Settings Table
IF OBJECT_ID(N'dbo.PlatformSettings', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.PlatformSettings (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        [Key] NVARCHAR(100) NOT NULL,
        [Value] NVARCHAR(MAX) NOT NULL,
        [Description] NVARCHAR(200) NULL,
        Category NVARCHAR(50) NOT NULL DEFAULT N'General',
        UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT UQ_PlatformSettings_Key UNIQUE ([Key])
    );
END
GO

PRINT 'British Center for Languages database schema created successfully.';
GO

