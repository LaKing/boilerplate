## Enable HTTPS
## based on https://www.medo64.com/2016/11/enabling-https-on-mikrotik/

/certificate
add name=root-cert common-name=MyRouter days-valid=3650 key-usage=key-cert-sign,crl-sign
sign root-cert
add name=https-cert common-name=MyRouter days-valid=3650
sign ca=root-cert https-cert

/ip service
set www-ssl certificate=https-cert disabled=no
#set www disabled=yes

## TODO - set to port 8443