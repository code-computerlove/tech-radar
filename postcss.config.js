module.exports = {
	plugins: process.env.NODE_ENV === 'production' ? {
		'postcss-preset-env': {
			autoprefixer: {
				flexbox: 'no-2009',
			},
			stage: 3,
			features: {
				'custom-properties': false,
				'nesting-rules': true,
			}
		},
		'cssnano': {
			preset: 'default',
		},
		'postcss-nested': {}
	} : {
		'postcss-preset-env': {
			autoprefixer: {
				flexbox: 'no-2009',
			},
			stage: 3,
			features: {
				'custom-properties': false,
				'nesting-rules': true,
			}
		},
		'postcss-nested': {}
	}
};
