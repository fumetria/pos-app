import { useState, useEffect } from "react";

function ArticleButton({
  article,
  handleNewArticleLine,
}: {
  article: { id: string; name: string; pvp: number };
  handleNewArticleLine?: (article: object) => void;
}) {
  return (
    <>
      <div
        key={article.id}
        onClick={() => handleNewArticleLine(article)}
        className="grid grid_row_[1fr_auto] bg-stone-100 justify-center items-center size-34 border border-blue-800 cursor-pointer px-1"
      >
        <div>
          <h3 className="text-3xl text-center font-semibold text-red-600">
            {article.id}
          </h3>
        </div>
        <div>
          <p className="uppercase text-wrap text-sm text-center text-blue-950">
            {article.name}
          </p>
        </div>
      </div>
    </>
  );
}

export default function ArticleSection({
  articles,
  handleNewArticleLine,
}: {
  articles: object[];
  handleNewArticleLine?: (article: object) => void;
}) {
  const [articlesList, setArticlesList] = useState<object[]>([]);
  useEffect(() => {
    setArticlesList(articles);
  }, [articles]);
  return (
    <>
      <section
        id="article-section"
        className="flex flex-wrap gap-2 m-2 justify-start items-center"
      >
        {articlesList.length > 0 &&
          articlesList.map((article) => (
            <ArticleButton
              key={article.id}
              article={article}
              handleNewArticleLine={() => handleNewArticleLine(article)}
            />
          ))}
      </section>
    </>
  );
}
