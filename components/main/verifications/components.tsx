"use client";
import Field from "@/components/ui/field";
import { useModalContext } from "@/context/modalContext";
import { Mentor } from "@/types/global";
import Image from "next/image";
import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import ActionModals from "@/components/ui/modals/actionModals";
import { FiEye } from "react-icons/fi";
import { LuSquareCheck, LuSquareX } from "react-icons/lu";
import ModalWrapper from "@/components/ui/modals/modalWrapper";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/formInput/radio/radioGroup";
import FormInput from "@/components/ui/formInput";

export const MentorAvatar = ({ image, name, location }: Mentor) => {
    return (
        <div className="border-grey-200 space-y-3 overflow-hidden rounded-xl border bg-white">
            <figure className="relative h-60 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="100%"
                    className="object-cover transition-transform ease-in-out hover:scale-[120%]"
                />
            </figure>
            <div className="space-y-1 p-4">
                <h5 className="font-semibold">{name}</h5>
                <small className="text-grey-300 font-medium">{location}</small>
            </div>
        </div>
    );
};

export const MentorCard = ({ data }: { data: Mentor }) => {
    return (
        <li className="border-grey-200 space-y-4 overflow-hidden rounded-xl border bg-white p-5">
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
                value={`$${data?.sessionRate}`}
                className="flex items-center justify-between"
                labelClassName="text-grey-500 font-semibold"
                valueClassName="text-primary font-semibold"
            />

            <Field
                label="Bio"
                value={data?.bio}
                className="flex flex-col justify-between gap-3"
                labelClassName="text-grey-500 font-semibold"
                valueClassName="text-grey-300 font-semibold"
            />

            <MentorReqAction data={data} />
        </li>
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
    data: Mentor;
}) => {
    const { isOpen, openModal } = useModalContext();
    return (
        <>
            {recent ? (
                <div className="inline-flex gap-3">
                    <button>
                        <FiEye size={20} />
                    </button>
                    <button>
                        <LuSquareCheck className="text-success-600" size={20} />
                    </button>
                    <button>
                        <LuSquareX className="text-error-400" size={20} />
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <Button
                        className="pry-btn w-full"
                        onClick={() => openModal(`approve-${data?.id}`)}>
                        Approve
                    </Button>
                    <Button
                        className="alt-btn w-full"
                        onClick={() => openModal(`decline-${data?.id}`)}
                    >
                        Decline
                    </Button>
                </div>
            )}

            {isOpen[`approve-${data?.id}`] && (
                <ActionModals
                    icon={<WarningIcon />}
                    id={`approve-${data?.id}`}
                    title="Approve Mentor"
                    subTitle="Are you sure you want to approve this mentor?"
                    subtitleClass="text-grey-300!"
                    actionTitle="Yes, Approve"
                    closeTitle="No, Cancel"
                    btnSecClass="outline-btn"
                    action={() => { }}
                />
            )}

            {isOpen[`decline-${data?.id}`] && (
                <ModalWrapper
                    id={`decline-${data?.id}`}
                    icon={<WarningIcon />}
                    title="Decline Mentor Registration"
                    subtitle="Choose a decline option"
                    headerClass="border-0! justify-center items-center"
                    subtitleClass={"font-normal text-center text-grey-300"}
                    wrapperClass="!rounded-[20px] max-w-lg! max-h-[90vh] overflow-y-auto no-scrollbar"
                >
                    <section className="space-y-2">
                        <RadioGroup
                        // onValueChange={field.onChange}
                        // value={field.value}
                        >
                            {declineData.map(({ id, value }) => (
                                <label
                                    htmlFor={value}
                                    key={id}
                                    className={`border-Line flex cursor-pointer items-center gap-4 rounded-xl border p-4 text-xs`}
                                >
                                    <RadioGroupItem value={value} id={value} />
                                    {value}
                                </label>
                            ))}
                        </RadioGroup>

                        <FormInput
                            id="reason"
                            name="reason"
                            type="textarea"
                            label="Reason for decline"
                            placeholder="Enter reason"
                        />

                        <DialogFooter className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                            <DialogClose asChild>
                                <Button type="button" className="outline-btn">
                                    No, don’t decline
                                </Button>
                            </DialogClose>

                            <Button className="pry-btn" type="button">
                                Yes, decline
                            </Button>
                        </DialogFooter>
                    </section>
                </ModalWrapper>
            )}
        </>
    );
};

export const MentorAction = ({
    data,
}: {
    data: Mentor;
}) => {
    const { isOpen, openModal } = useModalContext();
    return (
        <>

            <div className="space-y-3">
                <Button
                    className="alt-btn w-full"
                    onClick={() => openModal(`suspend-${data?.id}`)}>
                    Suspend Mentor
                </Button>
                <Button
                    className="outline-btn border-error! text-error! w-full"
                    onClick={() => openModal(`delete-${data?.id}`)}>
                    Delete Mentor
                </Button>
            </div>


            {isOpen[`suspend-${data?.id}`] && (
                <ActionModals
                    icon={<WarningIcon />}
                    id={`suspend-${data?.id}`}
                    title="Suspend Mentor"
                    subTitle="Are you sure you want to suspend this mentor?"
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
                    title="Delete Mentor"
                    subTitle="Are you sure you want to delete this mentor?"
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

export const MenteeAction = ({
    data,
}: {
    data: Mentor;
}) => {
    const { isOpen, openModal } = useModalContext();
    return (
        <>

            <div className="space-y-3">
                <Button
                    className="alt-btn w-full"
                    onClick={() => openModal(`suspend-${data?.id}`)}>
                    Suspend Mentee
                </Button>
                <Button
                    className="outline-btn border-error! text-error! w-full"
                    onClick={() => openModal(`delete-${data?.id}`)}>
                    Delete Mentee
                </Button>
            </div>


            {isOpen[`suspend-${data?.id}`] && (
                <ActionModals
                    icon={<WarningIcon />}
                    id={`suspend-${data?.id}`}
                    title="Suspend Mentee"
                    subTitle="Are you sure you want to suspend this mentee?"
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
                    title="Delete Mentee"
                    subTitle="Are you sure you want to delete this mentee?"
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
