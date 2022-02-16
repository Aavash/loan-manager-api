import { HttpException, Logger } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';


export const isObjectEmpty = (obj: unknown): boolean => {
	return Object.keys(obj).length === 0;
};


function getAxios() {
	Logger.log(
		path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`),
	);
	Logger.log(
		fs.existsSync(
			path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`),
		),
	);
	if (
		fs.existsSync(
			path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`),
		)
	) {
		Logger.log('CA cert Found');
		const certVerifyFile = fs.readFileSync(
			path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`),
		);

		return axios.create({
			httpsAgent: new https.Agent({
				ca: certVerifyFile,
			}),
		});
	}

	Logger.log('CA cert not Found');
	
return axios.create({
		httpsAgent: new https.Agent({
			rejectUnauthorized: false,
		}),
	});
}

export const Axios = getAxios();
