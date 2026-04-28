import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  ArrowRight, 
  Briefcase, 
  LayoutGrid, 
  Award, 
  Download, 
  Mail, 
  Terminal as TerminalIcon, 
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Utensils,
  TrendingUp,
  Book,
  Instagram
} from 'lucide-react';
import { portfolioData } from './portfolioData';

const IconMap: Record<string, any> = {
  Utensils,
  TrendingUp,
  Book,
  Terminal: TerminalIcon
};

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
];

export default function App() {
  const { home, experience, projects, achievements, socials } = portfolioData;
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['home', 'experience', 'projects', 'achievements'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-primary scroll-smooth">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="text-lg font-bold tracking-tighter text-primary font-headline flex items-center gap-2">
            FebrianDev
          </div>
          <nav className="hidden md:flex gap-4 items-center font-headline text-sm font-semibold">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 transition-colors duration-300 ${
                  activeSection === item.id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <Terminal size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-on-primary font-bold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full flex flex-col gap-20">
        
        {/* Hero Section */}
        <motion.section 
          id="home"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="bg-surface rounded-2xl border border-outline p-8 md:p-12 flex flex-col gap-8 items-start">
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface">{home.name}</h1>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">{home.role}</h2>
            </div>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-5xl leading-relaxed">
              {home.biography}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {home.skills.map(skill => (
                <span key={skill} className="bg-surface-bright text-primary font-mono text-sm px-4 py-1.5 rounded-full border border-outline">
                  {skill}
                </span>
              ))}
            </div>
            <button 
              onClick={() => scrollToSection('projects')}
              className="mt-4 bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-3 group"
            >
              View Projects 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.section>

        {/* Experience Section */}
        <section id="experience" className="flex flex-col gap-8">
          <h3 className="text-3xl font-bold text-on-surface flex items-center gap-3">
            <Briefcase className="text-primary" /> Experience
          </h3>
          <div className="relative pl-8 timeline-line flex flex-col gap-10">
            {experience.map((exp, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className={`timeline-dot ${exp.current ? 'bg-primary' : 'bg-surface-variant'}`} />
                <div className="bg-surface border border-outline rounded-2xl p-8 hover:border-primary transition-all">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-on-surface">{exp.title}</h4>
                      <p className="text-lg font-semibold text-secondary">{exp.company}</p>
                    </div>
                    <span className="font-mono text-sm text-on-surface-variant bg-surface-bright px-3 py-1.5 rounded border border-outline">
                      {exp.duration}
                    </span>
                  </div>
                  <ul className="space-y-4 text-on-surface-variant text-lg">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-primary mt-1.5 whitespace-nowrap">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="flex flex-col gap-8">
          <h3 className="text-3xl font-bold text-on-surface flex items-center gap-3">
            <LayoutGrid className="text-primary" /> Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const Icon = IconMap[project.icon || 'LayoutGrid'] || LayoutGrid;
              return (
                <motion.div 
                  key={index}
                  className="bg-surface border border-outline rounded-2xl overflow-hidden flex flex-col group hover:border-primary transition-all"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                >
                  <div className="h-56 bg-surface-bright border-b border-outline relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    />
                    <Icon size={64} className="relative z-10 text-on-surface-variant group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <div className="p-8 flex flex-col gap-5 flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-2xl font-bold text-on-surface">{project.title}</h4>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    <p className="text-on-surface-variant text-lg leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(t => (
                        <span key={t} className="bg-surface-bright text-on-surface-variant font-mono text-xs px-3 py-1 rounded border border-outline">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="flex flex-col gap-8">
          <h3 className="text-3xl font-bold text-on-surface flex items-center gap-3">
            <Award className="text-primary" /> Achievements
          </h3>
          <div className="flex flex-col gap-6">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                className="bg-surface border border-outline rounded-2xl p-8 hover:border-primary transition-all"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-on-surface">{achievement.title}</h4>
                    <p className="text-lg font-semibold text-secondary">{achievement.subtitle}</p>
                  </div>
                  <span className="font-mono text-sm text-on-surface-variant bg-surface-bright px-3 py-1.5 rounded border border-outline">
                    {achievement.year}
                  </span>
                </div>
                <p className="text-on-surface-variant text-lg">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact/Resume Section */}
        <motion.section 
          id="contact"
          className="mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="bg-surface-variant border border-outline rounded-2xl p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h3 className="text-3xl font-bold text-on-surface">Looking for my Resume?</h3>
              <p className="text-lg text-on-surface-variant">Download my full professional history and technical expertise.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-3 whitespace-nowrap shadow-lg shadow-primary/10">
                <Download size={20} /> Resume
              </button>
              <div className="flex gap-3">
                <SocialLink href={`mailto:${socials.email}`} icon={<Mail />} title="Email" />
                <SocialLink href={socials.linkedin} icon={<Linkedin />} title="LinkedIn" />
                <SocialLink href={socials.github} icon={<Github />} title="GitHub" />
                {socials.instagram && <SocialLink href={socials.instagram} icon={<Instagram />} title="Instagram" />}
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-background border-t border-outline">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-8 max-max-w-7xl mx-auto w-full">
          <div className="text-on-surface-variant/60 font-headline text-sm tracking-widest uppercase">
            © 2024 Built with Precision. Powered by Android.
          </div>
          <div className="flex gap-8 text-on-surface-variant/60 font-headline text-sm tracking-widest uppercase">
            <a href={socials.github} className="hover:text-primary transition-colors">GitHub</a>
            <a href={socials.linkedin} className="hover:text-primary transition-colors">LinkedIn</a>
            <a href={socials.twitter} className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Source</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SocialLink({ href, icon, title }: { href: string; icon: React.ReactNode; title: string }) {
  return (
    <a 
      href={href} 
      className="bg-surface-bright border border-outline text-on-surface p-4 rounded-xl hover:border-primary hover:text-primary transition-all flex items-center justify-center hover:-translate-y-1"
      title={title}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {icon}
    </a>
  );
}


