require.config({baseUrl:"javascripts",waitSeconds:20,paths:{jquery:"lib/jquery.min",imagesLoaded:"lib/imagesloaded.pkgd",async:"lib/async",link:"link"}}),require(["jquery","imagesLoaded"],function(t,e){var a,i,o,r,s,n,l,u,g;a="4dff88a0423651b3570253b10b745b2c",s="fakelbst",o=10,r=1,n="http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user={0}&api_key="+a+"&limit="+o+"&format=json",i="http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag={0}&api_key="+a+"&limit="+o+"&format=json",t("#showLeftPush").click(function(){return t(this).toggleClass("active"),t("body").toggleClass("cbp-spmenu-push-toright"),t("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open")}),t("#get-user").click(function(){var e,a,i,o;return i=t(".lastfm-username input").val(),o=n.format(i),t(".loading").show(),t(".loading i").show(),t(".loading .infos").text("Loading...please wait."),t(".playground").hide(),t("#image-datas").empty(),e=document.getElementById("c"),a=e.getContext("2d"),a.clearRect(0,0,e.width,e.height),l(o)}),u=0,g=function(a){10===u&&(e("#image-datas",function(){return t(".loading").hide(),t(".playground").show(),require(["link"],function(t){return t.init(12,8,a)})}),u=0)},(l=function(e){return t.when(t.ajax(e)).then(function(e){var i,o,r,s,n,l;if(e.error)return t(".loading i").hide(),void t(".loading .infos").text(e.message);if(e.topartists["@attr"].total<10)return t(".loading i").hide(),void t(".loading .infos").text("Please scrobble more music to play or select a genre.");for(r=e.topartists.artist,s={},n=0,l=[];10>n;)i=r[n].name,i=i.split(" ").join("+"),o="http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+i+"&api_key="+a+"&limit=8&format=json",t.getJSON(o,function(e){var a,i,o,r;for(a=e.topalbums["@attr"].artist,r=e.topalbums["@attr"].artist.split(" ").join("_").toLowerCase(),i=e.topalbums.album,s[a]=[],o=0;o<e.topalbums.album.length;)s[a].push(r+o),t("#image-datas").append('<img src="'+i[o].image[2]["#text"]+'" id="'+r+o+'" style="display:none"/>'),o++;return u++,g(s)}),l.push(n++);return l})})(n.format("fakelbst"))}),String.prototype.format=function(){var t,e,a;for(t=this,e=0;e<arguments.length;)a=new RegExp("\\{"+e+"\\}","gi"),t=t.replace(a,arguments[e]),e++;return t};