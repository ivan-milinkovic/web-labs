"use client";
import {
  format,
  formatDistance,
  formatDuration,
  formatRelative,
  subDays,
  subMinutes,
} from "date-fns";
import { sr } from "date-fns/locale";
import { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Dates() {
  const [date, setDate] = useState<Date | null>(new Date());
  function onDateChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.valueAsDate);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="">
        <div>{format(new Date(), "MM/dd/yyyy")}</div>
        <div>
          {formatDistance(subMinutes(new Date(), 3), new Date(), {
            addSuffix: true,
          })}
        </div>
        <div>
          {formatDistance(new Date(), subMinutes(new Date(), 3), {
            addSuffix: true,
          })}
        </div>
        <div>
          {formatDistance(subDays(new Date(), 3), new Date(), {
            addSuffix: true,
            locale: sr,
          })}
        </div>
        <div>{format(new Date(), "PP", { locale: sr })}</div>
        <div>{formatDuration({ minutes: 2 })}</div>
        <div>{formatRelative(subMinutes(new Date(), 3), new Date())}</div>
        <div>
          {formatRelative(subMinutes(new Date(), 3), new Date(), {
            locale: sr,
          })}
        </div>
        <div>
          <label htmlFor="html-date-input">html date input: </label>
          <input
            type="date"
            id="html-date-input"
            onChange={onDateChange}
            min="2025-01-01"
            max="2025-12-31"
            step="7"
          />
          <div>
            <DatePicker
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                console.log("*** onSelect: " + newDate);
              }}
              onChange={(newDate) => {
                setDate(newDate);
                console.log("*** onChange");
                console.log("*** new: " + newDate);
              }}
              showTimeSelect={true}
              closeOnScroll={true}
              minDate={new Date("2025-01-01")}
              maxDate={new Date("2025-12-31")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
