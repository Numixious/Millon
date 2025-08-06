import React, { useState, useMemo } from 'react';
import { Question, Answer, Answers } from '../types';
import Button from './common/Button';
import Card from './common/Card';

interface QuestionnaireProps {
  questions: Question[];
  onComplete: (answers: Answers) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState<Answers>(new Map());

  const handleAnswerChange = (id: number, answer: Answer) => {
    const newAnswers = new Map(answers);
    newAnswers.set(id, answer);
    setAnswers(newAnswers);
  };

  const answeredCount = useMemo(() => answers.size, [answers]);
  const allAnswered = useMemo(() => answeredCount === questions.length, [answeredCount, questions.length]);
  const progress = useMemo(() => (answeredCount / questions.length) * 100, [answeredCount, questions.length]);

  return (
    <Card>
      <div className="p-4 sm:p-6 md:p-8">
        <div className="sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm pt-2 pb-4 z-10 mb-6">
          <h2 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-2">پرسشنامه</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-4">لطفاً به تمام سوالات زیر پاسخ دهید.</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
             <div 
                className="bg-cyan-600 h-4 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 font-semibold">
            {answeredCount} از {questions.length} سوال پاسخ داده شده
          </p>
        </div>
        
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="p-4 bg-gray-50 dark:bg-gray-700/60 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                <span className="ml-2 font-bold">{index + 1}.</span>{q.text}
              </p>
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value="yes"
                    checked={answers.get(q.id) === 'yes'}
                    onChange={() => handleAnswerChange(q.id, 'yes')}
                    className="form-radio h-5 w-5 text-green-600 focus:ring-green-500"
                  />
                  <span className={`font-medium ${answers.get(q.id) === 'yes' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    بلی
                  </span>
                </label>
                <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value="no"
                    checked={answers.get(q.id) === 'no'}
                    onChange={() => handleAnswerChange(q.id, 'no')}
                    className="form-radio h-5 w-5 text-red-600 focus:ring-red-500"
                  />
                  <span className={`font-medium ${answers.get(q.id) === 'no' ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    خیر
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            onClick={() => onComplete(answers)} 
            disabled={!allAnswered}
            size="lg"
          >
            پایان آزمون و مشاهده نتایج
          </Button>
          {!allAnswered && <p className="text-sm text-red-600 mt-2">برای ادامه باید به تمام سوالات پاسخ دهید.</p>}
        </div>
      </div>
    </Card>
  );
};

export default Questionnaire;