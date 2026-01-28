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
    const ctx = document.getElementById('avgFeeChart').getContext('2d');

    // Generate a dataset for transaction fees with distribution matching the image
    const dataPoints = [];
    const startDate = new Date('2015-07-30');
    const endDate = new Date('2025-03-02');
    let currentDate = new Date(startDate);
    let baseValue = 1; // Starting base value for fees

    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        let value;

        // Define the overall trend based on the image
        if (currentDate < new Date('2018-01-01')) {
            // 2015-2017: Very low fees with minimal fluctuations
            baseValue = 1 + Math.random() * 2; // Fees mostly 1-3 USD
        } else if (currentDate < new Date('2020-01-01')) {
            // 2018-2019: Low fees with occasional small spikes
            baseValue = 2 + Math.random() * 5; // Baseline around 2-7 USD
        } else if (currentDate < new Date('2021-01-01')) {
            // 2020: Gradual increase in fees
            baseValue = 5 + (Math.random() * 15) + (currentDate.getTime() - new Date('2020-01-01').getTime()) / (new Date('2021-01-01').getTime() - new Date('2020-01-01').getTime()) * 15; // Gradual increase from 5-20 to 20-35 USD
        } else if (currentDate < new Date('2022-01-01')) {
            // 2021: High fees with significant spikes (up to 200 USD)
            baseValue = 30 + Math.random() * 20; // Baseline around 30-50 USD
        } else {
            // 2022-2025: Fluctuating but lower than 2021 peak
            baseValue = 10 + Math.random() * 20; // Baseline around 10-30 USD
        }

        // Add high-frequency noise and specific large spikes
        const noise = (Math.random() - 0.5) * 2; // Reduced noise (±1 USD)
        let spike = 0;

        // Specific large spikes in 2021
        if (currentDate >= new Date('2021-05-01') && currentDate < new Date('2021-06-01') && Math.random() < 0.2) {
            spike = 150 + Math.random() * 50; // Major spike in May 2021 (up to 200 USD)
        } else if (currentDate >= new Date('2021-01-01') && currentDate < new Date('2022-01-01') && Math.random() < 0.05) {
            spike = 50 + Math.random() * 50; // Smaller spikes in 2021 (up to 100 USD)
        } else if (currentDate >= new Date('2018-01-01') && currentDate < new Date('2020-01-01') && Math.random() < 0.01) {
            spike = 10 + Math.random() * 10; // Rare small spikes in 2018-2019 (up to 20 USD)
        } else if (currentDate >= new Date('2022-01-01') && Math.random() < 0.02) {
            spike = 20 + Math.random() * 30; // Occasional spikes in 2022-2025 (up to 50 USD)
        }

        value = Math.max(0, baseValue + noise + spike); // Ensure value doesn't go negative
        value = Math.min(value, 250); // Cap the value at 250 USD to match the image

        dataPoints.push({ date: dateStr, value: value });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Extract labels and data for Chart.js
    const labels = dataPoints.map(point => point.date);
    const data = dataPoints.map(point => point.value);

    new Chart(ctx, {
        type: 'line', // Use line chart with filled area to match the image style
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Transaction Fee (USD)',
                data: data,
                backgroundColor: 'rgba(124, 181, 236, 0.5)', // Filled area color
                borderColor: '#7CB5EC',
                borderWidth: 1,
                fill: true, // Fill the area under the line
                tension: 0 // No curve, straight lines to match the image
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
                    max: 250, // Match the y-axis range in the image
                    ticks: {
                        color: '#888',
                        stepSize: 50, // Match the image's y-axis increments
                        callback: function (value) {
                            return value; // Display raw values (no 'k' needed)
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
                        text: 'Average Transaction Fee (USD)',
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
                    display: false // Hide the legend as in the image
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