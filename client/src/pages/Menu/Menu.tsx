import { Central as Layout } from "@/layouts";
import { CabinetSection } from "./CabinetSection";
import "./Menu.style.scss";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <Layout title={"Main Menu"}>
      <div className="Menu">
        <CabinetSection
          title="Personal Information"
          lineItems={[
            <Link to="/404">
              <b>Self Identification Survey</b>
            </Link>,
            <Link to="/404">Update addresses and phone numbers</Link>,
            <Link to="/404">View name change information</Link>,
            <Link to="/404">Personal Emergency Contact Information</Link>,
            <span>
              <b>Campus Card:</b> The CampusCard online services can now be
              accessed through the{" "}
              <a href="https://wcc.carleton.ca/student/welcome.php">
                CampusCard Web Center
              </a>
            </span>,
            <Link to="/404">
              MyCarletonOne Account information and Carleton Email address
            </Link>,
            <Link to="/404">Travel Registry</Link>,
            <Link to="/404">Manage Email Communications</Link>,
            <Link to="/404">Chosen Name</Link>,
            <Link to="/404">Pronouns</Link>,
            <Link to="/404">Submit Social Insurance Number (SIN)</Link>,
          ]}
        />
        <CabinetSection
          title="Student Records"
          lineItems={[
            <span>
              <b>Graduate Admissions:</b> Graduate Admissions and Graduate
              In-Program Revisions.
            </span>,
            <Link to="/404">
              <b>Admissions</b> Review admission application, View Holds and
              Conditions of Offer, Internal Application for Admission
            </Link>,
            <Link to="/404">
              <b>myGrades</b> Display grades
            </Link>,
            <Link to="/404">
              <b>myProgress (ACE: Academic Continuation Evaluation)</b>
            </Link>,
            <Link to="/404">
              <b>myExam Schedule</b>
            </Link>,
            <Link to="/404">
              <b>myRegistration</b> View/Print Registration Form
            </Link>,
            <Link to="/404">Change Your Curriculum</Link>,
            <Link to="/404">
              <b>myDegreeAudit</b> Display degree audit
            </Link>,
          ]}
        />
        <CabinetSection
          title="Build Timetable"
          lineItems={[
            <Link to="/build-timetable">Build Timetable</Link>,
          ]}
        />
        <CabinetSection
          title="Timetables"
          lineItems={[
            <Link to="/timetables">Timetables</Link>,
          ]}
        />
        <CabinetSection
          title="Other Services"
          lineItems={[
            <Link to="/404">French Placement Test</Link>,
            <Link to="/404">Purchase Books</Link>,
            <Link to="/404">Manage Email Communications</Link>,
          ]}
        />
      </div>
    </Layout>
  );
}

export default Menu;
