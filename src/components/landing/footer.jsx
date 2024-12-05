export function Footer() {
  return (
    <footer className="py-12">
      <div className="grid md:grid-cols-3 justify-center gap-8">
        <div>
          <h3 className="font-semibold mb-4">About Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#ff4d4d]">
                Company Profile
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff4d4d]">
                Management Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff4d4d]">
                Career
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#ff4d4d]">
                Savings
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff4d4d]">
                Credit
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff4d4d]">
                Insurance
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: info@example.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Main St, City</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
