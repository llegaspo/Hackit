import Image from 'next/image';

const FloatingBubblegum = ({ className }: { className: string }) => (
  <Image
    src="/images/Bubblegum Glass.png"
    alt="Floating bubblegum"
    width={850}
    height={850}
    className={`floating-image ${className}`}
    priority={false}
  />
);

export default FloatingBubblegum; 