export interface Project {
  date: string;
  title: string;
  image: string | null;
  description: string;
  links: Array<{ label: string; url: string }>;
}

export const projects: Project[] = [
  {
    date: "2025-05-11",
    title: "Pulsespot AI",
    image: "/projects/projects_pulse.png",
    description:
      "Built a sales and revenue intelligence platform w/ Next, FastAPI, Redis. Uses an async LLM-powered email ingestion pipeline that processes ~10k emails / day to generate real-time account intelligence reports. Currently in beta with a publicly traded biotech company.",
    links: [
      // {
      //   label: "learn more about pulse",
      //   url: "https://pulsespot.ai",
      // },
    ],
  },
  {
    date: "2025-04-11",
    title: "froura",
    image: "/projects/projects_froura.png",
    description:
      "Letting AI agents pay for stuff on the internet, or an agent-native payment layer for secure real-money transactions. Optimized for minimal human input while ensuring full user control and transparency. Designed for secure, frictionless agent commerce across real-world internet use cases.",
    links: [
      {
        label: "our demo for ycombinator",
        url: "https://www.youtube.com/watch?v=LHY-Jbf44a8",
      },
    ],
  },
  {
    date: "2025-02-10",
    title: "Financier",
    image: "/projects/projects_financier.png",
    description:
      "Building code and LLM orchestration agents at Financier across data room breakdowns, deal analysis, lender matching, user onboarding and marketing.",
    links: [
      {
        label: "learn more about financier",
        url: "https://www.fncr.com",
      },
    ],
  },
  {
    date: "2024-12-10",
    title: "Financial Chatbot",
    image: "/projects/projects_finchat.png",
    description:
      "Worked with the US's largest provider of financial metrics (NDA) to transform 40M raw text records into a 28GB optimized SQL database using GPUs. Built a fine-tuned chatbot layer that retreives relevant information within ~10 seconds through dynamic Elastic Query DSL generation.",
    links: [],
  },
  {
    date: "2024-08-10",
    title: "AI Systems for Neurocognitive Intake",
    image: null,
    description:
      "Built and scaled a HIPAA-compliant neurocognitive intake platform. Uses GPT-4, FSMs, and logistic regression to drive 80% completion, sub-3s diagnostics, and $1M ARR. Cut intake time 8× and dropout rates 3.2× across 2,000+ patients.",
    links: [],
  },
  {
    date: "2023-01-10",
    title: "doubltap.co",
    image: "/projects/projects_doubltap.png",
    description:
      "Built an influencer marketing platform w/ React and Django. Scaled to 12 brand campaigns and 100+ influencers onboarded, before selling the tech IP to a major Indian advertising group looking to expand their service offerings ahead of IPO in 2026.",
    links: [
      {
        label: "a sneak peek of the app",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
    ],
  },
  {
    date: "2023-11-10",
    title: "ACT Grants",
    image: null,
    description:
      "Led end-to-end development of a high-scale donation and tracking platform (Django, React, Redis) in partnership with Sequoia, BCG, and LSIP; raised ₹10Cr (~$1.2M) from 80K users/week, enabled real-time oxygen supply visibility, automated tax/compliance workflows, and integrated Razorpay beta APIs for corporate matching—all built in 4 weeks with a 2-person team and maintained near-100% uptime.",
    links: [
      {
        label: "virat kohli tweeted about us",
        url: "https://x.com/imVkohli/status/1390532345753522180",
      },
    ],
  },
  {
    date: "2022-11-10",
    title: "Godam - Hult Prize Global Finalist",
    image: "/projects/projects_godam.png",
    description:
      "Built and deployed a mobile-first inventory management platform (Django + React PWA) for rural farmers in 6 weeks during the Hult Prize Global Accelerator; enabled real-time crop tracking, smart storage allocation, and predictive dispatch planning, targeting 10–30% reduction in post-harvest loss—recognized as a Global Finalist (Team India) and 1st place at Hult Prize Regionals (SEA).",
    links: [],
  },
  {
    date: "2022-09-10",
    title: "BITS Vaccination Portal",
    image: null,
    description:
      "Built and deployed a full-stack COVID vaccination portal (React, Node, Postgres) in 2 weeks, verifying 4.5k students with 95%+ accuracy in <2s. Saved 750+ admin hours, enabled India’s first safe campus reopening.",
    links: [
      {
        label: "open sourced it for other colleges",
        url: "https://github.com/psrth/bits-vaccination-portal",
      },
    ],
  },
];
