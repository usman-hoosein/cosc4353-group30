function valid_username(username){
    //FIXME: Possibly add a condition that username can only start with letters and can't contain special characters
    if (username.length <= 20){
        return true;
    }
    else {
        return false;
    }
}

module.exports = { valid_username }