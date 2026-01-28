// Function to toggle the dropdown menu (from your original code)
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
    }
}

// Close the dropdown if the user clicks outside of it (from your original code)
window.onclick = function (event) {
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
    const ctx = document.getElementById('ethPendingChart').getContext('2d');

    // Generate dataset for the specific date range (Feb 27, 2025 to Mar 3, 2025)
    const dataPoints = [];
    const startDate = new Date('2025-02-27');
    const endDate = new Date('2025-03-03');
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        let value;

        // Simulate the trend seen in the image
        if (currentDate < new Date('2025-03-01')) {
            // Feb 27 to Feb 28: High activity (80k–90k)
            value = 80000 + Math.random() * 10000;
        } else if (currentDate < new Date('2025-03-02')) {
            // Mar 1: Sharp drop to near 0
            value = Math.random() * 1000;
        } else {
            // Mar 2 to Mar 3: Slight recovery (20k–30k)
            value = 20000 + Math.random() * 10000;
        }

        dataPoints.push({ date: dateStr, value: value });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Extract labels and data for Chart.js
    const labels = dataPoints.map(point => point.date);
    const data = dataPoints.map(point => point.value);

    // Create a gradient for the fill (shadow effect)
    // Adjusted to match the image: lighter blue at the top, darker semi-transparent blue at the bottom
    const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Top to bottom
    gradient.addColorStop(0, '#7CB5EC'); // Lighter blue at the top
    gradient.addColorStop(1, 'rgba(124, 181, 236, 0.2)'); // Darker blue at the bottom
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pending Txn Count (Per Minute)',
                data: data,
                borderColor: '#7CB5EC',
                backgroundColor: gradient, // Use the new gradient for fill
                fill: true,
                tension: 0, // Sharp, jagged lines
                pointRadius: 0,
                borderWidth: 0.5 // Thinner line to match the image
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MMM d, yyyy',
                        displayFormats: {
                            day: 'MMM d'
                        }
                    },
                    grid: {
                        display: false // No grid lines for X-axis
                    },
                    ticks: {
                        display: false, // Hide X-axis labels to remove bottom dates
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
                    max: 100000, // 100k, as in the image
                    ticks: {
                        color: '#888',
                        stepSize: 20000, // 20k intervals
                        callback: function (value) {
                            return (value / 1000) + 'k'; // Format as "k"
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
                        text: 'Pending Txn Count (Per Minute)',
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
                },
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x'
                    },
                    pan: {
                        enabled: true,
                        mode: 'x'
                    }
                },
                // Custom plugin to set the background color
                beforeDraw: (chart) => {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.fillStyle = '#1A1A1A'; // Dark background
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            },
            interaction: {
                mode: 'nearest',
                intersect: false
            }
        }
    });
});