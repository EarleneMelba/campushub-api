const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token=jwt.sign({id:user.id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    return res.status(200).json({
        message:'Login Successful',
        token,
    });
}catch(error){
    console.error('Login error:',error);
    return res.status(500).json({message:'Something went wrong'});
}}

module.exports={login};
