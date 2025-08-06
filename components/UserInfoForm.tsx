import React, { useState } from 'react';
import { UserInfo } from '../types';
import Button from './common/Button';
import Card from './common/Card';

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
  error: string | null;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState<UserInfo>({
    fullName: '',
    phone: '',
    gender: 'male',
    maritalStatus: 'single'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.phone) {
      onSubmit(formData);
    } else {
      alert("لطفا نام و شماره تماس را وارد کنید.");
    }
  };

  return (
    <Card>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-2">اطلاعات فردی</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">این اطلاعات برای شخصی‌سازی گزارش شما استفاده می‌شود.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">نام و نام خانوادگی</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">شماره تماس</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">جنسیت</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md dark:text-gray-100"
            >
              <option value="male">مرد</option>
              <option value="female">زن</option>
              <option value="other">سایر</option>
            </select>
          </div>
          <div>
            <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">وضعیت تاهل</label>
            <select
              name="maritalStatus"
              id="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md dark:text-gray-100"
            >
              <option value="single">مجرد</option>
              <option value="married">متاهل</option>
              <option value="divorced">مطلقه</option>
              <option value="widowed">بیوه</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div className="pt-4">
            <Button type="submit" className="w-full" size="lg">
              تولید گزارش نهایی
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default UserInfoForm;