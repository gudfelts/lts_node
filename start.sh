#!/bin/sh
export NODE_ENV=production
cd /var/www/lts_node
git pull
pm2 restart app.js