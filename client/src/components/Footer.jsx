function Link({ uri, text }) {
  return (
    <a href={uri} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
}

function Footer() {
  return <footer>Carblocks - All rights reserved</footer>;
}

export default Footer;
