import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    // 예외 상황에 대비하는 대비책
    // 위의 paths에서 설정하지 않은 경로에 접속 요청을 보냈을 때에 대한 옵션
    // 세가지 옵션이 존재. 기본은 false => notfound 페이지로 보낸다.
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  const book = await fetchOneBook(Number(id));

  if (!book) {
    return { notFound: true };
  }

  return { props: { book } };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return '로딩중입니다.';

  if (!book) return '문제가 발생했습니다 다시 시도하세요';

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
        className={style.cover_img_container}
      >
        <img src={coverImgUrl}></img>
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
