import '../app.css';
const TimelineItem = ({ report }) => {

  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <span className="type-text">
          {report.typetext}
        </span>
      </div>
    </div>
  )
}

export default TimelineItem;
