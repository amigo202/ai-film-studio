import type { Project } from '../types/project';

export const SHOWCASE_PROJECTS: Project[] = [
  {
    id: 'proj-cbc-ramadan',
    slug: 'cbc-ramadan',
    title: 'CBC — Ramadan Campaign',
    subtitle: 'A Cinematic Journey Across Desert & Heritage',
    client: 'CBC',
    year: '2026',
    category: 'Commercial',
    workType: 'client_work',
    status: 'published',
    featured: true,
    homepageOrder: 1,
    projectType: 'AI Commercial Film',
    role: 'Concept / Creative Direction / AI Film / Editing / Sound',
    
    video: {
      provider: 'vimeo',
      videoId: '76979871',
      masterUrl: 'https://player.vimeo.com/video/76979871?autoplay=1&color=d4af37&title=0&byline=0&portrait=0',
      previewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cinematic-steam-train-traveling-through-a-desert-42861-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '2.39:1',
      duration: '00:40'
    },
    
    challenge: 'יצירת סרט פרסומי המשלב את עולם הקמעונאות, חג הרמדאן ורכבת ממותגת בתוך עולם קולנועי אחד רציף — ללא צילום פיזי של שחקנים, סטים או רכבות.',
    idea: 'מסע קולנועי פואטי ברכבת לילה מדברית החוצה ערים היסטוריות, כשהאורות החמים של רמדאן מאירים את הקרונות ומפגישים משפחות סביב שולחן החג באווירה קולנועית על-זמנית.',
    conceptArtUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
    shortDescription: 'קמפיין טלוויזיוני ודיגיטלי מלא שנוצר כולו ב-AI — שילוב של רכבת מדברית, ארכיטקטורה מזרח-תיכונית ותאורת חג חמה.',
    fullDescription: 'הפקה קולנועית פורצת דרך עבור רשת CBC. הפרויקט הוכיח כיצד תהליך בימוי קפדני ו-Visual Development מעמיק מאפשרים ליצור סרט מסחרי ברמת גימור של שובר קופות, ללא יום צילום אחד, תוך שמירה על עקביות מותגית ודמויות מדויקות.',
    
    processSteps: [
      {
        id: 'step-1',
        stepNumber: '01',
        title: 'Concept & Storyboard',
        subtitle: 'פיצוח השפה והנרטיב',
        description: 'גיבוש הרעיון המרכזי: רכבת כסמל של חיבור, תנועה והתכנסות משפחתית. בניית שוט-ליסט מפורט עם 18 סצנות מפתח.',
        mediaUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'step-2',
        stepNumber: '02',
        title: 'Visual Development',
        subtitle: 'עיצוב השפה החזותית',
        description: 'הגדרת פלטת צבעים חמה (זהב, חול עמוק, טורקיז לילי), תאורת שקיעה ואורות פנסים מסורתיים.',
        mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'step-3',
        stepNumber: '03',
        title: 'Characters / Locations',
        subtitle: 'נעילת דמויות ולוקיישנים',
        description: 'פיתוח LoRA ופרומפטים ייעודיים לשמירה על עקביות פניהם של הדמויות הראשיות ועיצוב קרונות הרכבת המפוארים.',
        mediaUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'step-4',
        stepNumber: '04',
        title: 'AI Generated Frames',
        subtitle: 'יצירת פריימים באיכות קולנועית',
        description: 'הפקה של למעלה מ-800 פריימים גולמיים ב-Midjourney v6.1 ובחירת 24 הפריימים המדויקים ביותר לקומפוזיציה.',
        mediaUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'step-5',
        stepNumber: '05',
        title: 'Motion & Generation',
        subtitle: 'שליטה בתנועת מצלמה',
        description: 'הזרקת תנועה מבוקרת (Motion Brush & Camera Control) ב-Runway Gen-3 Alpha ו-Kling AI לקבלת תנועת רכבת דינמית ומשכנעת.',
        mediaUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'step-6',
        stepNumber: '06',
        title: 'Editing & Pace',
        subtitle: 'עריכה וזרימה רגשית',
        description: 'בניית הקצב בעריכה — מעבר מתנועה מהירה במדבר הפתוח אל רגעים אינטימיים ושקטים בתוך הקרון.',
        mediaUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'step-7',
        stepNumber: '07',
        title: 'Sound & Score',
        subtitle: 'עיצוב סאונד ומיקס',
        description: 'פסקול מקורי המשלב כלי נגינה מזרחיים אותנטיים (עוד וקאנון) עם סאונד-דיזיין סינמטי מודרני.',
        mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'step-8',
        stepNumber: '08',
        title: 'Final Master',
        subtitle: 'Color Grading & Upscaling',
        description: 'Upscale ל-4K באמצעות Topaz Video AI, קומפוזיטינג של לוגו המותג ב-After Effects וגרסת מאסטר סופית.',
        mediaUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      }
    ],
    
    frameBreakdown: {
      shotName: 'Shot 04 — The Train Enters Ancient Oasis',
      description: 'התפתחות השוט מרישום הקונספט ועד לפרקטיקל-רינדור הסופי',
      stages: [
        {
          id: 'fb-1',
          title: 'INITIAL IDEA',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
          caption: 'סקיצת קומפוזיציה ראשונית להגדרת קו האופק וזוויות התאורה'
        },
        {
          id: 'fb-2',
          title: 'GENERATED FRAME',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
          caption: 'פריים בסיס עתיר פרטים שנוצר ב-Midjourney לאחר 40 איטרציות'
        },
        {
          id: 'fb-3',
          title: 'MOTION PASS',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
          caption: 'הזרקת תנועת עשן, חול מתעופף וגלגלי רכבת ב-Runway Gen-3'
        },
        {
          id: 'fb-4',
          title: 'FINAL FILM',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
          caption: 'פריים המאסטר הסופי לאחר תיקוני צבע ב-DaVinci וקומפוזיטינג'
        }
      ]
    },
    
    productionStats: {
      shotsCount: 18,
      locationsCount: 4,
      charactersCount: 3,
      filmingDays: 0,
      finalDuration: '40 sec',
      renderTime: '72 hours',
      customMetrics: [
        { label: 'Generations', value: '840+' },
        { label: 'Resolution', value: '4K DCI' }
      ]
    },
    
    credits: {
      creativeDirection: 'Studio Director',
      director: 'AI Film Director',
      aiFilm: 'AI Creative Lab',
      visualDevelopment: 'Lead Concept Artist',
      editing: 'Studio Post House',
      soundDesign: 'Cinematic Audio FX',
      music: 'Original Score by Studio',
      client: 'CBC Group',
      agency: 'Horizon Creative'
    },
    
    techStack: [
      'Midjourney v6.1',
      'Runway Gen-3 Alpha',
      'Kling 1.5',
      'Topaz Video AI',
      'DaVinci Resolve Studio',
      'Adobe After Effects'
    ],
    
    gallery: [
      {
        id: 'g-1',
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
        caption: 'קרון הרכבת המואר החוצה את הדיונות בשעת בין ערביים',
        aspectRatio: '2.39:1'
      },
      {
        id: 'g-2',
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
        caption: 'תחנת הרכבת העתיקה המעוטרת בפנסי רמדאן',
        aspectRatio: '2.39:1'
      },
      {
        id: 'g-3',
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
        caption: 'שוט פנים אינטימי: שולחן הסעודה המשפחתית',
        aspectRatio: '2.39:1'
      },
      {
        id: 'g-4',
        url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=85',
        caption: 'פריים הסיום: הרכבת ממשיכה אל תוך אורות העיר המנצנצים',
        aspectRatio: '2.39:1'
      }
    ],
    
    seoTitle: 'CBC Ramadan Campaign — AI Commercial Film | Case Study',
    seoDescription: 'Case study מלא של סרט הפרסומת לרשת CBC שנוצר כולו באמצעות AI — תהליך הפקה, פירוק פריימים ונתוני יצירה.',
    ogImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'proj-yiftach',
    slug: 'yiftach',
    title: 'יפתח — שבועת הדמים',
    subtitle: 'A Narrative Historical AI Film',
    client: 'Heritage Media / Co-production',
    year: '2026',
    category: 'Storytelling',
    workType: 'client_work',
    status: 'published',
    featured: true,
    homepageOrder: 2,
    projectType: 'Narrative AI Short Film',
    role: 'Co-Director / AI Worldbuilding / Visual Effects',
    
    video: {
      provider: 'vimeo',
      videoId: '1084537',
      masterUrl: 'https://player.vimeo.com/video/1084537?autoplay=1&color=d4af37&title=0&byline=0&portrait=0',
      previewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-sparks-flying-in-the-dark-43360-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '2.39:1',
      duration: '03:20'
    },
    
    challenge: 'הפקת דרמה היסטורית אפית תקופתית באווירה תנ"כית מחוספסת, עם עשרות לוחמים, נופים קדומים ותאורת אש ולפידים דרמטית — תוך שמירה על רגש עמוק ומבט אנושי אותנטי.',
    idea: 'עיבוד קולנועי עמוק לסיפור הגבורה והשבר של יפתח הגלעדי. השפה החזותית שואבת השראה מציורי רמברנדט וקרוואג׳ו: ניגוד עז בין אור לצל (קיארוסקורו), לכלוך, ברזל וזיעה.',
    conceptArtUrl: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1600&q=85',
    shortDescription: 'דרמה תקופתית אפית המתרחשת בנופי הגלעד הקדומים — שילוב חסר תקדים של הבעות פנים דרמטיות ותאורת קיארוסקורו קולנועית.',
    fullDescription: 'סרט עלילתי קצר שנוצר כקו-פרודוקציה. הפרויקט הדגים יכולת שליטה קיצונית בעקביות דמויות (Character Consistency) לאורך למעלה מ-30 שוטים רצופים, עם ביצועי משחק מלאי רגש והבעות פנים תלת-ממדיות עשירות.',
    
    processSteps: [
      {
        id: 'y-step-1',
        stepNumber: '01',
        title: 'Script & Historical Research',
        subtitle: 'מחקר תקופתי ותסריט',
        description: 'חקר שריונות, כלי נשק, בדים ומבנים של תקופת השופטים כדי ליצור עולם היסטורי אמין ומחוספס.',
        mediaUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'y-step-2',
        stepNumber: '02',
        title: 'Character Consistency (LoRA)',
        subtitle: 'אימון מודל דמות ייעודי',
        description: 'אימון מודל מותאם אישית (Custom LoRA) לדמותו של יפתח — מבנה פנים מצולק, שיער וזקן עקביים מכל זווית צילום.',
        mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'y-step-3',
        stepNumber: '03',
        title: 'Chiaroscuro Lighting Study',
        subtitle: 'עיצוב תאורת אש ולפידים',
        description: 'שליטה קפדנית באלומות אור וצללים עמוקים המדגישים את הדילמה המוסרית הפנימית של הגיבור.',
        mediaUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'y-step-4',
        stepNumber: '04',
        title: 'Voice & Lip-Sync Performance',
        subtitle: 'דיבוב קולנועי וסנכרון שפתיים',
        description: 'הקלטת שחקני קול מקצועיים בעברית מקראית וסנכרון שפתיים מלא באמצעות טכנולוגיית Generative Motion.',
        mediaUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      }
    ],
    
    frameBreakdown: {
      shotName: 'Shot 12 — The Oath Before the Storm',
      description: 'רגע השבועה הדרמטית של יפתח אל מול הרי הגלעד בשעת לילה',
      stages: [
        {
          id: 'yfb-1',
          title: 'INITIAL SKETCH',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
          caption: 'שרטוט העמדת הדמות אל מול שמי הסערה והצבא הניצב ברקע'
        },
        {
          id: 'yfb-2',
          title: 'GENERATED FRAME',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80',
          caption: 'הפקת פריים ברזולוציה גבוהה עם השתקפות אש בלהב החרב'
        },
        {
          id: 'yfb-3',
          title: 'PERFORMANCE MOTION',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=800&q=80',
          caption: 'הנעת שרירי הפנים, נשימה כבדה וסערת הרוח בגלימה'
        },
        {
          id: 'yfb-4',
          title: 'FINAL CINEMA MASTER',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80',
          caption: 'מאסטר סופי משולב סאונד רעמים ועיבוד צבע תנ"כי'
        }
      ]
    },
    
    productionStats: {
      shotsCount: 32,
      locationsCount: 6,
      charactersCount: 8,
      filmingDays: 0,
      finalDuration: '03:20',
      renderTime: '120 hours',
      customMetrics: [
        { label: 'Cast Size', value: '8 Characters' },
        { label: 'Voice Track', value: 'Biblical Hebrew' }
      ]
    },
    
    credits: {
      creativeDirection: 'Studio Director',
      director: 'AI Narrative Co-Director',
      aiFilm: 'Studio Worldbuilding Lab',
      editing: 'Studio Editorial',
      soundDesign: 'Ancient Soundscapes',
      music: 'Orchestral Score & Choirs',
      client: 'Heritage Media / Festival Circuit'
    },
    
    techStack: [
      'Custom LoRA Training',
      'Midjourney v6.1',
      'Runway Gen-3',
      'Luma Dream Machine',
      'ElevenLabs Voice',
      'DaVinci Resolve Studio'
    ],
    
    gallery: [
      {
        id: 'yg-1',
        url: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=1600&q=85',
        caption: 'יפתח מביט אל הרי הגלעד בשעת שקיעה אדומה',
        aspectRatio: '2.39:1'
      },
      {
        id: 'yg-2',
        url: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1600&q=85',
        caption: 'מחנה הלוחמים סביב מדורות הלילה',
        aspectRatio: '2.39:1'
      },
      {
        id: 'yg-3',
        url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1600&q=85',
        caption: 'מבט קרוב: עיני הגיבור לפני היציאה לקרב',
        aspectRatio: '2.39:1'
      }
    ],
    
    seoTitle: 'יפתח — סרט עלילתי היסטורי מבוסס AI | Case Study',
    seoDescription: 'Case study על הפקת דרמה היסטורית אפית תקופתית ב-AI — שמירה על עקביות דמויות, תאורת קיארוסקורו ובימוי שחקנים וירטואלי.',
    ogImageUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-02-15T12:00:00Z',
    updatedAt: '2026-02-15T12:00:00Z'
  },
  {
    id: 'proj-aethelgard',
    slug: 'aethelgard',
    title: 'Aethelgard — The Dying Star',
    subtitle: 'Original Sci-Fi Worldbuilding Spec Film',
    client: 'Studio Original IP / R&D',
    year: '2026',
    category: 'Storytelling',
    workType: 'concept_work',
    status: 'published',
    featured: true,
    homepageOrder: 3,
    projectType: 'Concept Sci-Fi Worldbuilding',
    role: 'World Creator / Visual Architecture / Sound Design',
    
    video: {
      provider: 'vimeo',
      videoId: '76979871',
      masterUrl: 'https://player.vimeo.com/video/76979871?autoplay=1&color=d4af37&title=0&byline=0&portrait=0',
      previewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-view-of-outer-space-and-stars-from-a-spaceship-window-41584-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '2.39:1',
      duration: '01:30'
    },
    
    challenge: 'פרויקט קונספט ומחקר מקורי של הסטודיו: בדיקת גבולות ה-Worldbuilding האפי והקומפוזיציה בחלל עמוק, ויצירת סביבות חייזריות בעלות פיזיקה וביולוגיה ייחודית.',
    idea: 'ציוויליזציה עתיקה הבונה מגה-מבנים קוסמיים סביב כוכב גוסס. השפה הוויזואלית משלבת ארכיטקטורה ברוטליסטית מונומנטלית עם חלקיקי אור וגז זוהרים.',
    conceptArtUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=85',
    shortDescription: 'פרויקט קונספט מקורי של הסטודיו החוקר מגה-מבנים בחלל עמוק וסביבות קוסמיות מרהיבות.',
    fullDescription: 'עבודת מחקר ופיתוח (R&D) מקורית של הסטודיו. הפרויקט שימש מעבדת ניסויים לפיתוח טכניקות הדמיית חומרים מורכבים (זכוכית, פלזמה, כבידה נמוכה) עבור לקוחות עתידיים בתחומי הגיימינג והבידור.',
    
    processSteps: [
      {
        id: 'a-step-1',
        stepNumber: '01',
        title: 'Cosmic Architecture Design',
        subtitle: 'תכנון מבנים בסקנה קוסמית',
        description: 'פיתוח שפה עיצובית למגה-מבנים בגודל פלנטרי המשלבים חומרים שחורים בולעי אור ומנגנוני אנרגיה סולארית.',
        mediaUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      },
      {
        id: 'a-step-2',
        stepNumber: '02',
        title: 'Procedural Alien Atmosphere',
        subtitle: 'פיזיקה ופלזמה ב-AI Motion',
        description: 'שילוב מנועי תנועה מתקדמים לדמיון גזי ערפילית וגלי הלם של כוכב פועם.',
        mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      }
    ],
    
    productionStats: {
      shotsCount: 24,
      locationsCount: 5,
      charactersCount: 2,
      filmingDays: 0,
      finalDuration: '01:30',
      renderTime: '90 hours',
      customMetrics: [
        { label: 'Project Nature', value: 'Original R&D IP' },
        { label: 'Scale', value: 'Macro Cosmic' }
      ]
    },
    
    credits: {
      creativeDirection: 'Studio Original Lab',
      director: 'Studio Director',
      aiFilm: 'Studio Generative Team',
      soundDesign: 'Deep Cosmic Ambient',
      music: 'Modular Synthesizers'
    },
    
    techStack: [
      'Midjourney v6.1',
      'Runway Gen-3 Alpha',
      'Stable Video Diffusion',
      'Unreal Engine 5 (Pre-vis)',
      'DaVinci Resolve Studio'
    ],
    
    gallery: [
      {
        id: 'ag-1',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
        caption: 'מגה-מבנה סולארי המקיף את ליבת הכוכב הגוסס',
        aspectRatio: '2.39:1'
      },
      {
        id: 'ag-2',
        url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=85',
        caption: 'ספינת מחקר החוצה את שדות הערפילית השחורה',
        aspectRatio: '2.39:1'
      }
    ],
    
    seoTitle: 'Aethelgard: The Dying Star — Sci-Fi Concept Film | AI Studio R&D',
    seoDescription: 'סרט קונספט מקורי של הסטודיו: חקר בניית עולמות מדע בדיוני, מגה-מבנים קוסמיים והדמיות חלל ב-AI.',
    ogImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'proj-maison-nocturne',
    slug: 'maison-nocturne',
    title: 'Maison de L\'Ombre — Nocturne',
    subtitle: 'High-Fashion & Luxury Fragrance Spec Ad',
    client: 'Concept Spec Ad / Luxury R&D',
    year: '2026',
    category: 'Product',
    workType: 'concept_work',
    status: 'published',
    featured: false,
    homepageOrder: 4,
    projectType: 'Luxury Commercial Concept',
    role: 'Art Direction / Product Simulation / Fluid Dynamics',
    
    video: {
      provider: 'vimeo',
      videoId: '1084537',
      masterUrl: 'https://player.vimeo.com/video/1084537?autoplay=1&color=d4af37&title=0&byline=0&portrait=0',
      previewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-thick-smoke-rising-in-the-dark-43358-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '16:9',
      duration: '00:30'
    },
    
    challenge: 'יצירת סרטון קונספט יוקרתי לעולם הבישום האופנתי — שליטה ברינדור חומרים מורכבים של זכוכית נוזלית, עשן סמיך, קטיפה שחורה ורסיסי זהב.',
    idea: 'שילוב בין אלגנטיות פריזאית אפלה לבין זרימה אבסטרקטית של נוזל וניחוח. הבקבוק נולד מתוך תנועת צללים וטיפות זהב טהור.',
    conceptArtUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=85',
    shortDescription: 'סרטון קונספט מסחרי לעולם היוקרה והבישום — שילוב של נוזלים היפר-ריאליסטיים, זכוכית שחורה ותאורת סטודיו עילית.',
    fullDescription: 'מחקר יישומי עבור מותגי יוקרה ואופנה המדגים כיצד ניתן לייצר מראה פוטו-ריאליסטי ברמת דיוק מיקרוסקופית עבור מוצרי פרימיום ללא צורך ברינדור תלת-ממד מסורתי ממושך.',
    
    processSteps: [
      {
        id: 'm-step-1',
        stepNumber: '01',
        title: 'Macro Texture Simulation',
        subtitle: 'הדמיית טקסטורות מקרו',
        description: 'שליטה בהחזרי אור על בקבוק קריסטל שחור, שבירת קרני אור ונוזלים סמיכים.',
        mediaUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        active: true
      }
    ],
    
    productionStats: {
      shotsCount: 14,
      locationsCount: 3,
      charactersCount: 1,
      filmingDays: 0,
      finalDuration: '00:30',
      renderTime: '40 hours',
      customMetrics: [
        { label: 'Style', value: 'High Fashion Macro' },
        { label: 'Target', value: 'Luxury Fragrance' }
      ]
    },
    
    credits: {
      creativeDirection: 'Studio Director',
      director: 'AI Commercial Lead',
      aiFilm: 'Studio Luxury Lab',
      soundDesign: 'Sensory Audio Design'
    },
    
    techStack: [
      'Midjourney v6.1',
      'Kling AI 1.5',
      'Runway Gen-3',
      'DaVinci Resolve Studio'
    ],
    
    gallery: [
      {
        id: 'mg-1',
        url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1600&q=85',
        caption: 'תקריב על בקבוק הזכוכית השחורה וטיפת הזהב',
        aspectRatio: '16:9'
      },
      {
        id: 'mg-2',
        url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=85',
        caption: 'תנועת עשן וקטיפה המלווה את התזת הבושם',
        aspectRatio: '16:9'
      }
    ],
    
    seoTitle: 'Maison de L\'Ombre — Luxury AI Fragrance Spec Commercial',
    seoDescription: 'סרטון קונספט יוקרתי לעולם הבישום — הדמיות מקרו של זכוכית, נוזלים ועשן שנוצרו ב-AI.',
    ogImageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z'
  }
];
