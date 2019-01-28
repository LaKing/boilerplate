
wd=/srv/codepad-project

cd "$wd"
if [[ ! -d mobile ]]
then
    tns create mobile --vue
fi

cd "$wd"/mobile
tns preview --bundle

#tns build android --bundle
#tns build ios --bundle
#tns run android --bundle
#tns run ios --bundle
