import { Central as Layout } from "@/layouts";
import { Section } from "./Section";
import { SearchSection } from "./SearchSection";
import { ResultsSection } from "./ResultsSection";
import { TimetableSection } from "./TimetableSection";
import { useState } from "react";
import { ServiceAPI } from "@/infrastructure";
import { ScheduledEvent } from "@/infrastructure/ServiceAPI";
import { WorksheetSection } from "./WorksheetSection";
import { useAccountContext } from "@/context";
import { useNavigate } from "react-router-dom";
import { scheduledEventToCalendarBlock } from "@/utils";
import "./BuildTimetable.style.scss";

function BuildTimetable() {
  const { jwt } = useAccountContext();
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<ScheduledEvent[]>([]);
  const [timetableName, setTimetableName] = useState<string>("");  // Challenge 2: Save and Display Timetable Name
  const navigate = useNavigate();

  const fetchScheduledEvents = async (program:string) => {
    const result = await ServiceAPI.fetchScheduledEvents(program);
    setScheduledEvents(result);
  };

  const createTimetable = async () => {
    const result = await ServiceAPI.createTimetable(
      timetableName,  // Challenge 2: Save and Display Timetable Name
      selectedEvents.map((event) => event.id.toString()),  // Challenge 2: Save and Display Timetable Name
      jwt  // Challenge 2: Save and Display Timetable Name
    );
    
    // Challenge 2: Save and Display Timetable Name
    navigate(`/timetables/${result.data.id}`);
  };

    // Challenge 2: Save and Display Timetable Name
    const addEvent = (event: ScheduledEvent) => {
    setSelectedEvents([...selectedEvents, event]);  // Challenge 2: Save and Display Timetable Name
  };

    // Challenge 2: Save and Display Timetable Name
    const removeEvent = (event: ScheduledEvent) => {
    setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));  // Challenge 2: Save and Display Timetable Name
  };

  return (
    <Layout title={"My Course Worksheet"}>
      <div className="BuildTimetable">
        <Section title="Search">
          <SearchSection onSearch={fetchScheduledEvents} />
        </Section>

        <Section title="Timetable Name">
          <input
            type="text"
            value={timetableName}
            onChange={(e) => setTimetableName(e.target.value)}  // Challenge 2: Save and Display Timetable Name
            placeholder="Enter a name for your timetable"
          />
          <button onClick={createTimetable}>Save Timetable</button>  {/* Challenge 2: Save and Display Timetable Name */}
        </Section>

        <h3>Saved Timetable: {timetableName || "No name saved yet"}</h3>  {/* Challenge 2: Save and Display Timetable Name */}

        {scheduledEvents.length > 0 && (
          <Section title="Results">
            <ResultsSection
              scheduledEvents={scheduledEvents}
              addEvent={addEvent}  // Challenge 2: Save and Display Timetable Name
            />
          </Section>
        )}
        {selectedEvents.length > 0 && (
          <Section title="Worksheet">
            <WorksheetSection
              selectedEvents={selectedEvents}
              removeEvent={removeEvent}  // Challenge 2: Save and Display Timetable Name
              createTimetable={createTimetable}
            />
          </Section>
        )}
        <Section title="Draft Timetable">
          <TimetableSection
            selectedEvents={selectedEvents.map((event: ScheduledEvent) =>
              scheduledEventToCalendarBlock(event),
            )}
          />
        </Section>
      </div>
    </Layout>
  );
}

export default BuildTimetable;


