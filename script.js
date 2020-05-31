/* 
 * cifrul Caesar 
 */

var mode = "ceaser";
var shift;
function encrypt(text, shift) {
  var result = "";
  if (mode == "ceaser"){
    //cauta prin fiecare caracter din text
  for (var i = 0; i < text.length; i++) {
        
             //pune caracterul cod pentru fiecare litera
            var c = text.charCodeAt(i);

            // rezolva problema cu literele mari
      if(c >= 65 && c <=  90) {
           result += String.fromCharCode((c - 65 + shift) % 26 + 65); 

            // rezolva problema cu literele mici
          }else if(c >= 97 && c <= 122){
            result += String.fromCharCode((c - 97 + shift) % 26 + 97);

            
          }else {
            result += text.charAt(i);
          }
    }
  }
  return result;
}

function decrypt(text,shift){
  var result = "";
  shift = (26 - shift) % 26;
  result = encrypt(text,shift);
  return result;
}

function loaddropdown(){

    var dropdown = document.getElementById("shift");

  for(var i=1;i<=25;i++){
     var newOption = document.createElement('option');
     newOption.Text = i;
     newOption.value= i;
     newOption.textContent = i;
     dropdown.options.add(newOption);
  }
}
window.onload=loaddropdown();

function runScript(){
  var result="";
  var text = document.getElementById("text");
  shift = document.getElementById("shift").value;
  result = encrypt(text.value, parseInt(shift ) );
  text.value=(result);
  document.getElementById("encrypt").disabled=true;
  document.getElementById("decrypt").disabled=false;
}

function reverse(){
  var result="";
  var text = document.getElementById("text");
  result = decrypt(text.value, parseInt(shift ) );
  text.value=(result);
  document.getElementById("encrypt").disabled=false;
  document.getElementById("decrypt").disabled=true;
}




/* 
 * cifrul Vigenere 
 */
function doCrypt(isDecrypt) {
  if (document.getElementById("key").value.length == 0) {
    alert("Key is empty");
    return;
  }
  var key = filterKey(document.getElementById("key").value);
  if (key.length == 0) {
    alert("Key has no letters");
    return;
  }
  if (isDecrypt) {
    for (var i = 0; i < key.length; i++)
      key[i] = (26 - key[i]) % 26;
  }
  var textElem = document.getElementById("text");
  textElem.value = crypt(textElem.value, key);
}


//Intoarce rezultatul criptarii Vigenere pe textul dat cu cheia data.
function crypt(input, key) {
  var output = "";
  for (var i = 0, j = 0; i < input.length; i++) {
    var c = input.charCodeAt(i);
    if (isUppercase(c)) {
      output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
      j++;
    } else if (isLowercase(c)) {
      output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
      j++;
    } else {
      output += input.charAt(i);
    }
  }
  return output;
}


//Returneaza un vector de numere, fiecare din intervalul [0, 26), reprezentand cheia data. Cheia nu este sensibila la litere mari si mici, iar non-literele sunt ignorate.

function filterKey(key) {
  var result = [];
  for (var i = 0; i < key.length; i++) {
    var c = key.charCodeAt(i);
    if (isLetter(c))
      result.push((c - 65) % 32);
  }
  return result;
}


// Testeaza daca codul de caractere specificat este o litera.
function isLetter(c) {
  return isUppercase(c) || isLowercase(c);
}

// Teste daca codul de caractere specificat este o litera mare.
function isUppercase(c) {
  return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
}

// Teste daca codul de caractere specificat este o litera mica.
function isLowercase(c) {
  return 97 <= c && c <= 122; 
   }
     //Atat pentru cifrul Caesar cat si pentru cifrul Vigenère se foloseste alfabetul englezesc.