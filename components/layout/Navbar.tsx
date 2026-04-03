interface NavbarProps {
  title: string
}

const Navbar = ({ title }: NavbarProps) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600">Role:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <option>Admin</option>
                <option>Viewer</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar