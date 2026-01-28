const ctx = document.getElementById('transactionChart').getContext('2d');

const transactionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Sep 4", "Sep 10", "Sep 18", "Sep 24"],
        datasets: [{
            label: "Transactions",
            data: [70000, 65000, 50000, 53000],
            borderColor: "#80B4FF",
            borderWidth: 1.5,
            fill: false,
            tension: 0.3,
            pointRadius: 0, // Removes point dots
            pointHoverRadius: 0, // Prevents dot on hover
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            y: {
                ticks: {
                    color: "#494949",
                    font: {
                        size: 10,
                        family: "Roboto Condensed"
                    },
                    callback: function (value) {
                        return value / 1000 + 'k';
                    }
                },
                grid: { display: false }
            },
            x: {
                ticks: {
                    color: "#494949",
                    font: {
                        size: 10,
                        family: "Roboto Condensed"
                    }
                },
                grid: { display: false }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false } // Disables tooltip
        }
    }
});
