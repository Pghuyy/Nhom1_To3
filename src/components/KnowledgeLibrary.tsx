import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Check, Search } from 'lucide-react';
import type { ArticleGroupCode } from '../types/journey';
import { ARTICLE_GROUPS, ARTICLES } from '../data/articleData';
import { PROJECT_CONTENT } from '../data/journeyData';
import { filterArticles } from '../utils/journeyState';
import { ArticleReader } from './ArticleReader';

interface KnowledgeLibraryProps {
  readArticleIds: string[];
  onMarkArticleRead: (articleId: string) => void;
  onCompleteStage: () => void;
}

export function KnowledgeLibrary({
  readArticleIds,
  onMarkArticleRead,
  onCompleteStage,
}: KnowledgeLibraryProps) {
  const [selectedGroup, setSelectedGroup] = useState<ArticleGroupCode | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const filteredArticles = useMemo(
    () => filterArticles(ARTICLES, selectedGroup, searchQuery),
    [selectedGroup, searchQuery]
  );

  const activeArticleIndex = activeArticleId
    ? ARTICLES.findIndex((a) => a.id === activeArticleId)
    : -1;
  const activeArticle =
    activeArticleIndex >= 0 ? ARTICLES[activeArticleIndex] : null;

  const openArticle = (id: string) => {
    setActiveArticleId(id);
    onMarkArticleRead(id);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (activeArticle) {
    return (
      <ArticleReader
        article={activeArticle}
        hasPrev={activeArticleIndex > 0}
        hasNext={activeArticleIndex < ARTICLES.length - 1}
        onBackToLibrary={() => setActiveArticleId(null)}
        onPrevArticle={() => {
          if (activeArticleIndex > 0) {
            openArticle(ARTICLES[activeArticleIndex - 1].id);
          }
        }}
        onNextArticle={() => {
          if (activeArticleIndex < ARTICLES.length - 1) {
            openArticle(ARTICLES[activeArticleIndex + 1].id);
          }
        }}
      />
    );
  }

  return (
    <section
      aria-labelledby="library-heading"
      className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 pb-safe"
    >
      {/* Editorial Magazine Header */}
      <div className="flex flex-col gap-4 border-b border-[#B9E5F5] pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#557386]">
            Chương 04 · Tạp chí tri thức và bài luận chuyên đề
          </p>
          <h1
            id="library-heading"
            className="mt-1.5 font-display text-2xl font-semibold text-[#173B52] sm:text-3xl lg:text-4xl"
          >
            Kho Tri Thức Nguồn Nước
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#557386]">
            Sáu chuyên mục luận giải từ khái niệm hệ sinh thái, thực trạng đến trách nhiệm công dân và góc suy ngẫm.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#557386]"
            aria-hidden="true"
          />
          <input
            type="search"
            aria-label="Tìm kiếm bài viết theo chủ đề"
            placeholder="Tìm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-h-[44px] w-full rounded-full border border-[#B9E5F5] bg-white pl-10 pr-4 text-sm text-[#173B52] placeholder:text-[#557386] focus:border-[#91D5ED] focus:outline-none"
          />
        </div>
      </div>

      {/* 6 Thematic Group Tabs */}
      <div
        role="tablist"
        aria-label="Nhóm chủ đề bài viết A đến F"
        className="mt-5 flex flex-wrap items-center gap-1.5"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedGroup === 'ALL'}
          onClick={() => setSelectedGroup('ALL')}
          className={`min-h-[44px] rounded-full px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
            selectedGroup === 'ALL'
              ? 'bg-[#91D5ED] text-[#173B52] font-semibold shadow-xs'
              : 'bg-white border border-[#B9E5F5] text-[#557386] hover:text-[#173B52] hover:border-[#91D5ED]'
          }`}
        >
          Tất cả ({ARTICLES.length})
        </button>
        {ARTICLE_GROUPS.map((group) => (
          <button
            key={group.code}
            type="button"
            role="tab"
            aria-selected={selectedGroup === group.code}
            onClick={() => setSelectedGroup(group.code)}
            className={`min-h-[44px] rounded-full px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedGroup === group.code
                ? 'bg-[#91D5ED] text-[#173B52] font-semibold shadow-xs'
                : 'bg-white border border-[#B9E5F5] text-[#557386] hover:text-[#173B52] hover:border-[#91D5ED]'
            }`}
          >
            {group.short}
          </button>
        ))}
      </div>

      {/* Articles Feed */}
      {filteredArticles.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-[#B9E5F5] bg-white p-8 text-center">
          <p className="text-sm font-medium text-[#173B52]">
            Không tìm thấy bài viết phù hợp với từ khóa “{searchQuery}”.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedGroup('ALL');
            }}
            className="mt-4 min-h-[44px] rounded-full border border-[#91D5ED] bg-[#DDF3FC] px-5 py-2 text-xs font-semibold text-[#173B52] hover:bg-[#B9E5F5]"
          >
            Xem toàn bộ 6 chuyên mục
          </button>
        </div>
      ) : (
        <div className="mt-7 space-y-6">
          {/* Lead Featured Story */}
          {(() => {
            const lead = filteredArticles[0];
            const isRead = readArticleIds.includes(lead.id);
            return (
              <div className="overflow-hidden rounded-3xl border border-[#B9E5F5]/80 bg-white shadow-[0_12px_36px_-14px_rgba(23,59,82,0.1)] lg:grid lg:grid-cols-12 lg:items-stretch">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#DDF3FC] lg:col-span-6 lg:aspect-auto lg:h-full">
                  {!brokenImages[lead.id] ? (
                    <img
                      src={lead.imageUrl}
                      alt={lead.imageCaption}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [lead.id]: true }))
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-[220px] items-center justify-center bg-[#DDF3FC] p-6 text-sm text-[#557386]">
                      {lead.title}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between p-5 sm:p-8 lg:col-span-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#557386]">
                      <span className="font-semibold text-[#173B52]">
                        Nhóm {lead.groupCode} · {lead.groupTitle}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">
                        {lead.readTimeMinutes} phút đọc
                      </span>
                      {isRead && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-[#125C45]">
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            Đã đọc
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-[#173B52] sm:text-2xl">
                      {lead.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#557386]">
                      {lead.summary}
                    </p>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => openArticle(lead.id)}
                      className="liquid-glass-cta min-h-[46px] inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold text-[#173B52] transition-all active:scale-[0.98]"
                    >
                      <BookOpen className="h-4 w-4" aria-hidden="true" />
                      <span>Đọc bài viết</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Secondary Editorial Stories */}
          {filteredArticles.length > 1 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filteredArticles.slice(1).map((article) => {
                const isRead = readArticleIds.includes(article.id);
                return (
                  <article
                    key={article.id}
                    className="flex flex-col justify-between rounded-3xl border border-[#B9E5F5]/80 bg-white p-5 shadow-[0_8px_24px_-12px_rgba(23,59,82,0.08)] transition-colors hover:border-[#91D5ED]"
                  >
                    <div>
                      <div className="mb-4 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#DDF3FC]">
                        {!brokenImages[article.id] ? (
                          <img
                            src={article.imageUrl}
                            alt={article.imageCaption}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={() =>
                              setBrokenImages((prev) => ({
                                ...prev,
                                [article.id]: true,
                              }))
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-[#DDF3FC] p-4 text-xs text-[#557386]">
                            {article.title}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#557386]">
                        <span className="font-semibold text-[#173B52]">
                          Nhóm {article.groupCode} · {article.groupTitle}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">
                          {article.readTimeMinutes} phút
                        </span>
                        {isRead && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 font-semibold text-[#125C45]">
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                              Đã đọc
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="mt-2.5 font-display text-lg font-semibold leading-snug text-[#173B52]">
                        {article.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#557386]">
                        {article.summary}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-[#DDF3FC] pt-3">
                      <button
                        type="button"
                        onClick={() => openArticle(article.id)}
                        className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-[#173B52] transition-colors hover:text-[#237B9E]"
                      >
                        <span>Đọc chi tiết</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Stage Completion Bar */}
      <div className="liquid-glass mt-10 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-[#DDF3FC]/85 via-[#FFFFFF]/90 to-[#D7F4EA]/85 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-xs font-semibold text-[#557386]">
            Đã đọc {readArticleIds.length} / {ARTICLES.length} bài viết trong kho tri thức
          </p>
          <p className="mt-1 text-sm font-medium text-[#173B52]">
            Khi đã nắm vững các góc nhìn từ hiện trường đến lý luận, hãy mở trang Tổng kết hành trình.
          </p>
        </div>

        <button
          type="button"
          onClick={onCompleteStage}
          className="liquid-glass-cta min-h-[54px] inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-[#173B52] transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
        >
          <span>{PROJECT_CONTENT.libraryCompleteCta}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
