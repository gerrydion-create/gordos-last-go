# 🍺 Gordo's Last Go — Beer Olympics

Bachelor party Beer Olympics tournament app with live-synced brackets across all phones.

---

## Deploy in 4 Steps

### Step 1 — Supabase (free database)

1. Go to [supabase.com](https://supabase.com) and sign in (GitHub login)
2. Click **New Project** → name it `gordos-last-go` → set a password → create
3. Wait for it to spin up (~1 min)
4. Go to **SQL Editor** (left sidebar) → click **New Query**
5. Paste the entire contents of `supabase-setup.sql` → click **Run**
6. Go to **Settings → API** and copy:
   - **Project URL** (looks like `https://abc123.supabase.co`)
   - **anon public** key (the long one under Project API keys)

### Step 2 — GitHub

1. Go to [github.com/new](https://github.com/new)
2. Name the repo `gordos-last-go` → **Private** → **Create repository**
3. Upload all the project files to the repo (drag and drop works), or push via terminal:
   ```bash
   cd gordos-last-go
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gordos-last-go.git
   git push -u origin main
   ```

### Step 3 — Vercel (free hosting)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project** → import `gordos-last-go`
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
4. Click **Deploy** → wait ~60 seconds
5. You'll get a URL like `gordos-last-go.vercel.app`

### Step 4 — Share with the boys

Send the Vercel URL to the group chat. Everyone opens it and hits **Add to Home Screen**:
- **iPhone**: Share button → Add to Home Screen
- **Android**: Three dots → Add to Home Screen

---

## How It Works

- 12 players pair into 6 teams by tapping names
- 5 events: Beer Pong, Flip Cup, Cornhole, Kings Cup, Rage Cage
- Each event is a 6-team bracket (seeds 1-2 get byes, balanced across events)
- Every match is best of 3 — tap a team to record a game win
- Points: 1st=6, 2nd=5, 3rd=4, 4th=3, T-5th=1.5
- **All phones sync in real-time** via Supabase Realtime

---

## Tech Stack

- React + Vite
- Supabase (Postgres + Realtime)
- Vercel (hosting)
- PWA (home screen app)
