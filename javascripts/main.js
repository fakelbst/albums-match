var APIkey,Limit,MyUrl,Page,User;APIkey="4dff88a0423651b3570253b10b745b2c",User="fakelbst",Limit=10,Page=1,MyUrl="http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user="+User+"&api_key="+APIkey+"&limit="+Limit+"&format=json",require.config({baseUrl:"javascripts",waitSeconds:20,paths:{jquery:"lib/jquery.min",imagesLoaded:"lib/imagesloaded.pkgd",async:"lib/async",link:"link"}}),require(["jquery","imagesLoaded"],function(t,e){var i,a,s;t("#showLeftPush").click(function(){return t(this).toggleClass("active"),t("body").toggleClass("cbp-spmenu-push-toright"),t("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open")}),t("#get-user").click(function(){var e,a,s,r;return s=t(".lastfm-username input").val(),r="http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user="+s+"&api_key="+APIkey+"&limit="+Limit+"&format=json",t(".loading").show(),t(".loading i").show(),t(".loading .infos").text("Loading...please wait."),t(".playground").hide(),t("#image-datas").empty(),e=document.getElementById("c"),a=e.getContext("2d"),a.clearRect(0,0,e.width,e.height),i(r)}),a=0,s=function(i){10===a&&(e("#image-datas",function(){return t(".loading").hide(),t(".playground").show(),require(["link"],function(t){return t.init(12,8,i)})}),a=0)},(i=function(e){return t.when(t.ajax(e)).then(function(e){var i,r,o,n,l,u;if(e.error)return t(".loading i").hide(),void t(".loading .infos").text(e.message);for(o=e.topartists.artist,n={},l=0,u=[];10>l;)i=o[l].name,i=i.split(" ").join("+"),r="http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+i+"&api_key="+APIkey+"&limit=8&format=json",t.getJSON(r,function(e){var i,r,o,l;for(i=e.topalbums["@attr"].artist,l=e.topalbums["@attr"].artist.split(" ").join("_").toLowerCase(),r=e.topalbums.album,n[i]=[],o=0;o<e.topalbums.album.length;)n[i].push(l+o),t("#image-datas").append('<img src="'+r[o].image[2]["#text"]+'" id="'+l+o+'" style="display:none"/>'),o++;return a++,s(n)}),u.push(l++);return u})})(MyUrl)});