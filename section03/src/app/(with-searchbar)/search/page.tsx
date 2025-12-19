export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  // const q = await searchParams; // 이렇게 하면 searchParams 모든 값을 불러와서 {q: '한입'} 이런식으로 나온다
  const { q } = await searchParams;

  return <div>Search 페이지 : {q}</div>;
}
