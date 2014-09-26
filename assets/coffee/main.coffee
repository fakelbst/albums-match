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
  APIkey = "4dff88a0423651b3570253b10b745b2c"
  User = "fakelbst"
  Limit = 10
  Page = 1
  UserUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user={0}&api_key=' + APIkey + '&limit=' + Limit + '&format=json' #http://cn.last.fm/api/show/user.getTopArtists
  GenreUrl = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag={0}&api_key=' + APIkey + '&limit=' + Limit + '&format=json'
  NoneUrl = 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png'

  $('#showLeftPush').click ()->
    $(@).toggleClass('active')
    if $(@).hasClass 'active'
      $('.lastfm-username input').focus()
      $('body').css 'overflow-x', 'hidden' #TODO: OSX trackpad

    $('body').toggleClass('cbp-spmenu-push-toright')
    $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open')
    return
  $('#get-user').click ()->
    name = $('.lastfm-username input').val()
    url = UserUrl.format(name)
    initPlayground()
    getDatas(url)
    return
  $('#get-tags').click ()->
    tag = $('.lastfm-tags input').val()
    url = GenreUrl.format(tag)
    initPlayground()
    getDatas(url)
    return

  $('#select-genres').click ()->
    $('.genres').toggle('normal')
    return
  $('.genres a').click ()->
    genre = $(@).attr 'd'
    url = GenreUrl.format(genre)
    initPlayground()
    getDatas(url)
    return

  initPlayground = ()->
    $('.loading').show()
    $('.loading i').show()
    $('.loading .infos').text('Loading...please wait.')
    $('.playground').hide()
    $('#image-datas').empty()
    canvas = document.getElementById("c")
    ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

  getJsonCount = 0
  isFinished = (datas)->
    if getJsonCount is 10
      imagesLoaded('#image-datas', () ->
        $('.loading').fadeOut 'slow', ->
          $('.playground').fadeIn('slow')
          return
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
      if datas.topartists['@attr'].total < 10
        $('.loading i').hide()
        $('.loading .infos').text('Please scrobble more music to play or select a genre.')
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
          $('#image-datas').append '<div class="artists">'
          j = 0
          while j < datas.topalbums.album.length
            d[a].push _artistName + j
            $('#image-datas .artists:last').append '<img src="' + albums[j].image[2]['#text'] + '" id="'+ _artistName + j + '" width="100px" height="100px" artist="' + a + '"/>'
            j++
          getJsonCount++
          isFinished(d)
        i++

  getDatas(UserUrl.format('fakelbst'))
  return

String::format = ->
  formatted = this
  i = 0
  while i < arguments.length
    regexp = new RegExp("\\{" + i + "\\}", "gi")
    formatted = formatted.replace(regexp, arguments[i])
    i++
  formatted

Array::move = (from, to) ->
  @splice to, 0, @splice(from, 1)[0]
  return
