
import "./Boton.css";

function Boton({ children }: { children: string }) {
  return <button className="boton">{children}</button>;
}

export default Boton;