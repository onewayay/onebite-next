'use client';

import { ReactNode, useEffect, useRef } from 'react';
import style from './modal.module.css';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal(); // dialog 태그는 기본적으로 꺼져있어서 보이지 않기에 보이도록 설정
      dialogRef.current?.scrollTo({
        // 최상단으로 스크롤 위치가 이동되도록 설정
        top: 0,
      });
    }
  });

  return createPortal(
    <dialog
      className={style.modal}
      ref={dialogRef}
      onClose={() => router.back()}
      onClick={(e) => {
        // 모달의 배경이 클릭이 된거면 -> 뒤로가기
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back();
        }
      }}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
}
