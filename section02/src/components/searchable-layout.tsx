import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import style from './searchable-layout.module.css';

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  // 검색어 상태 새로고침시에도 유지되도록 전달된 쿼리스트링 q를 따로 변수로 빼고, 아래의 useEffect로 마운트 이후에 q 가있으면 setSearch로 value에 넣어준다.
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  // input에 입력시 검색어 상태 변경 이벤트
  const onChageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색 버튼 클릭시 search페이지로 이동하면서 검색한 내용 쿼리스트링으로 전달하는 클릭 이벤트
  const onSubmit = () => {
    // 검색어가 없거나, 검색어와 현재 쿼리스트링 값이 다를 때 이동하지 않도록 하는 기능
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  // 엔터키로도 검색 버튼 작동하도록 하는 이벤트
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          placeholder="검색어를 입력하세요!"
          value={search}
          onChange={onChageSearch}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
