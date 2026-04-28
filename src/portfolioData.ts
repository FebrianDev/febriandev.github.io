import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  home: {
    name: "Febrian",
    role: "Android Developer",
    biography: "Architecting high-performance, scalable mobile applications. Specializing in modern Android development with Kotlin and Jetpack Compose. I focus on building intuitive user interfaces and ensuring solid backend integration via modern asynchronous programming patterns.",
    skills: ["Kotlin", "Java", "Jetpack Compose", "Coroutines", "Dagger Hilt", "Room", "Clean Architecture"]
  },
  experience: [
    {
      title: "Android Developer",
      company: "Virtusee",
      duration: "Dec 2023 - Present",
      description: [
        "Spearheaded the migration of legacy XML layouts to Jetpack Compose, improving render times by 30%.",
        "Architected a modular app structure using clean architecture principles and Dagger Hilt for dependency injection.",
        "Mentored junior developers and conducted rigorous code reviews to maintain high quality standards."
      ],
      current: true
    },
    {
      title: "Android Developer",
      company: "Viuit",
      duration: "Aug 2023 - Nov 2023",
      description: [
        "Developed and maintained 5+ client applications from conception to Play Store deployment.",
        "Integrated complex REST APIs and optimized local database performance using Room.",
        "Implemented robust background processing using Kotlin Coroutines and WorkManager."
      ]
    },
    {
      title: "Android Developer Intern",
      company: "Berani Digital ID",
      duration: "Mei 2022 - Dec 2022",
      description: [
        "Developed and maintained 5+ client applications from conception to Play Store deployment.",
        "Integrated complex REST APIs and optimized local database performance using Room.",
        "Implemented robust background processing using Kotlin Coroutines and WorkManager."
      ]
    }
  ],
  projects: [
    {
      title: "FoodieApp",
      description: "A comprehensive restaurant discovery application featuring real-time availability, interactive maps, and a smooth booking flow built entirely with Compose.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7ed9d87083?q=80&w=800&auto=format&fit=crop",
      tech: ["Compose", "Firebase", "Maps SDK"],
      link: "https://github.com/",
      icon: "Utensils"
    },
    {
      title: "CryptoTracker",
      description: "A real-time cryptocurrency portfolio tracker. Utilizes WebSockets for live data feeds and custom Compose charts for visualizing market trends.",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop",
      tech: ["Kotlin", "Retrofit", "Room"],
      link: "https://github.com/",
      icon: "TrendingUp"
    },
    {
      title: "Vocabulary App",
      description: "AI-based vocabulary learning app designed for automated language acquisition and spaced repetition mastery.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
      tech: ["Kotlin", "Compose", "Room"],
      link: "https://github.com/",
      icon: "Book"
    }
  ],
  achievements: [
    {
      title: "Google Play Featured",
      subtitle: "Top Productivity Apps",
      year: "2022",
      description: "Lead developer for 'ZenFocus', featured in Top Productivity Apps for its innovative approach to task management."
    },
    {
      title: "Open Source Contributor",
      subtitle: "Major Android Libraries",
      year: "2020 - Present",
      description: "Active contributor to major Android libraries, focusing on performance optimizations and animation fluidity."
    },
    {
      title: "Associate Android Developer",
      subtitle: "Google Certification",
      year: "2021",
      description: "Official certification by Google demonstrating proficiency in modern Android development best practices."
    }
  ],
  socials: {
    email: "alex@example.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/"
  }
};
