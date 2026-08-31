const form = document.getElementById('expenseForm');
const dateInput = document.getElementById('date');
const amountInput = document.getElementById('amount');
const observationInput = document.getElementById('observation');

const expenseTable = document.getElementById('expenseTable');
const emptyMessage = document.getElementById('emptyMessage');

const totalAmount = document.getElementById('totalAmount');
const expenseCount = document.getElementById('expenseCount');

// Obtener gastos guardados
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Fecha actual por defecto
const today = new Date();

dateInput.value = today.toISOString().split('T')[0];

// Registrar gasto
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const expense = {
    id: Date.now(),
    date: dateInput.value,
    amount: parseFloat(amountInput.value),
    observation: observationInput.value.trim(),
  };

  expenses.push(expense);

  saveExpenses();

  renderExpenses();

  // Limpiar formulario
  amountInput.value = '';
  observationInput.value = '';

  amountInput.focus();
});

// Guardar en localStorage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Renderizar gastos
function renderExpenses() {
    expenseTable.innerHTML = '';

    const today = new Date();

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Filtrar únicamente los gastos del mes actual
    const currentMonthExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);

        return (
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
        );
    });

    // Mostrar mensaje si no hay gastos este mes
    if (currentMonthExpenses.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
    }

    // Ordenar del más reciente al más antiguo
    const sortedExpenses = [...currentMonthExpenses].sort(
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

    updateSummary(currentMonthExpenses);
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
function updateSummary(monthExpenses) {
    const total = monthExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    totalAmount.textContent = formatCurrency(total);
    expenseCount.textContent = monthExpenses.length;
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
