$(function () {
    // 表格数据展示区
    var tbody = $(".tbody");

    // 发送ajax 请求获取数据 
    $.ajax({
        type: "post",
        url: "./api.php",
        data: {
            uid: getCookie("uid"),
            op: "reviews"
        },
        success: function (e) {
            if (e == "error") {
                // 出现问题
                swal("错误", "服务器错误，请重试", "error");
            } else if (e == "nx_api") {
                // 出现问题
                swal("错误", "请求错误，请检查参数op", "error");
            } else if (e == "db_error") {
                // 出现问题
                swal("错误", "数据库错误，请检查数据库连接", "error");
            } else if (e == "empty") {
                // 出现问题
                swal("????", "什么都没有查询到!", "info");
            } else {
                var arr = JSON.parse(e);
                // 获取笔试用户总数
                var length = arr.length;
                // 判断数据总数
                if (length == 0) {
                    swal("????", "什么都没有查询到!", "info");
                    return;
                }
                for (var i = 0; i < length; i++) {
                    tbody.append('\
                        <tr bid=' + arr[i][0] + ' class="user-item">\
                            <td>' + arr[i][0] + '</td>\
                            <td>' + arr[i][1] + '</td>\
                            <td>' + arr[i][2] + '<span class="starnum"></span></td>\
                            <td>' + arr[i][3] + '</td>\
                            <td>\
                                <button type="button" class="checkbtn btn btn-success btn-sm" onclick="location.href=\'./index.php?bid=' + arr[i][0] + '\'">面试记录</button>\
                            </td>\
                        </tr>\
                    ');
                }
                
            }
            return;
        },
        error: function (e) {
            // 网络或服务器错误
            swal("错误", "网络堵塞或服务器故障!", "error");
            return;
        }
    });
})

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}