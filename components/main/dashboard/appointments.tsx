"use client";

import { Calendar } from "@/components/ui/formInput/datePicker/calendar";
import { topMentors } from "@/mock";
import Image from "next/image";
import React, { useState } from "react";

export const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock appointments data - replace with your actual data
  const appointments = [
    {
      id: 1,
      title: "How to grow a profitable eCommerce Business",
      mentor: "Adrian Solomon",
      startTime: "10:30am",
      endTime: "12:30am",
      date: new Date(),
      mentorImage: "/images/mentor1.png",
      menteeImage: "/images/mentor4.png",
    },
    {
      id: 2,
      title: "How to grow a profitable eCommerce Business",
      mentor: "Adrian Solomon",
      startTime: "10:30am",
      endTime: "12:30am", date: new Date(),
      mentorImage: "/images/mentor3.png",
      menteeImage: "/images/mentor2.png",
    },
    {
      id: 3,
      title: "How to grow a profitable eCommerce Business",
      mentor: "Adrian Solomon",
      startTime: "10:30am",
      endTime: "12:30am", date: new Date(),
      mentorImage: "/images/reviewer1.png",
      menteeImage: "/images/reviewer4.png",
    },
  ];

  // Filter appointments for selected date
  const filteredAppointments = appointments.filter(
    (apt) => apt.date.toDateString() === selectedDate.toDateString(),
  );

  return (
    <aside className="border-grey-100 custom-scrollbar h-auto w-full overflow-y-auto border-l bg-white p-4 pb-40 lg:h-screen lg:w-[30%]">
      <div className="space-y-6">
        <h1 className="text-lg font-bold">Upcoming Appointments</h1>

        {/* Calendar */}
        <article className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            // captionLayout="dropdown"
            className="w-full rounded-lg p-4"
          />
        </article>

        {/* Appointments List */}
        <ul className=" space-y-4  ">
          {filteredAppointments.map((appointment) => (
            <li key={appointment.id} className="flex overflow-hidden gap-1 card">
              <div className="w-4 min-h-full bg-secondary" />
              <div className="flex items-center gap-4 p-2 group">

                <div className="flex-1">
                  <h5 className="font-medium">{appointment.title}</h5>
                  <p className="text-grey-300 text-xs">
                    {appointment.startTime} - {appointment.endTime}
                  </p>
                </div>
                <div className="flex">

                  <Image
                    src={appointment.mentorImage}
                    alt={appointment.mentor}
                    className="rounded-xl object-cover border-3 border-white"
                    width={48}
                    height={48}
                  />
                  <Image
                    src={appointment.menteeImage}
                    alt={appointment.mentor}
                    className="rounded-xl shadow-md object-cover -translate-x-5 group-hover:translate-x-0 transition-transform ease-in-out border-3 border-white"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>


        <article className="space-y-4">
          <h4> Top Mentors</h4>
          <ul className="space-y-3 divide-Line divide-y">
            {
              topMentors.map(({ name, totalCalls, image }, idx) => (
                <li key={idx} className="flex  items-center gap-3 pb-2">

                  <Image src={image} alt={name}
                    className="rounded-xl object-cover border-3 border-white"
                    width={48}
                    height={48} />

                  <div>
                    <p className="font-medium ">{name}</p>
                    <small className="text-grey-300">{totalCalls} Consultations</small>
                  </div>

                </li>
              ))
            }
          </ul>
        </article>
      </div>
    </aside>
  );
};
