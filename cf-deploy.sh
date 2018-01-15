#!/usr/bin/env bash
cf delete gorkhas-ngx-keycloak-security
cp nginx.conf dist/
cf push
