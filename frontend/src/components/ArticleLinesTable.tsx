import BillLine from "./BillLine";

export default function ArticlesLineTable({
  articlesLines,
}: {
  articlesLines: object[];
}) {
  return (
    <>
      <div className="flec flex-col justify-between">
        <div className="row-start-1 row-end-2 h-full">
          <table className="h-full w-full table-auto">
            <thead className="bg-stone-600 overflow-y-scroll">
              <tr>
                <th>Ref.</th>
                <th>Description</th>
                <th>Details</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="bg-stone-100 text-blue-900">
              {articlesLines.length > 0 &&
                articlesLines.map((articleLine) => (
                  <BillLine key={articleLine.id} article={articleLine} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
