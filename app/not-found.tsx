import { Metadata } from "next";
import NotFoundComponent from "./components/shared/NotFound";

export const metadata: Metadata = {
  title: "Error 404",
};

export default function NotFound() {
  return (
    <NotFoundComponent
      title="Error 404!"
      description="This page does not exist on ChhinhLong.dev. While you&apos;re here, you can explore the rest of the studio."
    />
  );
}
