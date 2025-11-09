import React,{Fragment} from 'react'
import ExpenseItem from './ExpenseItem';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';


function ExpenseList({onEdit}) {
    const expenseList = useSelector(state=>state.expense.expenseList);
    const premium = useSelector(state=>state.theme.activatePremium);
    const headers = [
        {label:"ID",key:"id"},
        {label:"Expense",key:"title"},
        {label:"Category",key:"category"}       
    ]
    
    return (
        <Fragment>
        <ul>
            {expenseList.map(ele=>{
                return <ExpenseItem
                key={ele.id}
                expense={ele}
                onEdit={onEdit}/>
            })}
        </ul>
        {premium && <CSVLink 
        data={expenseList}
        headers={headers}
        filename='userData.csv'>Download File</CSVLink>}
        
        </Fragment>
        
    )
}

export default ExpenseList
