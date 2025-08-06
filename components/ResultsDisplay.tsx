
import React from 'react';
import { ReportData, UserInfo, Scale, Interpretation } from '../types';
import { SCALE_DETAILS } from '../constants/scoring';
import Button from './common/Button';
import { 
    DownloadIcon, 
    RefreshIcon,
    UserCircleIcon,
    CheckCircleIcon,
    ChartBarIcon,
    ExclamationTriangleIcon,
    BeakerIcon,
    AcademicCapIcon
} from './common/Icons';

interface ResultsDisplayProps {
  reportData: ReportData;
  userInfo: UserInfo;
  onDownloadPdf: () => void;
  onRestart: () => void;
}

const BrChart: React.FC<{ brScore: number }> = ({ brScore }) => {
    const MAX_BR = 115;
    const percentage = (brScore / MAX_BR) * 100;

    // Thresholds based on clinical significance in MCMI
    const thresholds = [
        { value: 60, color: 'border-gray-400' },
        { value: 75, color: 'border-orange-500' },
        { value: 85, color: 'border-red-500' },
        { value: 115, color: 'border-gray-400' },
    ];
    
    let barColor = 'bg-sky-600';
    if (brScore >= 75) barColor = 'bg-orange-500';
    if (brScore >= 85) barColor = 'bg-red-600';

    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-sm my-1 h-5 relative" dir="ltr">
            <div
                className={`h-full rounded-sm ${barColor} transition-all duration-500 ease-out`}
                style={{ width: `${percentage}%` }}
            ></div>
            {thresholds.map(t => (
                <div 
                    key={t.value}
                    className={`absolute top-0 h-full w-px ${t.color}`}
                    style={{ left: `${(t.value / MAX_BR) * 100}%` }}
                ></div>
            ))}
        </div>
    );
};

interface ReportSectionProps {
    title: string;
    content: string;
    icon: React.ReactNode;
}

const ReportSection: React.FC<ReportSectionProps> = ({ title, content, icon }) => (
  <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-6 shadow-sm">
    <h3 className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
      {icon}
      <span className="mr-3">{title}</span>
    </h3>
    <p className="text-gray-700 dark:text-gray-300 leading-loose whitespace-pre-line">
      {content}
    </p>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ reportData, userInfo, onDownloadPdf, onRestart }) => {
  const { rawScores, brScores, interpretation } = reportData;

  const displayOrder = [
    { category: 'شاخص های اصلاح', scales: ['X', 'Y', 'Z'] as Scale[] },
    { category: 'الگوهای بالینی شخصیت', scales: ['1', '2A', '2B', '3', '4', '5', '6A', '6B', '7', '8A', '8B'] as Scale[] },
    { category: 'آسیب شدید شخصیت', scales: ['S', 'C', 'P'] as Scale[] },
    { category: 'نشانگان بالینی', scales: ['A', 'H', 'N', 'D', 'B', 'T', 'R'] as Scale[] },
    { category: 'نشانگان شدید', scales: ['SS', 'CC', 'PP'] as Scale[] },
  ];
  
  return (
    <div>
        <div id="report-content" className="p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-gray-800 dark:text-gray-200">
            <header className="text-center border-b-2 border-gray-200 dark:border-gray-700 pb-4 mb-6">
                <h1 className="text-3xl font-bold text-cyan-700 dark:text-cyan-400">گزارش تحلیل شخصیت میلون</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">بر اساس آزمون MCMI</p>
            </header>
            
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">اطلاعات فردی</h2>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div><strong className="text-gray-600 dark:text-gray-400">نام کامل:</strong> {userInfo.fullName}</div>
                    <div><strong className="text-gray-600 dark:text-gray-400">شماره تماس:</strong> {userInfo.phone}</div>
                    <div><strong className="text-gray-600 dark:text-gray-400">جنسیت:</strong> { {male: 'مرد', female: 'زن', other: 'سایر'}[userInfo.gender] }</div>
                    <div><strong className="text-gray-600 dark:text-gray-400">وضعیت تاهل:</strong> { {single: 'مجرد', married: 'متاهل', divorced: 'مطلقه', widowed: 'بیوه'}[userInfo.maritalStatus] }</div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">پروفایل نمرات BR</h2>
                 <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse text-center">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                <th className="p-2 border dark:border-gray-600">مقیاس ها</th>
                                <th className="p-2 border dark:border-gray-600 min-w-[250px]">نمودار BR (آستانه: ۷۵ و ۸۵)</th>
                                <th className="p-2 border dark:border-gray-600">BR</th>
                                <th className="p-2 border dark:border-gray-600">نمره خام</th>
                                <th className="p-2 border dark:border-gray-600">نشانه</th>
                                <th className="p-2 border dark:border-gray-600">نشانگان</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayOrder.map(group => (
                                <React.Fragment key={group.category}>
                                    {group.scales.map((scaleId, index) => {
                                        const scaleInfo = SCALE_DETAILS[scaleId];
                                        if (!scaleInfo) return null;
                                        return (
                                        <tr key={scaleId} className="dark:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-800/50 text-gray-900 dark:text-gray-100">
                                            <td className="p-2 border dark:border-gray-600 font-semibold text-sm">{scaleInfo.name}</td>
                                            <td className="p-2 border dark:border-gray-600"><BrChart brScore={brScores[scaleId]} /></td>
                                            <td className="p-2 border dark:border-gray-600 font-bold text-lg">{brScores[scaleId]}</td>
                                            <td className="p-2 border dark:border-gray-600 text-md">{rawScores[scaleId]}</td>
                                            <td className="p-2 border dark:border-gray-600 font-mono">{scaleId}</td>
                                            {index === 0 && (
                                                <td className="p-2 border dark:border-gray-600 font-bold align-middle" rowSpan={group.scales.length}>
                                                    <div className="pdf-vertical-text [writing-mode:vertical-rl] transform -rotate-180 mx-auto">
                                                        {group.category}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    )})}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">تحلیل شخصیت توسط هوش مصنوعی</h2>
                 <ReportSection 
                    title="خلاصه پروفایل"
                    content={interpretation.profileSummary}
                    icon={<UserCircleIcon className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />}
                />
                <ReportSection 
                    title="شاخص‌های اعتبار"
                    content={interpretation.validityIndices}
                    icon={<CheckCircleIcon className="w-7 h-7 text-green-600 dark:text-green-400" />}
                />
                <ReportSection 
                    title="الگوهای بالینی شخصیت"
                    content={interpretation.clinicalPatterns}
                    icon={<ChartBarIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />}
                />
                <ReportSection 
                    title="آسیب‌شناسی شدید شخصیت"
                    content={interpretation.severePathology}
                    icon={<ExclamationTriangleIcon className="w-7 h-7 text-orange-600 dark:text-orange-400" />}
                />
                <ReportSection 
                    title="نشانگان بالینی و شدید"
                    content={interpretation.clinicalSyndromes}
                    icon={<ExclamationTriangleIcon className="w-7 h-7 text-red-600 dark:text-red-400" />}
                />
                <ReportSection 
                    title="ملاحظات تشخیصی احتمالی"
                    content={interpretation.diagnosticConsiderations}
                    icon={<BeakerIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />}
                />
                <ReportSection 
                    title="توصیه‌ها"
                    content={interpretation.recommendations}
                    icon={<AcademicCapIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />}
                />
            </section>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={onDownloadPdf} size="lg" className="flex items-center justify-center gap-2">
                <DownloadIcon className="w-5 h-5" />
                دانلود گزارش (PDF)
            </Button>
            <Button onClick={onRestart} variant="secondary" size="lg" className="flex items-center justify-center gap-2">
                 <RefreshIcon className="w-5 h-5" />
                شروع مجدد آزمون
            </Button>
        </div>
    </div>
  );
};

export default ResultsDisplay;
