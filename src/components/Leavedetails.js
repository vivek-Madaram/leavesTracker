import React, { Component } from 'react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
let Leavesdata = [
   {
      employeeId: '20015548',
      PSID: '3687419',
      employeeName: 'Emp1',
      startDate: '2021-08-26',
      endDate: '2021-08-27',
   },
   {
      employeeId: '20015552',
      PSID: '3687465',
      employeeName: 'Emp2',
      startDate: '2021-08-28',
      endDate: '2021-08-29',
   },
   {
      employeeId: '20015575',
      PSID: '3687492',
      employeeName: 'Emp3',
      startDate: '2021-08-01',
      endDate: '2021-08-02',
   },
   {
      employeeId: '20015554',
      PSID: '3687487',
      employeeName: 'Emp4',
      startDate: '2021-08-03',
      endDate: '2021-08-08',
   },
   {
      employeeId: '20015500',
      PSID: '3687466',
      employeeName: 'Emp5',
      startDate: '2021-08-05',
      endDate: '2021-08-06',
   },
   {
      employeeId: '2001550047',
      PSID: '3687365',
      employeeName: 'Emp6',
      startDate: '2021-08-07',
      endDate: '2021-08-08',
   },
   {
      employeeId: '20015333',
      PSID: '3681258',
      employeeName: 'Emp7',
      startDate: '2021-08-09',
      endDate: '2021-08-10',
   },
   {
      employeeId: '20012388',
      PSID: '3682222',
      employeeName: 'Emp8',
      startDate: '2021-08-11',
      endDate: '2021-08-12',
   },
   {
      employeeId: '20012355',
      PSID: '3681255',
      employeeName: 'Emp9',
      startDate: '2021-08-13',
      endDate: '2021-08-14',
   },
   {
      employeeId: '20015285',
      PSID: '3645698',
      employeeName: 'Emp10',
      startDate: '2021-08-15',
      endDate: '2021-08-16',
   },
];

export class Leavedetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         filteredEmpDetails: [],

         startDate: new Date(),
         endDate: new Date(),
      };
   }
   handleStartDate = (e) => {
      this.setState({ startDate: e.target.value });
      console.log(this.state.startDate);
   };
   handleEndDate = (e) => {
      this.setState({ endDate: e.target.value });
      console.log(this.state.endDate);
   };
   checkValues = (e) => {
      e.preventDefault();
      console.log(this.state.startDate);
      console.log(this.state.endDate);

      if (this.state.endDate <= this.state.startDate) {
         alert('Enter valid Start and End Dates');
      }
      var result = Leavesdata.filter((obj) => {
         return (
            (obj.startDate >= this.state.startDate &&
               obj.startDate <= this.state.endDate) ||
            (obj.endDate >= this.state.startDate &&
               obj.endDate <= this.state.endDate)
         );
      });

      this.setState({ filteredEmpDetails: result });
   };
   onFileDownload = () => {
      const wb1 = XLSX.utils.book_new();
      wb1.Props = {
         Title: 'Merged Sheet',
      };

      wb1.SheetNames.push('Merged Data');
      const ws1 = XLSX.utils.json_to_sheet(this.state.filteredEmpDetails);
      wb1.Sheets['Merged Data'] = ws1;
      const outputSheet1 = XLSX.write(wb1, {
         bookType: 'xlsx',
         type: 'binary',
      });

      var buf1 = new ArrayBuffer(outputSheet1.length); //convert outputSheet to arrayBuffer
      var view1 = new Uint8Array(buf1); //create uint8array as viewer
      for (var j = 0; j < outputSheet1.length; j++)
         view1[j] = outputSheet1.charCodeAt(j) & 0xff; //convert to octet
      saveAs(
         new Blob([buf1], { type: 'application/octet-stream' }),
         'EmployeesLeavesDetails.xlsx'
      );
   };

   render() {
      return (
         <>
            <h1>leaves Details</h1>
            <form>
               <label>Start Date :</label>
               <input
                  type='date'
                  name='startdate'
                  id='startdate'
                  value={this.state.startDate}
                  onChange={(e) => this.handleStartDate(e)}
               />
               <label>End Date :</label>
               <input
                  type='date'
                  value={this.state.endDate}
                  onChange={(e) => this.handleEndDate(e)}
                  id='enddate'
               />
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <button type='submit' onClick={this.checkValues}>
                  Submit
               </button>
            </form>
            <center>
               <div>
                  <table className='table'>
                     <thead className='table-dark'>
                        <tr>
                           <th>Employee ID</th>
                           <th>PSID</th>
                           <th>Employee Name</th>
                           <th>Start Date</th>
                           <th>End Date</th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.state.filteredEmpDetails.map(
                           (employee, index) => (
                              <tr key={index}>
                                 <td>{employee.employeeId}</td>
                                 <td>{employee.PSID}</td>
                                 <td>{employee.employeeName}</td>
                                 <td>{employee.startDate}</td>
                                 <td>{employee.endDate}</td>
                              </tr>
                           )
                        )}
                     </tbody>
                  </table>
               </div>
               <button onClick={this.onFileDownload}>Download Excel</button>
            </center>
         </>
      );
   }
}

export default Leavedetails;
