<?php
$response = array(
    'success' => false,
    'message' => 'No action passed',
    'data' => array()
);
if (!empty($_POST['action'])) {
    require_once('includes/dbcon.php');

    $action = $_POST['action'];
    switch ($action) {
        case 'createUser':

            $response['message'] = 'Missing parameters for this action';

            if (!empty($_POST['userName']) && !empty($_POST['userEmail'])) {
                $name = $_POST['userName'];
                $email = $_POST['userEmail'];

                $name = htmlspecialchars($name);

                try {
                    $query = 'SELECT `users`.`id`, max(`attempt`) AS "attempts" FROM users LEFT JOIN `plays` ON users.id = plays.user WHERE `email` = :email;';
                    $conn = $db->prepare($query);
                    $conn->execute([':email' => $email]);
                    $curUser = $conn->fetch(PDO::FETCH_ASSOC);
                    if (!empty($curUser) && !empty($curUser['id'])) {
                        $attempts = (!empty($curUser['attempts']) ?: "0");
                        $id = $curUser['id'];

                        $response = array(
                            'success' => true,
                            'message' => 'User account exists',
                            'data' => array(
                                'curAttempt' => (int)$attempts,
                                'uid' => $id
                            )
                        );
                        break;
                    }
                    $query = 'INSERT INTO `users` (`name`, `email`) VALUES (?, ?)';
                    $conn = $db->prepare($query);
                    $conn->execute([$name, $email]);
                    $id = $db->lastInsertId();// id from database
                    $response = array(
                        'success' => true,
                        'message' => 'User saved',
                        'data' => array(
                            'curAttempt' => "0",
                            'uid' => $id
                        )
                    );
                } catch (Exception $e) {
                    $response = array(
                        'success' => false,
                        'message' => 'An unexpected error occurred, please try again', //$e->getMessage()
                        'data' => array()
                    );
                }
            }
            break;

        case 'saveAttempt':

            $response['message'] = 'Missing parameters for this action';

            if (!empty($_POST['uid']) && !empty('time') && !empty($_POST['attempt'])) {

                $user = $_POST['uid'];
                $time = $_POST['time'];
                $attempt = $_POST['attempt'];

                if ((INT)$time > 3599 || strpos($time, ':') !== FALSE) {
                    $response = array(
                        'success' => false,
                        'message' => 'Stop Cheating!',
                        'data' => array($time)
                    );
                    break;
                }

                try {

                    $time = gmdate("H:i:s", $time);

                    // save current level details
                    $query = 'INSERT INTO `plays` (`user`, `attempt`, `time`)
                        VALUES (?, ?, ?)';
                    $conn = $db->prepare($query);
                    $conn->execute([$user, $attempt, $time]);
                    $response = array(
                        'success' => true,
                        'message' => 'Saved Successfully',
                        'data' => array()
                    );
                } catch (Exception $e) {
                    $response = array(
                        'success' => false,
                        'message' => 'An unexpected error occurred', // $e->getMessage()
                        'data' => array()
                    );
                }
            }

            break;

        case 'getLeaderboard':

            try {
                $query = 'SELECT `name`,`time` FROM users LEFT JOIN plays ON users.id = plays.user ORDER BY time DESC LIMIT 5';
                $conn = $db->prepare($query);
                $conn->execute();
                $leaderboard = $conn->fetchAll(PDO::FETCH_ASSOC);

                foreach($leaderboard as $k => $player) {
                    $leaderboard[$k]['time'] = strtotime('1970-01-01 ' . $player['time'] . 'GMT');
                }

                $response = array(
                    'success' => true,
                    'message' => 'Leaderboard attached',
                    'data' => array(
                        'leaderboard' => $leaderboard
                    )
                );

            } catch (Exception $e) {
                $response = array(
                    'success' => false,
                    'message' => 'An unexpected error occurred', // $e->getMessage()
                    'data' => array()
                );
            }


            break;
        default:
            $response['message'] = 'Invalid action passed';

    }

}

$ie_user = !!preg_match('/MSIE (6|7|8)/', $_SERVER['HTTP_USER_AGENT']);
if ($ie_user) {
    header('Content-Type: text/html');
} else {
    header('Content-Type: application/json');
}
echo json_encode($response);