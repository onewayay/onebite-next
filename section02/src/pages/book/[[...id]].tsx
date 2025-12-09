import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter(); // 모든 라우터 정보가 다 들어있는 객체
  // const id = router.query.id; // 라우터에 URL Parameter가 담긴 부분
  const { id } = router.query; // 라우터에 URL Parameter가 담긴 부분 (localhost:3000/book/1) 에서 1
  console.log(id);

  return <h1>Book {id}</h1>;
}
