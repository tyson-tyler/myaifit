import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full px-5 lg:w-4/6 mx-auto py-10 lg:py-28">
      {/* header */}
      <div className="flex flex-col gap-6 lg:gap-12 text-center w-full mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold text-center leading-relaxed lg:leading-snug">
          Create a{" "}
          <span className="text-sky-500">complete fitness program 💪</span> in{" "}
          <span className="text-sky-500">30</span> seconds ⏱
        </h1>

        <p className="text-lg text-neutral-400 lg:px-24 mx-auto">
          Whether you aim to build strength, lose weight, or improve your
          overall well-being, our app will help you achieve your goals with
          ease.
        </p>

        <Link href="/start">
          <Button
            size="lg"
            className="w-60 mt-16 py-7 text-xl animate__animated animate__infinite animate__pulse rounded-full shadow-lg mx-auto"
          >
            Start now
          </Button>
        </Link>
      </div>
    </div>
  );
}
