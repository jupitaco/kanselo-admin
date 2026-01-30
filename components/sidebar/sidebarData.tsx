import {
  CalendarIcon,
  DashboardIcon,
  MenteeIcon,
  MentorIcon,
  SettingsIcon,
  TemplateIcon,
  TicketStarIcon,
} from "@/public/svgs/svgs";

export const SidebarData = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    icon: <TemplateIcon />,
    title: "Verifications",
    url: "/verifications",
  },
  {
    icon: <CalendarIcon />,
    title: "Appointments",
    url: "/appointments",
  },
  {
    icon: <MentorIcon />,
    title: "Mentors",
    url: "/mentors",
  },
  {
    icon: <MenteeIcon />,
    title: "Mentees",
    url: "/mentees",
  },
  {
    icon: <TicketStarIcon />,
    title: "Transactions",
    url: "/transactions",
  },

  {
    icon: <SettingsIcon />,
    title: "Settings",
    url: "/settings",
    childRoutes: [
      {
        icon: null,
        title: "Basic",
        url: "/settings/basic",
      },
      {
        icon: null,
        title: "Security",
        url: "/settings/security",
      },
      {
        icon: null,
        title: "Administrator",
        url: "/settings/administrator",
      },
    ],
  },
];
