import '../app.css';

const TimelineItem = ({ report }) => {

  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <span className="type-text">
          {report.typetext}
        </span>
        {/* <time>{report.timecreate}</time> */}
        <p className="time-create">{report.timecreate}</p>
        <p className="timeline-zip">{report.zip}</p>
        <p className="disposition">{report.dispositiontext}</p>
        <span className="circle"></span>
      </div>
    </div>
  )
}

export default TimelineItem;
