const Bank = require('./model')

module.exports={
      index:async(req, res)=>{
        try {
            const bank = await Bank.find()
            res.render('admin/bank/index', {
                title: 'Bank', 
                bank, 
                active: "bank",
            })
        } catch (err) {
            console.log(err)
            res.redirect('/admin/bank')
        }
    },
    actionCreate: async(req, res)=>{
        try {
            const {bankName, accountNumber} = req.body
            let bank = await Bank({
                bankName, accountNumber
            })
            await bank.save()
            res.redirect('/admin/bank')
        } catch (err) {
            console.log(err)
            res.redirect('/admin/bank')
        }
    },
    actionEdit: async(req, res)=>{
        try {
          const { id } = req.params;
          const {bankName, accountNumber } = req.body
    
          await Bank.findOneAndUpdate({
            _id: id
          },{ bankName, accountNumber  });
          res.redirect('/admin/bank')
          
        } catch (err) {
          console.log(err)
          res.redirect('/admin/bank')
        }
      },
      actionDelete: async(req, res)=>{
        try {
          const { id } = req.params;
    
          await Bank.findOneAndRemove({
            _id: id
          });
          res.redirect('/admin/bank')
        } catch (err) {
          console.log(err)
          res.redirect('/admin/bank')
        }
      }
}