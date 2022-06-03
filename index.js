function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employees) {
  let employeeRecords = [];
  employees.map((employee) => {
    employeeRecords.push(createEmployeeRecord(employee));
  });
  return employeeRecords;
}

function createTimeInEvent(employee, time) {
  let timeInEvent = {
    type: "TimeIn",
    hour: parseInt(time.split(" ")[1]),
    date: time.split(" ")[0],
  };
  employee.timeInEvents.push(timeInEvent);
  return employee;
}

function createTimeOutEvent(employee, time) {
  let timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(time.split(" ")[1]),
    date: time.split(" ")[0],
  };
  employee.timeOutEvents.push(timeOutEvent);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let dayIn = employee.timeInEvents.find((day) => {
    return day.date === date;
  });

  let dayOut = employee.timeOutEvents.find((day) => {
    return day.date === date;
  });

  return (dayOut.hour - dayIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  let sumOfWages = 0;
  employee.timeInEvents.map((day) => {
    sumOfWages += wagesEarnedOnDate(employee, day.date);
  });
  return sumOfWages;
}

function calculatePayroll(employees) {
  let payroll = 0;
  employees.forEach((employee) => {
    payroll += allWagesFor(employee);
  });
  return payroll;
}
