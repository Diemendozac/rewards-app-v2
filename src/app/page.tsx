// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';
import HomePage from './api/index/page';

const Home = ({ Component, pageProps }: AppProps) => {
// 

  return (
    <HomePage></HomePage>
  );
}

export default Home;
// 