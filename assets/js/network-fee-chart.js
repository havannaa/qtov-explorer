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
    const ctx = document.getElementById('networkFeeChart').getContext('2d');

    // Generate a dataset for transaction fees with similar distribution to the image
    const dataPoints = [];
    const startDate = new Date('2015-07-30');
    const endDate = new Date('2025-03-02');
    let currentDate = new Date(startDate);
    let baseValue = 10; // Starting base value for fees

    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        let value;

        // Define the overall trend based on the image
        if (currentDate < new Date('2017-01-01')) {
            // 2015-2016: Low fees with small fluctuations
            baseValue = 10 + Math.random() * 50;
        } else if (currentDate < new Date('2019-01-01')) {
            // 2017-2018: Moderate growth with some spikes
            baseValue = Math.min(500, baseValue + Math.random() * 100);
        } else if (currentDate < new Date('2022-01-01')) {
            // 2019-2021: High fees with significant spikes (up to 50k)
            baseValue = 1000 + Math.random() * 4000;
        } else {
            // 2022-2025: Fluctuating but generally lower
            baseValue = 500 + Math.random() * 1500;
        }

        // Add high-frequency noise and occasional large spikes
        const noise = (Math.random() - 0.5) * 1000; // High-frequency noise (±500)
        const spike = Math.random() < 0.05 ? (Math.random() * 40000) : 0; // 5% chance of a large spike (up to 40k)
        value = Math.max(0, baseValue + noise + spike); // Ensure value doesn't go negative

        dataPoints.push({ date: dateStr, value: value });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Extract labels and data for Chart.js
    const labels = dataPoints.map(point => point.date);
    const data = dataPoints.map(point => point.value);

    new Chart(ctx, {
        type: 'bar', // Use bar type to create a histogram
        data: {
            labels: labels,
            datasets: [{
                label: 'Tx Fee (Qtov)',
                data: data,
                backgroundColor: 'rgba(124, 181, 236, 0.5)',
                borderColor: '#7CB5EC',
                borderWidth: 1,
                barPercentage: 1.0, // Make bars touch each other for a histogram look
                categoryPercentage: 1.0
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
                    max: 50000, // Match the y-axis range in the image
                    ticks: {
                        color: '#888',
                        stepSize: 10000,
                        callback: function (value) {
                            if (value >= 1000) {
                                return (value / 1000) + 'k';
                            }
                            return value;
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
                        text: 'Tx Fee (Qtov)',
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