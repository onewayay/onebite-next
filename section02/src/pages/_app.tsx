import GlobalLayout from '@/components/global-layout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

// getLayout 속성을 넣어서 NextPage 타입을 확장
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  // 현재 불러오는 페이지가 getlayout으로 감싸져 있다면 getLayout으로 감싸서 사용중인 페이지에 Component를 전달하도록,
  // 현재 불러오는 페이지가 getLayout으로 감싸져 있지 않다면(undefined 라면) 그냥 (page: ReactNode) => page 이렇게 전달하도록 처리.
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
