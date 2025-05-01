export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <aside>/* Admin navigation */</aside>
      <main>{children}</main>
    </div>
  );
}
