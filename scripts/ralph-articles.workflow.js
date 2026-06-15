export const meta = {
  name: 'matzva-articles-ralph',
  description: 'Ralph loop: write then verify/fix Hebrew matzeva articles (>=1000 words incl Q&A, MDX-safe)',
  phases: [{ title: 'Write' }, { title: 'Verify' }],
}

const DIR = 'C:/Users/itama/Documents/seo2/matzva-co/content/articles'

const topics = [
  { slug: 'yahrzeit-candle-guide', title: 'נר נשמה: מתי ואיך מדליקים', description: 'מדריך להדלקת נר נשמה — מתי מדליקים, משך ההדלקה והמנהגים השונים, ברגישות ובכבוד.', date: '2025-06-25', category: 'TOFU', topic: 'lighting a memorial (neshama) candle: when (yahrzeit, holidays, yizkor), duration, customs, variations' },
  { slug: 'jewish-matzeva-history', title: 'תולדות המצבה היהודית לאורך הדורות', description: 'מהאבן שהציב יעקב ועד ימינו — התפתחות מנהג הקמת המצבה במסורת היהודית.', date: '2025-06-11', category: 'TOFU', topic: 'history of the Jewish headstone from biblical origins (Jacob/Rachel) to modern times' },
  { slug: 'chevra-kadisha-role', title: 'חברה קדישא: התפקיד והתהליך', description: 'מהי חברה קדישא, מה תפקידה בתהליך הקבורה והקמת המצבה, וכיצד מתנהלים מולה.', date: '2025-05-28', category: 'TOFU', topic: 'the role of the chevra kadisha and how families work with them through burial and matzeva' },
  { slug: 'tehillim-at-grave', title: 'אילו פרקי תהילים אומרים בקבר', description: 'פרקי התהילים הנהוגים באמירה בקבר ובאזכרה, משמעותם והמנהגים השונים.', date: '2025-05-14', category: 'TOFU', topic: 'which tehillim chapters are customarily recited at the grave and at the azkara' },
  { slug: 'el-male-rachamim', title: 'אל מלא רחמים: משמעות התפילה ונוסחה', description: 'על תפילת אל מלא רחמים — מתי אומרים, משמעותה והנוסח המקובל, ברגישות ובכבוד.', date: '2025-04-30', category: 'TOFU', topic: 'the El Male Rachamim memorial prayer: meaning, when said, customary structure' },
  { slug: 'safe-cleaning-products', title: 'חומרי ניקוי בטוחים למצבה', description: 'אילו חומרים בטוחים לניקוי מצבה לפי סוג האבן, וממה להימנע כדי לא לפגוע באבן ובכיתוב.', date: '2025-04-16', category: 'MOFU', topic: 'safe cleaning products and methods by stone type; what to avoid' },
  { slug: 'matzeva-foundation-yesod', title: 'יסוד ובסיס המצבה: מה חשוב לדעת', description: 'תפקיד יסוד המצבה ובסיסה ביציבות ובעמידות לאורך שנים, ומה משפיע על איכות ההקמה.', date: '2025-04-02', category: 'MOFU', topic: 'the foundation/base of the headstone and its importance for stability and longevity' },
  { slug: 'stone-colors-finishes', title: 'צבעי אבן וגימור: איך בוחרים', description: 'מדריך לבחירת גוון האבן והגימור למצבה — אסתטיקה, התאמה לבית העלמין ועמידות.', date: '2025-03-19', category: 'MOFU', topic: 'choosing stone colors and finishes for a headstone' },
  { slug: 'pesukim-for-matzeva', title: 'פסוקים לכיתוב על מצבה: דוגמאות ומשמעות', description: 'אוסף פסוקים ומשפטי פרידה מקובלים לכיתוב על מצבה ומשמעותם — לבחירה מכובדת.', date: '2025-03-05', category: 'MOFU', topic: 'pesukim and farewell phrases for the inscription and their meaning' },
  { slug: 'matzeva-dimensions', title: 'מידות מצבה מקובלות: מדריך', description: 'מהן המידות המקובלות למצבה, מה קובע אותן וכיצד הן מושפעות מכללי בית העלמין.', date: '2025-02-19', category: 'MOFU', topic: 'common headstone dimensions and what determines them' },
  { slug: 'matzeva-replacement-when', title: 'החלפת מצבה: מתי מותר ומתי נחוץ', description: 'מתי ניתן ונחוץ להחליף מצבה קיימת, השיקולים ההלכתיים והמעשיים, והתהליך מול בית העלמין.', date: '2025-02-05', category: 'MOFU', topic: 'replacing an existing headstone — when permitted/needed, halachic and practical considerations' },
  { slug: 'matzeva-care-routine', title: 'טיפול שוטף במצבה לאורך השנים', description: 'שגרת טיפול פשוטה לשמירה על מצבה מכובדת — ניקוי תקופתי, בדיקה וחידוש קל.', date: '2025-01-22', category: 'MOFU', topic: 'ongoing routine care for a headstone over the years' },
  { slug: 'cemetery-types-israel', title: 'סוגי בתי עלמין בישראל', description: 'סקירת סוגי בתי העלמין בישראל — דתי, אזרחי וצבאי — וההשלכות על סוג המצבה והכללים.', date: '2025-01-08', category: 'TOFU', topic: 'types of cemeteries in Israel (religious/civil/military) and implications for the headstone' },
  { slug: 'ordering-matzeva-remotely', title: 'הזמנת מצבה מרחוק: איך זה עובד', description: 'כיצד מזמינים ומתאמים הקמת מצבה גם כשלא ניתן להגיע פיזית — תהליך, אישורים וליווי.', date: '2024-12-18', category: 'BOFU', topic: 'ordering and coordinating a headstone remotely (for families abroad or far away)' },
  { slug: 'cohen-levi-symbols', title: 'סמלי כהן ולוי על המצבה', description: 'משמעות סמלי ידי הכהן והכד של הלוי על המצבה, ומתי נהוג להוסיף אותם.', date: '2024-12-04', category: 'TOFU', topic: 'Cohen (priestly hands) and Levi (jug) symbols on the headstone' },
  { slug: 'grave-plot-purchase', title: 'רכישת חלקת קבר: מה חשוב לבדוק', description: 'מדריך לרכישת חלקת קבר — סוגי חלקות, עלויות ומה לבדוק מול בית העלמין מראש.', date: '2024-11-20', category: 'MOFU', topic: 'purchasing a burial plot — types, costs, what to verify in advance' },
  { slug: 'hebrew-date-on-matzeva', title: 'תאריך עברי על המצבה: דיוק והמרה', description: 'חשיבות התאריך העברי על המצבה, כיצד ממירים מתאריך לועזי, וטעויות נפוצות שכדאי למנוע.', date: '2024-11-06', category: 'MOFU', topic: 'the Hebrew date on the headstone, conversion from Gregorian, common mistakes' },
  { slug: 'adding-name-to-matzeva', title: 'הוספת שם וכיתוב למצבה קיימת', description: 'כיצד מוסיפים שם או כיתוב למצבה קיימת (למשל במצבה זוגית), השיקולים והתהליך.', date: '2024-10-23', category: 'MOFU', topic: 'adding a name/inscription to an existing headstone (e.g., a double matzeva)' },
  { slug: 'natural-stone-types', title: 'סוגי אבן טבעית למצבות', description: 'סקירת סוגי האבן הטבעית הנפוצים למצבות, מאפייניהם, יתרונותיהם והתאמתם.', date: '2024-10-09', category: 'MOFU', topic: 'types of natural stone used for headstones and their characteristics' },
  { slug: 'comforting-mourners', title: 'ניחום אבלים: מה אומרים ואיך', description: 'מדריך עדין לניחום אבלים — מה נהוג לומר, ממה להימנע וכיצד להיות לעזרה אמיתית.', date: '2024-09-25', category: 'TOFU', topic: 'comforting mourners — what to say, what to avoid, being genuinely supportive' },
  { slug: 'matzeva-complete-faq', title: 'שאלות נפוצות על מצבות: המדריך המלא', description: 'ריכוז התשובות לשאלות הנפוצות ביותר על הקמת מצבה — זמנים, מחיר, הלכה, עיצוב ותחזוקה.', date: '2024-09-11', category: 'MOFU', topic: 'a comprehensive FAQ-style guide answering the most common headstone questions' },
  { slug: 'matzeva-design-tradition-modern', title: 'עיצוב מצבות: בין מסורת לחידוש', description: 'כיצד משלבים עיצוב מכובד ומודרני במצבה תוך שמירה על המסורת וההלכה.', date: '2024-08-28', category: 'MOFU', topic: 'balancing traditional and modern design in a headstone while respecting halacha' },
  { slug: 'unveiling-invitation', title: 'הזמנה לגילוי מצבה: נוסח ומה לכלול', description: 'כיצד מנסחים הזמנה לטקס גילוי מצבה, מה לכלול בה ומנהגים נלווים — ברגישות.', date: '2024-08-14', category: 'TOFU', topic: 'wording an invitation to the unveiling ceremony and what to include' },
  { slug: 'matzeva-after-shloshim', title: 'הקמת מצבה אחרי השלושים: מה הלאה', description: 'מה קורה לאחר השלושים בדרך להקמת המצבה והאזכרה — לוח זמנים ומנהגים, ברגישות.', date: '2024-07-31', category: 'MOFU', topic: 'after shloshim — the path toward erecting the headstone and the unveiling' },
]

const RULES =
  'כללים: עברית טבעית, חמה ומכבדת (אתר הקמת מצבות, מצבות בירושלים והסביבה). ' +
  'Markdown בלבד — אסור HTML/JSX, אסור תווי < >, אסור סוגריים מסולסלים, אסור import/export, אסור טבלאות. ' +
  'בלי כותרת H1 (להתחיל בפסקת מבוא). להשתמש ב-## ו-### וברשימות. ' +
  'לסיים במקטע "## שאלות נפוצות" עם 4-5 שאלות ותשובות (### לכל שאלה). ' +
  'אמת מוחלט: בלי מחירים מומצאים, בלי סטטיסטיקות/המלצות/הסמכות מזויפות, בלי שמות אמיתיים. ' +
  'מנהגים הלכתיים להציג בזהירות ולהמליץ להיוועץ ברב. ' +
  'אורך גוף המאמר כולל מקטע השאלות והתשובות חייב להיות לפחות 1000 מילים בעברית.'

const WRITE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: { slug: { type: 'string' }, path: { type: 'string' }, words: { type: 'integer' } },
  required: ['slug', 'path', 'words'],
}
const VERIFY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: { slug: { type: 'string' }, words: { type: 'integer' }, ok: { type: 'boolean' }, fixed: { type: 'boolean' } },
  required: ['slug', 'words', 'ok', 'fixed'],
}

log(`Ralph loop over ${topics.length} new articles (write -> verify/fix)`)

const result = await pipeline(
  topics,
  (t) =>
    agent(
      `כתוב מאמר עברי ארוך אחד בפורמט MDX ושמור אותו בקובץ: ${DIR}/${t.slug}.mdx\n` +
        `ה-frontmatter בראש הקובץ חייב להיות בדיוק כך (בין שורות ---):\n` +
        `---\ntitle: "${t.title}"\ndescription: "${t.description}"\ndate: "${t.date}"\ncategory: "${t.category}"\n---\n\n` +
        `נושא המאמר: ${t.topic}\n${RULES}\n` +
        `ספור את מילות הגוף וודא לפחות 1000 לפני השמירה. כתוב אך ורק את הקובץ הזה. החזר slug, path, words.`,
      { label: `write:${t.slug}`, phase: 'Write', agentType: 'general-purpose', schema: WRITE_SCHEMA }
    ),
  (w, t) =>
    agent(
      `קרא את הקובץ ${DIR}/${t.slug}.mdx ובדוק את גוף המאמר (כל מה שאחרי ה-frontmatter, כולל מקטע "## שאלות נפוצות").\n` +
        `דרישה: לפחות 1000 מילים בעברית ו-MDX תקין (אסור תווי < >, אסור סוגריים מסולסלים, אסור טבלאות, אסור import/export, אסור H1).\n` +
        `אם קצר מ-1000 או לא תקין — הרחב/תקן ושמור מחדש את אותו קובץ, תוך שמירה על ה-frontmatter בדיוק. ${RULES}\n` +
        `החזר slug, words (ספירה סופית), ok (true אם >=1000 ותקין), fixed (true אם שינית).`,
      { label: `verify:${t.slug}`, phase: 'Verify', agentType: 'general-purpose', schema: VERIFY_SCHEMA }
    )
)

const done = result.filter(Boolean)
const short = done.filter((r) => !r.ok)
log(`Done: ${done.length}/${topics.length}; still short/invalid: ${short.length}`)
return { processed: done.length, short, all: done }
