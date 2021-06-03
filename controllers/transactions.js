//@desc Get all transactions
//@route GET /api/v1/transactions
//@access Public

const Transaction = require('../models/Transaction')


exports.getTransactions = async(req,res,next) =>{
    //res.send('GET transactions')
    try{
        const transactions = await Transaction.find()
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    }catch (err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

//@desc add transactions
//@route POST /api/v1/transactions
//@access Public
exports.addTransactions = async(req,res,next) =>{
    //res.send('POST transactions')
    try{
        // const {email,number} = req.body

        const transaction = await Transaction.create(req.body)

        return res.status(201).json({
            success: true,
            data: transaction
        })

    }catch (err){
        // console.log(err)
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val =>val.message)
            //400 is the client error
            return res.status(400).json({
                success: false,
                error: messages
            })
        }
        else{
            return res.status(500).json({
                success:false,
                error: 'Server Error'

            })
        }
    }


}

//@desc Delete transactions
//@route DELETE /api/v1/transactions/:id
//@access Public
exports.deleteTransactions = async (req,res,next) =>{
    // res.send('DELETE transactions')
    try{
        const transaction = await Transaction.findById(req.params.id)
        if(!transaction){
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }

        await transaction.remove()
        return res.status(200).json({
            success: true,
            data:{}
        })

    }catch (err){
        return res.status(500).json({
            success:false,
            error: 'Server error'
        })
    }
}


exports.updateTransactions = async (req,res,next) =>{
    // res.send('DELETE transactions')
    const transaction = await Transaction.findById(req.params.id)

    try{
        if(!transaction){
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })

        }else{
            // const transaction = await Transaction.create(req.body)
            //
            // return res.status(201).json({
            //     success: true,
            //     data: transaction
            // })
            // transaction.update({_id: req.params.id},req.body,(req,res)=>{
            //   res.send(
            //       (err === null) ? {msg:''}: {msg:err}
            //   )
            // })
            // var query = {'username': req.user.username};
            // req.newData.username = req.user.username;
            //
            // MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
            //     if (err) return res.send(500, {error: err});
            //     return res.send('Succesfully saved.');
            // });

            // const item = {
            //     email: req.body.email,
            //     number: req.body.number,
            //     updatedAt: Date.now()
            // }

            const updateQuery = {}
            if(req.body.email){
                updateQuery.email = req.body.email
            }
            if(req.body.number){
                updateQuery.number = req.body.number
            }

            await transaction.updateOne({id:req.params.id},{email:req.body.email,number:req.body.number,updatedAt:Date.now()},(err,raw)=>{
                if(err){
                    return res.status(500).json({
                        success:false,
                        error: 'hello error'
                    })
                }
                return res.status(200).json({
                    success: true,
                    count: raw.length,
                    data: raw
                })

            })



        }



    }catch (err){

        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val =>val.message)
            //400 is the client error
            return res.status(400).json({
                success: false,
                error: messages
            })
        }
        else{
            return res.status(500).json({
                success:false,
                error: 'Server Error'

            })
        }

    }
}
