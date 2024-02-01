'use client';

import Link from 'next/link';
import { Input } from './input';
import { useDeferredValue, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const NavBar = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const router = useRouter();
  const pathname = usePathname();
  const searchValue = useDeferredValue(search);

  useEffect(() => {
    router.push(`${pathname}?search=${searchValue}`);
  }, [pathname, router, searchValue]);

  return (
    <div className="flex items-center justify-between gap-4 border-b p-4">
      <Link className="text-xl font-bold" href="/">
        Fountane
      </Link>
      <Input
        className="w-[400px]"
        type="text"
        placeholder="Search . . ."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div></div>
    </div>
  );
};
