const feedbackmodel = require('../models/feedback');
const router = require('./authRoutes');



router.post('/feedback',(req, res)=>{

    const{name, email, subject, message}= req.body;

})

module.exports = router