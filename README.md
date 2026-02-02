# Golden Outlook University — Netlify Native Static Site

A Netlify-native JavaScript web application for Medicare training. **No build step required.**

## Structure

```
netlify-site/
├── netlify.toml          # Netlify configuration (no build needed)
├── public/
│   ├── index.html        # Main SPA (Single Page App)
│   ├── styles.css        # Complete styling
│   ├── app.js            # Core navigation & state management
│   └── quizzes.js        # Quiz logic & data
└── README.md             # This file
```

## Features

- ✅ **No Build Step** — Static HTML + vanilla JS (deployed as-is)
- ✅ **Responsive Design** — Works on mobile, tablet, desktop
- ✅ **Interactive Quizzes** — Client-side scoring with points tracking
- ✅ **Leaderboard** — Real-time points display (mock data for demo)
- ✅ **Facilitator Timer** — For Zoom/Teams session management
- ✅ **4 Complete Modules** — Medicare basics, plan types, compliance, sales
- ✅ **Gamification** — Points, badges, leaderboard

## Deployment to Netlify

1. **Option A: Direct Deploy**
   ```bash
   cd netlify-site
   netlify deploy --prod --dir=public
   ```

2. **Option B: GitHub Integration**
   - Push this folder to GitHub
   - Connect your GitHub repo to Netlify
   - Set "Publish directory" to `netlify-site/public`
   - Deploy on push (automatic)

## Local Testing

```bash
cd netlify-site/public
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Adding PDF Materials

Place your `The-Only-Medicare-Book-You-Need.pdf` in `public/materials/` (or create a subdirectory):

```bash
mkdir -p public/materials
cp /path/to/The-Only-Medicare-Book-You-Need.pdf public/materials/
```

Then link it in the lessons or add a "Download Materials" button in `index.html`.

## Extending the Course

### Add a New Lesson

Edit `index.html` and add a new `<section data-page="lesson-5">`. Update the nav if needed.

### Add More Quizzes

Edit `quizzes.js` and add to the `quizzes` object:

```javascript
5: {
  title: "Quiz 5: New Topic",
  questions: [
    {
      text: "Question text?",
      answer: "A",
      options: { A: "Option A", B: "Option B", ... }
    }
  ]
}
```

### Customize Colors

Edit `styles.css`. Change:
```css
header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.btn { background: #667eea; }
```

## Analytics & Tracking

To add Google Analytics or Netlify Analytics:

1. **Netlify Analytics** — Enable in Netlify dashboard (easiest)
2. **Google Analytics** — Add to `<head>` in `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_ID');
   </script>
   ```

## Customization Ideas

- [ ] Replace mock leaderboard with a backend API (Node/Express, Supabase, etc.)
- [ ] Add user authentication (Netlify Identity, Auth0)
- [ ] Store progress in localStorage or a database
- [ ] Generate certificate of completion
- [ ] Embed Zoom/Teams directly using Zoom SDK
- [ ] Add discussion forum (Disqus, Discourse)
- [ ] Create PDF certificates with jsPDF

## Support & Questions

For help with Netlify deployment, see [Netlify Docs](https://docs.netlify.com/).
For JavaScript questions, refer to [MDN Web Docs](https://developer.mozilla.org/).
