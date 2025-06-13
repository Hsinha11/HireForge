type Props = {
  params: { id: number };
};

export default function JobDetail({ params }: Props) {
  return (
    <main className="p-8">
      <h2 className="text-xl font-bold">Job ID: {params.id}</h2>
    </main>
  );
}
