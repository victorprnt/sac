import React from "react";
import {
  Users,
  Target,
  Heart,
  Shield,
  Star,
  Award,
  Globe,
  Zap,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Sobre o SAC</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Conectando pessoas e serviços comunitários para tornar a vida mais
              simples e construir comunidades mais fortes.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa Missão
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Facilitar a conexão entre pessoas que precisam de serviços e
              profissionais qualificados, promovendo o crescimento econômico
              local e fortalecendo os laços comunitários.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Conectar Pessoas
              </h3>
              <p className="text-gray-600">
                Criamos pontes entre quem precisa de serviços e quem pode
                oferecê-los, construindo uma rede de apoio mútuo.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Qualidade Garantida
              </h3>
              <p className="text-gray-600">
                Todos os prestadores de serviços passam por um processo de
                verificação para garantir a qualidade e confiabilidade dos
                serviços oferecidos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Impacto Social
              </h3>
              <p className="text-gray-600">
                Promovemos o trabalho voluntário e apoiamos iniciativas que
                beneficiam toda a comunidade, criando um impacto social
                positivo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam nossa plataforma e definem nossa cultura
              organizacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Confiança
              </h3>
              <p className="text-sm text-gray-600">
                Transparência e segurança em todas as interações da plataforma.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Excelência
              </h3>
              <p className="text-sm text-gray-600">
                Buscamos sempre a melhor qualidade em todos os serviços
                oferecidos.
              </p>
            </div>

            <div className="text-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Inovação
                </h3>
                <p className="text-sm text-gray-600">
                  Utilizamos tecnologia para simplificar e melhorar a
                  experiência do usuário.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Comunidade
              </h3>
              <p className="text-sm text-gray-600">
                Fortalecemos os laços locais e promovemos o desenvolvimento
                comunitário.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                O SAC nasceu da necessidade de criar uma ponte entre pessoas que
                precisam de serviços e profissionais qualificados em suas
                comunidades. Observamos que muitas vezes as pessoas não sabem
                onde encontrar serviços confiáveis próximos a elas.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Com a tecnologia como aliada, desenvolvemos uma plataforma que
                facilita essas conexões, promovendo não apenas o crescimento
                econômico local, mas também o fortalecimento dos laços
                comunitários.
              </p>
              <p className="text-lg text-gray-600">
                Hoje, nossa plataforma conecta milhares de pessoas e
                profissionais, criando um ecossistema de apoio mútuo que
                beneficia toda a comunidade.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Impacto em Números
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">
                      500+
                    </div>
                    <div className="text-sm text-gray-600">
                      Serviços Disponíveis
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">
                      1,200+
                    </div>
                    <div className="text-sm text-gray-600">Usuários Ativos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">
                      50+
                    </div>
                    <div className="text-sm text-gray-600">Profissionais</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">
                      98%
                    </div>
                    <div className="text-sm text-gray-600">Satisfação</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Uma equipe dedicada e apaixonada por criar soluções que fazem a
              diferença na vida das pessoas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Desenvolvimento
              </h3>
              <p className="text-gray-600">
                Nossa equipe de desenvolvimento trabalha constantemente para
                melhorar a plataforma e criar novas funcionalidades.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Suporte ao Cliente
              </h3>
              <p className="text-gray-600">
                Nossa equipe de suporte está sempre pronta para ajudar e
                garantir a melhor experiência possível para nossos usuários.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Qualidade
              </h3>
              <p className="text-gray-600">
                Nossa equipe de qualidade verifica todos os serviços e
                profissionais para garantir os mais altos padrões de excelência.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Faça Parte da Nossa Comunidade
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já descobriram uma nova forma de
            conectar-se e fazer negócios em sua comunidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/services"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explorar Serviços
            </a>
            <a
              href="/profile"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Criar Conta
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
