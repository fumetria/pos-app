function ASideButton({ label }: { label: string }) {
  return (
    <>
      <div className="bg-stone-300 font-semibold h-full w-full flex justify-center items-center cursor-pointer">
        {label}
      </div>
    </>
  );
}

export default function ArticleLinesTableAsideBtns() {
  return (
    <>
      <div className="grid grid-rows-[auto_auto_auto_auto] gap-2 h-full w-full p-2 bg-stone-600">
        <div className="row-start-1 row-end-2">
          <ASideButton label="Eliminar" />
        </div>
        <div className="row-start-2 row-end-3">
          <ASideButton label="Descripción" />
        </div>
        <div className="row-start-3 row-end-4">
          <ASideButton label="Detalle" />
        </div>
        <div className="row-start-4 row-end-5">
          <ASideButton label="Precio" />
        </div>
      </div>
    </>
  );
}
