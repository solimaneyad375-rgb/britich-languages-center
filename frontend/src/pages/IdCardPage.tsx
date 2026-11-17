/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { StudentIdCardBadge } from '../components/StudentIdCardBadge';
import { api } from '../services/api';
import { StudentIdCard } from '../types';
import { Award, Search, UserCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface IdCardPageProps {
  navigate?: (path: string) => void;
}

export const IdCardPage: React.FC<IdCardPageProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, t } = useLanguage();
  const [cards, setCards] = useState<StudentIdCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<StudentIdCard | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await api.getIdCards();
        setCards(data);
        if (data.length > 0) {
          setSelectedCard(data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadCards();
  }, []);

  const filtered = cards.filter(
    (c) =>
      c.studentNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.studentNameAr.includes(searchTerm) ||
      c.studentIdNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 min-h-screen bg-[#F7F8FA] pb-20">
      {/* Header */}
      <div className="bg-[#102F5C] text-white py-14 relative overflow-hidden text-center no-print">
        <div className="absolute inset-0 opacity-20">
          <img
            src={getAssetUrl('assets/cover.webp')}
            alt="Cover"
            width="1200"
            height="400"
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getAssetUrl('assets/cover.png');
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-[#C5A04B]/50 text-[#DFC075] text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t('idCardTitle')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'ar' ? 'بطاقات الهوية الأكاديمية الذكية' : 'Smart Student ID Badges'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto">
            {t('idCardSubtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Selector & Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 no-print flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'ar' ? 'بحث بالاسم أو الكود...' : 'Search student...'}
              className="w-full ps-9 pe-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold focus:outline-none focus:border-[#C5A04B]"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCard(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCard?.id === c.id
                    ? 'bg-[#102F5C] text-[#DFC075] shadow-md ring-2 ring-[#C5A04B]'
                    : 'bg-[#F7F8FA] text-gray-700 hover:bg-gray-100'
                }`}
              >
                {c.studentIdNumber} - {lang === 'ar' ? c.studentNameAr : c.studentNameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Card Badge Display */}
        {selectedCard ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#C5A04B]/30 text-center">
            <StudentIdCardBadge card={selectedCard} />
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {lang === 'ar' ? 'لا توجد بطاقات مسجلة' : 'No student cards found'}
          </div>
        )}
      </div>
    </div>
  );
};

