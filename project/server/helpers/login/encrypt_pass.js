const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

//Takes users password as an argument, generates a hashed password with salt key.
function encrypt(password){
    const salt = randomBytes(16).toString('hex');
    const hashed_pass = scryptSync(password, salt, 32).toString('hex');
    return `${salt}:${hashed_pass}`;
}

//Takes salt:hashed_pass as argument
function decrypt_and_check(entered_pass, salt_hash_pass){
    const [salt, key] = salt_hash_pass.split(':');
    const hashed_buffer = scryptSync(entered_pass, salt, 32);
    const key_buffer = Buffer.from(key, 'hex');
    return timingSafeEqual(hashed_buffer, key_buffer);
}

module.exports = { encrypt, decrypt_and_check }

/*
//For testing
the_pass = 'testhere';
encrypted_pass = encrypt(the_pass);
console.log(encrypted_pass);
console.log(decrypt_and_check(the_pass, encrypted_pass))
console.log(encrypted_pass.length)
*/