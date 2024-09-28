import { Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-xl font-bold text-gray-800 mb-4 md:mb-0">
                        Campus360
                    </div>
                    <div className="text-sm text-gray-600 mb-4 md:mb-0">
                        Copyright © {new Date().getFullYear()}
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-gray-800">
                            <Twitter size={24} />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">
                            <Linkedin size={24} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">
                            <Instagram size={24} />
                            <span className="sr-only">Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}