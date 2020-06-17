<template>
    <div class="my-earth">
        <div class="container" ref="earthContainer">

        </div>
        <MyTools :earth="$data._earth"></MyTools>
    </div>
</template>
<script>
    import ServerConfig from "@/config/ServerConfig.js"

    import MyTools from "./earth/MyTools.vue"

    export default {
        name: "MyEarth",
        components: { MyTools },
        data() {
            return {
                _earth: null,
                _cesiumViewer: null
            }
        },
        mounted() {

            let earth = new XE.Earth(this.$refs.earthContainer);

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

            tileset.flyTo();

            this._earth = earth;
            this._cesiumViewer = earth.czm.viewer;
            window.earth = earth;
            setTimeout(function () {
                console.clear();
            }, 3000);



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
            }


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