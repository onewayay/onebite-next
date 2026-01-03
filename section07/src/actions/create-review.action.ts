'use server';
import { delay } from '@/util/delay';
import { revalidatePath, revalidateTag } from 'next/cache';

// 자동으로 이 함수는 서버 액션으로 설정된다.

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요',
    };
  }

  try {
    await delay(2000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({
          bookId,
          content,
          author,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // // 1. 두번재 인수 생략 :  특정 주소에 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // // 2. 첫번째 인수로 폴더의 경로, 두번째 인수로는 'page' : 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath(`/book/[id]`, 'page');

    // // 3. 첫번째 인수로 재검증에 기준이 되는 레이아웃 파일이 위치한 경로,  두번째 인수로는 'layout' : 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath(`/(with-searchbar)`, 'layout');

    // // 4. 첫번째 인수로 인덱스경로,  두번째 인수로는 'layout' : 모든 데이터를 재검증
    // revalidatePath(`/`, 'layout');

    // 5. revalidateTag 사용 : 태그값을 기준으로 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);

    return {
      sattus: true,
      error: '',
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 전달에 실패했습니다 : ${err}`,
    };
  }
}
