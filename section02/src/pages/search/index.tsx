import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import BookItem from '@/components/book-item';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/type';

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter(); // 모든 라우터 정보가 다 들어있는 객체
  const q = router.query.q; // (localhost:3000/search?q=1) 에서 1

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      // 검색 결과를 불러오는 로직
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
