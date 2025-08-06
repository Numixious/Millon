
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AppStep, UserInfo, Scale, Answers, ReportData } from './types';
import { QUESTIONS } from './constants/questions';
import { SCORING_KEY, SCALE_DETAILS } from './constants/scoring';
import { generateInterpretation } from './services/geminiService';
import { generatePdf } from './services/pdfService';
import Questionnaire from './components/Questionnaire';
import UserInfoForm from './components/UserInfoForm';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/common/Loader';
import Card from './components/common/Card';
import Button from './components/common/Button';
import { DocumentTextIcon } from './components/common/Icons';
import ThemeToggler from './components/ThemeToggler';


const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Intro);
  const [answers, setAnswers] = useState<Answers>(new Map());
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleStart = () => {
    setStep(AppStep.Questionnaire);
  };

  const calculateRawScores = useCallback((currentAnswers: Answers): Record<Scale, number> => {
    const scores = {} as Record<Scale, number>;
    // Initialize all scales from SCALE_DETAILS to ensure none are missed
    for (const scaleKey in SCALE_DETAILS) {
        scores[scaleKey as Scale] = 0;
    }
    
    currentAnswers.forEach((answer, id) => {
        for (const scale in SCORING_KEY) {
            const scaleKey = scale as Scale;
            const questionScoring = SCORING_KEY[scaleKey];
            if (questionScoring && questionScoring[id] === answer) {
                scores[scaleKey]++;
            }
        }
    });

    return scores;
  }, []);

  const calculateBrScores = useCallback((rawScores: Record<Scale, number>): Record<Scale, number> => {
    const brScores = {} as Record<Scale, number>;
    for (const scaleKey in rawScores) {
        const scale = scaleKey as Scale;
        const rawScore = rawScores[scale];
        const maxRawScore = Object.keys(SCORING_KEY[scale] || {}).length;

        // This is a simplified linear transformation for illustrative purposes.
        // Real BR scores use complex, non-linear lookup tables based on normative samples.
        let brScore = 0;
        if (maxRawScore > 0) {
            brScore = Math.min(115, Math.round((rawScore / maxRawScore) * 115));
        }
        
        // A special case for Disclosure (X) might be needed, but we'll use linear for now.
        brScores[scale] = brScore;
    }
    return brScores;
  }, []);


  const handleQuestionnaireComplete = (finalAnswers: Answers) => {
    setAnswers(finalAnswers);
    setStep(AppStep.UserInfo);
  };

  const handleUserInfoSubmit = async (info: UserInfo) => {
    setUserInfo(info);
    setStep(AppStep.Generating);
    setError(null);

    try {
      const rawScores = calculateRawScores(answers);
      const brScores = calculateBrScores(rawScores);
      const interpretation = await generateInterpretation(rawScores, brScores);
      setReportData({ rawScores, brScores, interpretation });
      setStep(AppStep.Results);
    } catch (e) {
      console.error(e);
      setError('خطایی در تولید گزارش رخ داد. لطفاً دوباره امتحان کنید.');
      setStep(AppStep.UserInfo); // Go back to allow retry
    }
  };

  const handleDownloadPdf = () => {
    const reportElement = document.getElementById('report-content');
    if (reportElement && userInfo) {
      generatePdf(reportElement, `MCMI-Report-${userInfo.fullName.replace(' ', '_')}.pdf`);
    }
  };
  
  const handleRestart = () => {
    setStep(AppStep.Intro);
    setAnswers(new Map());
    setUserInfo(null);
    setReportData(null);
    setError(null);
  };

  const renderStep = () => {
    switch (step) {
      case AppStep.Intro:
        return (
          <Card>
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">آزمون شخصیت شناسی میلون (MCMI)</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6 mx-auto max-w-2xl">
                به ابزار ارزیابی شخصیت میلون خوش آمدید. این آزمون به شما کمک می‌کند تا درک عمیق‌تری از الگوهای شخصیتی و وضعیت روانی خود به دست آورید. لطفاً به ۱۷۵ سؤال با صداقت کامل پاسخ دهید. پاسخ‌های شما توسط هوش مصنوعی تحلیل شده و گزارشی جامع تهیه خواهد شد.
              </p>
              <Button onClick={handleStart} size="lg">شروع آزمون</Button>
            </div>
          </Card>
        );
      case AppStep.Questionnaire:
        return <Questionnaire questions={QUESTIONS} onComplete={handleQuestionnaireComplete} />;
      case AppStep.UserInfo:
        return <UserInfoForm onSubmit={handleUserInfoSubmit} error={error} />;
      case AppStep.Generating:
        return (
            <Card>
                <div className="p-10 flex flex-col items-center justify-center text-center">
                    <Loader />
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-6">در حال تحلیل پاسخ‌ها و تولید گزارش...</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">این فرآیند ممکن است یک دقیقه طول بکشد. لطفاً شکیبا باشید.</p>
                </div>
            </Card>
        );
      case AppStep.Results:
        return reportData && userInfo ? (
          <ResultsDisplay 
            reportData={reportData} 
            userInfo={userInfo} 
            onDownloadPdf={handleDownloadPdf}
            onRestart={handleRestart}
          />
        ) : null;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
                <DocumentTextIcon className="h-10 w-10 text-cyan-600 dark:text-cyan-400" />
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">تحلیلگر شخصیت میلون</h1>
            </div>
            <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        </header>
        <main>
          {renderStep()}
        </main>
      </div>
    </div>
  );
};

export default App;
