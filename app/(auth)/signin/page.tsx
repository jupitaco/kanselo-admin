import SigninForm from "@/components/auth/signinForm";
import { SearchParams } from "@/types/global";
import { Metadata } from "next";
import { use } from "react";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page(props: SearchParams) {
  const { redirect } = use(props.searchParams);
  return (
    <section className="space-y-10">
      <hgroup className="space-y-6 text-center">
        <h1>Kanselo Admin</h1>
        <h5 className="text-grey-400 text-lg">Login to your account</h5>
      </hgroup>

      <SigninForm redirectPath={redirect} />
    </section>
  );
}
