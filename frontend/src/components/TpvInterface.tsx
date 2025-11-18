import ArticlesLineTable from "./ArticleLinesTable";
import ArticlesSection from "./ArticlesSection.tsx";
import CategorySection from "./CategorySection";
import { useEffect, useState } from "react";
import { articles } from "../utils/data.js";
import ArticleLinesTableAsideBtns from "./ArticleLinesTableAsideBtns.tsx";
import type { Article, ArticleLine } from "../types/definitions.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faPrint } from "@fortawesome/free-solid-svg-icons";

export default function TpvInterface() {
  const [articlesList, setArticlesList] = useState<object[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    articles[0].category
  );
  const [articlesLines, setArticlesLines] = useState<ArticleLine[]>([]);
  const [totalBill, setTotalBill] = useState(0);
  const URL = "http://localhost:6500";
  const [selectedArticleLine, setSelectedArticleLine] =
    useState<ArticleLine | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleNewArticleLine = (article: Article) => {
    setArticlesLines((prevLines) => {
      // Si el articulo ya esta en pantalla, nos dará el indice de este
      const existingIndex = prevLines.findIndex(
        (line: ArticleLine) => line.id === article.id
      );

      if (existingIndex !== -1) {
        const updatedLines = [...prevLines];
        // Accedemos al articulo usando el indice que hemos obtenido anteriormente
        const existingLine = { ...updatedLines[existingIndex] };
        // Actualizamos las cantidades y totales
        existingLine.quantity += 1;
        existingLine.total = existingLine.quantity * existingLine.price;
        // Actualizamos la linea y devolvemos el array actualizado para
        // que se actualize en la función setArticlesLines
        updatedLines[existingIndex] = existingLine;
        return updatedLines;
      } else {
        const newLine: ArticleLine = {
          id: article.id,
          name: article.name,
          quantity: 1,
          price: Number(article.pvp),
          total: Number(article.pvp),
        };

        return [...prevLines, newLine];
      }
    });
  };

  useEffect(() => {
    const aList = articles.filter(
      (article: Article) => article.category === selectedCategory
    );
    setArticlesList(aList);
  }, [selectedCategory]);

  useEffect(() => {
    const total = articlesLines.reduce(
      (totals, articleLine: ArticleLine) => totals + articleLine.total,
      0
    );
    setTotalBill(total);
  }, [articlesLines]);

  const handleSendData = async () => {
    await fetch(URL + "/print", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ articlesLines }),
    }).then(() => {
      setArticlesLines([]);
    });
  };

  const handleOpenDrawer = async () => {
    await fetch(URL + "/open-drawer", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        console.log("¿Funcionó?");
      }
    });
  };

  const handleSelectArticleLine = async (article: ArticleLine) => {
    setSelectedArticleLine(article);
  };

  const handleDeleteLine = (selectedArticleLine: ArticleLine) => {
    console.log("selected article: ", selectedArticleLine);
    const newArticlesLines = articlesLines.filter(
      (articleLine) => articleLine.id != selectedArticleLine.id
    );
    setArticlesLines(newArticlesLines);
  };

  return (
    <>
      <section
        id="tpv-interface"
        className="h-screen bg-stone-100 grid grid-cols-7 grid-rows-[1fr_auto_auto_auto_auto] text-black"
      >
        <div className="col-start-1 col-end-4 row-start-1 row-end-2 justify-start items-center pb-4 overflow-y-scroll">
          <ArticlesLineTable
            articlesLines={articlesLines}
            selectedArticleLine={selectedArticleLine}
            handleSelectArticleLine={handleSelectArticleLine}
          />
        </div>
        <div className="col-start-1 col-end-4  row-start-2 row-end-3 bg-stone-600 text-stone-100 flex justify-end text-3xl py-4">
          <h3>
            Total:{" "}
            <span className="font-semibold text-4xl">
              {Number(totalBill).toFixed(2).toString().replace(".", ",")}
            </span>{" "}
            €
          </h3>
        </div>
        <div className="col-start-1 col-end-3 row-start-3 row-end-6 bg-stone-300 m-2 rounded">
          <CategorySection
            articles={articles}
            handleCategorySelect={handleCategorySelect}
            categorySelect={selectedCategory}
          />
        </div>
        <div className="col-start-4 col-end-5 row-start-1 row-end-3">
          <ArticleLinesTableAsideBtns
            selectedArticleLine={selectedArticleLine}
            handleDeleteLine={handleDeleteLine}
          />
        </div>
        <div className="col-start-5 col-end-6 row-start-1 row-end-3 bg-stone-300">
          Calculadora
        </div>
        <div className="col-start-3 col-end-7 row-start-3 row-end-6 bg-stone-300 m-2 rounded">
          <ArticlesSection
            articles={articlesList}
            handleNewArticleLine={handleNewArticleLine}
            handleSelectArticleLine={handleSelectArticleLine}
          />
        </div>
        <div className="bg-grey-300 col-start-7 col-end-8 row-start-1 row-end-7 bg-stone-100 grid grid-rows-[auto_1fr] gap-2 border-s border-stone-300">
          <div className="grid grid-cols-2 justify-items-center gap-2">
            {" "}
            <button
              type="button"
              className="px-2 py-1 size-30 rounded bg-gray-400 cursor-pointer"
              onClick={handleOpenDrawer}
            >
              Abrid cajón
            </button>
            <button
              type="button"
              className="px-2 py-1 size-30 rounded bg-gray-400 cursor-pointer"
              onClick={() => handleSendData(articlesLines)}
            >
              Imprimir
            </button>
            <button
              type="button"
              className="px-2 py-1 size-30 rounded bg-gray-400 cursor-pointer"
            >
              <FontAwesomeIcon icon={faPrint} size="2x" />
              Configurar Impresora
            </button>
            <button
              type="button"
              className="px-2 py-1 size-30 rounded bg-red-700 cursor-pointer"
            >
              <FontAwesomeIcon icon={faDoorOpen} size="2x" />
              <p>Salir</p>
            </button>
          </div>
        </div>
        <div className="row-start-6 row-end-7 bg-stone-100 col-start-1 col-end-8 border-t border-stone-300">
          <p>Footer</p>
        </div>
      </section>
    </>
  );
}
