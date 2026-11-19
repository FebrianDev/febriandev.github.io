// Canonical portfolio data derived from M. Dwi Febrian's CV.
// Shared between js/main.js (display & fallback) and js/admin.js (Supabase seeding).

export const PORTFOLIO_DEFAULT_DATA = {
  name: "M. Dwi Febrian",
  brandName: "Febrian",
  role: "Native Android Developer",
  initials: "FDev",
  year: new Date().getFullYear(),
  resumeUrl: "#",
  hero: {
    statusText: "Open to Android Engineering Roles",
    titleLine1: "Building Clean",
    titleLine2: "Android Experiences",
    subtitle:
      "Native Android Developer with 3+ years of experience shipping Kotlin, Jetpack Compose, and Clean Architecture apps.",
    ctaPrimary: { label: "View Projects", href: "#projects" },
    ctaSecondary: { label: "Contact Me", href: "#contact" },
  },
  aboutMe: {
    photoUrl: "",
    bio: [
      "I'm M. Dwi Febrian, a Native Android Developer from East Java with 3+ years of production experience in Kotlin, Jetpack Compose, MVVM, and Clean Architecture.",
      "At Virtusee, I solely built Virtusee Pro for real-time field operations, following prior Android roles at ViuiT and Berani Digital ID. I'm also a Compose Champion Indonesia 2023 honoree and two-time Huawei AppsUP awardee.",
    ],
    education: {
      icon: "🎓",
      institution: "Electronic Engineering Polytechnic Institute of Surabaya (PENS)",
      summary: "S.Tr.Kom in Game Technology (2019–2023) · GPA 3.60 / 4.00",
    },
    stats: [
      { num: "3+", label: "Years Exp." },
      { num: "3.60", label: "PENS GPA" },
      { num: "3", label: "Honors Won" },
      { num: "6", label: "Certifications" },
    ],
    highlights: [
      {
        icon: "📱",
        label: "Native Android",
        text: "Kotlin, Java, Jetpack Compose, Navigation, ViewModel, Room, Coroutines, Flow, Maps & GPS",
      },
      {
        icon: "🏗️",
        label: "Architecture & APIs",
        text: "MVVM, Clean Architecture, Modularization, Dagger Hilt, Koin, Retrofit, Ktor & REST APIs",
      },
      {
        icon: "🔄",
        label: "Cross-Platform & Backend",
        text: "Kotlin Multiplatform (KMP), Flutter, SwiftUI, Firebase, Node.js, Express.js & MySQL",
      },
      {
        icon: "🛠️",
        label: "Workflow",
        text: "Android Studio, Git, GitHub/GitLab & async cross-functional sprints with UI/UX, Backend & QA",
      },
    ],
    interests: [
      "Jetpack Compose",
      "Clean Architecture",
      "Kotlin Multiplatform",
      "Google Maps & GPS",
      "Firebase & ML Kit",
      "Flutter & SwiftUI",
      "Mobile Hackathons",
    ],
  },
  projects: [
    {
      title: "Virtusee Pro",
      tags: ["Kotlin", "MVVM", "Clean Arch", "GPS & Maps"],
      description:
        "Field-operations Android app on Google Play—solely engineered with GPS tracking, visit reporting, photo capture, digital signatures, and dynamic forms.",
      caseStudyUrl: "#",
      projectUrl: "https://play.google.com/store/apps/details?id=com.snapforce.lite",
      mockupType: "field",
      imageUrl:
        "https://play-lh.googleusercontent.com/JWbEcqAkYDY2fvcv94VRVSwHRKszOdRJccr9I5U_RQz1luXl-e8FyQ4XJpKcB7QDrJth-BHDTMpGPFEj7MgtxOE=s0",
      iconUrl:
        "https://play-lh.googleusercontent.com/-WrCRZDLAbztWaFP2pZv5lWgoZ76gaqGKBjSywsBhA9FTYgnqjik7-AAVsMXbSm5J1mitfpR8AIfCZ-97w5ulg=w240-h480",
      sortOrder: 1,
    },
    {
      title: "NutrimindAI",
      tags: ["Android", "Google Play", "AI Vision", "Health"],
      description:
        "All-in-one AI health companion and smart calorie tracker featuring AI food vision, voice logging, and personalized nutrition insights.",
      caseStudyUrl: "#",
      projectUrl: "https://play.google.com/store/apps/details?id=com.fdev.nutrimindai",
      mockupType: "ring",
      imageUrl:
        "https://play-lh.googleusercontent.com/FdwDcd3KUBsMkKOFTkJp5Iih1JMAF9n_bVF4glXYDFpZoAloidKLHeLwQlsH5uBupH7RiJyx35fZrQZ50Q94INM=s0",
      iconUrl:
        "https://play-lh.googleusercontent.com/OpiU9Qz4G-Yhwhpi0gz7oUFEDTTcGGAIQ9OWk7P7yTafe6Svf_IRU-5i3Gz-rL7BeHMblHxYzUXv5FW-c1cE=w240-h480",
      sortOrder: 2,
    },
    {
      title: "MocklyAI",
      tags: ["Android", "Google Play", "AI", "Interview Prep"],
      description:
        "AI technical interview simulator that remembers previous sessions and adapts questions to your target role, level, and improvement areas.",
      caseStudyUrl: "#",
      projectUrl: "https://play.google.com/store/apps/details?id=com.fdev.mocklyai",
      mockupType: "compose",
      imageUrl:
        "https://play-lh.googleusercontent.com/mbkOAa8DUzgaCi7-EuxqEJG9h1YRe3WGAkFtY7zHj-bL2pGYybrsd2PZw8cq8eRfXKOELk116yZ1Edkbg3lt=s0",
      iconUrl:
        "https://play-lh.googleusercontent.com/t3yeTdT_NUUf7xvzwqw1RfKdlkhTVDHM62H_xCCArC6UpW0xxWZFSMnjEHOh8YzQLejdoNCVtqvHTaXybPtcOw=w240-h480",
      sortOrder: 3,
    },
    {
      title: "KanaQuest",
      tags: ["Android", "Google Play", "Education", "Japanese"],
      description:
        "Japanese learning app covering hiragana, katakana, kanji, vocabulary, grammar, listening, and JLPT-style quizzes with streaks and cloud sync.",
      caseStudyUrl: "#",
      projectUrl: "https://play.google.com/store/apps/details?id=com.fdev.kanaquest",
      mockupType: "compose",
      imageUrl:
        "https://play-lh.googleusercontent.com/K7dPfTW9vbSfaTvb0iFAfj72mnSxfVWqgDIIqucVkSEjxlosg5xqnGOADtcZ0DyNtIsu5ZFh39d8hwLUbTWcbw=s0",
      iconUrl:
        "https://play-lh.googleusercontent.com/3lS7L2YixtRtS2ffPb-NvvanbkzYuwza665XqjIUuYi16xWbGZa7bBs5Pc4bcCj7lG1JCTS3lDf3_Z0UqZzdE4k=w240-h480",
      sortOrder: 4,
    },
    {
      title: "Vocary - Vocabulary Mastery",
      tags: ["Android", "Google Play", "Education", "Vocabulary"],
      description:
        "English vocabulary builder featuring instant word search, phonetic and audio pronunciation, topic-based levels, favorites, and learning history.",
      caseStudyUrl: "#",
      projectUrl: "https://play.google.com/store/apps/details?id=com.febriandev.vocary",
      mockupType: "compose",
      imageUrl:
        "https://play-lh.googleusercontent.com/FzhSab48m0H7kjG4pFB9TG8tF8-dOubJ3Jxc-teUr-CEaNaW9bDnemoTQemTyQxk8YIWUTEA_bs2izmTMrlLYVo=s0",
      iconUrl:
        "https://play-lh.googleusercontent.com/kVG7A7gsjZSvTdDNpkv-NSAZ2E7P_1sNpwktXjLp2qqZJrPFpKb2jwN2gKHunFWuXXJBVetpzULsQBzR08uLFXQ=w240-h480",
      sortOrder: 5,
    },
    {
      title: "Simple QR/Barcode Scanner",
      tags: ["Android", "Google Play", "QR & Barcode", "Ad-Free"],
      description:
        "Fast, ad-free QR and barcode scanner on Google Play supporting live camera and gallery decoding across URLs, Wi-Fi, contacts, products, and ISBN.",
      caseStudyUrl: "#",
      projectUrl: "https://play.google.com/store/apps/details?id=com.febrian.simpleqrbarcodescanner",
      mockupType: "qr",
      imageUrl:
        "https://play-lh.googleusercontent.com/MGZmWDyvciYTygpq1N2G3oLr8ld1jcZaroJIeImVsMtgVAtDwezinzFNzzYo5COPWfrtg1chYp_6cTxsfmBLdA=s0",
      iconUrl:
        "https://play-lh.googleusercontent.com/Tgcv0x9n0C5YTVjdqidAdC_IQD2FBQUpf7npnXks4dOz9oZjBTNBFFvIrwzb4CKtW8WnuO0bAHJQ8W5Luaqytw=w240-h480",
      sortOrder: 6,
    },
    {
      title: "Tour Guide Streaming App",
      tags: ["Android", "Streaming", "Real-time Chat", "FCM"],
      description:
        "Tour guide Android app built at Berani Digital ID featuring audio and video streaming, real-time chat, and push notifications.",
      caseStudyUrl: "#",
      projectUrl: "#",
      mockupType: "stream",
      imageUrl: "",
      sortOrder: 7,
    },
    {
      title: "Mobile Hackathons & Prototypes",
      tags: ["Kotlin", "Jetpack Compose", "Prototyping"],
      description:
        "Rapid Kotlin and Jetpack Compose prototypes built across mobile hackathons since 2021, contributing to Compose Champion and Huawei AppsUP awards.",
      caseStudyUrl: "#",
      projectUrl: "#",
      mockupType: "compose",
      imageUrl: "",
      sortOrder: 8,
    },
    {
      title: "Interactive BST Learning Website",
      tags: ["Web App", "Data Structures", "PENS Final Project"],
      description:
        "Interactive web visualizer for Binary Search Tree operations designed and built as my 2023 PENS Game Technology final project.",
      caseStudyUrl: "#",
      projectUrl: "#",
      mockupType: "bst",
      imageUrl: "",
      sortOrder: 9,
    },
  ],
  experience: [
    {
      role: "Mobile Developer (Android - Kotlin)",
      company: "Virtusee (PT. Virtusee Peta Sukses)",
      period: "Dec 2023 – Present",
      isCurrent: true,
      bullets: [
        "Solely engineered and maintained all features of Virtusee Pro in native Kotlin on Google Play for real-time field operations.",
        "Built GPS tracking, client/store visit reporting, photo documentation, digital signatures, and customizable dynamic forms.",
        "Owned MVVM & Clean Architecture, Play Store releases, crash diagnostics, and production stability.",
      ],
      sortOrder: 1,
    },
    {
      role: "Android Developer",
      company: "ViuiT",
      period: "Aug 2023 – Nov 2023",
      isCurrent: false,
      bullets: [
        "Built new merchant features (Tutup Sementara and Merchant Belanja) in the ViuiT Merchant Android app.",
        "Streamlined existing workflows, resolved production bugs, and delivered across UI/UX, Backend, and SQA sprints.",
      ],
      sortOrder: 2,
    },
    {
      role: "Android Developer Intern",
      company: "Berani Digital ID",
      period: "Jun 2022 – Dec 2022",
      isCurrent: false,
      bullets: [
        "Developed a tour guide Android app supporting audio/video streaming, real-time chat, and push notifications.",
        "Researched and benchmarked third-party Android libraries for production integration.",
      ],
      sortOrder: 3,
    },
    {
      role: "SIB – Pengembang Aplikasi Android",
      company: "Dicoding Indonesia • Remote",
      period: "Aug 2021 – Jan 2022",
      isCurrent: false,
      bullets: [
        "Completed a 5-month intensive Kotlin Android program covering Fundamentals, Android Jetpack, and Capstone delivery.",
      ],
      sortOrder: 4,
    },
  ],
  achievements: [
    {
      title: "Compose Champion Indonesia 2023",
      issuer: "Compose Migration Champion Challenge",
      year: "2023",
      description: "Honored for migrating and building modern Android UI with Jetpack Compose.",
      credentialUrl: "#",
      imageUrl: "",
      sortOrder: 1,
    },
    {
      title: "AppsUP 2022 – Student Innovation Award",
      issuer: "Huawei HMS Contest",
      year: "2022",
      description: "Student Innovation Award winner at the Huawei HMS App Innovation Contest.",
      credentialUrl: "#",
      imageUrl: "",
      sortOrder: 2,
    },
    {
      title: "AppsUP 2021 – AppGallery Rising Star Award",
      issuer: "Huawei HMS Contest",
      year: "2021",
      description: "AppGallery Rising Star Award winner at the Huawei HMS App Innovation Contest.",
      credentialUrl: "#",
      imageUrl: "",
      sortOrder: 3,
    },
    {
      title: "Menjadi iOS Developer Expert",
      issuer: "Dicoding Indonesia",
      year: "2024",
      description: "Expert-level iOS application development certification.",
      credentialUrl: "#",
      imageUrl: "",
      sortOrder: 4,
    },
    {
      title: "Belajar Fundamental Aplikasi iOS",
      issuer: "Dicoding Indonesia",
      year: "2024",
      description: "Fundamental iOS application development certification.",
      credentialUrl: "#",
      imageUrl: "",
      sortOrder: 5,
    },
    {
      title: "Belajar Membuat Aplikasi Android dengan Jetpack Compose",
      issuer: "Dicoding Indonesia",
      year: "2023",
      description: "Declarative Android UI with Jetpack Compose certification.",
      credentialUrl: "#",
      imageUrl: "",
      sortOrder: 6,
    },
    {
      title: "Belajar Pengembangan Aplikasi Android Intermediate",
      issuer: "Dicoding Indonesia",
      year: "2023",
      description: "Intermediate native Android engineering certification.",
      credentialUrl: "#",
      imageUrl: "",
      sortOrder: 7,
    },
    {
      title: "Belajar Fundamental Aplikasi Flutter",
      issuer: "Dicoding Indonesia",
      year: "2023",
      description: "Cross-platform Flutter fundamentals certification.",
      credentialUrl: "#",
      imageUrl: "",
      sortOrder: 8,
    },
    {
      title: "Menjadi Android Developer Expert",
      issuer: "Dicoding Indonesia",
      year: "2022",
      description: "Expert-level native Android engineering certification.",
      credentialUrl: "#",
      imageUrl: "",
      sortOrder: 9,
    },
  ],
  cta: {
    heading: "Let's build great Android apps",
    subtext:
      "Open to Android & mobile engineering teams focused on clean architecture and quality delivery.",
    buttonLabel: "Get in Touch",
    email: "febrian26022001@gmail.com",
  },
  social: {
    github: "https://github.com/febriandev",
    linkedin: "https://www.linkedin.com/in/md-febrian/",
  },
};

export const HERO_CODE_SNIPPET = `<span class="cm">// Clean Architecture Field Operations</span>
<span class="fn">@HiltViewModel</span>
<span class="kw">class</span> <span class="cls">VisitReportViewModel</span> <span class="fn">@Inject</span> <span class="kw">constructor</span>(
    <span class="kw">private val</span> <span class="fn">submitVisitUseCase</span>: SubmitVisitUseCase,
    <span class="kw">private val</span> <span class="fn">gpsTracker</span>: LocationTracker
) : ViewModel() {
    <span class="kw">val</span> uiState: StateFlow&lt;VisitUiState&gt; =
        gpsTracker.<span class="fn">observeCoordinates</span>()
            .<span class="fn">map</span> { coords -&gt; VisitUiState.<span class="cls">Ready</span>(coords) }
            .<span class="fn">stateIn</span>(viewModelScope, <span class="cls">SharingStarted</span>.WhileSubscribed(<span class="num">5000</span>), VisitUiState.Loading)
}

<span class="cm">// Jetpack Compose Dynamic Form UI</span>
<span class="fn">@Composable</span>
<span class="kw">fun</span> <span class="fn">FieldVisitCard</span>(storeName: String, onCheckIn: () -&gt; Unit) {
    <span class="cls">Surface</span>(shape = <span class="cls">RoundedCornerShape</span>(<span class="num">16</span>.dp)) {
        <span class="cls">Column</span>(modifier = <span class="cls">Modifier</span>.<span class="fn">padding</span>(<span class="num">16</span>.dp)) {
            <span class="cls">Text</span>(text = storeName, style = <span class="cls">MaterialTheme</span>.typography.titleMedium)
            <span class="cls">Button</span>(onClick = onCheckIn) {
                <span class="cls">Text</span>(text = <span class="str">"Capture GPS &amp; Photo"</span>)
            }
        }
    }
}

<span class="cm">// Room Offline Visit Cache</span>
<span class="fn">@Entity</span>(tableName = <span class="str">"store_visits"</span>)
<span class="kw">data class</span> <span class="cls">StoreVisitEntity</span>(
    <span class="fn">@PrimaryKey</span> <span class="kw">val</span> id: String,
    <span class="kw">val</span> latitude: Double,
    <span class="kw">val</span> longitude: Double,
    <span class="kw">val</span> formPayloadJson: String,
    <span class="kw">val</span> synced: Boolean = <span class="kw">false</span>
)
`;

const LEGACY_PROFILE_EMAILS = new Set(["johndoe@email.com", "febriandev@email.com"]);
const LEGACY_STATUS_TEXT = "Available for new projects";
const LEGACY_HERO_SUBTITLE =
  "Passionate Android Developer specializing in Kotlin, Jetpack Compose, and creating robust, scalable mobile applications that users love.";
const LEGACY_PROJECT_DESCRIPTIONS = new Set([
  "A high-performance video streaming application featuring adaptive bitrate streaming, offline playback, and a custom UI built with Jetpack Compose.",
  "Comprehensive fitness tracking app integrating Google Fit API, real-time step counting, and detailed chart visualizations for progress monitoring.",
]);
const LEGACY_EXP_BULLETS = new Set([
  "Led the migration of a legacy Java codebase to 100% Kotlin, reducing crash rates by 40%.",
  "Developed and launched 5+ Android applications on the Google Play Store.",
]);

export function applySupabaseProfileOverrides(target, profile) {
  if (!profile) return;
  if (profile.status_text && profile.status_text !== LEGACY_STATUS_TEXT) {
    target.hero.statusText = profile.status_text;
  }
  if (profile.hero_title_1) target.hero.titleLine1 = profile.hero_title_1;
  if (profile.hero_title_2) target.hero.titleLine2 = profile.hero_title_2;
  if (profile.hero_subtitle && profile.hero_subtitle !== LEGACY_HERO_SUBTITLE) {
    target.hero.subtitle = profile.hero_subtitle;
  }
  if (
    Array.isArray(profile.bio) &&
    profile.bio.length > 0 &&
    !String(profile.bio[0]).includes("graduate of Game Technology student")
  ) {
    target.aboutMe.bio = profile.bio;
  }
  if (profile.email && !LEGACY_PROFILE_EMAILS.has(profile.email.trim().toLowerCase())) {
    target.cta.email = profile.email;
  }
  if (profile.resume_url && profile.resume_url !== "#") {
    target.resumeUrl = profile.resume_url;
  }
  if (profile.github_url) target.social.github = profile.github_url;
  if (profile.linkedin_url) target.social.linkedin = profile.linkedin_url;
}

export function isLegacySupabaseProjects(projects) {
  if (!Array.isArray(projects) || projects.length === 0) return true;
  return projects.every((p) => LEGACY_PROJECT_DESCRIPTIONS.has((p.description || "").trim()));
}

export function isLegacySupabaseExperiences(experiences) {
  if (!Array.isArray(experiences) || experiences.length === 0) return true;
  return experiences.every((exp) =>
    (exp.bullets || []).some((b) => LEGACY_EXP_BULLETS.has((b || "").trim()))
  );
}
