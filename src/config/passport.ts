import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserAccount } from '../entity/UserAccount';
import database from '../util/database';

export default (passport: any) => {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET_TOKEN,
	};

	passport.use(
		new Strategy(options, async (jwt_payload: any, done: any) => {
			try {
				const user = (await database)
					.getRepository(UserAccount)
					.findOne({ id: jwt_payload.userId });
				if (user) return done(null, user);
				return done(null, false);
			} catch (err) {
				return done(err, false);
			}
		})
	);
};
