import moment from 'moment';
import '../app.css';

const TimelineItem = ({ report }) => {
  const formattedTime = moment(report.timecreate).format('lll');
  
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <span className="type-text">
          {report.typetext}
        </span>
        {/* <time>{report.timecreate}</time> */}
        <p className="time-create">Date and Time Reported: {formattedTime}</p>
        <p className='block-address'>Block Address: {report.block_address}</p>
        <p className="timeline-zip">Zip: {report.zip}</p>
        <p className="disposition">Disposition: {report.dispositiontext}</p>
        <span className="circle"></span>
      </div>
    </div>
  )
}

export default TimelineItem;
