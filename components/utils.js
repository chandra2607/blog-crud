export function getYesterdayDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday;
  }
  
  export function getLastWeekStartDate() {
    const today = new Date();
    const lastWeekStartDate = new Date(today);
    lastWeekStartDate.setDate(today.getDate() - 7);
    return lastWeekStartDate;
  }
  
  export function getLastMonthStartDate() {
    const today = new Date();
    const lastMonthStartDate = new Date(today);
    lastMonthStartDate.setMonth(today.getMonth() - 1);
    lastMonthStartDate.setDate(1);
    return lastMonthStartDate;
  }
  
  export function getLastMonthEndDate() {
    const today = new Date();
    const lastMonthEndDate = new Date(today);
    lastMonthEndDate.setDate(0); // Set to the last day of the previous month
    return lastMonthEndDate;
  }
  