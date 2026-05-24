# Asian American Cinematographers Directory

A community-maintained directory of Asian American DPs, from James Wong Howe to Autumn Durald Arkapaw.

---

## How to deploy this site (one-time setup)

### Step 1: Get the code onto your computer
1. Download these files to a folder on your laptop, e.g. `~/Sites/dp-directory`
2. Open Terminal, `cd` into that folder
3. Run `npm install` — this downloads the libraries the site needs

### Step 2: Test it locally (optional but recommended)
1. Run `npm run dev`
2. Open `http://localhost:3000` in your browser
3. You should see the site. Click "Nominate" — the form opens but won't actually submit until deployed to Netlify.
4. Stop the server with Ctrl+C

### Step 3: Put it on GitHub
1. Go to github.com, create a new empty repository called `dp-directory`
2. In your terminal, in the project folder, run:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/dp-directory.git
   git push -u origin main
   ```

### Step 4: Deploy to Netlify
1. Log into netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub, pick the `dp-directory` repo
4. Netlify reads `netlify.toml` and figures out the build settings — just click Deploy
5. ~2 minutes later, the site is live at a random `*.netlify.app` URL

### Step 5: Connect to your domain
1. In Netlify: Site settings → Domain management → Add custom domain
2. Enter `directory.acamcrew.com` (or whatever subdomain you want)
3. Netlify shows you a CNAME record to add
4. Go to Cloudflare (where acamcrew.com is managed), add the CNAME record
5. Wait 5–10 minutes for DNS to propagate

Done. The site is live.

---

## How submissions work

When someone hits "Nominate" on the live site and submits the form:

1. **Netlify catches the submission automatically** — no setup beyond what's already done
2. **You get an email** (configure this in Netlify: Site settings → Forms → Form notifications → Add notification → Email)
3. **You can also view submissions** at: Netlify dashboard → your site → Forms → "dp-nomination"

Each submission shows:
- The cinematographer's name they submitted
- The submitter's email and name
- Their relationship to the subject
- Reel/IMDb link
- Notes

### Spam protection
The form has a honeypot field (invisible to humans, attracts bots). Netlify also auto-detects spam. You probably won't see any spam, but if it becomes a problem, enable reCAPTCHA in Netlify's form settings.

---

## How to add a new name to the directory

This is the workflow when you decide to publish a submission, or when you research and add someone yourself.

### What you do:
1. Open the file `data/dps.js` in any text editor (VS Code, Sublime, even TextEdit)
2. Scroll to the bottom — there's a clearly marked spot that says "PASTE NEW ENTRIES BELOW THIS LINE"
3. Copy the template that's commented out, paste it as a new entry
4. Fill in the fields:

```javascript
{
  id: 7,                              // next unused number
  name: 'Caleb Deschanel',
  lifespan: 'b. 1944',
  born: 1944,
  died: null,                         // null for living people
  heritage: 'Mixed (partial Asian)',  // research and verify before listing
  origin: 'Philadelphia, PA',
  status: 'active',                   // or 'historical'
  credits: 60,
  society: 'ASC',
  awards: ['6× Oscar nominee', 'ASC Lifetime Achievement'],
  notable: ['The Right Stuff', 'The Patriot', 'The Passion of the Christ'],
  contribution: 'Five-decade career...',
  era: 'Contemporary',
  source: 'Wikipedia, ASC',
},
```

5. Save the file
6. In Terminal, in your project folder:
   ```
   git add .
   git commit -m "Add [name] to directory"
   git push
   ```
7. Netlify sees the push and rebuilds the site automatically (~90 seconds)
8. The new name appears live on the site

### Faster way: edit directly on GitHub
You can also edit `data/dps.js` right in the GitHub web interface (click the pencil icon on the file). Save the file there, and Netlify rebuilds automatically. No Terminal required after the initial setup.

---

## The publish workflow, end to end

1. Someone submits a nomination via the site
2. You get an email
3. You research the person (verify they're a working DP, check IMDb, find heritage info from interviews)
4. **You email the subject**: "Hi, you've been nominated for the directory. Here's the entry I drafted. May I publish it?"
5. They respond yes (or send corrections)
6. You add the entry to `data/dps.js` and push
7. Site updates in 90 seconds
8. You email the subject to let them know they're live

**Don't skip step 4.** Publishing without consent damages trust and could create real problems for the project.

---

## Files in this project

- `data/dps.js` — **the only file you'll edit regularly.** All the cinematographer entries.
- `app/page.tsx` — the main page. Edit only if you want to change the design.
- `app/layout.tsx` — site metadata (title, description for Google).
- `package.json` — list of libraries the site uses.
- `next.config.js` — build settings.
- `netlify.toml` — tells Netlify how to build.
- `README.md` — this file.

---

## If something breaks

- Build fails on Netlify? Check the deploy log in Netlify dashboard. Most common issue is a syntax error in `data/dps.js` — usually a missing comma or unclosed bracket.
- Form not working? Check Netlify dashboard → Forms. If you see "dp-nomination" listed, it's working. Submissions arrive within seconds.
- Want to roll back a change? Netlify keeps every previous deploy. Site settings → Deploys → click any past deploy → "Publish deploy".
