import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getMonthlyTotal } from '../../utils/dateUtils';
import RecentTransaction from './RecentTransaction';
import MonthlySpendingChart from './MonthlySpendingChart';


function DashboardContent() {
    const total = useSelector(state=>state.expense.totalExpense);
    const expense = useSelector(state=>state.expense.expenseList);
    const monthlyExpense = getMonthlyTotal(expense);
   
    return (
        <Row className="gy-4 gx-4 justify-content-center">
            <h2>Dashboard</h2>
            {/* Row 1 - 2 Columns */}
            <Col md={6}>
                <Card className='shadow-sm'>
                    <Card.Body>
                        <Card.Title>Total Spending</Card.Title>
                        <h2>${total}</h2>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={6}>
                <Card className='shadow-sm' style={{backgroundColor: "#bc9df6"}}>
                    <Card.Body>
                        <Card.Title>Monthly Summary</Card.Title>
                        <h2>${monthlyExpense}</h2>
                    </Card.Body>
                </Card>
            </Col>

            {/* Row 2 - 2 Columns */}

            <Col md={12}>
                <h2>Monthly Spending</h2>
                <MonthlySpendingChart/>
            </Col>
        
        <Col md={12}>
        <h2>
            Recent Transaction
        </h2>
            <RecentTransaction expense={expense} isRecent={true}/>

        </Col>
        </Row>
    )
}

export default DashboardContent
