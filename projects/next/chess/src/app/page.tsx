import { GameProvider } from './context/GameContext';
import Chess from './Chess';

export default function Home() {
  return (
    <main>
      <GameProvider>
        <Chess />
      </GameProvider>
    </main>
  );
}
