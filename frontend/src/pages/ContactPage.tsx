/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';

interface ContactPageProps {
  navigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, t } = useLanguage();
  const [settings, setSettings] = useState(() => storage.getWebsiteSettings());

  useEffect(() => {
    const onUpdate = () => setSettings(storage.getWebsiteSettings());
    window.addEventListener('bcl_storage_updated', onUpdate);
    return () => window.removeEventListener('bcl_storage_updated', onUpdate);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError(lang === 'ar' ? 'يرجى استكمال الحقول المطلوبة' : 'Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      await api.submitContact(formData);
      setSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError(lang === 'ar' ? 'تعذر إرسال الرسالة، يرجى المحاولة لاحقاً' : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 bg-white dark:bg-[#07182D] text-[#102F5C] dark:text-[#F8F9FC] min-h-screen transition-colors duration-200">
      {/* Editorial Page Header */}
      <div className="py-14 sm:py-20 bg-[#F7F8FA] dark:bg-[#07182D] border-b border-gray-200 dark:border-[rgba(201,163,74,0.22)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#C5A04B]" />
            <span className="text-xs font-bold tracking-widest text-[#C5A04B] uppercase font-mono">
              INSTITUTIONAL CONTACT
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102F5C] dark:text-white tracking-tight font-serif">
            {lang === 'ar' ? 'التواصل ومكتب التسجيل' : 'Contact British Center Desk'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-[#B8C5D6] max-w-2xl leading-relaxed font-normal">
            {lang === 'ar'
              ? 'يسعدنا استقبال استفسارات المراكز التعليمية، والطلاب، والمؤسسات المهتمة ببرامج التدريب وتوثيق الاعتمادات.'
              : 'Our administration office welcomes inquiries regarding academic cooperation, institutional development, and credential verification.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-start">
          {/* Institutional Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] p-8 space-y-6 rounded-xs shadow-md dark:shadow-xl transition-colors">
              <div className="pb-4 border-b border-gray-200 dark:border-[rgba(197,160,75,0.2)]">
                <span className="text-xs font-mono font-bold text-[#C5A04B] uppercase block mb-1">
                  OFFICIAL REGISTRAR DESK
                </span>
                <h3 className="text-lg font-bold text-[#102F5C] dark:text-white font-serif">
                  {lang === 'ar' ? 'مكتب الشؤون المؤسسية والتسجيل' : 'Registrar & Institutional Affairs'}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A04B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#102F5C] dark:text-white font-semibold">
                      {lang === 'ar' ? 'المقر الإداري (لندن):' : 'London Headquarters:'}
                    </strong>
                    <span className="text-slate-600 dark:text-[#B8C5D6]">27 Old Gloucester Street, London, WC1N 3AX, United Kingdom</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C5A04B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#102F5C] dark:text-white font-semibold">
                      {lang === 'ar' ? 'البريد الإلكتروني الرسمي:' : 'Official Email:'}
                    </strong>
                    <a href="mailto:info@britishcenter.uk" className="text-[#102F5C] dark:text-[#DFC075] font-semibold hover:underline transition-colors">
                      info@britishcenter.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C5A04B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#102F5C] dark:text-white font-semibold">
                      {lang === 'ar' ? 'الهاتف المباشر:' : 'Direct Phone:'}
                    </strong>
                    <a href="tel:+201509949401" dir="ltr" className="text-[#102F5C] dark:text-[#DFC075] font-bold hover:underline transition-colors block">
                      +20 15 09949401
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#102F5C] dark:text-white font-semibold">
                      {lang === 'ar' ? 'خدمة واتساب الرسمية:' : 'Official WhatsApp:'}
                    </strong>
                    <a
                      href="https://wa.me/201509949401"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline transition-colors block"
                    >
                      {lang === 'ar' ? 'محادثة عبر واتساب (+20 15 09949401)' : 'Chat on WhatsApp (+20 15 09949401)'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#102F5C] dark:text-white font-semibold">
                      {lang === 'ar' ? 'مكتب لندن:' : 'London Desk:'}
                    </strong>
                    <span dir="ltr" className="text-slate-600 dark:text-[#B8C5D6]">+44 20 7946 0912</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-[rgba(197,160,75,0.2)] text-xs text-slate-500 dark:text-slate-400 font-mono space-y-1">
                <div>UKRLP: 10099520</div>
                <div>Companies House: 16605467</div>
              </div>
            </div>
          </div>

          {/* Minimal Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] p-8 space-y-6 rounded-xs shadow-md dark:shadow-xl transition-colors">
            <div className="border-b border-gray-200 dark:border-[rgba(197,160,75,0.2)] pb-4">
              <h3 className="text-lg font-bold text-[#102F5C] dark:text-white font-serif">
                {lang === 'ar' ? 'إرسال استفسار رسمي' : 'Submit an Institutional Inquiry'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#B8C5D6] mt-1">
                {lang === 'ar'
                  ? 'يرجى تعبئة النموذج وسيقوم مسؤول مكتب التسجيل بالرد خلال ساعات العمل الرسمية.'
                  : 'Please complete the inquiry form and a registrar officer will respond promptly.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/60 text-emerald-800 dark:text-emerald-200 space-y-2 rounded-xs">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    {lang === 'ar' ? 'تم استلام استفسارك بنجاح' : 'Inquiry Submitted Successfully'}
                  </span>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-200 leading-relaxed">
                  {lang === 'ar'
                    ? 'شكراً لتواصلك مع المركز البريطاني لتعليم اللغات. سيقوم الفريق المختص بمراجعة رسالتك والتواصل معك.'
                    : 'Thank you for reaching out to the British Center for Languages. Our administration will contact you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {error && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/60 text-rose-800 dark:text-rose-200 text-xs rounded-xs font-semibold">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-bold text-[#102F5C] dark:text-[#DFC075] text-xs">
                      {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      placeholder={lang === 'ar' ? 'مثال: محمد أحمد' : 'e.g. John Smith'}
                      className="w-full p-2.5 bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-[#102F5C] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xs focus:outline-none focus:border-[#C5A04B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-[#102F5C] dark:text-[#DFC075] text-xs">
                      {lang === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="name@example.com"
                      className="w-full p-2.5 bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-[#102F5C] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xs focus:outline-none focus:border-[#C5A04B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-bold text-[#102F5C] dark:text-[#DFC075] text-xs">
                      {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 ..."
                      className="w-full p-2.5 bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-[#102F5C] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xs focus:outline-none focus:border-[#C5A04B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-[#102F5C] dark:text-[#DFC075] text-xs">
                      {lang === 'ar' ? 'موضوع الاستفسار' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={lang === 'ar' ? 'شراكة / استعلام عن شهادة' : 'Cooperation / Credential Inquiry'}
                      className="w-full p-2.5 bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-[#102F5C] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xs focus:outline-none focus:border-[#C5A04B]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-[#102F5C] dark:text-[#DFC075] text-xs">
                    {lang === 'ar' ? 'نص الرسالة *' : 'Message *'}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder={lang === 'ar' ? 'اكتب تفاصيل استفسارك هنا...' : 'Enter your inquiry details...'}
                    className="w-full p-2.5 bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-[#102F5C] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xs focus:outline-none focus:border-[#C5A04B]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#C5A04B] hover:bg-[#DFC075] disabled:opacity-50 text-[#08182E] text-xs font-bold rounded-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-[#08182E]" />
                    <span>{loading ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (lang === 'ar' ? 'إرسال الرسالة' : 'Send Inquiry')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
