

module.exports={
      index:async(req, res)=>{
        try {
            res.render('admin/dashboard/index', {
                title: 'Dashboard', 
                active: "dashboard",
            })
        } catch (err) {
            console.log(err)
            res.redirect('/admin/dashboard')
        }
    }
}