'use server';
import { revalidateTag } from 'next/cache';

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

    // 5. revalidateTag 사용 : 태그값을 기준으로 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      error: '',
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 전달에 실패했습니다 : ${err}`,
    };
  }
}
