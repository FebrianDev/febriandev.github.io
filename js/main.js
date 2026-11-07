import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "../supabase-config.js";

// Inisialisasi Supabase Client
const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Data Default / Fallback jika Supabase belum terisi atau sedang offline
const defaultData = {
  name: "Febrian",
  role: "Android Developer",
  initials: "FDev",
  year: new Date().getFullYear(),
  resumeUrl: "#",
  hero: {
    statusText: "Available for new projects",
    titleLine1: "Crafting Seamless",
    titleLine2: "Android Experiences",
    subtitle: "Passionate Android Developer specializing in Kotlin, Jetpack Compose, and creating robust, scalable mobile applications that users love.",
    ctaPrimary: { label: "View Projects", href: "#projects" },
    ctaSecondary: { label: "Contact Me", href: "#contact" },
  },
  techStack: {
    sectionSubtitle: "Modern tools for high-performance apps.",
    resumeLink: { label: "View full resume", href: "#" },
    items: [
      { icon: "⌨️", title: "Kotlin & Java", desc: "Expert proficiency in modern Android languages and coroutines.", iconBg: "" },
      { icon: "🎨", title: "Jetpack Compose", desc: "Building declarative, reactive UIs for faster development.", iconBg: "" },
      { icon: "🏛️", title: "Clean Arch", desc: "MVVM, MVI patterns ensuring scalable codebases.", iconBg: "rgba(139,92,246,0.12)" },
      { icon: "🔧", title: "CI/CD & Tools", desc: "Gradle, Firebase, Git, and automated testing pipelines.", iconBg: "rgba(245,158,11,0.12)" },
    ],
  },
  aboutMe: {
    photoUrl: "",
    bio: [
      "Hi, my name is Febrian, an Android Developer with 3+ years of hands-on experience building modern Android applications. I'm a graduate of Game Technology student at Electronic Engineering Polytechnic Institute of Surabaya, I bring a strong technical foundation and a problem-solving mindset to every project.",
      "Expertise in Kotlin and Jetpack Compose, focusing on clean architecture, scalable systems, and intuitive user interfaces. I’m driven by continuous improvement and passionate about building apps that are not only functional, but thoughtfully engineered."
    ],
    stats: [
      { num: "3+", label: "Years Exp." },
      { num: "10+", label: "Apps Built" },
      { num: "10M+", label: "Users" },
      { num: "4.8", label: "Avg Rating" },
    ],
    highlights: [
      { icon: "📱", text: "Build native Android apps with Kotlin & Jetpack Compose" },
      { icon: "🏗️", text: "Architect scalable apps with Clean Architecture & MVVM" },
      { icon: "🔗", text: "Integrate REST APIs, Firebase, and third-party SDKs" },
      { icon: "🧪", text: "Write testable code with unit & UI tests (JUnit, Espresso)" },
    ],
    interests: [
      "Open Source", "Android Beta", "UI/UX", "Kotlin Coroutines",
      "Gaming", "Movie", "Coffee ☕", "Code"
    ],
  },
  projects: [
    {
      title: "StreamFlow App",
      tags: ["Kotlin", "ExoPlayer"],
      description: "A high-performance video streaming application featuring adaptive bitrate streaming, offline playback, and a custom UI built with Jetpack Compose.",
      caseStudyUrl: "#",
      projectUrl: "#",
      mockupType: "stream",
      imageUrl: "",
    },
    {
      title: "FitTrack Pro",
      tags: ["MVVM", "Room DB"],
      description: "Comprehensive fitness tracking app integrating Google Fit API, real-time step counting, and detailed chart visualizations for progress monitoring.",
      caseStudyUrl: "#",
      projectUrl: "#",
      mockupType: "ring",
      imageUrl: "",
    },
  ],
  experience: [
    {
      role: "Android Developer",
      company: "PT. VIRTUSEE PETA SUKSES",
      period: "Dec 2023 – Present",
      isCurrent: true,
      bullets: [
        "Led the migration of a legacy Java codebase to 100% Kotlin, reducing crash rates by 40%.",
        "Implemented a modular architecture using Dagger Hilt, improving build times by 25%.",
        "Mentored 3 junior developers and established code review guidelines.",
      ],
    },
    {
      role: "Android Developer",
      company: "Viuit",
      period: "Aug 2023 – Nov 2023",
      isCurrent: false,
      bullets: [
        "Developed and launched 5+ Android applications on the Google Play Store.",
        "Integrated RESTful APIs using Retrofit and handled local caching with Room.",
        "Collaborated closely with UX/UI designers to implement pixel-perfect designs.",
      ],
    },
    {
      role: "Android Developer Intern",
      company: "Berani Digital ID",
      period: "May 2022 – Dec 2022",
      isCurrent: false,
      bullets: [
        "Developed and launched 5+ Android applications on the Google Play Store.",
        "Integrated RESTful APIs using Retrofit and handled local caching with Room.",
        "Collaborated closely with UX/UI designers to implement pixel-perfect designs.",
      ],
    },
    {
      role: "Android Developer",
      company: "MSIB Kampus Merdeka",
      period: "Aug 2021 – Jan 2022",
      isCurrent: false,
      bullets: [
        "Developed and launched 5+ Android applications on the Google Play Store.",
        "Integrated RESTful APIs using Retrofit and handled local caching with Room.",
        "Collaborated closely with UX/UI designers to implement pixel-perfect designs.",
      ],
    },
  ],
  achievements: [],
  cta: {
    heading: "Ready to build something amazing?",
    subtext: "I'm currently available for freelance projects and open to full-time opportunities. Let's discuss how I can help your team.",
    buttonLabel: "Get in Touch",
    email: "febriandev@email.com",
  },
  social: {
    github: "https://github.com/FebrianDev",
    linkedin: "https://linkedin.com/in/",
  },
};

// Dekoratif Kode Latar Belakang Hero
const CODE = `<span class="cm">// StreamFlow Adaptive Bitrate</span>
<span class="kw">class</span> <span class="cls">VideoStreamManager</span>(
    <span class="kw">private val</span> <span class="fn">exoPlayer</span>: ExoPlayer
) {
    <span class="kw">fun</span> <span class="fn">initStream</span>(url: String) {
        <span class="kw">val</span> mediaItem = MediaItem.fromUri(url)
        <span class="kw">val</span> source = HlsMediaSource
            .Factory(dataSourceFactory)
            .createMediaSource(mediaItem)
        exoPlayer.<span class="fn">setMediaSource</span>(source)
        exoPlayer.<span class="fn">prepare</span>()
    }
}

// Clean Architecture ViewModel
<span class="kw">class</span> <span class="cls">DashboardViewModel</span> @HiltViewModel (
    <span class="kw">private val</span> <span class="fn">repo</span>: FitnessRepository
) : ViewModel() {
    <span class="kw">val</span> uiState: StateFlow&lt;UiState&gt; =
        repo.<span class="fn">observeSteps</span>()
            .<span class="fn">map</span> { steps -&gt; UiState.<span class="fn">Success</span>(steps) }
            .<span class="fn">stateIn</span>(viewModelScope, <span class="cls">SharingStarted</span>.Lazily, UiState.Loading)
}

// Compose UI Component
<span class="fn">@Composable</span>
<span class="kw">fun</span> <span class="fn">StepCounter</span>(steps: Int, goal: Int) {
    <span class="kw">val</span> progress = (steps.toFloat() / goal)
    <span class="cls">Column</span>(horizontalAlignment = <span class="cls">Alignment</span>.CenterHorizontally) {
        <span class="cls">CircularProgressIndicator</span>(progress = progress)
        <span class="cls">Text</span>(text = <span class="str">"$steps / $goal steps"</span>)
    }
}

// Room DB Entity
<span class="fn">@Entity</span>(tableName = <span class="str">"workouts"</span>)
<span class="kw">data class</span> <span class="cls">WorkoutEntity</span>(
    <span class="fn">@PrimaryKey</span>(autoGenerate = <span class="kw">true</span>) <span class="kw">val</span> id: Int = <span class="num">0</span>,
    <span class="kw">val</span> date: Long,
    <span class="kw">val</span> steps: Int,
    <span class="kw">val</span> calories: Float
)
`;

function buildMockup(type, imageUrl) {
  if (imageUrl) {
    return `<img src="${escapeHtml(imageUrl)}" alt="Project preview" class="project-custom-img" />`;
  }
  if (type === "stream") {
    return `
    <div class="phone-mockup">
      <div class="phone-inner">
        <div class="phone-landscape"></div>
        <div class="phone-nav-bar">
          <div class="phone-nav-item active"></div>
          <div class="phone-nav-item"></div>
          <div class="phone-nav-item"></div>
        </div>
      </div>
    </div>`;
  }
  if (type === "ring") {
    return `
    <div class="phone-mockup">
      <div class="phone-inner">
        <div class="ring-chart"><span>75%</span></div>
      </div>
    </div>`;
  }
  return "";
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ----------------------------------------------------
// FUNGSI RENDER SELURUH TAMPILAN KE DOM
// ----------------------------------------------------
function renderPortfolio(data) {
  // Page Title
  document.getElementById("page-title").textContent = `${data.name} | ${data.role}`;

  // Navbar
  document.getElementById("navbar").innerHTML = `
    <a href="#" class="nav-logo">
      <span class="logo-icon">${data.initials}</span>
      ${data.name} | ${data.role}
    </a>
    <ul class="nav-links">
      <li><a href="#about">Home</a></li>
      <li><a href="#about-me">About</a></li>
      <li><a href="#experience">Experience</a></li>
      ${data.achievements && data.achievements.length > 0 ? `<li><a href="#achievements">Achievements</a></li>` : ""}
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <a href="${data.resumeUrl}" class="btn btn-outline" target="_blank">Resume</a>
      <a href="#contact" class="btn btn-primary">Hire Me</a>
    </div>`;

  // Hero Background Code
  const codeBg = document.getElementById("code-bg");
  if (codeBg) codeBg.innerHTML = CODE + CODE;

  // Hero Content
  const h = data.hero;
  document.getElementById("hero-content").innerHTML = `
    <div class="status-badge"><span class="status-dot"></span>${escapeHtml(h.statusText)}</div>
    <h1 class="hero-title">${escapeHtml(h.titleLine1)}<br><span class="accent">${escapeHtml(h.titleLine2)}</span></h1>
    <p class="hero-sub">${escapeHtml(h.subtitle)}</p>
    <div class="hero-actions">
      <a href="${h.ctaPrimary.href}" class="btn btn-primary">${escapeHtml(h.ctaPrimary.label)}</a>
      <a href="${h.ctaSecondary.href}" class="btn btn-outline">${escapeHtml(h.ctaSecondary.label)}</a>
    </div>`;

  // About Me
  const am = data.aboutMe;
  const avatarEl = document.getElementById("about-avatar");
  if (avatarEl) {
    if (am.photoUrl) {
      avatarEl.innerHTML = `<img src="${escapeHtml(am.photoUrl)}" alt="${escapeHtml(data.name)}">`;
    } else {
      avatarEl.textContent = data.initials;
    }
  }

  document.getElementById("about-stats").innerHTML = (am.stats || [])
    .map((s) => `
    <div class="stat-card">
      <div class="stat-num">${escapeHtml(s.num)}</div>
      <div class="stat-label">${escapeHtml(s.label)}</div>
    </div>`)
    .join("");

  document.getElementById("about-bio").innerHTML = (am.bio || [])
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");

  document.getElementById("about-highlights").innerHTML = (am.highlights || [])
    .map((hl) => `
    <div class="highlight-item">
      <div class="highlight-icon">${hl.icon}</div>
      <span>${escapeHtml(hl.text)}</span>
    </div>`)
    .join("");

  document.getElementById("about-interests").innerHTML = (am.interests || [])
    .map((tag) => `<span class="interest-tag">${escapeHtml(tag)}</span>`)
    .join("");

  // Tech Stack
  const ts = data.techStack;
  document.getElementById("tech-header").innerHTML = `
    <div><h2>Tech Stack</h2><p>${escapeHtml(ts.sectionSubtitle)}</p></div>
    <a href="${data.resumeUrl}" class="view-link">${escapeHtml(ts.resumeLink.label)} →</a>`;

  document.getElementById("tech-grid").innerHTML = (ts.items || [])
    .map((item, i) => `
    <div class="tech-card fade-in stagger-${(i % 4) + 1}">
      <div class="tech-icon"${item.iconBg ? ` style="background:${item.iconBg}"` : ""}>${item.icon}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.desc)}</p>
    </div>`)
    .join("");

  // Projects (DARI SUPABASE)
  const projectsGrid = document.getElementById("projects-grid");
  if (data.projects && data.projects.length > 0) {
    projectsGrid.innerHTML = data.projects
      .map((p, i) => `
      <div class="project-card fade-in stagger-${(i % 2) + 1}">
        <div class="project-img project-img-${i % 4}">
          ${buildMockup(p.mockupType, p.imageUrl)}
          <div class="project-tags">
            ${(p.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          </div>
        </div>
        <div class="project-info">
          <div class="project-title-row">
            <h3>${escapeHtml(p.title)}</h3>
            ${p.projectUrl && p.projectUrl !== "#" ? `<a href="${p.projectUrl}" class="icon-link" target="_blank">↗</a>` : ""}
          </div>
          <p>${escapeHtml(p.description)}</p>
          ${p.caseStudyUrl && p.caseStudyUrl !== "#" ? `<a href="${p.caseStudyUrl}" class="case-link">View Case Study →</a>` : ""}
        </div>
      </div>`)
      .join("");
  } else {
    projectsGrid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;">Belum ada project yang diunggah.</p>`;
  }

  // Experience (DARI SUPABASE)
  const expList = document.getElementById("exp-list");
  if (data.experience && data.experience.length > 0) {
    expList.innerHTML = data.experience
      .map((exp) => `
      <div class="exp-item fade-in">
        <div class="exp-dot${exp.isCurrent ? " active" : ""}"></div>
        <div class="exp-body">
          <h3>${escapeHtml(exp.role)}</h3>
          <div class="exp-company">${escapeHtml(exp.company)}</div>
          <ul>${(exp.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
        </div>
        <div class="exp-date${exp.isCurrent ? " current" : ""}">${escapeHtml(exp.period)}</div>
      </div>`)
      .join("");
  } else {
    expList.innerHTML = `<p style="color:var(--text-muted);">Belum ada riwayat pengalaman.</p>`;
  }

  // Achievements (DARI SUPABASE)
  const achSection = document.getElementById("achievements");
  const achGrid = document.getElementById("achievements-grid");
  if (achSection && achGrid) {
    if (data.achievements && data.achievements.length > 0) {
      achSection.style.display = "block";
      achGrid.innerHTML = data.achievements
        .map((a, i) => `
        <div class="achieve-card fade-in stagger-${(i % 3) + 1}">
          ${a.imageUrl ? `<img src="${escapeHtml(a.imageUrl)}" alt="${escapeHtml(a.title)}" class="achieve-img" />` : ""}
          <div class="achieve-header-row">
            <span class="achieve-year">${escapeHtml(a.year || "")}</span>
            ${a.credentialUrl && a.credentialUrl !== "#" ? `<a href="${a.credentialUrl}" class="icon-link" target="_blank" title="Lihat Sertifikat">↗</a>` : ""}
          </div>
          <h3>${escapeHtml(a.title)}</h3>
          <div class="achieve-issuer">${escapeHtml(a.issuer || "")}</div>
          ${a.description ? `<p class="achieve-desc">${escapeHtml(a.description)}</p>` : ""}
          ${a.credentialUrl && a.credentialUrl !== "#" ? `<a href="${a.credentialUrl}" class="case-link" target="_blank">View Credential →</a>` : ""}
        </div>`)
        .join("");
    } else {
      achSection.style.display = "none";
    }
  }

  // CTA
  const c = data.cta;
  document.getElementById("cta-content").innerHTML = `
    <h2>${escapeHtml(c.heading)}</h2>
    <p>${escapeHtml(c.subtext)}</p>
    <a href="mailto:${escapeHtml(c.email)}" class="btn-cta">✉ ${escapeHtml(c.buttonLabel)}</a>`;

  // Footer
  const s = data.social;
  document.getElementById("footer").innerHTML = `
    <p>© ${data.year} ${escapeHtml(data.name)}. All rights reserved.</p>
    <div class="footer-links">
      <a href="${s.github}" title="GitHub" target="_blank">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      </a>
      <a href="${s.linkedin}" title="LinkedIn" target="_blank">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
    </div>`;

  // Animasi Scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  setTimeout(() => document.querySelector(".hero .fade-in")?.classList.add("visible"), 100);
}

// ----------------------------------------------------
// FUNGSI UTAMA: LOAD DATA LANGSUNG DARI SUPABASE
// ----------------------------------------------------
async function loadPortfolioFromSupabase() {
  if (!supabase) {
    console.warn("Supabase belum terkonfigurasi, menggunakan data fallback.");
    renderPortfolio(defaultData);
    return;
  }

  try {
    // 1. Fetch Profile Settings
    const { data: profile } = await supabase
      .from("profile_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (profile) {
      if (profile.status_text) defaultData.hero.statusText = profile.status_text;
      if (profile.hero_title_1) defaultData.hero.titleLine1 = profile.hero_title_1;
      if (profile.hero_title_2) defaultData.hero.titleLine2 = profile.hero_title_2;
      if (profile.hero_subtitle) defaultData.hero.subtitle = profile.hero_subtitle;
      if (profile.bio && profile.bio.length > 0) defaultData.aboutMe.bio = profile.bio;
      if (profile.email) defaultData.cta.email = profile.email;
      if (profile.resume_url) defaultData.resumeUrl = profile.resume_url;
      if (profile.github_url) defaultData.social.github = profile.github_url;
      if (profile.linkedin_url) defaultData.social.linkedin = profile.linkedin_url;
    }

    // 2. Fetch Projects langsung dari Supabase
    const { data: projects, error: projErr } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!projErr && projects) {
      defaultData.projects = projects.map((p) => ({
        id: p.id,
        title: p.title,
        tags: p.tags || [],
        description: p.description || "",
        caseStudyUrl: p.case_study_url || "#",
        projectUrl: p.project_url || "#",
        mockupType: p.mockup_type || "stream",
        imageUrl: p.image_url || "",
      }));
    }

    // 3. Fetch Experiences langsung dari Supabase
    const { data: experiences, error: expErr } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });

    if (!expErr && experiences) {
      defaultData.experience = experiences.map((exp) => ({
        id: exp.id,
        role: exp.role,
        company: exp.company,
        period: exp.period,
        isCurrent: Boolean(exp.is_current),
        bullets: exp.bullets || [],
      }));
    }

    // 4. Fetch Achievements langsung dari Supabase
    const { data: achievements, error: achErr } = await supabase
      .from("achievements")
      .select("*")
      .order("created_at", { ascending: false });

    if (!achErr && achievements) {
      defaultData.achievements = achievements.map((a) => ({
        id: a.id,
        title: a.title,
        issuer: a.issuer,
        year: a.year,
        description: a.description || "",
        credentialUrl: a.credential_url || "#",
        imageUrl: a.image_url || "",
      }));
    }
  } catch (err) {
    console.error("Gagal memuat data dari Supabase:", err);
  } finally {
    // Render data final dari Supabase ke tampilan web
    renderPortfolio(defaultData);
  }
}

// Jalankan pengambilan data saat halaman dimuat
loadPortfolioFromSupabase();

