<?php  
    header('Content-Type: application/json');  
    include "database.php";  
    echo json_encode($graphs);
?>