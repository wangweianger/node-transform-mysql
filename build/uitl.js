"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};exports.getOptToString=getOptToString,exports.checkOptType=checkOptType,exports.checkOptObjType=checkOptObjType,exports.expressionQuery=expressionQuery,exports.sortSelectSql=sortSelectSql;function getOptToString(e){var t="",c=Object.prototype.toString.call(e);if("[object Object]"===c){var p=e._type&&e._type.toUpperCase()||"AND",r=e._type&&e._type.trim()?1:0,o=Object.keys(e);o.forEach(function(c,a){"_type"!==c&&(t="object"===_typeof(e[c])?a===o.length-1-r?t+""+checkOptObjType(c,e[c]):t+(checkOptObjType(c,e[c])+" ")+p+" ":a===o.length-1-r?t+(c+"=")+checkOptType(e[c]):t+(c+"=")+checkOptType(e[c])+" "+p+" ")})}else"[object Array]"===c&&e.forEach(function(c,p){var r="",o=0,a=c._type&&c._type.toUpperCase()||"AND",n=c._nexttype||"AND";o=c._type&&c._type.trim()?o+1:o,o=c._nexttype&&c._nexttype.trim()?o+1:o;Object.keys(c).forEach(function(e,t){"_type"!==e&&"_nexttype"!==e&&(r=r?"object"===_typeof(c[e])?r+(a+" ")+checkOptObjType(e,c[e]):r+(a+" ")+e+"="+checkOptType(c[e])+" ":"object"===_typeof(c[e])?""+checkOptObjType(e,c[e]):e+"="+checkOptType(c[e])+" ")}),r=p===e.length-1?"("+r+")":"("+r+") "+n.toUpperCase(),t=t+" "+r});return t}function checkOptType(e){var t=void 0;switch(Object.prototype.toString.call(e)){case"[object String]":t="`"+e+"`";break;case"[object Boolean]":case"[object Number]":t=e;break;default:t=e}return t}function checkOptObjType(e,t){var c="";if("[object Object]"===Object.prototype.toString.call(t)){var p=Object.keys(t),r=t._type&&t._type.trim()?1:0;p.forEach(function(o,a){if("_type"!==o){var n=t._type||"AND";c+=expressionQuery(e,o,t[o],n.toUpperCase(),a===p.length-1-r)}})}else c=e+"="+t;return"("+c+") "}function expressionQuery(e,t,c,p,r){var o="";switch(t.toUpperCase()){case"EQ":o="("+e+"="+checkOptType(c)+")";break;case"NEQ":o="("+e+"<>"+checkOptType(c)+")";break;case"GT":o="("+e+">"+checkOptType(c)+")";break;case"EGT":o="("+e+">="+checkOptType(c)+")";break;case"LT":o="("+e+"<"+checkOptType(c)+")";break;case"ELT":o="("+e+"<="+checkOptType(c)+")";break;case"LIKE":o="("+e+" LIKE "+checkOptType(c)+")";break;case"NOTLIKE":o="("+e+" NOT LIKE "+checkOptType(c)+")";break;case"BETWEEN":o="("+e+" BETWEEN "+c.replace(","," AND ")+")";break;case"NOTBETWEEN":o="("+e+" NOT BETWEEN "+c.replace(","," AND ")+")";break;case"IN":o="("+e+" IN ("+c+"))";break;case"NOTIN":o="("+e+" NOT IN ("+c+"))";break;default:o="("+e+"="+checkOptType(c)+")"}return r?o+" ":o+" "+p+" "}function sortSelectSql(e){var t=e||{};if(t.count||t.max||t.min||t.avg||t.sum){var c=(t.count?","+t.count:"")+(t.max?","+t.max:"")+(t.min?","+t.min:"")+(t.avg?","+t.avg:"")+(t.sum?","+t.sum:"");t.count=t.max=t.min=t.avg=t.sum="",t.field?t.field=t.field+c:t.field=c.substring(1)}t.field||(t.field="*"),t.table&&(t.table="FROM "+t.table),t.where&&(t.where="WHERE "+t.where);var p=[],r=["union","distinct","field","count","max","min","avg","sum","table","alias","where","group","having","order","limit","page","comment"];return Object.keys(t).forEach(function(e,t){r.forEach(function(t,c){e===t&&(p[c]=e)})}),{sortkeys:p,result:t}}