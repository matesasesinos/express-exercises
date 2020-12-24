exports.homeController = (req,res) => {
    res.render('home', {
        pageTitle: 'Home'
    });
}