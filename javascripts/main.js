require.config({baseUrl:"javascripts",waitSeconds:20,paths:{jquery:"lib/jquery.min",imagesLoaded:"lib/imagesloaded.pkgd",async:"lib/async",link:"link"}}),require(["jquery","imagesLoaded"],function(t,e){var a,i,o,s,r,n,l,u,g,c;a="4dff88a0423651b3570253b10b745b2c",r="fakelbst",o=10,s=1,n="http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user={0}&api_key="+a+"&limit="+o+"&format=json",i="http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag={0}&api_key="+a+"&limit="+o+"&format=json",t("#showLeftPush").click(function(){t(this).toggleClass("active"),t(this).hasClass("active")&&(t(".lastfm-username input").focus(),t("body").css("overflow-x","hidden")),t("body").toggleClass("cbp-spmenu-push-toright"),t("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open")}),t("#get-user").click(function(){var e,a;e=t(".lastfm-username input").val(),a=n.format(e),g(),l(a)}),t("#select-genres").click(function(){t(".genres").toggle("normal")}),t(".genres a").click(function(){var e,a;e=t(this).attr("d"),a=i.format(e),g(),l(a)}),g=function(){var e,a;return t(".loading").show(),t(".loading i").show(),t(".loading .infos").text("Loading...please wait."),t(".playground").hide(),t("#image-datas").empty(),e=document.getElementById("c"),a=e.getContext("2d"),a.clearRect(0,0,e.width,e.height)},u=0,c=function(a){10===u&&(e("#image-datas",function(){return t(".loading").hide(),t(".playground").show(),require(["link"],function(t){return t.init(12,8,a)})}),u=0)},(l=function(e){return t.when(t.ajax(e)).then(function(e){var i,o,s,r,n,l;if(e.error)return t(".loading i").hide(),void t(".loading .infos").text(e.message);if(e.topartists["@attr"].total<10)return t(".loading i").hide(),void t(".loading .infos").text("Please scrobble more music to play or select a genre.");for(s=e.topartists.artist,r={},n=0,l=[];10>n;)i=s[n].name,i=i.split(" ").join("+"),o="http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+i+"&api_key="+a+"&limit=8&format=json",t.getJSON(o,function(e){var a,i,o,s;for(a=e.topalbums["@attr"].artist,s=e.topalbums["@attr"].artist.split(" ").join("_").toLowerCase(),i=e.topalbums.album,r[a]=[],o=0;o<e.topalbums.album.length;)r[a].push(s+o),t("#image-datas").append('<img src="'+i[o].image[2]["#text"]+'" id="'+s+o+'" style="display:none"/>'),o++;return u++,c(r)}),l.push(n++);return l})})(n.format("fakelbst"))}),String.prototype.format=function(){var t,e,a;for(t=this,e=0;e<arguments.length;)a=new RegExp("\\{"+e+"\\}","gi"),t=t.replace(a,arguments[e]),e++;return t};