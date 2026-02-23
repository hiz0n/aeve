import { useEffect, useRef, useState } from "react";
import styles from "./VideoSlider.module.scss";

interface Slide {
  src: string;
  title: string;
  subtitle?: string;
}

interface Props {
  slides: Slide[];
  autoplay?: boolean;
  intervalMs?: number;
}

const VideoSlider: React.FC<Props> = ({ slides, intervalMs = 6000, autoplay = true }) => {
  let [index, setIndex] = useState(0);
  let timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = window.setInterval(() => {
      setIndex((k) => (k + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [slides.length, autoplay]);

  let kkk = slides[index];

  return (
    <div className={styles.videoslider}>
      <video
        className={styles.video}
        src={kkk.src}
        autoPlay
        muted
        loop
        playsInline // 모바일 환경에서 전체화면으로 강제 변환되지 않고 페이지 안에서 재생
      />

      <div className={styles.overlay} key={index}>
        <h2 className={styles.title}>{kkk.title}</h2>
        <p className={styles.subtitle}>{kkk.subtitle}</p>
      </div>
    </div>
  );
};

export default VideoSlider;
