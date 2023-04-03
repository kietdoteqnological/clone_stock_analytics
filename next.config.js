/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    stockBaseURL: "https://www.alphavantage.co/",
    todoBaseURL: "https://jsonplaceholder.typicode.com/",
  },
};

module.exports = nextConfig;
