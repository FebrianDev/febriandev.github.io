-- ==============================================================================
-- SEED DATA CV M. DWI FEBRIAN KE SUPABASE
-- Jalankan di: Dashboard Supabase -> SQL Editor -> New Query -> Run
-- (Atau gunakan tombol "Sync Data CV ke Supabase" di halaman admin.html)
-- ==============================================================================

BEGIN;

-- 1. Profile Settings
INSERT INTO profile_settings (
  id,
  status_text,
  hero_title_1,
  hero_title_2,
  hero_subtitle,
  bio,
  email,
  resume_url,
  github_url,
  linkedin_url,
  updated_at
)
VALUES (
  1,
  'Open to Android Engineering Roles',
  'Building Clean',
  'Android Experiences',
  'Native Android Developer with 3+ years of experience shipping Kotlin, Jetpack Compose, and Clean Architecture apps.',
  ARRAY[
    'I''m M. Dwi Febrian, a Native Android Developer from East Java with 3+ years of production experience in Kotlin, Jetpack Compose, MVVM, and Clean Architecture.',
    'At Virtusee, I solely built Virtusee Pro for real-time field operations, following prior Android roles at ViuiT and Berani Digital ID. I''m also a Compose Champion Indonesia 2023 honoree and two-time Huawei AppsUP awardee.'
  ],
  'febrian26022001@gmail.com',
  '#',
  'https://github.com/febriandev',
  'https://www.linkedin.com/in/md-febrian/',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  status_text = EXCLUDED.status_text,
  hero_title_1 = EXCLUDED.hero_title_1,
  hero_title_2 = EXCLUDED.hero_title_2,
  hero_subtitle = EXCLUDED.hero_subtitle,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  resume_url = EXCLUDED.resume_url,
  github_url = EXCLUDED.github_url,
  linkedin_url = EXCLUDED.linkedin_url,
  updated_at = NOW();

-- 2. Projects
DELETE FROM projects;

INSERT INTO projects (title, tags, description, project_url, case_study_url, mockup_type, image_url, sort_order)
VALUES
  (
    'Virtusee Pro',
    ARRAY['Kotlin', 'MVVM', 'Clean Arch', 'GPS & Maps'],
    'Field-operations Android app on Google Play—solely engineered with GPS tracking, visit reporting, photo capture, digital signatures, and dynamic forms.',
    'https://play.google.com/store/apps/details?id=com.snapforce.lite',
    '#',
    'field',
    'https://play-lh.googleusercontent.com/JWbEcqAkYDY2fvcv94VRVSwHRKszOdRJccr9I5U_RQz1luXl-e8FyQ4XJpKcB7QDrJth-BHDTMpGPFEj7MgtxOE=s0',
    1
  ),
  (
    'NutrimindAI',
    ARRAY['Android', 'Google Play', 'AI Vision', 'Health'],
    'All-in-one AI health companion and smart calorie tracker featuring AI food vision, voice logging, and personalized nutrition insights.',
    'https://play.google.com/store/apps/details?id=com.fdev.nutrimindai',
    '#',
    'ring',
    'https://play-lh.googleusercontent.com/FdwDcd3KUBsMkKOFTkJp5Iih1JMAF9n_bVF4glXYDFpZoAloidKLHeLwQlsH5uBupH7RiJyx35fZrQZ50Q94INM=s0',
    2
  ),
  (
    'MocklyAI',
    ARRAY['Android', 'Google Play', 'AI', 'Interview Prep'],
    'AI technical interview simulator that remembers previous sessions and adapts questions to your target role, level, and improvement areas.',
    'https://play.google.com/store/apps/details?id=com.fdev.mocklyai',
    '#',
    'compose',
    'https://play-lh.googleusercontent.com/mbkOAa8DUzgaCi7-EuxqEJG9h1YRe3WGAkFtY7zHj-bL2pGYybrsd2PZw8cq8eRfXKOELk116yZ1Edkbg3lt=s0',
    3
  ),
  (
    'KanaQuest',
    ARRAY['Android', 'Google Play', 'Education', 'Japanese'],
    'Japanese learning app covering hiragana, katakana, kanji, vocabulary, grammar, listening, and JLPT-style quizzes with streaks and cloud sync.',
    'https://play.google.com/store/apps/details?id=com.fdev.kanaquest',
    '#',
    'compose',
    'https://play-lh.googleusercontent.com/K7dPfTW9vbSfaTvb0iFAfj72mnSxfVWqgDIIqucVkSEjxlosg5xqnGOADtcZ0DyNtIsu5ZFh39d8hwLUbTWcbw=s0',
    4
  ),
  (
    'Vocary - Vocabulary Mastery',
    ARRAY['Android', 'Google Play', 'Education', 'Vocabulary'],
    'English vocabulary builder featuring instant word search, phonetic and audio pronunciation, topic-based levels, favorites, and learning history.',
    'https://play.google.com/store/apps/details?id=com.febriandev.vocary',
    '#',
    'compose',
    'https://play-lh.googleusercontent.com/FzhSab48m0H7kjG4pFB9TG8tF8-dOubJ3Jxc-teUr-CEaNaW9bDnemoTQemTyQxk8YIWUTEA_bs2izmTMrlLYVo=s0',
    5
  ),
  (
    'Simple QR/Barcode Scanner',
    ARRAY['Android', 'Google Play', 'QR & Barcode', 'Ad-Free'],
    'Fast, ad-free QR and barcode scanner on Google Play supporting live camera and gallery decoding across URLs, Wi-Fi, contacts, products, and ISBN.',
    'https://play.google.com/store/apps/details?id=com.febrian.simpleqrbarcodescanner',
    '#',
    'qr',
    'https://play-lh.googleusercontent.com/MGZmWDyvciYTygpq1N2G3oLr8ld1jcZaroJIeImVsMtgVAtDwezinzFNzzYo5COPWfrtg1chYp_6cTxsfmBLdA=s0',
    6
  ),
  (
    'Tour Guide Streaming App',
    ARRAY['Android', 'Streaming', 'Real-time Chat', 'FCM'],
    'Tour guide Android app built at Berani Digital ID featuring audio and video streaming, real-time chat, and push notifications.',
    '#',
    '#',
    'stream',
    '',
    7
  ),
  (
    'Mobile Hackathons & Prototypes',
    ARRAY['Kotlin', 'Jetpack Compose', 'Prototyping'],
    'Rapid Kotlin and Jetpack Compose prototypes built across mobile hackathons since 2021, contributing to Compose Champion and Huawei AppsUP awards.',
    '#',
    '#',
    'compose',
    '',
    8
  ),
  (
    'Interactive BST Learning Website',
    ARRAY['Web App', 'Data Structures', 'PENS Final Project'],
    'Interactive web visualizer for Binary Search Tree operations designed and built as my 2023 PENS Game Technology final project.',
    '#',
    '#',
    'bst',
    '',
    9
  );

-- 3. Experiences
DELETE FROM experiences;

INSERT INTO experiences (role, company, period, is_current, bullets, sort_order)
VALUES
  (
    'Mobile Developer (Android - Kotlin)',
    'Virtusee (PT. Virtusee Peta Sukses)',
    'Dec 2023 – Present',
    true,
    ARRAY[
      'Solely engineered and maintained all features of Virtusee Pro in native Kotlin on Google Play for real-time field operations.',
      'Built GPS tracking, client/store visit reporting, photo documentation, digital signatures, and customizable dynamic forms.',
      'Owned MVVM & Clean Architecture, Play Store releases, crash diagnostics, and production stability.'
    ],
    1
  ),
  (
    'Android Developer',
    'ViuiT',
    'Aug 2023 – Nov 2023',
    false,
    ARRAY[
      'Built new merchant features (Tutup Sementara and Merchant Belanja) in the ViuiT Merchant Android app.',
      'Streamlined existing workflows, resolved production bugs, and delivered across UI/UX, Backend, and SQA sprints.'
    ],
    2
  ),
  (
    'Android Developer Intern',
    'Berani Digital ID',
    'Jun 2022 – Dec 2022',
    false,
    ARRAY[
      'Developed a tour guide Android app supporting audio/video streaming, real-time chat, and push notifications.',
      'Researched and benchmarked third-party Android libraries for production integration.'
    ],
    3
  ),
  (
    'SIB – Pengembang Aplikasi Android',
    'Dicoding Indonesia • Remote',
    'Aug 2021 – Jan 2022',
    false,
    ARRAY[
      'Completed a 5-month intensive Kotlin Android program covering Fundamentals, Android Jetpack, and Capstone delivery.'
    ],
    4
  );

-- 4. Achievements (Honors & Certifications)
DELETE FROM achievements;

INSERT INTO achievements (title, issuer, year, description, credential_url, image_url, sort_order)
VALUES
  (
    'Compose Champion Indonesia 2023',
    'Compose Migration Champion Challenge',
    '2023',
    'Honored for migrating and building modern Android UI with Jetpack Compose.',
    '#',
    '',
    1
  ),
  (
    'AppsUP 2022 – Student Innovation Award',
    'Huawei HMS Contest',
    '2022',
    'Student Innovation Award winner at the Huawei HMS App Innovation Contest.',
    '#',
    '',
    2
  ),
  (
    'AppsUP 2021 – AppGallery Rising Star Award',
    'Huawei HMS Contest',
    '2021',
    'AppGallery Rising Star Award winner at the Huawei HMS App Innovation Contest.',
    '#',
    '',
    3
  ),
  (
    'Menjadi iOS Developer Expert',
    'Dicoding Indonesia',
    '2024',
    'Expert-level iOS application development certification.',
    '#',
    '',
    4
  ),
  (
    'Belajar Fundamental Aplikasi iOS',
    'Dicoding Indonesia',
    '2024',
    'Fundamental iOS application development certification.',
    '#',
    '',
    5
  ),
  (
    'Belajar Membuat Aplikasi Android dengan Jetpack Compose',
    'Dicoding Indonesia',
    '2023',
    'Declarative Android UI with Jetpack Compose certification.',
    '#',
    '',
    6
  ),
  (
    'Belajar Pengembangan Aplikasi Android Intermediate',
    'Dicoding Indonesia',
    '2023',
    'Intermediate native Android engineering certification.',
    '#',
    '',
    7
  ),
  (
    'Belajar Fundamental Aplikasi Flutter',
    'Dicoding Indonesia',
    '2023',
    'Cross-platform Flutter fundamentals certification.',
    '#',
    '',
    8
  ),
  (
    'Menjadi Android Developer Expert',
    'Dicoding Indonesia',
    '2022',
    'Expert-level native Android engineering certification.',
    '#',
    '',
    9
  );

COMMIT;
