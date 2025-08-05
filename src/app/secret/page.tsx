import { Suspense } from 'react';
import SecretClientPage from './SecretClientPage';

export const dynamic = 'force-dynamic';

export default function SecretPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SecretClientPage />
    </Suspense>
  );
}
