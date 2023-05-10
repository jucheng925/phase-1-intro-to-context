// Your code here
function createEmployeeRecord(array) {
    const newEmployeeObject = {}
    newEmployeeObject.firstName = array[0];
    newEmployeeObject.familyName = array[1];
    newEmployeeObject.title = array[2];
    newEmployeeObject.payPerHour = array[3];
    newEmployeeObject.timeInEvents = []
    newEmployeeObject.timeOutEvents = []
    return newEmployeeObject
}

function createEmployeeRecords(arrayOfArray) {
    return arrayOfArray.map(createEmployeeRecord)
}

function createTimeInEvent(employeeObject, dateStamp) {
    const newTimeEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4), 10),
        date: dateStamp.slice(0, 10),}
    employeeObject.timeInEvents.push(newTimeEvent)
    return employeeObject
}

function createTimeOutEvent(employeeObject, dateStamp) {
    const newTimeEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4), 10),
        date: dateStamp.slice(0, 10),}
    employeeObject.timeOutEvents.push(newTimeEvent)
    return employeeObject
}

function hoursWorkedOnDate(employeeObject, date) {
    const compareTimeIn = employeeObject.timeInEvents.find(element => element.date === date)
    const compareTimeOut = employeeObject.timeOutEvents.find(element => element.date === date)
    return (compareTimeOut.hour - compareTimeIn.hour) / 100
}

function wagesEarnedOnDate(employeeObject,date) {
    return hoursWorkedOnDate(employeeObject, date) * employeeObject.payPerHour
}

function allWagesFor(employeeObject){
    const datesArray = employeeObject.timeInEvents.map((event) => event.date)
    return datesArray.reduce((accumulator, date) => (wagesEarnedOnDate(employeeObject,date) + accumulator), 0)
    
}

function calculatePayroll(arrayOfEmployeeObject) {
    const wages = arrayOfEmployeeObject.reduce((accumulator, object) => (allWagesFor(object) + accumulator), 0)
    return wages
}