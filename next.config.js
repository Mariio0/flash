const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ['mongoose'],
	},
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'avatars.githubusercontent.com',
			'static.semrush.com',
		],
	},
	webpack(config) {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		return config;
	},
};

module.exports = nextConfig;
