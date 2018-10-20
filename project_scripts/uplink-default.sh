#!/bin/bash

mkdir -p /srv/codepad-project/@-modules
ln -s /var/boilerplate /srv/codepad-project/var

# -- @admin-modules --
ln -s /srv/codepad-project/boilerplate/@admin-modules/admin /srv/codepad-project/@-modules/admin
ln -s /srv/codepad-project/boilerplate/@admin-modules/mongo_express /srv/codepad-project/@-modules/mongo_express
# -- @core-modules --
ln -s /srv/codepad-project/boilerplate/@core-modules/angularjs /srv/codepad-project/@-modules/angularjs
ln -s /srv/codepad-project/boilerplate/@core-modules/frontend /srv/codepad-project/@-modules/frontend
ln -s /srv/codepad-project/boilerplate/@core-modules/frontendlib /srv/codepad-project/@-modules/frontendlib
ln -s /srv/codepad-project/boilerplate/@core-modules/language /srv/codepad-project/@-modules/language
ln -s /srv/codepad-project/boilerplate/@core-modules/logging /srv/codepad-project/@-modules/logging
ln -s /srv/codepad-project/boilerplate/@core-modules/mobile_detect /srv/codepad-project/@-modules/mobile_detect
ln -s /srv/codepad-project/boilerplate/@core-modules/mongoose /srv/codepad-project/@-modules/mongoose
ln -s /srv/codepad-project/boilerplate/@core-modules/nodemailer /srv/codepad-project/@-modules/nodemailer
ln -s /srv/codepad-project/boilerplate/@core-modules/readme /srv/codepad-project/@-modules/readme
ln -s /srv/codepad-project/boilerplate/@core-modules/server /srv/codepad-project/@-modules/server
ln -s /srv/codepad-project/boilerplate/@core-modules/session /srv/codepad-project/@-modules/session
ln -s /srv/codepad-project/boilerplate/@core-modules/settings /srv/codepad-project/@-modules/settings
ln -s /srv/codepad-project/boilerplate/@core-modules/verify /srv/codepad-project/@-modules/verify
# -- @frontend-modules --
ln -s /srv/codepad-project/boilerplate/@frontend-modules/animate /srv/codepad-project/@-modules/animate
ln -s /srv/codepad-project/boilerplate/@frontend-modules/bootstrap3 /srv/codepad-project/@-modules/bootstrap3
ln -s /srv/codepad-project/boilerplate/@frontend-modules/favicon /srv/codepad-project/@-modules/favicon
ln -s /srv/codepad-project/boilerplate/@frontend-modules/fontawesome4 /srv/codepad-project/@-modules/fontawesome4
ln -s /srv/codepad-project/boilerplate/@frontend-modules/jquery /srv/codepad-project/@-modules/jquery
ln -s /srv/codepad-project/boilerplate/@frontend-modules/offline /srv/codepad-project/@-modules/offline
ln -s /srv/codepad-project/boilerplate/@frontend-modules/smartforms /srv/codepad-project/@-modules/smartforms
# -- @googleapis-modules --
ln -s /srv/codepad-project/boilerplate/@googleapis-modules/googleapis /srv/codepad-project/@-modules/googleapis
# -- @javascript-modules --
ln -s /srv/codepad-project/boilerplate/@javascript-modules/moment /srv/codepad-project/@-modules/moment
# -- @marketing-modules --
ln -s /srv/codepad-project/boilerplate/@marketing-modules/promo /srv/codepad-project/@-modules/promo
# -- @passport-modules --
ln -s /srv/codepad-project/boilerplate/@passport-modules/passport /srv/codepad-project/@-modules/passport
ln -s /srv/codepad-project/boilerplate/@passport-modules/passport_facebook /srv/codepad-project/@-modules/passport_facebook
ln -s /srv/codepad-project/boilerplate/@passport-modules/passport_google /srv/codepad-project/@-modules/passport_google
ln -s /srv/codepad-project/boilerplate/@passport-modules/passport_hash /srv/codepad-project/@-modules/passport_hash
ln -s /srv/codepad-project/boilerplate/@passport-modules/profile /srv/codepad-project/@-modules/profile
# -- @payment-modules --
ln -s /srv/codepad-project/boilerplate/@payment-modules/payment /srv/codepad-project/@-modules/payment
ln -s /srv/codepad-project/boilerplate/@payment-modules/payment_barion /srv/codepad-project/@-modules/payment_barion
ln -s /srv/codepad-project/boilerplate/@payment-modules/payment_braintree /srv/codepad-project/@-modules/payment_braintree
ln -s /srv/codepad-project/boilerplate/@payment-modules/payment_simplepay /srv/codepad-project/@-modules/payment_simplepay
ln -s /srv/codepad-project/boilerplate/@payment-modules/szamlazz /srv/codepad-project/@-modules/szamlazz
