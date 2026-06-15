# פריסה ל-Coolify — מצבה יהודית

## דרישות
- שרת Coolify פעיל.
- Supabase (self-hosted) על אותו שרת, או נגיש מהקונטיינר.

## משתני סביבה (Environment Variables ב-Coolify)
חובה להגדיר **לפני build** את ה-`NEXT_PUBLIC_*` (הם מוטמעים בזמן build):

| משתנה | תיאור |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | כתובת האתר הסופית, למשל `https://matzva.co` (ללא `/` בסוף) |
| `NEXT_PUBLIC_GTM_ID` | מזהה GTM (אופציונלי, למשל `GTM-XXXXXXX`) |
| `SUPABASE_URL` | כתובת ה-Supabase (server-only) |
| `SUPABASE_SERVICE_ROLE_KEY` | מפתח service role (server-only, סודי!) |

ב-Coolify סמן את שני ה-`NEXT_PUBLIC_*` גם כ-Build Variable.

## פריסה (Dockerfile)
1. צור ב-Coolify Resource מסוג **Dockerfile** ממאגר ה-Git של הפרויקט.
2. Port פנימי: `3000`.
3. הגדר את משתני הסביבה לעיל.
4. Deploy. ה-build מריץ `npm ci && npm run build` ומפיק image standalone קטן.

## בסיס הנתונים
הרץ את המיגרציה פעם אחת מול Supabase:
```
supabase/migrations/0001_init.sql
```
(אפשר דרך ה-SQL Editor של Supabase או `psql`).

## לאחר העלייה (Google Search Console)
1. אמת בעלות על הדומיין (DNS TXT או קובץ).
2. הגש את `https://<domain>/sitemap.xml`.
3. בדוק `https://<domain>/robots.txt` ו-`https://<domain>/llms.txt`.

## הערות
- `output: "standalone"` מוגדר ב-`next.config.ts` — האימג' מכיל רק את מה שצריך לריצה.
- הטופס עובד גם בלי Supabase (נרשם ללוג השרת), אך מומלץ לחבר Supabase לפרודקשן.
