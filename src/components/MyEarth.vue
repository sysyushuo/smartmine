<template>
    <div class="my-earth">
        <div class="container" ref="earthContainer">

        </div>
        <MyTools :earth="$data._earth"></MyTools>
    </div>
</template>
<script>
    import ServerConfig from "@/config/ServerConfig.js"

    import PopUpWindow from "./earth/lib/PopUpWindow";

    import MyTools from "./earth/MyTools.vue"

    export default {
        name: "MyEarth",
        components: { MyTools },
        data() {
            return {
                _earth: null,
                _cesiumViewer: null,    //cesium viewer对象

                entityCameras: [],    //摄像头标签
                entityCars: [],    //车辆标签
                destroyers: []   //组件销毁时要被清理的对象


            }
        },
        mounted() {

            let earth = new XE.Earth(this.$refs.earthContainer);
            earth.interaction.picking.enabled = true;
            earth.sceneTree.root = {
                "children": [
                    {
                        "czmObject": {
                            "name": "谷歌影像",
                            "xbsjType": "Imagery",
                            "xbsjImageryProvider": {
                                "XbsjImageryProvider": {
                                    "url": ServerConfig.url_baseimg,
                                    //"srcCoordType": "GCJ02",
                                    //"dstCoordType": "WGS84",
                                    "maximumLevel": 21,
                                },
                            }
                        }
                    },
                    {
                        "ref": 'tileset',
                        "czmObject": {
                            "xbsjType": "Tileset",
                            "name": "三维瓦片1x",
                            "url": ServerConfig.url_maintileset,
                            "xbsjClippingPlanes": {},
                            "xbsjUseOriginTransform": false, //是否启用原先的状态
                            "skipLevelOfDetail": false,
                        },
                    },
                ]
            };

            //设置tileset的位置
            let tileset = earth.sceneTree.$refs["tileset"].czmObject;
            let pos = ServerConfig.pos_maintileset;
            tileset["xbsjPosition"] = [
                Cesium.Math.toRadians(pos[0]),
                Cesium.Math.toRadians(pos[1]),
                pos[2]
            ];

            tileset.allowPicking = false;
            tileset.pickingStyle = null;    //取消pickingStyle，避免点击别人的时候他也能选中
            tileset.flyTo();

            this._earth = earth;
            this._cesiumViewer = earth.czm.viewer;
            window.earth = earth;
            //setTimeout(function () {
            //    console.clear();
            //}, 3000);

            this._leftClick();

            //加载业务信息
            this.loadCameras([
                { x: 112.98421034321821, y: 34.75524223083444, h: 30 },
                { x: 112.98441034321821, y: 34.75534223083444, h: 30 },
            ]);

            this.loadCars([
                { x: 112.98431034321821, y: 34.75533223083444, h: 30 },
                { x: 112.98461034321821, y: 34.75534223083444, h: 30 },
            ]);


        },
        methods: {

            /**
             * 飞行到主视图
             * */
            flyToHome: function () {
                this.flyToCameraLocation(ServerConfig.pos_home);
            },

            /**
             * 获取相机状态
             * @returns {cameraStatus} 相机状态
             * */
            getCameraStatus: function () {
                var camera = this._cesiumViewer.camera;
                var height = camera.positionCartographic.height.toFixed(0);
                var heading = Cesium.Math.toDegrees(camera.heading).toFixed(2);
                var pitch = Cesium.Math.toDegrees(camera.pitch).toFixed(2);
                var roll = Cesium.Math.toDegrees(camera.roll).toFixed(2);

                var cartographic = camera.positionCartographic;
                var lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
                var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);

                return {
                    longitude: lon,
                    latitude: lat,
                    height: height,
                    heading: heading,
                    pitch: pitch,
                    roll: roll
                };
            },


            /**
            * 飞行到某个相机姿态
            * @param {any} cameraStatus 相机状态
            */
            flyToCameraLocation: function (cameraStatus) {
                this._cesiumViewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(cameraStatus.longitude, cameraStatus.latitude, cameraStatus.height),
                    orientation: {
                        heading: Cesium.Math.toRadians(cameraStatus.heading),
                        pitch: Cesium.Math.toRadians(cameraStatus.pitch),
                        roll: cameraStatus.roll ? cameraStatus.roll : 0.0
                    }
                });
            },

            /**
             * 设置视图方式
             * @param mode  Cesium.SceneMode
             */
            setSceneMode: function (mode) {
                if (mode === "2D") {
                    this._cesiumViewer.scene.morphTo2D(0);//二维
                } else if (mode === "3D") {
                    this._cesiumViewer.scene.morphTo3D(0);//三维
                }
            },

            /**
             * 把气泡弹窗添加到地图中----------cesium
             * @param {any} popup   气泡弹窗
             */
            addPopUp: function (popup) {
                popup.setViewer(this._cesiumViewer);
                this._cesiumViewer._container.appendChild(popup.element);
                popup.element.firstChild.lastChild.addEventListener('click', function () {
                    popup.close();
                });
            },

            //加载围栏
            loadFences(fences) {

            },

            //加载摄像头
            loadCameras(cameras) {
                if (this.entityCameras.length) {
                    return;
                }


                for (var i = 0; i < cameras.length; i++) {
                    let pos = [
                        Cesium.Math.toRadians(cameras[i].x),
                        Cesium.Math.toRadians(cameras[i].y),
                        cameras[i].h
                    ];
                    let pinCameraConfig = {
                        "name": 'camera_' + i,
                        "xbsjType": "Pin",
                        "position": pos,
                        "show": true,
                        "imageUrl": "./img/camera.png"
                    }
                    let pinCamera = new XE.Obj.Pin(this._earth);
                    pinCamera.xbsjFromJSON(pinCameraConfig);
                    pinCamera.onclick = (eve) => {
                        console.log(eve);
                        let position = eve.id.position.getValue();
                        let html = "你好啊老伙计";
                        if (!this.popup) {
                            this.popup = new PopUpWindow(html, {
                                position: position,
                                title: "设备信息"
                            });
                            this.addPopUp(this.popup);
                        } else {
                            this.popup.setContent(html);
                            this.popup.setPosition(position);
                        }

                    };
                    this.entityCameras.push(pinCameraConfig["name"]);
                }
            },

            //加载车辆
            loadCars(cars) {
                if (this.entityCars.length > 0) {
                    return;
                }

                for (var i = 0; i < cars.length; i++) {
                    let pos = [
                        Cesium.Math.toRadians(cars[i].x),
                        Cesium.Math.toRadians(cars[i].y),
                        cars[i].h
                    ];
                    let pinCarConfig = {
                        "name": 'car_' + i,
                        "xbsjType": "Pin",
                        "position": pos,
                        "show": true,
                        "imageUrl": "./img/car.png"
                    }
                    let pinCar = new XE.Obj.Pin(this._earth);
                    pinCar.xbsjFromJSON(pinCarConfig);
                    pinCar.onclick = (eve) => {
                        console.log(eve);
                    };
                    this.entityCars.push(pinCarConfig["name"]);
                }
            },

            //定位车辆信息
            locateCarById(id) {
                let car = null;
                let cars = this._earth.getAllObjects("Pin");
                for (var i = 0; i < cars.length; i++) {
                    if (cars[i]["name"] === "car_" + id) {
                        car = cars[i];
                        break;
                    }
                }
                if (car) {
                    car.flyTo();
                }
            },

            //定位摄像头信息
            locateCameraById(id) {
                let camera = null;
                let cameras = this._earth.getAllObjects("Pin");
                for (var i = 0; i < cars.length; i++) {
                    if (cameras[i]["name"] === "camera_" + id) {
                        camera = cameras[i];
                        break;
                    }
                }
                if (camera) {
                    camera.flyTo();
                }
            },

            /**
             * 播放车辆轨迹
             * @param path 车辆轨迹 坐标数组
             */
            playCarPath(path) {
                //如果已经有路径了就开启播放,并返回
                if (this._playPathUnbind) {
                    let alreadyPathObject = this._earth.sceneTree.$refs["temp_path_car"] && this._earth.sceneTree.$refs["temp_path_car"].czmObject;
                    if (alreadyPathObject) {
                        if (alreadyPathObject.playing == false) {
                            alreadyPathObject.playing = true;
                            return;
                        } else {
                            return;
                        }
                    }
                }

                path = [
                    { x: 112.98640779929082, y: 34.75278714150191, h: 0, speed: 10 },
                    { x: 112.9864044869296, y: 34.75304583501555, h: 0, speed: 10 },
                    { x: 112.98642278615964, y: 34.75334771219444, h: 0, speed: 10 },
                    { x: 112.98641899517567, y: 34.75370737912795, h: 0, speed: 10 },
                    { x: 112.98641542371676, y: 34.75401347051423, h: 0, speed: 10 },
                    { x: 112.98641458957529, y: 34.754540683140604, h: 0, speed: 10 },
                    { x: 112.98644600914218, y: 34.75512203239077, h: 0, speed: 10 },
                    { x: 112.98645529348316, y: 34.75577207794671, h: 0, speed: 10 },
                    { x: 112.98648180672163, y: 34.7564758427016, h: 0, speed: 10 },
                    { x: 112.98646305885757, y: 34.757639211787684, h: 0, speed: 10 },
                    { x: 112.98631436637947, y: 34.756568807049455, h: 0, speed: 10 },
                    { x: 112.98603762463559, y: 34.75641872518269, h: 0, speed: 10 },
                    { x: 112.9859389077341, y: 34.75619640890047, h: 0, speed: 10 },
                    { x: 112.98554751401394, y: 34.75621719519997, h: 0, speed: 10 },
                    { x: 112.98473735221715, y: 34.756254439278806, h: 0, speed: 10 },
                    { x: 112.98384343126821, y: 34.75621789896056, h: 0, speed: 10 },
                    { x: 112.98309098555588, y: 34.756267514018425, h: 0, speed: 10 },
                    { x: 112.98219032167586, y: 34.75623545616257, h: 0, speed: 10 },
                    { x: 112.98214146612372, y: 34.755612247334064, h: 0, speed: 10 },
                    { x: 112.98210498169004, y: 34.755011946825555, h: 0, speed: 10 },
                    { x: 112.98208659083981, y: 34.75387029123074, h: 0, speed: 10 },
                    { x: 112.98212110317196, y: 34.75348638998329, h: 0, speed: 10 },
                    { x: 112.98302154823922, y: 34.753423284711445, h: 0, speed: 10 },
                    { x: 112.98383480183557, y: 34.75334063753222, h: 0, speed: 10 },
                    { x: 112.9849238748832, y: 34.753219213853235, h: 0, speed: 10 },
                    { x: 112.98598685009007, y: 34.7530632722079, h: 0, speed: 10 }
                ];
                let xbsjPositions = [];
                let xbsjRotations = [];
                for (var i = 0; i < path.length; i++) {
                    xbsjPositions.push([
                        Cesium.Math.toRadians(path[i]["x"]),
                        Cesium.Math.toRadians(path[i]["y"]),
                        path[i]["h"]
                    ]);
                    xbsjRotations.push([0, 0, 0]);
                }

                let pathConfig = {
                    "ref": 'temp_path_car',
                    "czmObject": {
                        "xbsjType": "Path",
                        "positions": xbsjPositions,
                        "rotations": xbsjRotations,
                        "show": true, // 显示路径
                        "loop": false, // 是否为环线
                        //"showDirection": false, // 显示方向(默认为true)
                        //"cameraAttached": true, // 绑定相机
                        // 是否处于播放状态
                        // 如果属性值为true，则所有'current'开头的相关属性会动态发生变化。 可以通过手动设置为false，来结束播放状态。 当loopPlay属性为false时，playing属性会在路径播放到最后一个关键点的位置时，自动变为false。
                        "playing": true,
                        // 是否循环播放
                        // 如果为false，则playing设置为true时，会从当前位置播放到最后一个关键点，并停止播放，此时playing属性会自动变成false。 若此属性为true时，播放到最后一个关键点以后，将自动重第一个关键点继续播放。
                        "loopPlay": true
                    }
                };

                this._earth.sceneTree.root.children.push(pathConfig);
                let pathObject = this._earth.sceneTree.$refs["temp_path_car"].czmObject;
                pathObject.flyTo();

                let pinCarConfig = {
                    "ref": 'temp_play_car',
                    "czmObject": {
                        "name": 'temp_play_car',
                        "xbsjType": "Pin",
                        "position": xbsjPositions[0],
                        "imageUrl": "./img/car.png"
                    },
                }
                this._earth.sceneTree.root.children.push(pinCarConfig);
                let pinCar = this._earth.sceneTree.$refs["temp_play_car"].czmObject;
                //车辆绑定到路径上
                this._playPathUnbind = XE.MVVM.track(pinCar, 'position', pathObject, 'currentPosition');
            },

            /**
             * 暂停车辆路径播放
             * */
            pausePlayCarPath() {
                //停止播放
                let pathObject = this._earth.sceneTree.$refs["temp_path_car"] && this._earth.sceneTree.$refs["temp_path_car"].czmObject;
                if (pathObject) {
                    pathObject.playing = false;
                }
            },

            /**
             * 停止车辆路径播放
             * */
            stopPlayCarPath() {
                //停止绑定
                if (this._playPathUnbind) {
                    this._playPathUnbind();
                }
                //清除路径和车辆
                let pinCar = this._earth.sceneTree.$refs["temp_play_car"];
                if (pinCar) {
                    pinCar.destroy();
                }
                let pathObject = this._earth.sceneTree.$refs["temp_path_car"];
                if (pathObject) {
                    pathObject.destroy();
                }
            },

            //左键点击拾取坐标
            _leftClick() {
                let that = this;
                var handler2 = new Cesium.ScreenSpaceEventHandler(this._cesiumViewer.scene.canvas);
                handler2.setInputAction(function (event) {
                    var earthPosition = that._cesiumViewer.camera.pickEllipsoid(event.position, that._cesiumViewer.scene.globe.ellipsoid);
                    var cartographic = Cesium.Cartographic.fromCartesian(earthPosition, that._cesiumViewer.scene.globe.ellipsoid, new Cesium.Cartographic());
                    var lat = Cesium.Math.toDegrees(cartographic.latitude);
                    var lng = Cesium.Math.toDegrees(cartographic.longitude);
                    var height = cartographic.height;
                    console.log("[Lng=>" + lng + ",Lat=>" + lat + ",H=>" + height + "]");
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            },



        },
        beforeDestroy() {
            // vue程序销毁时，需要清理相关资源
            this._earth = this._earth && this._earth.destroy();
        }
    }
</script>
<style scoped>
    .my-earth {
        height: 100%;
        width: 100%;
    }

        .my-earth .container {
            height: 100%;
            width: 100%;
        }
</style>