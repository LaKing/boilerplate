/*jshint esnext: true */

const p = ß.get_path('modules/profile/public/profile.json');
const f = ß.lib.smartforms.get_smartform_schema(p);

for (var o in f) {

    ß.userModel[o] = f[o];

}