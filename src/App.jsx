import { useState } from 'react';
import AuroraTheme from './themes/AuroraTheme';

const THEMES = [
  { id: 'cyber',     label: 'Cyber',    emoji: '⚡', desc: 'Dark neon green' },
  { id: 'luxury',    label: 'Luxury',   emoji: '✦',  desc: 'Gold editorial' },
  { id: 'minimal',   label: 'Minimal',  emoji: '○',  desc: 'Clean & light' },
  { id: 'brutalist', label: 'Brutalist',emoji: '■',  desc: 'Bold red/black' },
  { id: 'aurora',    label: 'Aurora',   emoji: '◈',  desc: 'Purple gradient' },
];

const THEME_MAP = {
  aurora: AuroraTheme,
};

export default function App() {
  const [theme, setTheme] = useState('aurora');
  const [open, setOpen] = useState(false);
  const Active = THEME_MAP[theme];
  const current = THEMES.find(t => t.id === theme);
  const isDark = theme !== 'minimal';

  return (
    <>
      <Active />
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">
        {open && (
          <div className={`rounded-xl shadow-2xl overflow-hidden border text-sm ${isDark ? 'bg-[#111]/95 border-white/10 text-white' : 'bg-white border-black/10 text-[#111]'}`}
            style={{ backdropFilter: 'blur(20px)' }}>
            <div className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest border-b ${isDark ? 'border-white/10 text-white/40' : 'border-black/5 text-[#999]'}`}>
              Choose Theme
            </div>
            {THEMES.map(t => (
              <button key={t.id} onClick={() => { setTheme(t.id); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all text-left
                  ${theme === t.id ? (isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-[#111]') : (isDark ? 'text-white/50 hover:bg-white/5 hover:text-white' : 'text-[#888] hover:text-[#111]')}`}>
                <span className="text-base w-5 text-center">{t.emoji}</span>
                <span className="flex-1">
                  <span className="font-semibold">{t.label}</span>
                  <span className={`block text-xs ${isDark ? 'text-white/25' : 'text-[#bbb]'}`}>{t.desc}</span>
                </span>
                {theme === t.id && <span>✓</span>}
              </button>
            ))}
          </div>
        )}
        {/* <button onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-lg font-bold transition-all hover:scale-110"
          style={{
            background: theme === 'cyber' ? '#00ff88' : theme === 'luxury' ? 'linear-gradient(135deg,#c9a96e,#f0d080)' : theme === 'minimal' ? '#1a1a1a' : theme === 'brutalist' ? '#ff2d2d' : 'linear-gradient(135deg,#8b5cf6,#06b6d4)',
            color: theme === 'cyber' ? '#050a0e' : 'white',
          }}
          title="Switch Theme">
          {current.emoji}
        </button> */}
      </div>
    </>
  );
}
