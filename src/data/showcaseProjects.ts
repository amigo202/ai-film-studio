import type { Project } from '../types/project';

export const SHOWCASE_PROJECTS: Project[] = [
  {
    id: 'proj-cyber-justice',
    slug: 'cyber-justice',
    title: 'אגף הסייבר — משרד המשפטים | המפרץ הפרסי',
    subtitle: 'סרט סיכול סייבר ומבצעים מיוחדים',
    client: 'משרד המשפטים — אגף הסייבר',
    year: '2026',
    category: 'Commercial',
    workType: 'client_work',
    status: 'published',
    featured: true,
    homepageOrder: 1,
    projectType: 'AI Cinematic Production',
    role: 'בימוי, קריאייטיב והפקת סרטי AI מלאה',
    
    video: {
      provider: 'vimeo',
      videoId: '1222907638',
      masterUrl: 'https://player.vimeo.com/video/1222907638',
      posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '16:9',
      duration: '03:13'
    },
    
    challenge: 'המחשת פעילות אגף בכיר חירום, ביטחון, מידע וסייבר של משרד המשפטים בזירה המבצעית והגנת המרחב הדיגיטלי הלאומי.',
    idea: 'נרטיב קולנועי מותח המשלב טלמטריה מתקדמת, לוקיישנים מדבריים וימיים, וייצוג עוצמתי של פעילות הגנת הסייבר ללא צורך בצילומים מסווגים.',
    conceptArtUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=85',
    shortDescription: 'סרט תדמית ומבצעים עוצמתי עבור אגף הסייבר במשרד המשפטים — הפקה קולנועית מלאה ב-AI.',
    fullDescription: 'הפקה קולנועית מותאמת עבור משרד המשפטים ואגף הסייבר והחירום. שילוב של סטוריטלינג מותח, ויזואליה עשירה, הדמיות טכנולוגיות ועיצוב סאונד עוצמתי.',
    
    processSteps: [],
    productionStats: {
      shotsCount: 22,
      locationsCount: 5,
      charactersCount: 3,
      filmingDays: 0,
      finalDuration: '03:13'
    },
    credits: {
      creativeDirection: 'אמיתי כהן (AmitAI)',
      director: 'אמיתי כהן',
      aiFilm: 'AmitAI Studio',
      editing: 'AmitAI Post',
      soundDesign: 'Cinematic Soundscapes',
      client: 'משרד המשפטים'
    },
    techStack: ['Midjourney v6.1', 'Runway Gen-3', 'Kling AI', 'DaVinci Resolve Studio'],
    gallery: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'proj-shomer-al-atzmi',
    slug: 'shomer-al-atzmi',
    title: 'שומר על עצמי בקש״ר — כיתות ח׳',
    subtitle: 'סרטון הדרכה ומודעות ברשתות החברתיות',
    client: 'חינוך ומודעות דיגיטלית',
    year: '2026',
    category: 'Education',
    workType: 'client_work',
    status: 'published',
    featured: true,
    homepageOrder: 2,
    projectType: 'סרטון מודעות והדרכה ב-AI',
    role: 'בימוי, קריאייטיב והפקה מלאה',
    
    video: {
      provider: 'direct',
      masterUrl: '/videos/shomer-al-atzmi.mp4',
      previewUrl: '/videos/shomer-al-atzmi.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '16:9',
      duration: '01:15'
    },
    
    challenge: 'העברת מסר מורכב של זהירות ברשתות החברתיות לנוער בצורה מרתקת וויזואלית.',
    idea: 'שימוש בדימויים דינמיים, עריכה קצבית ועיצוב דמויות מותאם לגילאי חטיבת הביניים.',
    shortDescription: 'סרטון מודעות בנושא בטיחות ברשת — הפקה ייעודית מלאה.',
    processSteps: [],
    productionStats: {
      shotsCount: 14,
      locationsCount: 3,
      charactersCount: 2,
      filmingDays: 0,
      finalDuration: '01:15'
    },
    credits: {
      creativeDirection: 'אמיתי כהן (AmitAI)',
      director: 'אמיתי כהן',
      aiFilm: 'AmitAI Studio'
    },
    techStack: ['AI Generative Video', 'DaVinci Resolve Studio'],
    gallery: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'proj-nativ-final',
    slug: 'nativ-final',
    title: 'סרטון נתיב — הפקה קולנועית',
    subtitle: 'פרויקט נתיב',
    client: 'נתיב',
    year: '2026',
    category: 'Storytelling',
    workType: 'client_work',
    status: 'published',
    featured: true,
    homepageOrder: 3,
    projectType: 'הפקה עלילתית ב-AI',
    role: 'בימוי והפקה',
    
    video: {
      provider: 'direct',
      masterUrl: '/videos/nativ-final.mp4',
      previewUrl: '/videos/nativ-final.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '16:9',
      duration: '00:50'
    },
    
    challenge: 'הצגת החזון והמהות של פרויקט נתיב בצורה קולנועית ומעוררת השראה.',
    idea: 'שילוב פריימים פנורמיים, תנועת מצלמה חלקה ופסקול סוחף.',
    shortDescription: 'הפקה קולנועית לפרויקט נתיב בטכנולוגיית AI מתקדמת.',
    processSteps: [],
    productionStats: {},
    credits: {
      director: 'אמיתי כהן (AmitAI)'
    },
    techStack: ['AI Film', 'DaVinci Resolve'],
    gallery: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'proj-podcast-v5',
    slug: 'podcast-v5',
    title: 'פודקאסט — פרק קונספט ויזואלי',
    subtitle: 'פודקאסט וידאו מבוסס AI',
    client: 'AmitAI Studio',
    year: '2026',
    category: 'Commercial',
    workType: 'client_work',
    status: 'published',
    featured: true,
    homepageOrder: 4,
    projectType: 'וידאו פודקאסט',
    role: 'עריכה ובימוי ויזואלי',
    
    video: {
      provider: 'direct',
      masterUrl: '/videos/podcast-v5.mp4',
      previewUrl: '/videos/podcast-v5.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '16:9',
      duration: '02:00'
    },
    
    challenge: 'יצירת עטיפה ויזואלית מלאה לפודקאסט.',
    idea: 'הדמיות ויזואליות עשירות המלוות את הדיון.',
    shortDescription: 'סרטון פודקאסט ויזואלי בהפקה מלאה.',
    processSteps: [],
    productionStats: {},
    credits: {
      director: 'אמיתי כהן (AmitAI)'
    },
    techStack: ['AI Video', 'Sound Mix'],
    gallery: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'proj-nativ-v2',
    slug: 'nativ-v2',
    title: 'נתיב — גרסה 2',
    subtitle: 'עריכה אלטרנטיבית',
    client: 'נתיב',
    year: '2026',
    category: 'Storytelling',
    workType: 'client_work',
    status: 'published',
    featured: false,
    homepageOrder: 5,
    projectType: 'סרטון קונספט',
    role: 'בימוי',
    
    video: {
      provider: 'direct',
      masterUrl: '/videos/nativ-v2.mp4',
      previewUrl: '/videos/nativ-v2.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '16:9',
      duration: '01:00'
    },
    
    challenge: 'גרסת קצב מהירה.',
    idea: 'דגש על מעברים מהירים ותנועה.',
    shortDescription: 'גרסה אלטרנטיבית לפרויקט נתיב.',
    processSteps: [],
    productionStats: {},
    credits: {
      director: 'אמיתי כהן'
    },
    techStack: ['AI Video'],
    gallery: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'proj-film-1',
    slug: 'film-1',
    title: 'הפקה קולנועית 01',
    subtitle: 'סרט קונספט מקורי',
    client: 'AmitAI Studio',
    year: '2026',
    category: 'Experimental',
    workType: 'concept_work',
    status: 'published',
    featured: false,
    homepageOrder: 6,
    projectType: 'סרט קונספט',
    role: 'בימוי וקריאייטיב',
    
    video: {
      provider: 'direct',
      masterUrl: '/videos/film-1.mp4',
      previewUrl: '/videos/film-1.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '16:9',
      duration: '01:00'
    },
    
    challenge: 'בדיקת גבולות תנועה וקומפוזיציה.',
    idea: 'שילוב סביבות עתידניות.',
    shortDescription: 'סרטון קונספט ניסיוני.',
    processSteps: [],
    productionStats: {},
    credits: {
      director: 'אמיתי כהן'
    },
    techStack: ['Midjourney', 'Runway'],
    gallery: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
