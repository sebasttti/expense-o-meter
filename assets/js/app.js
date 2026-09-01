document.addEventListener('DOMContentLoaded', () => {
    if (period.start) {
        periodStartInput.value = period.start;
    }

    if (period.end) {
        periodEndInput.value = period.end;
    }
    renderExpenses();
});