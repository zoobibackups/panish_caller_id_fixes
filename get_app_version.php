<?php 
    $response = array();
    $versionCode  = 35 ;
    $versionName = 4.5;
    
    if(isset($_GET['versionCode']) && isset($_GET['versionName'])){
        $VC = (int)$_GET['versionCode'];
        $VN = (float)$_GET['versionName'];
        
        if(($VC >= $versionCode && $VN >= $versionName)){
            $response['versionCode'] = $_GET['versionCode'];
            $response['versionName'] = $_GET['versionName'];
            $response['status']  = false;
        }else{
         $response['versionCode'] = $_GET['versionCode'];
            $response['versionName'] = $_GET['versionName'];
            $response['status']  = true;
        }
    }else{
            $response['versionCode'] =$_GET['versionCode'];
            $response['versionName'] = $_GET['versionName'];
            $response['status']  = true;
    }

    echo json_encode($response);
?>