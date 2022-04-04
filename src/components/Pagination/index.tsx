import Link from "next/link";
import { PAGE_SIZE } from "@src/shared/config";

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PAGE_SIZE);
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  );
}
