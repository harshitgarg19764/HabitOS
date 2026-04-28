'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Palette, Shield, Globe, Moon, Sun, Check, Loader2, Camera } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { authAPI, settingsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/Toast';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'language', label: 'Language', icon: Globe },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
];

const accentColors = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Blue', value: '#3b82f6' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function AnimatedToggle({ checked, onChange, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative w-14 h-8 rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-muted'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <motion.div
        initial={false}
        animate={{
          x: checked ? 24 : 4,
          backgroundColor: '#ffffff',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-6 h-6 rounded-full shadow-md"
      />
    </button>
  );
}

export function AvatarUpload({ src, onChange }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => document.getElementById('avatar-input')?.click()}
    >
      <div className="w-full h-full bg-muted flex items-center justify-center">
        {src ? (
          <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <User className="w-12 h-12 text-muted-foreground" />
        )}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-black/50 flex items-center justify-center"
      >
        <Camera className="w-8 h-8 text-white" />
      </motion.div>
      <input
        id="avatar-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}

export function ColorPicker({ colors, selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <motion.button
          key={color.value}
          onClick={() => onChange(color.value)}
          className={`relative w-10 h-10 rounded-full cursor-pointer ${
            selected === color.value ? 'ring-2 ring-offset-2 ring-primary' : ''
          }`}
          style={{ backgroundColor: color.value }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {selected === color.value && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check className="w-5 h-5 text-white drop-shadow-md" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

export function SaveButton({ saving, saved, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={saving}
      className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium flex items-center gap-2 disabled:opacity-50"
      whileTap={{ scale: 0.96 }}
    >
      {saving ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Saving...
        </>
      ) : saved ? (
        <>
          <Check className="w-4 h-4" />
          Saved!
        </>
      ) : (
        'Save Changes'
      )}
    </motion.button>
  );
}

export default function SettingsPage() {
  const { user, login } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    timezone: 'UTC',
    avatar: null,
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        timezone: user.timezone || 'UTC',
        avatar: user.avatar || null,
      });
    }
  }, [user]);

  const [notifications, setNotifications] = useState({
    dailySummary: true,
    weeklyReport: true,
    streakReminder: true,
    achievementAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
  });

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    accentColor: '#6366f1',
    weekStartDay: 'sunday',
  });

  const [language, setLanguage] = useState('en');

  const { success, error } = useToast();

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await settingsAPI.getEmail();
        if (response.data) {
          setNotifications({
            dailySummary: response.data.dailySummaryEnabled,
            weeklyReport: response.data.weeklyReportEnabled,
            streakReminder: response.data.streakReminderEnabled,
            achievementAlerts: true, // Backend logic for this can be added later
            emailNotifications: response.data.enabled,
            pushNotifications: false,
          });
        }
      } catch (err) {
        console.error('Failed to fetch settings', err);
      }
    }
    fetchSettings();
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const response = await authAPI.updateProfile(profile);
      if (response.success) {
        setSaved(true);
        success('Profile updated successfully!');
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error('Failed to update profile', err);
      error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async (newNotifications) => {
    setSaving(true);
    try {
      const updates = {
        dailySummaryEnabled: newNotifications.dailySummary,
        weeklyReportEnabled: newNotifications.weeklyReport,
        streakReminderEnabled: newNotifications.streakReminder,
        enabled: newNotifications.emailNotifications,
      };
      const response = await settingsAPI.updateEmail(updates);
      if (response.success) {
        setNotifications(newNotifications);
        setSaved(true);
        success('Preferences saved!');
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error('Failed to update notifications', err);
      error('Failed to save preferences.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={item}>
          <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and customization
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          <motion.div variants={item} className="w-full md:w-64 shrink-0">
            <div className="bg-card border rounded-2xl p-2 sticky top-24">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors relative ${
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                      />
                    )}
                    <Icon className="w-5 h-5 relative z-10" />
                    <span className="relative z-10 font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={item} className="flex-1 space-y-6">
            {activeSection === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border rounded-2xl p-6 space-y-6"
              >
                <h3 className="font-semibold text-lg">Profile Settings</h3>
                
                <div className="flex items-center gap-6">
                  <AvatarUpload
                    src={profile.avatar}
                    onChange={(e) => {
                      // Avatar upload logic would go here
                      console.log('Avatar changed');
                    }}
                  />
                  <div className="space-y-1">
                    <p className="font-medium">Profile Photo</p>
                    <p className="text-sm text-muted-foreground">Personalize your account</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-4 py-2.5 bg-muted border rounded-xl cursor-not-allowed opacity-70"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <SaveButton saving={saving} saved={saved} onClick={handleSaveProfile} />
                </div>
              </motion.div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-card border rounded-2xl p-6 space-y-6">
                 <h3 className="font-semibold text-lg">Notification Preferences</h3>
                 <div className="space-y-4">
                  {Object.entries(notifications).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b last:border-0 capitalize">
                      <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                      <AnimatedToggle 
                        checked={val} 
                        onChange={(v) => setNotifications({...notifications, [key]: v})} 
                      />
                    </div>
                  ))}
                 </div>
                 <div className="flex justify-end pt-4">
                   <SaveButton saving={saving} saved={saved} onClick={() => handleSaveNotifications(notifications)} />
                 </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="bg-card border rounded-2xl p-6 space-y-6">
                 <h3 className="font-semibold text-lg">Appearance</h3>
                 <div className="space-y-4">
                  <label className="text-sm font-medium">Theme</label>
                  <div className="flex gap-4">
                     {['light', 'dark', 'system'].map(t => (
                       <button 
                         key={t}
                         className={cn("px-4 py-2 rounded-lg border capitalize", appearance.theme === t ? "bg-primary text-white" : "bg-muted")}
                         onClick={() => setAppearance({...appearance, theme: t})}
                       >
                         {t}
                       </button>
                     ))}
                  </div>
                  <label className="text-sm font-medium">Accent Color</label>
                  <ColorPicker colors={accentColors} selected={appearance.accentColor} onChange={(c) => setAppearance({...appearance, accentColor: c})} />
                 </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
