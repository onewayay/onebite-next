import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter(); // 모든 라우터 정보가 다 들어있는 객체
  // const num = router.query.num; // 라우터에 쿼리로 전달된 num의 값 (localhost:3000/search?num=1) 에서 1
  const { num } = router.query; // (localhost:3000/search?num=1) 에서 1
  // console.log(num);

  return <h1>Search {num}</h1>;
}
