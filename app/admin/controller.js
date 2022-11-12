const Admin = require('./model')
const bcrypt = require('bcryptjs')

module.exports={
    viewSignin: async(req, res)=>{
        try {
            if (req.session.admin === null || req.session.admin === undefined) {
                res.render('admin/auth/signIn',{
                    title: "Admin | LelangKu"
                })
              } else {
                res.redirect('/admin/dashboard')
              }
        } catch (err) {
            console.log(err)
            res.redirect('/admin')
        }
    },
    actionSignIn: async(req, res)=>{
        try {
            const {email, password} = req.body
            const admin = await Admin.findOne({
                email: email
            })
            if(admin) {
                const checkPass = await bcrypt.compare(password, admin.password)
                if(checkPass){
                    req.session.admin = {
                        id: admin._id,
                        email: admin.email,
                        username: admin.username
                    }
                    console.log(req.session.admin)
                    res.redirect('/admin/dashboard')
                }else{
                    res.redirect('/admin')
                }
            }else{
                res.redirect('/admin')
            }
        } catch (error) {
            console.log(error)
            res.redirect('/admin')
        }
    },
    actionSignOut: async(req, res)=>{
        req.session.destroy()
        res.redirect('/admin')
    }

}