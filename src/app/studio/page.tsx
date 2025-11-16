'use client';

import { useState } from 'react';
import { Upload, Sparkles, Loader2 } from 'lucide-react';

interface GeneratedLook {
  id: string;
  imageUrl: string;
  name: string;
  date: string;
}

export default function Studio() {
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedLooks, setGeneratedLooks] = useState<GeneratedLook[]>([]);

  const handleClothingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClothingImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = () => {
    if (!clothingImage || !userImage) {
      alert('⚠️ Por favor, faça upload das duas imagens!');
      return;
    }
    setIsGenerating(true);
    setError(null);
    
    // Simula geração de imagem com possibilidade de erro
    setTimeout(() => {
      const hasError = Math.random() < 0.3; // 30% de chance de erro para demonstração
      
      if (hasError) {
        setError('Quer uma dica? Fotos nítidas funcionam melhor para um visual top!');
        setIsGenerating(false);
      } else {
        // Adiciona novo look gerado
        const newLook: GeneratedLook = {
          id: Date.now().toString(),
          imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
          name: 'Novo Look Criado',
          date: new Date().toLocaleDateString('pt-BR')
        };
        setGeneratedLooks([newLook, ...generatedLooks]);
        setIsGenerating(false);
        alert('✨ Imagem gerada com sucesso!');
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f5f0ed] flex flex-col items-center px-6 py-12 relative">
      {/* Overlay de Loading com fundo desfocado */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex flex-col items-center justify-center">
          <img
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/2bc29417-bfc7-405a-8479-0916967357c3.jpg"
            alt="Logo"
            className="h-32 w-32 rounded-full object-cover shadow-2xl mb-6"
          />
          <Loader2 className="w-16 h-16 text-white animate-spin" />
          <p className="text-white text-xl font-semibold mt-4">Gerando seu look...</p>
        </div>
      )}

      <div className="w-full max-w-6xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/2bc29417-bfc7-405a-8479-0916967357c3.jpg"
            alt="Logo"
            className="h-24 w-24 rounded-full object-cover shadow-lg mb-4"
          />
        </div>

        {/* Imagem abaixo da logo */}
        <div className="flex justify-center mb-12">
          <img
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/83405bff-8cbb-4325-a646-23b4bac72633.jpg"
            alt="Banner"
            className="w-full max-w-3xl h-auto rounded-2xl shadow-xl object-cover"
          />
        </div>

        {/* Seção de Looks Gerados - Só aparece quando há looks */}
        {generatedLooks.length > 0 && (
          <>
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-black mb-6 text-center" style={{ fontFamily: 'Didot, serif' }}>
                Seus Looks Gerados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {generatedLooks.map((look) => (
                  <div
                    key={look.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  >
                    <img
                      src={look.imageUrl}
                      alt={look.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{look.name}</h3>
                      <p className="text-sm text-gray-500">{look.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divisor */}
            <div className="border-t-2 border-gray-300 my-12"></div>
          </>
        )}

        {/* Seção de Upload */}
        <h2 className="text-3xl font-serif text-black mb-8 text-center" style={{ fontFamily: 'Didot, serif' }}>
          Criar Novo Look
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Upload de Roupa/Acessório */}
          <div>
            <label className="block text-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                {clothingImage ? (
                  <div className="relative">
                    <img
                      src={clothingImage}
                      alt="Roupa/Acessório"
                      className="w-full h-64 object-contain rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-4">Clique para trocar a imagem</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Upload da Roupa/Acessório
                    </p>
                    <p className="text-sm text-gray-500">
                      Clique para selecionar uma imagem
                    </p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleClothingUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Upload da Foto do Usuário */}
          <div>
            <label className="block text-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                {userImage ? (
                  <div className="relative">
                    <img
                      src={userImage}
                      alt="Sua Foto"
                      className="w-full h-64 object-contain rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-4">Clique para trocar a imagem</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Upload da Sua Foto
                    </p>
                    <p className="text-sm text-gray-500">
                      Clique para selecionar uma imagem
                    </p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleUserUpload}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-600 text-center mt-3">
              Use uma roupa básica na foto para que a peça escolhida se destaque melhor
            </p>
          </div>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-6 text-center">
            <p className="text-red-600 font-semibold text-lg">{error}</p>
          </div>
        )}

        {/* Botão Me mostre como fico */}
        <button
          onClick={handleGenerateImage}
          disabled={isGenerating}
          className="w-full bg-black text-white font-semibold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-6 h-6 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              Me mostre como fico
            </>
          )}
        </button>
      </div>
    </div>
  );
}
