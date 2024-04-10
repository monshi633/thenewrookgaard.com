Additional steps to run this website

Disclaimers:
- It's way easier to do everything on Linux but since the game server runs on Windows we'll stick to it.
- This are the tools that worked with me in this specific scenario. Other alternatives to each program might be better or worse depending on the rented hosting services

1. Rent a hosting service and a DNS
2. Web Server
   * Download NginX (https://nginx.org/en/download.html) mainline version and extract preferably in C:/nginx
   * Clone this repo in C:/nginx/html/thenewrookgaard.com/
   * Modify C:/nginx/conf/nginx.conf (see attachments)
3. PHP
   * Download PHP (https://windows.php.net/download/) Thread Safe latest version and extract preferably in C:/php
   * Make a copy of C:/php/php.ini-production and rename as php.ini (see attachments)
4. Service Manager
   * Download NSSM (https://nssm.cc/download) latest release and extract preferably in C:/nssm
   * Open command prompt as administrator in C:/nssm/win64/
   * Run 'nssm install', a GUI will appear and complete the Application tab:
     * Path: 'C:\php\php-cgi.exe'
     * Startup directory: 'C:\php'
     * Arguments: '-b 127.0.0.1:9000'
     * Service name: 'phpfcgi'
     * Click on 'Install service'
5. SSL certificates for https
   * Download and extract win-acme (https://www.win-acme.com) preferably in C:/win-acme
   * Open command prompt as administrator in C:/win-acme/
   * Run 'wacs.exe' and follow the instructions to create the certificate
   * Copy thenewrookgaard.com-crt.pem and thenewrookgaard.com-key.pem into C:/nginx/conf
6. Go online
   * Run C:/nginx/nginx.exe
   * Open command prompt as administrator in C:/nssm/win64/
   * Run 'nssm start phpfcgi'


to renew certificate open command prompt as administrator in C:/win-acme/ and run 'wacs.exe --renew --force --verbose'


Attachments:
nginx.conf
php.ini