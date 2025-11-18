import { useEffect, useState } from "react";
import Button from "./Button";

export default function CategorySection({
  articles,
  handleCategorySelect,
  categorySelect,
}: {
  articles: { category: string }[];
  handleCategorySelect: (category: string) => void;
  categorySelect: string;
}) {
  const [categoryList, setCategoryList] = useState<string[]>([]);

  useEffect(() => {
    setCategoryList([...new Set(articles.map((article) => article.category))]);
  }, [articles]);

  return (
    <>
      <section
        id="category-section"
        className="flex flex-wrap gap-2 overflow-auto m-2 justify-center"
      >
        {categoryList.length > 0 &&
          categoryList.map((category) => (
            <Button
              key={category}
              label={category}
              handleClick={() => handleCategorySelect(category)}
              categorySelect={categorySelect}
            />
          ))}
      </section>
    </>
  );
}
