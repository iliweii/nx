<?php
// 连接数据库文件
$host = '127.0.0.1';
$dbuser = 'root';
$pwd = '';
$dbname = 'nx_redcountry_top';

// 创建数据库连接
$db = new mysqli($host, $dbuser, $pwd, $dbname);
if ($db->connect_errno <> 0) {
    echo "db_error";
    // echo $db->connect_error;
    $db->close();
    return;
}

//设定数据可数据传输的编码
$db->query("SET NAMES UTF8");
//矫正时间
date_default_timezone_set("prc");

// 错误情况下
if (empty($_POST['op'])) {
    echo "nx_api";
}
// 登录接口
else if (strcmp($_POST["op"], "login") == 0) {
    // 用户名为空
    if (empty($_POST['user'])) {
        echo "empty_user";
        $db->close();
        return;
    }
    $user = $_POST['user'];
    // 去除空格
    $u = str_replace(" ", '', $user);
    $query = "SELECT * FROM `nx_users` WHERE `name` LIKE '$u'";
    $result = mysqli_query($db, $query);
    $obj = mysqli_fetch_object($result);
    if (!empty($obj)) {
        // 如果用户存在就直接返回
        echo json_encode($obj);
    } else {
        // 否则插入数据
        $insert = "INSERT INTO `nx_users` (`uid`, `name`) VALUES (NULL, '$u')";
        if ($db->query($insert) == TRUE) {
            $query = "SELECT * FROM `nx_users` WHERE `name` LIKE '$u'";
            $result = mysqli_query($db, $query);
            $obj = mysqli_fetch_object($result);
            if (!empty($obj)) {
                echo json_encode($obj);
            } else {
                echo "error";
            }
        } else {
            echo "error";
        }
    }
}
// 所有数据
else if (strcmp($_POST['op'], "query") == 0) {
    $q = "";
    if (!empty($_POST['q'])) {
        $q = $_POST['q'];
    }
    $query = "SELECT nx_bso.*, nx_bst.star FROM `nx_bs` as nx_bso LEFT JOIN (SELECT nx_reviews.bid, AVG(nx_reviews.star) as star FROM nx_reviews GROUP BY nx_reviews.bid) AS nx_bst on nx_bso.bid = nx_bst.bid WHERE nx_bso.name LIKE '%$q%' ORDER BY nx_bso.bid DESC";
    $result = mysqli_query($db, $query);
    $obj = mysqli_fetch_all($result);
    if (!empty($obj)) {
        // 如果存在数据直接返回
        echo json_encode($obj);
    } else {
        echo "empty";
    }
}
// 根据bid查询数据
else if (strcmp($_POST['op'], "queryone") == 0) {
    if (empty($_POST['bid'])) {
        echo "empty_bid";
    }
    $bid = $_POST['bid'];
    $query = "SELECT * FROM `nx_bs` WHERE `bid` = $bid";
    $result = mysqli_query($db, $query);
    $obj = mysqli_fetch_object($result);
    if (!empty($obj)) {
        // 如果存在数据直接返回
        echo json_encode($obj);
    } else {
        echo "empty";
    }
}
// 根据bid插入面试记录
else if (strcmp($_POST['op'], "review") == 0) {
    $bid = $_POST['bid'];
    $uid = $_POST['uid'];
    $review = $_POST['review'];
    $star = $_POST['star'];
    // 先查询是否已经写入面试记录
    $query = "SELECT * FROM `nx_reviews` WHERE `bid` = $bid AND `uid` = $uid";
    $result = mysqli_query($db, $query);
    $obj = mysqli_fetch_object($result);
    if (!$obj) {
        // 若第一次记录，则插入数据
        $insert = "INSERT INTO `nx_reviews` (`bid`, `uid`, `review`, `star`) VALUES ($bid, $uid, '$review', $star)";
        if ($db->query($insert) == TRUE) {
            echo "success";
        } else {
            echo "error";
        }
    } else {
        // 不是第一次，则更新数据
        $update = "UPDATE `nx_reviews` SET `review` = '$review', `star` = $star WHERE `nx_reviews`.`bid` = $bid AND `nx_reviews`.`uid` = $uid";
        $updateresult = mysqli_query($db, $update);
        if ($updateresult) {
            echo "success";
        } else {
            echo "error";
        }
    }
}
// 查询所有面试记录
else if (strcmp($_POST['op'], "reviews") == 0) {
}
// 根据id查询面试记录
else if (strcmp($_POST['op'], "reviewbyid") == 0) {
    $bid = $_POST['bid'];
    $uid = $_POST['uid'];
    // 查询面试记录
    $query = "SELECT * FROM `nx_reviews` WHERE `bid` = $bid AND `uid` = $uid";
    $result = mysqli_query($db, $query);
    $obj = mysqli_fetch_object($result);
    if (!empty($obj)) {
        // 如果存在数据直接返回
        echo json_encode($obj);
    } else {
        echo "empty";
    }
}

$db->close();
return;
