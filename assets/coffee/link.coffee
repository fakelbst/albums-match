define () ->
  init: (mapW, mapH, datas) ->
    @bindEvents()
    @_datas = datas
    toArray = []
    @_darray = $.map(datas, (value, index) ->
        [value]
    )
    canvas = document.getElementById("c")
    ctx = canvas.getContext('2d')
    @ctx = ctx
    @mapW = mapW
    @mapH = mapH
    @mapArray = []
    x = 0
    y = 0

    @mapArray = @creatMap()
    @mapArray = @random(@mapArray)

    i = 0
    while i < @mapH
      j = 0
      while j < @mapW
        if @mapArray[i][j] == 0
          @mapArray[i][j] = {}
          @mapArray[i][j].type = 0
          @mapArray[i][j].nu = 0
        else
          @drawImg @mapArray[i][j], x, y, i, j
        x = (if x < (@mapW-1)*100 then x + 100 else 0)
        ++j
      y = (if y < (@mapH-1)*100 then y + 100 else 0)
      ++i
    return
  randomPic: (idx) ->
    randomNu = Math.floor(Math.random() * 8) - 1
    while !@_darray[idx][randomNu]
      randomNu = Math.floor(Math.random() * 8) - 1
    return randomNu
  creatMap: () ->
    k = 1
    mapArray = []
    i = 0
    while i < @mapH
      mapArray.push []
      j = 0
      while j < @mapW
        if j is 0 or j is @mapW - 1 or i is 0 or i is @mapH - 1
          mapArray[i].push 0
          ++j
        else
          mapArray[i].push k
          ++j
          mapArray[i].push k
          ++k
          ++j
          k = 1  if k > 10
      ++i
    mapArray
  drawMap: (map) ->
    return
  random: (mapArray) ->
    i = 1
    height = @mapH - 2
    while i <= height
      j = 1
      width = @mapW - 2
      while j <= width
        y1 = parseInt(Math.random() * 100 % height + 1)
        x1 = parseInt(Math.random() * 100 % width + 1)
        y2 = parseInt(Math.random() * 100 % height + 1)
        x2 = parseInt(Math.random() * 100 % width + 1)
        tmp = mapArray[y1][x1]
        mapArray[y1][x1] = mapArray[y2][x2]
        mapArray[y2][x2] = tmp
        ++j
      ++i
    mapArray
  drawImg: (idx, x, y, i, j) ->
    ctx = @ctx
    sw = 100
    sh = 100
    idx = idx - 1

    if idx >= 0
      if i and j
        randomNu = @randomPic(idx)
        @mapArray[i][j] = {}
        @mapArray[i][j].type = idx+1
        @mapArray[i][j].nu = randomNu

      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.fillRect x, y, 100, 100
      ctx.drawImage document.getElementById(@_darray[idx][randomNu]), x, y, 98, 98
      ctx.lineWidth = 1
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
      ctx.strokeRect x, y, 99, 99
    return
  selectImg: (x, y) ->
    ctx = @ctx
    ctx.strokeStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(x*100,y*100,98,98)
    return
  clearImg: (pos) ->
    ctx = @ctx
    ctx.save()
    ctx.clearRect(pos.x*100-1,pos.y*100-1,101,101)
    ctx.restore()
    @lastPos = null
    return
  getImgPos: (e) ->
    posX = e.offsetX or e.layerX
    posY = e.offsetY or e.layerY
    x = Math.floor(posX / 100)
    y = Math.floor(posY / 100)
    return {x: x, y: y}
  bindEvents: () ->
    self = @
    $('#c').off().on 'click', (e)->
      e.preventDefault()
      self.checkDead()
      pos = self.getImgPos.apply(self, arguments)
      x = pos && pos.x || 0
      y = pos && pos.y || 0
      mapArray = self.mapArray

      if mapArray[y][x].type == 0
        return

      if self.lastPos
        if x is self.lastPos.x and y is self.lastPos.y
          return

      self.selectImg x, y
      if self.lastPos and mapArray[pos.y][pos.x].type == mapArray[self.lastPos.y][self.lastPos.x].type and self.getRoad(self.lastPos, pos)
        if self.isSuccess()
          self.successShow()
      else
        if self.lastPos and mapArray[self.lastPos.y][self.lastPos.x].type != 0
          ctx = self.ctx
          posX = self.lastPos.x * 100
          posY = self.lastPos.y * 100
          type = mapArray[self.lastPos.y][self.lastPos.x].type
          nu = mapArray[self.lastPos.y][self.lastPos.x].nu
          ctx.clearRect(posX,posY,98,98)
          ctx.strokeStyle = "rgba(0, 0, 0, 0.8)"
          ctx.fillRect(x*100,y*100,98,98)
          ctx.drawImage document.getElementById(self._darray[type-1][nu]), posX, posY, 98, 98
      self.lastPos = {x: x, y: y}
    return
  drawRoad: (points) ->
    ctx = @ctx
    ctx.beginPath()
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"
    ctx.lineWidth = 4
    ctx.moveTo(points[0].x*100+50, points[0].y*100+50)
    i = 1
    while i<points.length
      ctx.lineTo(points[i].x*100+50,points[i].y*100+50)
      i++
    ctx.stroke()
    return
  clearPath: (paths) ->
    self = @
    i = 0
    while i < paths.length
      if i+1<paths.length and paths[i].y == paths[i+1].y
        if paths[i].x > paths[i+1].x
          xx = paths[i+1].x
          l = paths[i].x - paths[i+1].x + 1
        else if paths[i].x < paths[i+1].x
          xx = paths[i].x
          l = paths[i+1].x - paths[i].x + 1
        @ctx.clearRect(xx*100, paths[i].y*100, 100*l, 100)

      if i+1<paths.length and paths[i].x == paths[i+1].x
        if paths[i].y > paths[i+1].y
          yy = paths[i+1].y
          l = paths[i].y - paths[i+1].y + 1
        else if paths[i].y < paths[i+1].y
          yy = paths[i].y
          l = paths[i+1].y - paths[i].y + 1
        @ctx.clearRect(paths[i].x*100, yy*100, 100, 100*l)
      i++
    return
  checkLine: (begin, end) ->
    if begin.x is end.x and begin.y is end.y
      return false
    if begin.x is end.x #same row
      dy = (if end.y > begin.y then 1 else -1)
      i = begin.y + dy
      while i isnt end.y
        return false if @mapArray[i][begin.x].type isnt 0
        i += dy
      return true

    if begin.y is end.y #same col
      dx = (if end.x > begin.x then 1 else -1)
      i = begin.x + dx
      while i isnt end.x
        return false if @mapArray[begin.y][i].type isnt 0
        i += dx
      return true
    false
  getRoad: (begin, end, check) ->
    self = @
    if begin.y is end.y or begin.x is end.x
      if @checkLine begin, end
        if check then return true
        points = [begin, end]
        @mapArray[begin.y][begin.x].type = 0
        @mapArray[end.y][end.x].type = 0
        @getConnect(points, [begin, end])
        return true

    i = 0
    while i < 2
      middle = null
      middlePos = null
      if i is 0
        middle = @mapArray[end.y][begin.x].type
        middlePos =
          x: begin.x
          y: end.y
      else
        middle = @mapArray[begin.y][end.x].type
        middlePos =
          x: end.x
          y: begin.y
      if middle is 0 and @checkLine(begin, middlePos) and @checkLine(middlePos, end)
        if check then return true
        points = [begin, middlePos, end]
        @mapArray[begin.y][begin.x].type = 0
        @mapArray[end.y][end.x].type = 0
        @getConnect(points, [begin, end])
        return true
      i++

    i = 0
    while i < @mapW
      if i is begin.x or i is end.x
        i++
        continue
      middle1 = @mapArray[begin.y][i].type
      middle1Pos =
        x: i
        y: begin.y
      middle2 = @mapArray[end.y][i].type
      middle2Pos =
        x: i
        y: end.y
      if middle1 is 0 and middle2 is 0
        if @checkLine(begin, middle1Pos) and @checkLine(middle1Pos, middle2Pos) and @checkLine(middle2Pos, end)
          if check then return true
          points = [begin, middle1Pos, middle2Pos, end]
          @mapArray[begin.y][begin.x].type = 0
          @mapArray[end.y][end.x].type = 0
          @getConnect(points, [begin, end])
          return true
      i++

    j = 0
    while j < @mapH
      if j is begin.y or j is end.y
        j++
        continue
      middle1 = @mapArray[j][begin.x].type
      middle1Pos =
        x: begin.x
        y: j
      middle2 = @mapArray[j][end.x].type
      middle2Pos =
        x: end.x
        y: j
      if middle1 is 0 and middle2 is 0
        if @checkLine(begin, middle1Pos) and @checkLine(middle1Pos, middle2Pos) and @checkLine(middle2Pos, end)
          if check then return true
          points = [begin, middle1Pos, middle2Pos, end]
          @mapArray[begin.y][begin.x].type = 0
          @mapArray[end.y][end.x].type = 0
          @getConnect(points, [begin, end])
          return true
      j++
    return false
  getRandomPot: () ->
    x = Math.floor(Math.random() * @mapW)
    y = Math.floor(Math.random() * @mapH)
    while !@mapArray[y][x].type or @mapArray[y][x].type == 0
      x = Math.floor(Math.random() * @maoW)
      y = Math.floor(Math.random() * @mapH)
    return {x: x, y: y}
  checkDead: () ->
    i = 1
    while i < @mapH
      j = 1
      while j < @mapW
        if !@mapArray[i][j].type or @mapArray[i][j].type == 0
          j++
          continue
        point = {x: j, y: i}
        k = 1
        while k < @mapH
          l = 1
          while l < @mapW
            if !@mapArray[k][l].type or @mapArray[k][l].type == 0
              l++
              continue
            endPoint = {x: l, y: k}
            if point.x is endPoint.x and point.y is endPoint.y
              l++
              continue
            else
              if @mapArray[i][j].type == @mapArray[k][l].type and @getRoad(point, endPoint, true)
                return
            l++
          k++
        ++j
      ++i

    $('.loading').show()
    $('.loading i').show()
    $('.loading .infos').text('Reordering...please wait.')
    $('.playground').hide()
    @reordering()
    canvas = document.getElementById("c")
    ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    x = 0
    y = 0
    ii = 0
    while ii < @mapH
      jj = 0
      while jj < @mapW
        if @mapArray[ii][jj].type == 0 and @mapArray[ii][jj].nu == 0
        else
          ctx = @ctx
          ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
          ctx.fillRect x, y, 100, 100
          ctx.drawImage document.getElementById(@_darray[@mapArray[ii][jj].nu][@mapArray[ii][jj].type]), x, y, 98, 98
          ctx.lineWidth = 1
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
          ctx.strokeRect x, y, 99, 99
        x = (if x < (@mapW-1)*100 then x + 100 else 0)
        ++jj
      y = (if y < (@mapH-1)*100 then y + 100 else 0)
      ++ii
    $('.loading').hide()
    $('.playground').show()
    return
  reordering: () ->
    # TODO:
    i = 1
    while i < @mapH-1
      j = 1
      while j < @mapW-1
        @mapArray[i].move(1,@mapW/2)
        ++j
      ++i
    return
  isSuccess: () ->
    i = 1
    while i < @mapH
      j = 1
      while j < @mapW
        if @mapArray[i][j].type != 0
          return false
        ++j
      ++i
    return true
  getConnect: (points, toClear) ->
    self = @
    @drawRoad points
    setTimeout (->
      i = 0
      while i < toClear.length
        self.clearImg toClear[i]
        i++
      self.clearPath points
    ), 300
    return
  successShow: () ->
    $('.playground').hide()
    $('.loading').fadeIn('slow')
    $('.loading i').hide()
    $('.loading .infos').text('Congratulation!!! You win!')
    return

