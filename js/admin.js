import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./config.js";

// Inisialisasi Supabase Client
let supabase = null;
if (isSupabaseConfigured()) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Elemen DOM
const authSection = document.getElementById("auth-section");
const dashboardSection = document.getElementById("dashboard-section");
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");
const authAlert = document.getElementById("auth-alert");
const unconfiguredBanner = document.getElementById("supabase-unconfigured-banner");

// Tab Navigasi
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => (c.style.display = "none"));

    btn.classList.add("active");
    const targetId = btn.getAttribute("data-tab");
    const targetContent = document.getElementById(targetId);
    if (targetContent) targetContent.style.display = "block";
  });
});

// Cek apakah Supabase sudah diatur
if (!isSupabaseConfigured()) {
  if (unconfiguredBanner) unconfiguredBanner.style.display = "block";
}

// ----------------------------------------------------
// 1. AUTENTIKASI (LOGIN & LOGOUT)
// ----------------------------------------------------
async function checkAuth() {
  if (!supabase) return;

  const { data: { session } } = await supabase.auth.getSession();
  renderAuthState(session);

  supabase.auth.onAuthStateChange((_event, session) => {
    renderAuthState(session);
  });
}

function renderAuthState(session) {
  if (session) {
    authSection.style.display = "none";
    dashboardSection.style.display = "block";
    btnLogout.style.display = "inline-flex";
    loadAllDashboardData();
  } else {
    authSection.style.display = "flex";
    dashboardSection.style.display = "none";
    btnLogout.style.display = "none";
  }
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!supabase) {
    showAuthError("Konfigurasi Supabase belum diisi di supabase-config.js!");
    return;
  }

  btnLogin.disabled = true;
  btnLogin.innerHTML = '<span class="loading-spinner"></span> Masuk...';
  hideAuthError();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail.value.trim(),
      password: loginPassword.value,
    });

    if (error) {
      showAuthError("Login gagal: " + error.message);
    }
  } catch (err) {
    showAuthError("Terjadi kesalahan: " + err.message);
  } finally {
    btnLogin.disabled = false;
    btnLogin.innerHTML = "Masuk ke Dashboard";
  }
});

btnLogout.addEventListener("click", async () => {
  if (supabase) {
    await supabase.auth.signOut();
  }
});

function showAuthError(msg) {
  authAlert.textContent = msg;
  authAlert.style.display = "block";
}
function hideAuthError() {
  authAlert.style.display = "none";
}

function loadAllDashboardData() {
  loadProjects();
  loadExperience();
  loadAchievements();
  loadProfile();
}

// ----------------------------------------------------
// 2. KELOLA PROJECTS (CRUD + IMAGE UPLOAD)
// ----------------------------------------------------
const projectsList = document.getElementById("projects-list");
const modalProject = document.getElementById("modal-project");
const projectForm = document.getElementById("project-form");
const btnAddProject = document.getElementById("btn-add-project");
const btnCancelProject = document.getElementById("btn-cancel-project");
const btnCloseProjectModal = document.getElementById("btn-close-project-modal");
const btnSaveProject = document.getElementById("btn-save-project");

let currentProjects = [];

async function loadProjects() {
  if (!supabase) return;
  projectsList.innerHTML = '<p style="color: var(--text-muted);">Memuat project...</p>';

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    projectsList.innerHTML = `<p class="alert alert-danger">Gagal memuat: ${error.message}</p>`;
    return;
  }

  currentProjects = data || [];
  if (currentProjects.length === 0) {
    projectsList.innerHTML = '<p style="color: var(--text-muted);">Belum ada project. Klik "+ Tambah Project" untuk membuat baru.</p>';
    return;
  }

  projectsList.innerHTML = currentProjects
    .map((p) => {
      const tagsHtml = (p.tags || [])
        .map((t) => `<span class="item-tag">${escapeHtml(t)}</span>`)
        .join("");

      const previewHtml = p.image_url
        ? `<img src="${p.image_url}" alt="${escapeHtml(p.title)}" class="item-img-preview" />`
        : `<div style="height:80px;background:var(--card);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--text-muted);margin-bottom:12px;font-size:12px;">Mockup: ${p.mockup_type || 'default'}</div>`;

      return `
      <div class="item-card">
        ${previewHtml}
        <div class="item-header">
          <div class="item-title">${escapeHtml(p.title)}</div>
        </div>
        <div class="item-tags">${tagsHtml}</div>
        <p class="item-desc">${escapeHtml(p.description || "")}</p>
        <div class="item-actions">
          <button class="btn btn-outline btn-sm" onclick="window.editProject('${p.id}')">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" onclick="window.deleteProject('${p.id}')">🗑️ Hapus</button>
        </div>
      </div>`;
    })
    .join("");
}

// Buka Modal Tambah Project
btnAddProject.addEventListener("click", () => {
  projectForm.reset();
  document.getElementById("proj-id").value = "";
  document.getElementById("proj-current-image").value = "";
  document.getElementById("modal-project-title").textContent = "Tambah Project Baru";
  modalProject.classList.add("active");
});

function closeProjectModal() {
  modalProject.classList.remove("active");
}
btnCancelProject.addEventListener("click", closeProjectModal);
btnCloseProjectModal.addEventListener("click", closeProjectModal);

// Edit Project
window.editProject = function (id) {
  const p = currentProjects.find((item) => item.id === id);
  if (!p) return;

  document.getElementById("proj-id").value = p.id;
  document.getElementById("proj-title").value = p.title || "";
  document.getElementById("proj-tags").value = (p.tags || []).join(", ");
  document.getElementById("proj-desc").value = p.description || "";
  document.getElementById("proj-url").value = p.project_url || "";
  document.getElementById("proj-case-url").value = p.case_study_url || "";
  document.getElementById("proj-mockup-type").value = p.mockup_type || "stream";
  document.getElementById("proj-current-image").value = p.image_url || "";
  document.getElementById("proj-image-file").value = "";

  document.getElementById("modal-project-title").textContent = "Edit Project";
  modalProject.classList.add("active");
};

// Hapus Project
window.deleteProject = async function (id) {
  if (!confirm("Apakah kamu yakin ingin menghapus project ini?")) return;
  if (!supabase) return;

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    alert("Gagal menghapus: " + error.message);
  } else {
    loadProjects();
  }
};

// Submit Simpan Project (Insert / Update)
projectForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!supabase) return;

  btnSaveProject.disabled = true;
  btnSaveProject.innerHTML = '<span class="loading-spinner"></span> Menyimpan...';

  const id = document.getElementById("proj-id").value;
  const title = document.getElementById("proj-title").value.trim();
  const tags = document
    .getElementById("proj-tags")
    .value.split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const description = document.getElementById("proj-desc").value.trim();
  const project_url = document.getElementById("proj-url").value.trim() || "#";
  const case_study_url = document.getElementById("proj-case-url").value.trim() || "#";
  const mockup_type = document.getElementById("proj-mockup-type").value;
  let image_url = document.getElementById("proj-current-image").value;

  const fileInput = document.getElementById("proj-image-file");
  const file = fileInput.files[0];

  // Upload gambar ke Supabase Storage jika ada file dipilih
  if (file) {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `projects/${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("portfolio-assets")
        .upload(fileName, file, { cacheControl: "3600", upsert: true });

      if (uploadError) {
        alert("Gagal upload gambar: " + uploadError.message);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from("portfolio-assets")
          .getPublicUrl(fileName);
        image_url = publicUrlData.publicUrl;
      }
    } catch (err) {
      console.error("Storage upload error:", err);
    }
  }

  const payload = {
    title,
    tags,
    description,
    project_url,
    case_study_url,
    mockup_type,
    image_url,
  };

  let error = null;
  if (id) {
    // Update
    const res = await supabase.from("projects").update(payload).eq("id", id);
    error = res.error;
  } else {
    // Insert
    const res = await supabase.from("projects").insert([payload]);
    error = res.error;
  }

  btnSaveProject.disabled = false;
  btnSaveProject.innerHTML = "Simpan Project";

  if (error) {
    alert("Gagal menyimpan project: " + error.message);
  } else {
    closeProjectModal();
    loadProjects();
  }
});

// ----------------------------------------------------
// 3. KELOLA EXPERIENCE (CRUD)
// ----------------------------------------------------
const experienceList = document.getElementById("experience-list");
const modalExp = document.getElementById("modal-experience");
const expForm = document.getElementById("experience-form");
const btnAddExp = document.getElementById("btn-add-experience");
const btnCancelExp = document.getElementById("btn-cancel-exp");
const btnCloseExpModal = document.getElementById("btn-close-exp-modal");
const btnSaveExp = document.getElementById("btn-save-exp");

let currentExperience = [];

async function loadExperience() {
  if (!supabase) return;
  experienceList.innerHTML = '<p style="color: var(--text-muted);">Memuat pengalaman...</p>';

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    experienceList.innerHTML = `<p class="alert alert-danger">Gagal memuat: ${error.message}</p>`;
    return;
  }

  currentExperience = data || [];
  if (currentExperience.length === 0) {
    experienceList.innerHTML = '<p style="color: var(--text-muted);">Belum ada riwayat pengalaman.</p>';
    return;
  }

  experienceList.innerHTML = currentExperience
    .map((exp) => {
      const bulletsHtml = (exp.bullets || [])
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join("");

      return `
      <div class="item-card">
        <div class="item-header">
          <div class="item-title">${escapeHtml(exp.role)}</div>
          <span class="badge-admin">${exp.is_current ? "Current" : "Past"}</span>
        </div>
        <div class="item-subtitle">${escapeHtml(exp.company)} (${escapeHtml(exp.period)})</div>
        <ul style="padding-left:18px;color:var(--text-muted);font-size:12px;margin-bottom:14px;">
          ${bulletsHtml}
        </ul>
        <div class="item-actions">
          <button class="btn btn-outline btn-sm" onclick="window.editExperience('${exp.id}')">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" onclick="window.deleteExperience('${exp.id}')">🗑️ Hapus</button>
        </div>
      </div>`;
    })
    .join("");
}

btnAddExp.addEventListener("click", () => {
  expForm.reset();
  document.getElementById("exp-id").value = "";
  document.getElementById("modal-exp-title").textContent = "Tambah Pengalaman Baru";
  modalExp.classList.add("active");
});

function closeExpModal() {
  modalExp.classList.remove("active");
}
btnCancelExp.addEventListener("click", closeExpModal);
btnCloseExpModal.addEventListener("click", closeExpModal);

window.editExperience = function (id) {
  const exp = currentExperience.find((item) => item.id === id);
  if (!exp) return;

  document.getElementById("exp-id").value = exp.id;
  document.getElementById("exp-role").value = exp.role || "";
  document.getElementById("exp-company").value = exp.company || "";
  document.getElementById("exp-period").value = exp.period || "";
  document.getElementById("exp-is-current").checked = !!exp.is_current;
  document.getElementById("exp-bullets").value = (exp.bullets || []).join("\n");

  document.getElementById("modal-exp-title").textContent = "Edit Pengalaman";
  modalExp.classList.add("active");
};

window.deleteExperience = async function (id) {
  if (!confirm("Hapus pengalaman ini?")) return;
  if (!supabase) return;

  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) {
    alert("Gagal menghapus: " + error.message);
  } else {
    loadExperience();
  }
};

expForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!supabase) return;

  btnSaveExp.disabled = true;
  btnSaveExp.innerHTML = '<span class="loading-spinner"></span> Menyimpan...';

  const id = document.getElementById("exp-id").value;
  const role = document.getElementById("exp-role").value.trim();
  const company = document.getElementById("exp-company").value.trim();
  const period = document.getElementById("exp-period").value.trim();
  const is_current = document.getElementById("exp-is-current").checked;
  const bullets = document
    .getElementById("exp-bullets")
    .value.split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  const payload = {
    role,
    company,
    period,
    is_current,
    bullets,
  };

  let error = null;
  if (id) {
    const res = await supabase.from("experiences").update(payload).eq("id", id);
    error = res.error;
  } else {
    const res = await supabase.from("experiences").insert([payload]);
    error = res.error;
  }

  btnSaveExp.disabled = false;
  btnSaveExp.innerHTML = "Simpan Pengalaman";

  if (error) {
    alert("Gagal menyimpan pengalaman: " + error.message);
  } else {
    closeExpModal();
    loadExperience();
  }
});

// ----------------------------------------------------
// 3.5. KELOLA ACHIEVEMENTS (CRUD + IMAGE UPLOAD)
// ----------------------------------------------------
const achievementsList = document.getElementById("achievements-list");
const modalAchieve = document.getElementById("modal-achievement");
const achieveForm = document.getElementById("achievement-form");
const btnAddAchieve = document.getElementById("btn-add-achievement");
const btnCancelAchieve = document.getElementById("btn-cancel-achieve");
const btnCloseAchieveModal = document.getElementById("btn-close-achieve-modal");
const btnSaveAchieve = document.getElementById("btn-save-achieve");

let currentAchievements = [];

async function loadAchievements() {
  if (!supabase) return;
  achievementsList.innerHTML = '<p style="color: var(--text-muted);">Memuat prestasi...</p>';

  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    achievementsList.innerHTML = `<p class="alert alert-danger">Gagal memuat: ${error.message}</p>`;
    return;
  }

  currentAchievements = data || [];
  if (currentAchievements.length === 0) {
    achievementsList.innerHTML = '<p style="color: var(--text-muted);">Belum ada data prestasi / sertifikasi.</p>';
    return;
  }

  achievementsList.innerHTML = currentAchievements
    .map((item) => {
      const previewImg = item.image_url
        ? `<img src="${item.image_url}" alt="${escapeHtml(item.title)}" class="item-img-preview" />`
        : "";

      return `
      <div class="item-card">
        ${previewImg}
        <div class="item-header">
          <div class="item-title">${escapeHtml(item.title)}</div>
          <span class="badge-admin">${escapeHtml(item.year || "")}</span>
        </div>
        <div class="item-subtitle">${escapeHtml(item.issuer || "")}</div>
        <p class="item-desc">${escapeHtml(item.description || "")}</p>
        ${
          item.credential_url && item.credential_url !== "#"
            ? `<div style="margin-bottom:12px;"><a href="${item.credential_url}" target="_blank" style="font-size:12px;">🔗 Lihat Kredensial &rarr;</a></div>`
            : ""
        }
        <div class="item-actions">
          <button class="btn btn-outline btn-sm" onclick="window.editAchievement('${item.id}')">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" onclick="window.deleteAchievement('${item.id}')">🗑️ Hapus</button>
        </div>
      </div>`;
    })
    .join("");
}

btnAddAchieve.addEventListener("click", () => {
  achieveForm.reset();
  document.getElementById("achieve-id").value = "";
  document.getElementById("achieve-current-image").value = "";
  document.getElementById("modal-achieve-title").textContent = "Tambah Prestasi / Sertifikat";
  modalAchieve.classList.add("active");
});

function closeAchieveModal() {
  modalAchieve.classList.remove("active");
}
btnCancelAchieve.addEventListener("click", closeAchieveModal);
btnCloseAchieveModal.addEventListener("click", closeAchieveModal);

window.editAchievement = function (id) {
  const item = currentAchievements.find((a) => a.id === id);
  if (!item) return;

  document.getElementById("achieve-id").value = item.id;
  document.getElementById("achieve-title").value = item.title || "";
  document.getElementById("achieve-issuer").value = item.issuer || "";
  document.getElementById("achieve-year").value = item.year || "";
  document.getElementById("achieve-desc").value = item.description || "";
  document.getElementById("achieve-url").value = item.credential_url || "";
  document.getElementById("achieve-current-image").value = item.image_url || "";
  document.getElementById("achieve-image-file").value = "";

  document.getElementById("modal-achieve-title").textContent = "Edit Prestasi / Sertifikat";
  modalAchieve.classList.add("active");
};

window.deleteAchievement = async function (id) {
  if (!confirm("Hapus prestasi ini?")) return;
  if (!supabase) return;

  const { error } = await supabase.from("achievements").delete().eq("id", id);
  if (error) {
    alert("Gagal menghapus: " + error.message);
  } else {
    loadAchievements();
  }
};

achieveForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!supabase) return;

  btnSaveAchieve.disabled = true;
  btnSaveAchieve.innerHTML = '<span class="loading-spinner"></span> Menyimpan...';

  const id = document.getElementById("achieve-id").value;
  const title = document.getElementById("achieve-title").value.trim();
  const issuer = document.getElementById("achieve-issuer").value.trim();
  const year = document.getElementById("achieve-year").value.trim();
  const description = document.getElementById("achieve-desc").value.trim();
  const credential_url = document.getElementById("achieve-url").value.trim() || "#";
  let image_url = document.getElementById("achieve-current-image").value;

  const fileInput = document.getElementById("achieve-image-file");
  const file = fileInput.files[0];

  if (file) {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `achievements/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-assets")
        .upload(fileName, file, { cacheControl: "3600", upsert: true });

      if (uploadError) {
        alert("Gagal upload gambar: " + uploadError.message);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from("portfolio-assets")
          .getPublicUrl(fileName);
        image_url = publicUrlData.publicUrl;
      }
    } catch (err) {
      console.error("Storage upload error:", err);
    }
  }

  const payload = {
    title,
    issuer,
    year,
    description,
    credential_url,
    image_url,
  };

  let error = null;
  if (id) {
    const res = await supabase.from("achievements").update(payload).eq("id", id);
    error = res.error;
  } else {
    const res = await supabase.from("achievements").insert([payload]);
    error = res.error;
  }

  btnSaveAchieve.disabled = false;
  btnSaveAchieve.innerHTML = "Simpan Prestasi";

  if (error) {
    alert("Gagal menyimpan prestasi: " + error.message);
  } else {
    closeAchieveModal();
    loadAchievements();
  }
});

// ----------------------------------------------------
// 4. PROFILE & SETTINGS
// ----------------------------------------------------
const profileForm = document.getElementById("profile-form");
const btnSaveProfile = document.getElementById("btn-save-profile");

async function loadProfile() {
  if (!supabase) return;

  const { data, error } = await supabase
    .from("profile_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (data) {
    document.getElementById("prof-status").value = data.status_text || "";
    document.getElementById("prof-hero-t1").value = data.hero_title_1 || "";
    document.getElementById("prof-hero-t2").value = data.hero_title_2 || "";
    document.getElementById("prof-hero-sub").value = data.hero_subtitle || "";
    document.getElementById("prof-bio").value = (data.bio || []).join("\n\n");
    document.getElementById("prof-email").value = data.email || "";
    document.getElementById("prof-resume").value = data.resume_url || "";
    document.getElementById("prof-github").value = data.github_url || "";
    document.getElementById("prof-linkedin").value = data.linkedin_url || "";
  }
}

profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!supabase) return;

  btnSaveProfile.disabled = true;
  btnSaveProfile.innerHTML = '<span class="loading-spinner"></span> Menyimpan...';

  const status_text = document.getElementById("prof-status").value.trim();
  const hero_title_1 = document.getElementById("prof-hero-t1").value.trim();
  const hero_title_2 = document.getElementById("prof-hero-t2").value.trim();
  const hero_subtitle = document.getElementById("prof-hero-sub").value.trim();
  const bio = document
    .getElementById("prof-bio")
    .value.split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const email = document.getElementById("prof-email").value.trim();
  const resume_url = document.getElementById("prof-resume").value.trim();
  const github_url = document.getElementById("prof-github").value.trim();
  const linkedin_url = document.getElementById("prof-linkedin").value.trim();

  const payload = {
    id: 1,
    status_text,
    hero_title_1,
    hero_title_2,
    hero_subtitle,
    bio,
    email,
    resume_url,
    github_url,
    linkedin_url,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("profile_settings").upsert(payload);

  btnSaveProfile.disabled = false;
  btnSaveProfile.innerHTML = "Simpan Perubahan Profil";

  if (error) {
    alert("Gagal menyimpan profil: " + error.message);
  } else {
    alert("Profil berhasil diperbarui!");
  }
});

// ----------------------------------------------------
// 5. SEED DATA OTOMATIS (MENGUNGGAH DATA BAWAAN KE SUPABASE)
// ----------------------------------------------------
const btnSeed = document.getElementById("btn-seed-data");
const seedStatus = document.getElementById("seed-status");

btnSeed.addEventListener("click", async () => {
  if (!supabase) {
    alert("Supabase belum terkonfigurasi!");
    return;
  }

  if (!confirm("Upload data bawaan dari index.html ke Supabase sekarang?")) return;

  btnSeed.disabled = true;
  seedStatus.innerHTML = '<span class="loading-spinner"></span> Sedang mengunggah data bawaan...';

  try {
    // 1. Projects bawaan
    const defaultProjects = [
      {
        title: "StreamFlow App",
        tags: ["Kotlin", "ExoPlayer"],
        description: "A high-performance video streaming application featuring adaptive bitrate streaming, offline playback, and a custom UI built with Jetpack Compose.",
        case_study_url: "#",
        project_url: "#",
        mockup_type: "stream",
        image_url: "",
      },
      {
        title: "FitTrack Pro",
        tags: ["MVVM", "Room DB"],
        description: "Comprehensive fitness tracking app integrating Google Fit API, real-time step counting, and detailed chart visualizations for progress monitoring.",
        case_study_url: "#",
        project_url: "#",
        mockup_type: "ring",
        image_url: "",
      },
    ];

    // 2. Experience bawaan
    const defaultExp = [
      {
        role: "Android Developer",
        company: "PT. VIRTUSEE PETA SUKSES",
        period: "Dec 2023 – Present",
        is_current: true,
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
        is_current: false,
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
        is_current: false,
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
        is_current: false,
        bullets: [
          "Developed and launched 5+ Android applications on the Google Play Store.",
          "Integrated RESTful APIs using Retrofit and handled local caching with Room.",
          "Collaborated closely with UX/UI designers to implement pixel-perfect designs.",
        ],
      },
    ];

    // 3. Profile bawaan
    const defaultProfile = {
      id: 1,
      status_text: "Available for new projects",
      hero_title_1: "Crafting Seamless",
      hero_title_2: "Android Experiences",
      hero_subtitle: "Passionate Android Developer specializing in Kotlin, Jetpack Compose, and creating robust, scalable mobile applications that users love.",
      bio: [
        "Hi, my name is Febrian, an Android Developer with 3+ years of hands-on experience building modern Android applications. I'm a graduate of Game Technology student at Electronic Engineering Polytechnic Institute of Surabaya, I bring a strong technical foundation and a problem-solving mindset to every project.",
        "Expertise in Kotlin and Jetpack Compose, focusing on clean architecture, scalable systems, and intuitive user interfaces. I’m driven by continuous improvement and passionate about building apps that are not only functional, but thoughtfully engineered.",
      ],
      email: "johndoe@email.com",
      resume_url: "#",
      github_url: "https://github.com/",
      linkedin_url: "https://linkedin.com/in/",
    };

    // Insert to Supabase
    await supabase.from("projects").insert(defaultProjects);
    await supabase.from("experiences").insert(defaultExp);
    await supabase.from("profile_settings").upsert(defaultProfile);

    seedStatus.innerHTML = '<span style="color: var(--success);">✅ Berhasil mengunggah semua data bawaan ke Supabase!</span>';
    loadAllDashboardData();
  } catch (err) {
    seedStatus.innerHTML = `<span style="color: var(--danger);">❌ Gagal mengunggah: ${err.message}</span>`;
  } finally {
    btnSeed.disabled = false;
  }
});

// Helper XSS Safe
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Inisialisasi saat script dimuat
checkAuth();

