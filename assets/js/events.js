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