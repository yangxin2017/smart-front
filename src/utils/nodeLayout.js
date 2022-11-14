export function getLayout(datas) {
  var width = 90
  var height = 90

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

export function gerFinalNodeAndLine(graph, minJE, simple=false) {
  let nodes = graph.nodes//filterNode(graph)
  let lines = graph.lines//filterLine2(graph)

  let mbrarr = getPrepDataObj(nodes, lines, minJE)
  let realNodes = getLayout(mbrarr)

  nodes = getLayoutNodes(realNodes, simple)

  lines = getLayoutLines(lines, minJE, nodes, simple)

  return { nodes, lines }
}

function getNode(id, nodes) {
  let n = null
  for (let ni of nodes) {
    if (ni.data.id == id) {
      n = ni
      break
    }
  }
  return n
}
function isImpPointLine(l, nodes, simple) {
  let n1 = getNode(l.sid, nodes)
  let n2 = getNode(l.eid, nodes)
  console.log(n1, n2)
  if (simple) {
    if (n1 && n2 && (n2.data.isImp || n2.data.isImpLV)) {
      l.style = l.style ? l.style : {}
      //l.style['line-color'] = l.lineColor ? l.lineColor : '#ccc'
      return true
    }
  } else {
    if (n1 && n2) {
      if (n2.data.isImp || n2.data.isImpLV) {
        l.style = l.style ? l.style : {}
        //l.style['line-color'] = l.lineColor ? l.lineColor : '#ccc'
      }
      return true
    }
  }
  
  return false
}

function getLayoutLines(realLines, minJE, nodes, simple) {
  let lines = []
  for (let l of realLines) {
    let ish = isImpPointLine(l, nodes, simple)
    
    if (simple && !ish) {
      continue
    }

    if (l.name == "密切人") {
      lines.push({
        data: {
          source: l.sid + '',
          target: l.eid + '',
          label: `密切人`,
          data: l
        },
        style: l.style
      })
    } else if (l.name == '公司所有人') {
      lines.push({
        data: {
          source: l.sid + '',
          target: l.eid + '',
          label: `公司所有人`,
          data: l
        },
        style: l.style
      })
    } else if (Math.abs(Number(l.name)) >= minJE) {
      lines.push({
        data: {
          source: l.sid + '',
          target: l.eid + '',
          label: `金额：` + _getW(l.name, l),
          data: l,
        },
        classes: [l.lineColor ? l.lineColor : '']
      })
    }
  }
  return lines
}

function getLayoutNodes(realNodes, simple=false) {
  let nodes = []

  // let color = {
  //   red: require("@/assets/icon/red.png"),
  //   green: require("@/assets/icon/green.png"),
  //   blue: require("@/assets/icon/blue.png"),
  //   yellow: require("@/assets/icon/yellow.png"),
  // }

  for (let n of realNodes) {
    let style = {}
    let classes = []
    let isImp = false
    let isImpLV = false
    if (n.od.nodeType == 'PERSON' && n.od.user && n.od.user.txzp) {
      style['background-image'] = `/ai/webfile/` + n.od.user.txzp
    } else {
      if (n.od.nodeColor) {
        classes = [n.od.nodeColor]
      } else {
        classes = []
        style = {}
      }
    }

    if (n.od.nodeType == 'PERSON' && n.od.user && (n.od.user.sfMbr || n.od.user.sfFxdx)) {
      isImp = true
    }
    if (n.od.nodeType == 'COMPANY-MB') {
      isImp = true
    }
    if (n.od.nodeType == 'NULL' && (n.od.nodeName.indexOf('空(') >= 0 || n.od.nodeName == 'null' || n.od.nodeName.indexOf('现金(')) >= 0) {
      // isImp = true
      isImpLV = true
    }

    if (simple === true) {
      if (isImp == true) {
        nodes.push({
          data: { id: n.od.id + '', data: n.od, label: n.od.nodeName, isImp: isImp, isImpLV: isImpLV },
          position: { x: n.x, y: n.y },
          style: style,
          classes: classes
        })
      } else if (isImpLV == true) {
        nodes.push({
          data: { id: n.od.id + '', data: n.od, label: n.od.nodeName, isImp: isImp, isImpLV: isImpLV },
          position: { x: n.x, y: n.y },
          style: style,
          classes: classes
        })
      } else {

      }
    } else {
      nodes.push({
        data: { id: n.od.id + '', data: n.od, label: n.od.nodeName, isImp: isImp, isImpLV: isImpLV },
        position: { x: n.x, y: n.y },
        style: style,
        classes: classes
      })
    }
  }
  return nodes
}

function __getNode(id, nodes) {
  let n = null
  for (let ni of nodes) {
    if (id == ni.id) {
      n = ni
      break
    }
  }
  return n
}
function __isExist(r, existLines, relations) {
  let isHas = false
  for (let l of existLines) {
    for (let v of l.relation) {
      let n1 = Math.abs(Number(v.jyje))
      let n2 = Math.abs(Number(r.jyje))
      let sname = __getmc(r)
      let ename = __getjydfmc(r)
      if (sname == __getjydfmc(v) && ename == __getmc(v) && n1 == n2) {
        isHas = true
        break
      }
      if (sname == __getmc(v) && ename == __getjydfmc(v) && n1 == n2) {
        isHas = true
        break
      }
    }
  }
  if (!isHas) {
    for (let v of relations) {
      let n1 = Math.abs(Number(v.jyje))
      let n2 = Math.abs(Number(r.jyje))
      let sname = __getmc(r)
      let ename = __getjydfmc(r)
      if (sname == __getjydfmc(v) && ename == __getmc(v) && n1 == n2) {
        isHas = true
        break
      }
      if (sname == __getmc(v) && ename == __getjydfmc(v) && n1 == n2) {
        isHas = true
        break
      }
    }
  }
  return isHas
}

function __getmc(node) {
  if (node.mc) {
    return node.mc
  } else if (node.bfkh) {
    return node.bfkh
  } else if (node.bfzh) {
    return node.bfzh
  }
}
function __getjydfmc(node) {
  if (node.jydfmc) {
    return node.jydfmc
  } else if (node.jydfkh) {
    return node.jydfkh
  } else if (node.jydfzh) {
    return node.jydfzh
  }
}

function filterLine2(graph) {
  let lines = graph.lines
  let nodes = graph.nodes
  // console.log(lines)
  // console.log(nodes)
  // let res = []
  let res = []
  for (let l of lines) {
    let sn = __getNode(l.sid, nodes)
    if (!sn) {
      continue
    }
    let en = __getNode(l.eid, nodes)

    let isIN = 'no'

    let nrelation = []
    for (let r of l.relation) {
      let sname = ''
      if (sn.nodeName == '空') {
        sname = ''
      } else {
        sname = sn.nodeName
      }
      /// 出
      if (sname == __getmc(r) && Number(r.jyje) < 0) {
        nrelation.push(r)
        isIN = 'false'
      } 
    }
    if (nrelation.length <= 0) {
      for (let r of l.relation) {
        let sname = ''
        if (sn.nodeName == '空') {
          sname = ''
        } else {
          sname = sn.nodeName
        }
        /// 进
        if (sname == __getjydfmc(r) && Number(r.jyje) > 0) {
          nrelation.push(r)
          isIN = 'true'
        } 
      }
    }
    //////////反向查询
    for (let r of l.relation) {
      if (!en) {
        continue
      }
      let ename = ''
      if (en.nodeName == '空') {
        ename = ''
      } else {
        ename = en.nodeName
      }
      if (!__isExist(r, res, nrelation) && (isIN == 'true' || isIN == 'no')) {
        // 进
        if (ename == __getjydfmc(r) && Number(r.jyje) > 0) {
          nrelation.push(r)
          isIN = 'true'
        }
      }
      if (!__isExist(r, res, nrelation) && (isIN == 'false' || isIN == 'no')) {
        // 出
        if (ename == __getmc(r) && Number(r.jyje) < 0) {
          nrelation.push(r)
        }
      }
    }


    l.relation = nrelation
    if (l.name == '公司所有人' || l.name == '密切人') {
      res.push(l)
    } else if (nrelation.length > 0) {
      let n = 0
      for (let r of nrelation) {
        n += Number(r.jyje)
      }
      l.name = n
      res.push(l)
    }
  }

  return res
}
function filterLine(graph) {
  let lines = graph.lines
  let res = []
  ///////////
  let mergeResult = (arr, l) => {
    let ish = false
    for (let a of arr) {
      if (a.name != '密切人' && l.name != '密切人' && a.name != '公司所有人' && l.name != '公司所有人') {
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
          // if ((Number(a.name) > 0 && num < 0) || (Number(a.name) < 0 && num > 0)) {
          if (num < 0) {
            let sidtmp = a.sid
            a.sid = a.eid
            a.eid = sidtmp
          }
          console.log(a.name, num)
          a.name = num
          break
        } else if (a.sid == l.eid && a.eid == l.sid) {

        }
        // else if (a.sid == l.eid && a.eid == l.sid) {
        //   // console.log('======' + l.sid + "---------" + a.eid)
        //   // console.log(l.relation)
        //   // console.log(a.relation)
        //   let odir = 1
        //   for (let al of a.relation) {
        //     let ye = Number(al.jyje)
        //     odir = ye > 0 ? 1 : -1
        //   }
        //   for (let al of l.relation) {
        //     // 反向变符号
        //     let ye = Number(al.jyje)
        //     if (odir == 1 && ye > 0) {
        //       al.jyje = -ye
        //       al.change = true
        //     }
        //   }

        //   a.relation = mergeRelation(a.relation, l.relation)
        //   ish = true

        //   let num = 0.0
        //   for (let ar of a.relation) {
        //     num += Number(ar.jyje)
        //   }

        //   // if ((Number(a.name) > 0 && num < 0) || (Number(a.name) < 0 && num > 0)) {
        //   if (num < 0) {
        //     let sidtmp = a.sid
        //     a.sid = a.eid
        //     a.eid = sidtmp
        //   }
        //   a.name = num
        //   break
        // }
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
  return lines
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
    if (n.nodeType == "PERSON" && n.user && (n.user.sfMbr || n.user.sfFxdx)) {
      mbr.push({ name: n.nodeName, children: [], data: n });
    } else if (n.nodeType == 'COMPANY-MB') {
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
      if (l.name == '公司所有人') {
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

function _getW(num, l) {
  let moneyData = {}
  for(let r of l.relation) {
    let money = parseFloat(r.jyje)
    let name = r.mc + "-" + r.jydfmc

    if (money < 0) {
      name = r.jydfmc + "-" + r.mc
      money = money * -1
    }
    moneyData[name] = moneyData[name] ? moneyData[name] + money : money;
  }
  let rnum = 0
  for (let k in moneyData) {
    if (rnum == 0) {
      rnum = moneyData[k]
    } else {
      rnum = rnum - moneyData[k]
    }
  }
  rnum = Math.abs(rnum)

  let r = (num / 10000).toFixed(1) + "万"

  return (rnum / 10000).toFixed(1) + "万"
}
