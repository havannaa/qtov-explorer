
// Function to toggle the dropdown menu
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.toggle-button')) {
        const dropdowns = document.getElementsByClassName('dropdown-menu');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('ethChart').getContext('2d');

    // Generate a more detailed dataset with daily data points and high volatility
    const dataPoints = [];
    const startDate = new Date('2015-07-30');
    const endDate = new Date('2025-03-02');
    let currentDate = new Date(startDate);
    let baseValue = 10; // Starting base value

    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        let value;

        // Define the overall trend
        if (currentDate < new Date('2017-01-01')) {
            // 2015-2016: Low activity with small fluctuations
            baseValue = 10 + Math.random() * 20;
        } else if (currentDate < new Date('2019-01-01')) {
            // 2017-2018: Rapid growth with high volatility
            baseValue = Math.min(1000, baseValue + Math.random() * 50);
        } else if (currentDate < new Date('2022-01-01')) {
            // 2019-2021: High activity with peaks
            baseValue = 800 + Math.random() * 800;
        } else {
            // 2022-2025: Fluctuating but generally lower
            baseValue = 500 + Math.random() * 500;
        }

        // Add high-frequency noise and occasional spikes
        const noise = (Math.random() - 0.5) * 400; // High-frequency noise (±200)
        const spike = Math.random() < 0.02 ? (Math.random() * 1000) : 0; // 2% chance of a spike (up to 1000)
        value = Math.max(0, baseValue + noise + spike); // Ensure value doesn't go negative

        dataPoints.push({ date: dateStr, value: value });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Extract labels and data for Chart.js
    const labels = dataPoints.map(point => point.date);
    const data = dataPoints.map(point => point.value);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Transactions per Day',
                data: data,
                borderColor: '#7CB5EC',
                // backgroundColor: 'rgba(124, 181, 236, 0.1)',
                fill: true,
                tension: 0, // Set tension to 0 for sharp, jagged lines
                pointRadius: 0,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'year',
                        tooltipFormat: 'MMM d, yyyy',
                        displayFormats: {
                            year: 'yyyy'
                        }
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#888',
                        maxTicksLimit: 10,
                        font: {
                            family: 'Inter',
                            size: 11,
                            weight: 400,
                            lineHeight: 'normal'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 2500,
                    ticks: {
                        color: '#888',
                        stepSize: 500,
                        callback: function (value) {
                            if (value >= 1000) {
                                return (value / 1000) + 'k';
                            }
                            return value + 'k';
                        },
                        font: {
                            family: 'Inter',
                            size: 11,
                            weight: 400,
                            lineHeight: 'normal'
                        }
                    },
                    grid: {
                        color: '#333333',
                        borderDash: [5, 5]
                    },
                    title: {
                        display: true,
                        text: 'Transactions per Day',
                        color: '#CCC',
                        align: 'center',
                        padding: 10,
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: 400,
                            lineHeight: 'normal'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#333333',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#555555',
                    borderWidth: 1
                }
            },
            interaction: {
                mode: 'nearest',
                intersect: false
            }
        }
    });
});