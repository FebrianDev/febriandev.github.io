import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./config.js";
import {
  PORTFOLIO_DEFAULT_DATA,
  HERO_CODE_SNIPPET,
  applySupabaseProfileOverrides,
  isLegacySupabaseProjects,
  isLegacySupabaseExperiences,
} from "./portfolio-data.js";

const createClient = globalThis.supabase?.createClient;
const supabase =
  isSupabaseConfigured() && typeof createClient === "function"
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeUrl(url) {
  if (!url) return "#";
  const trimmed = String(url).trim();
  if (!trimmed || trimmed === "#") return "#";
  if (trimmed.startsWith("#") || trimmed.startsWith("/")) return trimmed;
  if (typeof URL === "undefined") {
    return /^(https?:\/\/|mailto:)/i.test(trimmed) ? trimmed : "#";
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:" || parsed.protocol === "mailto:") {
      return parsed.href;
    }
  } catch {
    return "#";
  }
  return "#";
}

const PROJECT_LOGO_SVGS = {
  field: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  qr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM17 17h4v4M14 21h3M21 14v3"/></svg>`,
  stream: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 4 20 12 6 20 6 4"/></svg>`,
  compose: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  bst: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M10.5 7L7 15.5M13.5 7L17 15.5"/></svg>`,
  ring: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>`,
};

function buildProjectBanner(project) {
  const safeImg = sanitizeUrl(project.imageUrl);
  if (safeImg !== "#") {
    return `<img src="${escapeHtml(safeImg)}" alt="${escapeHtml(project.title)} preview" class="project-custom-img" />`;
  }
  const svg = PROJECT_LOGO_SVGS[project.mockupType] || PROJECT_LOGO_SVGS.field;
  return `<div class="project-banner-mark" aria-hidden="true">${svg}</div>`;
}

function buildProjectLogo(project, index) {
  const safeIcon = sanitizeUrl(project.iconUrl);
  if (safeIcon !== "#") {
    return `
    <div class="project-logo has-img">
      <img src="${escapeHtml(safeIcon)}" alt="${escapeHtml(project.title)} logo" />
    </div>`;
  }
  const svg = PROJECT_LOGO_SVGS[project.mockupType] || PROJECT_LOGO_SVGS.field;
  return `
    <div class="project-logo project-logo-${index % 4}" aria-hidden="true">
      ${svg}
    </div>`;
}

function renderPortfolio(data) {
  const safeResumeUrl = sanitizeUrl(data.resumeUrl);
  const hasResumeUrl = safeResumeUrl !== "#";

  document.getElementById("page-title").textContent = `${data.name} | ${data.role}`;

  document.getElementById("navbar").innerHTML = `
    <a href="#" class="nav-logo">
      <span class="logo-icon">${escapeHtml(data.initials)}</span>
      ${escapeHtml(data.brandName || data.name)} | ${escapeHtml(data.role)}
    </a>
    <ul class="nav-links">
      <li><a href="#about">Home</a></li>
      <li><a href="#about-me">About</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#projects">Projects</a></li>
      ${data.achievements && data.achievements.length > 0 ? `<li><a href="#achievements">Achievements</a></li>` : ""}
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="nav-actions">
      ${hasResumeUrl ? `<a href="${escapeHtml(safeResumeUrl)}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Resume</a>` : ""}
      <a href="#contact" class="btn btn-primary">Hire Me</a>
    </div>`;

  const codeBg = document.getElementById("code-bg");
  if (codeBg) codeBg.innerHTML = HERO_CODE_SNIPPET + HERO_CODE_SNIPPET;

  const h = data.hero;
  document.getElementById("hero-content").innerHTML = `
    <div class="status-badge"><span class="status-dot"></span>${escapeHtml(h.statusText)}</div>
    <h1 class="hero-title">${escapeHtml(h.titleLine1)}<br><span class="accent">${escapeHtml(h.titleLine2)}</span></h1>
    <p class="hero-sub">${escapeHtml(h.subtitle)}</p>
    <div class="hero-actions">
      <a href="${escapeHtml(sanitizeUrl(h.ctaPrimary.href))}" class="btn btn-primary">${escapeHtml(h.ctaPrimary.label)}</a>
      <a href="${escapeHtml(sanitizeUrl(h.ctaSecondary.href))}" class="btn btn-outline">${escapeHtml(h.ctaSecondary.label)}</a>
    </div>`;

  const am = data.aboutMe;
  const avatarEl = document.getElementById("about-avatar");
  if (avatarEl) {
    const safePhoto = sanitizeUrl(am.photoUrl);
    if (safePhoto !== "#") {
      avatarEl.innerHTML = `<img src="${escapeHtml(safePhoto)}" alt="${escapeHtml(data.name)}">`;
    } else {
      avatarEl.textContent = data.initials;
    }
  }

  document.getElementById("about-stats").innerHTML = (am.stats || [])
    .map(
      (s) => `
    <div class="stat-card">
      <div class="stat-num">${escapeHtml(s.num)}</div>
      <div class="stat-label">${escapeHtml(s.label)}</div>
    </div>`
    )
    .join("");

  document.getElementById("about-bio").innerHTML = (am.bio || [])
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");

  const aboutEduEl = document.getElementById("about-education");
  if (aboutEduEl) {
    if (am.education) {
      aboutEduEl.style.display = "flex";
      aboutEduEl.innerHTML = `
        <span aria-hidden="true">${escapeHtml(am.education.icon || "🎓")}</span>
        <div><strong>${escapeHtml(am.education.institution)}</strong><br>${escapeHtml(am.education.summary)}</div>`;
    } else {
      aboutEduEl.style.display = "none";
    }
  }

  document.getElementById("about-highlights").innerHTML = (am.highlights || [])
    .map(
      (hl) => `
    <div class="highlight-item">
      <div class="highlight-icon">${escapeHtml(hl.icon)}</div>
      <span>${hl.label ? `<strong>${escapeHtml(hl.label)}:</strong> ` : ""}${escapeHtml(hl.text)}</span>
    </div>`
    )
    .join("");

  document.getElementById("about-interests").innerHTML = (am.interests || [])
    .map((tag) => `<span class="interest-tag">${escapeHtml(tag)}</span>`)
    .join("");

  const projectsGrid = document.getElementById("projects-grid");
  if (data.projects && data.projects.length > 0) {
    projectsGrid.innerHTML = data.projects
      .map((p, i) => {
        const safeProjUrl = sanitizeUrl(p.projectUrl);
        const safeCaseUrl = sanitizeUrl(p.caseStudyUrl);
        const projLabel = safeProjUrl.includes("play.google.com") ? "View on Google Play →" : "View Project →";
        return `
      <div class="project-card fade-in stagger-${(i % 2) + 1}">
        <div class="project-img project-img-${i % 4}">
          ${buildProjectBanner(p)}
        </div>
        <div class="project-info">
          <div class="project-card-top">
            ${buildProjectLogo(p, i)}
            <div class="project-head-meta">
              <div class="project-title-row">
                <h3>${escapeHtml(p.title)}</h3>
                ${safeProjUrl !== "#" ? `<a href="${escapeHtml(safeProjUrl)}" class="icon-link" target="_blank" rel="noopener noreferrer" title="${projLabel}">↗</a>` : ""}
              </div>
            </div>
          </div>
          <div class="project-tags">
            ${(p.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          </div>
          <p class="project-desc">${escapeHtml(p.description)}</p>
          ${
            safeProjUrl !== "#" || safeCaseUrl !== "#"
              ? `<div class="project-links">
                  ${safeProjUrl !== "#" ? `<a href="${escapeHtml(safeProjUrl)}" class="case-link" target="_blank" rel="noopener noreferrer">${projLabel}</a>` : ""}
                  ${safeCaseUrl !== "#" ? `<a href="${escapeHtml(safeCaseUrl)}" class="case-link" target="_blank" rel="noopener noreferrer">View Case Study →</a>` : ""}
                </div>`
              : ""
          }
        </div>
      </div>`;
      })
      .join("");
  } else {
    projectsGrid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;">No projects available yet.</p>`;
  }

  const expList = document.getElementById("exp-list");
  if (data.experience && data.experience.length > 0) {
    expList.innerHTML = data.experience
      .map(
        (exp) => `
      <div class="exp-item fade-in">
        <div class="exp-dot${exp.isCurrent ? " active" : ""}"></div>
        <div class="exp-body">
          <h3>${escapeHtml(exp.role)}</h3>
          <div class="exp-company">${escapeHtml(exp.company)}</div>
          <ul>${(exp.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
        </div>
        <div class="exp-date${exp.isCurrent ? " current" : ""}">${escapeHtml(exp.period)}</div>
      </div>`
      )
      .join("");
  } else {
    expList.innerHTML = `<p style="color:var(--text-muted);">No experience entries yet.</p>`;
  }

  const achSection = document.getElementById("achievements");
  const achGrid = document.getElementById("achievements-grid");
  if (achSection && achGrid) {
    if (data.achievements && data.achievements.length > 0) {
      achSection.style.display = "block";
      achGrid.innerHTML = data.achievements
        .map((a, i) => {
          const safeCredUrl = sanitizeUrl(a.credentialUrl);
          const safeAchImg = sanitizeUrl(a.imageUrl);
          return `
        <div class="achieve-card fade-in stagger-${(i % 3) + 1}">
          ${safeAchImg !== "#" ? `<img src="${escapeHtml(safeAchImg)}" alt="${escapeHtml(a.title)}" class="achieve-img" />` : ""}
          <div class="achieve-header-row">
            <span class="achieve-year">${escapeHtml(a.year || "")}</span>
            ${safeCredUrl !== "#" ? `<a href="${escapeHtml(safeCredUrl)}" class="icon-link" target="_blank" rel="noopener noreferrer" title="View Credential">↗</a>` : ""}
          </div>
          <h3>${escapeHtml(a.title)}</h3>
          <div class="achieve-issuer">${escapeHtml(a.issuer || "")}</div>
          ${a.description ? `<p class="achieve-desc">${escapeHtml(a.description)}</p>` : ""}
          ${safeCredUrl !== "#" ? `<a href="${escapeHtml(safeCredUrl)}" class="case-link" target="_blank" rel="noopener noreferrer">View Credential →</a>` : ""}
        </div>`;
        })
        .join("");
    } else {
      achSection.style.display = "none";
    }
  }

  const c = data.cta;
  document.getElementById("cta-content").innerHTML = `
    <h2>${escapeHtml(c.heading)}</h2>
    <p>${escapeHtml(c.subtext)}</p>
    <a href="mailto:${escapeHtml(c.email)}" class="btn-cta">✉ ${escapeHtml(c.buttonLabel)}</a>`;

  const s = data.social;
  document.getElementById("footer").innerHTML = `
    <p>© ${data.year} ${escapeHtml(data.name)}. All rights reserved.</p>
    <div class="footer-links">
      <a href="${escapeHtml(sanitizeUrl(s.github))}" title="GitHub" target="_blank" rel="noopener noreferrer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      </a>
      <a href="${escapeHtml(sanitizeUrl(s.linkedin))}" title="LinkedIn" target="_blank" rel="noopener noreferrer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
    </div>`;

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

async function loadPortfolioFromSupabase() {
  const portfolioData = JSON.parse(JSON.stringify(PORTFOLIO_DEFAULT_DATA));

  if (!supabase) {
    renderPortfolio(portfolioData);
    return;
  }

  try {
    const [profileRes, projRes, expRes, achRes] = await Promise.all([
      supabase.from("profile_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("projects").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
      supabase.from("experiences").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
      supabase.from("achievements").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
    ]);

    if (!profileRes.error && profileRes.data) {
      applySupabaseProfileOverrides(portfolioData, profileRes.data);
    }

    if (!projRes.error && projRes.data && !isLegacySupabaseProjects(projRes.data)) {
      const defaultIconByTitle = new Map(
        PORTFOLIO_DEFAULT_DATA.projects.map((item) => [item.title.toLowerCase(), item.iconUrl || ""])
      );
      const defaultIconByUrl = new Map(
        PORTFOLIO_DEFAULT_DATA.projects
          .filter((item) => item.projectUrl && item.projectUrl !== "#")
          .map((item) => [item.projectUrl, item.iconUrl || ""])
      );
      portfolioData.projects = projRes.data.map((p) => ({
        id: p.id,
        title: p.title,
        tags: p.tags || [],
        description: p.description || "",
        caseStudyUrl: p.case_study_url || "#",
        projectUrl: p.project_url || "#",
        mockupType: p.mockup_type || "field",
        imageUrl: p.image_url || "",
        iconUrl:
          p.icon_url ||
          defaultIconByUrl.get(p.project_url || "") ||
          defaultIconByTitle.get((p.title || "").toLowerCase()) ||
          "",
      }));
    }

    if (!expRes.error && expRes.data && !isLegacySupabaseExperiences(expRes.data)) {
      portfolioData.experience = expRes.data.map((exp) => ({
        id: exp.id,
        role: exp.role,
        company: exp.company,
        period: exp.period,
        isCurrent: Boolean(exp.is_current),
        bullets: exp.bullets || [],
      }));
    }

    if (!achRes.error && achRes.data && achRes.data.length > 0) {
      portfolioData.achievements = achRes.data.map((a) => ({
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
    renderPortfolio(portfolioData);
  }
}

loadPortfolioFromSupabase();
