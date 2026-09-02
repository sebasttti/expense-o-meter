//Iniciar el DOM
document.addEventListener('DOMContentLoaded', () => {
    if (period.start) {
        periodStartInput.value = period.start;
    }

    if (period.end) {
        periodEndInput.value = period.end;
    }

    dateInput.value = today.toISOString().split('T')[0];
    
    renderExpenses();
});

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