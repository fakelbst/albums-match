
APIkey = "4dff88a0423651b3570253b10b745b2c"
User = "fakelbst"
Limit = 10
Page = 1

MyUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + User + '&api_key=' + APIkey + '&limit=' + Limit + '&format=json' #http://cn.last.fm/api/show/user.getTopArtists

require.config
  baseUrl: "javascripts"
  waitSeconds : 20
  paths:
    jquery: "lib/jquery.min"
    imagesLoaded: "lib/imagesloaded.pkgd"
    async: "lib/async"
    link: "link"

require [
  "jquery"
  "imagesLoaded"
], ($, imagesLoaded) ->

  $('#showLeftPush').click ()->
    $(@).toggleClass('active')
    $('body').toggleClass('cbp-spmenu-push-toright')
    $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open')
  $('#get-user').click ()->
    name = $('.lastfm-username input').val()
    url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + name + '&api_key=' + APIkey + '&limit=' + Limit + '&format=json'
    $('.loading').show()
    $('.loading i').show()
    $('.loading .infos').text('Loading...please wait.')
    $('.playground').hide()
    $('#image-datas').empty()
    canvas = document.getElementById("c")
    ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    getDatas(url)

  getJsonCount = 0
  isFinished = (datas)->
    if getJsonCount is 10
      imagesLoaded('#image-datas', () ->
        $('.loading').hide()
        $('.playground').show()
        require [
          "link"
        ], (l) ->
          l.init(12, 8, datas)
      )
      getJsonCount = 0
    return

  getDatas = (url) ->
    $.when($.ajax(url)).then (datas) ->
      if datas.error
        $('.loading i').hide()
        $('.loading .infos').text(datas.message)
        return

      artists = datas.topartists.artist
      d = {}
      i = 0
      while i < 10
        artistName = artists[i].name
        artistName = artistName.split(' ').join('+')
        artistUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + artistName + '&api_key=' + APIkey + '&limit=' + 8 + '&format=json'
        $.getJSON artistUrl
        , (datas) ->
          a = datas.topalbums['@attr'].artist
          _artistName = datas.topalbums['@attr'].artist.split(' ').join('_').toLowerCase()
          albums = datas.topalbums.album
          d[a] = []
          j = 0
          while j < datas.topalbums.album.length
            d[a].push _artistName + j
            $('#image-datas').append '<img src="' + albums[j].image[2]['#text'] + '" id="'+ _artistName + j + '" style="display:none"/>'
            j++
          getJsonCount++
          isFinished(d)
        i++

  getDatas(MyUrl)
  return

