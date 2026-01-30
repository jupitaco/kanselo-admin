"use client";
import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import ActionModals from "@/components/ui/modals/actionModals";
import { useModalContext } from "@/context/modalContext";
import { AdminType } from "@/types/admin";
import React from "react";
import { useState } from "react";

export const CreateAdmin = () => {
  // const [formData, setFormData] = useState({
  //   fullName: userData?.fullName || '',
  //   email: userData?.email || '',
  // });
  const [select, setSelect] = useState<string>("");


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
      className="w-full max-w-lg space-y-4"
    >
      <section className="space-y-4">
        <article className="flex flex-wrap justify-between gap-4">
          <FormInput
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            placeholder="Enter name"
            className="w-full"
            required
          />

          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter email"
            className="w-full"
            required
          />

          <FormInput
            id="role"
            name="role"
            type="shadSelect"
            label="Role"
            placeholder="Select"
            value={select}
            shadcnSelectData={[{ label: "Admin", value: "admin" }, { label: "Super Admin", value: "superAdmin" }]}
            onSelectItem={(e) => setSelect(e)}
            className="w-full"
            required
          />


        </article>




        <Button
          className="pry-btn w-full"
          type="submit"
        // loading={isPending}
        >
          Save
        </Button>



      </section>
    </form>
  );
};

export const AdminAction = ({ data }: { data: AdminType }) => {
  const { isOpen, openModal } = useModalContext();

  return (<>

    <div className="flex items-center gap-2">
      <Button className="outline-btn bg-Line" onClick={() => openModal(`suspend-${data?.id}`)}>
        Suspend
      </Button>
      <Button className="bg-error-100 border border-error-600" onClick={() => openModal(`delete-${data?.id}`)}>
        Delete
      </Button>
    </div>


    {isOpen[`suspend-${data?.id}`] && (
      <ActionModals
        icon={<WarningIcon />}
        id={`suspend-${data?.id}`}
        title="Suspend Admin"
        subTitle="Are you sure you want to suspend this admin?"
        subtitleClass="text-grey-300!"
        actionTitle="Yes, Suspend"
        closeTitle="No, Cancel"
        btnSecClass="outline-btn"
        action={() => { }}
      />
    )}

    {isOpen[`delete-${data?.id}`] && (
      <ActionModals
        icon={<WarningIcon />}
        id={`delete-${data?.id}`}
        title="Delete Admin"
        subTitle="Are you sure you want to delete this admin?"
        subtitleClass="text-grey-300!"
        actionTitle="Yes, Delete"
        closeTitle="No, Cancel"
        btnSecClass="outline-btn"
        action={() => { }}
      />
    )}
  </>
  );
};
