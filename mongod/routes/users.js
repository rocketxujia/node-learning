/* GET users listing. */
exports.list = function (req, res) {
    var db = res.db;
    var users = db.get('usercollection');
    users.find({}, function(a, users){
        res.render('users', {title: "list all users:", users: users});
    });
};
