export default function Button({
  label,
  handleClick,
}: {
  label: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <>
      <button
        type="button"
        className="size-30 bg-amber-100 text-blue-900 border border-blue-900 cursor-pointer"
        key={label}
        onClick={handleClick}
      >
        {label}
      </button>
    </>
  );
}
