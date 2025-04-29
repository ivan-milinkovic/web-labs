import RatingWidget from "./RatingWidget";

export default function RatingPage() {
  return (
    <p className="flex flex-row m-8 justify-center">
      <RatingWidget count={5} />
    </p>
  );
}
