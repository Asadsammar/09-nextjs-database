///** @type {import('next').NextConfig} */
//const nextConfig = {};

//export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
      if (!isServer) {
          config.resolve.fallback = {
            fs: false,
            child_process: false,
            net:false,
            tls:false,
          };
        }

      config.module.rules.push({
        test: /\.html$/,
        use: 'ignore-loader'
      });
  
      return config;
    }
};

export default nextConfig;

  