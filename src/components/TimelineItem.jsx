import moment from 'moment';
import '../app.css';

const TimelineItem = ({ report }) => {
  const formattedTime = moment(report.time).format('lll');

  return (
    <div className='timeline-item'>
      <div className='timeline-item-content'>
        <span className='type-text'>
          {report.incident_type}
        </span>
        {/* <time>{report.timecreate}</time> */}
        <p className='time-create'>Date and Time: {formattedTime}</p>
        <p className='block-address'>Address: {report.address}</p>
        <p className='timeline-zip'>Zip: {report.zip}</p>
        {report.user_submitted ?
          <p className='description'>Description: {report.description}</p>
          :
          <p className='disposition'>Result: {report.disposition}</p>
        }
        <span className='circle'></span>
      </div>
    </div>
  )
}

export default TimelineItem;