import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = 'C:\\Users\\User\\Downloads\\סרטונים ארוכים';
const targetVideosDir = path.resolve(__dirname, '../public/videos');
const targetThumbsDir = path.resolve(__dirname, '../public/thumbnails');

fs.mkdirSync(targetVideosDir, { recursive: true });
fs.mkdirSync(targetThumbsDir, { recursive: true });

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.mp4') || f.endsWith('.mov'));

console.log(`Found ${files.length} videos in source directory.`);

const videoDefinitions = [
  {
    originalName: 'סרטון סופי (1).mp4',
    slug: 'cbc-venue',
    title: 'CBC — Grand Venue & Luxury Red Carpet',
    client: 'CBC Israel',
    category: 'Commercial',
    workType: 'client_work',
    role: 'בימוי והפקת סרטי AI מלאה',
    shortDesc: 'הפקה קולנועית יוקרתית עבור CBC — שילוב של היכל אירועים גרנדיוזי, שטיח אדום ותאורת ערב.'
  },
  {
    originalName: 'סרטון עוצמה - סופי.mp4',
    slug: 'cbc-power-train',
    title: 'CBC — רכבת העוצמה במדבר',
    client: 'CBC',
    category: 'Commercial',
    workType: 'client_work',
    role: 'קריאייטיב ובימוי תנועה',
    shortDesc: 'רכבת מהירה החוצה נופי מדבר מרהיבים — שליטה מתקדמת בתנועת מצלמה ואפקטים.'
  },
  {
    originalName: 'וורסיה 3 של סייבר - מתודיקה (7).mp4',
    slug: 'cyber-methodica',
    title: 'אגף הסייבר של משרד המשפטים — מתודיקה',
    client: 'משרד המשפטים',
    category: 'Storytelling',
    workType: 'client_work',
    role: 'בימוי קולנועי והדמיות סייבר',
    shortDesc: 'סרט תדמית וסיכול סייבר מותח עבור אגף בכיר חירום וסייבר במשרד המשפטים.'
  },
  {
    originalName: 'סרטון טרה (8).mp4',
    slug: 'terra-agriculture',
    title: 'טרה — חקלאות ועוצמה ישראלית',
    client: 'טרה',
    category: 'Commercial',
    workType: 'client_work',
    role: 'בימוי והפקת סרט AI',
    shortDesc: 'צילומי אוויר והדמיות שדות וחקלאות מתקדמת ברחבי הארץ.'
  },
  {
    originalName: 'נתיב סופי.mp4',
    slug: 'nativ-system-presentation',
    title: 'מערכת נתיב — פרזנטציה והקמה',
    client: 'רכבת ישראל / נתיב',
    category: 'Education',
    workType: 'client_work',
    role: 'בימוי, פרזנטורית דיגיטלית וסאונד',
    shortDesc: 'סרטון תדמית והדרכה להטמעת מערכת נתיב ברכבת ישראל.'
  },
  {
    originalName: 'סרטון נתיב. (2).mp4',
    slug: 'nativ-railway',
    title: 'רכבת ישראל — מערכת נתיב (דיווח וקידמת)',
    client: 'רכבת ישראל',
    category: 'Education',
    workType: 'client_work',
    role: 'בימוי ועיצוב תנועה',
    shortDesc: 'סרטון הסבר ייעודי למערכת נתיב — הקמת, דיווח, קידמת!'
  },
  {
    originalName: 'עותק של נתיב (1).mp4',
    slug: 'nativ-desk',
    title: 'נתיב — מבט מלמעלה וחדר בקרה',
    client: 'נתיב',
    category: 'Product',
    workType: 'client_work',
    role: 'בימוי ויזואלי',
    shortDesc: 'הדמיות שולחן עבודה וניהול תהליכים מודרני.'
  },
  {
    originalName: 'כיתות ח - שומר על עצמי בקש״ר.mp4',
    slug: 'shomer-al-atzmi-kesher',
    title: 'כיתות ח׳ — שומר על עצמי בקש״ר',
    client: 'חינוך ומודעות דיגיטלית',
    category: 'Education',
    workType: 'client_work',
    role: 'בימוי והפקה',
    shortDesc: 'סרטון הדרכה והעלאת מודעות לבטיחות ברשתות החברתיות לנוער.'
  },
  {
    originalName: 'עותק של וורסיה5 - פודקאסט (2).mp4',
    slug: 'podcast-studio-v5',
    title: 'פודקאסט וידאו — דיון באולפן',
    client: 'AmitAI Studio',
    category: 'Commercial',
    workType: 'client_work',
    role: 'בימוי ויזואלי וסאונד',
    shortDesc: 'הפקה ועריכה ויזואלית לאולפן פודקאסט מבוסס AI.'
  },
  {
    originalName: 'עיצוב ללא שם (11).mp4',
    slug: 'coastal-sunset-drone',
    title: 'שקיעה בחוף הים — צילום אוויר קולנועי',
    client: 'AmitAI Studio',
    category: 'Experimental',
    workType: 'concept_work',
    role: 'Worldbuilding & Lighting',
    shortDesc: 'הדמיית שקיעה חופית, ארכיטקטורה עתידנית ורחפן קולנועי.'
  },
  {
    originalName: 'WhatsApp Video 2026-03-17 at 20.45.34.mp4',
    slug: 'dont-stay-alone',
    title: 'לא להישאר לבד — מודעות חברתית',
    client: 'קהילה ומודעות',
    category: 'Storytelling',
    workType: 'client_work',
    role: 'בימוי רגשי וסטוריטלינג',
    shortDesc: 'סרטון מרגש על תמיכה הדדית, חברות ומניעת בדידות בקרב בני נוער.'
  },
  {
    originalName: 'WhatsApp Video 2026-05-18 at 11.17.41 (1).mp4',
    slug: 'la-tabqou-wahdakum-1',
    title: 'لا تبقوا وحدكم — لا תישאר לבד (חלק 1)',
    client: 'Social Impact',
    category: 'Storytelling',
    workType: 'client_work',
    role: 'בימוי והפקת סרט AI',
    shortDesc: 'סרטון דרמטי קצר על התמודדות רגשית ותמיכה חברתית.'
  },
  {
    originalName: 'WhatsApp Video 2026-05-18 at 11.17.41 (2).mp4',
    slug: 'la-tabqou-wahdakum-2',
    title: 'لا تبقوا وحدكم — חלק 2',
    client: 'Social Impact',
    category: 'Storytelling',
    workType: 'client_work',
    role: 'בימוי ועריכה',
    shortDesc: 'המשך סדרת המודעות החברתית בשפה הערבית והעברית.'
  },
  {
    originalName: '3 (8).mp4',
    slug: 'campus-student-phone',
    title: 'חיי קמפוס — דיאלוג דיגיטלי',
    client: 'AmitAI Studio',
    category: 'Social',
    workType: 'concept_work',
    role: 'בימוי דמויות',
    shortDesc: 'סצנה קולנועית בקמפוס אוניברסיטאי עם שילוב שחקנים ואימון עקביות.'
  },
  {
    originalName: '1 (3).mp4',
    slug: 'campus-bench-group',
    title: 'מפגש סטודנטים בקמפוס',
    client: 'AmitAI Studio',
    category: 'Social',
    workType: 'concept_work',
    role: 'בימוי קבוצתי',
    shortDesc: 'סצנת שטח פתוחה עם קבוצת סטודנטים בשעות בין הערביים.'
  },
  {
    originalName: 'WhatsApp Video 2026-06-10 at 17.00.50.mp4',
    slug: 'school-backpack-boy',
    title: 'בדרך לבית הספר — צילומי שטח',
    client: 'AmitAI Studio',
    category: 'Education',
    workType: 'client_work',
    role: 'בימוי ועריכה',
    shortDesc: 'שוטים קולנועיים במרחב בית ספרי עם שחקנים דיגיטליים.'
  },
  {
    originalName: 'WhatsApp Video 2026-01-30 at 07.05.02.mp4',
    slug: 'hallway-school-morning',
    title: 'בוקר במסדרונות בית הספר',
    client: 'AmitAI Studio',
    category: 'Education',
    workType: 'client_work',
    role: 'בימוי תנועה',
    shortDesc: 'תנועת מצלמה רציפה לאורך מסדרון תוסס בפתיחת יום הלימודים.'
  },
  {
    originalName: 'WhatsApp Video 2026-02-01 at 21.16.28.mp4',
    slug: 'fiber-optic-light-trail',
    title: 'סיבים אופטיים וטלמטריה דיגיטלית',
    client: 'טכנולוגיה וסייבר',
    category: 'Experimental',
    workType: 'concept_work',
    role: 'VFX & Motion Design',
    shortDesc: 'תנועת קרני אור דיגיטליות על גבי ריצוף עירוני ואפקטים גרפיים.'
  },
  {
    originalName: 'WhatsApp Video 2026-02-26 at 18.44.08.mp4',
    slug: 'outdoor-dialogue-friends',
    title: 'שיחה פתוחה בטבע',
    client: 'AmitAI Studio',
    category: 'Storytelling',
    workType: 'client_work',
    role: 'בימוי וסאונד',
    shortDesc: 'דיאלוג טבעי בין שתי נערות בשטח פתוח עם תאורת שקיעה חמה.'
  }
];

const projectsData = [];

for (let i = 0; i < videoDefinitions.length; i++) {
  const def = videoDefinitions[i];
  const sourcePath = path.join(sourceDir, def.originalName);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`File not found: ${sourcePath}`);
    continue;
  }

  const targetFileName = `${def.slug}.mp4`;
  const targetVideoPath = path.join(targetVideosDir, targetFileName);
  const targetThumbName = `${def.slug}.jpg`;
  const targetThumbPath = path.join(targetThumbsDir, targetThumbName);

  const stats = fs.statSync(sourcePath);
  const sizeMB = stats.size / (1024 * 1024);
  console.log(`[${i + 1}/${videoDefinitions.length}] Processing ${def.originalName} (${sizeMB.toFixed(1)} MB)...`);

  // Compress if > 80MB so it stays within Git/Vercel limits
  if (sizeMB > 80) {
    console.log(`  Compressing ${def.originalName} with ffmpeg...`);
    try {
      execSync(`ffmpeg -y -i "${sourcePath}" -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 128k "${targetVideoPath}"`, { stdio: 'inherit' });
    } catch (e) {
      console.warn(`  FFmpeg compress failed, copying directly...`);
      fs.copyFileSync(sourcePath, targetVideoPath);
    }
  } else {
    fs.copyFileSync(sourcePath, targetVideoPath);
  }

  // Extract High-Res Thumbnail Image
  console.log(`  Generating thumbnail: ${targetThumbName}`);
  try {
    execSync(`ffmpeg -y -ss 00:00:02 -i "${targetVideoPath}" -vframes 1 -q:v 2 "${targetThumbPath}"`, { stdio: 'ignore' });
  } catch (e) {
    try {
      execSync(`ffmpeg -y -ss 00:00:00.5 -i "${targetVideoPath}" -vframes 1 -q:v 2 "${targetThumbPath}"`, { stdio: 'ignore' });
    } catch (err) {
      console.warn(`  Thumbnail generation failed for ${def.slug}`);
    }
  }

  projectsData.push({
    id: `proj-${def.slug}`,
    slug: def.slug,
    title: def.title,
    subtitle: def.client,
    client: def.client,
    year: '2026',
    category: def.category,
    workType: def.workType,
    status: 'published',
    featured: true,
    homepageOrder: i + 1,
    projectType: 'סרט AI קולנועי',
    role: def.role,
    video: {
      provider: 'direct',
      masterUrl: `/videos/${targetFileName}`,
      previewUrl: `/videos/${targetFileName}`,
      posterUrl: `/thumbnails/${targetThumbName}`,
      aspectRatio: '16:9',
      duration: '01:00'
    },
    challenge: '',
    idea: '',
    shortDescription: def.shortDesc,
    processSteps: [],
    productionStats: {},
    credits: {
      director: 'אמיתי כהן (AmitAI)',
      aiFilm: 'AmitAI Studio'
    },
    techStack: ['AI Generative Cinema', 'DaVinci Resolve'],
    gallery: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

// Write to showcaseProjects.ts
const code = `import type { Project } from '../types/project';\n\nexport const SHOWCASE_PROJECTS: Project[] = ${JSON.stringify(projectsData, null, 2)};\n`;
fs.writeFileSync(path.resolve(__dirname, '../src/data/showcaseProjects.ts'), code, 'utf-8');

console.log(`SUCCESS! Processed and imported all ${projectsData.length} films.`);
