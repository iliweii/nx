<html lang="zh-CN">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- link bootstrap4 css -->
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <!-- link style css -->
    <link rel="stylesheet" href="./css/style.css">

    <!-- script bootstrap4 js -->
    <script src="./js/jquery-3.5.1.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/popper.min.js"></script>
    <!-- script sweetalert js -->
    <script src="./js/sweetalert.min.js"></script>
    <!-- script GVerify js -->
    <script src="./js/gVerify.js"></script>

    <?php

    if (empty($_COOKIE['user']) && empty($_POST['user'])) {
        // 登录界面
    ?>
        <!-- script login js -->
        <script src="./js/login.js"></script>
        <title>登录 | 青春在线程序部纳新</title>
</head>

<body>
    <!-- body start -->
    <section class="body">
        <div class="inner">
            <!-- 主体部分：输入组 -->
            <div class="form border border-success rounded shadow px-5 py-5" id="Form">

                <!-- 用户名 -->
                <div class="col-md-12 mb-3">
                    <label for="Tbuser">姓名</label> <input type="text" class="form-control" id="Tbuser" required>
                    <div id="tbuserFeedback" class="valid-feedback"></div>
                </div>

                <!-- 验证码 -->
                <div class="mb-3" style="display: flex;">
                    <div class="col-md-5">
                        <label for="Tbverify">验证码</label> <input type="text" class="form-control" id="Tbverify" required>
                        <div id="tbverifyFeedback" class="invalid-feedback"></div>
                    </div>
                    <div class="col-md-2"></div>
                    <div id="verify-img" class="col-md-4"></div>
                </div>

                <!-- 提交按钮 -->
                <div class="col-md-12 mb-3">
                    <input id="Loginbtn" class="btn btn-primary mt-1" type="submit" value="登录">
                </div>

            </div>
        </div>
    </section>

    <?php
        return;
    }
    if (!empty($_POST['user'])) {
        setcookie("user", $_POST['name'], time() + 60 * 60 * 24 * 30);
    }
    if (!empty($_COOKIE['user'])) {
        $user = $_COOKIE['user'];
        if (empty($_GET['bid'])) {
            // 主界面
    ?>
        <!-- script main js -->
        <script src="./js/main.js"></script>
        <title>主界面 | 青春在线程序部纳新</title>

        </head>

        <body>

            <!-- body start -->
            <section class="body">
                <div class="inner">

                    <!-- 主体部分 -->
                    <div class="formbody border border-success rounded shadow px-5 py-5">

                        <p class="text-left form-tip">纳新面试 笔试信息</p>

                        <!-- 查询栏 -->
                        <div class="form-inline" style="position: relative;">
                            <input class="Searchtext form-control mr-sm-2" type="search" placeholder="姓名" aria-label="姓名">
                            <button class="Searchbtn btn btn-outline-success my-2 my-sm-0" type="submit">🔍查询</button>
                            <?php
                            if (!empty($_GET["q"]) || !empty($_GET["page"])) {
                            ?>
                                <button class="btn btn-primary my-2 my-sm-0 ml-2" onclick="window.location.href='./'">🏡返回主页</button>
                            <?php } ?>
                            <button class="btn btn-outline-dark my-2 my-sm-0 ml-3" onclick="setCookie('user', '', -1);window.location.reload()" style="position: absolute; right: 0;">退出登录：<?php echo $user; ?></button>
                        </div>

                        <!-- 数据栏 -->
                        <table class="table table-bordered table-hover mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">序号</th>
                                    <th scope="col">姓名</th>
                                    <th scope="col">学院</th>
                                    <th scope="col">性别</th>
                                    <th scope="col" class="shenglue">1. 简述一下什么是HTML，什么是CSS，他们各自的作用是什么？</th>
                                    <th scope="col" class="shenglue">2. 列举几个你常用/常见的HTML标签，并说出他们作用。</th>
                                    <th scope="col" class="shenglue">1. 简述一下你的性格、爱好、特长。</th>
                                    <th scope="col" class="shenglue">2. 你对青春在线有什么认识，为什么想加入？</th>
                                    <th scope="col" class="shenglue">3. 你是否有看教程（视频/文档/图书）自学某项知识或技能的经历？若有简单说一下学习过程和经验</th>
                                    <th scope="col" class="shenglue">4. 你是否了解过程序相关的知识？若是，简单说明你所了解的方面和知识的掌握情况；若不太了解，说明一下你想学习的内容。（例如搭建个人博客、开发微信小程序等）</th>
                                    <th scope="col" class="shenglue">5. 你为何喜欢程序？</th>
                                    <th scope="col">平均星级</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody class="tbody">
                                <!-- table tbody start -->

                            </tbody>
                        </table>

                    </div>

                </div>
            </section>

        <?php
        } else {
            // 详情界面
            $bid = $_GET['bid'];
        ?>

            <!-- script detail js -->
            <script src="./js/detail.js"></script>
            <title>开始面试 | 青春在线程序部纳新</title>

            </head>

            <body>
                <!-- body start -->
                <section class="body">
                    <div class="inner">

                        <!-- 主体部分：输入组 -->
                        <div class="formbody border border-success rounded shadow px-5 py-5">

                            <p class="text-left form-tip">开始面试</p>

                            <!-- 这些基本信息放在一行种 -->
                            <div class="minigroup">
                                <!-- 序号 -->
                                <div class="col-md-1 mb-3">
                                    <label>序号</label>
                                    <input name="bid" type="text" class="form-control" readonly>
                                </div>
                                <!-- 提交时间 -->
                                <div class="col-md-2 mb-3">
                                    <label>提交时间</label>
                                    <input name="time" type="text" class="form-control" readonly>
                                </div>
                                <!-- 姓名 -->
                                <div class="col-md-2 mb-3">
                                    <label>姓名</label>
                                    <input name="name" type="text" class="form-control" readonly>
                                </div>
                                <!-- 手机 -->
                                <div class="col-md-2 mb-3">
                                    <label>手机</label>
                                    <input name="phone" type="text" class="form-control" readonly>
                                </div>
                                <!-- QQ -->
                                <div class="col-md-2 mb-3">
                                    <label>QQ</label>
                                    <input name="qq" type="text" class="form-control" readonly>
                                </div>
                                <!-- 学院 -->
                                <div class="col-md-2 mb-3">
                                    <label>学院</label>
                                    <input name="college" type="text" class="form-control" readonly>
                                </div>
                                <!-- 性别 -->
                                <div class="col-md-1 mb-3">
                                    <label>性别</label>
                                    <input name="gender" type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <!-- 问题1 -->
                            <div class="col-md-12 mb-3">
                                <label>1. 简述一下什么是HTML，什么是CSS，他们各自的作用是什么？</label>
                                <textarea name="question1" type="text" class="form-control" readonly></textarea>
                            </div>
                            <!-- 问题2 -->
                            <div class="col-md-12 mb-3">
                                <label>2. 列举几个你常用/常见的HTML标签，并说出他们作用。</label>
                                <textarea name="question2" type="text" class="form-control" readonly></textarea>
                            </div>
                            <!-- 问题3 -->
                            <div class="col-md-12 mb-3">
                                <label>1. 简述一下你的性格、爱好、特长。</label>
                                <textarea name="question3" type="text" class="form-control" readonly></textarea>
                            </div>
                            <!-- 问题4 -->
                            <div class="col-md-12 mb-3">
                                <label>2. 你对青春在线有什么认识，为什么想加入？</label>
                                <textarea name="question4" type="text" class="form-control" readonly></textarea>
                            </div>
                            <!-- 问题5 -->
                            <div class="col-md-12 mb-3">
                                <label>3. 你是否有看教程（视频/文档/图书）自学某项知识或技能的经历？若有简单说一下学习过程和经验</label>
                                <textarea name="question5" type="text" class="form-control" readonly></textarea>
                            </div>
                            <!-- 问题6 -->
                            <div class="col-md-12 mb-3">
                                <label>4. 你是否了解过程序相关的知识？若是，简单说明你所了解的方面和知识的掌握情况；若不太了解，说明一下你想学习的内容。（例如搭建个人博客、开发微信小程序等）</label>
                                <textarea name="question6" type="text" class="form-control" readonly></textarea>
                            </div>
                            <!-- 问题7 -->
                            <div class="col-md-12 mb-3">
                                <label>5.你为何喜欢程序？</label>
                                <textarea name="question7" type="text" class="form-control" readonly></textarea>
                            </div>

                            <!-- 面试者编号 -->
                            <input type="text" id="Bid" value="<?php echo $bid; ?>" style="display: none;">

                            <!-- 面试记录 -->
                            <div class="col-md-12 mb-3">
                                <label for="Review"><b>面试记录</b> <span class="text-danger">*</span> 在这里记录你从面试者身上了解到的东西，可以是他的性格，特点，兴趣爱好，特长，水平，经历等等</label>
                                <textarea type="text" class="form-control" id="Review" required style="min-height: 150px;"></textarea>
                                <div id="ReviewFeedback" class="valid-feedback"></div>
                            </div>

                            <!-- 星级评价 -->
                            <div class="col-md-12 mb-3">
                                <label for="Star"><b>星级评价</b> <span class="text-danger">*</span> 1-5星评价</label>
                                <input type="text" class="form-control" id="Star" required style="display: none;">
                                <ul class="stararea">
                                    <li class="staritem"></li>
                                    <li class="staritem"></li>
                                    <li class="staritem"></li>
                                    <li class="staritem"></li>
                                    <li class="staritem"></li>
                                </ul>
                                <div id="StarFeedback" class="invalid-feedback"></div>
                            </div>

                            <!-- 提交按钮 和 重置按钮 -->
                            <input id="Submitbtn" class="btn btn-primary ml-3" type="submit" value="保存">
                            <button class="btn btn-outline-primary my-2 my-sm-0 ml-5" onclick="window.location.href='./'">🏡返回主页</button>

                        </div>

                    </div>
                </section>

            <?php
        }
    } else {
        // 错误界面
            ?>
            <title>错误界面 | 青春在线程序部纳新</title>
            </head>

            <body>
                <h1>404 ERROR</h1>
            <?php
        }
            ?>
            </body>

</html>