"use client";

import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import ActionModals from "@/components/ui/modals/actionModals";
import { useModalContext } from "@/context/modalContext";
import { filterData } from "@/mock";
import { AdminType } from "@/types/admin";
import React from "react";
import { useState } from "react";

export const CreateAdmin = () => {
  // const [formData, setFormData] = useState({
  //   fullName: userData?.fullName || '',
  //   email: userData?.email || '',
  // });
  const [edit, setEdit] = useState(false);
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
      className="w-full space-y-4"
    >
      <section className="space-y-4">
        <article className="flex flex-wrap justify-between gap-4">
          <FormInput
            id="yearsOfExperience"
            name="yearsOfExperience"
            type="text"
            label="Years of experience"
            placeholder="Enter your years of experience"
            className="w-full"
            disabled={!edit}
            required
          />

          <FormInput
            id="industry"
            name="industry"
            type="shadSelect"
            label="Industry"
            placeholder="Select"
            value={select}
            shadcnSelectData={filterData}
            onSelectItem={(e) => setSelect(e)}
            className="w-full"
            disabled={!edit}
            required
          />

          <FormInput
            id="bio"
            name="bio"
            type="textarea"
            label="Bio"
            placeholder="Enter bio"
            className="w-full"
            disabled={!edit}
            required
          />

          <FormInput
            id="consultationFee"
            name="consultationFee"
            type="number"
            label="Consultation fee (per session)"
            placeholder="Enter fee"
            className="w-full"
            disabled={!edit}
            required
          />
        </article>


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
