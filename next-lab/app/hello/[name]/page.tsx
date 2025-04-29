export default async function HelloName({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return <div>Hello {name}</div>;
}
