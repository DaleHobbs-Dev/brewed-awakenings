import { getEmployees, getOrders } from "./database.js";

const employees = getEmployees();
const orders = getOrders();

// Build orderCount
const orderCount = orders.reduce((counts, { employeeId }) => {
  counts.set(employeeId, (counts.get(employeeId) ?? 0) + 1);
  return counts;
}, new Map());

// Build employeeSales
const employeeSales = employees.map(({ id, name }) => ({
  id,
  name,
  numberSold: orderCount.get(id) ?? 0,
}));

export const Employees = () => {
  let html = "<ul>";

  for (const employee of employees) {
    html += `<li data-type="employee" data-employee-id="${employee.id}">${employee.name}</li>`;
  }

  html += "</ul>";

  return html;
};

document.addEventListener("click", (clickEvent) => {
  const clickedTarget = clickEvent.target;
  const type = clickedTarget.dataset.type;
  const employeeID = parseInt(clickedTarget.dataset.employeeId, 10);

  if (type === "employee") {
    const employee = employeeSales.find((e) => e.id === employeeID);
    window.alert(`${employee.name} sold ${employee.numberSold} products.`);
  }
});

//Old Method of Building new Object that connected employees with number of orders they sold

// // This code connects the employee ID with the number of products sold making new objects
// // Each object -> employeeID : numberProductsSold
// const orderCount = {};
// for (const order of orders) {
//   // Counting mechanism where employee ID is used as the key
//   // If there is a value with the key, takes it and + 1
//   // If there is not a value with the key, uses 0 then + 1
//   orderCount[order.employeeId] = (orderCount[order.employeeId] ?? 0) + 1;
// }

// // Builds new objects that contain employees matched with their ID and number of products sold
// const employeeSales = employees.map(employee => ({
//   id: employee.id,
//   name: employee.name,
//   numberSold: orderCount[employee.id] ?? 0
// }));