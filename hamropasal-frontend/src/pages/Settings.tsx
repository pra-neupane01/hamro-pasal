import { useState } from 'react';
import {
  FaUserCog,
  FaCogs,
  FaBell,
  FaClock,
  FaLanguage,
  FaMoneyBill,
  FaStore,
  FaTruckLoading,
  FaChartLine,
  FaUserShield,
  FaBullhorn,
  FaUsersCog,
  FaPlug,
  FaSave,
  FaRedoAlt,
  FaUser,
  FaCreditCard,
  FaWallet,
  FaCheckCircle,
  FaTimesCircle,
  FaCalculator,
  FaUserCircle,
  FaCalendarAlt,
  FaBuilding,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaUsers,
  FaTrash
} from 'react-icons/fa';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });
  const [locale, setLocale] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('UTC');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [enableBarcode, setEnableBarcode] = useState(true);
  const [enableLoyalty, setEnableLoyalty] = useState(false);
  const [taxRate, setTaxRate] = useState(10);
  const [backupFrequency, setBackupFrequency] = useState('daily');

  const tabs = [
    { id: 'general', label: 'General', icon: <FaCogs /> },
    { id: 'profile', label: 'Profile', icon: <FaUserCog /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'preferences', label: 'Preferences', icon: <FaClock /> },
    { id: 'security', label: 'Security', icon: <FaUserShield /> },
    { id: 'billing', label: 'Billing & Subscription', icon: <FaMoneyBill /> },
    { id: 'integrations', label: 'Integrations', icon: <FaPlug /> },
    { id: 'account', label: 'Account', icon: <FaUsersCog /> }
  ];

  const handleSave = () => {
    // In a real app, this would send data to the backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Settings</h2>
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2"
              onClick={handleSave}
            >
              <FaSave />
              Save Changes
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={() => {/* Reset to defaults */}}
            >
              <FaRedoAlt />
              Reset
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                 ${activeTab === tab.id
                   ? 'border-b-2 border-indigo-500 text-indigo-600'
                   : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        {activeTab === 'general' && (
          <GeneralSettings
            locale={locale} setLocale={setLocale}
            currency={currency} setCurrency={setCurrency}
            timezone={timezone} setTimezone={setTimezone}
            dateFormat={dateFormat} setDateFormat={setDateFormat}
            timeFormat={timeFormat} setTimeFormat={setTimeFormat}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileSettings />
        )}
        {activeTab === 'notifications' && (
          <NotificationSettings
            notifications={notifications} setNotifications={setNotifications}
          />
        )}
        {activeTab === 'preferences' && (
          <PreferencesSettings
            lowStockThreshold={lowStockThreshold} setLowStockThreshold={setLowStockThreshold}
            enableBarcode={enableBarcode} setEnableBarcode={setEnableBarcode}
            enableLoyalty={enableLoyalty} setEnableLoyalty={setEnableLoyalty}
          />
        )}
        {activeTab === 'security' && (
          <SecuritySettings />
        )}
        {activeTab === 'billing' && (
          <BillingSettings />
        )}
        {activeTab === 'integrations' && (
          <IntegrationsSettings />
        )}
        {activeTab === 'account' && (
          <AccountSettings />
        )}
      </div>
    </div>
  );
};

// General Settings Component
const GeneralSettings = ({
  locale, setLocale,
  currency, setCurrency,
  timezone, setTimezone,
  dateFormat, setDateFormat,
  timeFormat, setTimeFormat
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">General Preferences</h3>
        <p className="text-gray-600">Configure your basic application settings.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="en">English</option>
            <option value="ne">Nepali</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option>
            <option value="JPY">Japanese Yen (¥)</option>
            <option value="INR">Indian Rupee (₹)</option>
            <option value="NPR">Nepalese Rupee (₨)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Time Zone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time (US & Canada)</option>
            <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
            <option value="Europe/London">London</option>
            <option value="Asia/Kolkata">India Standard Time</option>
            <option value="Asia/Kathmandu">Nepal Time</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Date Format</label>
          <select
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY/MM/DD">YYYY/MM/DD</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Time Format</label>
          <select
            value={timeFormat}
            onChange={(e) => setTimeFormat(e.target.value)}
            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="12h">12 Hour (AM/PM)</option>
            <option value="24h">24 Hour</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Profile Settings Component
const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    alert('Profile updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
        <p className="text-gray-600">Update your personal details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => setProfile({...profile, firstName: e.target.value})}
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Enter your first name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => setProfile({...profile, lastName: e.target.value})}
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Enter your last name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                <FaUser className="text-gray-500 text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Upload a profile picture</p>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 block w-full text-sm text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

// Notification Settings Component
const NotificationSettings = ({ notifications, setNotifications }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Notification Preferences</h3>
        <p className="text-gray-600">Choose how you want to receive notifications.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            Email Notifications
          </label>
          <p className="text-sm text-gray-500 mt-1">Receive updates via email</p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            SMS Notifications
          </label>
          <p className="text-sm text-gray-500 mt-1">Receive urgent alerts via text message</p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            Push Notifications
          </label>
          <p className="text-sm text-gray-500 mt-1">Get browser notifications for important events</p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={notifications.marketing}
              onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            Marketing Communications
          </label>
          <p className="text-sm text-gray-500 mt-1">Occasional updates about new features and offers</p>
        </div>
      </div>
    </div>
  );
};

// Preferences Settings Component
const PreferencesSettings = ({
  lowStockThreshold, setLowStockThreshold,
  enableBarcode, setEnableBarcode,
  enableLoyalty, setEnableLoyalty
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Store Preferences</h3>
        <p className="text-gray-600">Configure settings specific to your retail store.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Low Stock Threshold</label>
          <div className="flex items-center">
            <input
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 0)}
              className="w-20 pl-3 pr-1 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              min="0"
            />
            <span className="ml-2 text-sm text-gray-600">items</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Get notified when stock falls below this level</p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={enableBarcode}
              onChange={(e) => setEnableBarcode(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            Enable Barcode Scanning
          </label>
          <p className="text-sm text-gray-500 mt-1">Use barcode scanner for faster product entry</p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={enableLoyalty}
              onChange={(e) => setEnableLoyalty(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            Enable Loyalty Program
          </label>
          <p className="text-sm text-gray-500 mt-1">Reward repeat customers with points and discounts</p>
        </div>
      </div>
    </div>
  );
};

// Security Settings Component
const SecuritySettings = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChangePassword = (e) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully!');
  };

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // In a real app, this would send data to the backend
    alert(twoFactorEnabled ? 'Two-factor authentication disabled' : 'Two-factor authentication enabled');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>
        <p className="text-gray-600">Protect your account and data.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={handleToggleTwoFactor}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            Two-Factor Authentication
          </label>
          <p className="text-sm text-gray-500 mt-1">
            {twoFactorEnabled
              ? 'Enabled - Requires verification code for sign-in'
              : 'Disabled - Your account is less secure'}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Change Password</h4>
          <form onSubmit={handleChangePassword} className="space-y-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                // In a real app, you'd need to verify the current password
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Enter your current password"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Enter your new password"
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Confirm your new password"
                minLength={8}
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="show-password"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <label className="ml-2 text-sm text-gray-500" htmlFor="show-password">
                Show password
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Billing Settings Component
const BillingSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Billing & Subscription</h3>
        <p className="text-gray-600">Manage your subscription and payment information.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaCreditCard className="text-xl text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">Current Plan</h4>
              <p className="text-sm text-gray-600">Professional</p>
              <p className="text-sm font-medium text-green-600 mt-1">Active • Renews monthly</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-sm font-medium text-gray-700">Next Billing Date</p>
            <p className="text-sm text-gray-600">February 15, 2024</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-4 border p-4 rounded-lg">
              <div className="p-3 bg-gray-100 rounded-full">
                <FaWallet className="text-xl text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-700">Visa ending in 4242</p>
                <p className="text-sm text-gray-600">Expires 12/24</p>
              </div>
              <div className="flex-shrink-0">
                <button
                  className="px-3 py-1 text-xs bg-indigo-100 text-indigo-800 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Billing History</h4>
          <div className="space-y-2">
            <div className="flex items-center p-3 border border-gray-200 rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
                <FaCheckCircle className="text-green-500" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">January 15, 2024</p>
                <p className="text-sm text-gray-600">$49.99</p>
              </div>
              <div className="ml-auto text-sm">
                <span className="text-green-600 font-medium">Paid</span>
              </div>
            </div>
            <div className="flex items-center p-3 border border-gray-200 rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100">
                <FaTimesCircle className="text-red-500" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">December 15, 2023</p>
                <p className="text-sm text-gray-600">$49.99</p>
              </div>
              <div className="ml-auto text-sm">
                <span className="text-red-600 font-medium">Failed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Integrations Settings Component
const IntegrationsSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Integrations</h3>
        <p className="text-gray-600">Connect your favorite tools and services.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Accounting */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3 mb-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <FaCalculator className="text-xl text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Accounting Software</h4>
                <p className="text-sm text-gray-600">Sync sales, expenses, and taxes</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100">Not Connected</span>
              <button
                className="ml-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Connect
              </button>
            </div>
          </div>

          {/* E-commerce */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3 mb-4">
              <div className="p-3 bg-green-50 rounded-full">
                <FaStore className="text-xl text-green-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">E-commerce Platforms</h4>
                <p className="text-sm text-gray-600">Sync inventory and orders</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100">Not Connected</span>
              <button
                className="ml-2 px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
              >
                Connect
              </button>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3 mb-4">
              <div className="p-3 bg-orange-50 rounded-full">
                <FaTruckLoading className="text-xl text-orange-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Shipping Carriers</h4>
                <p className="text-sm text-gray-600">Calculate rates and print labels</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100">Not Connected</span>
              <button
                className="ml-2 px-3 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Connect
              </button>
            </div>
          </div>

          {/* Marketing */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3 mb-4">
              <div className="p-3 bg-purple-50 rounded-full">
                <FaBullhorn className="text-xl text-purple-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Marketing Tools</h4>
                <p className="text-sm text-gray-600">Email campaigns and customer engagement</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100">Not Connected</span>
              <button
                className="ml-2 px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Connect
              </button>
            </div>
          </div>

          {/* Payment Gateways */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3 mb-4">
              <div className="p-3 bg-yellow-50 rounded-full">
                <FaCreditCard className="text-xl text-yellow-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Payment Gateways</h4>
                <p className="text-sm text-gray-600">Accept payments online and in-store</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100">Not Connected</span>
              <button
                className="ml-2 px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Connect
              </button>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3 mb-4">
              <div className="p-3 bg-indigo-50 rounded-full">
                <FaChartLine className="text-xl text-indigo-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Analytics & Reporting</h4>
                <p className="text-sm text-gray-600">Connect to BI tools for deeper insights</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100">Not Connected</span>
              <button
                className="ml-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Account Settings Component
const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Account Information</h3>
        <p className="text-gray-600">View and manage your account details.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Account Details</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                  <FaUserCircle className="text-xl text-blue-500" />
                </span>
                <div className="ml-3">
                  <p className="font-medium text-gray-700">Account ID</p>
                  <p className="text-sm text-gray-600">ACC-789456</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                  <FaCalendarAlt className="text-xl text-blue-500" />
                </span>
                <div className="ml-3">
                  <p className="font-medium text-gray-700">Account Created</p>
                  <p className="text-sm text-gray-600">March 15, 2023</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                  <FaBuilding className="text-xl text-blue-500" />
                </span>
                <div className="ml-3">
                  <p className="font-medium text-gray-700">Business Name</p>
                  <p className="text-sm text-gray-600">Hamropasal Demo Store</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                  <FaMapMarkerAlt className="text-xl text-blue-500" />
                </span>
                <div className="ml-3">
                  <p className="font-medium text-gray-700">Primary Location</p>
                  <p className="text-sm text-gray-600">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Usage Statistics</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
                  <FaBoxOpen className="text-xl text-green-500" />
                </span>
                <div className="ml-3">
                  <p className="font-medium text-gray-700">Products Managed</p>
                  <p className="text-sm text-gray-600">1,247</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
                  <FaUsers className="text-xl text-green-500" />
                </span>
                <div className="ml-3">
                  <p className="font-medium text-gray-700">Customer Records</p>
                  <p className="text-sm text-gray-600">3,420</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
                  <FaChartLine className="text-xl text-green-500" />
                </span>
                <div className="ml-3">
                  <p className="font-medium text-gray-700">Monthly Sales</p>
                  <p className="text-sm text-gray-600">$45,200</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
                  <FaCalendarAlt className="text-xl text-green-500" />
                </span>
                <div className="ml-3">
                  <p className="font-medium text-gray-700">Data Storage Used</p>
                  <p className="text-sm text-gray-600">2.4 GB / 10 GB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Data Management</h4>
        <div className="space-y-3">
          <div className="flex items-start p-4 border border-gray-200 rounded-lg">
            <div className="p-3 mr-4 bg-red-50 rounded-full">
              <FaTrash className="text-xl text-red-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">Export Data</h4>
              <p className="text-sm text-gray-600">Download a CSV backup of your store data</p>
            </div>
            <div className="flex-shrink-0">
              <button
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              >
                Export
              </button>
            </div>
          </div>
          <div className="flex items-start p-4 border border-gray-200 rounded-lg">
            <div className="p-3 mr-4 bg-red-50 rounded-full">
              <FaTimesCircle className="text-xl text-red-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">Delete Account</h4>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <div className="flex-shrink-0">
              <button
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};