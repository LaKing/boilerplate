/*jshint esnext: true */

const userSchema = ß.userSchema;

// generating a hash
userSchema.methods.generateHash = function(password) {
    return ß.bcrypt.hashSync(password, ß.bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return ß.bcrypt.compareSync(password, this.local.password);
};
