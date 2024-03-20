<?php
require __DIR__ . '/vendor/autoload.php'; // Include Ratchet library

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class MyWebSocket implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        // Handle messages if needed
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }

    // Method to send updates to all connected clients
    public function sendUpdate($data) {
        foreach ($this->clients as $client) {
            $client->send(json_encode($data));
        }
    }
}

// Start WebSocket server
$server = new \Ratchet\WebSocket\WsServer(new MyWebSocket);
$loop = \React\EventLoop\Factory::create();
$socket = new \React\Socket\Server('0.0.0.0:8080', $loop);
$server->loop = $loop;
$server->listen($socket);

echo "WebSocket server running at 0.0.0.0:8080\n";

$loop->run();
?>
