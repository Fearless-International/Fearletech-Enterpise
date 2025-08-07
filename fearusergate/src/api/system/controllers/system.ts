/**
 * system controller
 */
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { factories: systemControllersFactories } = require('@strapi/strapi');
module.exports = systemControllersFactories.createCoreController('api::system.system', ({ strapi }) => ({
  // Custom register endpoint
  async register(ctx) {
  try {
    // Get data from request body
    const { fullName, email, password } = ctx.request.body.data;

    // Validate input
    if (!fullName || !email || !password) {
      return ctx.badRequest('Please provide all required fields');
    }

    // Check if user already exists
    const existingUser = await strapi.db.query('api::system.system').findOne({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return ctx.badRequest('Email is already taken');
    }

    // Generate verification token
    const verificationToken = require('crypto').randomBytes(20).toString('hex');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // OPTION 1: Use entity service (recommended approach)
    const user = await strapi.entityService.create('api::system.system', {
      data: {
        fullName: fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
        verificationToken: verificationToken,
        resetToken: "",  // Make sure this matches your schema
        verified: false,
        blocked: false
      }
    });

    console.log("User created successfully:", user?.id);

    // Send verification email
    try {
      await strapi.plugins['email'].services.email.send({
        to: email,
        subject: 'Verify Your Email Address',
        html: `
          <h1>Welcome to Your App!</h1>
          <p>Dear ${fullName},</p>
          <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
          <p>
            <a href="${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}">
              Verify Email Address
            </a>
          </p>
          <p>If you did not create this account, please ignore this email.</p>
          <p>Best regards,<br/>Your Company Name</p>
        `
      });
      console.log('Verification email sent successfully');
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
    }

    // Return sanitized user data
    return ctx.created({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      verified: user.verified,
      message: 'Registration successful! Please check your email to verify your account.'
    });
  } catch (error) {
    console.error('Error in register endpoint:', error);
    return ctx.badRequest(`Registration failed: ${error.message}`);
  }
},

 async login(ctx) {
  try {
    // Extract credentials - fix data extraction
    let email, password;
    
    if (ctx.request.body.data) {
      // If data is nested under 'data'
      email = ctx.request.body.data.email;
      password = ctx.request.body.data.password;
    } else {
      // If data is directly in body
      email = ctx.request.body.email;
      password = ctx.request.body.password;
    }
    
    console.log("Login attempt for email:", email);
    
    // Validate input
    if (!email || !password) {
      return ctx.badRequest('Email and password are required');
    }
    
    // Find user by email (case insensitive)
    const user = await strapi.db.query('api::system.system').findOne({
      where: { email: email.toLowerCase() }
    });
    
    console.log("User found:", user ? `ID: ${user.id}, Verified: ${user.verified}` : "No user found");
    
    if (!user) {
      return ctx.badRequest('Invalid email or password');
    }
    
    if (!user.verified) {
      return ctx.badRequest('Please verify your email before logging in');
    }
    
    console.log("Performing password check...");
    
    // Check password - use the same bcrypt import as above
    let validPassword;
    try {
      // Clean the password to remove any whitespace
      const cleanPassword = password.trim();
      validPassword = await bcrypt.compare(cleanPassword, user.password);
      console.log("Password validation result:", validPassword);
    } catch (bcryptError) {
      console.error("Bcrypt comparison error:", bcryptError);
      return ctx.badRequest('Error validating credentials');
    }
    
    if (!validPassword) {
      return ctx.badRequest('Invalid email or password');
    }
    
    // Password valid, generate JWT
    const jwtSecret = process.env.JWT_SECRET || 'hiZt4I468H3Audc4rmcdTw==';
    
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email 
      },
      jwtSecret,
      { expiresIn: '7d' }
    );
    
    console.log("Login successful, token generated");
    
    return {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Error during login:', error);
    return ctx.badRequest('An error occurred during login');
  }
},

 async verifyEmail(ctx) {
  const { token } = ctx.query;
  
  try {
    // Basic validation
    if (!token) {
      return ctx.badRequest('Verification token is required');
    }
    
    // Find user with this token
    const user = await strapi.db.query('api::system.system').findOne({
      where: { verificationToken: token }
    });
    
    // If no user found with token
    if (!user) {
      const existingUsers = await strapi.db.query('api::system.system').findMany({
        where: { verified: true }
      });
      
      // Check if any verified user had this token before
      const alreadyVerified = existingUsers.some(u => 
        u.verificationToken === token || u.verificationToken === null
      );
      
      if (alreadyVerified) {
        return {
          status: "success", 
          message: 'Email already verified! You can now log in.'
        };
      }
      
      return ctx.badRequest('Invalid verification token');
    }
    
    // User found but check if already verified
    if (user.verified === true) {
      return {
        status: "success",
        message: 'Your email is verified! You can now log in.'
      };
    }
    
    // Update user - mark as verified
    await strapi.db.query('api::system.system').update({
      where: { id: user.id },
      data: {
        verified: true,
        verificationToken: null // Remove token so it can't be reused
      }
    });
    
    // Send welcome email
    try {
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        subject: 'Welcome to Your App!',
        html: `
          <h1>Welcome ${user.fullName}!</h1>
          <p>Your email has been verified successfully.</p>
          <p>You can now <a href="${process.env.FRONTEND_URL}/sign-in">log in</a> to your account.</p>
        `
      });
      console.log('Welcome email sent successfully');
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
    }
    
    return {
      status: "success",
      message: 'Email verified successfully! You can now log in.'
    };
  } catch (error) {
    console.error('Error during email verification:', error);
    return ctx.badRequest('Verification failed. Please try again later.');
  }
},
  // Request password reset endpoint
  async requestReset(ctx) {
    const { email } = ctx.request.body.data;

    // Validate input
    if (!email) {
      return ctx.badRequest('Email is required');
    }

    // Find the user
    const user = await strapi.db.query('api::system.system').findOne({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      // For security reasons, we'll still return a success message
      return {
        message: 'If your email exists in our database, you will receive a password reset link shortly.'
      };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Update user with reset token
    await strapi.db.query('api::system.system').update({
      where: { id: user.id },
      data: {
        resetToken
      }
    });

    // Send reset email
    try {
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        subject: 'Reset Your Password',
        html: `
          <h1>Reset Your Password</h1>
          <p>Dear ${user.fullName},</p>
          <p>You requested to reset your password. Please click the link below to set a new password:</p>
          <p>
            <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">
              Reset Password
            </a>
          </p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Best regards,<br/>Your Company Name</p>
        `
      });
      console.log('Password reset email sent successfully');
    } catch (emailError) {
      console.error('Error sending password reset email:', emailError);
    }

    return {
      message: 'If your email exists in our database, you will receive a password reset link shortly.'
    };
  },

  // Reset password endpoint
  async resetPassword(ctx) {
    const { email, password, token } = ctx.request.body.data;

    // Validate input
    if (!email || !password || !token) {
      return ctx.badRequest('Email, password, and token are required');
    }

    // Find the user with the token
    const user = await strapi.db.query('api::system.system').findOne({
      where: { 
        email: email.toLowerCase(),
        resetToken: token
      }
    });

    if (!user) {
      return ctx.badRequest('Invalid or expired reset token');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password and clear token
    await strapi.db.query('api::system.system').update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null
      }
    });

    // Send confirmation email
    try {
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        subject: 'Password Reset Successful',
        html: `
          <h1>Password Reset Successful</h1>
          <p>Dear ${user.fullName},</p>
          <p>Your password has been successfully reset.</p>
          <p>You can now log in with your new password.</p>
          <p>
            <a href="${process.env.FRONTEND_URL}/sign-in">
              Log In Now
            </a>
          </p>
          <p>Best regards,<br/>Your Company Name</p>
        `
      });
      console.log('Password reset confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending password reset confirmation email:', emailError);
    }

    return {
      message: 'Password reset successful. You can now log in with your new password.'
    };
  },

// Update your me() method to use the same fallback secret as login
async me(ctx) {
  try {
    const token = ctx.request.header.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return ctx.unauthorized('Not authenticated');
    }
    
    // Use the same JWT secret as in login method
    const jwtSecret = process.env.JWT_SECRET || 'hiZt4I468H3Audc4rmcdTw==';
    const decoded = jwt.verify(token, jwtSecret);
    
    if (typeof decoded === 'string' || !('id' in decoded)) {
      return ctx.unauthorized('Invalid token format');
    }
    
    const userId = decoded.id;

    const user = await strapi.db.query('api::system.system').findOne({
      where: { id: userId }
    });

    if (!user) {
      return ctx.notFound('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      verified: user.verified,
      createdAt: user.createdAt
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return ctx.unauthorized('Invalid or expired token');
  }
},
  async logout(ctx) {
  // JWT tokens are stateless, but you might want to:
  // 1. Add the token to a blacklist
  // 2. Clear any server-side sessions
  // 3. Log the logout event
  
  try {
    // You can add token to a blacklist here if needed
    
    return {
      message: 'Logged out successfully'
    };
  } catch (error) {
    console.error('Logout error:', error);
    return ctx.badRequest('An error occurred during logout');
  }
},
// Add this method to your system controller:

async getUserStats(ctx) {
  try {
    // Get user from token
    const token = ctx.request.header.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return ctx.unauthorized('No authentication token provided');
    }
    
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret');
    
    if (!decoded || !decoded.id) {
      return ctx.unauthorized('Invalid token');
    }
    
    const userId = decoded.id;
    
    // Get booking statistics
    const totalBookings = await strapi.entityService.count('api::booking.booking', {
      filters: { owner: userId }
    });
    
    const completedBookings = await strapi.entityService.count('api::booking.booking', {
      filters: { 
        owner: userId,
        statuses: 'confirmed'
      }
    });
    
    const pendingBookings = await strapi.entityService.count('api::booking.booking', {
      filters: { 
        owner: userId,
        statuses: 'pending'
      }
    });
    
    // Get contact/message statistics
    const totalMessages = await strapi.entityService.count('api::contact.contact', {
      filters: { owner: userId }
    });
    
    const unreadMessages = await strapi.entityService.count('api::contact.contact', {
      filters: { 
        owner: userId,
        isRead: false
      }
    });
    
    const repliedMessages = await strapi.entityService.count('api::contact.contact', {
      filters: { 
        owner: userId,
        adminReply: { $notNull: true }
      }
    });
    
    return {
      totalBookings,
      completedBookings,
      pendingBookings,
      totalMessages,
      unreadMessages,
      repliedMessages
    };
    
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return ctx.internalServerError('Failed to fetch user statistics');
  }
},
}));
