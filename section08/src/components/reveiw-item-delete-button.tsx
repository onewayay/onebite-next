'use client';

import { deleteReviewAction } from '@/actions/delete-review.action';
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="bookId" value={bookId} hidden readOnly />

      {isPending ? (
        <div>...</div>
      ) : (
        <>
          {/* div가 버튼이 아니기에 제출되는 기능이 되지 않는다. 그래서 프로그래메틱하게 폼을 제출하도록 만듦 (위의 formRef 사용)*/}
          <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
        </>
      )}
    </form>
  );
}
