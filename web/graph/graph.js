const width = screen.width, height = 600;
console.log(width)
console.log(height)

let mainCategory = {id: ''};
let mainObject = {id: 'Objects'}

let nodes_data = [];
let links_data = [];

nodes_data.push(mainCategory)
nodes_data.push(mainObject)
links_data.push({source: mainCategory, target: mainObject, value: 100});

const svg = d3.select('main').append('svg')
    .attr('width', width)
    .attr('height', height);

let link = svg.selectAll('line');
let node = svg.selectAll('node');

let simulation = d3.forceSimulation()
simulation.on('tick', tickActions);

initData();
initView();
initSimulation();

function initData() {
  node = node.data(nodes_data, function (d) {
    return d.id;
  });
  link = link.data(links_data, function (d) {
    return d.source.id + '-' + d.target.id;
  })

  // console.log(nodes_data)
  // console.log(links_data)
}

function initView() {
  node = node.enter()
      .append('g')
      .attr('class', 'node')
      .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended))
      .append('circle')
      .attr('r', 5)
      .on('click', function () {
        console.log(this)
        addNode(this)
      })
      .select(function(){
        return this.parentNode;
      })
      .append('text')
      .attr('dx', 10)
      .attr('dy', '.35em')
      .text(function (d) {
        return d.id;
      })
      .select(function(){
        return this.parentNode;
      })

      .merge(node);

  // node.append('text')
  // .attr('dx', 10)
  // .attr('dy', '.35em')
  //     .text(function (d) {
  //       return d.id;
  //     })
  //
  // node = node.merge(node);

  node.exit().remove();

  link = link.enter()
      .append('line')
      .attr('class', 'link')
      .merge(link);

  link.exit().remove();
}

function addNode(that) {

  let title = that.nextSibling.textContent;
  // let title = that.textContent;
  // let title = 'Music';

  d3.select(that).attr('class', 'active')
  d3.select(that.nextSibling).attr('class', 'active')

  const response = get('/wiki?title=' + title);
  const responseJson = JSON.parse(response);

  console.log(responseJson.categories)

  let titleNode = nodes_data.find(element => element.id === title);

  shuffle(responseJson.categories).splice(0, 7).forEach(name => {
    if (!nodes_data.find(element => element.id === name)) {
      const category = {id: name};
      nodes_data.push(category);
      links_data.push({source: category, target: titleNode, value: 100})
    }
  });

  initData();
  initView();
  initSimulation();
}

function initSimulation() {
  simulation.nodes(nodes_data);
  simulation.force('links', d3.forceLink(links_data)
      .id(function (d) {
        return d.id;
      })
      .distance(function (d) {
        return d.value;
      }));
  simulation.force('charge', d3.forceManyBody())
  simulation.force('center', d3.forceCenter(width / 2, height / 2));
  simulation.alpha(1).restart();
}

function tickActions() {
  link.attr('x1', function (d) {
    return d.source.x;
  })
      .attr('y1', function (d) {
        return d.source.y;
      })
      .attr('x2', function (d) {
        return d.target.x;
      })
      .attr('y2', function (d) {
        return d.target.y;
      });
  node.attr('transform', function (d) {
    return 'translate(' + d.x + ',' + d.y + ')';
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

function get(url) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
