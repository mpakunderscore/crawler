const svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

const simulation = d3.forceSimulation().nodes(nodes_data);

simulation.force("charge_force", d3.forceManyBody()).force("center_force", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links_data)
    .enter().append("line");

const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes_data)
    .enter().append("circle")
    .attr("r", 4)
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

//add tick instructions:
simulation.on("tick", tickActions);

const link_force =  d3.forceLink(links_data).id(function(d) { return d.id; });

simulation.force("links", link_force);


function tickActions() {
      //update circle positions each tick of the simulation


      //update link positions
      //simply tells one end of the line to follow one node around
      //and the other end of the line to follow the other node around
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
      node
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
}

function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
}

function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
}

function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
}


