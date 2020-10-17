$(function () {

    // 变量声明区域

    // 用户名和验证码
    var Tbuser = $("input#Tbuser");
    var Tbverify = $("input#Tbverify");
    // 登录按钮
    var Loginbtn = $("#Loginbtn");
    // 用户名、验证码信息反馈
    var tbuserFeedback = $("#tbuserFeedback");
    var tbverifyFeedback = $("#tbverifyFeedback");
    // 表单区域
    var Form = $("#Form");

    //初始化验证码
    var verifyCode = new GVerify({
        id: "verify-img",    //容器的ID
        type: "blend"    //图形验证码的类型：blend-数字字母混合类型（默认）、number-纯数字、letter-纯字母
    });

    // 用户名输入事件
    Tbuser.keyup(function () {
        Tbuser.removeClass("is-valid");
        tbuserFeedback.removeClass("valid-feedback");
        Tbuser.removeClass("is-invalid");
        tbuserFeedback.removeClass("invalid-feedback");
        tbuserFeedback.text("");
    });

    // 验证码输入事件
    Tbverify.keyup(function() {
        Tbverify.removeClass("is-valid");
        tbverifyFeedback.removeClass("valid-feedback");
        Tbverify.removeClass("is-invalid");
        tbverifyFeedback.removeClass("invalid-feedback");
        tbverifyFeedback.text("");
    });

    // 登录按钮点击事件
    Loginbtn.click(function() {
        // 获取用户名
        var tbuser = Tbuser.val();
        if (tbuser.length == 0) {
            Tbuser.addClass("is-invalid");
            tbuserFeedback.addClass("invalid-feedback");
            tbuserFeedback.text("用户名不能为空!");
            return;
        }
        // 获取验证码
        var verify = Tbverify.val();
        if (verify.length == 0) {
            Tbverify.addClass("is-invalid");
            tbverifyFeedback.addClass("invalid-feedback");
            tbverifyFeedback.text("请输入验证码!");
            return;
        }
        // 验证验证码
        else if (verifyCode.validate(verify) == false) {
            Tbverify.addClass("is-invalid");
            tbverifyFeedback.addClass("invalid-feedback");
            tbverifyFeedback.text("验证码错误!");
            //刷新验证码
            verifyCode.refresh();
            return;
        }
        // 发送ajax 请求
        $.ajax({
            type: "post",
            url: "./api.php",
            data: {
                user: tbuser,
                op: "login"
            },
            success: function(e) {
                if (e == "error") {
                    // 出现问题
                    swal("错误", "服务器错误，请重试", "error");
                } else if (e == "nx_api") {
                    // 出现问题
                    swal("错误", "请求错误，请检查参数op", "error");
                } else if (e == "empty_user") {
                    // 出现问题
                    swal("错误", "请求错误，请检查参数user", "error");
                } else if (e == "db_error") {
                    // 出现问题
                    swal("错误", "数据库错误，请检查数据库连接", "error");
                } else {
                    let userObj = JSON.parse(e);
                    setCookie("user", userObj['name'], 30);
                    setCookie("uid", userObj['uid'], 30);
                    swal("成功", "登录成功，1s后自动跳转", "success");
                    setTimeout(() => {
                        // 延时刷新界面
                        window.location.reload();
                    }, 1000);
                }
            },
            error: function(e) {
                // 网络或服务器错误
                swal("错误", "网络堵塞或服务器故障!", "error");
                console.log(e);
            }
        });
    });
})

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
         }
        if (c.indexOf(name)  == 0) {
            return c.substring(name.length, c.length);
         }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}