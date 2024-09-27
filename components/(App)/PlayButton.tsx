"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button
      className="bg-white text-white bg-opacity-25 py-1 md:py-3
      px-3 md:px-6
      w-auto
      rounded-md
      text-xs lg:text-lg
      font-semibold
      flex
      flex-row
      items-center
      hover:bg-opacity-15
      transition"
      onClick={() => router.push(`/watch/${movieId}`)}
    >
      <PlayIcon className="w-4 md:w-5 lg:w-7 mr-2" />
      Play
    </button>
  );
};

export default PlayButton;
