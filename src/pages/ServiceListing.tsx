import React from "react";
import { Search, User, Star } from "lucide-react";
import PopularServicesCarousel from "../components/PopularServicesCarousel";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ServiceListing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Conectando Talentos com Oportunidades
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Descubra uma plataforma onde empreendedores e freelancers oferecem
              serviços de qualidade. Desde design web até marketing digital,
              encontre o profissional ideal para impulsionar seu negócio.
            </p>
          </div>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona Nossa Plataforma
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Facilitamos a conexão entre clientes e prestadores de serviços
              através de uma experiência simples e segura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                1. Explore
              </h4>
              <p className="text-gray-600">
                Navegue por nossa ampla seleção de serviços categorizados. Use
                filtros e busca para encontrar exatamente o que precisa.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                2. Conecte
              </h4>
              <p className="text-gray-600">
                Conheça o perfil completo do prestador de serviço, suas
                especialidades, avaliações e portfólio de trabalhos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                3. Contrate
              </h4>
              <p className="text-gray-600">
                Entre em contato diretamente com o profissional e inicie seu
                projeto com confiança e transparência.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services Carousel */}
      <PopularServicesCarousel />

      <Footer />
    </div>
  );
};

export default ServiceListing;
