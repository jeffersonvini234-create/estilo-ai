'use client';

import { Heart, Trash2 } from 'lucide-react';
import { GeneratedLook } from '@/lib/types';

interface LookCardProps {
  look: GeneratedLook;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function LookCard({ look, onToggleFavorite, onDelete }: LookCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Generated Image */}
      <div className="relative aspect-square">
        <img 
          src={look.generatedImageUrl} 
          alt="Look gerado"
          className="w-full h-full object-cover"
        />
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onToggleFavorite(look.id)}
            className={`
              p-2 rounded-full backdrop-blur-sm transition-all duration-200
              ${look.isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }
            `}
          >
            <Heart className={`w-5 h-5 ${look.isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onDelete(look.id)}
            className="p-2 rounded-full bg-white/80 text-gray-600 backdrop-blur-sm
                     hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <div className="flex gap-2 mb-3">
          <img 
            src={look.userImageUrl} 
            alt="Sua foto"
            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
          />
          <img 
            src={look.productImageUrl} 
            alt="Produto"
            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
          />
        </div>
        <p className="text-xs text-gray-500">
          {formatDate(look.timestamp)}
        </p>
      </div>
    </div>
  );
}
