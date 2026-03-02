import {
  CalendarIcon,
  DashboardIcon,
  LineCalendarIcon,
  LineDashboardIcon,
  LineMenteeIcon,
  LineMentorIcon,
  LineSettingsIcon,
  LineTemplateIcon,
  LineTicketStarIcon,
  MenteeIcon,
  MentorIcon,
  SettingsIcon,
  TemplateIcon,
  TicketStarIcon,
} from "@/public/svgs/svgs";

export const SidebarData = [
  {
    icon: <DashboardIcon />,
    lineIcon: <LineDashboardIcon />,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    icon: <TemplateIcon />,
    lineIcon: <LineTemplateIcon />,
    title: "Verifications",
    url: "/verifications",
  },
  {
    icon: <CalendarIcon />,
    lineIcon: <LineCalendarIcon />,
    title: "Appointments",
    url: "/appointments",
  },
  {
    icon: <MentorIcon />,
    lineIcon: <LineMentorIcon />,
    title: "Mentors",
    url: "/mentors",
  },
  {
    icon: <MenteeIcon />,
    lineIcon: <LineMenteeIcon />,
    title: "Mentees",
    url: "/mentees",
  },
  {
    icon: <TicketStarIcon />,
    lineIcon: <LineTicketStarIcon />,
    title: "Transactions",
    url: "/transactions",
  },
  {
    icon: <TicketStarIcon />,
    lineIcon: <LineTicketStarIcon />,
    title: "Payouts",
    url: "/payouts",
  },

  {
    icon: <SettingsIcon />,
    lineIcon: <LineSettingsIcon />,
    title: "Settings",
    url: "/settings",
    childRoutes: [
      {
        icon: null,
        lineIcon: null,
        title: "Basic",
        url: "/settings/basic",
      },
      {
        icon: null,
        lineIcon: null,
        title: "Security",
        url: "/settings/security",
      },
      {
        icon: null,
        lineIcon: null,
        title: "Administrator",
        url: "/settings/administrator",
      },
    ],
  },
];
