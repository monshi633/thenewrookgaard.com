Additional steps to run this website

Disclaimers:
- It's way easier to do everything on Linux but since the game server runs on Windows we'll stick to it.
- This are the tools that worked with me in this specific scenario. Other alternatives to each program might be better or worse depending on the rented hosting services

1. Rent a hosting service and a DNS
2. Web Server
2.a. Download NginX (https://nginx.org/en/download.html) mainline version and extract preferably in C:/nginx
2.b. Clone this repo in C:/nginx/html/thenewrookgaard.com/
2.c. Modify C:/nginx/conf/nginx.conf (see attachments)
3. PHP
3.a. Download PHP (https://windows.php.net/download/) Thread Safe latest version and extract preferably in C:/php
3.b. Make a copy of C:/php/php.ini-production and rename as php.ini (see attachments)
4. Service Manager
4.a. Download NSSM (https://nssm.cc/download) latest release and extract preferably in C:/nssm
4.b. Open command prompt as administrator in C:/nssm/win64/
4.c. Run 'nssm install', a GUI will appear and complete the Application tab:
4.d.I. Path: 'C:\php\php-cgi.exe'
4.d.II. Startup directory: 'C:\php'
4.d.III. Arguments: '-b 127.0.0.1:9000'
4.d.IV. Service name: 'phpfcgi'
4.d.V. Click on 'Install service'
5. SSL certificates for https
5.a. Download and extract win-acme (https://www.win-acme.com) preferably in C:/win-acme
5.b. Open command prompt as administrator in C:/win-acme/
5.c. Run 'wacs.exe' and follow the instructions to create the certificate
5.d. Copy thenewrookgaard.com-crt.pem and thenewrookgaard.com-key.pem into C:/nginx/conf
6. Go online
6.a. Run C:/nginx/nginx.exe
6.b. Open command prompt as administrator in C:/nssm/win64/
6.c. Run 'nssm start phpfcgi'

to renew certificate do 5.b. and run 'wacs.exe --renew --force --verbose'


Attachments:
nginx.conf
php.ini