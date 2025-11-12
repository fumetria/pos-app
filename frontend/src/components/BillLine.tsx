export default function BillLine({
  article,
}: {
  article: {
    id: string;
    name: string;
    details: string;
    quantity: number;
    price: number;
    total: number;
  };
}) {
  return (
    <>
      <tr className="text-blue-900" key={article.id}>
        <td className="text-center">{article.id}</td>
        <td className="uppercase">{article.name}</td>
        <td>{article.details}</td>
        <td className="text-center">{article.quantity}</td>
        <td className="text-center">
          {Number(article.price).toFixed(2).toString().replace(".", ",")}
        </td>
        <td className="text-center">
          {Number(article.total).toFixed(2).toString().replace(".", ",")}
        </td>
      </tr>
    </>
  );
}
