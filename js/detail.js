$(function () {
    // 获取get传值 tbid
    var bid = getQueryVariable("bid");
    if (bid == false) {
        swal("糟糕", "页面获取失败，无效的信息，请返回重试!", "error");
        return;
    }

    // 发送ajax 请求获取数据 
    $.ajax({
        type: "post",
        url: "./api.php",
        data: {
            bid: bid,
            op: "queryone"
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
                var user = JSON.parse(e);
                if (user == null) {
                    // 查询失败
                    swal("糟糕", "信息获取失败，请返回重试!", "error");
                    return;
                }
                // 将数据输出到表单
                $("input[name=bid]").val(user["bid"]);
                $("input[name=time]").val(user["time"]);
                $("input[name=name]").val(user["name"]);
                $("title").text(user["name"] + " | " + $("title").text());
                $("input[name=phone]").val(user["phone"]);
                $("input[name=qq]").val(user["qq"]);
                $("input[name=college]").val(user["college"]);
                $("input[name=gender]").val(user["gender"]);
                $("textarea[name=question1]").val(user["question1"]);
                $("textarea[name=question2]").val(user["question2"]);
                $("textarea[name=question3]").val(user["question3"]);
                $("textarea[name=question4]").val(user["question4"]);
                $("textarea[name=question5]").val(user["question5"]);
                $("textarea[name=question6]").val(user["question6"]);
                $("textarea[name=question7]").val(user["question7"]);
                // textarea高度自适应
                for (let i = 0; i < 7; i++) {
                    document.getElementsByTagName("textarea")[i].style.height = document.getElementsByTagName("textarea")[i].scrollHeight + 10 + "px";
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
    // 发送ajax 请求获取数据 
    $.ajax({
        type: "post",
        url: "./api.php",
        data: {
            bid: bid,
            uid: getCookie("uid"),
            op: "reviewbyid"
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
                return;
            } else {
                var review = JSON.parse(e);
                // 将数据输出到表单
                $("#Review").val(review['review']);
                for (let i = 0; i < review['star']; i++) {
                    $(".staritem").eq(i).addClass("active");
                }
                $("input#Star").val(review['star']);
                // textarea高度自适应
                document.getElementById("Review").style.height = document.getElementById("Review").scrollHeight + 10 + "px";
                // 按钮文字修改
                $("#Submitbtn").val("修改并保存");
            }
        },
        error: function (e) {
            // 网络或服务器错误
            swal("错误", "网络堵塞或服务器故障!", "error");
        }
    });

    // 星星点击事件
    $(".staritem").click(function () {
        let index = $(".staritem").index(this);
        for (let i = 0; i <= $(".staritem").length; i++) {
            $(".staritem").eq(i).removeClass("active");
        }
        for (let i = 0; i <= index; i++) {
            $(".staritem").eq(i).addClass("active");
        }
        $("input#Star").val(index + 1);
        $("#StarFeedback").removeClass("invalid-feedback");
        $("#StarFeedback").text("");
    });

    // 面试记录输入事件
    $("#Review").keyup(function () {
        $("#Review").removeClass("is-invalid");
        $("#ReviewFeedback").removeClass("invalid-feedback");
        $("#ReviewFeedback").text("");
    });

    // 保存按钮点击事件
    $("#Submitbtn").click(function () {
        // 获取星级评价
        var star = $("input#Star").val();
        if (star.length == 0) {
            $("#StarFeedback").css("display", "block");
            $("#StarFeedback").addClass("invalid-feedback");
            $("#StarFeedback").text("请评价一个星级!");
            return;
        }
        // 获取面试记录
        var review = $("#Review").val();
        if (review.length == 0) {
            $("#Review").addClass("is-invalid");
            $("#ReviewFeedback").css("display", "block");
            $("#ReviewFeedback").addClass("invalid-feedback");
            $("#ReviewFeedback").text("尝试稍微写点面试记录!");
            return;
        }
        let bid = $("input#Bid").val();
        let uid = getCookie("uid");
        if (!bid || !uid) {
            return;
        }
        // 发送ajax 请求提交数据
        $.ajax({
            type: "post",
            url: "./api.php",
            data: {
                op: "review",
                bid: bid,
                uid: uid,
                review: review,
                star: star
            },
            success: function (e) {
                if (e == "success") {
                    // 保存成功
                    swal("成功", "保存面试信息成功!", "success");
                    // 延时1s跳转刷新界面
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else if (e == "error") {
                    // 修改失败
                    swal("错误", "保存面试信息成功!", "error");
                } else {
                    // 未知错误
                    swal("错误", "出现未知错误!", "error");
                }
            },
            error: function (e) {
                // 网络或服务器错误
                swal("错误", "网络堵塞或服务器故障!", "error");
            }

        });

    });



    // 重置按钮点击事件
    $("#Resetbtn").click(function () {
        for (let i = 0; i <= $(".staritem").length; i++) {
            $(".staritem").eq(i).removeClass("active");
        }
        $("input#Star").val("");
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