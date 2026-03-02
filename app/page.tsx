import {SceneHero} from '@/components/SceneHero';
import {SceneReel} from '@/components/SceneReel';
import {SceneProps} from '@/components/SceneProps';
import {SceneWork} from '@/components/SceneWork';
import {SceneGallery} from '@/components/SceneGallery';
import {SceneAbout} from '@/components/SceneAbout';
import {SceneContact} from '@/components/SceneContact';
import {Preloader} from '@/components/Preloader';

export default function Home() {
  return (
    <main className="relative w-full bg-black text-white overflow-hidden">
      <Preloader />
      <SceneHero />
      <SceneReel />
      <SceneProps />
      <SceneWork />
      <SceneGallery />
      <SceneAbout />
      <SceneContact />
    </main>
  );
}
