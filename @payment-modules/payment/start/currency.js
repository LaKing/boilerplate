
ß.app.locals.currency = function(n, currency, lang) {
        if (currency === 'EUR') currency = '€';
        if (lang === 'HU' && currency === 'HUF') currency = 'Ft';
        return n.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? " " + c : c;
        }) + ' ' + currency;
    };