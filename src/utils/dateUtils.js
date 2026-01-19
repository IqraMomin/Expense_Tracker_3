export function getMonthlyTotal(expense) {
    const now = new Date();
    const currentMonth = now.toLocaleString("en-US",{month:"short"});
    const currentYear = now.getFullYear();
    console.log(currentMonth,currentYear);

    let total = 0;
    expense.forEach(element => {

        const month = element.month;
        const year = element.year;
        console.log(month, year);

        if (month === currentMonth && year === currentYear) {
            total += Number(element.amount);
        }
    });
    return total;
}