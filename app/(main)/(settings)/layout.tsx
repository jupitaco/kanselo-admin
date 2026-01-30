import { LayoutWrapper } from "@/components/main/settings/basic";

import React, { ReactNode } from "react";


export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="p-5">
      < LayoutWrapper>
        {children}
      </LayoutWrapper>
    </main>
  );
}
