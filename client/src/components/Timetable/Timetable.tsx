import "./Timetable.style.scss";

export enum Days {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export interface CalendarBlock {
  label: string;
  startTime: string;
  endTime: string;
  days: Days[];
}

interface TimetableProps {
  events: CalendarBlock[];
}

function Timetable({ events }: TimetableProps) {
  const eventsToDisplay = events.filter(
    (event) =>
      event.startTime !== "" &&
      event.endTime !== "" &&
      event.startTime !== "NA" &&
      event.endTime !== "NA",
  );

  // Re-order days to start from Monday and move Sunday to the end
  const orderedDays = [
    Days.Monday,
    Days.Tuesday,
    Days.Wednesday,
    Days.Thursday,
    Days.Friday,
    Days.Saturday,
    Days.Sunday,
  ];

  return (
    <div className="Timetable">
      <table>
        <thead>
          <tr className="Timetable__head">
            <th></th>
            {orderedDays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 22 }, (_, i) => {
            const hour = 8 + Math.floor(i / 2);
            const minute = i % 2 === 0 ? "00" : "30";
            const timeLabel = `${hour}:${minute}`;
            return (
              <tr key={timeLabel}>
                <td className={i % 2 === 0 ? "Timetable__cell--time" : ""}>
                  {i % 2 === 0 ? timeLabel : null}
                </td>
                {orderedDays.map((day) => {
                  const eventsForCell = eventsToDisplay.filter(
                    (event) =>
                      event.days.includes(day) &&
                      (parseInt(event.startTime.split(":")[0]) < hour ||
                        (parseInt(event.startTime.split(":")[0]) === hour &&
                          parseInt(event.startTime.split(":")[1]) <=
                            parseInt(minute))) &&
                      (parseInt(event.endTime.split(":")[0]) > hour ||
                        (parseInt(event.endTime.split(":")[0]) === hour &&
                          parseInt(event.endTime.split(":")[1]) >
                            parseInt(minute))),
                  );

                  return (
                    <td
                      key={day}
                      className={`${
                        eventsForCell.length > 1
                          ? "Timetable__cell--event Timetable__cell--multiple-events"
                          : eventsForCell.length === 1
                          ? "Timetable__cell--event"
                          : ""
                      }`}
                    >
                      {eventsForCell.map((event, index) => (
                        <div key={index} className="Timetable__event">
                          <span className="event-label">{event.label}</span>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
