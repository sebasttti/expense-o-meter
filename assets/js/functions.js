const form = document.getElementById('expenseForm');
const dateInput = document.getElementById('date');
const amountInput = document.getElementById('amount');
const observationInput = document.getElementById('observation');

const expenseTable = document.getElementById('expenseTable');
const emptyMessage = document.getElementById('emptyMessage');

const totalAmount = document.getElementById('totalAmount');
const expenseCount = document.getElementById('expenseCount');
const periodStartInput = document.getElementById('periodStart');
const periodEndInput = document.getElementById('periodEnd');

let period = JSON.parse( localStorage.getItem('expensePeriod') ) || {     start: '',     end: '' };
// Obtener gastos guardados
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
// Fecha actual por defecto
const today = new Date();

function applyPeriod() {

    const start = periodStartInput.value;
    const end = periodEndInput.value;

    if (!start || !end) {
        alert('Debes seleccionar ambas fechas.');
        return;
    }

    if (start > end) {
        alert('La fecha inicial no puede ser mayor que la fecha final.');
        return;
    }

    period = {
        start: start,
        end: end
    };

    localStorage.setItem(
        'expensePeriod',
        JSON.stringify(period)
    );

    renderExpenses();

    
}

// Guardar en localStorage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Renderizar gastos
function renderExpenses() {

    expenseTable.innerHTML = '';

    const currentPeriodExpenses = expenses.filter((expense) => {

        if (!period.start || !period.end) {
            return false;
        }

        return (
            expense.date >= period.start &&
            expense.date <= period.end
        );

    });

    if (currentPeriodExpenses.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
    }

    const sortedExpenses = [...currentPeriodExpenses].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    sortedExpenses.forEach((expense) => {

        const row = document.createElement('tr');

        row.className =
            'border-b border-gray-200 dark:border-gray-800';

        row.innerHTML = `
            <td class="px-6 py-4">
                ${formatDate(expense.date)}
            </td>

            <td class="px-6 py-4 font-semibold">
                ${formatCurrency(expense.amount)}
            </td>

            <td class="px-6 py-4 text-gray-600 dark:text-gray-400">
                ${escapeHtml(expense.observation)}
            </td>

            <td class="px-6 py-4 text-right">
                <button
                    onclick="deleteExpense(${expense.id})"
                    class="text-red-600 hover:text-red-800
                           dark:text-red-400"
                >
                    Eliminar
                </button>
            </td>
        `;

        expenseTable.appendChild(row);
    });

    updateSummary(currentPeriodExpenses);
}

// Eliminar gasto
function deleteExpense(id) {
  if (!confirm('¿Deseas eliminar este gasto?')) {
    return;
  }

  expenses = expenses.filter((expense) => expense.id !== id);

  saveExpenses();

  renderExpenses();
}

// Actualizar resumen
function updateSummary(currentPeriodExpenses) {
    const total = currentPeriodExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    totalAmount.textContent = formatCurrency(total);
}

// Formatear moneda
function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

// Formatear fecha
function formatDate(date) {
  const [year, month, day] = date.split('-');

  return `${day}/${month}/${year}`;
}

// Evitar insertar HTML desde la observación
function escapeHtml(text) {
  const div = document.createElement('div');

  div.textContent = text;

  return div.innerHTML;
}
