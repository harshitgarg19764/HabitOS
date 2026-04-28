export const welcomeTemplate = (name) => `
<div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
  <h1 style="color: #6366f1;">Welcome to HabitOS, ${name}! 🚀</h1>
  <p>We're thrilled to have you here. HabitOS is designed to help you run your life like software—with precision, intelligence, and beautiful design.</p>
  <p>Start by creating your first habit and watch your streaks grow!</p>
  <div style="margin-top: 30px; text-align: center;">
    <a href="http://localhost:3000/dashboard" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
  </div>
</div>
`;

export const dailySummaryTemplate = (name, stats) => `
<div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
  <h2 style="color: #6366f1;">Good Evening, ${name} 👋</h2>
  <p>Here's a quick look at your performance today:</p>
  <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
    <p><strong>Completions:</strong> ${stats.completedToday} / ${stats.activeHabits}</p>
    <p><strong>Daily Score:</strong> ${stats.score || 0} pts</p>
  </div>
  <p>Keep up the momentum! See you tomorrow.</p>
</div>
`;

export const streakReminderTemplate = (name, habitName, streakCount) => `
<div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
  <h2 style="color: #ef4444;">Don't Break the Chain! 🔥</h2>
  <p>Hey ${name}, your <strong>${streakCount}-day streak</strong> for <strong>${habitName}</strong> is at risk!</p>
  <p>Take a small step now to keep the fire burning.</p>
  <div style="margin-top: 30px; text-align: center;">
    <a href="http://localhost:3000/logs" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Log it Now</a>
  </div>
</div>
`;
