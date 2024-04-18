<?php
    // Define array of indexed queries
    $queries = [
        "getNumberOnline" =>        "SELECT COUNT (*) AS players_online FROM players WHERE online = 1 AND id > 2",
        "getCharacterName" =>       "SELECT COUNT(*) AS count FROM players WHERE name = :inputValue",
        "getCharacterInfo" =>       "SELECT p.account_id, p.name, CASE WHEN p.rank_id = 0 THEN '-' ELSE g.name END AS guild, CASE WHEN p.rank_id = 0 THEN '' ELSE ' (' || r.name || ')' END AS rank, CASE WHEN p.sex = 1 THEN 'Male' WHEN p.sex = 0 THEN 'Female' END AS sex, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, CASE WHEN p.lastlogin = 0 THEN '-' ELSE strftime('%d-%m-%Y', datetime(p.lastlogin, 'unixepoch')) END AS lastlogin, strftime('%d', datetime(p.lastlogin, 'unixepoch')) || ' ' || substr('JanFebMarAprMayJunJulAugSepOctNovDec', (strftime('%m', datetime(p.lastlogin, 'unixepoch')) - 1) * 3 + 1, 3) || ' ' || strftime('%Y, %H:%M:%S', datetime(p.lastlogin, 'unixepoch')) || ' CET' AS lastlogin, CASE WHEN a.premdays > 0 THEN 'Premium Account' ELSE 'Free Account' END AS status FROM players AS p LEFT JOIN accounts AS a ON p.account_id = a.id LEFT JOIN guild_ranks AS r ON p.rank_id = r.id LEFT JOIN guilds AS g ON r.guild_id = g.id WHERE p.name = :inputValue",
        "getCharacterDeaths" =>     "SELECT strftime('%d', datetime(pd.date, 'unixepoch')) || ' ' || substr('JanFebMarAprMayJunJulAugSepOctNovDec', (strftime('%m', datetime(pd.date, 'unixepoch')) - 1) * 3 + 1, 3) || ' ' || strftime('%Y, %H:%M', datetime(pd.date, 'unixepoch')) || ' CET' AS date, CASE WHEN MAX(k.unjustified) = 1 THEN 'Killed at level ' ELSE 'Died at level ' END AS cause, pd.level, ' by ' || GROUP_CONCAT(CASE WHEN k.unjustified = 1 THEN '<b>' || (SELECT name FROM players WHERE id = pk.player_id) || '</b>' WHEN k.final_hit = 1 THEN (SELECT name FROM environment_killers WHERE kill_id = k.id) ELSE NULL END, ' and ') AS killers FROM players AS p JOIN player_deaths AS pd ON p.id = pd.player_id JOIN killers AS k ON pd.id = k.death_id LEFT JOIN player_killers AS pk ON pk.kill_id = k.id WHERE p.name = :inputValue GROUP BY pd.date, pd.level ORDER BY pd.date DESC LIMIT 10",
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
        "getGuilds" =>              "SELECT g.name, COUNT(p.name) AS members, strftime('%d', datetime(g.creationdata, 'unixepoch')) || ' ' || substr('JanFebMarAprMayJunJulAugSepOctNovDec', (strftime('%m', datetime(g.creationdata, 'unixepoch')) - 1) * 3 + 1, 3) || ' ' || strftime('%Y, %H:%M:%S', datetime(g.creationdata, 'unixepoch')) || ' CET' AS creation FROM guilds AS g JOIN players AS p_leader ON g.ownerid=p_leader.id JOIN guild_ranks as r ON g.id = r.guild_id JOIN players as p on r.id=p.rank_id GROUP BY g.name ORDER BY members DESC",
        "getGuildMembers" =>        "SELECT p.online AS online, p.name AS name, r.name AS rank FROM players AS p JOIN guild_ranks AS r ON p.rank_id = r.id WHERE r.guild_id = (SELECT id FROM guilds WHERE name = :inputValue) ORDER BY r.level DESC, p.name",
        "getAccountStatus" =>       "SELECT id, premdays, email FROM accounts WHERE name = :account AND password = :password",
        "setNewPassword" =>         "UPDATE accounts SET password = :newPassword WHERE id = :id",
        "setEmail" =>               "UPDATE accounts SET email = :email WHERE id = :id"
    ];

    // Check if the request is coming from an allowed origin (CORS)
    header('Access-Control-Allow-Origin: https://thenewrookgaard.com');
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers: Content-Type');

    // Handle GET requests
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $queryId = $_GET['queryId'];

        // Check if the query identifier exists in the array
        if (array_key_exists($queryId, $queries)) {
            // Retrieve the query based on the identifier
            $query = $queries[$queryId];

            try {
                // Optional parameters
                $inputValue = isset($_GET['inputValue']) ? $_GET['inputValue'] : null;
                $inputSecondValue = isset($_GET['inputSecondValue']) ? $_GET['inputSecondValue'] : null;
                $inputThirdValue = isset($_GET['inputThirdValue']) ? $_GET['inputThirdValue'] : null;
                $inputFourthValue = isset($_GET['inputFourthValue']) ? $_GET['inputFourthValue'] : null;

                // Declare variable to store result
                // Important!: I'm declaring it here instead of after the if statement so checkRewards can send a message if the reward was given
                $rows = [];

                // Connect to SQLite database
                $db = new SQLite3('C:/the-new-rook/server/schemas/otxserver.s3db');
                $statement = $db->prepare($query);
                
                // Use prepared statement to fill queries
                if ($queryId === "getAccountStatus") {
                    // Hash password
                    $result = hashPassword($db,$inputValue,$inputSecondValue);
                    $hashedPassword = $result['hashedPassword'];
                    // Replace placeholders in query
                    $statement->bindValue(':account', $inputValue, SQLITE3_TEXT);
                    $statement->bindValue(':password', $hashedPassword, SQLITE3_TEXT);
                } else if ($queryId === "setNewPassword") {
                    if (is_null($inputFourthValue)) {
                        // Hash old password
                        $result = hashPassword($db,$inputValue,$inputSecondValue);
                        $hashedOldPassword = $result['hashedPassword'];
                        // Check if account and old password match db
                        if (checkCredentials($db,$inputValue,$hashedOldPassword)) {
                            // Hash new password and get account id
                            $result = hashPassword($db,$inputValue,$inputThirdValue);
                            $id = $result['id'];
                            $hashedNewPassword = $result['hashedPassword'];
                            // Replace placeholders in query
                            $statement->bindValue(':id', $id, SQLITE3_TEXT);
                            $statement->bindValue(':newPassword', $hashedNewPassword, SQLITE3_TEXT);
                        } else {
                            http_response_code(400); // Bad Request
                            echo json_encode(['error' => 'Invalid credentials']);
                        }
                    } else {
                        // Hash recovery key
                        $hashedKey = sha1($inputSecondValue);
                        // Check if account and key match db
                        if (checkCredentials($db,$inputValue,$hashedKey,true)) {
                            // Hash new password and get account id
                            $result = hashPassword($db,$inputValue,$inputThirdValue);
                            $id = $result['id'];
                            $hashedNewPassword = $result['hashedPassword'];
                            // Replace placeholders in query
                            $statement->bindValue(':id', $id, SQLITE3_TEXT);
                            $statement->bindValue(':newPassword', $hashedNewPassword, SQLITE3_TEXT);
                        } else {
                            http_response_code(400); // Bad Request
                            echo json_encode(['error' => 'Invalid credentials for recovery']);
                        }
                    }
                } else if ($queryId === "setEmail") {
                    // Hash password and get account id
                    $result = hashPassword($db,$inputValue,$inputSecondValue);
                    $id = $result['id'];
                    $hashedPassword = $result['hashedPassword'];

                    if (checkCredentials($db,$inputValue,$hashedPassword)) {
                        if (emailIsUnique($db,$inputThirdValue)) {
                            // Give reward if elegible
                            $reward = checkRewards($db,$inputValue,$id);
                            $rows[] = $reward ? ['reward' => 'true'] : ['reward' => 'false'];
                            // Replace placeholders in query
                            $statement->bindValue(':id', $id, SQLITE3_TEXT);
                            $statement->bindValue(':email', $inputThirdValue, SQLITE3_TEXT);
                        } else {
                            $rows[] = ['error' => 'emailNotUnique'];
                            http_response_code(403); // Forbidden
                        }
                    } else {
                        $rows[] = ['error' => 'invalidCredentials'];
                        http_response_code(400); // Bad Request
                    }
                } else {
                    $statement->bindValue(':inputValue', $inputValue, SQLITE3_TEXT);
                }

                $result = $statement->execute();
    
                // Fetch results
                while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                    $rows[] = $row;
                }
    
                // Close the database connection
                $db->close();
    
                // Send the response as JSON
                header('Content-Type: application/json');
                echo json_encode($rows);
            } catch (Exception $e) {
                http_response_code(500); // Internal Server Error
                echo json_encode(['error' => $e->getMessage()]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(['error' => 'Invalid query identifier']);
        }
    } else {
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method Not Allowed']);
    }

    function hashPassword($db,$account,$password) {
        // Prepare query
        $statement = $db->prepare("SELECT id, salt FROM accounts WHERE name = :account");
        $statement->bindValue(':account', $account, SQLITE3_TEXT);
        
        // Execute the query
        $result = $statement->execute();

        // Fetch results
        $row = $result->fetchArray(SQLITE3_ASSOC);
        if (!$row) {
            return false; // Account doesn't exist
        }

        // Concatenate salt + password
        $fullPassword = $row['salt'] . $password;

        // Hash using SHA-1
        $hashedPassword = sha1($fullPassword);

        return array(
            'id' => $row['id'],
            'hashedPassword' => $hashedPassword
        );
    }

    function checkCredentials($db,$account,$credential,$isKey = false) {
        // Prepare query
        $query = $isKey ? "SELECT key FROM accounts WHERE name = :account" : "SELECT password FROM accounts WHERE name = :account";
        $statement = $db->prepare($query);
        $statement->bindValue(':account', $account, SQLITE3_TEXT);
        
        // Execute the query
        $result = $statement->execute();

        // Fetch results
        $row = $result->fetchArray(SQLITE3_ASSOC);
        
        // Retrieve credential from db
        $dbCredential = $isKey ? $row['key'] : $row['password'];
        
        if (!$row || !$dbCredential) {
            return false;
        }
        return $dbCredential === $credential;
    }

    function checkRewards($db,$account,$id) {
        // Prepare query
        $statement = $db->prepare("SELECT email, premdays FROM accounts WHERE name = :account");
        $statement->bindValue(':account', $account, SQLITE3_TEXT);

        // Execute the query
        $result = $statement->execute();

        // Fetch results
        $row = $result->fetchArray(SQLITE3_ASSOC);
        if (!$row) {
            return false; // Account doesn't exist
        }
        
        // Retrieve data from db
        $email = $row['email'];
        $premdays = $row['premdays'] + 3;

        if ($email === null) {
            // Give reward
            $statement = $db->prepare("UPDATE accounts SET premdays = :premdays WHERE id = :id");
            $statement->bindValue(':premdays', $premdays, SQLITE3_INTEGER);
            $statement->bindValue(':id', $id, SQLITE3_TEXT);
            $statement->execute();

            return true;
        } else {
            return false;
        }
    }

    function emailIsUnique($db,$email) {
        // Prepare query
        $statement = $db->prepare("SELECT COUNT(*) AS email FROM accounts WHERE email = :email");
        $statement->bindValue(':email', $email, SQLITE3_TEXT);

        // Execute the query
        $result = $statement->execute();

        // Fetch results
        $row = $result->fetchArray(SQLITE3_ASSOC);
        if (!$row) {
            return false;
        }

        // Retrieve data from db
        $email = $row['email'];

        return $email == 0 ? true : false;
    }
?>