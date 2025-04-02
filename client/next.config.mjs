/** @type {import('next').NextConfig} */

const nextConfig = {

    env:{
        // url:"http://localhost:4001/"
        url:"https://estatery-black.vercel.app/"
    },

    images: {
        domains: ['estatery-black.vercel.app'], // Add the domain where your images are hosted
    }
};

export default nextConfig;
