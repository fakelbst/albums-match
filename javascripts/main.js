require.config({baseUrl:"javascripts",waitSeconds:20,paths:{jquery:"lib/jquery.min",imagesLoaded:"lib/imagesloaded.pkgd",async:"lib/async",link:"link"}}),require(["jquery","imagesLoaded"],function(t,e){var a,i,s,o,r,n,l,u,g,c,m;a="4dff88a0423651b3570253b10b745b2c",n="fakelbst",s=10,r=1,l="http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user={0}&api_key="+a+"&limit="+s+"&format=json",i="http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag={0}&api_key="+a+"&limit="+s+"&format=json",o="http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png",t("#showLeftPush").click(function(){t(this).toggleClass("active"),t(this).hasClass("active")&&(t(".lastfm-username input").focus(),t("body").css("overflow-x","hidden")),t("body").toggleClass("cbp-spmenu-push-toright"),t("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open")}),t("#get-user").click(function(){var e,a;e=t(".lastfm-username input").val(),a=l.format(e),c(),u(a)}),t("#get-tags").click(function(){var e,a;e=t(".lastfm-tags input").val(),a=i.format(e),c(),u(a)}),t("#select-genres").click(function(){t(".genres").toggle("normal")}),t(".genres a").click(function(){var e,a;e=t(this).attr("d"),a=i.format(e),c(),u(a)}),c=function(){var e,a;return t(".loading").show(),t(".loading i").show(),t(".loading .infos").text("Loading...please wait."),t(".playground").hide(),t("#image-datas").empty(),e=document.getElementById("c"),a=e.getContext("2d"),a.clearRect(0,0,e.width,e.height)},g=0,m=function(a){10===g&&(e("#image-datas",function(){return t(".loading").hide(),t(".playground").show(),require(["link"],function(t){return t.init(12,8,a)})}),g=0)},(u=function(e){return t.when(t.ajax(e)).then(function(e){var i,s,o,r,n,l;if(e.error)return t(".loading i").hide(),void t(".loading .infos").text(e.message);if(e.topartists["@attr"].total<10)return t(".loading i").hide(),void t(".loading .infos").text("Please scrobble more music to play or select a genre.");for(o=e.topartists.artist,r={},n=0,l=[];10>n;)i=o[n].name,i=i.split(" ").join("+"),s="http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+i+"&api_key="+a+"&limit=8&format=json",t.getJSON(s,function(e){var a,i,s,o;for(a=e.topalbums["@attr"].artist,o=e.topalbums["@attr"].artist.split(" ").join("_").toLowerCase(),i=e.topalbums.album,r[a]=[],t("#image-datas").append('<div class="artists">'),s=0;s<e.topalbums.album.length;)r[a].push(o+s),t("#image-datas .artists:last").append('<img src="'+i[s].image[2]["#text"]+'" id="'+o+s+'" width="100px" height="100px" artist="'+a+'"/>'),s++;return g++,m(r)}),l.push(n++);return l})})(l.format("fakelbst"))}),String.prototype.format=function(){var t,e,a;for(t=this,e=0;e<arguments.length;)a=new RegExp("\\{"+e+"\\}","gi"),t=t.replace(a,arguments[e]),e++;return t},Array.prototype.move=function(t,e){this.splice(e,0,this.splice(t,1)[0])};