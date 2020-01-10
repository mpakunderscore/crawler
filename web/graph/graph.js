const width = 1000, height = 600;

const svg = d3.select("main").append("svg")
    .attr("width", width)
    .attr("height", height);

let link = svg.selectAll("line");
let node = svg.selectAll("node");

let simulation = d3.forceSimulation()
simulation.on("tick", tickActions);

initData();
initSimulation();

function initData() {

  node = node.data(nodes_data, function(d) { return d.id });

  node.exit().remove();

  node = node.enter()
      .append("g")
      .attr("class", "node")
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("circle")
      .attr("r", 5)
      .on("click", function () {

        let title = this.nextSibling.textContent;
        if (title === '')
          title = 'Main_topic_classifications';

        d3.select(this.parent).attr("class", "active")
        d3.select(this.nextSibling).attr("class", "active")

        const response = get('/wiki?title=' + title);
        const responseJson = JSON.parse(response);

        console.log(d3.select(this))
        console.log(links_data)
        console.log(responseJson.categories)

        // nodes_data = [];
        // links_data = [];

        responseJson.categories.forEach(name => {
          nodes_data.push({id: name, group: 1});
          links_data.push({source: title, target: name, value: 100})
        })

        console.log(nodes_data)
        console.log(links_data)

        initData();
        simulation.force("links").initialize(links_data);
        simulation.force("charge").initialize(links_data);
        simulation.force("center").initialize(links_data);
      });

  node.append("text")
      .attr("dx", 10)
      .attr("dy", ".35em")
      .text(function (d) {
        return d.id === 'Main_topic_classifications' ? 'Main_topic_classifications' : d.id
      });

  link = link.data(links_data, function(d) { return d.source.id + "-" + d.target.id; });
  link.exit().remove();
  link = link.enter()
      .append("line")
      .attr("class", "link")
      .merge(link);
}

function initSimulation() {
  simulation.nodes(nodes_data);
  simulation.force("links", d3.forceLink(links_data)
      .id(function (d) {
        return d.id;
      })
      .distance(function (d) {
        return d.value;
      }));
  simulation.force("charge", d3.forceManyBody())
  simulation.force("center", d3.forceCenter(width / 2, height / 2));
}

function tickActions() {
  link.attr("x1", function (d) {
    return d.source.x;
  })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });
  node.attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
  });
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

function get(theUrl) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}
