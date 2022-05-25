function swap(object) {
   var ret = {};
   for (var key in json) {
      ret[object[key]] = key;
   }
   return ret;
}

const flatformToOS = {
   "Win32": "win",
   "MacIntel": "mac",
   "Linux x86_64": "lin",

};

const flatformToOSFull = {
   "Win32": "windows",
   "MacIntel": "macos",
   "Linux x86_64": "linux",

};

function objectLanguageToString(object) {
   let string = ''
   for (const element of object) {
      element.value != 1 ? string += element.name + ";q=" + element.value : string += element.name;
      string += ',';
   }
   
   return string.slice(0, -1);
}

export default
   {
      swap,
      flatformToOS,
      flatformToOSFull,
      objectLanguageToString
   };