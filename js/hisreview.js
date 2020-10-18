$(function () {
    // 表格数据展示区
    var tbody = $(".tbody");

    // 发送ajax 请求获取数据 
    $.ajax({
        type: "post",
        url: "./api.php",
        data: {
            bid: getQueryVariable("hisreview"),
            op: "hisreview"
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
                            <td>' + arr[i][2] + '</td>\
                            <td>' + arr[i][3] + '<span class="starnum"></span></td>\
                            <td>\
                                <button type="button" class="checkbtn btn btn-success btn-sm" onclick="location.href=\'./index.php?bid=' + arr[i][0] + '\'">面试记录</button>\
                            </td>\
                        </tr>\
                    ');
                }
                $("title").text(arr[0][0] + $("title").text());
                
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

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}