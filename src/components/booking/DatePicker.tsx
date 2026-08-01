"use client";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";

dayjs.extend(isSameOrBefore);

interface BookingDatePickerProps {
    bookedDates: {
        startDate: Date;
        endDate: Date;
    }[];
    checkIn: Dayjs | null;
    checkOut: Dayjs | null;
    setCheckIn: (date: Dayjs | null) => void;
    setCheckOut: (date: Dayjs | null) => void;
}

export function BookingDatePicker({
    bookedDates,
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
}: BookingDatePickerProps) {
    const isBooked = (date: Dayjs) => {
        return bookedDates.some((booking) => {
            const start = dayjs(booking.startDate);
            const end = dayjs(booking.endDate);

            return (
                date.isSame(start, "day") ||
                date.isSame(end, "day") ||
                (date.isAfter(start, "day") && date.isBefore(end, "day"))
            );
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="bg-amber-50 rounded-xl shadow-xs p-2">
                <DatePicker
                    label="Check In"
                    shouldDisableDate={isBooked}
                    value={checkIn}
                    onChange={(newCheckIn) => {
                        setCheckIn(newCheckIn);

                        if (checkOut && newCheckIn && checkOut.isSameOrBefore(newCheckIn, "day")) {
                            setCheckOut(null);
                        }
                    }}
                />
            </div>
            <div className="bg-amber-50 rounded-xl shadow-xs p-2">
                <DatePicker
                    label="Check Out"
                    disablePast
                    minDate={checkIn ?? dayjs()}
                    shouldDisableDate={isBooked}
                    value={checkOut}
                    onChange={setCheckOut}
                />
            </div>
        </LocalizationProvider>
    );
}
