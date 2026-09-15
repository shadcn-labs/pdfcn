export interface Session {
  description?: string;
  endTime?: string;
  isBreak?: boolean;
  room?: string;
  speaker?: string;
  time: string;
  title: string;
  track?: string;
}

export interface DaySchedule {
  date: string;
  label: string;
  sessions: Session[];
}

export interface Track {
  color: string;
  name: string;
}

export interface EventAgendaProps {
  accentColor?: string;
  date: string;
  days: DaySchedule[];
  emergencyContact?: string;
  endDate?: string;
  eventName: string;
  renderingBase?: "takumi" | "forme";
  tracks?: Track[];
  venue: string;
  wifiInfo?: string;
}

export const sampleEventAgendaData: EventAgendaProps = {
  accentColor: "#dc2626",
  date: "October 20, 2026",
  days: [
    {
      date: "October 20, 2026",
      label: "Day 1",
      sessions: [
        {
          description:
            "Check-in, grab your badge, and enjoy breakfast with peers.",
          endTime: "9:00 AM",
          isBreak: true,
          time: "8:00 AM",
          title: "Registration & Breakfast",
        },
        {
          description:
            "An overview of recent evolutions and the road ahead for UI engineering.",
          endTime: "9:45 AM",
          room: "Main Hall",
          speaker: "Dan Abramov",
          time: "9:00 AM",
          title: "Opening Keynote: The Next Decade of React",
          track: "Core React",
        },
        {
          description:
            "Real-world architecture patterns, streaming benefits, and edge-case handling.",
          endTime: "10:45 AM",
          room: "Room A",
          speaker: "Sarah Chen",
          time: "10:00 AM",
          title: "Server Components in Production",
          track: "Core React",
        },
        {
          description:
            "Navigating signals, atomic state, and server state synchronization.",
          endTime: "10:45 AM",
          room: "Room B",
          speaker: "Mark Erikson",
          time: "10:00 AM",
          title: "State Management in 2026",
          track: "Ecosystem",
        },
        {
          description: "Exhibition hall coffee stations open.",
          endTime: "11:30 AM",
          isBreak: true,
          time: "11:00 AM",
          title: "Coffee & Networking Break",
        },
        {
          description:
            "Ensuring WCAG AAA compliance with composable headless components.",
          endTime: "12:15 PM",
          room: "Room A",
          speaker: "Rachel Andrew",
          time: "11:30 AM",
          title: "Building Accessible Design Systems",
          track: "Core React",
        },
        {
          description:
            "How automatic memoization transforms rendering pipelines.",
          endTime: "12:15 PM",
          room: "Room B",
          speaker: "Andrew Clark",
          time: "11:30 AM",
          title: "Compiler Deep Dive: Under the Hood",
          track: "Ecosystem",
        },
        {
          description: "Lunch served in the Grand Ballroom.",
          endTime: "1:45 PM",
          isBreak: true,
          time: "12:30 PM",
          title: "Catered Lunch & Sponsor Showcase",
        },
        {
          description:
            "Hands-on exercises exploring Actions, optimistic updates, and new hooks.",
          endTime: "3:30 PM",
          room: "Workshop Lab",
          speaker: "Ken Wheeler",
          time: "2:00 PM",
          title: "Interactive Workshop: Building with React 19",
          track: "Workshop",
        },
        {
          description:
            "Module federation techniques across distributed product teams.",
          endTime: "3:00 PM",
          room: "Room A",
          speaker: "Zack Jackson",
          time: "2:00 PM",
          title: "Micro-Frontends at Scale",
          track: "Ecosystem",
        },
        {
          endTime: "4:00 PM",
          isBreak: true,
          time: "3:30 PM",
          title: "Afternoon Refreshments",
        },
        {
          description:
            "Reflections on Day 1 highlights, open mic session, and evening preview.",
          endTime: "5:00 PM",
          room: "Main Hall",
          speaker: "Sophie Alpert",
          time: "4:00 PM",
          title: "Closing Keynote & Community Q&A",
          track: "Core React",
        },
      ],
    },
    {
      date: "October 21, 2026",
      label: "Day 2",
      sessions: [
        {
          description: "Morning refreshments in the networking lounge.",
          endTime: "9:30 AM",
          isBreak: true,
          time: "8:30 AM",
          title: "Welcome Coffee & Light Breakfast",
        },
        {
          description:
            "How generative agents and generative UI are shaping application architectures.",
          endTime: "10:30 AM",
          room: "Main Hall",
          speaker: "Seb Markbåge",
          time: "9:30 AM",
          title: "Future of React & AI Agent Integrations",
          track: "Core React",
        },
        {
          description:
            "Actionable metrics, Core Web Vitals, and avoiding main-thread bottlenecks.",
          endTime: "11:45 AM",
          room: "Room A",
          speaker: "Addy Osmani",
          time: "10:45 AM",
          title: "Performance Profiling for Modern Web Apps",
          track: "Core React",
        },
        {
          description:
            "Sync engines, conflict resolution, and ultra-fast client-side queries.",
          endTime: "11:45 AM",
          room: "Room B",
          speaker: "Tanner Linsley",
          time: "10:45 AM",
          title: "Offline-First Architecture with Local-First Databases",
          track: "Ecosystem",
        },
        {
          description:
            "Quick 5-minute community-submitted presentations in the theater.",
          endTime: "1:15 PM",
          isBreak: true,
          time: "12:00 PM",
          title: "Lunch & Community Lightning Talks",
        },
        {
          description:
            "Profiling real-world codebases, memory leak identification, and bundle size reduction.",
          endTime: "3:00 PM",
          room: "Workshop Lab",
          speaker: "Lydia Hallie",
          time: "1:30 PM",
          title: "Hands-on Performance Optimization Workshop",
          track: "Workshop",
        },
        {
          description:
            "Vite, Turbopack, Biome, Oxfmt, and next-generation dev speed.",
          endTime: "4:15 PM",
          room: "Main Hall",
          speaker: "Industry Panelists",
          time: "3:15 PM",
          title: "Panel Discussion: What's Next for Developer Tooling",
          track: "Ecosystem",
        },
        {
          description: "Drinks and appetizers at the convention terrace.",
          endTime: "6:00 PM",
          isBreak: true,
          time: "4:30 PM",
          title: "Closing Reception & Networking Afterparty",
        },
      ],
    },
  ],
  emergencyContact:
    "Organizers Desk: +31 20 123 4567 | emergency@reactsummit.com",
  endDate: "October 21, 2026",
  eventName: "React Summit 2026",
  tracks: [
    { color: "#3b82f6", name: "Core React" },
    { color: "#10b981", name: "Ecosystem" },
    { color: "#f59e0b", name: "Workshop" },
  ],
  venue: "Amsterdam Convention Center",
  wifiInfo: "Network: ReactSummit / Password: react2026",
};
