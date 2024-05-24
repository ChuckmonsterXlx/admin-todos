interface Props {
  title: string;
  children: React.ReactNode;
}

export const WidgetItem = ({ title, children }: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <div className="h-full px-6 py-8 space-y-6 bg-white border border-gray-200 rounded-xl">
        <div className="flex flex-col">
          <h5 className="text-xl text-center text-gray-600">{title}</h5>
          <div className="flex flex-col justify-center gap-4 mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
