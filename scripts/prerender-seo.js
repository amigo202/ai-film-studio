import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

// Read built index.html template
const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

const SHOWCASE_PAGES = [
  {
    path: 'work/cbc-ramadan',
    title: 'CBC — Ramadan Campaign | AI Commercial Film',
    description: 'סרט פרסומת מלא ב-AI עבור CBC — מסע קולנועי ברכבת לילה מדברית, 18 שוטים, 0 ימי צילום.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    path: 'work/yiftach',
    title: 'יפתח — שבועת הדמים | סרט עלילתי היסטורי ב-AI',
    description: 'דרמה היסטורית תקופתית באווירה תנ"כית מחוספסת — שמירה על עקביות דמויות (LoRA) ותאורת קיארוסקורו.',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=1200&q=80'
  },
  {
    path: 'work/aethelgard',
    title: 'Aethelgard: The Dying Star | Sci-Fi Concept Spec Film',
    description: 'פרויקט קונספט ומחקר מקורי של הסטודיו: מגה-מבנים קוסמיים בחלל עמוק וסביבות חייזריות ב-AI.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  },
  {
    path: 'work/maison-nocturne',
    title: 'Maison de L\'Ombre — Nocturne | Luxury Fragrance AI Spec',
    description: 'סרטון קונספט יוקרתי לעולם הבישום — הדמיות מקרו של זכוכית שחורה, עשן ונוזלים ב-AI.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80'
  },
  {
    path: 'work',
    title: 'All Works & Case Studies | AI Film Studio',
    description: 'ארכיון כל הסרטים, הפרסומות ופרויקטי הקונספט של הסטודיו.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    path: 'about',
    title: 'About & Manifesto | AI Film Studio',
    description: 'AI changed the tools. It didn\'t change the need for a good idea. סטודיו לקריאייטיב ובימוי סרטי AI.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
  },
  {
    path: 'contact',
    title: 'Start a Project | AI Film Studio',
    description: 'יש לכם רעיון לסרט? בואו נבנה אותו. צרו קשר עם הסטודיו.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80'
  }
];

SHOWCASE_PAGES.forEach((page) => {
  let html = template;
  
  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);
  
  // Replace Meta Description
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${page.description}" />`);
  
  // Replace OpenGraph Title, Description, Image
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${page.title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${page.description}" />`);
  html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${page.image}" />`);

  const targetDir = path.join(distDir, page.path);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
  console.log(`Generated static SEO snapshot: dist/${page.path}/index.html`);
});

console.log('Static pre-rendering complete!');
