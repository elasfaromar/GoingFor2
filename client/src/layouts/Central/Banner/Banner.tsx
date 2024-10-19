import "./Banner.style.scss";

function Banner() {
  return (
    <div className="Banner">
      <img src="/carleton_central_logo_black.png" alt="logo" />
      <div className="Banner__seperator"></div>
      <div className="Banner__title">Carleton Central, but Better</div>
    </div>
  );
}

export default Banner;
