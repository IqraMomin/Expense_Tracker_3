export function getMonthlySpending(expenses) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const monthlyTotals = months.map(m => ({ month: m, amount: 0 }));
  
    expenses.forEach((exp) => {
      const date = new Date(exp.date);
      const monthIndex = date.getMonth();
  
      monthlyTotals[monthIndex].amount += Number(exp.amount);
    });
  
    return monthlyTotals;
  }
  