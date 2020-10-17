$(function () {
    // 表格数据展示区
    var tbody = $(".tbody");
    // 定义每页最大显示数
    var MAXSHOW = 7;

    // 查询按钮点击事件
    $(".Searchbtn").click(function () {
        var q = $(".Searchtext").val();
        if (q.length == 0) {
            return;
        }
        location.href = "./index.php?q=" + q;
    });
    // 获取get传值 q
    var q = getQueryVariable("q");
    if (q != false) {
        q = decodeURIComponent(q);
        $(".Searchtext").val(q);
    } else {
        // 置空q
        q = "";
    }

    // 发送ajax 请求获取数据 
    $.ajax({
        type: "post",
        url: "./api.php",
        data: {
            op: "query",
            q: q
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
                // 解析笔试用户信息
                var users = JSON.parse(e);
                // 获取笔试用户总数
                var length = users.length;
                // 判断数据总数
                if (length == 0) {
                    swal("????", "什么都没有查询到!", "info");
                    return;
                }
                // 获取分页总数
                var pagenum = Math.ceil(length * 1.0 / MAXSHOW);
                // 获取当前页数
                var pagenow = getQueryVariable("page");
                if (pagenow == false) {
                    pagenow = 1; // 默认为第一页
                }
                // 输出本页表格数据
                var maxi = pagenow * MAXSHOW < length ? pagenow * MAXSHOW : length;
                for (var i = (pagenow - 1) * MAXSHOW; i < maxi; i++) {
                    if (!users[i][14]) {
                        users[i][14] = "暂无";
                    }
                    tbody.append('\
                        <tr bid=' + users[i][0] + ' class="user-item">\
                            <td>' + users[i][0] + '</td>\
                            <td>' + users[i][2] + '</td>\
                            <td>' + users[i][5] + '</td>\
                            <td>' + users[i][6] + '</td>\
                            <td class="shenglue">' + users[i][7] + '</td>\
                            <td class="shenglue">' + users[i][8].replace(/<[^<>]+?>/g,'') + '</td>\
                            <td class="shenglue">' + users[i][9] + '</td>\
                            <td class="shenglue">' + users[i][10] + '</td>\
                            <td class="shenglue">' + users[i][11] + '</td>\
                            <td class="shenglue">' + users[i][12] + '</td>\
                            <td class="shenglue">' + users[i][13] + '</td>\
                            <td>' + users[i][14] + '<span class="starnum"></span></td>\
                            <td>\
                                <button type="button" class="checkbtn btn btn-success btn-sm" onclick="location.href=\'./index.php?bid=' + users[i][0] + '\'">开始面试</button>\
                            </td>\
                        </tr>\
                    ');
                }
                pagenow = Number.parseInt(pagenow);
                // 定义上一页
                var lastpage = pagenow - 1 > 1 ? pagenow - 1 : 1;
                // 定义下一页
                var nextpage = pagenow + 1 < pagenum ? pagenow + 1 : pagenum;
                // 表格底部分页栏
                tbody.append('\
                    <!-- 表格底部分页栏 -->\
                    <tr class="table-borderless">\
                        <td colspan="5">\
                            <nav aria-label="Page navigation example">\
                                <ul class="pagination">\
                                    <li class="page-item"><a class="page-link" href="./index.php?q=' + q + '&page=1">首页</a></li>\
                                    <li class="page-item"><a class="page-link" href="./index.php?q=' + q + '&page=' + lastpage + '">上一页</a></li>\
                                    <li class="page-item"><a class="page-link" href="./index.php?q=' + q + '&page=' + nextpage + '">下一页</a></li>\
                                    <li class="page-item"><a class="page-link" href="./index.php?q=' + q + '&page=' + pagenum + '">尾页</a></li>\
                                </ul>\
                            </nav>\
                        </td>\
                        <td colspan="8">\
                            <span>第<span class="nowpage">' + pagenow + '</span>页/共<span class="allpage">' + pagenum + '</span>页</span>\
                        </td>\
                    </tr>\
                ');

            }
        },
        error: function (e) {
            // 网络或服务器错误
            swal("错误", "网络堵塞或服务器故障!", "error");
        }
    });

})

// 获取get数据
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
