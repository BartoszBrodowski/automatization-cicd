import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
		title: 'Movie DB API',
		description: 'Description',
	},
	host: 'localhost:3000',
	schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/server.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
	import('./src/server'); // Use import for ES6 modules
});
