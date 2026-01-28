// Function to create or update the heatmap
function drawHeatmap() {
    // Clear any existing SVG to avoid duplicates
    d3.select("#heatmap").select("svg").remove();

    // Get the container dimensions
    const container = document.getElementById("heatmap");
    const containerWidth = container.clientWidth;

    // Calculate dimensions based on the container width
    const aspectRatio = 0.5; // Height is half the width
    const width = containerWidth;
    const height = containerWidth * aspectRatio;

    // Responsive margins
    const margin = {
        top: Math.max(30, containerWidth * 0.05),
        right: Math.max(10, containerWidth * 0.02),
        bottom: Math.max(40, containerWidth * 0.08),
        left: Math.max(60, containerWidth * 0.12)
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Data: 8 days (rows) x 24 hours (columns)
    const data = [];
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 24; x++) {
            let value = 0;
            if (y === 0 && (x === 14 || x === 15)) value = 40;
            if (y === 3 && (x === 6 || x === 7)) value = 20;
            if (y === 3 && x === 14) value = 40;
            if (y === 5 && (x === 16 || x === 17)) value = 50;
            if (y === 7 && x === 0) value = 10;
            data.push({ x: x, y: y, value: value });
        }
    }

    // Create SVG
    const svg = d3.select("#heatmap")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleBand()
        .range([0, innerWidth])
        .domain(d3.range(24))
        .padding(0.05);

    const y = d3.scaleBand()
        .range([0, innerHeight])
        .domain(d3.range(8))
        .padding(0.05);

    const color = d3.scaleLinear()
        .domain([0, 50])
        .range(["#FEF1E4", "#EF7D41"]);

    // Draw the heatmap (no grid lines)
    svg.selectAll()
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.x))
        .attr("y", d => y(d.y))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", d => color(d.value))
        .style("stroke", "none"); // No lines between rectangles

    // X-axis (bottom axis) - no domain line, no tick lines
    const xAxis = svg.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).tickSize(0)); // tickSize(0) removes tick lines
    xAxis.select(".domain").remove(); // Remove X-axis domain line
    xAxis.selectAll("text")
        .style("fill", "#888888")
        .style("font-family", "Lucida Sans Unicode")
        .style("font-weight", "400")
        .style("font-size", "11px")
        .style("line-height", "100%")
        .style("letter-spacing", "0%")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle");

    // "Hours (UTC)" label
    svg.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .style("fill", "#888888")
        .style("font-family", "Lucida Sans Unicode")
        .style("font-weight", "400")
        .style("font-size", "12px")
        .style("line-height", "100%")
        .style("letter-spacing", "0%")
        .style("text-anchor", "middle")
        .text("Hours (UTC)");

    // Y-axis (left axis) - no domain line, no tick lines
    const yAxis = svg.append("g")
        .call(d3.axisLeft(y).tickSize(0).tickFormat((d, i) => [
            'Tue, 25 Feb',
            'Wed, 26 Feb',
            'Thu, 27 Feb',
            'Fri, 28 Feb',
            'Sat, 01 Mar',
            'Sun, 02 Mar',
            'Mon, 03 Mar',
            'Tue, 04 Mar'
        ][i]));
    yAxis.select(".domain").remove(); // Remove Y-axis domain line
    yAxis.selectAll("text")
        .style("fill", "#888888")
        .style("font-family", "Inter")
        .style("font-weight", "400")
        .style("font-size", "11px")
        .style("line-height", "100%")
        .style("letter-spacing", "0%")
        .style("text-anchor", "end");

    // Remove any existing color scale and add a new one
    d3.select("#heatmap").select(".color-scale").remove();
    const colorScale = d3.select("#heatmap")
        .append("div")
        .attr("class", "color-scale");

    colorScale.append("div")
        .attr("class", "gradient");

    colorScale.append("div")
        .attr("class", "scale-labels")
        .html(`
            <span>0</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
            <span>50</span>
        `);
}

// Initial draw
drawHeatmap();

// Redraw on window resize
window.addEventListener("resize", drawHeatmap);