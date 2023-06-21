const User = require('../app/models/User');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const generateVerificationCode = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

const resolvers = {
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const { name, email, password } = input;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        const verificationCode = generateVerificationCode();
        user.verificationCode = verificationCode;
        await user.save();

        const mailOptions = {
          from: process.env.MAIL_FROM_ADDRESS,
          to: email,
          subject: 'Verify Your Email',
          html: `
            <h2>Hi ${name},</h2>
            <p>Thank you for registering. Please use the following verification code to verify your email:</p>
            <h3>${verificationCode}</h3>
          `,
        };
        await transporter.sendMail(mailOptions);

        return {
          status: 'success',
          message: 'User created successfully. Please check your email to verify your account.',
          data: user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    verifyUser: async (_, { input }) => {
      try {
        const { email, verificationCode } = input;
        const user = await User.findOne({
          where: { email },
        });
        

        if (!user) {
          throw new Error('User not found');
        }

        if (user.isVerified == true ) {
          throw new Error('Email already verified');
        }

        if (user.verificationCode !== verificationCode) {
          throw new Error('Invalid verification code');
        }
        

        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();

        return {
          status: 'success',
          message: 'Email verification successful. You can now login to your account.',
          data: user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    loginUser: async (_, { input }) => {
      try {
        const { email, password } = input;
        const user = await User.findOne({
          where: { email },
        });
        

        if (!user) {
          throw new Error('Invalid credentials email');
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials password');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        return {
          status: 'success',
          message: 'Login successful',
          user,
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Query: {
    getUser: async (_, { userId }, context) => {
      try {
        // Lakukan operasi pengambilan pengguna berdasarkan userId di sini
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
module.exports = resolvers;
