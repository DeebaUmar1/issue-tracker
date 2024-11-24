'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
});

const NewIssuePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IssueForm />
    </Suspense>
  );
};

export default NewIssuePage;
