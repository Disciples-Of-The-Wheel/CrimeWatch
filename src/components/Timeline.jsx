import '../app.css';
import TimelineItem from "./TimelineItem";

const Timeline = ({ reports }) => {

  const sortedReports = reports?.sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
  });

  return (
    <div className="timeline">
      <h1>NOPD Use of Force Timeline</h1>
      <div className="timeline-container">
        {sortedReports?.map((report) => {
          return <TimelineItem report={report}/>
        })}
      </div>
    </div>
  )
}

export default Timeline;


