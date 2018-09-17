const RULES = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  special: '.,/-&?$#@!*<>'
};

const DEFAULT_PASSWORD_LENGTH = 8;
const DEFAULT_UPPER_CHAR_LENGTH = 1;
const DEFAULT_DIGITS_LENGTH = 1;
const DEFAULT_SPECIAL_CHAR_LENGTH = 1;


module.exports = class Passwordgen {
  constructor(options) {
    this.options = options || {};
  }

  checkParametersValidity() {
    if (this.options && this.options.length < 8) throw TypeError('Minimal password length is 8 characters.');

    if (isNaN(this.options.length)) this.options.length = DEFAULT_PASSWORD_LENGTH;
    if (isNaN(this.options.uppercase)) this.options.uppercase = DEFAULT_UPPER_CHAR_LENGTH;
    if (isNaN(this.options.digits)) this.options.digits = DEFAULT_DIGITS_LENGTH;
    if (isNaN(this.options.special)) this.options.special = DEFAULT_SPECIAL_CHAR_LENGTH;

    let propertiesCount = parseInt(this.options.uppercase) + parseInt(this.options.digits) + parseInt(this.options.special);
    if (this.options.length < propertiesCount) throw TypeError(`Password length cannot be less than ${ propertiesCount }`)
  }

  generate() {
    this.checkParametersValidity();
    var password = '';

    for (let key in this.options) {
      if (key !== 'length') password += Helper._sizeSample(RULES[key], this.options[key]);
    }
    if (password.length < this.options.length) {
      password += Helper._sizeSample(RULES.lowercase, this.options.length - password.length);
    }
      
    return Helper._shuffle(password);
  }
}

const Helper = {
  _getRandom: function(length) {
    return Math.floor(Math.random() * length);
  },

  _sizeSample: function(array, size) {
    let copy = array.slice(0),
        length = copy.length,
        start = this._getRandom(length);
  
    for (let i = size; i--; ) {
      let index = (start + i) % length,
          rindex = this._getRandom(length),
          tmp = copy[rindex];
  
      copy[rindex] = copy[index];
      copy[index] = tmp;
    }
    let end = start + size,
        sample = copy.slice(start, end);
  
    if (end > length) sample = sample.concat(copy.slice(0, end - length));
  
    return sample.slice(0, size);
  },
  
  _shuffle: function(arr) {
    return arr.split('').sort(() => 0.5 - Math.random()).join('');
  }
}
