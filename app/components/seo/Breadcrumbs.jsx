import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 px-6">
      <ol className="flex items-center gap-2 text-sm text-gray-400 max-w-[110rem] mx-auto">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-600">/</span>}
            {index === items.length - 1 ? (
              <span className="text-[#B2FF00] font-semibold">{item.name}</span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
