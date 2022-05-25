const CryptoJS = require("crypto-js");

const decryptAES = (string) => {
   const Sha256 = CryptoJS.SHA256;
   const Hex = CryptoJS.enc.Hex;
   const Utf8 = CryptoJS.enc.Utf8;
   const Base64 = CryptoJS.enc.Base64;
   const AES = CryptoJS.AES;

   const secret_key = 'vOVH6sdmpNWjRRIqCc4h1xsGNWjRRIq32gdss';
   const key = Sha256(secret_key).toString(Hex).substr(0, 32);

   // Encryption
   /*     var iv = CryptoJS.lib.WordArray.random(16).toString().slice(0, 16);
       console.log(iv)
       var output = AES.encrypt(string, Utf8.parse(key), {
         iv: Utf8.parse(iv),
       }).toString();
       var output2ndB64 = Utf8.parse(iv + output).toString(Base64);
       console.log("encrypted: ", output2ndB64); */

   // Decryption
   var _config = Utf8.stringify(Base64.parse(string))
   var decrypted = AES.decrypt(_config.slice(16), Utf8.parse(key), {
      iv: Utf8.parse(_config.slice(0, 16)),
   }).toString(Utf8);


   return JSON.parse(decrypted, (key, value) => {
      if (key === "FINGERPRINT_DATA") {
         return JSON.parse(value);
      }
      return value;
   });

}

export default { decryptAES }