import {
  CalendarIcon,
  DashboardIcon,
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
    icon: <CalendarIcon />,
    title: "Templates",
    url: "/templates",
  },
  {
    icon: <TicketStarIcon />,
    title: "Payouts",
    url: "/payouts",
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
        title: "Business",
        url: "/settings/business",
      },
      {
        icon: null,
        title: "Security",
        url: "/settings/security",
      },
    ],
  },
];
