<?php
    // Define array of indexed queries
    $queries = array(
        "getNumberOnline" =>        "SELECT COUNT (*) AS players_online FROM players WHERE online = 1 AND id > 2",
        "getCharacterName" =>       "SELECT COUNT(*) AS count FROM players WHERE name = :inputValue",
        "getCharacterInfo" =>       "SELECT p.account_id, p.name, CASE WHEN p.rank_id = 0 THEN '-' ELSE g.name END AS guild, CASE WHEN p.rank_id = 0 THEN '' ELSE ' (' || r.name || ')' END AS rank, CASE WHEN p.sex = 1 THEN 'Male' WHEN p.sex = 0 THEN 'Female' END AS sex, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, strftime('%d-%m-%Y', datetime(p.lastlogin, 'unixepoch')) AS lastlogin, CASE WHEN a.premdays > 0 THEN 'Premium Account' ELSE 'Free Account' END AS status FROM players AS p LEFT JOIN accounts AS a ON p.account_id = a.id LEFT JOIN guild_ranks AS r ON p.rank_id = r.id LEFT JOIN guilds AS g ON r.guild_id = g.id WHERE p.name = :inputValue",
        "getAccountCharacters" =>   "SELECT name, level, online FROM players WHERE account_id = :inputValue",
        "getWhosOnline" =>          "SELECT p.name, p.level, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, COALESCE(g.name, '-') AS guild FROM players AS p LEFT JOIN guild_ranks as r ON p.rank_id = r.id LEFT JOIN guilds AS g ON r.guild_id = g.id WHERE p.online = 1 AND p.id > 2 ORDER BY p.experience DESC",
        "getHighLevel" =>           "SELECT name, CASE WHEN promotion = 0 THEN 'Rookie' WHEN promotion = 1 THEN 'Rookstayer' END AS vocation, level, experience FROM players WHERE id > 2 AND group_id < 3 ORDER BY experience DESC LIMIT 50",
        "getHighMagic" =>           "SELECT name, CASE WHEN promotion = 0 THEN 'Rookie' WHEN promotion = 1 THEN 'Rookstayer' END AS vocation, maglevel, manaspent FROM players WHERE id > 2 AND group_id < 3 ORDER BY maglevel DESC, manaspent DESC LIMIT 50",
        "getHighFist" =>            "SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=0 ORDER BY ps.value DESC, p.level DESC LIMIT 50",
        "getHighClub" =>            "SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=1 ORDER BY ps.value DESC, p.level DESC LIMIT 50",
        "getHighSword" =>           "SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=2 ORDER BY ps.value DESC, p.level DESC LIMIT 50",
        "getHighAxe" =>             "SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=3 ORDER BY ps.value DESC, p.level DESC LIMIT 50",
        "getHighDistance" =>        "SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=4 ORDER BY ps.value DESC, p.level DESC LIMIT 50",
        "getHighShielding" =>       "SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=5 ORDER BY ps.value DESC, p.level DESC LIMIT 50",
        "getHighFishing" =>         "SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=6 ORDER BY ps.value DESC, p.level DESC LIMIT 50",
        "getHouses" =>              "SELECT h.name, h.size, CAST(h.price / 1000 AS TEXT) || '.000' AS price, COALESCE(p.name, '<i><b>Available</b></i>') AS status FROM houses AS h LEFT JOIN players AS p ON h.owner=p.id ORDER BY h.name",
        "getGuilds" =>              "SELECT g.name, COUNT(p.name) AS members ,strftime('%d-%m-%Y', datetime(g.creationdata, 'unixepoch')) AS creation FROM guilds AS g JOIN players AS p_leader ON g.ownerid=p_leader.id JOIN guild_ranks as r ON g.id = r.guild_id JOIN players as p on r.id=p.rank_id GROUP BY g.name ORDER BY g.name",
        "getGuildMembers" =>        "SELECT p.online AS online, p.name AS name, r.name AS rank FROM players AS p JOIN guild_ranks AS r ON p.rank_id = r.id WHERE r.guild_id = (SELECT id FROM guilds WHERE name = :inputValue) ORDER BY r.level DESC, p.name",
        "getAccountStatus" =>       "SELECT id, premdays FROM accounts WHERE name = :account AND password = :password",
        "setNewPassword" =>         "UPDATE accounts SET password = :newPassword WHERE name = :account AND password = :password"
    );

    // Check if the request is coming from an allowed origin (CORS)
    header('Access-Control-Allow-Origin: https://thenewrookgaard.com');
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers: Content-Type');

    // Check if the request method is GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $queryId = $_GET['queryId'];

        // Optional parameters
        $inputValue = isset($_GET['inputValue']) ? $_GET['inputValue'] : null;
        $inputSecondValue = isset($_GET['inputSecondValue']) ? $_GET['inputSecondValue'] : null;
        $inputThirdValue = isset($_GET['inputThirdValue']) ? $_GET['inputThirdValue'] : null;

        // Check if the query identifier exists in the array
        if (array_key_exists($queryId, $queries)) {
            // Retrieve the query based on the identifier
            $query = $queries[$queryId];
            
            // Connect to SQLite database
            $db = new SQLite3('C:/the-new-rook/server/schemas/otxserver.s3db');
            
            // Use prepared statement to fill queries
            $statement = $db->prepare($query);
            if ($queryId === "getAccountStatus") {
                $hashedPassword = hashPassword($inputValue,$inputSecondValue);

                $statement->bindValue(':account', $inputValue, SQLITE3_TEXT);
                $statement->bindValue(':password', $hashedPassword, SQLITE3_TEXT);
            } else if ($queryId === "setNewPassword") {
                $hashedPassword = hashPassword($inputValue,$inputThirdValue);

                $statement->bindValue(':account', $inputValue, SQLITE3_TEXT);
                $statement->bindValue(':password', $inputSecondValue, SQLITE3_TEXT);
                $statement->bindValue(':newPassword', $hashedPassword, SQLITE3_TEXT);
            } else {
                $statement->bindValue(':inputValue', $inputValue, SQLITE3_TEXT);
            }
            $result = $statement->execute();

            // Fetch results and send back as JSON
            $rows = array();
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                $rows[] = $row;
            }

            // Close the database connection
            $db->close();

            // Send the response as JSON
            header('Content-Type: application/json');
            echo json_encode($rows);
        } else {
            // If the query identifier does not exist, return an error response
            http_response_code(400); // Bad Request
            echo json_encode(['error' => 'Invalid query identifier']);
        }
    } else {
        // If the request method is not GET, return an error response
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method Not Allowed']);
    }

    function hashPassword($account,$password) {
        // Prepare query
        $query = "SELECT salt FROM accounts WHERE name = '$account'";

        // Execute the query
        $result = $db->query($query);

        // Retrieve salt from db
        $row = $result->fetchArray(SQLITE3_ASSOC);
        if ($row) {
            $salt = $row["salt"];
        } else {
            $salt = "";
        }

        // concatenate salt + password
        $fullPassword = $salt . $password;

        // Hash using SHA-1
        $hashedPassword = sha1($fullPassword);

        return $hashedPassword;
    }
?>