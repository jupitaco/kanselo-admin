"use client";
import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import ActionModals from "@/components/ui/modals/actionModals";
import { useModalContext } from "@/context/modalContext";
import { createAdminAction } from "@/libs/actions/auth.actions";
import {
  deleteUserAction,
  toggleUserAccessAction,
} from "@/libs/actions/users.actions";
import { CreateAdminType, UserData } from "@/types/auths";
import { handleError, handleSuccess } from "@/utils/helper";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useTransition } from "react";
import { useState } from "react";

export const CreateAdmin = () => {
  const { back } = useRouter();
  const [formData, setFormData] = useState<CreateAdminType>({
    fullName: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (
    e: SyntheticEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const rsp = await createAdminAction(formData);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        back();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
      <section className="space-y-4">
        <article className="flex flex-wrap justify-between gap-4">
          <FormInput
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            placeholder="Enter name"
            className="w-full"
            value={formData?.fullName}
            onChange={handleChange}
            required
          />

          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter email"
            className="w-full"
            value={formData?.email}
            onChange={handleChange}
            required
          />

          <FormInput
            id="role"
            name="role"
            type="shadSelect"
            label="Role"
            placeholder="Select"
            value={formData.role}
            shadcnSelectData={[
              { label: "Admin", value: "admin" },
              { label: "Super Admin", value: "superAdmin" },
            ]}
            onSelectItem={(e) =>
              setFormData((prev) => ({ ...prev, ["role"]: e }))
            }
            className="w-full"
            required
          />
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            value={formData?.password}
            onChange={handleChange}
            className="w-full"
            required
          />
        </article>

        <Button className="pry-btn w-full" type="submit" loading={isPending}>
          Save
        </Button>
      </section>
    </form>
  );
};

export const AdminAction = ({ data }: { data: UserData }) => {
  console.log("data>>", data);
  const { isOpen, openModal, closeModal } = useModalContext();

  const [isPending, startTransition] = useTransition();

  const handleDeleteUser = () => {
    startTransition(async () => {
      const rsp = await deleteUserAction(data?._id, "/administrator");

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`delete-${data?._id}`);
      }
    });
  };

  const handleManageUser = () => {
    startTransition(async () => {
      const rsp = await toggleUserAccessAction(
        data?._id,
        data?.isSuspended,
        "/administrator",
      );

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`access-${data?._id}`);
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          className="outline-btn bg-Line"
          onClick={() => openModal(`suspend-${data?._id}`)}
        >
          Suspend
        </Button>
        <Button
          className="bg-error-100 border-error-600 border"
          onClick={() => openModal(`delete-${data?._id}`)}
        >
          Delete
        </Button>
      </div>

      {isOpen[`access-${data?._id}`] && (
        <ActionModals
          icon={<WarningIcon />}
          id={`access-${data?._id}`}
          title={data?.isSuspended ? "Reinstate User" : "Suspend User"}
          subTitle={`Are you sure you want to ${data?.isSuspended ? "reinstate" : "suspend"} this admin?`}
          subtitleClass="text-grey-300!"
          actionTitle="Yes, Suspend"
          closeTitle="No, Cancel"
          btnSecClass="outline-btn"
          action={handleManageUser}
          loading={isPending}
        />
      )}

      {isOpen[`delete-${data?._id}`] && (
        <ActionModals
          icon={<WarningIcon />}
          id={`delete-${data?._id}`}
          title="Delete Admin"
          subTitle="Are you sure you want to delete this admin?"
          subtitleClass="text-grey-300!"
          actionTitle="Yes, Delete"
          closeTitle="No, Cancel"
          btnSecClass="outline-btn"
          action={handleDeleteUser}
          loading={isPending}
        />
      )}
    </>
  );
};
