import Portfolio from "./Portfolio";
import StyleGuide from "./StyleGuide";

export default function App() {
  const path = window.location.pathname;
  const isStyleGuide = path === "/styleguide" || path.endsWith("/styleguide");
  return isStyleGuide ? <StyleGuide /> : <Portfolio />;
}
