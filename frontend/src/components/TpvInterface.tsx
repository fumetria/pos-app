import ArticlesLineTable from "./ArticleLinesTable";
import ArticleSection from "./ArticleSection";
import CategorySection from "./CategorySection";
import { useContext, useEffect, useState } from "react";
import { articles } from "../utils/data.js";
import { ArticleLine } from "../types/index.ts";

export default function TpvInterface() {
  const [articlesList, setArticlesList] = useState<object[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    articles[0].category
  );
  const [articlesLines, setArticlesLines] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const URL = "http://localhost:6500";
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    console.log(selectedCategory);
  };

  const handleNewArticleLine = (article: {
    id: string;
    name: string;
    pvp: string;
  }) => {
    setArticlesLines((prevLines) => {
      // Si el articulo ya esta en pantalla, nos dará el indice de este
      const existingIndex = prevLines.findIndex(
        (line) => line.id === article.id
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
        const newLine = new ArticleLine();
        newLine.id = article.id;
        newLine.name = article.name;
        newLine.quantity = 1;
        newLine.price = Number(article.pvp);
        newLine.total = newLine.quantity * newLine.price;
        return [...prevLines, newLine];
      }
    });
  };

  useEffect(() => {
    const aList = articles.filter(
      (article: object) => article.category === selectedCategory
    );
    setArticlesList(aList);
  }, [selectedCategory]);

  useEffect(() => {
    const total = articlesLines.reduce(
      (totals, articleLine) => totals + articleLine.total,
      0
    );
    setTotalBill(total);
  }, [articlesLines]);

  const handleSendData = async () => {
    const res = await fetch(URL + "/print", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ articlesLines }),
    }).then(() => {
      setArticlesLines([]);
    });
  };

  const handleOpenDrawer = async () => {
    const res = await fetch(URL + "/open-drawer", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        console.log("¿Funcionó?");
      }
    });
  };
  return (
    <>
      <section
        id="tpv-interface"
        className="h-screen bg-stone-100 grid grid-cols-6 grid-rows-[1fr_auto_auto_auto_auto] text-white"
      >
        <div className="col-start-1 col-end-4 row-start-1 row-end-2 justify-start items-center pb-4 overflow-y-scroll">
          <ArticlesLineTable articlesLines={articlesLines} />
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
        <div className="col-start-1 col-end-3 row-start-3 row-end-6 bg-emerald-500">
          <CategorySection
            articles={articles}
            handleCategorySelect={handleCategorySelect}
          />
        </div>
        <div className="col-start-4 col-end-6 row-start-1 row-end-3 bg-stone-300">
          Calculadora
        </div>
        <div className="col-start-3 col-end-6 row-start-3 row-end-7 bg-yellow-500 ">
          <ArticleSection
            articles={articlesList}
            handleNewArticleLine={handleNewArticleLine}
          />
        </div>
        <div className="bg-grey-300 col-start-6 col-end-7 row-start-1 row-end-7 bg-orange-500 justify-center items-center flex flex-col gap-2">
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
            Configurar Impresora
          </button>
        </div>
        <div className="row-start-6 row-end-7 bg-blue-800 col-start-1 col-end-7">
          Footer
        </div>
      </section>
    </>
  );
}
