import Markdown from 'react-markdown';
import type { TriviaItemObject } from '../models/trivia';
import Tag from './Tag';

type Props = {
  visible: boolean;
  title: string;
  item: TriviaItemObject;
};

const TriviaCard = ({ title, item, visible }: Props) => {
  if (!visible) return null;

  const { id, subject, description, tags } = item;

  return (
    <div className="my-2 w-full max-w-[440px] cursor-pointer select-none rounded border-t-4 border-primary p-6 shadow-[0_3px_6px_rgba(0,0,0,0.16)] max-bp800:max-w-[280px]">
      <p className="font-sans font-bold text-primary">
        {title} Trivia #{id}
      </p>
      <h3 className="mt-4 whitespace-pre-wrap text-[1.25rem] font-bold leading-tight text-theme-text">
        {subject}
      </h3>
      <div className="mt-4 whitespace-pre-wrap break-words leading-[1.75] text-heading-text">
        <Markdown>{description}</Markdown>
      </div>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TriviaCard;
