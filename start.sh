#!/bin/sh
git pull
export NODE_ENV=production
forever restart app.js