import Field from "@/components/ui/field";
import { Mentor } from "@/types/global";
import Image from "next/image";

export const MentorAvatar = ({ image, name, location }: Mentor) => {
    return (
        <div className="border-grey-200 space-y-3 overflow-hidden rounded-xl border bg-white">
            <figure className="relative h-60 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="100%"
                    className="object-cover"
                />
            </figure>
            <div className="space-y-2 p-4">
                <h5 className="font-semibold">{name}</h5>
                <small className="text-grey-300 font-medium">{location}</small>
            </div>
        </div>
    );
};

export const MentorCard = ({ data }: { data: Mentor }) => {
    return (

        <li className="border-grey-200 p-5 space-y-4 overflow-hidden rounded-xl border bg-white">
            <MentorAvatar {...data} />

            <Field label="Email" value={data?.email} className="flex items-center justify-between " />

        </li>
    );
};