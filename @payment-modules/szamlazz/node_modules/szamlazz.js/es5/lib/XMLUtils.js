'use strict';

var xml2js = require('xml2js');

var padStr = '  ';

function pad(num, str) {
  str = str || padStr;
  var o = '';
  if (num > 0) {
    for (var i = 0; i < num; i++) {
      o = o + str;
    }
  }
  return o;
}
exports.pad = pad;

var xmlSubstChars = { '<': '&lt;', '>': '&gt;', '&': '&amp;' };
var xmlSubstRegexp = /[<>&]/g;
var replaceXMLChar = function replaceXMLChar(chr) {
  return xmlSubstChars[chr];
};
function escapeXMLString(str) {
  return str.replace(xmlSubstRegexp, replaceXMLChar);
}

function wrapWithElement(name, data, indentLevel) {
  indentLevel = indentLevel || Number(data) || 0;
  if (Array.isArray(name)) {
    return name.map(function (item) {
      return wrapWithElement(item[0], item[1], indentLevel + 1);
    }).join('');
  }

  var o = '';
  if (typeof data !== 'undefined' && String(data).trim() !== '' && data !== null) {
    o = pad(indentLevel) + '<' + name + '>';
    if (Array.isArray(data)) {
      o += '\n' + wrapWithElement(data, indentLevel) + pad(indentLevel, '  ');
    } else {
      if (data instanceof Date) {
        var y = data.getFullYear();
        var m = data.getMonth() + 1;
        var d = data.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        o += y + '-' + m + '-' + d;
      } else {
        o += escapeXMLString(String(data));
      }
    }
    o += '</' + name + '>\n';
  }

  return o;
}
exports.wrapWithElement = wrapWithElement;

function xml2obj(xml, objList, cb) {
  xml2js.parseString(xml, function (e, res) {
    if (e) {
      return cb(e);
    }

    var o = {};
    Object.keys(objList).forEach(function (keyPath) {
      var path = keyPath.split('.');
      var found = true;
      var p = res;
      for (var i = 0; i < path.length; i++) {
        if (p.hasOwnProperty(path[i])) {
          console.log('>>', path[i]);
          p = p[path[i]];
        } else {
          found = false;
          break;
        }
      }
      if (found) {
        o[objList[keyPath]] = p[0];
      }
    });

    cb(null, o);
  });
}
exports.xml2obj = xml2obj;