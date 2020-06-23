
/**
 * 气泡弹窗
 * @param {any} htmlContent	html内容
 * @param {any} option	配置项
 */
var PopUpWindow = function (htmlContent, option) {
    var opt = option ? option : {};
    opt.title = opt.title ? opt.title : "";
    opt.width = opt.width ? opt.width : 200;
    opt.height = opt.height ? opt.height : 100;

    this.option = opt;
    this._viewer = null;

    var html =
        '<div class="bgs1">'
        + '<img src="./img/camera.png" style="width:30px;height:30px;vertical-align: middle;">'
        + '<span> ' + opt.title + '</span > '
        + ' <span style="float:right;width:30px;margin-right:5px;color:#ccc;cursor:pointer;font-size:16px;text-align:center">X</span>'
        + '</div>'
        + "<div class='bgs2'>"
        + "<span class='contentsinfo'>" + htmlContent + '</span>'
        + '</div>';
    //+ "<div class='bgs3' style='width: 333px; height: 16px'></div>";
    this.element = document.createElement('div');
    this.element.className = "popup-win";
    this.element.style.position = "absolute";
    this.element.style.width = opt.width + "px";
    this.element.style.height = opt.height + "px";
    this.element.innerHTML = html;

    this._worldPosition = null;
    if (opt.position) {
        this._worldPosition = opt.position;
    }

};

/**
 * 设置弹窗的位置
 * @param {Cartesian3} position	位置Cartesian3
 */
PopUpWindow.prototype.setPosition = function (position) {
    var that = this;
    if (!position) {
        this.close();
        return;
    }
    var canvasPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this._viewer.scene, position);
    if (Cesium.defined(canvasPosition)) {
        that.element.style.top = canvasPosition.y - this.option.height * 2 + 'px';
        that.element.style.left = canvasPosition.x - this.option.width / 2 + 'px';
        that.show();
    }
    this._worldPosition = position;
};

/**
 * 设置弹窗的地图容器
 * @param {any} viewer	cesium viewer 对象
 */
PopUpWindow.prototype.setViewer = function (viewer) {
    var that = this;
    this._viewer = viewer;
    this._viewer.scene.preRender.addEventListener(function () {
        if (that.element.style.display !== "none") {
            that.update();
        }
    });
};

/**
 *  获取视图
 *  @returns {viewer}  地图视图
 *  
 * */
PopUpWindow.prototype.getViewer = function () {
    return this._viewer;
};

/**
 * 更新弹窗的位置
 * */
PopUpWindow.prototype.update = function () {
    if (this._worldPosition) {
        this.setPosition(this._worldPosition);
    }
};

/**
 * 隐藏弹窗
 * */
PopUpWindow.prototype.close = function () {
    this.element.style.display = "none";
};

/**
 * 显示弹窗
 * */
PopUpWindow.prototype.show = function () {
    this.element.style.display = "block";
};


/**
 * 更改setTitle
 * @param {any}  title   title
 * */
PopUpWindow.prototype.setTitle = function (title) {
    this.element.children[0].children[0].innerHTML = title;
};
/**
 * 更改setContent
 * @param {any} content content
 * */
PopUpWindow.prototype.setContent = function (content) {
    let container = this.element.children[1].children[0];
    container.innerHTML = content;
};

PopUpWindow.prototype.HTMLDecode = function (text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
};

export default PopUpWindow;