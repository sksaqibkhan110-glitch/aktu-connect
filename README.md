# AKTU Connect — Setup Guide

Backend real hai ab (Supabase), Silver Guide jaisi hi game logic ke saath:
- Level formula: `level = floor(total_xp / 2000) + 1` (same as Silver Guide)
- Focus session: victory pe **+2 XP/minute**, beech me tab chhodne pe **-20 XP** penalty
- Quest tasks complete karne pe wahi XP/level sync jo Silver Guide ke QuestContext me hai
- Badges same conditions pe unlock hote hain (streak, XP, quests completed, focus time)

## Step 1 — Supabase project banao
1. https://supabase.com pe jao, free account bana lo (agar nahi hai)
2. "New Project" — naam do, database password set karo, region choose karo (Mumbai/Singapore closest)
3. Project ban jaane ke baad, **Project Settings → API** pe jao
4. Yahan se `Project URL` aur `anon public` key copy kar lo

## Step 2 — Database schema run karo
1. Supabase dashboard me left sidebar se **SQL Editor** kholo
2. `supabase-schema.sql` file ka pura content copy-paste karo
3. **Run** dabao — ye 2 tables (`player_stats`, `quests`) aur `leaderboard` view bana dega, saath me security policies bhi

## Step 3 — Auth settings check karo
1. Supabase dashboard me **Authentication → Providers** pe jao
2. "Email" provider already enabled hoga by default — ye kaafi hai
3. Agar tum chahte ho users bina email confirm kiye seedha login ho jaayein (testing ke liye easy), to **Authentication → Settings** me "Confirm email" ka toggle **OFF** kar do. (Production me ON rakhna better hai.)

## Step 4 — Apna URL/Key config.js me daalo
`config.js` file kholo aur ye do lines apni values se replace karo:

```js
const SUPABASE_URL = "https://xxxxx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOi...";
```

## Step 5 — Run karo
Koi build step nahi chahiye — plain HTML/CSS/JS hai. Bas:
- VS Code me "Live Server" extension se `index.html` open karo, YA
- `python -m http.server` chala ke browser me `index.html` kholo

⚠️ Seedha `file://` se double-click karke mat kholna — kuch browsers CORS block kar dete hain. Local server se hi chalao.

## Kya bana hai
| Page | Kaam |
|---|---|
| `index.html` | Real signup/login (Supabase Auth) |
| `goal-setup.html` | Onboarding — semester, branch, target CGPA |
| `dashboard.html` | XP, level, streak, quest summary, exam countdown |
| `quest.html` | Quest Log — quests banao, tasks complete karke XP kamao |
| `focus.html` | Focus Arena — Pomodoro timer, victory/flee XP |
| `profile.html` | Stats + badges, name/goal edit |
| `leaderboard.html` | Sabse zyada XP wale players (real-time DB se) |

## Aage kya add kar sakte ho (Silver Guide me hai, yahan nahi hai abhi)
- AI Chat/Game Master (Silver Guide me bhi abhi sirf UI shell hai)
- Clan/social features
- Syllabus-based auto quest generation

Inko bhi banana ho to bata dena, alag se add kar denge.
