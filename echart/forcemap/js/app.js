(function () {
    // set up enter_btn's function
    $("#enter_btn").click(function(){
        $("#index").css({display:"none"});
        $("#map-container").css({display:"block"});
        showMap();
    });
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
                    height:$('body').height() - 140,
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
            var container = BMapExt.getEchartsContainer();

            var startPoint = {
                x: 70.404,
                y: 30.915
            };
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
                        geoCoord: geoCoord,

                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 3,
                                period: 15,
                                color: 'green',
                                // shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    lineStyle: {
                                        type: 'solid',
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
                marker.addEventListener("mouseover", function(){
                    var newsData = newsDatas[site];
                    // console.log(newsData);
                    showInfo(newsData);
                });


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
