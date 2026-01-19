import React,{Fragment} from 'react'
import ExpenseItem from './ExpenseItem';
import { CSVLink } from 'react-csv';
import { Table } from 'react-bootstrap';
import "../Dashboard/RecentTransaction.css"
import "./ExpenseList.css"


function ExpenseList({onEdit,expenseList}) {
    // const premium = useSelector(state=>state.theme.activatePremium);
    const headers = [
        {label:"ID",key:"id"},
        {label:"Date",key:"date"} ,
        {label:"Expense",key:"title"},
        {label:"Category",key:"category"} ,
        {label:"Amount",key:"amount"} ,
              
    ]
    
    return (
        <Fragment>
  {/* TABLE WRAPPER */}
  <div className="table-wrapper">
    <Table
      striped
      bordered={false}
      hover
      responsive
      className="recent-table bg-light mt-3"
    >
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Edit Expense</th>
          <th>Remove Expense</th>
        </tr>
      </thead>
      <tbody>
        {expenseList.map(ele => (
          <ExpenseItem
            key={ele.id}
            expense={ele}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </Table>
    <CSVLink
      data={expenseList}
      headers={headers}
      filename="userData.csv"
      className="btn btn-success"
    >
      Download CSV
    </CSVLink>
  </div>

</Fragment>

        
    )
}

export default ExpenseList
