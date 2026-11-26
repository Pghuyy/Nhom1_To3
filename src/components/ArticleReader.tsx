import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Article } from '../types/journey';

interface ArticleReaderProps {
  article: Article;
  hasPrev: boolean;
  hasNext: boolean;
  onBackToLibrary: () => void;
  onPrevArticle: () => void;
  onNextArticle: () => void;
}

export function ArticleReader({
  article,
  hasPrev,
  hasNext,
  onBackToLibrary,
  onPrevArticle,
  onNextArticle,
}: ArticleReaderProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10 pb-safe">
      {/* Top Return Navigation */}
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#B9E5F5] pb-4">
        <button
          type="button"
          onClick={onBackToLibrary}
          className="min-h-[44px] inline-flex items-center gap-2 rounded-full border border-[#B9E5F5] bg-white px-4 py-2 text-xs font-medium text-[#173B52] transition-colors hover:border-[#91D5ED] hover:bg-[#DDF3FC]"
        >
          <ArrowLeft className="h-4 w-4 text-[#173B52]" aria-hidden="true" />
          <span>Quay lại thư viện</span>
        </button>

        <span className="font-mono-tabular text-xs font-medium text-[#557386]">
          Nhóm {article.groupCode} · {article.readTimeMinutes} phút đọc
        </span>
      </div>

      {/* Editorial Header */}
      <header className="space-y-3">
        <p className="text-xs font-semibold tracking-wide text-[#557386]">
          {article.groupCode}. {article.groupTitle}
        </p>
        <h1
          className="font-display text-2xl font-semibold leading-tight text-[#173B52] sm:text-4xl"
          style={{ textWrap: 'balance' }}
        >
          {article.title}
        </h1>
        <p className="text-base leading-relaxed text-[#557386] sm:text-lg">
          {article.subtitle}
        </p>
      </header>

      {/* Figure Illustration */}
      <figure className="mt-7">
        <div className="overflow-hidden rounded-3xl border border-[#B9E5F5]/80 bg-white p-2 shadow-[0_12px_36px_-14px_rgba(23,59,82,0.1)]">
          {!imageFailed ? (
            <img
              src={article.imageUrl}
              alt={article.imageCaption}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="aspect-[16/10] w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl bg-[#DDF3FC] p-6 text-center text-sm text-[#557386]">
              {article.title}
            </div>
          )}
        </div>
        <figcaption className="mt-2.5 text-xs italic text-[#557386]">
          Hình minh họa — {article.imageCaption}
        </figcaption>
      </figure>

      {/* Article Body */}
      <div className="mt-8 space-y-8 border-t border-[#B9E5F5] pt-8">
        {article.sections.map((section, secIdx) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-[#173B52] sm:text-2xl">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, pIdx) => (
              <p
                key={`${secIdx}-${pIdx}`}
                className={`text-[15px] leading-[1.85] text-[#173B52] sm:text-base ${
                  secIdx === 0 && pIdx === 0
                    ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-4xl first-letter:font-semibold first-letter:text-[#173B52]'
                    : ''
                }`}
              >
                {paragraph}
              </p>
            ))}

            {section.highlight && (
              <blockquote className="my-6 rounded-3xl border border-[#B9E5F5] bg-gradient-to-r from-[#DDF3FC]/70 via-white to-[#D7F4EA]/70 px-5 py-6 text-center font-display text-lg italic leading-relaxed text-[#173B52] sm:text-xl">
                “{section.highlight}”
              </blockquote>
            )}
          </section>
        ))}
      </div>

      {/* References */}
      {article.references.length > 0 && (
        <aside className="mt-10 rounded-3xl border border-[#B9E5F5] bg-white p-5 sm:p-6">
          <h3 className="text-xs font-semibold tracking-wide text-[#557386]">
            Nguồn tham khảo & cơ sở khoa học
          </h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-[#557386] sm:text-sm">
            {article.references.map((ref) => (
              <li key={ref}>{ref}</li>
            ))}
          </ul>
        </aside>
      )}

      {/* Bottom Article Navigation */}
      <div className="mt-10 flex flex-col gap-3 border-t border-[#B9E5F5] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          disabled={!hasPrev}
          onClick={onPrevArticle}
          className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full border border-[#B9E5F5] bg-white px-5 py-2.5 text-xs font-medium text-[#173B52] hover:border-[#91D5ED] hover:bg-[#DDF3FC] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Bài viết trước</span>
        </button>

        <button
          type="button"
          onClick={onBackToLibrary}
          className="min-h-[44px] inline-flex items-center justify-center rounded-full border border-[#91D5ED] bg-[#DDF3FC] px-6 py-2.5 text-xs font-semibold text-[#173B52] hover:bg-[#B9E5F5]"
        >
          Danh sách chủ đề
        </button>

        <button
          type="button"
          disabled={!hasNext}
          onClick={onNextArticle}
          className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full border border-[#B9E5F5] bg-white px-5 py-2.5 text-xs font-medium text-[#173B52] hover:border-[#91D5ED] hover:bg-[#DDF3FC] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Bài viết tiếp theo</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
