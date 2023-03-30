import '../app.css';
import TimelineItem from "./TimelineItem";

const Timeline = ({ reports }) => {

  return (
    <div className="timeline">
      <h1>NOPD Use of Force Timeline</h1>
      <div className="timeline-container">
        {reports.data?.map((report) => {
          return <TimelineItem report={report}/>
        })}
      </div>
    </div>
  )
}

export default Timeline;







// BEFORE REFACTORING TO AN ACTUAL TIMELINE - THIS IS A TABLE

// import "../TimeLine.css"
// const Timeline = ({ reports }) => {

//   return (
//     <div className="tmln-table">
//       <h1>NOPD Use of Force Timeline</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Date Occurred</th>
//             <th>Location</th>
//             <th>Division Level</th>
//             <th>Disposition</th>
//             <th>Use of Force Type</th>
//             <th>Use of Force Reason</th>
//             <th>Subject Injured</th>
//             <th>Subject Hospitalized</th>
//             <th>Subject Arrested</th>
//             <th>Officer Injured</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.data?.map((report) => {
//             return (
//               <tr>
//                 <td>{report.block_address}</td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default Timeline;