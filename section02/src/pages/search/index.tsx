import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function Page() {
  const router = useRouter(); // 모든 라우터 정보가 다 들어있는 객체

  const { q } = router.query; // (localhost:3000/search?q=1) 에서 1

  return <h1>Search {q}</h1>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
