function Footer() {
  return (
    <footer
      className="text-center py-3 mt-auto"
      style={{
        backgroundColor: "#F8FAFC",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      <p className="mb-4">
        {" "}
        © {new Date().getFullYear()} ShelfSense | Track products before they
        expire
      </p>
    </footer>
  );
}

export default Footer;
