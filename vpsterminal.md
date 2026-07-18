# VPS Terminal Deployment Chat Log

This document contains the exact step-by-step terminal history from our deployment process on July 18, 2026.

## 1. Initial Connection & SSH Issues

```bash
PS C:\Users\PK'S> ssh root@162.35.184.176
ssh: connect to host 162.35.184.176 port 22: Connection timed out
```
*(Server was restarted from the InterServer panel)*

```bash
PS C:\Users\PK'S> ssh root@162.35.184.176
The authenticity of host '162.35.184.176 (162.35.184.176)' can't be established.
ED25519 key fingerprint is SHA256:400+ijOY7N8IZxLmBY30PcrmvjXMavKJjNWnwbIcOfY.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '162.35.184.176' (ED25519) to the list of known hosts.
Connection closed by 162.35.184.176 port 22
```

```bash
PS C:\Users\PK'S> ssh root@162.35.184.176
root@162.35.184.176's password:
PS C:\Users\PK'S> ssh root@162.35.184.176
ssh: connect to host 162.35.184.176 port 22: Connection refused
PS C:\Users\PK'S>
```

```bash
PS C:\Users\PK'S> ssh root@162.35.184.176
root@162.35.184.176's password:
Permission denied, please try again.
root@162.35.184.176's password:
Connection closed by 162.35.184.176 port 22
PS C:\Users\PK'S>
```
*(Server OS was fully reinstalled from the InterServer panel to get a clean slate and new password)*

## 2. Post-Reinstall SSH Fingerprint Fix

```bash
PS C:\Users\PK'S> ssh root@162.35.184.176
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
...
Host key verification failed.

PS C:\Users\PK'S> ssh-keygen -R 162.35.184.176
# Host 162.35.184.176 found: line 2
C:\Users\PK'S/.ssh/known_hosts updated.
Original contents retained as C:\Users\PK'S/.ssh/known_hosts.old
```

## 3. Successful Login

```bash
PS C:\Users\PK'S> ssh root@162.35.184.176
The authenticity of host '162.35.184.176 (162.35.184.176)' can't be established.
ED25519 key fingerprint is SHA256:B+2YEy5/k6ALEiYLu2P58MEXfze+SE4CI8jEGv0Q2N0.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes

Welcome to Ubuntu 24.04.4 LTS (GNU/Linux 6.8.0-111-generic x86_64)
Last login: Fri May 15 12:40:43 2026 from 66.45.228.251
root@vps3503895:~#
```

## 4. System Updates & Dependencies

```bash
root@vps3503895:~# sudo apt update && sudo apt upgrade -y
Fetched 10.2 MB in 3s (3,955 kB/s)
Reading package lists... Done
...
158 upgraded, 9 newly installed, 0 to remove and 1 not upgraded.
```

```bash
root@vps3503895:~# sudo apt install nginx certbot python3-certbot-nginx -y
Reading package lists... Done
The following NEW packages will be installed:
  certbot nginx nginx-common python3-acme python3-certbot python3-certbot-nginx...
0 upgraded, 11 newly installed, 0 to remove and 1 not upgraded.
```

```bash
root@vps3503895:~# curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
2026-07-18 17:23:28 - Installing pre-requisites
...
Setting up nodejs (20.20.2-1nodesource1) ...
```

```bash
root@vps3503895:~# sudo npm install -g pm2
added 77 packages in 6s
8 packages are looking for funding
  run `npm fund` for details
```

## 5. Cloning the Project

*(Connection timed out and was re-established)*
```bash
root@vps3503895:~# client_loop: send disconnect: Connection reset
root@vps3503895:~# ssh root@162.35.184.176
```

```bash
root@vps3503895:~# cd /var/www
root@vps3503895:/var/www# sudo git clone https://github.com/ganesh-bhusam/AdvScribblbeta advscribbl
Cloning into 'advscribbl'...
remote: Enumerating objects: 2408, done.
remote: Counting objects: 100% (2408/2408), done.
Receiving objects: 100% (2408/2408), 11.98 MiB | 31.62 MiB/s, done.
Resolving deltas: 100% (536/536), done.
root@vps3503895:/var/www# cd advscribbl
```

## 6. Starting the Backend

```bash
root@vps3503895:/var/www/advscribbl# cd backend
root@vps3503895:/var/www/advscribbl/backend# npm install
root@vps3503895:/var/www/advscribbl/backend# cat <<EOF > .env
PORT=8001
ALLOWED_ORIGINS=https://advscribbl.co.in,http://advscribbl.co.in
ADMIN_SECRET=your_super_secret_password_here
SUPPORT_EMAIL=support@advscribbl.co.in
EOF

root@vps3503895:/var/www/advscribbl/backend# pm2 start server.js --name advscribbl-backend
[PM2] Spawning PM2 daemon with pm2_home=/root/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting /var/www/advscribbl/backend/server.js in fork_mode (1 instance)
[PM2] Done.

root@vps3503895:/var/www/advscribbl/backend# pm2 save
[PM2] Saving current process list...
[PM2] Successfully saved in /root/.pm2/dump.pm2

root@vps3503895:/var/www/advscribbl/backend# pm2 startup
[PM2] Init System found: systemd
[PM2] Writing init configuration in /etc/systemd/system/pm2-root.service
[PM2] Making script booting at startup...
[PM2] [-] Executing: systemctl enable pm2-root...
[PM2] [v] Command successfully executed.
```

## 7. Nginx Configuration

```bash
root@vps3503895:/var/www/advscribbl/backend# sudo nano /etc/nginx/sites-available/advscribbl
```
*(User successfully navigated out of a confusing Nano prompt and verified the file)*
```bash
root@vps3503895:/var/www/advscribbl/backend# cat /etc/nginx/sites-available/advscribbl
server {
    listen 80;
    server_name advscribbl.co.in www.advscribbl.co.in;

    # Serve the frontend files directly
    root /var/www/advscribbl/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API and Socket.io traffic to the backend
    location /api/ {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
root@vps3503895:/var/www/advscribbl/backend# sudo ln -s /etc/nginx/sites-available/advscribbl /etc/nginx/sites-enabled/
root@vps3503895:/var/www/advscribbl/backend# sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
root@vps3503895:/var/www/advscribbl/backend# sudo systemctl restart nginx
```

## 8. SSL Certificate Generation

```bash
root@vps3503895:/var/www/advscribbl/backend# sudo certbot --nginx -d advscribbl.co.in -d www.advscribbl.co.in
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Enter email address (used for urgent renewal and security notices)
 (Enter 'c' to cancel): bhusamganesh@gmail.com

Please read the Terms of Service at...
(Y)es/(N)o: y
...
Account registered.
Requesting a certificate for advscribbl.co.in and www.advscribbl.co.in

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/advscribbl.co.in/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/advscribbl.co.in/privkey.pem

Deploying certificate
Successfully deployed certificate for advscribbl.co.in to /etc/nginx/sites-enabled/advscribbl
Successfully deployed certificate for www.advscribbl.co.in to /etc/nginx/sites-enabled/advscribbl
Congratulations! You have successfully enabled HTTPS on https://advscribbl.co.in and https://www.advscribbl.co.in
```
