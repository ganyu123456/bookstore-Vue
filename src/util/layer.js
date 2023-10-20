
const layer = window.layer;
export function load(tips) {
    var msg = tips ? tips : "加载中...";
    return layer.msg(msg, {
        icon: 16, shade: 0.08
    });
}
export function dialog(tips,func) {
    var index = layer.alert(tips, function () {
        if (func) {
            func();
        }
        layer.close(index);
    });
}
export function message(tips) {
    layer.msg(tips);
}
export function confirm(tips, func) {
    var index = layer.confirm(tips, {
        btn: ['确定', '取消'] //按钮
    }, func, function () {
        layer.close(index);
    });
}
export function close(index) {
    layer.close(index);
}
export function closeAll() {
    layer.closeAll();
}