var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowercase = uppercase.toLowerCase();
var numbers = "0123456789";
var specialChars = "`~!@#$%^&*()-_=+[{]}\|;:'\",<.>/?\\| ";
function generate() {
    var password = "";
    var list = [];
    var passwordLength = parseInt(prompt ("How many characters would you like in your password?  Please enter a number from 8 to 128"));
    while (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128){
        if (isNaN(passwordLength)){
            passwordLength = parseInt(prompt ("That is not a number.  Please enter a number from 8 to 128"));
        }
        else{
        passwordLength = parseInt(prompt ("That number is out of the acceptable range.  Please enter a number from 8 to 128"));
        }
    }
    while (list.length < 1){
        includeUpper = confirm ("Would you like to include uppercase letters in your password?")
        if (includeUpper){
            list.push(uppercase)
        }
        includeLower = confirm ("Would you like to include lowercase letters in your password?")
        if (includeLower){
            list.push(lowercase)
        }
        includeNumbers = confirm ("Would you like to include numbers in your password?")
        if (includeNumbers){
            list.push(numbers)
        }
        includeSpecial = confirm ("Would you like to include special characters in your password?")
        if (includeSpecial){
            list.push(specialChars)
        }
        if (list.length < 1){
            alert ("Well.  That's all I have.  Pick something this time.  You're in a while loop and it's the only way out.")
        }
    }
    while(password.length<passwordLength){
        var i = Math.floor(Math.random() * (list.length));
        var j = Math.floor(Math.random() * (list[i].length));
        password=password + list[i][j];
    }
    document.getElementById("password").innerHTML=password;
}
function copy() {
    var password = document.getElementById("password");
    password.select();
    document.execCommand("copy");
    alert(password.value + " copied to clipboard.");
}