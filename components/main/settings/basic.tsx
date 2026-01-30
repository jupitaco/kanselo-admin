"use client";

import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { allImages } from "@/public/images/images";
import Image from "next/image";
import React, { ReactNode } from "react";
import { useState } from "react";
import banner from "@/public/svgs/settings-banner.svg";
import { usePathname } from "next/navigation";

export const Basic = () => {
  // const [formData, setFormData] = useState({
  //   fullName: userData?.fullName || '',
  //   email: userData?.email || '',
  // });
  const [edit, setEdit] = useState(false);

  // const handleChange = (
  //   e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  // ) => {
  //   const { id, value } = e.target as HTMLInputElement;
  //   setFormData((prev) => ({ ...prev, [id]: value }));
  // };

  // const initialStatus: ActionFormStatus & { data: UserDataAndAccessToken } = {
  //   error: false,
  //   message: '',
  //   data: {} as UserDataAndAccessToken,
  // };

  // const updateUserWithId = (state: ActionFormStatus, payload: FormData) => {
  //   return updateUserAction(state, userData?._id as string, payload);
  // };

  // const [state, formAction, isPending] = useActionState(
  //   updateUserWithId,
  //   initialStatus,
  //   '/',
  // );

  // useEffect(() => {
  //   if (state?.error) {
  //     handleError('Profile Update', state?.message);
  //   } else if (state?.message) {
  //     handleSuccess('Profile Update', state?.message);
  //     setTimeout(() => {
  //       setEdit(false);
  //     }, 10);
  //   }
  // }, [state, edit]);

  return (
    <form
      // action={formAction}
      className="w-full space-y-4"
    >
      <section className="space-y-4">
        <FormInput
          id="fullName"
          name="fullName"
          type="text"
          label="Full Name"
          placeholder="Enter"
          // defaultValue={formData?.fullName}
          // onChange={handleChange}
          disabled={!edit}
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter"
          // defaultValue={userData?.email}
          disabled
        />

        <FormInput
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          label="Phone Number"
          placeholder="Enter"
          // defaultValue={formData?.fullName}
          // onChange={handleChange}
          disabled={!edit}
        />

        <FormInput
          id="country"
          name="country"
          type="text"
          label="Country"
          placeholder="Enter"
          // defaultValue={formData?.country}
          // onChange={handleChange}
          disabled={!edit}
        />

        <FormInput
          id="city"
          name="city"
          type="text"
          label="Ciy"
          placeholder="Enter"
          // defaultValue={formData?.city}
          // onChange={handleChange}
          disabled={!edit}
        />

        <div className="mt-9 flex items-center justify-end pt-5">
          {edit ? (
            <div className="flex gap-3">
              <Button
                className="outline-btn"
                type="button"
                onClick={() => setEdit(!edit)}
              >
                Cancel
              </Button>
              <Button
                className="pry-btn"
                type="submit"
              // loading={isPending}
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                className="outline-btn text-center"
                onClick={() => setEdit(!edit)}
                type="button"
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      </section>
    </form>
  );
};

export const ChangeUserProfile = () => {
  return (
    <figure className="relative size-40 overflow-hidden rounded-full">
      <Image
        src={allImages.avatar}
        alt=""
        fill
        sizes="100%"
        className="object-cover"
      />
    </figure>
  );
};


export const LayoutWrapper = ({ children }: { children: ReactNode }) => {

  const path = usePathname()

  if (path.includes('/settings/administrator')) {

    return (
      <>
        {children}
      </>
    )

  }


  return (
    <section className="overflow-hidden rounded-lg bg-white">
      <div className="relative h-70 w-full">
        <Image src={banner} alt="" className="size-full object-cover" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white p-2">
          <ChangeUserProfile />
        </div>
      </div>

      <section className="mt-20 px-2 py-5 md:px-10">{children}</section>
    </section>
  )
}