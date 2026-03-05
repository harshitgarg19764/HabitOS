'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Palette, Shield, Globe, Moon, Sun, Check, Loader2, Camera } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

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
          backgroundColor: checked ? '#ffffff' : '#a1a1aa',
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
      <img
        src={src || '/default-avatar.png'}
        alt="Avatar"
        className="w-full h-full object-cover"
      />
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
      disabled={saving || saved}
      className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium flex items-center gap-2"
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
  const [activeSection, setActiveSection] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Harshit',
    email: 'harshit@example.com',
    timezone: 'America/New_York',
    avatar: null,
  });

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

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={item}>
          <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and customization
          </p>
        </motion.div>

        <div className="flex gap-6">
          {/* Section Navigation */}
          <motion.div variants={item} className="w-64 shrink-0">
            <div className="bg-card border rounded-2xl p-2 sticky top-24">
              <div className="relative">
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
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <Icon className="w-5 h-5 relative z-10" />
                      <span className="relative z-10 font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={item} className="flex-1 space-y-6">
            {/* Profile Section */}
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
                    onChange={(e) => setProfile({ ...profile, avatar: URL.createObjectURL(e.target.files[0]) })}
                  />
                  <div className="space-y-1">
                    <p className="font-medium">Profile Photo</p>
                    <p className="text-sm text-muted-foreground">Click to upload a new photo</p>
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
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Timezone</label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <SaveButton saving={saving} saved={saved} onClick={handleSave} />
                </div>
              </motion.div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border rounded-2xl p-6 space-y-6"
              >
                <h3 className="font-semibold text-lg">Notification Preferences</h3>
                
                <div className="space-y-4">
                  {[
                    { key: 'dailySummary', label: 'Daily Summary', desc: 'Get a summary of your habits each morning' },
                    { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive a detailed weekly performance report' },
                    { key: 'streakReminder', label: 'Streak Reminders', desc: 'Get notified when your streak is at risk' },
                    { key: 'achievementAlerts', label: 'Achievement Alerts', desc: 'Be notified when you unlock new badges' },
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <AnimatedToggle
                        checked={notifications[item.key]}
                        onChange={(v) => setNotifications({ ...notifications, [item.key]: v })}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <SaveButton saving={saving} saved={saved} onClick={handleSave} />
                </div>
              </motion.div>
            )}

            {/* Appearance Section */}
            {activeSection === 'appearance' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border rounded-2xl p-6 space-y-6"
              >
                <h3 className="font-semibold text-lg">Appearance</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Theme</label>
                    <div className="flex gap-3">
                      {[
                        { key: 'light', icon: Sun, label: 'Light' },
                        { key: 'dark', icon: Moon, label: 'Dark' },
                        { key: 'system', icon: Settings, label: 'System' },
                      ].map((theme) => {
                        const Icon = theme.icon;
                        return (
                          <button
                            key={theme.key}
                            onClick={() => setAppearance({ ...appearance, theme: theme.key })}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                              appearance.theme === theme.key
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'hover:bg-muted'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            {theme.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Accent Color</label>
                    <ColorPicker
                      colors={accentColors}
                      selected={appearance.accentColor}
                      onChange={(c) => setAppearance({ ...appearance, accentColor: c })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Week Starts On</label>
                    <div className="flex gap-3">
                      {[
                        { key: 'sunday', label: 'Sunday' },
                        { key: 'monday', label: 'Monday' },
                      ].map((day) => (
                        <button
                          key={day.key}
                          onClick={() => setAppearance({ ...appearance, weekStartDay: day.key })}
                          className={`flex-1 py-2.5 rounded-xl border transition-all ${
                            appearance.weekStartDay === day.key
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'hover:bg-muted'
                          }`}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <SaveButton saving={saving} saved={saved} onClick={handleSave} />
                </div>
              </motion.div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border rounded-2xl p-6 space-y-6"
              >
                <h3 className="font-semibold text-lg">Security</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your account password</p>
                    </div>
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl transition-colors">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <AnimatedToggle
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">Manage your logged in devices</p>
                    </div>
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Language Section */}
            {activeSection === 'language' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border rounded-2xl p-6 space-y-6"
              >
                <h3 className="font-semibold text-lg">Language & Region</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Language</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                          language === lang.code
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                        {language === lang.code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
                            <Check className="w-5 h-5 text-primary" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <SaveButton saving={saving} saved={saved} onClick={handleSave} />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
