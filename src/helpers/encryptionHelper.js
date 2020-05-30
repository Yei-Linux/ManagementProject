import CryptoJS from "crypto-js";

export const encryptedKey = () => {
  return CryptoJS.enc.Base64.parse("9Ss2IEHWno0HXh+cYHDD9Q==");
};

export const encryptData = valueToEncrypt => {
  let encrypted = CryptoJS.AES.encrypt(valueToEncrypt, encryptedKey(), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

export const decryptData = valueToDecrypt => {
  let decrypted = CryptoJS.AES.decrypt(valueToDecrypt, encryptedKey(), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const readUrlEncrypted = urlEncrytped => {
    let newUrl = urlEncrytped.replace(/_/g,'/');
    newUrl = newUrl.replace(/-/g,'+')
    return newUrl;
};

export const changeSpecialsCharacteresOfUrlEncrypted = urlEncrytped => {
    let newUrl = urlEncrytped.replace(/[/]/g,'_');
    newUrl = newUrl.replace(/[+]/g,'-');
    return newUrl;
};
