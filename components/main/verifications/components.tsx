"use client";
import Field from "@/components/ui/field";
import { useModalContext } from "@/context/modalContext";
import Image from "next/image";
import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import ActionModals from "@/components/ui/modals/actionModals";
import { LuSquareCheck, LuSquareX } from "react-icons/lu";
import ModalWrapper from "@/components/ui/modals/modalWrapper";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/formInput/radio/radioGroup";
import FormInput from "@/components/ui/formInput";
import { useSearchParams } from "next/navigation";
import { UserData } from "@/types/auths";
import { usePaginationContext } from "@/context/paginateContext";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import { EmptyState, ErrorMessage } from "@/components/ui/emptyState";
import { SyntheticEvent, useState, useTransition } from "react";
import { manageMentorRequestAction } from "@/libs/actions/bookings.actions";
import { handleError, handleSuccess } from "@/utils/helper";
import { ManageMentorReqType } from "@/types/booking";
import { FiEye } from "react-icons/fi";

export const MentorAvatar = ({
  profilePhoto,
  fullName,
  state,
  city,
  country,
}: UserData) => {
  return (
    <div className="border-grey-200 space-y-3 overflow-hidden rounded-xl border bg-white">
      <figure className="relative h-60 w-full overflow-hidden">
        <Image
          src={profilePhoto}
          alt={fullName}
          fill
          sizes="100%"
          className="object-cover transition-transform ease-in-out hover:scale-[120%]"
        />
      </figure>
      <div className="space-y-1 p-4">
        <h5 className="font-semibold">{fullName}</h5>
        <small className="text-grey-300 font-medium">
          {`${city} ${state}, ${country}`}
        </small>
      </div>
    </div>
  );
};

export const MentorCard = ({ data }: { data: UserData }) => {
  return (
    <li className="border-grey-200 flex flex-col justify-between gap-5 overflow-hidden rounded-xl border bg-white p-5">
      <MentorAvatar {...data} />

      <Field
        label="Email"
        value={data?.email}
        className="flex items-center justify-between"
        labelClassName="text-grey-500 font-semibold"
        valueClassName="text-primary font-semibold"
      />

      <Field
        label="Phone"
        value={data?.phoneNumber}
        className="flex items-center justify-between"
        labelClassName="text-grey-500 font-semibold"
        valueClassName="text-primary font-semibold"
      />

      <Field
        label="Years of experience"
        value={"5"}
        className="flex items-center justify-between"
        labelClassName="text-grey-500 font-semibold"
        valueClassName="text-primary font-semibold"
      />

      <Field
        label="Industry(s)"
        value={
          <ul>
            {["Sales & marketing", "email marketing"].map((item, idx) => (
              <li key={idx} className="text-primary font-semibold">
                {item}
                {idx === ["Sales & marketing", "email marketing"]?.length - 1
                  ? ","
                  : ""}
              </li>
            ))}
          </ul>
        }
        className="flex items-center justify-between"
        labelClassName="text-grey-500 font-semibold"
        valueClassName="text-primary font-semibold"
      />

      <Field
        label="Consultation fee"
        value={`$${data?.consultationFee}`}
        className="flex items-center justify-between"
        labelClassName="text-grey-500 font-semibold"
        valueClassName="text-primary font-semibold"
      />

      <Field
        label="Bio"
        value={`${data?.bio?.slice(0, 100)}...`}
        className="flex flex-col justify-between gap-3"
        labelClassName="text-grey-500 font-semibold"
        valueClassName="text-grey-300 font-semibold"
      />

      <MentorReqAction data={data} />
    </li>
  );
};

export const MentorRequest = () => {
  const { data, isPending } = usePaginationContext();

  if (data?.assets?.length === 0) {
    return <EmptyState title="No Data" subTitle="No mentor request yet" />;
  }
  return (
    <>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data?.assets?.map((item, idx) => (
            <MentorCard key={idx} data={item as UserData} />
          ))}
        </ul>
      )}

      <TablePagination />
    </>
  );
};

const declineData = [
  {
    id: "allow",
    value: "Decline - allow user make changes and register again",
  },
  {
    id: "noAllow",
    value: "Decline - user shouldn’t be able to register again",
  },
];

export const MentorReqAction = ({
  recent,
  data,
}: {
  recent?: boolean;
  data: UserData;
}) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");
  const { isOpen, openModal, closeModal } = useModalContext();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    reason: "",
    allow: "",
  });

  const [error, setError] = useState(false);

  const handleApproveMentor = () => {
    const payload: ManageMentorReqType = {
      status: "APPROVED",
    };

    startTransition(async () => {
      const rsp = await manageMentorRequestAction(data?._id, payload);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`approve-${data?._id}`);
      }
    });
  };

  const handleDeclineMentor = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!formData?.allow) {
      setError(true);
      return;
    }

    setError(false);
    const payload: ManageMentorReqType = {
      status: "DECLINED",
      declineReason: formData?.reason,
      canReapplyAsMentor: formData?.allow === "allow" ? true : false,
    };

    startTransition(async () => {
      const rsp = await manageMentorRequestAction(data?._id, payload);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        setError(false);
        setFormData({ reason: "", allow: "" });
        closeModal(`decline-${data?._id}`);
      }
    });
  };

  return (
    <>
      {recent ? (
        <div className="inline-flex gap-3">
          <button onClick={() => openModal(`view-${data?._id}`)}>
            <FiEye size={20} />
          </button>
          <button onClick={() => openModal(`approve-${data?._id}`)}>
            <LuSquareCheck className="text-success-600" size={20} />
          </button>
          <button onClick={() => openModal(`decline-${data?._id}`)}>
            <LuSquareX className="text-error-400" size={20} />
          </button>
        </div>
      ) : (
        <>
          {activeTab === "approved" ? (
            ""
          ) : (
            <div className="space-y-3">
              <Button
                className="pry-btn w-full"
                onClick={() => openModal(`approve-${data?._id}`)}
              >
                Approve
              </Button>
              {activeTab !== "declined" && (
                <Button
                  className="alt-btn w-full"
                  onClick={() => openModal(`decline-${data?._id}`)}
                >
                  Decline
                </Button>
              )}
            </div>
          )}
        </>
      )}

      {isOpen[`approve-${data?._id}`] && (
        <ActionModals
          icon={<WarningIcon />}
          id={`approve-${data?._id}`}
          title="Approve Mentor"
          subTitle="Are you sure you want to approve this mentor?"
          subtitleClass="text-grey-300!"
          actionTitle="Yes, Approve"
          closeTitle="No, Cancel"
          btnSecClass="outline-btn"
          action={handleApproveMentor}
          loading={isPending}
        />
      )}

      {isOpen[`decline-${data?._id}`] && (
        <ModalWrapper
          id={`decline-${data?._id}`}
          icon={<WarningIcon />}
          title="Decline Mentor Registration"
          subtitle="Choose a decline option"
          headerClass="border-0! justify-center items-center"
          subtitleClass={"font-normal text-center text-grey-300"}
          wrapperClass="!rounded-[20px] max-w-lg! max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          <form onSubmit={handleDeclineMentor} className="space-y-2">
            <RadioGroup
              onValueChange={(e) =>
                setFormData((prev) => ({ ...prev, allow: e }))
              }
              value={formData?.allow}
            >
              {declineData.map(({ id, value }) => (
                <label
                  htmlFor={id}
                  key={id}
                  className={`${error ? "border-error" : "border-Line"} flex cursor-pointer items-center gap-4 rounded-xl border p-4 text-xs`}
                >
                  <RadioGroupItem value={id} id={id} required />
                  {value}
                </label>
              ))}
            </RadioGroup>

            {error && <ErrorMessage message="Choose a decline option" />}

            <FormInput
              id="reason"
              name="reason"
              type="textarea"
              label="Reason for decline"
              placeholder="Enter reason"
              value={formData?.reason}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, reason: e.target.value }))
              }
              required
            />

            <DialogFooter className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <DialogClose asChild>
                <Button type="button" className="outline-btn">
                  No, don’t decline
                </Button>
              </DialogClose>
              <Button className="pry-btn" type="submit" loading={isPending}>
                Yes, decline
              </Button>
            </DialogFooter>
          </form>
        </ModalWrapper>
      )}

      {isOpen[`view-${data?._id}`] && <ViewMentor data={data} />}
    </>
  );
};

export const ViewMentor = ({ data }: { data: UserData }) => {
  return (
    <ModalWrapper
      id={`view-${data?._id}`}
      title="Mentor Registration Request"
      headerClass="border-0! justify-center items-center"
      subtitleClass={"font-normal text-center text-grey-300"}
      wrapperClass="!rounded-[20px] max-w-lg! max-h-[90vh] overflow-y-auto no-scrollbar"
    >
      <article className="flex flex-col justify-between gap-5">
        <Field
          label="Full Name"
          value={data?.fullName}
          className="flex items-center justify-between"
          labelClassName="text-grey-500 font-semibold"
          valueClassName="text-primary font-semibold"
        />
        <Field
          label="Email"
          value={data?.email}
          className="flex items-center justify-between"
          labelClassName="text-grey-500 font-semibold"
          valueClassName="text-primary font-semibold"
        />

        <Field
          label="Phone"
          value={data?.phoneNumber}
          className="flex items-center justify-between"
          labelClassName="text-grey-500 font-semibold"
          valueClassName="text-primary font-semibold"
        />

        <Field
          label="Years of experience"
          value={"5"}
          className="flex items-center justify-between"
          labelClassName="text-grey-500 font-semibold"
          valueClassName="text-primary font-semibold"
        />

        <Field
          label="Industry(s)"
          value={
            <ul>
              {["Sales & marketing", "email marketing"].map((item, idx) => (
                <li key={idx} className="text-primary font-semibold">
                  {item}
                  {idx === ["Sales & marketing", "email marketing"]?.length - 1
                    ? ","
                    : ""}
                </li>
              ))}
            </ul>
          }
          className="flex items-center justify-between"
          labelClassName="text-grey-500 font-semibold"
          valueClassName="text-primary font-semibold"
        />

        <Field
          label="Consultation fee"
          value={`$${data?.consultationFee}`}
          className="flex items-center justify-between"
          labelClassName="text-grey-500 font-semibold"
          valueClassName="text-primary font-semibold"
        />

        <Field
          label="Bio"
          value={`${data?.bio?.slice(0, 100)}...`}
          className="flex flex-col justify-between gap-3"
          labelClassName="text-grey-500 font-semibold"
          valueClassName="text-grey-300 font-semibold"
        />
      </article>
    </ModalWrapper>
  );
};
