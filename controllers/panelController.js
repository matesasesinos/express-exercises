exports.panelHome = (req,res) => {
    res.render('panel/panel', {
        pageTitle: 'Panel de Usuario',
        bodyClass: 'body-panel-home',
        panel: true
    })
}