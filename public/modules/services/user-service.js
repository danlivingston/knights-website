"use strict";
module.exports = function($http) {
    this.updateUser = function(user) {
        return $http.post('/members/update',{user}).then(res=>res.data);
    }
}