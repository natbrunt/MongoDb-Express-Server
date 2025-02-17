## technologies
- Nginx (web server)
- Pm2 (post manager 2) (this keeps the NodeJS --i.e. express-- application running)
- HTTPS
    - certbot
    

## updating on digital ocean
 1) `cd /var/www/html`
 - location of backend server 
 2) `$ pm2 logs`
 - this will show the console of the running server,
 3) `$ pm2 restart 0`
 - necessary after a `git fetch origin && git merge`
 4) `$ nano /etc/nginx/sites-enabled/nathanjbee.app.conf`
 - update the base URL for each route.js, this will
 - allow requests to be made using HTTPS
 5) `$ systemctl status nginx`
 - debugging for nginx?
 6) `$ systemctl restart nginx`
 - necessary after adding or changing a route in the .conf





