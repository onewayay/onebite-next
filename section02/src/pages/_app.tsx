import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 버튼을 클릭해서 경로 이동하는 이벤트 핸들러
  const onClickButton = () => {
    router.push('/test');
  };

  useEffect(() => {
    router.prefetch('test');
  }, []);

  return (
    <>
      <header>
        <Link href={'/'}>Index</Link>
        &nbsp;
        {/* search 페이지는 prefetch 해제 */}
        <Link href={'/search'} prefetch={false}>
          Search
        </Link>
        &nbsp;
        <Link href={'/book/1'}>Book/1</Link>
        <div onClick={onClickButton}>
          <button>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
