

const arithmeticMiddleware=(req,res,next)=>{
    const number=Number(req.body.number);

    req.result={
        originalnumber:number,
        increment:number+1,
        decrement:number-1,
        square:number*number

    }
    next();

}

module.exports=arithmeticMiddleware;