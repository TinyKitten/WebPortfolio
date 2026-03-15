type Props = {
  text: string;
  onClick?: () => void;
  count?: string;
};

const Counter = ({ text, onClick, count }: Props) => (
  <div className="flex w-[150px] overflow-hidden rounded-full border-[1.5px] border-primary/75">
    <button
      type="button"
      className="w-[100px] cursor-pointer select-none border-none bg-primary py-2 disabled:cursor-default disabled:opacity-50"
      onClick={onClick}
      disabled={!onClick}
    >
      <span className="font-sans text-white">{text}</span>
    </button>
    <div className="w-[50px] bg-theme-bg py-2">
      <span className="font-sans text-heading-text">{count}</span>
    </div>
  </div>
);

export default Counter;
