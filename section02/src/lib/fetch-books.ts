import { BookData } from '@/type';

// q를 전달 받으면 Search페이지에서 사용하는 도서 검색용으로,
// q가 없으면 일반 전체 책 목록을 사용하는 용도로 사용
export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = 'http://localhost:12345/book';

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
