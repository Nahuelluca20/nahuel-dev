import { Link } from "@remix-run/react";

export default function Blog() {
  return (
    <div>
      <Link to={"/blog/city"}>GOLA</Link>
    </div>
  );
}
