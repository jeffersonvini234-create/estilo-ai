'use client';

import { useState, useEffect } from 'react';
import { Star, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const reviews = [
  {
    name: 'Carlos Silva',
    rating: 5,
    comment: 'Incrível! Meu estilo mudou completamente. Agora me sinto muito mais confiante.',
    avatar: '👨🏻',
  },
  {
    name: 'Mariana Costa',
    rating: 5,
    comment: 'Adorei as sugestões! Finalmente encontrei meu estilo perfeito.',
    avatar: '👩🏻',
  },
  {
    name: 'Rafael Oliveira',
    rating: 5,
    comment: 'App sensacional! As combinações são sempre no ponto.',
    avatar: '👨🏽',
  },
  {
    name: 'Juliana Santos',
    rating: 5,
    comment: 'Transformou minha forma de me vestir. Recomendo muito!',
    avatar: '👩🏽',
  },
  {
    name: 'Pedro Almeida',
    rating: 5,
    comment: 'Praticidade e estilo em um só lugar. Simplesmente perfeito!',
    avatar: '👨🏻',
  },
  {
    name: 'Amanda Ferreira',
    rating: 5,
    comment: 'Nunca imaginei que escolher looks poderia ser tão fácil e divertido!',
    avatar: '👩🏻',
  },
];

export default function Home() {
  const router = useRouter();
  const [currentReview, setCurrentReview] = useState(0);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleGoogleLogin = () => {
    // Redireciona para a página do Studio após login com Google
    window.location.href = '/studio';
  };

  const handleEmailSignup = () => {
    setShowEmailForm(true);
    setShowLoginForm(false);
  };

  const handleShowLogin = () => {
    setShowLoginForm(true);
    setShowEmailForm(false);
  };

  const handleBackToMain = () => {
    setShowEmailForm(false);
    setShowLoginForm(false);
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmitSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('⚠️ Por favor, preencha todos os campos!');
      return;
    }
    // Redireciona para a página do Studio após criar conta
    window.location.href = '/studio';
  };

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('⚠️ Por favor, preencha todos os campos!');
      return;
    }
    // Redireciona para a página do Studio após login
    window.location.href = '/studio';
  };

  // Formulário de Cadastro com Email
  if (showEmailForm) {
    return (
      <div className="min-h-screen bg-[#f5f0ed] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <button
            onClick={handleBackToMain}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="flex flex-col items-center mb-8">
            <img
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/2bc29417-bfc7-405a-8479-0916967357c3.jpg"
              alt="Estilo AI Logo"
              className="h-20 w-20 rounded-full object-cover shadow-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">Criar Conta</h2>
            <p className="text-gray-600 text-sm mt-2">Preencha seus dados para começar</p>
          </div>

          <form onSubmit={handleSubmitSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mt-6"
            >
              Criar Conta
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Já tem uma conta?{' '}
            <button
              onClick={handleShowLogin}
              className="text-purple-600 font-semibold hover:underline"
            >
              Entrar
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Formulário de Login
  if (showLoginForm) {
    return (
      <div className="min-h-screen bg-[#f5f0ed] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <button
            onClick={handleBackToMain}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="flex flex-col items-center mb-8">
            <img
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/2bc29417-bfc7-405a-8479-0916967357c3.jpg"
              alt="Estilo AI Logo"
              className="h-20 w-20 rounded-full object-cover shadow-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">Entrar</h2>
            <p className="text-gray-600 text-sm mt-2">Acesse sua conta</p>
          </div>

          <form onSubmit={handleSubmitLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mt-6"
            >
              Entrar
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Não tem uma conta?{' '}
            <button
              onClick={handleEmailSignup}
              className="text-purple-600 font-semibold hover:underline"
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Página Principal
  return (
    <div className="min-h-screen bg-[#f5f0ed] flex flex-col">
      {/* Logo Centralizada em Formato Circular */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <img
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/2bc29417-bfc7-405a-8479-0916967357c3.jpg"
          alt="Estilo AI Logo"
          className="h-24 w-24 rounded-full object-cover shadow-lg"
        />
        <p className="text-gray-700 text-lg font-medium mt-4 text-center px-4">
          Veja como qualquer roupa ou acessório fica em você, antes de adquirir
        </p>
      </div>

      {/* Imagens de Transformação */}
      <div className="flex justify-center gap-4 px-4 py-6">
        <div className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl">
          <img
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/368b42f9-5d3c-45a8-89c7-9f745d215115.png"
            alt="Transformação de Estilo"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl">
          <img
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/19983a98-319d-4afd-8df1-9fe199f12be3.png"
            alt="Transformação de Estilo Feminino"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Botões de Login */}
      <div className="flex flex-col items-center gap-4 px-6 py-6">
        <button
          onClick={handleGoogleLogin}
          className="w-full max-w-md bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuar com Google
        </button>

        <button
          onClick={handleEmailSignup}
          className="w-full max-w-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Criar Conta com Email
        </button>

        <p className="text-sm text-gray-600 mt-2">
          Já tem uma conta?{' '}
          <button
            onClick={handleShowLogin}
            className="text-purple-600 font-semibold hover:underline"
          >
            Entrar
          </button>
        </p>
      </div>

      {/* Avaliações */}
      <div className="flex flex-col items-center px-6 py-8 mt-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          + de 5 mil brasileiros satisfeitos
        </h3>

        {/* Carrossel de Avaliações */}
        <div className="relative w-full max-w-2xl overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentReview * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col items-center px-4"
              >
                <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{review.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{review.name}</h4>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{review.comment}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentReview
                    ? 'bg-purple-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-sm text-gray-500">
        <p>Ao continuar, você concorda com nossos Termos e Política de Privacidade</p>
      </div>
    </div>
  );
}
