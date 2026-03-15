import { ArrowButton } from '../ArrowButton';
import Postit from '../Postit';
import TinyKittenIcon from '../TinyKittenIcon';

const WelcomeScreen = () => (
  <section className="relative -mt-12 flex min-h-screen flex-col items-center justify-center supports-[-webkit-touch-callout:none]:min-h-[-webkit-fill-available]">
    <div className="relative">
      <Postit className="absolute -left-11 -top-6 z-[1] animate-heading-postit-right">
        Full-stack Creator
      </Postit>
      <TinyKittenIcon
        width={120}
        height={120}
        className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.16)]"
      />
    </div>
    <h1 className="mt-6 text-center text-[2rem] font-bold text-heading-text">
      TinyKitten
    </h1>
    <ArrowButton />
  </section>
);

export default WelcomeScreen;
