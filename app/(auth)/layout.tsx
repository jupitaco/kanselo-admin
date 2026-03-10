import BrandLogo from "@/components/ui/brandLogo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <main className="no-scrollbar mx-auto flex h-screen w-full max-w-xl flex-col items-center justify-between gap-8 overflow-y-auto py-7">
        <BrandLogo />
        <section className="w-full px-2">{children}</section>

        <footer>
          <small className="text-grey-300">
            @{new Date().getFullYear()} Kanselo All Right Reserved.
          </small>
        </footer>
      </main>
    </main>
  );
}
