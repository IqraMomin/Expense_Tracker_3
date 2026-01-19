import React from 'react'
import { Table } from 'react-bootstrap';
import "./RecentTransaction.css"

function RecentTransaction({expense,isRecent}) {
    const recentExpense = [...expense].sort((a,b)=>{
        return new Date(b.date) - new Date(a.date);
    })
    const latestExpense = recentExpense.slice(0,5);
    return (
        <Table striped bordered={false} hover responsive className='recent-table bg-light mt-3'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {(isRecent===true ? latestExpense : expense).map(ele=>{
                   return <tr key={ele.id}>
                        <td>{ele.date}</td>
                        <td>{ele.category}</td>
                        <td>{ele.title}</td>
                        <td>{ele.amount}</td>
                    </tr>
                })}
            </tbody>
        </Table>
    )
}

export default RecentTransaction
