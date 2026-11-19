// Developed by Eng. Eyad — SpeedUp Software.
/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { getAssetUrl, getVerifyUrl } from '../utils/assets';
import {
  Certificate,
  DashboardStats,
  Partner,
  Student,
  StudentIdCard,
  WebsiteSettings,
  ActivityLog,
  SharedBarcodeGroup,
  SharedBarcodeStudent,
} from '../types';
import { SharedBarcodeCard } from '../components/SharedBarcodeCard';
import {
  LayoutDashboard,
  Users,
  Award,
  CreditCard,
  Building2,
  FileSearch,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Printer,
  X,
  Trash2,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Building,
  QrCode,
  Download,
  Globe,
  Edit,
  RotateCcw,
  FileText,
  Upload,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { StudentIdCardBadge } from '../components/StudentIdCardBadge';
import QRCode from 'qrcode';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  navigate?: (path: string) => void;
}

type TabType = 'overview' | 'students' | 'certificates' | 'idcards' | 'partners' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, isRtl, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Real database stats & datasets
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [idCards, setIdCards] = useState<StudentIdCard[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings>(() => storage.getWebsiteSettings());
  const [sharedCohorts, setSharedCohorts] = useState<SharedBarcodeGroup[]>([]);
  const [selectedCohort, setSelectedCohort] = useState<SharedBarcodeGroup | null>(null);
  const [cohortStudentSearch, setCohortStudentSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Search & Filter states
  const [studentSearch, setStudentSearch] = useState('');
  const [certSearch, setCertSearch] = useState('');
  const [certStatusFilter, setCertStatusFilter] = useState('');

  // Modals
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isIssueCertOpen, setIsIssueCertOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [revokeTargetCert, setRevokeTargetCert] = useState<Certificate | null>(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [selectedIdCardModal, setSelectedIdCardModal] = useState<StudentIdCard | null>(null);
  const [qrModalCert, setQrModalCert] = useState<Certificate | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Shared Barcode Modal states
  const [isAddBarcodeOpen, setIsAddBarcodeOpen] = useState(false);
  const [editingBarcode, setEditingBarcode] = useState<SharedBarcodeGroup | null>(null);
  const [newBarcode, setNewBarcode] = useState({
    barcode: 'BC-QT-0048',
    batchNumber: 'BATCH-2026-UK48',
    titleAr: 'الدبلوم المهني المتقدم في القيادة المؤسسية واللغة الإنجليزية للأعمال',
    titleEn: 'Executive Diploma in Institutional Leadership & Business English',
    maxCapacity: 30,
    enrolledCount: 30,
    issuingOrganizationAr: 'المركز البريطاني لتعليم اللغات',
    issuingOrganizationEn: 'British Center for Languages',
    accreditingEntityAr: 'التعليم والتدريب الدولي بالمملكة المتحدة',
    accreditingEntityEn: 'UK International Education & Training',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    status: 'Valid' as 'Valid' | 'Revoked' | 'Expired' | 'Pending',
    notes: '',
  });

  // Form states for adding
  const [newStudent, setNewStudent] = useState<{
    studentIdNumber: string;
    fullNameEn: string;
    fullNameAr: string;
    email: string;
    phone: string;
    programEn: string;
    programAr: string;
    status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
  }>({
    studentIdNumber: '',
    fullNameEn: '',
    fullNameAr: '',
    email: '',
    phone: '',
    programEn: '',
    programAr: '',
    status: 'Active',
  });

  const [newCert, setNewCert] = useState({
    certificateNumber: `BCL-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    studentId: 1,
    courseNameEn: '',
    courseNameAr: '',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    gradeEn: 'Distinction',
    gradeAr: 'امتياز مع مرتبة الشرف',
    issuingOrganizationEn: 'British Center for Languages',
    issuingOrganizationAr: 'المركز البريطاني لتعليم اللغات',
    accreditingEntityEn: 'UK International Education & Training',
    accreditingEntityAr: 'التعليم والتدريب الدولي البريطاني',
    status: 'Valid' as 'Valid' | 'Pending',
  });

  const [newPartner, setNewPartner] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    category: 'Educational Academy',
    websiteUrl: '',
    logoUrl: '',
  });

  // Load dashboard data
  useEffect(() => {
    loadAllData();
  }, []);

  // When QR modal opens, render QR code on canvas
  useEffect(() => {
    if (qrModalCert && qrCanvasRef.current) {
      const url = getVerifyUrl(qrModalCert.certificateNumber);
      QRCode.toCanvas(
        qrCanvasRef.current,
        url,
        {
          width: 180,
          margin: 1,
          color: {
            dark: '#102F5C',
            light: '#FFFFFF',
          },
        },
        (err) => {
          if (err) console.error('QR rendering error', err);
        }
      );
    }
  }, [qrModalCert]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsData, studentsData, certsData, cardsData, partnersData, acts, curSettings, sharedData] = await Promise.all([
        api.getDashboardStats(),
        api.getStudents(),
        api.getCertificates(),
        api.getIdCards(),
        api.getPartners(),
        api.getActivityLogs(),
        api.getWebsiteSettings(),
        api.getSharedBarcodes(),
      ]);
      setStats(statsData);
      setStudents(Array.isArray(studentsData) ? studentsData : (studentsData as any).items || []);
      setCertificates(Array.isArray(certsData) ? certsData : (certsData as any).items || []);
      setIdCards(cardsData);
      setPartners(partnersData);
      setActivities(acts);
      setSettings(curSettings);
      setSharedCohorts(sharedData || []);
      if (sharedData && sharedData.length > 0) {
        setSelectedCohort(sharedData[0]);
      }
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  // Student CRUD actions
  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createStudent(newStudent);
      setIsAddStudentOpen(false);
      setNewStudent({
        studentIdNumber: '',
        fullNameEn: '',
        fullNameAr: '',
        email: '',
        phone: '',
        programEn: '',
        programAr: '',
        status: 'Active',
      });
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    try {
      await api.updateStudent(editingStudent.id, editingStudent);
      setEditingStudent(null);
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف سجل هذا الطالب؟' : 'Are you sure you want to delete this student record?')) {
      await api.deleteStudent(id);
      loadAllData();
    }
  };

  // Shared Barcode Actions
  const handleCreateBarcode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created: SharedBarcodeGroup = {
        id: Date.now(),
        barcode: newBarcode.barcode.trim().toUpperCase(),
        batchNumber: newBarcode.batchNumber.trim() || `BATCH-2026-${newBarcode.barcode.trim()}`,
        titleAr: newBarcode.titleAr.trim(),
        titleEn: newBarcode.titleEn.trim(),
        maxCapacity: Number(newBarcode.maxCapacity) || 30,
        enrolledCount: Number(newBarcode.enrolledCount) || 30,
        issuingOrganizationAr: newBarcode.issuingOrganizationAr,
        issuingOrganizationEn: newBarcode.issuingOrganizationEn,
        accreditingEntityAr: newBarcode.accreditingEntityAr,
        accreditingEntityEn: newBarcode.accreditingEntityEn,
        issueDate: newBarcode.issueDate,
        expiryDate: newBarcode.expiryDate || undefined,
        status: newBarcode.status,
        notes: newBarcode.notes,
        students: [],
        createdAt: new Date().toISOString(),
      };
      await api.addSharedBarcode(created);
      setIsAddBarcodeOpen(false);
      await loadAllData();
      setSelectedCohort(created);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBarcode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBarcode) return;
    try {
      await api.updateSharedBarcode(editingBarcode.id, editingBarcode);
      setEditingBarcode(null);
      await loadAllData();
      setSelectedCohort(editingBarcode);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBarcode = async (id: number) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الباركود الموحد؟' : 'Are you sure you want to delete this shared barcode?')) {
      await api.deleteSharedBarcode(id);
      await loadAllData();
      if (selectedCohort?.id === id) {
        setSelectedCohort(sharedCohorts.find((c) => c.id !== id) || null);
      }
    }
  };

  // Certificate Actions
  const handleIssueCert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.issueCertificate({
        ...newCert,
        studentId: Number(newCert.studentId),
      });
      setIsIssueCertOpen(false);
      setNewCert({
        certificateNumber: `BCL-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        studentId: students.length > 0 ? students[0].id : 1,
        courseNameEn: '',
        courseNameAr: '',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        gradeEn: 'Distinction',
        gradeAr: 'امتياز مع مرتبة الشرف',
        issuingOrganizationEn: 'British Center for Languages',
        issuingOrganizationAr: 'المركز البريطاني لتعليم اللغات',
        accreditingEntityEn: 'UK International Education & Training',
        accreditingEntityAr: 'التعليم والتدريب الدولي البريطاني',
        status: 'Valid',
      });
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    try {
      await api.updateCertificate(editingCert.id, editingCert);
      setEditingCert(null);
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmRevoke = async () => {
    if (!revokeTargetCert || !revokeReason.trim()) return;
    try {
      await api.revokeCertificate(revokeTargetCert.id, revokeReason.trim());
      setRevokeTargetCert(null);
      setRevokeReason('');
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestoreValid = async (id: number) => {
    try {
      await api.changeCertificateStatus(id, 'Valid');
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCert = async (id: number) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه الشهادة نهائياً؟' : 'Are you sure you want to delete this certificate?')) {
      await api.deleteCertificate(id);
      loadAllData();
    }
  };

  const handleDownloadQrPng = (certNum: string) => {
    if (qrCanvasRef.current) {
      const url = qrCanvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `QR-${certNum}.png`;
      a.click();
    }
  };

  // Partner Action
  const handlePartnerLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewPartner((prev) => ({ ...prev, logoUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createPartner(newPartner);
      setIsAddPartnerOpen(false);
      setNewPartner({
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        category: 'Educational Academy',
        websiteUrl: '',
        logoUrl: '',
      });
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePartner = async (id: number) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من إزالة هذا الشريك؟' : 'Are you sure you want to remove this partner?')) {
      await api.deletePartner(id);
      loadAllData();
    }
  };

  // Website Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateWebsiteSettings(settings);
      setSettingsSuccess(true);
      setTimeout(() => setSettingsSuccess(false), 4000);
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Reset Demo Data
  const handleResetDemoData = async () => {
    if (
      confirm(
        lang === 'ar'
          ? 'تحذير: هل تريد إعادة تعيين كافة البيانات إلى الحالة الافتراضية التجريبية؟ سيتم مسح أي إضافات وتعديلات جديدة.'
          : 'Warning: Do you want to reset all data back to the default demo state? Any new modifications will be replaced with fresh demo records.'
      )
    ) {
      await api.resetDemoData();
      await loadAllData();
      alert(lang === 'ar' ? 'تمت استعادة البيانات التجريبية بنجاح!' : 'Demo data has been successfully restored!');
    }
  };

  // Filtered queries
  const filteredStudents = students.filter(
    (s) =>
      s.fullNameEn.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.fullNameAr.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.studentIdNumber.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.programEn.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredCerts = certificates.filter((c) => {
    const matchSearch =
      c.certificateNumber.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.studentNameEn.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.studentIdNumber.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.courseNameEn.toLowerCase().includes(certSearch.toLowerCase());
    const matchStatus = !certStatusFilter || c.status === certStatusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#08182E] text-[#102F5C] dark:text-white flex flex-col lg:flex-row text-start pt-16 transition-colors duration-200">
      {/* 1. Professional Admin Sidebar */}
      <aside className="w-full lg:w-68 bg-[#102F5C] dark:bg-[#061224] text-white p-5 flex flex-col justify-between shrink-0 shadow-xl border-e border-[rgba(197,160,75,0.22)]">
        <div className="space-y-6">
          {/* Brand & User Profile in Sidebar */}
          <div className="flex items-center gap-3 pb-5 border-b border-white/10">
            <div className="w-11 h-11 rounded-xs bg-white/95 border border-[rgba(197,160,75,0.4)] p-0.5 flex items-center justify-center shrink-0 shadow-sm">
              <img
                src={getAssetUrl('assets/logo.webp')}
                alt="British Center for Languages"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getAssetUrl('assets/logo.png');
                }}
              />
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-xs text-white tracking-wide truncate font-serif">
                BRITISH CENTER
              </div>
              <div className="text-[11px] text-[#DFC075] font-semibold truncate">
                {user?.fullName || 'Administrator'}
              </div>
              <span className="inline-block mt-0.5 px-2 py-0.2 rounded-xs bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-500/30">
                Frontend LocalStorage Mode
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xs transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#C5A04B] text-[#08182E] shadow-md font-bold'
                  : 'text-[#B8C5D6] hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('adminNavOverview')}</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xs transition-all cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-[#C5A04B] text-[#08182E] shadow-md font-bold'
                  : 'text-[#B8C5D6] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t('adminNavStudents')}</span>
              <span className="ms-auto text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-mono">
                {students.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xs transition-all cursor-pointer ${
                activeTab === 'certificates'
                  ? 'bg-[#C5A04B] text-[#08182E] shadow-md font-bold'
                  : 'text-[#B8C5D6] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{t('adminNavCertificates')}</span>
              <span className="ms-auto text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-mono">
                {certificates.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('idcards')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xs transition-all cursor-pointer ${
                activeTab === 'idcards'
                  ? 'bg-[#C5A04B] text-[#08182E] shadow-md font-bold'
                  : 'text-[#B8C5D6] hover:bg-white/10 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>{t('adminNavIdCards')}</span>
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xs transition-all cursor-pointer ${
                activeTab === 'partners'
                  ? 'bg-[#C5A04B] text-[#08182E] shadow-md font-bold'
                  : 'text-[#B8C5D6] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{t('adminNavPartners')}</span>
              <span className="ms-auto text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-mono">
                {partners.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xs transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#C5A04B] text-[#08182E] shadow-md font-bold'
                  : 'text-[#B8C5D6] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{lang === 'ar' ? 'محتوى وإعدادات الموقع' : 'Website Content & Settings'}</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#DFC075]" />
            <span>{lang === 'ar' ? 'معاينة الموقع العام' : 'View Public Website'}</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-gray-300 hover:bg-rose-950/60 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('navLogout')}</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header with Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#102F5C] dark:text-white font-serif">
                  {t('adminNavOverview')}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] mt-1">
                  {lang === 'ar' ? 'لوحة المتابعة الإدارية وإحصائيات المنصة والأنشطة الأخيرة' : 'Administrative performance overview and recent institutional telemetry'}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsAddStudentOpen(true)}
                  className="px-3 py-2 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#08182E]" />
                  <span>{lang === 'ar' ? 'طالب جديد' : 'New Student'}</span>
                </button>
                <button
                  onClick={() => setIsIssueCertOpen(true)}
                  className="px-3 py-2 rounded-xs bg-[#152B49] hover:bg-[#1A3E74] text-white text-xs font-bold flex items-center gap-1.5 border border-[rgba(197,160,75,0.3)] shadow-sm transition-all cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-[#DFC075]" />
                  <span>{lang === 'ar' ? 'إصدار شهادة' : 'Issue Cert'}</span>
                </button>
                <button
                  onClick={handleResetDemoData}
                  className="px-3 py-2 rounded-xs bg-[#08182E] hover:bg-[#152B49] text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-500/40 transition-all cursor-pointer"
                  title="Reset Demo Data"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'ar' ? 'استعادة البيانات' : 'Reset Demo'}</span>
                </button>
              </div>
            </div>

            {/* Real Statistics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-[#152B49] rounded-xs p-6 border border-[rgba(197,160,75,0.22)] shadow-xl space-y-2 dark-luxury-card">
                <div className="flex items-center justify-between text-[#DFC075] text-xs font-mono font-bold">
                  <span>{t('adminStatTotalStudents')}</span>
                  <Users className="w-5 h-5 text-[#DFC075]" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">
                  {students.length}
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  {lang === 'ar' ? 'سجلات مقيدة بنشاط' : 'Enrolled Student Records'}
                </div>
              </div>

              <div className="bg-[#152B49] rounded-xs p-6 border border-[rgba(197,160,75,0.22)] shadow-xl space-y-2 dark-luxury-card">
                <div className="flex items-center justify-between text-[#DFC075] text-xs font-mono font-bold">
                  <span>{t('adminStatTotalCerts')}</span>
                  <Award className="w-5 h-5 text-[#C5A04B]" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">
                  {certificates.length}
                </div>
                <div className="text-[11px] text-[#B8C5D6]">
                  {certificates.filter((c) => c.status === 'Valid').length} Valid •{' '}
                  {certificates.filter((c) => c.status === 'Revoked').length} Revoked
                </div>
              </div>

              <div className="bg-[#152B49] rounded-xs p-6 border border-[rgba(197,160,75,0.22)] shadow-xl space-y-2 dark-luxury-card">
                <div className="flex items-center justify-between text-[#DFC075] text-xs font-mono font-bold">
                  <span>{lang === 'ar' ? 'الشركاء الأكاديميون' : 'Total Partners'}</span>
                  <Building2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-emerald-300 font-mono">
                  {partners.length}
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  {lang === 'ar' ? 'أكاديميات ومراكز معتمدة' : 'Accredited Centers'}
                </div>
              </div>

              <div className="bg-[#152B49] rounded-xs p-6 border border-[rgba(197,160,75,0.22)] shadow-xl space-y-2 dark-luxury-card">
                <div className="flex items-center justify-between text-[#DFC075] text-xs font-mono font-bold">
                  <span>{lang === 'ar' ? 'استعلامات التحقق' : 'Verification Queries'}</span>
                  <ShieldCheck className="w-5 h-5 text-[#C5A04B]" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">
                  {stats.totalVerifications}
                </div>
                <div className="text-[11px] text-[#C5A04B] font-semibold">
                  {lang === 'ar' ? 'عمليات فحص مباشر' : 'Public Inquiries Logged'}
                </div>
              </div>
            </div>

            {/* Analytics Breakdown & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Status Breakdown & Overview Chart */}
              <div className="lg:col-span-6 bg-[#152B49] rounded-xs p-6 border border-[rgba(197,160,75,0.22)] shadow-xl space-y-4">
                <h3 className="font-bold text-base text-white flex items-center justify-between">
                  <span>{lang === 'ar' ? 'توزيع حالات الشهادات' : 'Certificate Status Distribution'}</span>
                  <span className="text-xs text-[#DFC075] font-mono">LocalStorage Store</span>
                </h3>
                <div className="space-y-4 pt-2">
                  {stats.statusDistribution.map((st, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#B8C5D6] flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: st.color }}
                          />
                          {st.name}
                        </span>
                        <span className="font-mono text-white">{st.value}</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#08182E] overflow-hidden border border-[rgba(197,160,75,0.15)]">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: st.color,
                            width: `${certificates.length > 0 ? (st.value / certificates.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[rgba(197,160,75,0.18)] text-xs text-[#B8C5D6] space-y-1">
                  <div className="flex justify-between">
                    <span>Valid Active Certificates:</span>
                    <strong className="text-emerald-400 font-mono">
                      {certificates.filter((c) => c.status === 'Valid').length}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Officially Revoked Certificates:</span>
                    <strong className="text-rose-400 font-mono">
                      {certificates.filter((c) => c.status === 'Revoked').length}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Recent Activity Timeline */}
              <div className="lg:col-span-6 bg-[#152B49] rounded-xs p-6 border border-[rgba(197,160,75,0.22)] shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[rgba(197,160,75,0.18)]">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C5A04B]" />
                    <span>{lang === 'ar' ? 'الأنشطة الأخيرة' : 'Recent Institutional Activity'}</span>
                  </h3>
                  <span className="text-[11px] text-[#DFC075] font-mono">Live Timeline</span>
                </div>

                <div className="space-y-3.5 max-h-72 overflow-y-auto pe-1">
                  {activities.slice(0, 7).map((act) => (
                    <div key={act.id} className="flex items-start gap-3 text-xs pb-2 border-b border-white/5">
                      <div
                        className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 mt-0.5 ${
                          act.type === 'certificate'
                            ? 'bg-[#C5A04B]/20 text-[#DFC075] border border-[#C5A04B]/40'
                            : act.type === 'student'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : act.type === 'partner'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {act.type === 'certificate' ? (
                          <Award className="w-3.5 h-3.5" />
                        ) : act.type === 'student' ? (
                          <Users className="w-3.5 h-3.5" />
                        ) : act.type === 'partner' ? (
                          <Building2 className="w-3.5 h-3.5" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-2">
                          <span className="font-bold text-white">
                            {lang === 'ar' ? act.actionAr : act.action}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">
                            {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[#B8C5D6] text-[11px] truncate mt-0.5">{act.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENTS MANAGEMENT */}
        {activeTab === 'students' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white font-serif">
                  {t('adminNavStudents')}
                </h1>
                <p className="text-xs text-[#B8C5D6]">
                  {lang === 'ar' ? 'إدارة وقيد الطلاب المسجلين بالبرامج الأكاديمية' : 'Manage student enrolment and credential records'}
                </p>
              </div>

              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="px-4 py-2.5 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#08182E]" />
                <span>{t('adminAddStudent')}</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute inset-y-0 start-3 my-auto text-slate-400" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder={t('adminSearchPlaceholder')}
                className="w-full ps-9 pe-4 py-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A04B]"
              />
            </div>

            {/* Students Table */}
            <div className="bg-[#152B49] rounded-xs shadow-xl border border-[rgba(197,160,75,0.22)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#08182E] border-b border-[rgba(197,160,75,0.2)] text-[#DFC075] uppercase text-[10px] font-mono">
                    <tr>
                      <th className="py-3 px-4">Student ID</th>
                      <th className="py-3 px-4">Full Name (EN / AR)</th>
                      <th className="py-3 px-4">Course / Program</th>
                      <th className="py-3 px-4">Reg. Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-[#1A375E]/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#DFC075]">
                          {s.studentIdNumber}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{s.fullNameEn}</div>
                          <div className="text-[#B8C5D6]">{s.fullNameAr}</div>
                        </td>
                        <td className="py-3 px-4 text-[#B8C5D6] max-w-xs truncate">
                          {lang === 'ar' ? s.programAr : s.programEn}
                        </td>
                        <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                          {s.registrationDate}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-xs text-[10px] font-bold ${
                              s.status === 'Active'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : s.status === 'Suspended'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => {
                                const card = idCards.find((c) => c.studentId === s.id);
                                if (card) setSelectedIdCardModal(card);
                              }}
                              className="px-2 py-1 rounded-xs bg-[#08182E] text-[#DFC075] border border-[rgba(197,160,75,0.3)] hover:bg-[#C5A04B] hover:text-[#08182E] font-bold text-[10px] transition-colors cursor-pointer"
                              title="View Student Smart ID Badge"
                            >
                              ID Badge
                            </button>
                            <button
                              onClick={() => setEditingStudent(s)}
                              className="p-1 rounded-xs text-slate-400 hover:text-[#DFC075] hover:bg-[#08182E] transition-colors cursor-pointer"
                              title="Edit Student"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(s.id)}
                              className="p-1 rounded-xs text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Delete Student"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SHARED BARCODE & CERTIFICATES MANAGEMENT */}
        {activeTab === 'certificates' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 1. Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(197,160,75,0.2)] pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C5A04B]/15 border border-[#C5A04B]/30 text-[#DFC075] text-[11px] font-mono font-bold mb-1.5 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DFC075]" />
                  <span>{lang === 'ar' ? 'نظام التحقق الرسمي المعتمد' : 'Official Verification System'}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                  {lang === 'ar' ? 'إدارة الباركود الموحد والشهادات الأكاديمية' : 'Shared Barcode & Certificates Management'}
                </h1>
                <p className="text-xs text-[#B8C5D6] max-w-2xl mt-1">
                  {lang === 'ar'
                    ? 'المنظومة المركزية لإدارة دفعات الطلاب المعتمدة برمز الباركود الموحد (BC-QT-0047 حتى 30 متدرباً) والأرشيف التاريخي للشهادات'
                    : 'Central system managing accredited student cohorts under unified shared barcode (BC-QT-0047 up to 30 students) and historical certificates registry'}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <button
                  onClick={() => setIsAddBarcodeOpen(true)}
                  className="px-4 py-2.5 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold flex items-center gap-2 shadow-md shrink-0 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#08182E]" />
                  <span>{lang === 'ar' ? 'إضافة باركود جديد' : 'Add New Barcode'}</span>
                </button>
                <button
                  onClick={() => navigate(`/verify?code=${selectedCohort?.barcode || 'BC-QT-0047'}`)}
                  className="px-4 py-2.5 rounded-xs bg-[#08182E] text-[#DFC075] border border-[rgba(197,160,75,0.4)] hover:bg-[#1A375E] text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#DFC075]" />
                  <span>{lang === 'ar' ? 'معاينة صفحة التحقق العامة' : 'Open Public Verification'}</span>
                </button>
                <button
                  onClick={() => setIsIssueCertOpen(true)}
                  className="px-4 py-2.5 rounded-xs bg-[#152B49] hover:bg-[#1A375E] text-white border border-white/10 text-xs font-bold flex items-center gap-2 shadow-md shrink-0 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#C5A04B]" />
                  <span>{t('adminIssueCert')}</span>
                </button>
              </div>
            </div>

            {/* 2. SECTION: SHARED BARCODES (PRIMARY MANAGEMENT SECTION) */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C5A04B] animate-pulse" />
                  <h2 className="text-lg font-bold text-white font-serif">
                    {lang === 'ar' ? 'قائمة الباركودات الموحدة المسجلة' : 'Registered Shared Barcodes Ledger'}
                  </h2>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                    {sharedCohorts.length} {lang === 'ar' ? 'باركود مسجل' : 'Registered'}
                  </span>
                </div>

                <button
                  onClick={() => setIsAddBarcodeOpen(true)}
                  className="px-3.5 py-1.5 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5 text-[#08182E]" />
                  <span>{lang === 'ar' ? 'إضافة باركود جديد' : 'Add Barcode'}</span>
                </button>
              </div>

              {/* Barcodes Table */}
              <div className="bg-[#152B49] rounded-xs shadow-xl border border-[rgba(197,160,75,0.22)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-start">
                    <thead className="bg-[#08182E] border-b border-[rgba(197,160,75,0.2)] text-[#DFC075] uppercase text-[10px] font-mono">
                      <tr>
                        <th className="py-3 px-4">كود الباركود / Barcode</th>
                        <th className="py-3 px-4">اسم البرنامج / Course Title</th>
                        <th className="py-3 px-4">تاريخ الإصدار</th>
                        <th className="py-3 px-4">السعة المعتمدة</th>
                        <th className="py-3 px-4">الحالة</th>
                        <th className="py-3 px-4 text-center">إجراءات الإدارة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {sharedCohorts.map((cohort) => (
                        <tr
                          key={cohort.id}
                          className={`hover:bg-[#1A375E]/60 transition-colors ${
                            selectedCohort?.id === cohort.id ? 'bg-[#1A375E]/40 border-r-2 rtl:border-r-0 rtl:border-l-2 border-[#C5A04B]' : ''
                          }`}
                        >
                          <td className="py-3 px-4 font-mono font-bold text-[#DFC075] text-sm">
                            {cohort.barcode}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{lang === 'ar' ? cohort.titleAr : cohort.titleEn}</div>
                            <div className="text-[11px] font-mono text-slate-400">{cohort.batchNumber}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-400 font-mono">
                            {cohort.issueDate}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-[#DFC075]">
                            {cohort.enrolledCount || cohort.students?.length || 30} / {cohort.maxCapacity || 30}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-xs text-[10px] font-bold ${
                                cohort.status === 'Valid'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : cohort.status === 'Revoked'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {cohort.status === 'Valid' ? (lang === 'ar' ? 'معتمد وسارٍ' : 'Valid') : cohort.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Preview / Select */}
                              <button
                                onClick={() => setSelectedCohort(cohort)}
                                className="px-2.5 py-1 rounded-xs bg-[#08182E] text-[#DFC075] border border-[rgba(197,160,75,0.3)] hover:bg-[#C5A04B] hover:text-[#08182E] font-bold text-[10px] transition-colors cursor-pointer"
                                title="معاينة بطاقة الباركود"
                              >
                                {lang === 'ar' ? 'معاينة' : 'Preview'}
                              </button>

                              {/* Open in Public Verify */}
                              <button
                                onClick={() => navigate(`/verify?code=${cohort.barcode}`)}
                                className="px-2.5 py-1 rounded-xs bg-[#102F5C] text-white hover:bg-[#1A3F7A] font-bold text-[10px] transition-colors cursor-pointer"
                                title="فحص بالبوابة العامة"
                              >
                                {lang === 'ar' ? 'فحص بالبوابة' : 'Verify'}
                              </button>

                              {/* Edit Barcode */}
                              <button
                                onClick={() => setEditingBarcode({ ...cohort })}
                                className="p-1 rounded-xs text-slate-400 hover:text-[#DFC075] hover:bg-[#08182E] transition-colors cursor-pointer"
                                title="تعديل بيانات الباركود"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Barcode */}
                              <button
                                onClick={() => handleDeleteBarcode(cohort.id)}
                                className="p-1 rounded-xs text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                                title="حذف الباركود"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Selected Barcode Document Card Preview */}
              {selectedCohort && (
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#DFC075]">
                    <span>{lang === 'ar' ? `معاينة وثيقة الباركود المحددة: ${selectedCohort.barcode}` : `Selected Barcode Preview: ${selectedCohort.barcode}`}</span>
                    <button
                      onClick={() => setEditingBarcode({ ...selectedCohort })}
                      className="inline-flex items-center gap-1 text-xs text-[#DFC075] hover:underline cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'تعديل هذا الباركود' : 'Edit This Barcode'}</span>
                    </button>
                  </div>
                  <SharedBarcodeCard cohort={selectedCohort} lang={lang} />
                </div>
              )}
            </div>

            {/* 3. SECTION: HISTORICAL CERTIFICATES ARCHIVE (PRESERVED) */}
            <div className="pt-6 border-t border-[rgba(197,160,75,0.2)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white font-serif flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C5A04B]" />
                    <span>{lang === 'ar' ? 'الأرشيف المركزي وسجل الشهادات الفردية' : 'Historical Individual Certificates Archive'}</span>
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ar'
                      ? 'قاعدة السجلات التاريخية للشهادات الفردية الصادرة والتحكم بحالات السريان والإلغاء'
                      : 'Historical database of individually issued credentials with status & revocation control'}
                  </p>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute inset-y-0 start-3 my-auto text-slate-400" />
                  <input
                    type="text"
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    placeholder={t('adminSearchPlaceholder')}
                    className="w-full ps-9 pe-4 py-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A04B]"
                  />
                </div>

                <select
                  value={certStatusFilter}
                  onChange={(e) => setCertStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white text-xs font-semibold rounded-xs focus:outline-none focus:border-[#C5A04B]"
                >
                  <option value="">All Statuses</option>
                  <option value="Valid">Valid</option>
                  <option value="Pending">Pending</option>
                  <option value="Revoked">Revoked</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

            {/* Certificates Table */}
            <div className="bg-[#152B49] rounded-xs shadow-xl border border-[rgba(197,160,75,0.22)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#08182E] border-b border-[rgba(197,160,75,0.2)] text-[#DFC075] uppercase text-[10px] font-mono">
                    <tr>
                      <th className="py-3 px-4">Certificate ID</th>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Course Name</th>
                      <th className="py-3 px-4">Issue Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCerts.map((c) => (
                      <tr key={c.id} className="hover:bg-[#1A375E]/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#DFC075]">
                          {c.certificateNumber}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{c.studentNameEn}</div>
                          <div className="text-[11px] font-mono text-slate-400">{c.studentIdNumber}</div>
                        </td>
                        <td className="py-3 px-4 text-[#B8C5D6] max-w-xs truncate">
                          {c.courseNameEn}
                        </td>
                        <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                          {c.issueDate}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-xs text-[10px] font-bold ${
                              c.status === 'Valid'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : c.status === 'Revoked'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* QR Code Action */}
                            <button
                              onClick={() => setQrModalCert(c)}
                              className="p-1 rounded-xs text-[#DFC075] hover:bg-[#08182E] transition-colors cursor-pointer"
                              title="View & Download QR Code"
                            >
                              <QrCode className="w-4 h-4 text-[#DFC075]" />
                            </button>

                            {/* Public Verify Action */}
                            <button
                              onClick={() => navigate(`/verify?certificate=${c.certificateNumber}`)}
                              className="px-2 py-1 rounded-xs bg-[#08182E] text-[#DFC075] border border-[rgba(197,160,75,0.3)] hover:bg-[#C5A04B] hover:text-[#08182E] font-bold text-[10px] transition-colors cursor-pointer"
                              title="Inspect Public Verification"
                            >
                              Verify View
                            </button>

                            {/* Status Toggles */}
                            {c.status === 'Valid' ? (
                              <button
                                onClick={() => setRevokeTargetCert(c)}
                                className="px-2 py-1 rounded-xs bg-rose-950/60 text-rose-300 border border-rose-500/30 hover:bg-rose-900/60 font-bold text-[10px] transition-colors cursor-pointer"
                                title="Revoke Certificate"
                              >
                                Revoke
                              </button>
                            ) : (
                              <button
                                onClick={() => handleRestoreValid(c.id)}
                                className="px-2 py-1 rounded-xs bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/60 font-bold text-[10px] transition-colors cursor-pointer"
                                title="Restore to Valid"
                              >
                                Set Valid
                              </button>
                            )}

                            {/* Edit Certificate */}
                            <button
                              onClick={() => setEditingCert(c)}
                              className="p-1 rounded-xs text-slate-400 hover:text-[#DFC075] hover:bg-[#08182E] transition-colors cursor-pointer"
                              title="Edit Certificate"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Certificate */}
                            <button
                              onClick={() => handleDeleteCert(c.id)}
                              className="p-1 rounded-xs text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Delete Certificate"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* TAB 4: ID CARDS */}
        {activeTab === 'idcards' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h1 className="text-2xl font-bold text-white font-serif">
                {t('adminNavIdCards')}
              </h1>
              <p className="text-xs text-[#B8C5D6]">
                {lang === 'ar' ? 'بطاقات الهوية الطلابية الذكية المعتمدة مع رمز الاستجابة السريعة' : 'Executive student identification cards with digital cryptographic barcode and QR codes'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {idCards.map((card) => (
                <div key={card.id} className="bg-[#152B49] rounded-xs p-5 border border-[rgba(197,160,75,0.22)] shadow-xl space-y-4 dark-luxury-card">
                  <div className="flex items-center gap-3">
                    <img
                      src={card.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                      alt={card.studentNameEn}
                      className="w-12 h-12 rounded-xs object-cover border border-[#C5A04B]"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white">{card.studentNameEn}</h4>
                      <p className="text-xs text-[#DFC075] font-mono">{card.studentIdNumber}</p>
                    </div>
                  </div>

                  <div className="text-xs text-[#B8C5D6] space-y-1">
                    <div><strong className="text-white">Program:</strong> {card.programEn}</div>
                    <div><strong className="text-white">Card Number:</strong> <span className="font-mono text-[#DFC075]">{card.cardNumber}</span></div>
                    <div><strong className="text-white">Valid Until:</strong> {card.expiryDate}</div>
                  </div>

                  <button
                    onClick={() => setSelectedIdCardModal(card)}
                    className="w-full py-2 rounded-xs bg-[#C5A04B] text-[#08182E] hover:bg-[#DFC075] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#08182E]" />
                    <span>{lang === 'ar' ? 'معاينة وطباعة الكارنيه' : 'Preview & Print Card'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PARTNERS */}
        {activeTab === 'partners' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white font-serif">
                  {t('adminNavPartners')}
                </h1>
                <p className="text-xs text-[#B8C5D6]">
                  {lang === 'ar' ? 'إدارة الأكاديميات والمؤسسات التعليمية الشريكة وإظهارها بالموقع العام' : 'Manage cooperating institutional partners and public website logos'}
                </p>
              </div>

              <button
                onClick={() => setIsAddPartnerOpen(true)}
                className="px-4 py-2.5 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#08182E]" />
                <span>{lang === 'ar' ? 'إضافة شريك جديد' : 'Add Partner'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((p) => (
                <div key={p.id} className="bg-[#152B49] rounded-xs p-6 border border-[rgba(197,160,75,0.22)] shadow-xl space-y-3 relative group dark-luxury-card">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded-xs bg-[#08182E] text-[#DFC075] border border-[rgba(197,160,75,0.3)] text-[10px] font-bold font-mono">
                      {p.category}
                    </span>
                    <button
                      onClick={() => handleDeletePartner(p.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete Partner"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {p.logoUrl && (
                    <div className="w-16 h-16 rounded-xs bg-white/95 border border-[rgba(197,160,75,0.3)] p-2 flex items-center justify-center">
                      <img src={p.logoUrl} alt={p.nameEn} className="max-w-full max-h-full object-contain" />
                    </div>
                  )}

                  <h3 className="font-bold text-base text-white">{p.nameEn}</h3>
                  <p className="text-xs text-[#DFC075] font-semibold">{p.nameAr}</p>
                  <p className="text-xs text-[#B8C5D6] leading-relaxed">{p.descriptionEn}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: WEBSITE CONTENT & SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white font-serif">
                  {lang === 'ar' ? 'محتوى وإعدادات الموقع العام' : 'Website Content & Settings'}
                </h1>
                <p className="text-xs text-[#B8C5D6]">
                  {lang === 'ar'
                    ? 'تعديل النصوص الرئيسية ومعلومات التواصل والتحديث المباشر للموقع بدون خادم'
                    : 'Edit public homepage headlines, about narrative, and contact details with live LocalStorage persistence'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetDemoData}
                className="px-3.5 py-2 rounded-xs bg-[#08182E] hover:bg-[#152B49] text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>{lang === 'ar' ? 'استعادة الإعدادات الافتراضية' : 'Reset All Demo Data'}</span>
              </button>
            </div>

            {settingsSuccess && (
              <div className="p-4 rounded-xs bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'تم حفظ إعدادات ومحتوى الموقع بنجاح في التخزين المحلي (LocalStorage) وتحديث صفحات الموقع العام!'
                    : 'Website content successfully saved to LocalStorage and reflected live across the public site!'}
                </span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Homepage Content Section */}
              <div className="bg-[#152B49] rounded-xs p-6 shadow-xl border border-[rgba(197,160,75,0.22)] space-y-4">
                <h3 className="font-bold text-base text-white pb-2 border-b border-[rgba(197,160,75,0.2)] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C5A04B]" />
                  <span>{lang === 'ar' ? 'محتوى الصفحة الرئيسية (Hero Headline & Description)' : 'Homepage Hero Section'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#DFC075] mb-1">Headline (English)</label>
                    <input
                      type="text"
                      value={settings.homepageHeadlineEn}
                      onChange={(e) => setSettings({ ...settings, homepageHeadlineEn: e.target.value })}
                      className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white font-semibold focus:border-[#C5A04B] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#DFC075] mb-1">العنوان الرئيسي (عربي)</label>
                    <input
                      type="text"
                      value={settings.homepageHeadlineAr}
                      onChange={(e) => setSettings({ ...settings, homepageHeadlineAr: e.target.value })}
                      className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white font-semibold focus:border-[#C5A04B] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#DFC075] mb-1">Description (English)</label>
                    <textarea
                      rows={3}
                      value={settings.homepageDescEn}
                      onChange={(e) => setSettings({ ...settings, homepageDescEn: e.target.value })}
                      className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white text-xs font-normal focus:border-[#C5A04B] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#DFC075] mb-1">الوصف الترحيبي (عربي)</label>
                    <textarea
                      rows={3}
                      value={settings.homepageDescAr}
                      onChange={(e) => setSettings({ ...settings, homepageDescAr: e.target.value })}
                      className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white text-xs font-normal focus:border-[#C5A04B] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* About Section Narrative */}
              <div className="bg-[#152B49] rounded-xs p-6 shadow-xl border border-[rgba(197,160,75,0.22)] space-y-4">
                <h3 className="font-bold text-base text-white pb-2 border-b border-[rgba(197,160,75,0.2)] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#C5A04B]" />
                  <span>{lang === 'ar' ? 'نبذة عن المركز (Who We Are Narrative)' : 'About Us Narrative'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#DFC075] mb-1">Who We Are (English)</label>
                    <textarea
                      rows={4}
                      value={settings.aboutWhoWeAreEn}
                      onChange={(e) => setSettings({ ...settings, aboutWhoWeAreEn: e.target.value })}
                      className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white text-xs font-normal focus:border-[#C5A04B] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#DFC075] mb-1">من نحن (عربي)</label>
                    <textarea
                      rows={4}
                      value={settings.aboutWhoWeAreAr}
                      onChange={(e) => setSettings({ ...settings, aboutWhoWeAreAr: e.target.value })}
                      className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white text-xs font-normal focus:border-[#C5A04B] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information & Slogan */}
              <div className="bg-[#152B49] rounded-xs p-6 shadow-xl border border-[rgba(197,160,75,0.22)] space-y-4">
                <h3 className="font-bold text-base text-white pb-2 border-b border-[rgba(197,160,75,0.2)] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A04B]" />
                  <span>{lang === 'ar' ? 'معلومات التواصل والشعار المؤسسي' : 'Contact Details & Institutional Slogan'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#DFC075] mb-1">Brand Slogan (English)</label>
                    <input
                      type="text"
                      value={settings.sloganEn}
                      onChange={(e) => setSettings({ ...settings, sloganEn: e.target.value })}
                      className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white font-semibold focus:border-[#C5A04B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#DFC075] mb-1">الشعار المؤسسي (عربي)</label>
                    <input
                      type="text"
                      value={settings.sloganAr}
                      onChange={(e) => setSettings({ ...settings, sloganAr: e.target.value })}
                      className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white font-semibold focus:border-[#C5A04B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#DFC075] mb-1">Official Phone Number</label>
                    <input
                      type="text"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white font-mono focus:border-[#C5A04B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#DFC075] mb-1">Official Inquiry Email</label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white font-mono focus:border-[#C5A04B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-[#DFC075] mb-1">Official London Address</label>
                  <input
                    type="text"
                    value={settings.contactAddressEn}
                    onChange={(e) => setSettings({ ...settings, contactAddressEn: e.target.value })}
                    className="w-full p-2.5 rounded-xs bg-[#08182E] border border-[rgba(197,160,75,0.3)] text-white text-xs focus:border-[#C5A04B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#08182E]" />
                  <span>{lang === 'ar' ? 'حفظ إعدادات الموقع' : 'Save Website Content'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* MODAL: ADD STUDENT */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#152B49] rounded-xs max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[rgba(197,160,75,0.35)] space-y-4 text-white">
            <div className="flex justify-between items-center pb-3 border-b border-[rgba(197,160,75,0.2)]">
              <h3 className="font-bold text-lg text-white font-serif">{t('adminAddStudent')}</h3>
              <button onClick={() => setIsAddStudentOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Student ID (e.g. BCL-STU-2026-007)</label>
                <input
                  type="text"
                  value={newStudent.studentIdNumber}
                  onChange={(e) => setNewStudent({ ...newStudent, studentIdNumber: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-mono text-white focus:border-[#C5A04B] focus:outline-none"
                  placeholder="BCL-STU-2026-007"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">Full Name (English)</label>
                  <input
                    type="text"
                    value={newStudent.fullNameEn}
                    onChange={(e) => setNewStudent({ ...newStudent, fullNameEn: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="Alexander Sterling"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">الاسم بالكامل (عربي)</label>
                  <input
                    type="text"
                    value={newStudent.fullNameAr}
                    onChange={(e) => setNewStudent({ ...newStudent, fullNameAr: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="ألكسندر ستيرلنج"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">Course / Program (English)</label>
                  <input
                    type="text"
                    value={newStudent.programEn}
                    onChange={(e) => setNewStudent({ ...newStudent, programEn: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="Executive Diploma in Advanced English"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">البرنامج / الدورة (عربي)</label>
                  <input
                    type="text"
                    value={newStudent.programAr}
                    onChange={(e) => setNewStudent({ ...newStudent, programAr: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="الدبلوم التنفيذي في اللغة الإنجليزية"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Status</label>
                <select
                  value={newStudent.status}
                  onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value as any })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Graduated">Graduated</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[rgba(197,160,75,0.2)]">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 rounded-xs bg-[#08182E] text-slate-300 hover:text-white border border-[rgba(197,160,75,0.25)] font-bold cursor-pointer"
                >
                  {t('adminCancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold cursor-pointer"
                >
                  {t('adminSave')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT STUDENT */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#152B49] rounded-xs max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[rgba(197,160,75,0.35)] space-y-4 text-white">
            <div className="flex justify-between items-center pb-3 border-b border-[rgba(197,160,75,0.2)]">
              <h3 className="font-bold text-lg text-white font-serif">Edit Student Information</h3>
              <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Student ID</label>
                <input
                  type="text"
                  value={editingStudent.studentIdNumber}
                  onChange={(e) => setEditingStudent({ ...editingStudent, studentIdNumber: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-mono font-bold text-white focus:border-[#C5A04B] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">Full Name (English)</label>
                  <input
                    type="text"
                    value={editingStudent.fullNameEn}
                    onChange={(e) => setEditingStudent({ ...editingStudent, fullNameEn: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-semibold text-white focus:border-[#C5A04B] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">الاسم بالكامل (عربي)</label>
                  <input
                    type="text"
                    value={editingStudent.fullNameAr}
                    onChange={(e) => setEditingStudent({ ...editingStudent, fullNameAr: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-semibold text-white focus:border-[#C5A04B] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">Course (English)</label>
                  <input
                    type="text"
                    value={editingStudent.programEn}
                    onChange={(e) => setEditingStudent({ ...editingStudent, programEn: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">البرنامج (عربي)</label>
                  <input
                    type="text"
                    value={editingStudent.programAr}
                    onChange={(e) => setEditingStudent({ ...editingStudent, programAr: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Status</label>
                <select
                  value={editingStudent.status}
                  onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value as any })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Graduated">Graduated</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[rgba(197,160,75,0.2)]">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 rounded-xs bg-[#08182E] text-slate-300 hover:text-white border border-[rgba(197,160,75,0.25)] font-bold cursor-pointer"
                >
                  {t('adminCancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ISSUE CERTIFICATE */}
      {isIssueCertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#152B49] rounded-xs max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[rgba(197,160,75,0.35)] space-y-4 max-h-[90vh] overflow-y-auto text-white">
            <div className="flex justify-between items-center pb-3 border-b border-[rgba(197,160,75,0.2)]">
              <h3 className="font-bold text-lg text-white font-serif">{t('adminIssueCert')}</h3>
              <button onClick={() => setIsIssueCertOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueCert} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Certificate ID Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCert.certificateNumber}
                    onChange={(e) => setNewCert({ ...newCert, certificateNumber: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-mono font-bold text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="BCL-2026-00125"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setNewCert({ ...newCert, certificateNumber: api.generateCertificateId() })
                    }
                    className="px-3 py-1 bg-[#08182E] text-[#DFC075] hover:bg-[#C5A04B] hover:text-[#08182E] rounded-xs text-[11px] font-bold shrink-0 border border-[rgba(197,160,75,0.3)] transition-colors cursor-pointer"
                    title="Generate unique certificate reference"
                  >
                    Auto-Generate ID
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Select Student</label>
                <select
                  value={newCert.studentId}
                  onChange={(e) => {
                    const sid = Number(e.target.value);
                    const stu = students.find((s) => s.id === sid);
                    setNewCert({
                      ...newCert,
                      studentId: sid,
                      courseNameEn: stu?.programEn || newCert.courseNameEn,
                      courseNameAr: stu?.programAr || newCert.courseNameAr,
                    });
                  }}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-semibold text-white focus:border-[#C5A04B] focus:outline-none"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.studentIdNumber} - {s.fullNameEn} ({s.fullNameAr})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">Course Name (English)</label>
                  <input
                    type="text"
                    value={newCert.courseNameEn}
                    onChange={(e) => setNewCert({ ...newCert, courseNameEn: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="Executive Diploma in Advanced English"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">اسم الدورة / البرنامج (عربي)</label>
                  <input
                    type="text"
                    value={newCert.courseNameAr}
                    onChange={(e) => setNewCert({ ...newCert, courseNameAr: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="الدبلوم التنفيذي في اللغة الإنجليزية"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">Issue Date</label>
                  <input
                    type="date"
                    value={newCert.issueDate}
                    onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">Initial Status</label>
                  <select
                    value={newCert.status}
                    onChange={(e) => setNewCert({ ...newCert, status: e.target.value as any })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-bold text-white focus:border-[#C5A04B] focus:outline-none"
                  >
                    <option value="Valid">Valid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Grade / Distinction</label>
                <input
                  type="text"
                  value={newCert.gradeEn}
                  onChange={(e) => setNewCert({ ...newCert, gradeEn: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  placeholder="Distinction / Excellent"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[rgba(197,160,75,0.2)]">
                <button
                  type="button"
                  onClick={() => setIsIssueCertOpen(false)}
                  className="px-4 py-2 rounded-xs bg-[#08182E] text-slate-300 hover:text-white border border-[rgba(197,160,75,0.25)] font-bold cursor-pointer"
                >
                  {t('adminCancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold cursor-pointer"
                >
                  Issue & Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT CERTIFICATE */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#152B49] rounded-xs max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[rgba(197,160,75,0.35)] space-y-4 text-white">
            <div className="flex justify-between items-center pb-3 border-b border-[rgba(197,160,75,0.2)]">
              <h3 className="font-bold text-lg text-white font-serif">Edit Certificate Record</h3>
              <button onClick={() => setEditingCert(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCert} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Certificate Number</label>
                <input
                  type="text"
                  value={editingCert.certificateNumber}
                  onChange={(e) => setEditingCert({ ...editingCert, certificateNumber: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-mono font-bold text-white focus:border-[#C5A04B] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Course (English)</label>
                <input
                  type="text"
                  value={editingCert.courseNameEn}
                  onChange={(e) => setEditingCert({ ...editingCert, courseNameEn: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">Status</label>
                  <select
                    value={editingCert.status}
                    onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value as any })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-bold text-white focus:border-[#C5A04B] focus:outline-none"
                  >
                    <option value="Valid">Valid</option>
                    <option value="Pending">Pending</option>
                    <option value="Revoked">Revoked</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">Issue Date</label>
                  <input
                    type="date"
                    value={editingCert.issueDate.split('T')[0]}
                    onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[rgba(197,160,75,0.2)]">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2 rounded-xs bg-[#08182E] text-slate-300 hover:text-white border border-[rgba(197,160,75,0.25)] font-bold cursor-pointer"
                >
                  {t('adminCancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold cursor-pointer"
                >
                  Save Certificate Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: QR CODE PREVIEW & DOWNLOAD */}
      {qrModalCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#152B49] rounded-xs max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-[rgba(197,160,75,0.35)] text-white">
            <div className="flex justify-between items-center pb-2 border-b border-[rgba(197,160,75,0.2)]">
              <h3 className="font-bold text-base text-white font-serif">Official Certificate QR</h3>
              <button onClick={() => setQrModalCert(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-xs border border-[rgba(197,160,75,0.3)] flex flex-col items-center">
              <canvas ref={qrCanvasRef} className="w-44 h-44 shadow-sm" />
            </div>

            <div className="text-xs space-y-1">
              <div className="font-mono font-bold text-[#DFC075] text-sm">
                {qrModalCert.certificateNumber}
              </div>
              <div className="text-white font-medium">{qrModalCert.studentNameEn}</div>
              <div className="text-[11px] text-[#B8C5D6]">{qrModalCert.courseNameEn}</div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleDownloadQrPng(qrModalCert.certificateNumber)}
                className="w-full py-2.5 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#08182E]" />
                <span>Download QR Code as PNG</span>
              </button>
              <button
                type="button"
                onClick={() => setQrModalCert(null)}
                className="w-full py-2 rounded-xs bg-[#08182E] text-slate-300 hover:text-white border border-[rgba(197,160,75,0.25)] text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REVOKE CERTIFICATE */}
      {revokeTargetCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#152B49] rounded-xs max-w-md w-full p-6 shadow-2xl border border-rose-500/60 space-y-4 text-white">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold text-base text-white font-serif">{t('adminRevokeTitle')}</h3>
            </div>
            <p className="text-xs text-[#B8C5D6] leading-relaxed">
              {lang === 'ar'
                ? `أنت على وشك إلغاء سريان الشهادة رقم ${revokeTargetCert.certificateNumber}. يرجى إدخال سبب الإلغاء الإداري:`
                : `You are officially revoking certificate ${revokeTargetCert.certificateNumber}. Please specify the administrative revocation reason:`}
            </p>

            <textarea
              rows={3}
              value={revokeReason}
              onChange={(e) => setRevokeReason(e.target.value)}
              placeholder="e.g. Failure to comply with academic assessment standards..."
              className="w-full p-2.5 bg-[#08182E] border border-rose-500/40 text-white placeholder:text-slate-500 rounded-xs text-xs focus:border-rose-400 focus:outline-none"
              required
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-[rgba(197,160,75,0.2)]">
              <button
                type="button"
                onClick={() => {
                  setRevokeTargetCert(null);
                  setRevokeReason('');
                }}
                className="px-4 py-2 rounded-xs bg-[#08182E] text-slate-300 hover:text-white border border-[rgba(197,160,75,0.25)] text-xs font-bold cursor-pointer"
              >
                {t('adminCancel')}
              </button>
              <button
                type="button"
                disabled={!revokeReason.trim()}
                onClick={handleConfirmRevoke}
                className="px-4 py-2 rounded-xs bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
              >
                {t('adminRevokeConfirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD PARTNER */}
      {isAddPartnerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#152B49] rounded-xs max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[rgba(197,160,75,0.35)] space-y-4 text-white">
            <div className="flex justify-between items-center pb-3 border-b border-[rgba(197,160,75,0.2)]">
              <h3 className="font-bold text-lg text-white font-serif">Add Cooperating Partner</h3>
              <button onClick={() => setIsAddPartnerOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPartner} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">Partner Name (English)</label>
                  <input
                    type="text"
                    value={newPartner.nameEn}
                    onChange={(e) => setNewPartner({ ...newPartner, nameEn: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-semibold text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="Cambridge Academic Council"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">اسم الشريك (عربي)</label>
                  <input
                    type="text"
                    value={newPartner.nameAr}
                    onChange={(e) => setNewPartner({ ...newPartner, nameAr: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-semibold text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="مجلس كامبريدج الأكاديمي"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Category</label>
                <input
                  type="text"
                  value={newPartner.category}
                  onChange={(e) => setNewPartner({ ...newPartner, category: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  placeholder="International Academic Partner"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">Description (English)</label>
                <textarea
                  rows={2}
                  value={newPartner.descriptionEn}
                  onChange={(e) => setNewPartner({ ...newPartner, descriptionEn: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  placeholder="Strategic collaborative training and curriculum accreditation."
                />
              </div>

              {/* Logo URL or File Upload */}
              <div className="space-y-2 pt-1 border-t border-[rgba(197,160,75,0.2)]">
                <label className="block font-bold text-[#DFC075]">Partner Logo (URL or Upload Image)</label>
                <input
                  type="text"
                  value={newPartner.logoUrl}
                  onChange={(e) => setNewPartner({ ...newPartner, logoUrl: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  placeholder="https://example.com/logo.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">or upload:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePartnerLogoUpload}
                    className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-xs file:border-0 file:bg-[#C5A04B] file:text-[#08182E] file:font-bold file:text-xs cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[rgba(197,160,75,0.2)]">
                <button
                  type="button"
                  onClick={() => setIsAddPartnerOpen(false)}
                  className="px-4 py-2 rounded-xs bg-[#08182E] text-slate-300 hover:text-white border border-[rgba(197,160,75,0.25)] font-bold cursor-pointer"
                >
                  {t('adminCancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold cursor-pointer"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PREVIEW STUDENT ID BADGE */}
      {selectedIdCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#152B49] rounded-xs max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[rgba(197,160,75,0.35)] my-8 text-white">
            <div className="flex justify-between items-center pb-3 border-b border-[rgba(197,160,75,0.2)]">
              <h3 className="font-bold text-lg text-white font-serif">Student Identification Card</h3>
              <button onClick={() => setSelectedIdCardModal(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <StudentIdCardBadge card={selectedIdCardModal} />

            <div className="flex justify-end pt-3 border-t border-[rgba(197,160,75,0.2)]">
              <button
                onClick={() => setSelectedIdCardModal(null)}
                className="px-5 py-2 rounded-xs bg-[#08182E] text-slate-300 hover:text-white border border-[rgba(197,160,75,0.25)] text-xs font-bold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD SHARED BARCODE */}
      {isAddBarcodeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#152B49] rounded-xs max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[rgba(197,160,75,0.35)] space-y-4 max-h-[90vh] overflow-y-auto text-white">
            <div className="flex justify-between items-center pb-3 border-b border-[rgba(197,160,75,0.2)]">
              <h3 className="font-bold text-lg text-white font-serif">
                {lang === 'ar' ? 'إضافة باركود موحد جديد' : 'Add New Shared Barcode'}
              </h3>
              <button onClick={() => setIsAddBarcodeOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBarcode} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">
                    {lang === 'ar' ? 'كود الباركود (مثال: BC-QT-0048)' : 'Barcode Code'}
                  </label>
                  <input
                    type="text"
                    value={newBarcode.barcode}
                    onChange={(e) => setNewBarcode({ ...newBarcode, barcode: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-mono font-bold text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="BC-QT-0048"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">
                    {lang === 'ar' ? 'رقم الدفعة (Batch No)' : 'Batch Number'}
                  </label>
                  <input
                    type="text"
                    value={newBarcode.batchNumber}
                    onChange={(e) => setNewBarcode({ ...newBarcode, batchNumber: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-mono text-white focus:border-[#C5A04B] focus:outline-none"
                    placeholder="BATCH-2026-UK48"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">
                  {lang === 'ar' ? 'اسم البرنامج التدريبي / الشهادة (عربي)' : 'Course / Program Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={newBarcode.titleAr}
                  onChange={(e) => setNewBarcode({ ...newBarcode, titleAr: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">
                  {lang === 'ar' ? 'اسم البرنامج التدريبي (إنجليزي)' : 'Course / Program Title (English)'}
                </label>
                <input
                  type="text"
                  value={newBarcode.titleEn}
                  onChange={(e) => setNewBarcode({ ...newBarcode, titleEn: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">
                    {lang === 'ar' ? 'تاريخ الإصدار' : 'Issue Date'}
                  </label>
                  <input
                    type="date"
                    value={newBarcode.issueDate}
                    onChange={(e) => setNewBarcode({ ...newBarcode, issueDate: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">
                    {lang === 'ar' ? 'السعة المعتمدة' : 'Capacity'}
                  </label>
                  <input
                    type="number"
                    value={newBarcode.maxCapacity}
                    onChange={(e) => setNewBarcode({ ...newBarcode, maxCapacity: Number(e.target.value) })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    min="1"
                    max="100"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">
                    {lang === 'ar' ? 'الحالة' : 'Status'}
                  </label>
                  <select
                    value={newBarcode.status}
                    onChange={(e) => setNewBarcode({ ...newBarcode, status: e.target.value as any })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  >
                    <option value="Valid">Valid (سارٍ ومعتمد)</option>
                    <option value="Pending">Pending (قيد المراجعة)</option>
                    <option value="Revoked">Revoked (ملغى)</option>
                    <option value="Expired">Expired (منتهي الصلاحية)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(197,160,75,0.2)] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddBarcodeOpen(false)}
                  className="px-4 py-2 rounded-xs bg-[#08182E] text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ وإضافة الباركود' : 'Save & Add Barcode'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT SHARED BARCODE */}
      {editingBarcode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#152B49] rounded-xs max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[rgba(197,160,75,0.35)] space-y-4 max-h-[90vh] overflow-y-auto text-white">
            <div className="flex justify-between items-center pb-3 border-b border-[rgba(197,160,75,0.2)]">
              <h3 className="font-bold text-lg text-white font-serif">
                {lang === 'ar' ? `تعديل الباركود الموحد: ${editingBarcode.barcode}` : `Edit Shared Barcode: ${editingBarcode.barcode}`}
              </h3>
              <button onClick={() => setEditingBarcode(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateBarcode} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">
                    {lang === 'ar' ? 'كود الباركود' : 'Barcode Code'}
                  </label>
                  <input
                    type="text"
                    value={editingBarcode.barcode}
                    onChange={(e) => setEditingBarcode({ ...editingBarcode, barcode: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-mono font-bold text-white focus:border-[#C5A04B] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">
                    {lang === 'ar' ? 'رقم الدفعة' : 'Batch Number'}
                  </label>
                  <input
                    type="text"
                    value={editingBarcode.batchNumber}
                    onChange={(e) => setEditingBarcode({ ...editingBarcode, batchNumber: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs font-mono text-white focus:border-[#C5A04B] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">
                  {lang === 'ar' ? 'اسم البرنامج التدريبي (عربي)' : 'Course / Program Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={editingBarcode.titleAr}
                  onChange={(e) => setEditingBarcode({ ...editingBarcode, titleAr: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#DFC075]">
                  {lang === 'ar' ? 'اسم البرنامج التدريبي (إنجليزي)' : 'Course / Program Title (English)'}
                </label>
                <input
                  type="text"
                  value={editingBarcode.titleEn}
                  onChange={(e) => setEditingBarcode({ ...editingBarcode, titleEn: e.target.value })}
                  className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">
                    {lang === 'ar' ? 'تاريخ الإصدار' : 'Issue Date'}
                  </label>
                  <input
                    type="date"
                    value={editingBarcode.issueDate}
                    onChange={(e) => setEditingBarcode({ ...editingBarcode, issueDate: e.target.value })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">
                    {lang === 'ar' ? 'السعة المعتمدة' : 'Capacity'}
                  </label>
                  <input
                    type="number"
                    value={editingBarcode.maxCapacity}
                    onChange={(e) => setEditingBarcode({ ...editingBarcode, maxCapacity: Number(e.target.value) })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                    min="1"
                    max="100"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-[#DFC075]">
                    {lang === 'ar' ? 'الحالة' : 'Status'}
                  </label>
                  <select
                    value={editingBarcode.status}
                    onChange={(e) => setEditingBarcode({ ...editingBarcode, status: e.target.value as any })}
                    className="w-full p-2 bg-[#08182E] border border-[rgba(197,160,75,0.3)] rounded-xs text-white focus:border-[#C5A04B] focus:outline-none"
                  >
                    <option value="Valid">Valid (سارٍ ومعتمد)</option>
                    <option value="Pending">Pending (قيد المراجعة)</option>
                    <option value="Revoked">Revoked (ملغى)</option>
                    <option value="Expired">Expired (منتهي الصلاحية)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(197,160,75,0.2)] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBarcode(null)}
                  className="px-4 py-2 rounded-xs bg-[#08182E] text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
