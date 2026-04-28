import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '#models/User.js';
import { AUTH_PROVIDERS } from '#config/constants.js';

export const configureGoogleAuth = () => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL || 'http://localhost:5000'}/api/auth/google/callback`,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const name = profile.displayName || profile.name.givenName;

          let user = await User.findOne({ email });

          if (user) {
            if (user.authProvider === AUTH_PROVIDERS.LOCAL) {
              user.googleId = profile.id;
              user.authProvider = AUTH_PROVIDERS.BOTH;
              user.isVerified = true;
              await user.save();
            }
            return done(null, user);
          }

          user = await User.create({
            name,
            email,
            googleId: profile.id,
            authProvider: AUTH_PROVIDERS.GOOGLE,
            isVerified: true,
            avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
          });

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
