type Props = {
  text: string;
  onClick?: () => void;
  count?: string;
};

const Counter = ({ text, onClick, count }: Props) => (
  <div className="flex w-[150px] overflow-hidden rounded-full border-[1.5px] border-primary/75">
    <div
      className="w-[100px] cursor-pointer select-none bg-primary py-2"
      onClick={onClick}
    >
      <span className="font-sans text-white">{text}</span>
    </div>
    <div className="w-[50px] bg-theme-bg py-2">
      <span className="font-sans text-heading-text">{count}</span>
    </div>
  </div>
);

export default Counter;
