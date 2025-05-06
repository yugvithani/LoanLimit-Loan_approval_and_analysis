const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-2">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">

                    {/* Custom SVG Logo for eShiksha */}

                    <div className="flex items-center space-x-3">
                        {/* <Logo h={"22"} w={"22"} color={"#ffffff"}/> */}
                    </div>

                    {/* Footer Navigation */}
                    <div className="flex flex-wrap gap-6 text-gray-300 text-sm">
                        <a href="#" className="hover:text-yellow-400 transition duration-300">About</a>
                        <a href="#" className="hover:text-yellow-400 transition duration-300">Courses</a>
                        <a href="#" className="hover:text-yellow-400 transition duration-300">Blog</a>
                        <a href="#" className="hover:text-yellow-400 transition duration-300">Contact</a>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
                    © 2025 eShiksha. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

