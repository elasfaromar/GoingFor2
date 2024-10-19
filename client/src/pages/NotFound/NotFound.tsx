import { Central as Layout } from "@/layouts";
import "./NotFound.style.scss";

function NotFound() {
  return (
    <Layout title={"Page Not Found"}>
      <h1>404</h1>
      <img src="/error-404-not.jpg"></img>
    </Layout>
  );
}

export default NotFound;
