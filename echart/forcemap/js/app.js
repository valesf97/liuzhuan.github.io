(function () {
    // set up editor's words
    var editorWords = "在新形势下，我军积极防御战略思|想更加强调注重军事力量在和平时期的|整体运筹：既要能在国土范围内不同地|区遂行军事行动任务，也要根据国家安|全发展需要和所承担的国际责任和义务，|与外军开展交流合作，为维护世界和平|发挥积极作用。2015年上半年中，我|军在海外执行了哪些任务，有何重要意|义。一张地图带你看懂中国军队为维护|世界和平、促进共同发展的行动足迹。"
    var lines = editorWords.split("|");
    var editorHTML = "";
    for (var i = 0; i < lines.length; i++) {
        if (i == 0) {
            editorHTML += "<p style='text-indent:2em;padding-left:"+(i*2)+"px'>"+lines[i]+"</p>";    
        } else {
            editorHTML += "<p style='padding-left:"+(i*8)+"px'>"+lines[i]+"</p>";
        }
    }
    $("#editor_word").html(editorHTML);
    $("#enter_btn").css({visibility:"visible"});

    var numItems = 0;
    var items = ["点击进入", "点击进入>", "点击进入>>", "点击进入>>>"];
    var animationID = setInterval(function(){
        $("#enter_btn").text(items[numItems]);
        numItems++;
        numItems%=items.length;
    }, 200);

    // set up enter_btn's function
    $("#enter_btn").click(function(){
        $("#index").css({display:"none"});
        $("#map-container").css({display:"block"});
        clearInterval(animationID);
        showMap();
    });

    require.config({
        paths: {
            echarts: 'js'
        },
        packages: [
            {
                name: 'BMap',
                location: 'js',
                main: 'main'
            }
        ]
    });


    function showMap() {
        require(
        [
            'echarts',
            'BMap',
            'echarts/chart/map'
        ],
        function (echarts, BMapExtension) {
            autoFit();

            function autoFit(){
                $('#main').css({
                    height:$(window).height() - 140,
                    width: $('body').width()
                });
            }

            $(window).resize(autoFit);
            $('body').resize(autoFit);

            // 初始化地图
            var BMapExt = new BMapExtension($('#main')[0], BMap, echarts,{
                enableMapClick: false
            });
            var map = BMapExt.getMap();
            map.setMinZoom(4);
            map.setMaxZoom(8);
            map.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT}));
            setupMapBounds();

            function setupMapBounds() {
                map.addEventListener("dragend", restrict);
                map.addEventListener("moveend", autoRestrict);

                var zone = {
                    ne:new BMap.Point(166.336176,63.207456),
                    sw:new BMap.Point(-21.308122,-15.382507)
                };

                function restrict() {
                    var bs = map.getBounds();
                    var bssw = bs.getSouthWest();
                    var bsne = bs.getNorthEast();
                    var diffLng = bsne.lng - bssw.lng;
                    var diffLat = bsne.lat - bssw.lat;

                    var pt = map.getCenter();
                    console.log(pt);
                    if (bsne.lng > zone.ne.lng) {
                        pt.lng -= bsne.lng - zone.ne.lng;
                    } else if (bssw.lng < zone.sw.lng) {
                        pt.lng -= bssw.lng - zone.sw.lng;
                    } else if (bsne.lat > zone.ne.lat) {
                        pt.lat -= bsne.lat - zone.ne.lat;
                    } else if (bssw.lat < zone.sw.lat) {
                        pt.lat -= bssw.lat - zone.sw.lat;
                    } else {
                        return;
                    }

                    setTimeout(function(){
                        map.panTo(pt, {noAnimation:true});
                    }, 10);
                }

                function autoRestrict() {
                    map.removeEventListener("moveend", autoRestrict);
                    restrict();

                    setTimeout(function(){
                        map.addEventListener("moveend", autoRestrict);
                    }, 1000);
                }
            }

            var container = BMapExt.getEchartsContainer();

            var startPoint = {
                x: 70.404,
                y: 30.915
            };

            startPoint = {x:100, y:36};

            var point = new BMap.Point(startPoint.x, startPoint.y);
            map.centerAndZoom(point, 4);
            map.enableScrollWheelZoom(true);

            // var diff = 1;

            option = {
                color: ['gold','aqua','lime'],
                series : [
                    {
                        name:'北京',
                        type:'map',
                        mapType: 'none',
                        data:[],
                        geoCoord:geoCoord,

                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize:3,
                                period:15,
                                color:'green'
                                // shadowBlur: 10
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth:1,
                                    lineStyle: {
                                        type: 'solid'
                                        // shadowBlur: 10
                                    },
                                    color:"green"
                                }
                            },
                            data : [
                                [{name:'中国'}, {name:'南苏丹'}],
                                [{name:'中国'}, {name:'马来西亚'}],
                                [{name:'中国'}, {name:'马来西亚1'}],
                                [{name:'中国'}, {name:'亚丁湾海域'}],
                                [{name:'中国'}, {name:'印度洋'}],
                                [{name:'中国'}, {name:'西太平洋'}],
                                [{name:'中国'}, {name:'西太平洋1'}],
                                [{name:'中国'}, {name:'西太平洋2'}],
                                [{name:'中国'}, {name:'西太平洋3'}],
                                [{name:'中国'}, {name:'也门'}],
                                [{name:'中国'}, {name:'尼泊尔'}],
                                [{name:'中国'}, {name:'俄罗斯'}],
                                [{name:'中国'}, {name:'地中海'}],
                                [{name:'中国'}, {name:'马里'}],
                                [{name:'中国'}, {name:'白俄罗斯'}]
                            ]
                        }
                    }
                ]
            };

            var myChart = BMapExt.initECharts(container);
            BMapExt.setOption(option);

            // add some marker on map
            var infoWindow = new BMap.InfoWindow('', {width:212});
            for (var site in geoCoord) {
                if (site == "中国") continue;
                // console.log(site);
                var lngLat = geoCoord[site];
                var pt = new BMap.Point(lngLat[0], lngLat[1]);
                var marker = new BMap.Marker(pt);
                map.addOverlay(marker);

                addHandler(marker, site);
            }

            function addHandler(marker, site) {
                marker.addEventListener("mouseover", markerHandler);
                marker.addEventListener("click", markerHandler);

                function markerHandler() {
                    var newsData = newsDatas[site];
                    // console.log(newsData);
                    showInfo(newsData);
                }


                function showInfo(data) {
                    var message = "<div class='date'>"+data.date+"</div>";
                    message += "<div class='site bl'><span>地点：</span>" + data.site + "</div>";
                    message += "<div class='title bl'>" + data.title + "</div>";
                    message += "<div class='comment_title'>点评：</div>";
                    message += "<div class='comment'>" + data.comment + "</div>";
                    infoWindow.setContent(message);
                    marker.openInfoWindow(infoWindow);
                }
            }
        });
    }
})();
