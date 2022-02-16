import { JwtService } from '@nestjs/jwt';
import { JWT_CONFIG } from '../../config/main.config';


export async function getUserJwtToken(user, jwtService: JwtService) {
		// payload for the jwt
		const payload = {
      idx: user.idx,
      full_name: user.function,
      mobile_number: user.mobile_number,
      mobile_number_ext: user.mobile_number_ext,
		};

		const access_token = jwtService.sign(payload, {
			expiresIn: `${JWT_CONFIG.expiry}`,
		});
		return { access_token, payload, expires_in: JWT_CONFIG.expiry };
	}