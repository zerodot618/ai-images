import './Layout.css';
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="flex min-h-screen flex-col justify-center items-center">{children}</main>
    </>
  );
}