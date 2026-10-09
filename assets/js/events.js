//Iniciar el DOM
document.addEventListener('DOMContentLoaded', () => {
    if (period.start) {
        periodStartInput.value = period.start;
    }

    if (period.end) {
        periodEndInput.value = period.end;
    }

    dateInput.value = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0')
    ].join('-');
    
    renderExpenses();
});