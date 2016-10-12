<?php
$response = array(
    'success' => false,
    'message' => 'No action passed'
);
if (!empty($_POST['action'])) {
    require_once('includes/dbcon.php');

    $action = $_POST['action'];
    session_start();
    switch ($action) {
        case 'createUser':

            if (!empty($_POST['userName']) && !empty($_POST['userEmail'])) {
                $name = $_POST['userName'];
                $email = $_POST['userEmail'];

                try {
                    $query = 'SELECT `users`.`id`, max(`attempt`) AS "attempts" FROM users LEFT JOIN `plays` ON users.id = plays.user WHERE `email` = "' . $email . '";';
                    $conn = $db->prepare($query);
                    $conn->execute();
                    $curUser = $conn->fetch(PDO::FETCH_ASSOC);
                    if (!empty($curUser)) {
                        $attempts = (!empty($curUser['attempts']) ?: "0");
                        $id = $curUser['id'];

                        $response = array(
                            'success' => true,
                            'message' => 'User account exists',
                            'curAttempt' => $attempts,
                            'uid' => $id
                        );
                        break;
                    }
                    $query = 'INSERT INTO `users` (`name`, `email`) VALUES ("' . $name . '", "' . $email . '")';
                    $db->exec($query);
                    $id = $db->lastInsertId();// id from database
                    $response = array(
                        'success' => true,
                        'message' => 'User saved',
                        'curAttempt' => "0",
                        'uid' => $id
                    );
                } catch (Exception $e) {
                    $response = array(
                        'success' => false,
                        'message' => $e->getMessage()
                    );
                }
            }
            break;

        case 'saveAttempt':

            if (!empty($_POST['uid']) && !empty('time') && !empty($_POST['attempt'])) {

                $user = $_POST['uid'];
                $time = $_POST['time'];
                $attempt = $_POST['attempt'];

                try {

                    $time = gmdate("H:i:s", $time);

                    // save current level details
                    $query = 'INSERT INTO `plays` (`user`, `attempt`, `time`)
                        VALUES ("' . $user . '", "' . $attempt . '", "' . $time . '")';
                    $db->exec($query);
                    $response = array(
                        'success' => true,
                        'message' => 'Saved Successfully'
                    );
                } catch (Exception $e) {
                    $response = array(
                        'success' => false,
                        'message' => 'An unexpected error occurred' // $e->getMessage()
                    );
                }
            }

            break;

        case 'getLeaderboard':

            try {
                $query = 'SELECT `name`, `time` FROM users LEFT JOIN plays ON users.id = plays.user ORDER BY time LIMIT 5';
                $conn = $db->prepare($query);
                $conn->execute();
                $leaderboard = $conn->fetchAll(PDO::FETCH_ASSOC);

                $response = array(
                    'success' => true,
                    'message' => 'Leaderboard attached',
                    'data' => $leaderboard
                );

            } catch (Exception $e) {
                $response = array(
                    'success' => false,
                    'message' => 'An unexpected error occurred' // $e->getMessage()
                );
            }


            break;

    }

}

$ie_user = !!preg_match('/MSIE (6|7|8)/', $_SERVER['HTTP_USER_AGENT']);
if ($ie_user) {
    header('Content-Type: text/html');
} else {
    header('Content-Type: application/json');
}
echo json_encode($response);