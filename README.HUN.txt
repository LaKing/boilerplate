## ßoilerplate használati utasítás.

A codepad-project mappában van egy boilerplate mappa. A szervert a project mappájából indítjuk, és a boileren keresztül futtatjuk.
A boiler azt csinálja, hogy ha van egy azonos elérési útvanolan lévő file a projectben akkor azt használja, ha nincs akkor a boilerét.
Ez egyfajta overlay-fs szerűség, és így lehet módosítani a működését ..

## Kiegészítésre, bővítésre az alap mechanizmust kellene használni. A boiler először betölti a saját funkcióit a global mappából.

- ł és Ł loggolási funkciók - ezeket lehet/kell használni a fejlesztés során.
- ß globális függvények, pl. ß.get_path
- ß globális csomagok pl. ß.fs
- a modulrendszer, load-ere, hook-kezelő

## Minden funkciónak modulba kell kerülnie. A moduloknak van egy saját könyvtárszerkezete.
- a lib mappa .. innen kerülnek ki a ß.lib-module.függvény -ek
- a hook mappa .. itt definiálódnak a hookok függvényei
- a load-erek pl, init, server, start - itt ezekben mindne lefut egyszer az indulásnál

A lib.függvények precízen meghívhatóak, egy fut le egyszer meghívásnál.
A hook-ok többször is lefuthatnak, és minden modul azonos prefixű hookja lefut.
.. theát pl a socket.do_something.js nevű hook, mindig a socket inicializálásánal indul, és amúgy van paramétere is, pl e hook esetén maga a socket. 
A ß.run_hook indítja ezeket a hookokat, teheát erre rákeresve lehet megnézni milyen hookok vannak már.

A szerver inicializálás után rendelkezésre áll globálisan a ß.app és a ß.io.

A fordító mechanizmus a ##&hu szöveg ## tegeket szűri, a lokális verziók a project local mappájába kerülnek.

Az app. és admin. prefixű frontendhez tartozó js és css fileok az indexbe és az admin ejs-be autómatikusan bekerülnek ...
A static mappában azok a fileok valóak amikenek a tartalma nem szorul fordításra.
A public mappa fájljai fordításra kerülnek a ##&hu nyelvválasztó ## szintaxissal.

## TELEPÍTÉS

A /srv/codepad-project/boilerplate mappának már a konténerben kell lennie (readonly mappa)
