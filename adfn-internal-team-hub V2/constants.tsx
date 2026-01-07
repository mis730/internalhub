
import { HubData } from './types';

export const INITIAL_DATA: HubData = {
  config: {
    logoUrl: "https://picsum.photos/200/60?text=ADFN+Hub",
    bgImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000", // Default: Nutrition/Food theme
    accentColor: "#4f46e5",
    footerText: "© 2025 Amrit Deol Fitness & Nutrition. Internal Team Ecosystem.",
    adminPasscode: "1234",
    announcement: "🍎 Q1 Nutrition Protocols are now live in the Resource Hub. Team leads, please sync by Friday."
  },
  departments: [
    {
      id: "sales",
      name: "Growth & Acquisition",
      description: "Driving global health impact through strategic enrollment and outreach.",
      responsibilities: ["Lead qualification", "Enrollment strategy", "Market expansion"],
      leadId: "emp1",
      icon: "TrendingUp"
    },
    {
      id: "dietetics",
      name: "Clinical Nutrition",
      description: "Expert-led dietary intervention and physiological health optimization.",
      responsibilities: ["Metabolic health planning", "Clinical data analysis", "Client coaching"],
      leadId: "emp2",
      icon: "Apple"
    },
    {
      id: "ops",
      name: "Operations & Logistics",
      description: "Ensuring seamless delivery of the ADFN experience through technology and process.",
      responsibilities: ["Platform maintenance", "Internal workflow audits", "Renewal systems"],
      leadId: "emp3",
      icon: "Settings"
    }
  ],
  employees: [
    {
      id: "emp1",
      name: "Amrit Deol",
      role: "Founder & CEO",
      deptId: "ops",
      team: "Executive",
      managerId: null,
      email: "amrit@adfn.com",
      phone: "+1-555-0101",
      location: "San Francisco",
      photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
      bio: "Visionary behind ADFN, focusing on bridging the gap between clinical science and fitness results.",
      skills: ["Strategy", "Nutrition", "Leadership"]
    },
    {
      id: "emp2",
      name: "Sarah Chen",
      role: "Head of Nutrition",
      deptId: "dietetics",
      team: "Clinical",
      managerId: "emp1",
      email: "sarah@adfn.com",
      phone: "+1-555-0102",
      location: "Remote",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      bio: "Registered Dietitian with a decade of experience in hormonal health and metabolic syndrome.",
      skills: ["Clinical Nutrition", "Team Management"]
    },
    {
      id: "emp3",
      name: "Marcus Johnson",
      role: "Director of Operations",
      deptId: "ops",
      team: "Execution",
      managerId: "emp1",
      email: "marcus@adfn.com",
      phone: "+1-555-0103",
      location: "New York",
      photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
      bio: "Process efficiency expert dedicated to building scalable health-tech solutions.",
      skills: ["Six Sigma", "System Design", "Agile"]
    },
    {
      id: "emp4",
      name: "Elena Rodriguez",
      role: "Senior Clinical Dietitian",
      deptId: "dietetics",
      team: "Clinical",
      managerId: "emp2",
      email: "elena@adfn.com",
      phone: "+1-555-0104",
      location: "Miami",
      photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
      bio: "Specialist in gut-brain axis and performance-based nutrition.",
      skills: ["Keto", "Diabetes Management"]
    }
  ],
  workflow: [
    {
      id: "wf1",
      order: 1,
      title: "Discovery & Analysis",
      ownerDept: "sales",
      inputs: "Inbound health inquiries",
      outputs: "Comprehensive health profile",
      tools: ["CRM", "Health Questionnaire"],
      sla: "24 hours",
      description: "Initial clinical vetting to ensure alignment with ADFN protocols."
    },
    {
      id: "wf2",
      order: 2,
      title: "Plan Formulation",
      ownerDept: "dietetics",
      inputs: "Vetted Health Profile",
      outputs: "Customized Macro/Micro Plan",
      tools: ["Nutritional Analysis Engine", "ADFN Labs"],
      sla: "48 hours",
      description: "Scientific calculation of dietary requirements based on user biomarkers."
    },
    {
      id: "wf3",
      order: 3,
      title: "Delivery & Tracking",
      ownerDept: "ops",
      inputs: "Approved Nutrition Plan",
      outputs: "Active App Membership",
      tools: ["User Portal", "Engagement Dashboard"],
      sla: "Instant",
      description: "Provisioning digital tools and connecting the user with their coach."
    }
  ],
  resources: [
    {
      id: "res1",
      category: "SOPs",
      name: "Nutrition Intake Protocol",
      url: "https://example.com/sop-nutrition",
      description: "Standard operating procedure for clinical onboarding."
    },
    {
      id: "res2",
      category: "Tools",
      name: "Operational Dashboard",
      url: "https://example.com/ops-dash",
      description: "Internal metrics and system health tracking."
    }
  ]
};
