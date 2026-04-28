'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const habitIcons = ['🧘', '💧', '📚', '🏋️', '✍️', '🚫', '🌙', '🇪🇸', '🧹', '🎯', '💪', '🎨', '🎵', '📝', '🌿', '☕', '🍎', '😴', '🧠', '💻'];

const colors = [
  '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899',
  '#6366f1', '#14b8a6', '#f97316', '#06b6d4', '#84cc16', '#a855f7',
];

export function CreateHabitModal({ isOpen, onClose, onSubmit, editHabit }) {
  const [formData, setFormData] = useState({
    name: '',
    icon: '🎯',
    color: '#8b5cf6',
    type: 'boolean',
    goal: '',
    unit: '',
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (editHabit) {
      setFormData({
        name: editHabit.name,
        icon: editHabit.icon,
        color: editHabit.color,
        type: editHabit.type || 'boolean',
        goal: editHabit.goal || '',
        unit: editHabit.unit || '',
      });
    } else {
      setFormData({
        name: '',
        icon: '🎯',
        color: '#8b5cf6',
        type: 'boolean',
        goal: '',
        unit: '',
      });
    }
    setStep(1);
  }, [editHabit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      goal: formData.type === 'numeric' ? parseInt(formData.goal) : null,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg my-auto"
        >
          <Card className="overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-heading font-bold">
                  {editHabit ? 'Edit Habit' : 'Create New Habit'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Step {step} of 2
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-muted">
              <motion.div
                className="h-full bg-primary"
                animate={{ width: step === 1 ? '50%' : '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Icon Picker */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Choose an Icon</label>
                      <div className="grid grid-cols-10 gap-2">
                        {habitIcons.map((icon) => (
                          <motion.button
                            key={icon}
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormData({ ...formData, icon })}
                            className={cn(
                              'w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all',
                              formData.icon === icon
                                ? 'bg-primary/20 ring-2 ring-primary'
                                : 'bg-muted/30 hover:bg-muted'
                            )}
                          >
                            {icon}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Name Input */}
                    <Input
                      label="Habit Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />

                    {/* Type Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Habit Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, type: 'boolean' })}
                          className={cn(
                            'p-4 rounded-xl border-2 transition-all text-left',
                            formData.type === 'boolean'
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          )}
                        >
                          <div className="text-2xl mb-2">✓</div>
                          <div className="font-medium">Yes/No</div>
                          <div className="text-xs text-muted-foreground">Simple checkbox</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, type: 'numeric' })}
                          className={cn(
                            'p-4 rounded-xl border-2 transition-all text-left',
                            formData.type === 'numeric'
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          )}
                        >
                          <div className="text-2xl mb-2">123</div>
                          <div className="font-medium">Numeric</div>
                          <div className="text-xs text-muted-foreground">Track a number</div>
                        </button>
                      </div>
                    </div>

                    <Button type="button" onClick={() => setStep(2)} className="w-full">
                      Continue
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Color Picker */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Choose a Color</label>
                      <div className="flex flex-wrap gap-3">
                        {colors.map((color) => (
                          <motion.button
                            key={color}
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormData({ ...formData, color })}
                            className={cn(
                              'w-10 h-10 rounded-full transition-all',
                              formData.color === color && 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white'
                            )}
                            style={{ backgroundColor: color }}
                          >
                            {formData.color === color && (
                              <Check className="w-5 h-5 text-white mx-auto" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Numeric Fields */}
                    {formData.type === 'numeric' && (
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Daily Goal"
                          type="number"
                          value={formData.goal}
                          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                          required
                        />
                        <Input
                          label="Unit (optional)"
                          placeholder="e.g. ml, pages"
                          value={formData.unit}
                          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        />
                      </div>
                    )}

                    {/* Preview */}
                    <div className="p-4 rounded-xl bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-2">Preview</p>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{formData.icon}</span>
                        <div>
                          <div className="font-medium">{formData.name || 'Your habit'}</div>
                          <div className="text-sm text-muted-foreground">
                            {formData.type === 'numeric'
                              ? `${formData.goal || '0'} ${formData.unit || ''}`
                              : 'Yes/No'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1">
                        {editHabit ? 'Save Changes' : 'Create Habit'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
