export function getLayout(datas) {
  var width = 900
  var height = 900

  var mbPoints = datas.length

  var radius = width / 2
  var perAngle = 60
  var firAngleRange_LEFT = [0, 180 - perAngle]
  var firAngleRange_RIGHT = [0, 180 - perAngle]
  var midAngleRange_LEFT = [perAngle, perAngle * 2]
  var midAngleRange_RIGHT = [perAngle, perAngle * 2]
  var lstAngleRange_LEFT = [perAngle, 180]
  var lstAngleRange_RIGHT = [perAngle, 180]

  var nodes = []
  var lines = []


  let mbrIndex = 0
  for (let i = 0; i < datas.length; i++) {

    if (i == 0 || i == datas.length - 1) {
      let x = width / 2
      let y = radius * (i + 1)

      let angles = lstAngleRange_LEFT
      let child0pos = { x: x, y: y - radius }
      if (i == 0) {
        angles = firAngleRange_LEFT
        nodes.push({ name: datas[i].name, x: x, y: y, od: datas[i].data })
      } else {
        angles = lstAngleRange_LEFT
        nodes.push({ name: datas[i].name, x: x, y: y, od: datas[i].data })
      }

      let childCount = datas[i].children.length


      let isJS = childCount % 2 == 1
      if (isJS) {
        let pCount = (childCount - 1) / 2
        let pAngle = (angles[1] - angles[0]) / (pCount + 1)
        // left
        datas[i].children[0].pos = child0pos

        if (i == 0) {
          nodes.push({ name: datas[i].children[0].name, x: child0pos.x, y: child0pos.y, od: datas[i].children[0].data })
        } else {
          nodes.push({ name: datas[i].children[0].name, x: child0pos.x, y: child0pos.y + 2 * radius, od: datas[i].children[0].data })
        }


        let inx = 1
        for (let j = 1; j < pCount + 1; j++) {
          let hd = (angles[0] + pAngle * inx) * (Math.PI / 180)
          let offX = Math.sin(hd) * radius
          let offY = radius - Math.cos(hd) * radius
          datas[i].children[j].pos = { x: child0pos.x - offX, y: child0pos.y + offY }
          nodes.push({ name: datas[i].children[j].name, x: child0pos.x - offX, y: child0pos.y + offY, od: datas[i].children[j].data })
          inx++
          lines.push({ source: datas[i].name, target: datas[i].children[j].name, label: { show: false } })
        }
        inx = 1
        for (let j = pCount + 1; j < childCount; j++) {
          let hd = (angles[0] + pAngle * inx) * (Math.PI / 180)
          let offX = Math.sin(hd) * radius
          let offY = radius - Math.cos(hd) * radius
          datas[i].children[j].pos = { x: child0pos.x + offX, y: child0pos.y + offY }
          nodes.push({ name: datas[i].children[j].name, x: child0pos.x + offX, y: child0pos.y + offY, od: datas[i].children[j].data })
          inx++
          lines.push({ source: datas[i].name, target: datas[i].children[j].name, label: { show: false } })
        }
      } else {
        let pCount = (childCount) / 2
        let pAngle = (angles[1] - angles[0]) / (pCount + 1)
        // TODO: 

        let inx = 1
        for (let j = 0; j < pCount; j++) {
          let hd = (angles[0] + pAngle * inx) * (Math.PI / 180)
          let offX = Math.sin(hd) * radius
          let offY = radius - Math.cos(hd) * radius
          datas[i].children[j].pos = { x: child0pos.x - offX, y: child0pos.y + offY }
          nodes.push({ name: datas[i].children[j].name, x: child0pos.x - offX, y: child0pos.y + offY, od: datas[i].children[j].data })
          inx++
          lines.push({ source: datas[i].name, target: datas[i].children[j].name, label: { show: false } })
        }
        inx = 1
        for (let j = pCount; j < childCount; j++) {
          let hd = (angles[0] + pAngle * inx) * (Math.PI / 180)
          let offX = Math.sin(hd) * radius
          let offY = radius - Math.cos(hd) * radius
          datas[i].children[j].pos = { x: child0pos.x + offX, y: child0pos.y + offY }
          nodes.push({ name: datas[i].children[j].name, x: child0pos.x + offX, y: child0pos.y + offY, od: datas[i].children[j].data })
          inx++
          lines.push({ source: datas[i].name, target: datas[i].children[j].name, label: { show: false } })
        }
      }

    } else {
      let x = width / 2
      let y = radius * (i + 1)

      let angles = midAngleRange_LEFT
      let child0pos = { x: x, y: y - radius }
      let childCount = datas[i].children.length

      nodes.push({ name: datas[i].name, x: x, y: y, od: datas[i].data })

      let isJS = childCount % 2 == 1
      if (isJS) {
        let pCount = (childCount - 1) / 2
        let pAngle = (angles[1] - angles[0]) / (pCount == 1 ? (pCount + 1) : (pCount - 1))
        // left
        datas[i].children[0].pos = child0pos
        // nodes.push({ name: datas[i].children[0].name, x: child0pos.x, y: child0pos.y })

        let inx = 0
        for (let j = 0; j < pCount; j++) {
          let hd = (angles[0] + pAngle * inx) * (Math.PI / 180)
          let offX = Math.sin(hd) * radius
          let offY = radius - Math.cos(hd) * radius
          datas[i].children[j].pos = { x: child0pos.x - offX, y: child0pos.y + offY }
          nodes.push({ name: datas[i].children[j].name, x: child0pos.x - offX, y: child0pos.y + offY, od: datas[i].children[j].data })
          inx++
          lines.push({ source: datas[i].name, target: datas[i].children[j].name, label: { show: false } })
        }
        inx = 0
        for (let j = pCount; j < childCount; j++) {
          let hd = (angles[0] + pAngle * inx) * (Math.PI / 180)
          let offX = Math.sin(hd) * radius
          let offY = radius - Math.cos(hd) * radius
          datas[i].children[j].pos = { x: child0pos.x + offX, y: child0pos.y + offY }
          nodes.push({ name: datas[i].children[j].name, x: child0pos.x + offX, y: child0pos.y + offY, od: datas[i].children[j].data })
          inx++
          lines.push({ source: datas[i].name, target: datas[i].children[j].name, label: { show: false } })
        }
      } else {
        let pCount = (childCount) / 2
        let pAngle = (angles[1] - angles[0]) / (pCount == 1 ? (pCount + 1) : (pCount - 1))
        // TODO: 

        let inx = 0
        for (let j = 0; j < pCount; j++) {
          let hd = (angles[0] + pAngle * inx) * (Math.PI / 180)
          let offX = Math.sin(hd) * radius
          let offY = radius - Math.cos(hd) * radius
          datas[i].children[j].pos = { x: child0pos.x - offX, y: child0pos.y + offY }
          nodes.push({ name: datas[i].children[j].name, x: child0pos.x - offX, y: child0pos.y + offY, od: datas[i].children[j].data })
          inx++
          lines.push({ source: datas[i].name, target: datas[i].children[j].name, label: { show: false } })
        }
        inx = 0
        for (let j = pCount; j < childCount; j++) {
          let hd = (angles[0] + pAngle * inx) * (Math.PI / 180)
          let offX = Math.sin(hd) * radius
          let offY = radius - Math.cos(hd) * radius
          datas[i].children[j].pos = { x: child0pos.x + offX, y: child0pos.y + offY }
          nodes.push({ name: datas[i].children[j].name, x: child0pos.x + offX, y: child0pos.y + offY, od: datas[i].children[j].data })
          inx++
          lines.push({ source: datas[i].name, target: datas[i].children[j].name, label: { show: false } })
        }
      }

    }
  }

  // console.log(JSON.stringify(nodes))
  // console.log("========================")
  // console.log(JSON.stringify(lines))
  return nodes
}

export function gerFinalNodeAndLine(graph, minJE) {
  let nodes = filterNode(graph)
  let lines = filterLine(graph)

  let mbrarr = getPrepDataObj(nodes, lines, minJE)
  let realNodes = getLayout(mbrarr)

  nodes = getLayoutNodes(realNodes)

  lines = getLayoutLines(lines, minJE)
  return { nodes, lines }
}

function getLayoutLines(realLines, minJE) {
  let lines = []
  for (let l of realLines) {
    if (l.name == "密切人") {
      lines.push({
        data: {
          source: l.sid + '',
          target: l.eid + '',
          label: `密切人`,
          data: l
        }
      })
    } else if (Math.abs(Number(l.name)) >= minJE) {
      lines.push({
        data: {
          source: l.sid + '',
          target: l.eid + '',
          label: `金额：` + _getW(l.name),
          data: l
        }
      })
    }
  }
  return lines
}
function getLayoutNodes(realNodes) {
  let nodes = []
  for (let n of realNodes) {
    let style = {}
    if (n.od.nodeType == 'PERSON' && n.od.user && n.od.user.txzp) {
      style['background-image'] = `/ai/webfile/` + n.od.user.txzp
    } else {
      style = {}
    }
    nodes.push({
      data: { id: n.od.id + '', data: n.od, label: n.od.nodeName },
      position: { x: n.x, y: n.y },
      style: style
    })
  }
  return nodes
}

function filterLine(graph) {
  let lines = graph.lines
  console.log(lines)
  let res = []
  ///////////
  let mergeResult = (arr, l) => {
    let ish = false
    for (let a of arr) {
      if (a.name != '密切人' && l.name != '密切人') {
        if (a.sid == l.sid && a.eid == l.eid) {
          // let m1 = Number(a.name)
          // let m2 = Number(l.name)
          // a.name = m1 + m2
          a.relation = mergeRelation(a.relation, l.relation)
          ish = true

          let num = 0.0
          for (let ar of a.relation) {
            num += Number(ar.jyje)
          }
          if ((Number(a.name) > 0 && num < 0) || (Number(a.name) < 0 && num > 0)) {
            let sidtmp = a.sid
            a.sid = a.eid
            a.eid = sidtmp
          }
          a.name = num
          break
        } else if (a.sid == l.eid && a.eid == l.sid) {
          // console.log('======' + l.sid + "---------" + a.eid)
          // console.log(l.relation)
          // console.log(a.relation)
          let odir = 1
          for (let al of a.relation) {
            let ye = Number(al.jyje)
            odir = ye > 0 ? 1 : -1
          }
          for (let al of l.relation) {
            // 反向变符号
            let ye = Number(al.jyje)
            if (odir == 1 && ye > 0) {
              al.jyje = -ye
              al.change = true
            }
          }

          a.relation = mergeRelation(a.relation, l.relation)
          ish = true

          let num = 0.0
          for (let ar of a.relation) {
            num += Number(ar.jyje)
          }

          if ((Number(a.name) > 0 && num < 0) || (Number(a.name) < 0 && num > 0)) {
            let sidtmp = a.sid
            a.sid = a.eid
            a.eid = sidtmp
          }
          a.name = num
          break
        }
      }

    }
    if (!ish) {
      arr.push(l)
    }
    return arr
  }
  let mergeRelation = (sarr, tarr) => {
    let concat = []
    for (let t of tarr) {
      let ish = false
      for (let s of sarr) {
        if (s.id == t.id) {
          ish = true
          break
        }
      }
      if (!ish) {
        concat.push(t)
      }
    }
    sarr = sarr.concat(concat)
    return sarr
  }
  //////////
  for (let l of lines) {
    res = mergeResult(res, l)
  }
  return res
}
function filterNode(graph) {
  let nodes = graph.nodes;
  let lines = graph.lines;
  let rnodes = [];
  for (let n of nodes) {
    let ish = false;
    for (let l of lines) {
      if (n.id == l.sid || n.id == l.eid) {
        ish = true;
      }
    }
    if (ish) {// && !_ish(n.nodeName, rnodes)
      rnodes.push(n);
    }
  }
  return rnodes;
}

function getPrepDataObj(nodes, lines, minJE) {
  let mbr = [];
  for (let n of nodes) {
    if (n.nodeType == "PERSON" && n.user && n.user.sfMbr) {
      mbr.push({ name: n.nodeName, children: [], data: n });
    }
  }
  let tmplinks = [];
  let tmpNodes = [];
  for (let m of mbr) {
    for (let l of lines) {
      if (Math.abs(Number(l.name)) >= minJE) {
        if (!_ishLink(l, tmplinks)) {
          if (l.sid == m.data.id) {
            let cnode = _getNodeById(nodes, l.eid);
            if (cnode) {
              if (!_isRepeat(mbr, tmpNodes, cnode)) {
                m.children.push({
                  name: cnode.nodeName,
                  data: cnode,
                  line: l,
                });
                tmpNodes.push({ name: cnode.nodeName });
              }
              tmplinks.push({ source: l.sid + "", target: l.eid + "" });
            }
          } else if (l.eid == m.data.id) {
            let cnode = _getNodeById(nodes, l.sid);
            if (cnode) {
              if (!_isRepeat(mbr, tmpNodes, cnode)) {
                m.children.push({
                  name: cnode.nodeName,
                  data: cnode,
                  line: l,
                });
                tmpNodes.push({ name: cnode.nodeName });
              }
              tmplinks.push({ source: l.sid + "", target: l.eid + "" });
            }
          }
        }
      }
      if (l.name == '密切人') {
        if (!_ishLink(l, tmplinks)) {
          if (l.sid == m.data.id) {
            let cnode = _getNodeById(nodes, l.eid);
            if (cnode) {
              if (!_isRepeat(mbr, tmpNodes, cnode)) {
                m.children.push({
                  name: cnode.nodeName,
                  data: cnode,
                  line: l,
                });
                tmpNodes.push({ name: cnode.nodeName });
              }
              tmplinks.push({ source: l.sid + "", target: l.eid + "" });
            }
          } else if (l.eid == m.data.id) {
            let cnode = _getNodeById(nodes, l.sid);
            if (cnode) {
              if (!_isRepeat(mbr, tmpNodes, cnode)) {
                m.children.push({
                  name: cnode.nodeName,
                  data: cnode,
                  line: l,
                });
                tmpNodes.push({ name: cnode.nodeName });
              }
              tmplinks.push({ source: l.sid + "", target: l.eid + "" });
            }
          }
        }
      }
    }
  }
  return mbr;
}


function _ish(xn, arr) {
  let ish = false;
  for (let a of arr) {
    if (a.nodeName == xn) {
      ish = true;
      break;
    }
  }
  return ish;
}
function _isRepeat(mbr, nodes, cnode) {
  let isr = false;
  for (let n of nodes) {
    if (n.name == cnode.nodeName && cnode.id == n.id) {
      isr = true;
      break;
    }
  }
  for (let m of mbr) {
    if (m.name == cnode.nodeName) {
      isr = true;
      break;
    }
  }
  return isr;
}
function _ishLink(l, lks) {
  let ish = false;
  for (let el of lks) {
    if (
      l.sid == el.source &&
      l.eid == el.target &&
      el.source != el.target
    ) {
      ish = true;
      break;
    }
  }
  return ish;
}
function _getNodeById(nodes, id) {
  let res = null;
  for (let n of nodes) {
    if (n.id == id) {
      res = n;
      break;
    }
  }
  return res;
}

function _getW(num) {
  let r = (num / 10000).toFixed(1) + "万";
  return r;
}
